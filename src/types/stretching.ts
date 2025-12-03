export interface StretchingVideo {
  id: string;
  youtubeId?: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: number; // 초 단위
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  bodyParts: string[];
  tags: string[];
  viewCount: number;
}

export type ExerciseType = 
  | 'running' 
  | 'cycling' 
  | 'swimming' 
  | 'weightlifting' 
  | 'yoga';

