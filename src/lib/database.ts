import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// 프로덕션에서는 error만 로깅, 개발 환경에서는 query, error, warn 모두 로깅
const logLevel = process.env.NODE_ENV === 'production' 
  ? ['error'] 
  : ['query', 'error', 'warn'];

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: logLevel,
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

