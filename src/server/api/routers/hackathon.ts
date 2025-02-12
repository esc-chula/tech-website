import { genTicketCode } from '~/lib/hackathon-ticket';
import { createTRPCRouter, trpc } from '~/server/api/trpc';
import { type HackathonTicket } from '~/types/hackathon';
import { type Response } from '~/types/server';

import { CreateHackathonTicketDto } from '../dto/hackathon';

export const hackathonRouter = createTRPCRouter({
  createTicket: trpc
    .input(CreateHackathonTicketDto)
    .mutation(async ({ ctx, input }): Promise<Response<HackathonTicket[]>> => {
      const userId = ctx.session.user?.id;
      if (!userId) {
        return {
          success: false,
          message: 'Unauthorized',
          errors: ['Session ID not found'],
        };
      }

      // TODO: Add admin check
      const res = await ctx.db.$transaction(async (tx) => {
        try {
          const ticketData = Array.from({ length: input.quantity }, () => ({
            ticketType: input.ticketType,
            code: genTicketCode(),
          }));

          await tx.hackathonTicket.createMany({
            data: ticketData,
          });

          const tickets = await tx.hackathonTicket.findMany({
            where: {
              code: {
                in: ticketData.map((t) => t.code),
              },
            },
            select: {
              id: true,
              code: true,
              ticketType: true,
              isClaimed: true,
              isRegistered: true,
              teamTicketId: true,
            },
          });

          return {
            message: 'Tickets created successfully',
            data: tickets,
          };
        } catch (error) {
          return {
            data: null,
            message: 'Failed to create tickets',
            error:
              error instanceof Error ? error.message : 'Something went wrong',
          };
        }
      });

      if (res.error ?? !res.data) {
        return {
          success: false,
          message: res.message,
          errors: [res.error],
        };
      }

      return {
        success: true,
        message: res.message,
        data: res.data,
      };
    }),
});
