'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BottomNav from '@/components/layout/BottomNav';
import PageTransition from '@/components/layout/PageTransition';
import { useAppStore } from '@/lib/store/useAppStore';
import { BREATHING_EXERCISES, type BreathingExercise, type BreathingStep } from '@/lib/utils/constants';
import { toDateString } from '@/lib/utils/streaks';

type SessionState = 'select' | 'active' | 'done';

export default function BreathePage() {
  const { addXP, addActiveDate, addBreathingSession, addBadge, currentMood, setMetrics, currentEnergy, currentFocus, currentAnxiety } = useAppStore();

  const [sessionState, setSessionState] = useState<SessionState>('select');
  const [exercise, setExercise] = useState<BreathingExercise | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  const [targetCycles] = useState(4);
  const [preMood] = useState(currentMood);
  const [postMood, setPostMood] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentStep: BreathingStep | null = exercise ? exercise.steps[currentStepIndex] : null;

  // Timer logic
  useEffect(() => {
    if (sessionState !== 'active' || !currentStep) return;

    setTimeLeft(currentStep.duration);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Move to next step
          if (exercise) {
            const nextIndex = currentStepIndex + 1;
            if (nextIndex >= exercise.steps.length) {
              // Cycle complete
              const newCycles = cyclesCompleted + 1;
              setCyclesCompleted(newCycles);
              if (newCycles >= targetCycles) {
                // Session done
                setSessionState('done');
                addXP('breathing');
                addBreathingSession();
                addActiveDate(toDateString(new Date()));
                addBadge('first-breath');
                return 0;
              }
              setCurrentStepIndex(0);
            } else {
              setCurrentStepIndex(nextIndex);
            }
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [sessionState, currentStepIndex, exercise, cyclesCompleted, targetCycles, currentStep, addXP, addBreathingSession, addActiveDate, addBadge]);

  const startExercise = useCallback((ex: BreathingExercise) => {
    setExercise(ex);
    setCurrentStepIndex(0);
    setCyclesCompleted(0);
    setPostMood(null);
    setSessionState('active');
  }, []);

  const handlePostMood = useCallback((mood: number) => {
    setPostMood(mood);
    setMetrics(mood, currentEnergy, currentFocus, Math.max(0, currentAnxiety - 1));
    if (mood > preMood) addBadge('mood-lift');
  }, [preMood, setMetrics, currentEnergy, currentFocus, currentAnxiety, addBadge]);

  const getOrbScale = () => {
    if (!currentStep) return 1;
    if (currentStep.action === 'inhale') return 1.4;
    if (currentStep.action === 'hold') return 1.4;
    return 0.8;
  };

  const getOrbColor = () => {
    if (!currentStep) return 'from-violet to-violet-light';
    if (currentStep.action === 'inhale') return 'from-mint to-mint-light';
    if (currentStep.action === 'hold') return 'from-violet to-violet-light';
    return 'from-violet-light to-mint';
  };

  return (
    <>
      <PageTransition>
        <main className="max-w-lg mx-auto px-4 pt-6 pb-4">
          <AnimatePresence mode="wait">
            {/* ====== EXERCISE SELECTION ====== */}
            {sessionState === 'select' && (
              <motion.div key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
                <div>
                  <h1 className="font-display text-2xl font-bold text-text-primary">Breathe 🫧</h1>
                  <p className="text-text-muted text-sm mt-1">Pick a technique. Even 2 minutes helps.</p>
                </div>

                <div className="space-y-3">
                  {BREATHING_EXERCISES.map((ex) => (
                    <button
                      key={ex.id}
                      onClick={() => startExercise(ex)}
                      className="glass-card-hover p-4 w-full text-left flex items-center gap-4"
                    >
                      <span className="text-3xl">{ex.emoji}</span>
                      <div>
                        <p className="font-display font-semibold text-text-primary text-sm">{ex.name}</p>
                        <p className="text-xs text-text-muted mt-0.5">{ex.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ====== ACTIVE EXERCISE ====== */}
            {sessionState === 'active' && currentStep && exercise && (
              <motion.div key="active" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center min-h-[70vh] gap-8">
                {/* Exercise name */}
                <p className="text-text-muted text-xs font-display uppercase tracking-widest">
                  {exercise.name} — Cycle {cyclesCompleted + 1}/{targetCycles}
                </p>

                {/* Breathing Orb */}
                <div className="relative">
                  <motion.div
                    className={`w-48 h-48 rounded-full bg-gradient-to-br ${getOrbColor()} shadow-2xl`}
                    animate={{ scale: getOrbScale() }}
                    transition={{ duration: currentStep.duration, ease: 'easeInOut' }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-display font-bold text-white/90 drop-shadow-lg">
                      {timeLeft}
                    </span>
                  </div>
                </div>

                {/* Step label */}
                <motion.p
                  key={`${currentStepIndex}-${cyclesCompleted}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-display text-xl font-semibold text-text-primary"
                >
                  {currentStep.label}
                </motion.p>

                <button
                  onClick={() => { setSessionState('select'); if (timerRef.current) clearInterval(timerRef.current); }}
                  className="btn-ghost text-xs mt-4"
                >
                  End session
                </button>
              </motion.div>
            )}

            {/* ====== POST-EXERCISE ====== */}
            {sessionState === 'done' && (
              <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center min-h-[70vh] gap-6 text-center">
                <span className="text-5xl">🎉</span>
                <h2 className="font-display text-2xl font-bold text-text-primary">Nice work!</h2>
                <p className="text-text-muted font-body text-sm">+15 XP earned</p>

                {postMood === null ? (
                  <div className="glass-card p-5 space-y-4 w-full max-w-xs">
                    <p className="text-text-primary text-sm font-display">How do you feel now?</p>
                    <div className="flex justify-center gap-3">
                      {[3, 5, 7, 9].map((m) => (
                        <button
                          key={m}
                          onClick={() => handlePostMood(m)}
                          className="w-12 h-12 rounded-xl glass-card-hover flex items-center justify-center text-lg font-display font-bold text-text-primary"
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="glass-card p-5 space-y-2 w-full max-w-xs animate-fade-in">
                    {postMood > preMood ? (
                      <p className="text-mint font-display font-semibold">📈 Mood improved! {preMood} → {postMood}</p>
                    ) : (
                      <p className="text-text-muted font-body text-sm">Every breath counts. You showed up. 💛</p>
                    )}
                  </div>
                )}

                <button onClick={() => setSessionState('select')} className="btn-primary mt-2">
                  Done
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </PageTransition>
      <BottomNav />
    </>
  );
}
