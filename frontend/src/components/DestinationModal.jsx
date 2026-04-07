import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Clock, Check, ArrowRight, Play, X } from 'lucide-react';
import { useState } from 'react';

export default function DestinationModal({ destination, open, onClose, onBook }) {
  const [showVideo, setShowVideo] = useState(false);
  if (!destination) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="bg-tt-surface border border-tt-gold/20 rounded-2xl p-0 overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.8)] max-w-2xl w-[95vw] max-h-[90vh] overflow-y-auto"
        data-testid="destination-modal"
      >
        <DialogTitle className="sr-only">{destination.title}</DialogTitle>
        <DialogDescription className="sr-only">{destination.tagline}</DialogDescription>

        <div className="relative h-56 sm:h-72 overflow-hidden">
          {showVideo ? (
            <div className="relative w-full h-full">
              <video
                src={destination.video}
                autoPlay
                controls
                className="w-full h-full object-cover"
                data-testid="destination-video"
              />
              <button
                onClick={() => setShowVideo(false)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors z-10"
                data-testid="close-video-btn"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <>
              <img src={destination.image} alt={destination.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-tt-surface via-transparent to-transparent" />
              <button
                onClick={() => setShowVideo(true)}
                className="absolute inset-0 flex items-center justify-center group/play"
                data-testid="play-video-btn"
              >
                <div className="w-16 h-16 rounded-full bg-tt-gold/90 flex items-center justify-center transition-transform group-hover/play:scale-110 shadow-[0_0_30px_rgba(201,169,97,0.4)]">
                  <Play size={24} className="text-tt-black ml-1" />
                </div>
              </button>
              <div className="absolute bottom-4 left-6">
                <span className="text-xs uppercase tracking-[0.15em] px-3 py-1 rounded-full bg-tt-gold/20 text-tt-gold border border-tt-gold/30">
                  {destination.era}
                </span>
              </div>
            </>
          )}
        </div>

        <div className="p-6 sm:p-8">
          <h3 className="text-2xl sm:text-3xl font-serif font-medium text-tt-cream mb-2">{destination.title}</h3>
          <p className="text-sm text-tt-gold mb-6">{destination.tagline}</p>

          <div className="flex items-center gap-6 mb-6 pb-6 border-b border-tt-gold/10">
            <div>
              <p className="text-xs text-tt-cream/50 uppercase tracking-wider">Prix</p>
              <p className="text-xl font-serif text-tt-gold">A partir de {destination.price}&euro;</p>
            </div>
            <div>
              <p className="text-xs text-tt-cream/50 uppercase tracking-wider">Duree</p>
              <p className="text-xl font-serif text-tt-cream flex items-center gap-2"><Clock size={18} className="text-tt-gold" /> {destination.duration}</p>
            </div>
          </div>

          <p className="text-tt-cream/70 leading-relaxed mb-8">{destination.description}</p>

          <div className="mb-8">
            <h4 className="text-lg font-serif text-tt-cream mb-4">Points forts</h4>
            <ul className="space-y-3">
              {destination.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-tt-cream/70">
                  <Check size={16} className="text-tt-gold mt-0.5 flex-shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h4 className="text-lg font-serif text-tt-cream mb-4">Inclus dans le voyage</h4>
            <ul className="space-y-3">
              {destination.included.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-tt-cream/70">
                  <Check size={16} className="text-tt-gold mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => { onClose(); onBook(destination.id); }}
            className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-tt-gold text-tt-black font-medium px-8 py-4 transition-all hover:bg-[#d4b775] hover:shadow-[0_0_30px_rgba(201,169,97,0.4)]"
            data-testid="book-destination-btn"
          >
            Reserver cette epoque <ArrowRight size={18} />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
