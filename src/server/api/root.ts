import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { techmonthRouter } from "./routers/techmonth";
import { aboutRouter } from "./routers/about";
import { authRouter } from "./routers/auth";
import { linkShortenerRouter } from "./routers/link-shortener";
import { qrCodeRouter } from "./routers/qr-code";

export const appRouter = createTRPCRouter({
  about: aboutRouter,
  auth: authRouter,
  techmonth: techmonthRouter,
  linkShortener: linkShortenerRouter,
  qrCode: qrCodeRouter,
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
