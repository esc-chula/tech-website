import { cookies } from 'next/headers'

import redis from './redis'

interface RateLimitConfig {
  maxAttempts: number
  windowInSeconds: number
}

export type Response<T> =
  | {
      success: true
      message?: string
      data: T
    }
  | {
      success: false
      message?: string
      errors: string[]
    }

const getRateLimitIdentifier = (): string | null => {
  const cookieStore = cookies()
  return cookieStore.get('sid')?.value ?? null
}

export function withRateLimit<T, A extends unknown[]>(
  action: (...args: A) => Promise<T>,
  config: RateLimitConfig,
  actionIdentifier: string
): (...args: A) => Promise<Response<T>> {
  return async (...args: unknown[]): Promise<Response<T>> => {
    const id = getRateLimitIdentifier()
    if (!id) {
      return {
        success: false,
        message: 'Unauthorized: No session ID found',
        errors: ['Unauthorized'],
      }
    }

    const key = `rate-limit:${actionIdentifier}:${id}`

    try {
      const attempts = await redis.get(key)
      const currentAttempts = attempts ? parseInt(attempts, 10) : 0

      if (currentAttempts >= config.maxAttempts) {
        // const ttl = await redis.ttl(key)
        return {
          success: false,
          message: 'Rate limit exceeded, please try again later',
          errors: ['Number of attempts exceeded the limit'],
        }
      }

      if (currentAttempts === 0) {
        await redis.setex(key, config.windowInSeconds, '1')
      } else {
        await redis.incr(key)
      }

      const result = await action(...(args as A))
      return { success: true, data: result }
    } catch (error) {
      console.error('Rate limit error:', error)
      return {
        success: false,
        message: 'Internal server error',
        errors: ['Unexpected error occurred'],
      }
    }
  }
}
