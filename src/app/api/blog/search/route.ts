import { NextRequest, NextResponse } from 'next/server';
import { blogContents, type BlogContent } from '@/data/blogContents';
import { blogApiRateLimiter } from '@/lib/rateLimit';

// 클라이언트 식별자 추출 (IP 기반)
function getClientIdentifier(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwarded?.split(',')[0] || realIp || request.ip || 'unknown';
  return ip;
}

// 입력 검증 함수
function validateInputs(
  query: string,
  maxResults: number
): { valid: boolean; error?: string } {
  // maxResults 검증 (1-100 사이)
  if (isNaN(maxResults) || maxResults < 1 || maxResults > 100) {
    return { valid: false, error: 'maxResults must be between 1 and 100' };
  }

  // query 길이 검증 (최대 200자)
  if (query && query.length > 200) {
    return { valid: false, error: 'Query string too long' };
  }

  return { valid: true };
}

export async function GET(request: NextRequest) {
  try {
    // Rate Limiting 체크
    const identifier = getClientIdentifier(request);
    const rateLimitCheck = blogApiRateLimiter.check(identifier);

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
            'X-RateLimit-Limit': '30',
            'X-RateLimit-Remaining': String(rateLimitCheck.remaining),
            'X-RateLimit-Reset': String(rateLimitCheck.resetAt),
          },
        }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q') || '';
    const maxResults = parseInt(searchParams.get('max') || '20', 10);

    // 입력 검증
    const validation = validateInputs(query, maxResults);
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Invalid input parameters' },
        { status: 400 }
      );
    }

    // 검색어에 따라 블로그 컨텐츠 필터링
    let filteredContents: BlogContent[] = blogContents;
    
    // 검색어가 있고, 기본값이 아닐 때만 필터링
    if (query && query.trim() !== '' && query.trim() !== '운동별 스트레칭') {
      const searchLower = query.toLowerCase();
      filteredContents = blogContents.filter(
        (content) =>
          content.title.toLowerCase().includes(searchLower) ||
          content.excerpt.toLowerCase().includes(searchLower) ||
          content.category.toLowerCase().includes(searchLower) ||
          content.author.toLowerCase().includes(searchLower)
      );
    }

    // 최신순으로 정렬하고 최대 개수만큼 반환
    const sortedContents = filteredContents
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, maxResults);

    return NextResponse.json(
      { contents: sortedContents },
      {
        status: 200,
        headers: {
          'X-RateLimit-Limit': '30',
          'X-RateLimit-Remaining': String(rateLimitCheck.remaining),
        },
      }
    );
  } catch (error: unknown) {
    // 에러 로깅 (서버에만 기록)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Blog API Error:', {
      message: errorMessage,
      timestamp: new Date().toISOString(),
    });

    // 일반적인 에러 응답
    return NextResponse.json(
      { error: 'Failed to fetch blog contents' },
      { status: 500 }
    );
  }
}
