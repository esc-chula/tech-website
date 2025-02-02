import { z } from 'zod';

import { createTRPCRouter, trpc } from '~/server/api/trpc';

export const techmonthRouter = createTRPCRouter({
  createStamp: trpc
    .input(z.object({ studentId: z.string(), eventId: z.string() }))
    .query(async ({ ctx, input }) => {
      const stamp = await ctx.db.techMonthStamp.create({
        data: {
          studentId: input.studentId,
          eventId: input.eventId,
        },
      });

      return stamp;
    }),

  getStampsByStudentId: trpc
    .input(z.object({ studentId: z.string() }))
    .query(async ({ ctx, input }) => {
      const stamps = await ctx.db.techMonthStamp.findMany({
        where: {
          studentId: input.studentId,
        },
      });

      return stamps;
    }),
});
