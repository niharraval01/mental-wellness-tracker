import Dashboard from '@/components/dashboard/Dashboard';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1>Mental Wellness Sanctuary</h1>
        <p>A safe space for your thoughts, completely private and judgment-free.</p>
      </header>
      <section className={styles.content}>
        <Dashboard />
      </section>
    </main>
  );
}
