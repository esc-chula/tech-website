/* eslint-disable @typescript-eslint/ban-types -- Function type is required for the rate limit function */
import { cookies } from 'next/headers';

import redis from './redis';

interface RateLimitConfig {
  maxAttempts: number;
  windowInSeconds: number;
}

interface RateLimitError extends Error {
  remainingTime?: number;
}

const getRateLimitIdentifier = (): string => {
  const cookieStore = cookies();
  const sid = cookieStore.get('sid')?.value;

  if (!sid) {
    throw new Error('Unauthorized: No session ID found');
  }

  return sid;
};

export function withRateLimit(
  action: Function,
  config: RateLimitConfig,
  actionIdentifier: string,
) {
  return async (...args: unknown[]) => {
    const id = getRateLimitIdentifier();
    const key = `rate-limit:${actionIdentifier}:${id}`;

    try {
      // Get current attempts from Redis
      const attempts = await redis.get(key);
      const currentAttempts = attempts ? parseInt(attempts) : 0;

      // Check if rate limit is exceeded
      if (currentAttempts >= config.maxAttempts) {
        // Get remaining time until reset
        const ttl = await redis.ttl(key);
        const error = new Error('Rate limit exceeded') as RateLimitError;
        error.remainingTime = ttl;
        throw error;
      }

      // Increment
      if (currentAttempts === 0) {
        await redis.setex(key, config.windowInSeconds, '1');
      } else {
        await redis.incr(key);
      }

      return (await action(...args)) as Promise<unknown>;
    } catch (error: unknown) {
      if ((error as RateLimitError).remainingTime) {
        throw error;
      }
      if (error instanceof Error && error.message.includes('Unauthorized')) {
        throw error;
      }

      console.error('Rate limit error:', error);
      return (await action(...args)) as Promise<unknown>;
    }
  };
}
