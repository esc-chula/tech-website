import { createCallerFactory, createTRPCRouter } from '~/server/api/trpc';

import { aboutRouter } from './routers/about';
import { authRouter } from './routers/auth';
import { linkShortenerRouter } from './routers/link-shortener';
import { qrCodeRouter } from './routers/qr-code';
import { roleRouter } from './routers/role';
import { techmonthRouter } from './routers/techmonth';

export const appRouter = createTRPCRouter({
  about: aboutRouter,
  auth: authRouter,
  linkShortener: linkShortenerRouter,
  qrCode: qrCodeRouter,
  role: roleRouter,
  techmonth: techmonthRouter,
});

export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
