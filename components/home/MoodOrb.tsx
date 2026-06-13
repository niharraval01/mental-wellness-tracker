'use client';

import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store/useAppStore';
import { MOOD_LABELS } from '@/lib/utils/constants';
import { useMemo } from 'react';

function getOrbConfig(mood: number) {
  if (mood >= 8) return { gradient: 'from-mint to-mint-light', speed: 6, scale: 1.15, label: 'Radiant' };
  if (mood >= 6) return { gradient: 'from-mint/80 to-violet/60', speed: 5, scale: 1.1, label: 'Balanced' };
  if (mood >= 4) return { gradient: 'from-violet to-violet-light', speed: 4, scale: 1.0, label: 'Steady' };
  if (mood >= 2) return { gradient: 'from-coral/70 to-violet/50', speed: 2.5, scale: 0.95, label: 'Uneasy' };
  return { gradient: 'from-coral to-coral-light', speed: 1.5, scale: 0.9, label: 'Stormy' };
}

export default function MoodOrb() {
  const mood = useAppStore((s) => s.currentMood);
  const config = useMemo(() => getOrbConfig(mood), [mood]);

  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <motion.div
        className="relative"
        animate={{ scale: [config.scale, config.scale * 1.08, config.scale] }}
        transition={{
          duration: config.speed,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Outer glow */}
        <div
          className={`absolute inset-[-20px] bg-gradient-to-br ${config.gradient} rounded-full blur-3xl opacity-30`}
        />
        {/* Core orb */}
        <motion.div
          className={`w-36 h-36 rounded-full bg-gradient-to-br ${config.gradient} shadow-2xl relative z-10`}
          style={{ filter: 'saturate(1.2)' }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        />
        {/* Inner highlight */}
        <div className="absolute top-4 left-6 w-12 h-8 bg-white/10 rounded-full blur-md z-20" />
      </motion.div>

      <div className="text-center">
        <p className="text-text-muted text-sm font-body">{config.label}</p>
        <p className="text-text-primary text-lg font-display font-semibold">
          {MOOD_LABELS[mood] || 'Okay'}
        </p>
      </div>
    </div>
  );
}
