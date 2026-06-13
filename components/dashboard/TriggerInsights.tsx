'use client';
import { useWellnessStore } from '@/lib/store/useWellnessStore';
import styles from './Dashboard.module.css';

export default function TriggerInsights() {
  const { triggers } = useWellnessStore();

  if (!triggers || triggers.length === 0) {
    return null;
  }

  return (
    <div className={styles.insightsContainer}>
      <h3 className={styles.insightsTitle}>Observed Patterns</h3>
      <p className={styles.insightsSubtitle}>Based on your recent entries, we've noticed these themes:</p>
      <div className={styles.tagCloud}>
        {triggers.map((trigger, idx) => (
          <span key={idx} className={styles.tag}>
            {trigger}
          </span>
        ))}
      </div>
    </div>
  );
}
