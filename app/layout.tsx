import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MindFlow — Your Mind, Understood',
  description:
    'AI-powered mental wellness companion for Indian students preparing for NEET, JEE, UPSC, CAT, GATE & CUET. Journal, breathe, and grow — one day at a time.',
  keywords: ['mental wellness', 'student', 'exam stress', 'NEET', 'JEE', 'UPSC', 'AI companion'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-dvh pb-20">
        {children}
      </body>
    </html>
  );
}
