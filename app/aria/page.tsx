'use client';

import { useChat } from '@ai-sdk/react';
import { useAppStore } from '@/lib/store/useAppStore';
import { useEffect, useRef, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import BottomNav from '@/components/layout/BottomNav';
import PageTransition from '@/components/layout/PageTransition';
import CrisisOverlay from '@/components/chat/CrisisOverlay';

const MODE_CONFIG = {
  vent: { label: 'Vent', emoji: '💨', description: 'Just listen to me' },
  strategy: { label: 'Strategy', emoji: '🧠', description: 'Give me a plan' },
  hype: { label: 'Hype', emoji: '🔥', description: 'Gas me up' },
} as const;

export default function AriaPage() {
  const { ariaMode, setAriaMode, profile, currentMood, entries, setCrisisActive, crisisActive, addXP, addActiveDate, addBadge } = useAppStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const recentTriggers = useMemo(() => {
    const allTriggers = entries.slice(0, 5).flatMap((e) => e.triggers);
    return [...new Set(allTriggers)].slice(0, 6);
  }, [entries]);

  const recentSummaries = useMemo(
    () => entries.slice(0, 3).map((e) => e.summary),
    [entries]
  );

  const { messages, input, handleInputChange, handleSubmit, status } = useChat({
    api: '/api/aria/chat',
    body: {
      data: {
        mode: ariaMode,
        mood: currentMood,
        profile,
        recentTriggers,
        recentEntries: recentSummaries,
      },
    },
    onFinish: () => {
      addXP('ariaChat');
      addActiveDate(new Date().toISOString().split('T')[0]);
      addBadge('vent-session');
    },
  });

  const isLoading = status === 'streaming' || status === 'submitted';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Crisis detection in Aria responses
  useEffect(() => {
    const last = messages[messages.length - 1];
    if (last?.role === 'assistant' && last.content.includes('CRISIS_DETECTED')) {
      setCrisisActive(true);
    }
  }, [messages, setCrisisActive]);

  const handleFormSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e);
  }, [handleSubmit]);

  if (crisisActive) {
    return <CrisisOverlay onClose={() => setCrisisActive(false)} />;
  }

  return (
    <>
      <PageTransition>
        <main className="max-w-lg mx-auto flex flex-col h-[calc(100dvh-4rem)]">
          {/* Header */}
          <div className="px-4 pt-6 pb-3 space-y-3">
            <div className="flex items-baseline justify-between">
              <h1 className="font-display text-2xl font-bold text-text-primary">Aria 💬</h1>
              <span className="text-[10px] text-text-dim font-body">AI companion, not a therapist</span>
            </div>

            {/* Mode Selector */}
            <div className="flex gap-2">
              {(Object.keys(MODE_CONFIG) as Array<keyof typeof MODE_CONFIG>).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setAriaMode(mode)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-display font-semibold transition-all duration-200 ${
                    ariaMode === mode
                      ? 'bg-violet text-white shadow-lg'
                      : 'bg-midnight-card text-text-muted border border-midnight-border hover:border-violet/30'
                  }`}
                >
                  <span>{MODE_CONFIG[mode].emoji}</span>
                  <span>{MODE_CONFIG[mode].label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 space-y-3 pb-3" aria-live="polite">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center gap-3 py-12">
                <span className="text-4xl">✨</span>
                <p className="text-text-muted text-sm font-body max-w-[260px]">
                  Hey! I&apos;m Aria. {MODE_CONFIG[ariaMode].description.toLowerCase()} — or just say hi.
                </p>
              </div>
            )}

            {messages.map((m) => {
              const content = m.content.replace('CRISIS_DETECTED', '').trim();
              if (!content) return null;

              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm font-body leading-relaxed whitespace-pre-wrap ${
                      m.role === 'user'
                        ? 'bg-violet text-white rounded-br-md'
                        : 'glass-card text-text-primary rounded-bl-md'
                    }`}
                  >
                    {content}
                  </div>
                </motion.div>
              );
            })}

            {isLoading && messages[messages.length - 1]?.role === 'user' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="glass-card px-4 py-3 rounded-2xl rounded-bl-md">
                  <span className="text-text-muted text-sm animate-pulse">Aria is typing...</span>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleFormSubmit} className="px-4 pb-4 flex gap-2">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Talk to Aria..."
              className="flex-1 bg-midnight-card border border-midnight-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder-text-dim font-body outline-none focus:border-violet/50 transition-colors"
              disabled={isLoading}
              aria-label="Message to Aria"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="btn-primary !px-4 !py-3 disabled:opacity-40"
            >
              ➤
            </button>
          </form>
        </main>
      </PageTransition>
      <BottomNav />
    </>
  );
}
