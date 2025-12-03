import { NextRequest, NextResponse } from 'next/server';
import { youtubeService } from '@/lib/youtube';
import { youtubeApiRateLimiter } from '@/lib/rateLimit';

// 클라이언트 식별자 추출 (IP 기반)
function getClientIdentifier(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwarded?.split(',')[0] || realIp || request.ip || 'unknown';
  return ip;
}

// 입력 검증 함수
function validateInputs(
  query: string | null,
  exerciseType: string | null,
  category: string | null,
  maxResults: number
): { valid: boolean; error?: string } {
  // maxResults 검증 (1-50 사이)
  if (isNaN(maxResults) || maxResults < 1 || maxResults > 50) {
    return { valid: false, error: 'maxResults must be between 1 and 50' };
  }

  // query 길이 검증 (최대 200자)
  if (query && query.length > 200) {
    return { valid: false, error: 'Query string too long' };
  }

  // exerciseType 검증 (최대 50자)
  if (exerciseType && exerciseType.length > 50) {
    return { valid: false, error: 'Exercise type too long' };
  }

  // category 검증 (최대 50자)
  if (category && category.length > 50) {
    return { valid: false, error: 'Category too long' };
  }

  return { valid: true };
}

export async function GET(request: NextRequest) {
  try {
    // Rate Limiting 체크
    const identifier = getClientIdentifier(request);
    const rateLimitCheck = youtubeApiRateLimiter.check(identifier);

    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        {
          error: 'Too many requests',
          message: 'API rate limit exceeded. Please try again later.',
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((rateLimitCheck.resetAt - Date.now()) / 1000)),
            'X-RateLimit-Limit': '10',
            'X-RateLimit-Remaining': String(rateLimitCheck.remaining),
            'X-RateLimit-Reset': String(rateLimitCheck.resetAt),
          },
        }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q') || '';
    const exerciseType = searchParams.get('type');
    const category = searchParams.get('category');
    const maxResults = parseInt(searchParams.get('max') || '10', 10);

    // 입력 검증
    const validation = validateInputs(query, exerciseType, category, maxResults);
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Invalid input parameters' },
        { status: 400 }
      );
    }

    let videos;

    if (category) {
      videos = await youtubeService.getStretchingByCategory(category, maxResults);
    } else if (exerciseType) {
      videos = await youtubeService.getStretchingByExerciseType(exerciseType);
    } else if (query) {
      videos = await youtubeService.searchStretchingShorts(query, maxResults);
    } else {
      videos = await youtubeService.getTrendingStretching();
    }

    return NextResponse.json(
      { videos },
      {
        status: 200,
        headers: {
          'X-RateLimit-Limit': '10',
          'X-RateLimit-Remaining': String(rateLimitCheck.remaining),
        },
      }
    );
  } catch (error: unknown) {
    // 에러 로깅 (서버에만 기록)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('YouTube API Error:', {
      message: errorMessage,
      timestamp: new Date().toISOString(),
    });

    // API 키 관련 오류는 상세 정보 노출하지 않음
    if (
      errorMessage.includes('API key') ||
      errorMessage.includes('keyInvalid') ||
      errorMessage.includes('YOUTUBE_API_KEY')
    ) {
      return NextResponse.json(
        { error: 'Service temporarily unavailable' },
        { status: 503 }
      );
    }

    // 할당량 초과 오류
    if (errorMessage.includes('quota') || (error as any)?.code === 403) {
      return NextResponse.json(
        {
          error: 'Service temporarily unavailable',
          message: 'API quota exceeded. Please try again later.',
        },
        { status: 503 }
      );
    }

    // 일반적인 에러 응답
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}

