import './global.css';
import { Providers } from './providers';

export const metadata = {
  title: 'Mental Wellness Tracker',
  description: 'AI-powered mental wellness companion for competitive exams.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
