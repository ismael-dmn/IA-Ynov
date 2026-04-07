import { motion } from 'framer-motion';
import { Clock, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

const SOCIAL_LINKS = [
  { label: 'Instagram', href: '#' },
  { label: 'Twitter', href: '#' },
  { label: 'LinkedIn', href: '#' },
];

const FOOTER_LINKS = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'Quiz', href: '#quiz' },
  { label: 'Reserver', href: '#reserver' },
];

export default function Footer() {
  const handleScroll = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="border-t border-tt-gold/10 pt-16 pb-8" data-testid="footer">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-serif text-xl text-tt-cream mb-4">
              Time<span className="text-tt-gold">Travel</span> Agency
            </h3>
            <p className="text-sm text-tt-cream/50 leading-relaxed mb-6">
              L'agence de voyage temporel de reference depuis 2087. Vivez l'histoire comme jamais auparavant.
            </p>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="w-10 h-10 rounded-full border border-tt-gold/20 flex items-center justify-center text-tt-gold/60 hover:border-tt-gold/50 hover:text-tt-gold transition-all"
                  data-testid={`social-${link.label.toLowerCase()}`}
                >
                  <ExternalLink size={14} />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-serif text-lg text-tt-cream mb-4">Navigation</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleScroll(link.href)}
                    className="text-sm text-tt-cream/50 hover:text-tt-gold transition-colors"
                    data-testid={`footer-link-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-serif text-lg text-tt-cream mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-tt-cream/50">
                <MapPin size={14} className="text-tt-gold flex-shrink-0" />
                42 Avenue du Chronos, Neo-Paris 75087
              </li>
              <li className="flex items-center gap-3 text-sm text-tt-cream/50">
                <Phone size={14} className="text-tt-gold flex-shrink-0" />
                +33 1 87 20 87 00
              </li>
              <li className="flex items-center gap-3 text-sm text-tt-cream/50">
                <Mail size={14} className="text-tt-gold flex-shrink-0" />
                contact@timetravel-agency.com
              </li>
              <li className="flex items-center gap-3 text-sm text-tt-cream/50">
                <Clock size={14} className="text-tt-gold flex-shrink-0" />
                Lun-Ven : 09h-19h (Temps Universel)
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="section-divider mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-tt-cream/30">
          <p>&copy; 2087 TimeTravel Agency. Tous droits reserves a travers le temps.</p>
          <p>Made with AI &mdash; Conditions generales &middot; Politique de confidentialite &middot; Mentions legales</p>
        </div>
      </div>
    </footer>
  );
}
