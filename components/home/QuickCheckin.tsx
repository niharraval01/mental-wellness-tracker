'use client';

import { useAppStore } from '@/lib/store/useAppStore';
import { useCallback } from 'react';
import { MOOD_LABELS } from '@/lib/utils/constants';

interface SliderProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  color: string;
  emoji: string;
}

function MetricSlider({ label, value, onChange, color, emoji }: SliderProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-lg" role="img" aria-hidden="true">{emoji}</span>
      <div className="flex-1">
        <div className="flex justify-between mb-1">
          <span className="text-xs font-display text-text-muted">{label}</span>
          <span className={`text-xs font-semibold ${color}`}>{value}/10</span>
        </div>
        <input
          type="range"
          min={0}
          max={10}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full"
          aria-label={`${label} level`}
        />
      </div>
    </div>
  );
}

export default function QuickCheckin() {
  const { currentMood, currentEnergy, currentFocus, currentAnxiety, setMetrics } = useAppStore();

  const handleMood = useCallback((v: number) => setMetrics(v, currentEnergy, currentFocus, currentAnxiety), [currentEnergy, currentFocus, currentAnxiety, setMetrics]);
  const handleEnergy = useCallback((v: number) => setMetrics(currentMood, v, currentFocus, currentAnxiety), [currentMood, currentFocus, currentAnxiety, setMetrics]);
  const handleFocus = useCallback((v: number) => setMetrics(currentMood, currentEnergy, v, currentAnxiety), [currentMood, currentEnergy, currentAnxiety, setMetrics]);
  const handleAnxiety = useCallback((v: number) => setMetrics(currentMood, currentEnergy, currentFocus, v), [currentMood, currentEnergy, currentFocus, setMetrics]);

  return (
    <div className="glass-card p-5 space-y-4">
      <h3 className="font-display font-semibold text-text-primary">Quick Check-In</h3>
      <MetricSlider label="Mood" value={currentMood} onChange={handleMood} color="text-violet" emoji="😊" />
      <MetricSlider label="Energy" value={currentEnergy} onChange={handleEnergy} color="text-mint" emoji="⚡" />
      <MetricSlider label="Focus" value={currentFocus} onChange={handleFocus} color="text-violet-light" emoji="🎯" />
      <MetricSlider label="Anxiety" value={currentAnxiety} onChange={handleAnxiety} color="text-coral" emoji="😰" />
    </div>
  );
}
