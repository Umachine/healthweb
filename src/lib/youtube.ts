import { google } from 'googleapis';

const youtube = google.youtube('v3');

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  publishedAt: string;
  channelTitle: string;
  viewCount?: number;
}

export interface StretchingVideo extends YouTubeVideo {
  category: string; // 운동 종류
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  bodyPart: string[]; // 운동 부위
  durationSeconds: number;
  tags: string[];
}

class YouTubeService {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.YOUTUBE_API_KEY || '';
    if (!this.apiKey) {
      throw new Error('YOUTUBE_API_KEY is not set');
    }
  }

  /**
   * 스트레칭 관련 YouTube Shorts 검색
   * 1분 이하 영상만 필터링
   */
  async searchStretchingShorts(
    query: string,
    maxResults: number = 10
  ): Promise<YouTubeVideo[]> {
    try {
      const response = await youtube.search.list({
        key: this.apiKey,
        part: ['snippet'],
        q: `${query} 스트레칭`,
        type: ['video'],
        videoDuration: 'short', // 4분 이하
        maxResults,
        order: 'viewCount', // 조회수 순
      });

      if (!response.data.items) {
        return [];
      }

      // 영상 상세 정보 가져오기 (duration 포함)
      const videoIds = response.data.items
        .map((item) => item.id?.videoId)
        .filter((id): id is string => !!id);

      const videoDetails = await this.getVideoDetails(videoIds);

      // 1분(60초) 이하만 필터링
      const shorts = videoDetails.filter(
        (video) => video.durationSeconds <= 60
      );

      return shorts;
    } catch (error) {
      console.error('YouTube API Error:', error);
      throw error;
    }
  }

  /**
   * 영상 상세 정보 가져오기 (duration 포함)
   */
  async getVideoDetails(videoIds: string[]): Promise<YouTubeVideo[]> {
    try {
      const response = await youtube.videos.list({
        key: this.apiKey,
        part: ['snippet', 'contentDetails', 'statistics'],
        id: videoIds,
      });

      if (!response.data.items) {
        return [];
      }

      return response.data.items.map((item) => {
        const duration = this.parseDuration(
          item.contentDetails?.duration || ''
        );

        return {
          id: item.id || '',
          title: item.snippet?.title || '',
          description: item.snippet?.description || '',
          thumbnail:
            item.snippet?.thumbnails?.high?.url ||
            item.snippet?.thumbnails?.default?.url ||
            '',
          duration: this.formatDuration(duration),
          durationSeconds: duration,
          publishedAt: item.snippet?.publishedAt || '',
          channelTitle: item.snippet?.channelTitle || '',
          viewCount: parseInt(item.statistics?.viewCount || '0'),
        };
      });
    } catch (error) {
      console.error('YouTube API Error:', error);
      throw error;
    }
  }

  /**
   * ISO 8601 duration을 초로 변환
   */
  private parseDuration(duration: string): number {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 0;

    const hours = parseInt(match[1] || '0');
    const minutes = parseInt(match[2] || '0');
    const seconds = parseInt(match[3] || '0');

    return hours * 3600 + minutes * 60 + seconds;
  }

  /**
   * 초를 MM:SS 형식으로 변환
   */
  private formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  /**
   * 운동 종류별 스트레칭 추천
   */
  async getStretchingByExerciseType(
    exerciseType: string
  ): Promise<YouTubeVideo[]> {
    const queries = {
      running: '러닝 전 스트레칭',
      cycling: '자전거 전 스트레칭',
      swimming: '수영 전 스트레칭',
      weightlifting: '웨이트 전 스트레칭',
      yoga: '요가 전 워밍업',
    };

    const query = queries[exerciseType as keyof typeof queries] || exerciseType;
    return this.searchStretchingShorts(query, 5);
  }

  /**
   * 트렌드별 스트레칭 검색
   */
  async getTrendingStretching(): Promise<YouTubeVideo[]> {
    return this.searchStretchingShorts('스트레칭', 20);
  }

  /**
   * 카테고리별 스트레칭 추천
   */
  async getStretchingByCategory(
    category: string,
    maxResults: number = 10
  ): Promise<YouTubeVideo[]> {
    const queries = {
      '20s': '20대 스트레칭',
      '30s': '30대 스트레칭',
      '40s': '40대 스트레칭',
      'diet': '다이어트 스트레칭',
      'beginner': '초보자 스트레칭',
    };

    const query = queries[category as keyof typeof queries] || category;
    return this.searchStretchingShorts(query, maxResults);
  }
}

export const youtubeService = new YouTubeService();

