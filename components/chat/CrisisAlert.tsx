'use client';

import styles from './Chat.module.css';

export default function CrisisAlert() {
  return (
    <div className={styles.crisisContainer}>
      <h3 className={styles.crisisTitle}>You are not alone.</h3>
      <p className={styles.crisisText}>
        It sounds like you're going through a really difficult time right now. Please know that there is support available, and things can get better.
      </p>
      <div className={styles.helplines}>
        <h4>Immediate Support:</h4>
        <ul>
          <li><strong>National Suicide Prevention Lifeline:</strong> 988 (USA) or 1-800-273-8255</li>
          <li><strong>Kiran (India):</strong> 1800-599-0019</li>
          <li><strong>AASRA (India):</strong> 9820466726</li>
        </ul>
        <p className={styles.crisisNote}>Please reach out to a trusted friend, family member, or healthcare professional immediately.</p>
      </div>
    </div>
  );
}
