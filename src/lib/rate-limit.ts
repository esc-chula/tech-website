/* eslint-disable @typescript-eslint/no-explicit-any -- we need to use any for the action function */
import { cookies, headers } from 'next/headers'

import redis from './redis'

interface RateLimitConfig {
  maxAttempts: number
  windowInSeconds: number
  identifierMethod: 'sid' | 'ip'
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

const getIp = (): string | null => {
  const forwardedFor = headers().get('x-forwarded-for')
  return forwardedFor
}

const getSessionId = (): string | null => {
  const cookieStore = cookies()
  return cookieStore.get('sid')?.value ?? null
}

const getRateLimitIdentifier = (method: 'sid' | 'ip'): string | null => {
  switch (method) {
    case 'sid':
      return getSessionId()
    case 'ip':
      return getIp()
    default:
      return null
  }
}

export function withRateLimit<T, P extends any[]>(
  action: (...args: P) => Promise<Response<T>>,
  config: RateLimitConfig,
  actionIdentifier: string
): (...args: P) => Promise<Response<T>> {
  return async (...args: P): Promise<Response<T>> => {
    const id = getRateLimitIdentifier(config.identifierMethod)
    console.log('id:', id)
    if (!id) {
      return {
        success: false,
        errors: ['Unauthorized'],
        message:
          config.identifierMethod === 'sid'
            ? 'Unauthorized: No session ID found'
            : 'Unauthorized: No IP address found',
      }
    }

    const key = `rate-limit:${actionIdentifier}:${id}`
    try {
      const attempts = await redis.get(key)
      const currentAttempts = attempts ? parseInt(attempts, 10) : 0

      if (currentAttempts >= config.maxAttempts) {
        return {
          success: false,
          errors: ['Number of attempts exceeded the limit'],
          message: 'Rate limit exceeded, please try again later',
        }
      }

      if (currentAttempts === 0) {
        await redis.setex(key, config.windowInSeconds, '1')
      } else {
        await redis.incr(key)
      }

      return await action(...args)
    } catch (error) {
      console.error('Rate limit error:', error)
      return {
        success: false,
        errors: ['Unexpected error occurred'],
        message: 'Internal server error',
      }
    }
  }
}
