from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from openai import AsyncOpenAI

# Charge emergentintegrations uniquement si disponible (environnement Emergent)
try:
    from emergentintegrations.llm.chat import LlmChat, UserMessage
    HAS_EMERGENT = True
except ImportError:
    HAS_EMERGENT = False

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

# --- Configuration du provider LLM ---
# Priorite : OPENAI_API_KEY (SDK standard, Vercel) > EMERGENT_LLM_KEY (plateforme Emergent)
OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')
EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY')
USE_OPENAI_SDK = bool(OPENAI_API_KEY) or not HAS_EMERGENT

if USE_OPENAI_SDK:
    openai_client = AsyncOpenAI(api_key=OPENAI_API_KEY or EMERGENT_LLM_KEY)
    # Historique de conversation par session (mode SDK)
    chat_histories = {}
else:
    # Sessions emergentintegrations
    chat_sessions = {}

SYSTEM_PROMPT = """Tu es l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe.
Ton rôle : conseiller les clients sur les meilleures destinations temporelles.

Ton ton :
- Professionnel mais chaleureux
- Passionné d'histoire
- Toujours enthousiaste sans être trop familier
- Expertise en voyage temporel (fictif mais crédible)

Tu connais parfaitement nos 3 destinations :
- Paris 1889 (Belle Époque, Tour Eiffel, Exposition Universelle) — 12 500€, 7 jours
- Crétacé -65M (dinosaures, nature préhistorique) — 18 900€, 5 jours
- Florence 1504 (Renaissance, art, Michel-Ange) — 14 200€, 6 jours

Tu peux :
- Suggérer des destinations selon les intérêts du client
- Donner des informations pratiques (prix, durée, équipement fourni)
- Répondre aux FAQ sur la sécurité, les paradoxes temporels, l'assurance
- Rediriger vers le formulaire de réservation pour finaliser

Réponses courtes, conversationnelles, max 4 phrases sauf si on te demande des détails."""


class ChatRequest(BaseModel):
    session_id: str
    message: str

class ChatResponse(BaseModel):
    response: str

class BookingRequest(BaseModel):
    destination: str = Field(..., min_length=1)
    date: str = Field(..., min_length=1)
    travelers: int = Field(..., ge=1, le=10)
    name: str = Field(..., min_length=1)
    email: str = Field(..., pattern=r'^[^@\s]+@[^@\s]+\.[^@\s]+$')
    phone: str = Field(..., min_length=1)
    message: Optional[str] = ""

class BookingResponse(BaseModel):
    success: bool
    booking_id: str
    message: str


@api_router.get("/")
async def root():
    return {"message": "TimeTravel Agency API"}


@api_router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    try:
        if USE_OPENAI_SDK:
            # --- Mode SDK OpenAI standard (compatible Vercel) ---
            if request.session_id not in chat_histories:
                chat_histories[request.session_id] = [
                    {"role": "system", "content": SYSTEM_PROMPT}
                ]
            history = chat_histories[request.session_id]
            history.append({"role": "user", "content": request.message})

            completion = await openai_client.chat.completions.create(
                model="gpt-4o",
                messages=history,
            )
            reply = completion.choices[0].message.content
            history.append({"role": "assistant", "content": reply})
            return ChatResponse(response=reply)
        else:
            # --- Mode emergentintegrations (plateforme Emergent) ---
            if request.session_id not in chat_sessions:
                chat_sessions[request.session_id] = LlmChat(
                    api_key=EMERGENT_LLM_KEY,
                    session_id=request.session_id,
                    system_message=SYSTEM_PROMPT
                ).with_model("openai", "gpt-4o")

            chat = chat_sessions[request.session_id]
            user_message = UserMessage(text=request.message)
            response = await chat.send_message(user_message)
            return ChatResponse(response=response)
    except Exception as e:
        logger.error(f"Chat error: {e}")
        return ChatResponse(response="Désolé, je rencontre un problème technique. Veuillez réessayer dans un instant.")


@api_router.post("/booking", response_model=BookingResponse)
async def create_booking(request: BookingRequest):
    booking_id = str(uuid.uuid4())[:8].upper()
    doc = {
        "booking_id": booking_id,
        "destination": request.destination,
        "date": request.date,
        "travelers": request.travelers,
        "name": request.name,
        "email": request.email,
        "phone": request.phone,
        "message": request.message,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "status": "pending"
    }
    await db.bookings.insert_one(doc)
    return BookingResponse(
        success=True,
        booking_id=booking_id,
        message=f"Votre réservation {booking_id} a été enregistrée avec succès."
    )


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
