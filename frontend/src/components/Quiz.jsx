import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { QUIZ_QUESTIONS, DESTINATIONS } from '@/data/destinations';

export default function Quiz({ onBook }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [started, setStarted] = useState(false);

  const handleAnswer = (questionId, option) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const calculateResult = () => {
    const scores = { paris: 0, cretace: 0, florence: 0 };
    Object.values(answers).forEach(option => {
      Object.entries(option.scores).forEach(([dest, score]) => {
        scores[dest] += score;
      });
    });
    const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    return DESTINATIONS.find(d => d.id === winner);
  };

  const nextStep = () => {
    if (step < QUIZ_QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setResult(calculateResult());
    }
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
    setStarted(false);
  };

  const currentQ = QUIZ_QUESTIONS[step];
  const hasAnswer = currentQ && answers[currentQ.id];

  return (
    <section id="quiz" className="py-24 md:py-32 relative" data-testid="quiz-section">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-tt-gold/[0.03] to-transparent" />
      <div className="container mx-auto px-6 md:px-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-tt-gold mb-4">Quiz personnalise</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl tracking-tight font-medium text-tt-cream">
            Trouvez votre epoque ideale
          </h2>
        </motion.div>

        <div className="max-w-xl mx-auto">
          {!started && !result && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
              <p className="text-tt-cream/70 mb-8">Repondez a 4 questions et decouvrez quelle epoque est faite pour vous.</p>
              <button
                onClick={() => setStarted(true)}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-tt-gold text-tt-black font-medium px-8 py-4 transition-all hover:bg-[#d4b775] hover:shadow-[0_0_30px_rgba(201,169,97,0.4)]"
                data-testid="quiz-start-btn"
              >
                <Sparkles size={18} /> Commencer le quiz
              </button>
            </motion.div>
          )}

          {started && !result && (
            <div>
              <div className="flex gap-2 mb-8 justify-center">
                {QUIZ_QUESTIONS.map((_, i) => (
                  <div key={i} className={`h-1 w-12 rounded-full transition-colors duration-300 ${i <= step ? 'bg-tt-gold' : 'bg-tt-gold/20'}`} />
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-xs text-tt-gold/60 uppercase tracking-wider mb-2">Question {step + 1} / {QUIZ_QUESTIONS.length}</p>
                  <h3 className="text-xl sm:text-2xl font-serif text-tt-cream mb-8">{currentQ.question}</h3>

                  <div className="space-y-3">
                    {currentQ.options.map((opt) => {
                      const selected = answers[currentQ.id]?.value === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => handleAnswer(currentQ.id, opt)}
                          className={`w-full text-left px-6 py-4 rounded-2xl border transition-all duration-300 ${
                            selected
                              ? 'border-tt-gold bg-tt-gold/10 text-tt-cream'
                              : 'border-tt-gold/20 bg-tt-surface hover:border-tt-gold/40 text-tt-cream/70'
                          }`}
                          data-testid={`quiz-option-${opt.value}`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex justify-between mt-8">
                    <button
                      onClick={prevStep}
                      disabled={step === 0}
                      className="inline-flex items-center gap-2 text-tt-cream/50 hover:text-tt-cream disabled:opacity-30 transition-colors"
                      data-testid="quiz-prev-btn"
                    >
                      <ArrowLeft size={16} /> Precedent
                    </button>
                    <button
                      onClick={nextStep}
                      disabled={!hasAnswer}
                      className="inline-flex items-center gap-2 rounded-2xl bg-tt-gold text-tt-black font-medium px-6 py-3 transition-all hover:bg-[#d4b775] disabled:opacity-30 disabled:cursor-not-allowed"
                      data-testid="quiz-next-btn"
                    >
                      {step < QUIZ_QUESTIONS.length - 1 ? 'Suivant' : 'Voir le resultat'} <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center"
              data-testid="quiz-result"
            >
              <div className="relative rounded-2xl overflow-hidden mb-8 border border-tt-gold/20">
                <img src={result.image} alt={result.title} className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-tt-surface to-transparent" />
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <span className="text-xs uppercase tracking-[0.15em] px-3 py-1 rounded-full bg-tt-gold/20 text-tt-gold border border-tt-gold/30">
                    {result.era}
                  </span>
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif text-tt-cream mb-3">
                Votre destination ideale : <span className="text-tt-gold">{result.title}</span>
              </h3>
              <p className="text-tt-cream/60 mb-8">{result.teaser}</p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => onBook(result.id)}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-tt-gold text-tt-black font-medium px-8 py-4 transition-all hover:bg-[#d4b775] hover:shadow-[0_0_30px_rgba(201,169,97,0.4)]"
                  data-testid="quiz-book-btn"
                >
                  Reserver {result.title} <ArrowRight size={18} />
                </button>
                <button
                  onClick={reset}
                  className="inline-flex items-center justify-center rounded-2xl border border-tt-gold/30 text-tt-gold font-medium px-6 py-4 transition-all hover:bg-tt-gold/10"
                  data-testid="quiz-retry-btn"
                >
                  Recommencer
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
