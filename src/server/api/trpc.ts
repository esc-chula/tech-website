import { TRPCError, initTRPC } from '@trpc/server'
import superjson from 'superjson'
import { ZodError } from 'zod'

import { getSIDFromHeader } from '~/lib/auth'
import { db } from '~/server/db'

import { grpc } from '../auth/grpc'

interface TRPCContext {
  db: typeof db
  session: {
    user: {
      id: number
      oidcId: string | null
      studentId: string
    } | null
  }
  headers: Headers
}

export const createTRPCContext = async (opts: {
  headers: Headers
}): Promise<TRPCContext> => {
  const sessionId = getSIDFromHeader(opts.headers)

  const me = sessionId
    ? await grpc.account
        .me({
          sessionId,
        })
        .catch((error: unknown) => {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message:
              error instanceof Error ? error.message : 'Something went wrong',
          })
        })
    : null

  const user = me?.account
    ? await db.user.findUnique({ where: { oidcId: me.account.publicId } })
    : null

  return {
    db,
    session: {
      ...me?.session,
      user,
    },
    ...opts,
  }
}

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

/**
 * Create a server-side caller.
 *
 * @see https://trpc.io/docs/server/server-side-calls
 */
export const createCallerFactory = t.createCallerFactory

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router

export const trpc = t.procedure
