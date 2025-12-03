'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: '홈', icon: '🏠' },
  { href: '/planner', label: '플래너', icon: '📋' },
  { href: '/stretching', label: '스트레칭 추천', icon: '🎯' },
  { href: '/qna', label: 'QnA & 매칭', icon: '💬' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive ? 'text-black' : 'text-gray-500'
              }`}
            >
              <span className={`text-xl mb-1 ${isActive ? 'scale-110' : ''} transition-transform`}>
                {item.icon}
              </span>
              <span className={`text-xs ${isActive ? 'font-semibold' : 'font-normal'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

