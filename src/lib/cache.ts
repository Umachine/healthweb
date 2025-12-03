// 간단한 인메모리 캐시 구현
interface CacheItem<T> {
  data: T;
  expiresAt: number;
}

class SimpleCache {
  private cache = new Map<string, CacheItem<any>>();
  private defaultTTL: number;

  constructor(defaultTTL: number = 60 * 60 * 1000) {
    // 기본 TTL: 1시간
    this.defaultTTL = defaultTTL;
    
    // 주기적으로 만료된 캐시 정리
    setInterval(() => this.cleanup(), 5 * 60 * 1000); // 5분마다
  }

  set<T>(key: string, data: T, ttl?: number): void {
    const expiresAt = Date.now() + (ttl || this.defaultTTL);
    this.cache.set(key, { data, expiresAt });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }

    if (Date.now() > item.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return item.data as T;
  }

  has(key: string): boolean {
    const item = this.cache.get(key);
    if (!item) return false;
    
    if (Date.now() > item.expiresAt) {
      this.cache.delete(key);
      return false;
    }
    
    return true;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiresAt) {
        this.cache.delete(key);
      }
    }
  }

  size(): number {
    return this.cache.size;
  }
}

export const cache = new SimpleCache(60 * 60 * 1000); // 1시간 TTL


