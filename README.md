# TimeTravel Agency — Agence de Voyage Temporel de Luxe

> Application web immersive pour une agence fictive de voyage dans le temps. Interface premium, theme sombre, accents dores et chatbot IA integre.

---

## Description du projet

**TimeTravel Agency** est une single-page application (SPA) vitrine concue pour une agence fictive de voyage temporel. Le site propose trois destinations uniques — **Paris 1889**, **Cretace -65M** et **Florence 1504** — presentees dans une interface haut de gamme inspiree de l'univers du luxe et de la science-fiction.

L'application integre un chatbot propulse par **OpenAI GPT** capable de conseiller les visiteurs sur les destinations, repondre aux questions frequentes (securite, paradoxes temporels, assurance) et rediriger vers le formulaire de reservation.

---

## Stack technique

| Couche | Technologies |
|---|---|
| **Frontend** | React 19, Tailwind CSS 3, Framer Motion 12, Shadcn/UI (Radix), Lucide React |
| **Backend** | FastAPI (Python), Motor (MongoDB async), emergentintegrations (LLM) |
| **Base de donnees** | MongoDB |
| **IA / Chatbot** | OpenAI GPT via cle universelle Emergent (emergentintegrations) |
| **Polices** | Playfair Display (titres, serif), Inter (corps, sans-serif) |
| **Animations** | Framer Motion — fade-in au scroll, parallaxe, compteurs animes, transitions modales |

---

## Fonctionnalites

### Navigation et en-tete
- Header fixe transparent qui devient solide au scroll (glassmorphism + backdrop-blur)
- Navigation smooth scroll vers chaque section (Accueil, Destinations, Reserver, Contact)
- Menu hamburger responsive sur mobile
- Bouton de musique d'ambiance integre (Skyline of Silk.mp3)

