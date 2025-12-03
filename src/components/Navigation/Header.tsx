'use client';

export default function Header({ title }: { title: string }) {
  return (
    <header className="sticky top-0 bg-white z-40 border-b border-gray-200">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-600 text-xl">👤</span>
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">4</span>
            </div>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      </div>
    </header>
  );
}

