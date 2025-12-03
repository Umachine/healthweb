// 운동별 스트레칭 관련 블로그 및 칼럼 데이터
export interface BlogContent {
  id: string;
  title: string;
  thumbnail: string;
  author: string;
  publishedAt: string;
  blogUrl: string;
  excerpt: string;
  category: string;
}

export const blogContents: BlogContent[] = [
  {
    id: '1',
    title: '러닝 전후 꼭 해야 할 스트레칭 5가지',
    thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=400&fit=crop',
    author: '건강한 운동',
    publishedAt: '2024-01-15',
    blogUrl: 'https://health.naver.com/medical/qnaDetail.naver?dirId=70206&docId=0000000367',
    excerpt: '러닝 전후 필수 스트레칭 동작을 통해 부상을 예방하고 운동 효과를 높여보세요.',
    category: '러닝'
  },
  {
    id: '2',
    title: '헬스장에서 하는 운동 전 워밍업 스트레칭',
    thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop',
    author: '피트니스 전문가',
    publishedAt: '2024-01-14',
    blogUrl: 'https://health.naver.com/medical/qnaDetail.naver?dirId=70206&docId=0000000368',
    excerpt: '웨이트 트레이닝 전 반드시 해야 할 스트레칭과 워밍업 방법을 알려드립니다.',
    category: '웨이트'
  },
  {
    id: '3',
    title: '수영 전 스트레칭으로 수영 실력 향상하기',
    thumbnail: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=400&fit=crop',
    author: '수영 코치',
    publishedAt: '2024-01-13',
    blogUrl: 'https://health.naver.com/medical/qnaDetail.naver?dirId=70206&docId=0000000369',
    excerpt: '수영 전 스트레칭으로 유연성을 높이고 수영 효율을 개선하는 방법을 알아보세요.',
    category: '수영'
  },
  {
    id: '4',
    title: '자전거 타기 전 다리 스트레칭 완벽 가이드',
    thumbnail: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=400&h=400&fit=crop',
    author: '사이클 전문가',
    publishedAt: '2024-01-12',
    blogUrl: 'https://health.naver.com/medical/qnaDetail.naver?dirId=70206&docId=0000000370',
    excerpt: '자전거 타기 전 필수 다리 스트레칭으로 장거리 라이딩도 편하게!',
    category: '자전거'
  },
  {
    id: '5',
    title: '요가 전 워밍업 스트레칭으로 부상 예방하기',
    thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=400&fit=crop',
    author: '요가 마스터',
    publishedAt: '2024-01-11',
    blogUrl: 'https://health.naver.com/medical/qnaDetail.naver?dirId=70206&docId=0000000371',
    excerpt: '요가 전 워밍업 스트레칭으로 유연성을 높이고 요가 자세를 더 깊게 들어가세요.',
    category: '요가'
  },
  {
    id: '6',
    title: '운동별 맞춤 스트레칭 - 전신 운동 편',
    thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
    author: '운동 전문가',
    publishedAt: '2024-01-10',
    blogUrl: 'https://health.naver.com/medical/qnaDetail.naver?dirId=70206&docId=0000000372',
    excerpt: '전신 운동 전후에 필요한 스트레칭 동작을 한눈에 모아봤습니다.',
    category: '전신'
  },
  {
    id: '7',
    title: '등 근육 강화를 위한 스트레칭 방법',
    thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=400&fit=crop',
    author: '헬스 트레이너',
    publishedAt: '2024-01-09',
    blogUrl: 'https://health.naver.com/medical/qnaDetail.naver?dirId=70206&docId=0000000373',
    excerpt: '올바른 등 스트레칭으로 척추 건강을 지키고 근육통을 완화하세요.',
    category: '등'
  },
  {
    id: '8',
    title: '다리 근육 풀어주는 스트레칭 10분 루틴',
    thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
    author: '필라테스 강사',
    publishedAt: '2024-01-08',
    blogUrl: 'https://health.naver.com/medical/qnaDetail.naver?dirId=70206&docId=0000000374',
    excerpt: '하루 10분만 투자해도 다리 근육이 부드러워지는 간단한 스트레칭.',
    category: '다리'
  },
  {
    id: '9',
    title: '어깨와 목 스트레칭으로 통증 완화하기',
    thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
    author: '물리치료사',
    publishedAt: '2024-01-07',
    blogUrl: 'https://health.naver.com/medical/qnaDetail.naver?dirId=70206&docId=0000000375',
    excerpt: '데스크워커를 위한 어깨와 목 스트레칭으로 근육통을 해소하세요.',
    category: '어깨'
  },
  {
    id: '10',
    title: '운동 후 쿨다운 스트레칭의 중요성',
    thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=400&fit=crop',
    author: '운동 생리학자',
    publishedAt: '2024-01-06',
    blogUrl: 'https://health.naver.com/medical/qnaDetail.naver?dirId=70206&docId=0000000376',
    excerpt: '운동 후 반드시 해야 하는 쿨다운 스트레칭으로 회복력을 높이세요.',
    category: '쿨다운'
  },
  {
    id: '11',
    title: '하루 5분 아침 스트레칭 루틴',
    thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=400&fit=crop',
    author: '건강 라이프',
    publishedAt: '2024-01-05',
    blogUrl: 'https://health.naver.com/medical/qnaDetail.naver?dirId=70206&docId=0000000377',
    excerpt: '바쁜 아침에도 5분만 투자하면 하루 종일 편안한 몸을 만들 수 있습니다.',
    category: '아침'
  },
  {
    id: '12',
    title: '운동 전 워밍업 스트레칭 완벽 가이드',
    thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop',
    author: '스포츠 과학',
    publishedAt: '2024-01-04',
    blogUrl: 'https://health.naver.com/medical/qnaDetail.naver?dirId=70206&docId=0000000378',
    excerpt: '운동 전 워밍업의 중요성과 올바른 스트레칭 방법을 알아보세요.',
    category: '워밍업'
  },
  {
    id: '13',
    title: '허리 통증 완화 스트레칭 7가지',
    thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
    author: '척추 전문의',
    publishedAt: '2024-01-03',
    blogUrl: 'https://health.naver.com/medical/qnaDetail.naver?dirId=70206&docId=0000000379',
    excerpt: '허리 통증을 완화하는 효과적인 스트레칭 동작들을 소개합니다.',
    category: '허리'
  },
  {
    id: '14',
    title: '유연성 향상을 위한 정적 스트레칭',
    thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=400&fit=crop',
    author: '요가 전문가',
    publishedAt: '2024-01-02',
    blogUrl: 'https://health.naver.com/medical/qnaDetail.naver?dirId=70206&docId=0000000380',
    excerpt: '정적 스트레칭의 올바른 방법과 효과를 알아보고 유연성을 높여보세요.',
    category: '유연성'
  },
  {
    id: '15',
    title: '근육 통증 해소 스트레칭 방법',
    thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
    author: '스포츠 마사지',
    publishedAt: '2024-01-01',
    blogUrl: 'https://health.naver.com/medical/qnaDetail.naver?dirId=70206&docId=0000000381',
    excerpt: '운동 후 근육 통증을 완화하는 스트레칭 동작들을 배워보세요.',
    category: '통증'
  },
  {
    id: '16',
    title: '발목과 종아리 스트레칭 가이드',
    thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=400&fit=crop',
    author: '재활 전문가',
    publishedAt: '2023-12-31',
    blogUrl: 'https://health.naver.com/medical/qnaDetail.naver?dirId=70206&docId=0000000382',
    excerpt: '발목과 종아리 근육을 풀어주는 스트레칭으로 부상을 예방하세요.',
    category: '다리'
  },
  {
    id: '17',
    title: '손목과 팔꿈치 스트레칭으로 근육 긴장 완화',
    thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop',
    author: '작업치료사',
    publishedAt: '2023-12-30',
    blogUrl: 'https://health.naver.com/medical/qnaDetail.naver?dirId=70206&docId=0000000383',
    excerpt: '장시간 컴퓨터 작업으로 인한 손목과 팔꿈치 통증을 해소하는 스트레칭.',
    category: '상체'
  },
  {
    id: '18',
    title: '엉덩이와 골반 스트레칭 운동법',
    thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
    author: '필라테스 강사',
    publishedAt: '2023-12-29',
    blogUrl: 'https://health.naver.com/medical/qnaDetail.naver?dirId=70206&docId=0000000384',
    excerpt: '엉덩이와 골반 스트레칭으로 자세 교정과 통증 완화를 동시에!',
    category: '하체'
  },
  {
    id: '19',
    title: '운동 전후 스트레칭 타이밍 가이드',
    thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=400&fit=crop',
    author: '운동 생리학',
    publishedAt: '2023-12-28',
    blogUrl: 'https://health.naver.com/medical/qnaDetail.naver?dirId=70206&docId=0000000385',
    excerpt: '언제 스트레칭을 해야 가장 효과적인지 타이밍을 알아보세요.',
    category: '전문가 팁'
  },
  {
    id: '20',
    title: '스트레칭으로 운동 효과 2배 높이기',
    thumbnail: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=400&h=400&fit=crop',
    author: '피트니스 코치',
    publishedAt: '2023-12-27',
    blogUrl: 'https://health.naver.com/medical/qnaDetail.naver?dirId=70206&docId=0000000386',
    excerpt: '올바른 스트레칭으로 운동 효과를 극대화하는 방법을 배워보세요.',
    category: '전문가 팁'
  },
];
