import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useRef } from 'react';
import { HERO_IMAGE } from '@/data/destinations';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const words = "Voyagez a travers le temps".split(' ');

  const handleScroll = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="accueil" ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden" data-testid="hero-section">
      <motion.div style={{ y }} className="parallax-bg">
        <img
          src={HERO_IMAGE}
          alt="Golden clockwork"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 via-[#0a0a0a]/50 to-[#0a0a0a]" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm uppercase tracking-[0.25em] text-tt-gold mb-6"
        >
          Agence de Voyage Temporel
        </motion.p>

        <h1 className="text-5xl sm:text-6xl md:text-7xl tracking-tighter font-medium mb-6 leading-[1.1]">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.12 }}
              className="inline-block mr-[0.3em] text-tt-cream"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-base sm:text-lg text-tt-cream/60 mb-10 max-w-xl mx-auto leading-relaxed"
        >
          L'agence de voyage temporel n&deg;1 depuis 2087
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => handleScroll('#destinations')}
            className="inline-flex items-center justify-center rounded-2xl bg-tt-gold text-tt-black font-medium px-8 py-4 transition-all hover:bg-[#d4b775] hover:shadow-[0_0_30px_rgba(201,169,97,0.4)]"
            data-testid="cta-destinations"
          >
            Decouvrir nos destinations
          </button>
          <button
            onClick={() => handleScroll('#contact')}
            className="inline-flex items-center justify-center rounded-2xl border border-tt-gold text-tt-gold font-medium px-8 py-4 transition-all hover:bg-tt-gold/10"
            data-testid="cta-contact"
          >
            Parler a un conseiller
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="scroll-indicator text-tt-gold/60">
          <ChevronDown size={28} />
        </div>
      </motion.div>
    </section>
  );
}
