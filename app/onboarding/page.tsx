'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store/useAppStore';
import { useRouter } from 'next/navigation';

const SLIDES = [
  {
    emoji: '🧠',
    title: 'Your mind, understood.',
    description: 'MindFlow is your daily wellness companion — not a therapist, not a chatbot. A safe space that gets smarter the more you use it.',
  },
  {
    emoji: '🔒',
    title: "What it isn't.",
    description: "MindFlow is NOT therapy or medical advice. It's an AI companion that helps you understand your patterns. For real crises, we'll always connect you to professionals.",
  },
  {
    emoji: '🛡️',
    title: 'Completely private.',
    description: 'Your data stays on your device. No ads, no tracking, no selling your feelings. This is YOUR sanctuary.',
  },
];

const EXAMS = ['NEET', 'JEE', 'UPSC', 'CAT', 'GATE', 'CUET', 'Other'];

export default function OnboardingPage() {
  const { setProfile } = useAppStore();
  const router = useRouter();

  const [step, setStep] = useState<'carousel' | 'setup' | 'firstcheckin'>('carousel');
  const [slideIndex, setSlideIndex] = useState(0);
  const [name, setName] = useState('');
  const [examName, setExamName] = useState('');
  const [examDate, setExamDate] = useState('');

  const handleFinishCarousel = useCallback(() => setStep('setup'), []);
  const handleNextSlide = useCallback(() => {
    if (slideIndex < SLIDES.length - 1) {
      setSlideIndex(slideIndex + 1);
    } else {
      handleFinishCarousel();
    }
  }, [slideIndex, handleFinishCarousel]);

  const handleSetup = useCallback(() => {
    setProfile({
      name: name.trim(),
      examName,
      examDate,
      onboarded: true,
    });
    router.push('/');
  }, [name, examName, examDate, setProfile, router]);

  return (
    <main className="min-h-dvh flex items-center justify-center p-6">
      <AnimatePresence mode="wait">
        {/* ====== CAROUSEL ====== */}
        {step === 'carousel' && (
          <motion.div
            key={`slide-${slideIndex}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="max-w-sm w-full text-center space-y-8"
          >
            <span className="text-6xl block">{SLIDES[slideIndex].emoji}</span>
            <div className="space-y-3">
              <h1 className="font-display text-2xl font-bold text-text-primary">
                {SLIDES[slideIndex].title}
              </h1>
              <p className="text-text-muted font-body text-sm leading-relaxed">
                {SLIDES[slideIndex].description}
              </p>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2">
              {SLIDES.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === slideIndex ? 'bg-violet w-6' : 'bg-midnight-border'
                  }`}
                />
              ))}
            </div>

            <button onClick={handleNextSlide} className="btn-primary w-full">
              {slideIndex < SLIDES.length - 1 ? 'Next' : "Let's go →"}
            </button>
          </motion.div>
        )}

        {/* ====== SETUP ====== */}
        {step === 'setup' && (
          <motion.div
            key="setup"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-sm w-full space-y-6"
          >
            <div className="text-center space-y-2">
              <span className="text-4xl">✨</span>
              <h2 className="font-display text-xl font-bold text-text-primary">Tell us about you</h2>
              <p className="text-text-muted text-xs">This helps Aria personalize your experience.</p>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <label className="text-xs font-display text-text-muted" htmlFor="onboarding-name">What should we call you?</label>
              <input
                id="onboarding-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full bg-midnight-card border border-midnight-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder-text-dim font-body outline-none focus:border-violet/50 transition-colors"
              />
            </div>

            {/* Exam Selection */}
            <div className="space-y-2">
              <label className="text-xs font-display text-text-muted">Preparing for? (optional)</label>
              <div className="flex flex-wrap gap-2">
                {EXAMS.map((exam) => (
                  <button
                    key={exam}
                    onClick={() => setExamName(examName === exam ? '' : exam)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-display font-semibold transition-all ${
                      examName === exam
                        ? 'bg-violet text-white'
                        : 'bg-midnight-card border border-midnight-border text-text-muted hover:border-violet/30'
                    }`}
                  >
                    {exam}
                  </button>
                ))}
              </div>
            </div>

            {/* Exam Date */}
            {examName && examName !== 'Other' && (
              <div className="space-y-2 animate-fade-in">
                <label className="text-xs font-display text-text-muted" htmlFor="onboarding-date">Exam date? (optional)</label>
                <input
                  id="onboarding-date"
                  type="date"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  className="w-full bg-midnight-card border border-midnight-border rounded-xl px-4 py-3 text-sm text-text-primary font-body outline-none focus:border-violet/50 transition-colors"
                />
              </div>
            )}

            <button onClick={handleSetup} className="btn-primary w-full">
              Enter MindFlow →
            </button>

            <button
              onClick={() => { setProfile({ onboarded: true }); router.push('/'); }}
              className="text-text-dim text-xs w-full text-center hover:text-text-muted transition-colors"
            >
              Skip for now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
