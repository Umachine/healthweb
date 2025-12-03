import type { Metadata } from 'next';
import './globals.css';
import BottomNav from '@/components/Navigation/BottomNav';

export const metadata: Metadata = {
  title: '건강한 스포츠 활동 - 스트레칭 가이드',
  description: '안전하고 건강한 스포츠 활동을 위한 전문 스트레칭 서비스',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-gray-50">
        <div className="max-w-md mx-auto bg-white min-h-screen pb-16">
          {children}
        </div>
        <BottomNav />
      </body>
    </html>
  );
}

