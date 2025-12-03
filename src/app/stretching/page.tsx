'use client';

import { useState } from 'react';
import Header from '@/components/Navigation/Header';
import StretchingShorts from '@/components/Stretching/StretchingShorts';

const categories = [
  { value: '20s', label: '20대' },
  { value: '30s', label: '30대' },
  { value: '40s', label: '40대' },
  { value: 'diet', label: '다이어터' },
  { value: 'beginner', label: '헬린이' },
];

export default function StretchingPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  return (
    <>
      <Header title="스트레칭 추천" />
      <main className="px-4 py-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">카테고리</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-4 py-2 rounded-full text-sm ${
                selectedCategory === ''
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              전체
            </button>
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-full text-sm ${
                  selectedCategory === category.value
                    ? 'bg-black text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <StretchingShorts 
          category={selectedCategory || undefined}
        />
      </main>
    </>
  );
}