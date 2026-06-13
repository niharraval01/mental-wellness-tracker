'use client';

import JournalEntry from '@/components/journal/JournalEntry';
import MoodSelector from '@/components/journal/MoodSelector';
import CompanionChat from '@/components/chat/CompanionChat';
import TriggerInsights from './TriggerInsights';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  return (
    <div className={styles.dashboardLayout}>
      <div className={styles.leftColumn}>
        <MoodSelector />
        <JournalEntry />
        <TriggerInsights />
      </div>
      <div className={styles.rightColumn}>
        <CompanionChat />
      </div>
    </div>
  );
}
