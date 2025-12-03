// 간단한 Rate Limiting 구현

interface RateLimitInfo {
  count: number;
  resetAt: number;
}

class RateLimiter {
  private requests = new Map<string, RateLimitInfo>();
  private maxRequests: number;
  private windowMs: number;

  constructor(maxRequests: number = 10, windowMs: number = 60 * 1000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    
    // 주기적으로 만료된 레코드 정리
    setInterval(() => this.cleanup(), 5 * 60 * 1000); // 5분마다
  }

  check(identifier: string): { allowed: boolean; remaining: number; resetAt: number } {
    const now = Date.now();
    const limit = this.requests.get(identifier);

    // 첫 요청이거나 윈도우가 만료된 경우
    if (!limit || now > limit.resetAt) {
      this.requests.set(identifier, {
        count: 1,
        resetAt: now + this.windowMs,
      });
      return {
        allowed: true,
        remaining: this.maxRequests - 1,
        resetAt: now + this.windowMs,
      };
    }

    // 요청 횟수 초과
    if (limit.count >= this.maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetAt: limit.resetAt,
      };
    }

    // 요청 횟수 증가
    limit.count++;
    return {
      allowed: true,
      remaining: this.maxRequests - limit.count,
      resetAt: limit.resetAt,
    };
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [identifier, limit] of this.requests.entries()) {
      if (now > limit.resetAt) {
        this.requests.delete(identifier);
      }
    }
  }
}

// API별로 다른 Rate Limit 설정
export const youtubeApiRateLimiter = new RateLimiter(
  10, // 10 requests
  60 * 1000 // per minute
);

export const blogApiRateLimiter = new RateLimiter(
  30, // 30 requests
  60 * 1000 // per minute
);


