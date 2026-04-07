import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Compass, Globe, Star } from 'lucide-react';

function AnimatedCounter({ target, suffix = '', inView }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span>{count.toLocaleString('fr-FR')}{suffix}</span>;
}

const STATS = [
  { icon: Compass, value: 2847, suffix: '+', label: 'Voyages effectues' },
  { icon: Globe, value: 3, suffix: '', label: 'Destinations uniques' },
  { icon: Star, value: 99, suffix: '%', label: 'Taux de satisfaction' },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="apropos" className="py-24 md:py-32 relative" data-testid="about-section">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-tt-gold mb-4">Notre histoire</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl tracking-tight font-medium text-tt-cream mb-8">
            Pionniers du voyage temporel
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-tt-cream/70 mb-6">
            Fondee en 2087, TimeTravel Agency est nee d'une vision audacieuse : rendre le passe accessible a tous les amoureux d'histoire. Grace a notre technologie propriétaire de deplacement chronologique, nous proposons des experiences immersives et securisees dans les epoques les plus fascinantes de l'humanite.
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-tt-cream/70">
            Chaque voyage est minutieusement prepare par nos experts historiens et nos ingenieurs temporels. De la Rome antique aux annees folles, nous vous garantissons une immersion totale, dans le respect absolu du continuum temporel.
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-4xl mx-auto">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-center"
              data-testid={`stat-${i}`}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-tt-gold/10 border border-tt-gold/20 mb-5">
                <stat.icon size={24} className="text-tt-gold" />
              </div>
              <div className="text-4xl sm:text-5xl font-serif font-medium text-tt-cream mb-2">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} inView={inView} />
              </div>
              <p className="text-sm uppercase tracking-[0.15em] text-tt-cream/50">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
