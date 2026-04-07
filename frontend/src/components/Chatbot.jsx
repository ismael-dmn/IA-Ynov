import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Clock } from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

function generateSessionId() {
  return 'chat_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Bienvenue chez TimeTravel Agency ! Je suis votre assistant temporel. Comment puis-je vous aider a planifier votre prochain voyage dans le temps ?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(generateSessionId);
  const messagesEnd = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, scrollToBottom]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text }]);
    setLoading(true);

    try {
      const res = await axios.post(`${API}/chat`, { session_id: sessionId, message: text });
      setMessages(prev => [...prev, { role: 'assistant', text: res.data.response }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', text: "Desole, je rencontre un probleme technique. Veuillez reessayer." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed z-40" style={{ bottom: '80px', right: '24px' }} data-testid="chatbot-container">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-16 right-0 w-[340px] sm:w-[380px] h-[500px] sm:h-[550px] flex flex-col rounded-2xl overflow-hidden border border-tt-gold/20 shadow-[0_24px_64px_rgba(0,0,0,0.8)]"
            style={{ background: '#1a1a1a' }}
            data-testid="chatbot-window"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-tt-gold/10 bg-[#0a0a0a]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-tt-gold/10 border border-tt-gold/30 flex items-center justify-center">
                  <Clock size={14} className="text-tt-gold" />
                </div>
                <div>
                  <p className="text-sm font-medium text-tt-cream">Assistant TimeTravel</p>
                  <p className="text-xs text-tt-gold/60">En ligne</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-full hover:bg-tt-gold/10 text-tt-cream/50 hover:text-tt-cream transition-colors"
                data-testid="chatbot-close-btn"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 chat-messages" data-testid="chatbot-messages">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-tt-gold text-tt-black rounded-br-md'
                        : 'bg-[#0a0a0a] text-tt-cream/80 border border-tt-gold/10 rounded-bl-md'
                    }`}
                    data-testid={`chat-message-${msg.role}-${i}`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="px-4 py-3 rounded-2xl bg-[#0a0a0a] border border-tt-gold/10 rounded-bl-md flex gap-1.5 items-center" data-testid="chatbot-typing">
                    <span className="typing-dot w-2 h-2 rounded-full bg-tt-gold/60" />
                    <span className="typing-dot w-2 h-2 rounded-full bg-tt-gold/60" />
                    <span className="typing-dot w-2 h-2 rounded-full bg-tt-gold/60" />
                  </div>
                </div>
              )}
              <div ref={messagesEnd} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-tt-gold/10 bg-[#0a0a0a]">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Posez-moi vos questions sur les voyages temporels..."
                  className="flex-1 rounded-xl bg-[#1a1a1a] border border-tt-gold/15 px-4 py-3 text-sm text-tt-cream placeholder:text-tt-cream/30 focus:outline-none focus:ring-1 focus:ring-tt-gold/40"
                  data-testid="chatbot-input"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  className="p-3 rounded-xl bg-tt-gold text-tt-black transition-all hover:bg-[#d4b775] disabled:opacity-30"
                  data-testid="chatbot-send-btn"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(201,169,97,0.3)] transition-colors ${
          open ? 'bg-tt-surface border border-tt-gold/30' : 'bg-tt-gold animate-pulse-gold'
        }`}
        data-testid="chatbot-toggle-btn"
      >
        {open ? (
          <X size={22} className="text-tt-gold" />
        ) : (
          <MessageCircle size={22} className="text-tt-black" />
        )}
      </motion.button>
    </div>
  );
}
