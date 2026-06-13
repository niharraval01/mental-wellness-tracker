'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/journal', label: 'Journal', icon: '📝' },
  { href: '/aria', label: 'Aria', icon: '💬' },
  { href: '/breathe', label: 'Breathe', icon: '🫧' },
  { href: '/insights', label: 'Insights', icon: '📊' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-midnight/80 backdrop-blur-xl border-t border-midnight-border"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-lg mx-auto flex justify-around items-center h-16 px-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-200 min-w-[56px] ${
                isActive
                  ? 'text-violet bg-violet-glow'
                  : 'text-text-muted hover:text-text-primary'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="text-lg" role="img" aria-hidden="true">{item.icon}</span>
              <span className="text-[10px] font-medium font-display">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
