'use client';

import { useState, useEffect } from 'react';
import type { YouTubeVideo } from '@/lib/youtube';

interface StretchingShortsProps {
  exerciseType?: string;
  category?: string;
}

export default function StretchingShorts({ exerciseType, category }: StretchingShortsProps) {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVideos() {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        
        if (exerciseType) {
          params.append('type', exerciseType);
        }

        if (category) {
          params.append('category', category);
        }

        const response = await fetch(`/api/youtube/search?${params.toString()}`);
        const data = await response.json();
        
        if (data.videos) {
          setVideos(data.videos);
        }
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, [exerciseType, category]);

  if (loading) return <div className="text-center py-8 text-gray-500">로딩 중...</div>;

  if (videos.length === 0) {
    return <div className="text-center py-8 text-gray-500">영상을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {videos.map((video) => (
        <div key={video.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-bold text-sm mb-2 line-clamp-2 text-gray-900">
              {video.title}
            </h3>
            <p className="text-xs text-gray-600 mb-3">
              {video.channelTitle} • {video.duration}
            </p>
            <a
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-black text-white px-4 py-2 rounded-lg text-sm font-semibold"
            >
              영상 보기
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

