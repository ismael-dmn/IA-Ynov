import { useState, useEffect, useRef } from 'react';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MUSIC_URL } from '@/data/destinations';

const NAV_LINKS = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'Reserver', href: '#reserver' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(MUSIC_URL);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }
  }, []);

  const toggleMusic = () => {
    if (musicPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setMusicPlaying(!musicPlaying);
  };

  const handleNav = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      data-testid="header"
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'backdrop-blur-xl bg-[#0a0a0a]/80 border-b border-[#c9a961]/20 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent border-b border-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="#accueil" onClick={(e) => { e.preventDefault(); handleNav('#accueil'); }} className="flex items-center gap-3" data-testid="logo-link">
          <span className="font-serif text-xl md:text-2xl font-medium tracking-tight text-tt-cream">
            Time<span className="text-tt-gold">Travel</span> Agency
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8" data-testid="desktop-nav">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="text-sm uppercase tracking-[0.15em] text-tt-cream/70 hover:text-tt-gold transition-colors duration-300"
              data-testid={`nav-${link.label.toLowerCase()}`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={toggleMusic}
            className="p-2 rounded-full border border-tt-gold/20 hover:border-tt-gold/50 text-tt-gold transition-all"
            data-testid="music-toggle"
            aria-label="Toggle music"
          >
            {musicPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
        </nav>

        <div className="flex md:hidden items-center gap-3">
          <button onClick={toggleMusic} className="p-2 text-tt-gold" data-testid="music-toggle-mobile" aria-label="Toggle music">
            {musicPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-tt-cream" data-testid="mobile-menu-toggle" aria-label="Menu">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-tt-gold/10"
            data-testid="mobile-menu"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="text-left text-lg font-serif text-tt-cream/80 hover:text-tt-gold transition-colors py-2"
                  data-testid={`mobile-nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
