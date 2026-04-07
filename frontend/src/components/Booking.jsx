import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Calendar as CalendarIcon, Users, User, Mail, Phone } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { DESTINATIONS } from '@/data/destinations';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Booking({ preselectedDestination }) {
  const [form, setForm] = useState({
    destination: preselectedDestination || '',
    date: null,
    travelers: 1,
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const validate = () => {
    const e = {};
    if (!form.destination) e.destination = 'Choisissez une destination';
    if (!form.date) e.date = 'Choisissez une date';
    if (!form.name.trim()) e.name = 'Entrez votre nom';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email invalide';
    if (!form.phone.trim()) e.phone = 'Entrez votre telephone';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await axios.post(`${API}/booking`, {
        destination: form.destination,
        date: form.date ? format(form.date, 'yyyy-MM-dd') : '',
        travelers: form.travelers,
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
      });
      setSuccess(res.data);
      setForm({ destination: '', date: null, travelers: 1, name: '', email: '', phone: '', message: '' });
    } catch {
      setErrors({ submit: 'Erreur lors de l\'envoi. Veuillez reessayer.' });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full rounded-2xl bg-[#0a0a0a] border border-tt-gold/20 px-5 py-3.5 text-tt-cream placeholder:text-tt-cream/30 focus:outline-none focus:ring-2 focus:ring-tt-gold/50 focus:border-transparent transition-all text-sm";

  return (
    <section id="reserver" className="py-24 md:py-32" data-testid="booking-section">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-tt-gold mb-4">Reservation</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl tracking-tight font-medium text-tt-cream">
            Reservez votre voyage
          </h2>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-tt-surface border border-tt-gold/10 rounded-2xl p-6 sm:p-10"
          data-testid="booking-form"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div className="sm:col-span-2">
              <label className="block text-sm text-tt-cream/70 mb-2">Destination</label>
              <Select value={form.destination} onValueChange={(v) => setForm({...form, destination: v})}>
                <SelectTrigger className="w-full rounded-2xl bg-[#0a0a0a] border-tt-gold/20 text-tt-cream h-12" data-testid="booking-destination-select">
                  <SelectValue placeholder="Choisissez une destination" />
                </SelectTrigger>
                <SelectContent className="bg-tt-surface border-tt-gold/20">
                  {DESTINATIONS.map(d => (
                    <SelectItem key={d.id} value={d.id} className="text-tt-cream hover:bg-tt-gold/10 focus:bg-tt-gold/10 focus:text-tt-cream">
                      {d.title} - {d.price}&euro; ({d.duration})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.destination && <p className="text-red-400 text-xs mt-1">{errors.destination}</p>}
            </div>

            <div>
              <label className="block text-sm text-tt-cream/70 mb-2">Date de depart</label>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className={`${inputClass} flex items-center gap-2 text-left h-12 ${!form.date ? 'text-tt-cream/30' : ''}`}
                    data-testid="booking-date-picker"
                  >
                    <CalendarIcon size={16} className="text-tt-gold" />
                    {form.date ? format(form.date, 'dd MMM yyyy', { locale: fr }) : 'Selectionnez une date'}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-tt-surface border-tt-gold/20" align="start">
                  <Calendar
                    mode="single"
                    selected={form.date}
                    onSelect={(d) => setForm({...form, date: d})}
                    disabled={(date) => date < new Date()}
                    className="text-tt-cream"
                  />
                </PopoverContent>
              </Popover>
              {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date}</p>}
            </div>

            <div>
              <label className="block text-sm text-tt-cream/70 mb-2">Nombre de voyageurs</label>
              <div className="relative">
                <Users size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-tt-gold" />
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={form.travelers}
                  onChange={(e) => setForm({...form, travelers: parseInt(e.target.value) || 1})}
                  className={`${inputClass} pl-10 h-12`}
                  data-testid="booking-travelers-input"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-tt-cream/70 mb-2">Nom complet</label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-tt-gold" />
                <input
                  type="text"
                  placeholder="Votre nom"
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  className={`${inputClass} pl-10 h-12`}
                  data-testid="booking-name-input"
                />
              </div>
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm text-tt-cream/70 mb-2">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-tt-gold" />
                <input
                  type="email"
                  placeholder="votre@email.com"
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                  className={`${inputClass} pl-10 h-12`}
                  data-testid="booking-email-input"
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm text-tt-cream/70 mb-2">Telephone</label>
              <div className="relative">
                <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-tt-gold" />
                <input
                  type="tel"
                  placeholder="+33 6 12 34 56 78"
                  value={form.phone}
                  onChange={(e) => setForm({...form, phone: e.target.value})}
                  className={`${inputClass} pl-10 h-12`}
                  data-testid="booking-phone-input"
                />
              </div>
              {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm text-tt-cream/70 mb-2">Message (optionnel)</label>
              <textarea
                rows="3"
                placeholder="Vos souhaits particuliers..."
                value={form.message}
                onChange={(e) => setForm({...form, message: e.target.value})}
                className={`${inputClass} resize-none`}
                data-testid="booking-message-input"
              />
            </div>
          </div>

          {errors.submit && <p className="text-red-400 text-sm mb-4 text-center">{errors.submit}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-tt-gold text-tt-black font-medium px-8 py-4 transition-all hover:bg-[#d4b775] hover:shadow-[0_0_30px_rgba(201,169,97,0.4)] disabled:opacity-50"
            data-testid="booking-submit-btn"
          >
            {loading ? 'Envoi en cours...' : <><Send size={18} /> Envoyer la demande</>}
          </button>
        </motion.form>
      </div>

      <Dialog open={!!success} onOpenChange={() => setSuccess(null)}>
        <DialogContent className="bg-tt-surface border border-tt-gold/20 rounded-2xl max-w-md text-center" data-testid="booking-success-modal">
          <DialogTitle className="sr-only">Reservation confirmee</DialogTitle>
          <DialogDescription className="sr-only">Votre demande de reservation a ete envoyee</DialogDescription>
          <div className="py-6">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-tt-gold/10 flex items-center justify-center border border-tt-gold/30">
                <CheckCircle size={32} className="text-tt-gold" />
              </div>
            </div>
            <h3 className="text-2xl font-serif text-tt-cream mb-2">Demande envoyee !</h3>
            <p className="text-tt-cream/60 mb-4">{success?.message}</p>
            <p className="text-sm text-tt-gold">Reference : {success?.booking_id}</p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
