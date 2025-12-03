'use client';

import { useRouter } from 'next/navigation';
import Header from '@/components/Navigation/Header';
import BlogFeed from '@/components/Blog/BlogFeed';

export default function Home() {
  const router = useRouter();
  const bannerImageUrl = '/banner.jpg'; // public 폴더의 이미지 파일명

  const handleRecommendClick = () => {
    router.push('/stretching');
  };

  return (
    <>
      <Header title="홈" />
      <main className="px-4 pb-4">
        {/* 메인 배너 - 기존 배너를 AI 스트레칭 추천받기 위에 배치 */}
        <div className="relative mb-6 rounded-lg overflow-hidden">
          <div className="relative h-64 flex flex-col justify-end p-6">
            {/* 배경 이미지 */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${bannerImageUrl})`,
              }}
            />
            {/* 어두운 오버레이 (텍스트 가독성을 위해) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30" />
            
            {/* 콘텐츠 */}
            <div className="relative z-10 text-white">
              <h3 className="text-xl font-bold mb-1">운동전 스트레칭을 통해 퍼포먼스를 높여 보세요</h3>
              <p className="text-sm text-gray-200 mb-4">안전한 운동을 위한 스트레칭 루틴 코칭</p>
            </div>
          </div>
        </div>

        {/* AI 스트레칭 추천받기 섹션 */}
        <div className="mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
          <h2 className="text-xl font-bold mb-2">AI 스트레칭 추천받기</h2>
          <p className="text-sm mb-4 opacity-90">
            본인의 개인 정보, 신체 스펙에 맞춰 AI가 추천해주는 스트레칭 영상 보기
          </p>
          <button 
            onClick={handleRecommendClick}
            className="bg-white text-blue-600 px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors"
          >
            추천 받기
          </button>
        </div>

        {/* 인스타그램 피드 형태의 블로그 컨텐츠 */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">스트레칭 컨텐츠</h2>
          <BlogFeed searchQuery="운동별 스트레칭" />
        </div>
      </main>
    </>
  );
}