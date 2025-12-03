export interface ExerciseRecord {
  id: string;
  userId: string;
  exerciseType: string;
  stretchingId?: string;
  duration: number; // 분 단위
  date: Date;
  notes?: string;
}

export interface AlertSetting {
  id: string;
  userId: string;
  enabled: boolean;
  time: string; // HH:mm 형식
  days: string[]; // 요일 배열
  exerciseTypes: string[];
}

