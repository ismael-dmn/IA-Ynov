import { useState, useCallback } from 'react';
import '@/App.css';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Destinations from '@/components/Destinations';
import DestinationModal from '@/components/DestinationModal';
import Quiz from '@/components/Quiz';
import Booking from '@/components/Booking';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';

function App() {
  const [selectedDest, setSelectedDest] = useState(null);
  const [preselectedBooking, setPreselectedBooking] = useState('');

  const handleExplore = useCallback((dest) => {
    setSelectedDest(dest);
  }, []);

  const handleBook = useCallback((destId) => {
    setPreselectedBooking(destId);
    setSelectedDest(null);
    setTimeout(() => {
      document.querySelector('#reserver')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, []);

  return (
    <div className="min-h-screen bg-tt-black" data-testid="app-root">
      <Header />
      <Hero />
      <div className="section-divider" />
      <About />
      <div className="section-divider" />
      <Destinations onExplore={handleExplore} />
      <div className="section-divider" />
      <Quiz onBook={handleBook} />
      <div className="section-divider" />
      <Booking preselectedDestination={preselectedBooking} />
      <Footer />
      <Chatbot />

      <DestinationModal
        destination={selectedDest}
        open={!!selectedDest}
        onClose={() => setSelectedDest(null)}
        onBook={handleBook}
      />
    </div>
  );
}

export default App;
