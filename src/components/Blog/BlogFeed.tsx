'use client';

import { useState, useEffect } from 'react';

interface BlogContent {
  id: string;
  title: string;
  thumbnail: string;
  author: string;
  publishedAt: string;
  blogUrl: string;
  excerpt: string;
}

interface BlogFeedProps {
  searchQuery?: string;
}

export default function BlogFeed({ searchQuery = '운동별 스트레칭' }: BlogFeedProps) {
  const [contents, setContents] = useState<BlogContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogContents() {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        params.append('q', searchQuery);
        params.append('max', '20');

        const response = await fetch(`/api/blog/search?${params.toString()}`);
        const data = await response.json();
        
        if (data.contents) {
          setContents(data.contents);
        }
      } catch (error) {
        console.error('Failed to fetch blog contents:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogContents();
  }, [searchQuery]);

  if (loading) {
    return (
      <div className="text-center py-8 text-gray-700">
        로딩 중...
      </div>
    );
  }

  if (contents.length === 0) {
    return (
      <div className="text-center py-8 text-gray-700">
        컨텐츠를 찾을 수 없습니다.
      </div>
    );
  }

  // 중복 썸네일 제거 (같은 thumbnail URL을 가진 항목 중 첫 번째만 유지)
  const uniqueContents = contents.filter((content, index, self) => 
    index === self.findIndex((c) => c.thumbnail === content.thumbnail)
  );

  return (
    <div className="grid grid-cols-1 gap-4">
      {uniqueContents.map((content) => (
        <a
          key={content.id}
          href={content.blogUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col sm:flex-row">
            {/* 썸네일 */}
            <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0">
              <img
                src={content.thumbnail}
                alt={content.title}
                className="w-full h-full object-cover"
              />
            </div>
            {/* 콘텐츠 정보 */}
            <div className="flex-1 p-4 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg mb-2 text-gray-900 line-clamp-2">
                  {content.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {content.excerpt}
                </p>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{content.author}</span>
                <span>{new Date(content.publishedAt).toLocaleDateString('ko-KR')}</span>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
