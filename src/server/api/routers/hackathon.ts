import { genTicketCode, genTicketPublicId } from '~/lib/hackathon-ticket';
import { createTRPCRouter, trpc } from '~/server/api/trpc';
import {
  type HackathonTeamTicket,
  type HackathonTicket,
  type HackathonTicketClaim,
} from '~/types/hackathon';
import { type Response } from '~/types/server';

import {
  ClaimHackathonTicketDto,
  CreateHackathonTeamTicketDto,
  CreateHackathonTicketDto,
} from '../dto/hackathon';

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

  claimTicket: trpc
    .input(ClaimHackathonTicketDto)
    .mutation(async ({ ctx, input }): Promise<Response<HackathonTicket>> => {
      const userId = ctx.session.user?.id;
      if (!userId) {
        return {
          success: false,
          message: 'Unauthorized',
          errors: ['Session ID not found'],
        };
      }

      const res = await ctx.db.$transaction(async (tx) => {
        try {
          const existingTeamTicket = await tx.hackathonTeamTicket.findUnique({
            where: { userId },
          });

          if (existingTeamTicket) {
            return {
              success: false,
              message: 'You already have a team ticket',
            };
          }

          const activeClaimsCount = await tx.hackathonTicketClaim.count({
            where: {
              userId,
              expiredAt: { gt: new Date() },
            },
          });

          if (activeClaimsCount >= 2) {
            return {
              success: false,
              message: 'You can only have 2 active claims at a time',
            };
          }

          const ticket = await tx.hackathonTicket.findUnique({
            where: {
              code: input.ticketCode,
              teamTicketId: null,
            },
            include: {
              claims: {
                where: {
                  OR: [{ userId }, { expiredAt: { gt: new Date() } }],
                },
              },
            },
          });

          if (!ticket) {
            return {
              success: false,
              message: 'Ticket not found or already in a team',
            };
          }

          if (ticket.claims.some((claim) => claim.userId === userId)) {
            return {
              success: false,
              message: 'You cannot claim a ticket you previously claimed',
            };
          }

          if (
            ticket.claims.some(
              (claim) => claim.expiredAt && claim.expiredAt > new Date(),
            )
          ) {
            return {
              success: false,
              message: 'Ticket is already claimed',
            };
          }

          const expiryDate = new Date();
          expiryDate.setDate(expiryDate.getDate() + 3);

          await tx.hackathonTicketClaim.create({
            data: {
              ticketId: ticket.id,
              userId,
              expiredAt: expiryDate,
            },
          });

          const updatedTicket = await tx.hackathonTicket.findUnique({
            where: { code: input.ticketCode },
            select: {
              id: true,
              code: true,
              ticketType: true,
              isRegistered: true,
              teamTicketId: true,
              claims: {
                where: {
                  expiredAt: { gt: new Date() },
                },
              },
            },
          });

          return {
            success: true,
            message: 'Ticket claimed successfully',
            data: updatedTicket,
          };
        } catch (error) {
          return {
            success: false,
            message: 'Failed to claim ticket',
            error:
              error instanceof Error ? error.message : 'Something went wrong',
          };
        }
      });

      if (res.error ?? !res.data) {
        return {
          success: false,
          message: res.message,
          errors: [res.error ?? 'Something went wrong'],
        };
      }

      return {
        success: true,
        message: res.message,
        data: res.data,
      };
    }),

  createTeamTicket: trpc
    .input(CreateHackathonTeamTicketDto)
    .mutation(
      async ({ ctx, input }): Promise<Response<HackathonTeamTicket>> => {
        const userId = ctx.session.user?.id;
        if (!userId) {
          return {
            success: false,
            message: 'Unauthorized',
            errors: ['Session ID not found'],
          };
        }

        const res = await ctx.db.$transaction(async (tx) => {
          try {
            const tickets = await tx.hackathonTicket.findMany({
              where: {
                id: { in: input.ticketIds },
                teamTicketId: null,
                claims: {
                  some: {
                    userId,
                    expiredAt: { gt: new Date() },
                  },
                },
              },
              include: {
                claims: {
                  where: {
                    userId,
                    expiredAt: { gt: new Date() },
                  },
                },
              },
            });

            if (tickets.length !== 2) {
              return {
                success: false,
                message: 'Both tickets must be claimed by you and not expired',
              };
            }

            const teamTicket = await tx.hackathonTeamTicket.create({
              data: {
                publicId: genTicketPublicId(),
                userId,
                tickets: {
                  connect: input.ticketIds.map((id) => ({ id })),
                },
              },
              include: {
                tickets: true,
              },
            });

            await tx.hackathonTicketClaim.updateMany({
              where: {
                ticketId: { in: input.ticketIds },
                userId,
              },
              data: {
                expiredAt: new Date(),
              },
            });

            return {
              success: true,
              message: 'Team ticket created successfully',
              data: teamTicket,
            };
          } catch (error) {
            return {
              success: false,
              message: 'Failed to create team ticket',
              error:
                error instanceof Error ? error.message : 'Something went wrong',
            };
          }
        });

        if (res.error ?? !res.data) {
          return {
            success: false,
            message: res.message,
            errors: [res.error ?? 'Something went wrong'],
          };
        }

        return {
          success: true,
          message: res.message,
          data: res.data,
        };
      },
    ),

  getMyTeamTicket: trpc.query(
    async ({ ctx }): Promise<Response<HackathonTeamTicket | null>> => {
      const userId = ctx.session.user?.id;
      if (!userId) {
        return {
          success: false,
          message: 'Unauthorized',
          errors: ['Session ID not found'],
        };
      }

      const res = await ctx.db.$transaction(async (tx) => {
        try {
          const teamTicket = await tx.hackathonTeamTicket.findUnique({
            where: {
              userId,
            },
            include: {
              tickets: {
                select: {
                  id: true,
                  code: true,
                  ticketType: true,
                  isRegistered: true,
                  teamTicketId: true,
                },
              },
            },
          });

          return {
            success: true,
            message: teamTicket ? 'Team ticket found' : 'No team ticket found',
            data: teamTicket,
          };
        } catch (error) {
          return {
            success: false,
            message: 'Failed to fetch team ticket',
            error:
              error instanceof Error ? error.message : 'Something went wrong',
          };
        }
      });

      if (res.error ?? !res.data) {
        return {
          success: false,
          message: res.message,
          errors: [res.error ?? 'Something went wrong'],
        };
      }

      return {
        success: true,
        message: res.message,
        data: res.data,
      };
    },
  ),

  getMyActiveClaim: trpc.query(
    async ({ ctx }): Promise<Response<HackathonTicketClaim[] | null>> => {
      const userId = ctx.session.user?.id;
      if (!userId) {
        return {
          success: false,
          message: 'Unauthorized',
          errors: ['Session ID not found'],
        };
      }

      const res = await ctx.db.$transaction(async (tx) => {
        try {
          const activeClaim = await tx.hackathonTicketClaim.findMany({
            where: {
              userId,
              expiredAt: { gt: new Date() },
            },
          });

          return {
            success: true,
            message:
              activeClaim.length > 0
                ? 'Active claim found'
                : 'No active claim found',
            data: activeClaim,
          };
        } catch (error) {
          return {
            success: false,
            message: 'Failed to fetch active claim',
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
    },
  ),
});