### Section Hero
- Plein ecran (100vh) avec image de fond parallaxe (mecanisme d'horlogerie doree)
- Animation progressive du titre mot par mot ("Voyagez a travers le temps")
- Sous-titre : "L'agence de voyage temporel n1 depuis 2087"
- Deux boutons d'appel a l'action : "Decouvrir nos destinations" et "Parler a un conseiller"
- Indicateur de scroll anime

### A propos de l'agence
- Presentation de l'agence en 2 paragraphes
- 3 statistiques avec animation de compteur declenchee a l'entree dans le viewport :
  - **2 847+** voyages effectues
  - **3** destinations uniques
  - **99%** taux de satisfaction

### Galerie de destinations (Bento Grid)
Trois cartes interactives organisees en grille asymetrique :

| Destination | Epoque | Prix | Duree |
|---|---|---|---|
| **Paris 1889** | Belle Epoque | 12 500 EUR | 7 jours |
| **Cretace -65M** | Ere Mesozoique | 18 900 EUR | 5 jours |
| **Florence 1504** | Renaissance | 14 200 EUR | 6 jours |

Chaque carte affiche :
- Image haute qualite (Unsplash)
- Badge d'epoque, titre, prix, duree
- Effet hover : zoom image + bordure doree lumineuse
- Bouton "Explorer" qui ouvre une modale detaillee

### Modales de destination
- Image hero avec bouton lecture video (fichiers MP4 uploades)
- Description complete issue du document de recherche
- Liste des points forts et services inclus
- Bouton "Reserver cette epoque" qui redirige vers le formulaire

### Quiz de personnalisation ("Trouvez votre epoque ideale")
Quiz interactif en 4 questions avec transitions animees :

1. Type d'experience recherchee (Culturelle / Aventure / Elegance)
2. Periode preferee (Histoire moderne / Temps anciens / Renaissance)
3. Preference d'environnement (Effervescence urbaine / Nature sauvage / Art et architecture)
4. Activite ideale (Monuments / Faune / Musees)

Algorithme de scoring qui attribue des points a chaque destination selon les reponses. Resultat anime avec image, description et bouton de reservation.

### Formulaire de reservation
- Selecteur de destination (Shadcn Select)
- Calendrier de date (Shadcn Calendar + Popover)
- Nombre de voyageurs, nom, email, telephone
- Zone de message optionnel
- Validation cote client (champs requis, format email)
- Validation cote serveur (Pydantic — longueur minimale, regex email, limites numeriques)
- Modale de succes avec numero de reference unique

### Chatbot IA (widget flottant)
- Bulle flottante en bas a droite avec animation de pulsation doree
- Fenetre de chat 380x550px, theme sombre avec accents dores
- En-tete "Assistant TimeTravel" avec indicateur en ligne
- Bulles de messages (utilisateur a droite en dore, bot a gauche en sombre)
- Indicateur de frappe anime pendant la reponse
- Historique de conversation maintenu pendant la session
- Envoi par bouton ou touche Entree
- Endpoint proxy `/api/chat` qui communique avec OpenAI GPT sans exposer la cle API

**System prompt du chatbot** : conseiller professionnel et chaleureux, passionne d'histoire, expert en voyage temporel fictif. Connait les 3 destinations, peut recommander, informer sur les prix/durees/equipements et rediriger vers la reservation.

### Pied de page
- Logo et description de l'agence
- Liens de navigation
- Informations de contact fictives (adresse Neo-Paris, telephone, email)
- Icones de reseaux sociaux
- Mentions legales et copyright

---

## Architecture du projet

```
/app/
├── backend/
│   ├── server.py              # API FastAPI (chat IA + reservations)
│   ├── requirements.txt       # Dependances Python
│   └── .env                   # Variables d'environnement (MONGO_URL, EMERGENT_LLM_KEY)
├── frontend/
│   ├── public/
│   │   └── index.html         # Point d'entree HTML (Google Fonts)
│   ├── src/
│   │   ├── App.js             # Composant racine — orchestre toutes les sections
│   │   ├── App.css            # Styles personnalises (parallaxe, animations, scrollbar)
│   │   ├── index.css          # Variables CSS du theme sombre + Tailwind
│   │   ├── index.js           # Point d'entree React
│   │   ├── data/
│   │   │   └── destinations.js    # Donnees des destinations, quiz, URLs des assets
│   │   └── components/
│   │       ├── Header.jsx         # En-tete fixe + navigation + musique
│   │       ├── Hero.jsx           # Section hero plein ecran + parallaxe
│   │       ├── About.jsx          # Presentation + compteurs animes
│   │       ├── Destinations.jsx   # Grille bento des destinations
│   │       ├── DestinationModal.jsx   # Modale detaillee + lecteur video
│   │       ├── Quiz.jsx           # Quiz 4 questions + resultat
│   │       ├── Booking.jsx        # Formulaire de reservation + calendrier
│   │       ├── Chatbot.jsx        # Widget chatbot flottant
│   │       ├── Footer.jsx         # Pied de page
│   │       └── ui/                # Composants Shadcn/UI (Dialog, Select, Calendar...)
│   ├── tailwind.config.js     # Configuration Tailwind (couleurs, polices, animations)
│   └── package.json           # Dependances Node.js
└── README.md
```

---

## Endpoints API

| Methode | Route | Description |
|---|---|---|
| `GET` | `/api/` | Verification de sante de l'API |
| `POST` | `/api/chat` | Proxy chatbot IA — accepte `{ session_id, message }`, retourne `{ response }` |
| `POST` | `/api/booking` | Creation de reservation — accepte les donnees du formulaire, retourne `{ success, booking_id, message }` |

### Validation de `/api/booking`

| Champ | Type | Contraintes |
|---|---|---|
| `destination` | string | Obligatoire, min 1 caractere |
| `date` | string | Obligatoire, format YYYY-MM-DD |
| `travelers` | integer | Obligatoire, entre 1 et 10 |
| `name` | string | Obligatoire, min 1 caractere |
| `email` | string | Obligatoire, format email valide (regex) |
| `phone` | string | Obligatoire, min 1 caractere |
| `message` | string | Optionnel |

---

## Charte graphique

| Element | Valeur |
|---|---|
| Fond principal | `#0a0a0a` (noir profond) |
| Surface / cartes | `#1a1a1a` (anthracite) |
| Couleur primaire | `#c9a961` (or antique) |
| Texte principal | `#f5f1e8` (blanc creme) |
| Bordures | `rgba(201, 169, 97, 0.2)` (or subtil) |
| Titres | Playfair Display (serif) |
| Corps de texte | Inter (sans-serif) |
| Rayon de bordure | `rounded-2xl` (1rem) |
| Ombres | Teinte doree subtile |

---

## Variables d'environnement

### Backend (`/app/backend/.env`)

| Variable | Description |
|---|---|
| `MONGO_URL` | URL de connexion MongoDB |
| `DB_NAME` | Nom de la base de donnees |
| `CORS_ORIGINS` | Origines CORS autorisees |
| `EMERGENT_LLM_KEY` | Cle universelle Emergent pour OpenAI GPT |

### Frontend (`/app/frontend/.env`)

| Variable | Description |
|---|---|
| `REACT_APP_BACKEND_URL` | URL de base du backend (avec prefixe https) |

### Exemple `.env.example`

```env
# Backend
MONGO_URL=mongodb+srv://user:password@cluster.mongodb.net/timetravel_db
DB_NAME=timetravel_db
CORS_ORIGINS=https://votre-domaine.vercel.app

# Cle API OpenAI (obligatoire pour deploiement Vercel / externe)
OPENAI_API_KEY=sk-votre-cle-openai-ici

# Cle Emergent (uniquement sur plateforme Emergent — ignoree si OPENAI_API_KEY est presente)
# EMERGENT_LLM_KEY=sk-emergent-xxx

# Frontend
REACT_APP_BACKEND_URL=https://votre-backend.vercel.app
```

---

## Deploiement sur Vercel

### Pre-requis
- Un compte [Vercel](https://vercel.com)
- Une cle API OpenAI depuis [platform.openai.com](https://platform.openai.com)
- Une base MongoDB Atlas (gratuite sur [mongodb.com/atlas](https://www.mongodb.com/atlas))

### Variables d'environnement Vercel

Dans **Settings > Environment Variables** de votre projet Vercel :

| Variable | Valeur | Obligatoire |
|---|---|---|
| `OPENAI_API_KEY` | `sk-...` (votre cle OpenAI) | Oui |
| `MONGO_URL` | `mongodb+srv://...` (MongoDB Atlas) | Oui |
| `DB_NAME` | `timetravel_db` | Oui |
| `CORS_ORIGINS` | `https://votre-domaine.vercel.app` | Oui |
| `REACT_APP_BACKEND_URL` | URL du backend deploye | Oui |

### Fonctionnement dual du backend

Le backend detecte automatiquement le provider LLM a utiliser :

1. **Si `OPENAI_API_KEY` est definie** → utilise le SDK OpenAI standard (mode Vercel)
2. **Sinon, si `EMERGENT_LLM_KEY` est definie** → utilise emergentintegrations (mode Emergent)

Aucune modification de code necessaire entre les deux environnements.

---

## Installation et lancement

### Pre-requis
- Node.js 18+
- Python 3.10+
- MongoDB (local ou Atlas)

### Backend

```bash
cd backend
pip install -r requirements.txt
# Configurer les variables dans .env
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

### Frontend

```bash
cd frontend
yarn install
# Configurer REACT_APP_BACKEND_URL dans .env
yarn start
```

L'application sera accessible sur `http://localhost:3000`.

---

## Outils IA utilises

| Outil | Usage |
|---|---|
| **OpenAI GPT** (via Emergent) | Chatbot conversationnel en francais, conseiller de voyage temporel |
| **Emergent E1** | Developpement full-stack assiste par IA (architecture, code, tests) |
| **Emergent Universal Key** | Cle d'API unifiee pour les services LLM |

---

## Assets multimedia

| Asset | Source | Utilisation |
|---|---|---|
| PARIS.mp4 | Upload utilisateur | Video de fond dans la modale Paris 1889 |
| CRETACE.mp4 | Upload utilisateur | Video de fond dans la modale Cretace -65M |
| FLORENCE 1504.mp4 | Upload utilisateur | Video de fond dans la modale Florence 1504 |
| Skyline of Silk.mp3 | Upload utilisateur | Musique d'ambiance (toggle dans le header) |
| Images destinations | Unsplash | Cartes de destination (Paris, prehistoire, Renaissance) |
| Image hero | Unsplash | Mecanisme d'horlogerie doree (fond parallaxe) |

---

## Credits

- **Design et developpement** : Emergent E1
- **Images** : [Unsplash](https://unsplash.com) (licence libre)
- **Icones** : [Lucide React](https://lucide.dev)
- **Composants UI** : [Shadcn/UI](https://ui.shadcn.com)
- **Animations** : [Framer Motion](https://motion.dev)
- **Polices** : [Google Fonts](https://fonts.google.com) — Playfair Display, Inter
- **IA** : OpenAI via [Emergent](https://emergent.sh)

---

*Made with AI — TimeTravel Agency, 2087*
