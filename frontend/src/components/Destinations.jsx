import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { DESTINATIONS } from '@/data/destinations';

export default function Destinations({ onExplore }) {
  return (
    <section id="destinations" className="py-24 md:py-32" data-testid="destinations-section">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-tt-gold mb-4">Explorez le temps</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl tracking-tight font-medium text-tt-cream">
            Nos destinations
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {DESTINATIONS.map((dest, i) => {
            const gridClass = i === 0
              ? 'col-span-1 md:col-span-8 md:row-span-2 min-h-[400px] md:min-h-[580px]'
              : 'col-span-1 md:col-span-4 min-h-[280px]';

            return (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`${gridClass} relative overflow-hidden rounded-2xl bg-tt-surface border border-tt-gold/10 group cursor-pointer transition-all duration-500 hover:border-tt-gold/40 hover:shadow-[0_16px_48px_rgba(201,169,97,0.15)] hover:-translate-y-1`}
                onClick={() => onExplore(dest)}
                data-testid={`destination-${dest.id}-card`}
              >
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
                </div>

                <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs uppercase tracking-[0.15em] px-3 py-1 rounded-full bg-tt-gold/20 text-tt-gold border border-tt-gold/30">
                      {dest.era}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-medium text-tt-cream mb-2">{dest.title}</h3>
                  <p className="text-sm text-tt-cream/60 mb-4 line-clamp-2">{dest.teaser}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-tt-gold font-medium">A partir de {dest.price}&euro;</span>
                      <span className="flex items-center gap-1 text-tt-cream/50 text-sm">
                        <Clock size={14} /> {dest.duration}
                      </span>
                    </div>
                    <button
                      className="inline-flex items-center gap-2 text-sm text-tt-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      data-testid={`explore-${dest.id}-btn`}
                    >
                      Explorer <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
