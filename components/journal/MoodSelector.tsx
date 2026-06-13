'use client';
import { useWellnessStore } from '@/lib/store/useWellnessStore';
import styles from './MoodSelector.module.css';

const moods = [
  { label: 'Great', value: 'great', emoji: '🌟' },
  { label: 'Good', value: 'good', emoji: '😊' },
  { label: 'Okay', value: 'okay', emoji: '😐' },
  { label: 'Bad', value: 'bad', emoji: '😔' },
  { label: 'Awful', value: 'awful', emoji: '😫' },
];

export default function MoodSelector() {
  const { mood, setMood } = useWellnessStore();

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>How are you feeling today?</h3>
      <div className={styles.moodGrid}>
        {moods.map((m) => (
          <button
            key={m.value}
            onClick={() => setMood(m.value as any)}
            className={`${styles.moodButton} ${mood === m.value ? styles.selected : ''}`}
          >
            <span className={styles.emoji}>{m.emoji}</span>
            <span className={styles.label}>{m.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
