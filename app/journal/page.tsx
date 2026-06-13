'use client';

import BottomNav from '@/components/layout/BottomNav';
import PageTransition from '@/components/layout/PageTransition';
import { useAppStore } from '@/lib/store/useAppStore';
import { toDateString } from '@/lib/utils/streaks';
import { detectCrisisClient } from '@/lib/ai/crisisDetector';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export default function JournalPage() {
  const { currentMood, currentEnergy, currentFocus, currentAnxiety, addEntry, addXP, addActiveDate, setCrisisActive, addBadge } = useAppStore();
  const router = useRouter();

  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<{ sentiment: string; triggers: string[]; summary: string } | null>(null);
  const [saved, setSaved] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (!text.trim()) return;

    // Client-side crisis pre-screen
    const crisisTier = detectCrisisClient(text);
    if (crisisTier === 'tier2') {
      setCrisisActive(true);
      return;
    }

    setIsAnalyzing(true);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entry: text,
          mood: currentMood,
          energy: currentEnergy,
          focus: currentFocus,
          anxiety: currentAnxiety,
        }),
      });

      const data = await res.json();

      if (data.crisisFlag) {
        setCrisisActive(true);
        return;
      }

      const today = toDateString(new Date());
      const entry = {
        id: `${today}-${Date.now()}`,
        date: today,
        text,
        mood: currentMood,
        energy: currentEnergy,
        focus: currentFocus,
        anxiety: currentAnxiety,
        triggers: data.triggers || [],
        sentiment: data.sentiment || 'neutral',
        summary: data.summary || 'Entry saved',
        createdAt: new Date().toISOString(),
      };

      addEntry(entry);
      addXP('journal');
      addActiveDate(today);
      setAnalysis(data);
      setSaved(true);

      // Badge: Night Owl
      const hour = new Date().getHours();
      if (hour >= 0 && hour < 5) addBadge('night-owl');
      if (hour >= 5 && hour < 7) addBadge('early-bird');
    } catch (err) {
      console.error('Journal analysis failed:', err);
      // Save locally anyway
      const today = toDateString(new Date());
      addEntry({
        id: `${today}-${Date.now()}`,
        date: today,
        text,
        mood: currentMood,
        energy: currentEnergy,
        focus: currentFocus,
        anxiety: currentAnxiety,
        triggers: [],
        sentiment: 'neutral',
        summary: 'Entry saved (offline)',
        createdAt: new Date().toISOString(),
      });
      addActiveDate(today);
      setSaved(true);
    } finally {
      setIsAnalyzing(false);
    }
  }, [text, currentMood, currentEnergy, currentFocus, currentAnxiety, addEntry, addXP, addActiveDate, setCrisisActive, addBadge]);

  return (
    <>
      <PageTransition>
        <main className="max-w-lg mx-auto px-4 pt-6 pb-4 space-y-5">
          <div>
            <h1 className="font-display text-2xl font-bold text-text-primary">Journal ✍️</h1>
            <p className="text-text-muted text-sm mt-1">Your story starts here — what happened today?</p>
          </div>

          {/* Journal Text Area */}
          <div className="glass-card p-4 space-y-3">
            <textarea
              value={text}
              onChange={(e) => { setText(e.target.value); setSaved(false); setAnalysis(null); }}
              placeholder="How was your day? Any wins? What's weighing on you? Write freely — this is your space."
              rows={8}
              className="w-full bg-transparent text-text-primary placeholder-text-dim font-body text-sm resize-none outline-none leading-relaxed"
              aria-label="Journal entry"
              disabled={saved}
            />
          </div>

          {/* Submit Button */}
          {!saved && (
            <button
              onClick={handleSubmit}
              disabled={!text.trim() || isAnalyzing}
              className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? 'Analyzing...' : 'Save & Analyze ✨'}
            </button>
          )}

          {/* Analysis Result — "Today's Vibe" Card */}
          {analysis && saved && (
            <div className="glass-card p-5 space-y-4 animate-fade-in">
              <div>
                <p className="text-xs text-text-muted font-display uppercase tracking-wider">Today&apos;s Vibe</p>
                <p className="text-text-primary font-body mt-1">{analysis.summary}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-text-muted">Sentiment:</span>
                <span className="text-xs font-semibold text-violet capitalize">{analysis.sentiment}</span>
              </div>

              {analysis.triggers.length > 0 && (
                <div>
                  <p className="text-xs text-text-muted mb-2">Triggers identified:</p>
                  <div className="flex flex-wrap gap-2">
                    {analysis.triggers.map((t, i) => (
                      <span key={i} className="text-xs px-3 py-1 bg-violet-glow border border-violet/20 text-violet-light rounded-full">
                        #{t.replace(/\s+/g, '')}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 pt-2 border-t border-midnight-border">
                <span className="text-mint text-sm font-semibold">+20 XP</span>
                <span className="text-text-muted text-xs">Entry saved!</span>
              </div>

              <button
                onClick={() => { setText(''); setSaved(false); setAnalysis(null); }}
                className="btn-ghost text-sm w-full"
              >
                Write another entry
              </button>
            </div>
          )}
        </main>
      </PageTransition>
      <BottomNav />
    </>
  );
}
