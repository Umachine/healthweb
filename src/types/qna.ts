export interface QnA {
  id: string;
  userId: string;
  trainerId?: string;
  question: string;
  answer?: string;
  category: string; // 재활, 근성장, 등
  status: 'pending' | 'answered' | 'completed';
  isFree: boolean; // 무료 쿠폰 사용 여부
  createdAt: Date;
  answeredAt?: Date;
}

export interface Trainer {
  id: string;
  name: string;
  specialty: string[]; // 전문 분야
  region: string; // 지역
  rating: number;
  pricePerMinute: number; // 분당 가격
  bio?: string;
}

