import {
  HACKATHON_MAX_TEAMS,
  HACKATHON_TICKET_EXPIRY_DAYS,
} from '~/constants/hackathon'
import { genPublicId } from '~/lib/hackathon-ticket'
import { createTRPCRouter, trpc } from '~/server/api/trpc'
import type {
  HackathonRegistration,
  HackathonTeamMember,
  HackathonTeamTicket,
  HackathonTicket,
  HackathonTicketClaim,
} from '~/types/hackathon'
import { type Response } from '~/types/server'

import {
  ClaimHackathonTicketDto,
  CreateHackathonRegistrationDto,
  CreateHackathonTeamTicketDto,
  CreateHackathonTicketDto,
  UpdateHackathonRegistrationDto,
} from '../dto/hackathon'

export const hackathonRouter = createTRPCRouter({
  createTicket: trpc
    .input(CreateHackathonTicketDto)
    .mutation(async ({ ctx, input }): Promise<Response<HackathonTicket[]>> => {
      const userId = ctx.session.user?.id
      if (!userId) {
        return {
          success: false,
          message: 'Unauthorized',
          errors: ['Session ID not found'],
        }
      }

      const res = await ctx.db.$transaction(async (tx) => {
        try {
          await tx.hackathonTicket.createMany({
            data: input.tickets,
          })

          const tickets = await tx.hackathonTicket.findMany({
            where: {
              code: {
                in: input.tickets.map((t) => t.code),
              },
            },
            select: {
              id: true,
              code: true,
              ticketType: true,
              isRegistered: true,
              teamTicketId: true,
            },
          })

          return {
            message: 'Tickets created successfully',
            data: tickets,
          }
        } catch (error) {
          return {
            data: null,
            message: 'Failed to create tickets',
            error:
              error instanceof Error ? error.message : 'Something went wrong',
          }
        }
      })

      if (res.error ?? !res.data) {
        return {
          success: false,
          message: res.message,
          errors: [res.error],
        }
      }

      return {
        success: true,
        message: res.message,
        data: res.data,
      }
    }),

  claimTicket: trpc
    .input(ClaimHackathonTicketDto)
    .mutation(async ({ ctx, input }): Promise<Response<HackathonTicket>> => {
      const userId = ctx.session.user?.id
      if (!userId) {
        return {
          success: false,
          message: 'Unauthorized',
          errors: ['Session ID not found'],
        }
      }

      try {
        const existingTeamTicket = await ctx.db.hackathonTeamTicket.findUnique({
          where: { userId },
        })

        if (existingTeamTicket) {
          return {
            success: false,
            message: 'You already have a team ticket',
            errors: ['Team ticket already exists'],
          }
        }

        const activeClaimsCount = await ctx.db.hackathonTicketClaim.count({
          where: {
            userId,
            expiredAt: { gt: new Date() },
          },
        })

        if (activeClaimsCount >= 2) {
          return {
            success: false,
            message: 'You can only have 2 active claims at a time',
            errors: ['Maximum active claims reached'],
          }
        }

        const ticket = await ctx.db.hackathonTicket.findUnique({
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
        })

        if (!ticket) {
          return {
            success: false,
            message: 'Ticket not found or already registered',
            errors: ['Ticket not found or already registered'],
          }
        }

        if (ticket.claims.some((claim) => claim.userId === userId)) {
          return {
            success: false,
            message: 'You cannot claim a ticket you previously claimed',
            errors: ['Ticket already claimed by you'],
          }
        }

        if (
          ticket.claims.some(
            (claim) => claim.expiredAt && claim.expiredAt > new Date()
          )
        ) {
          return {
            success: false,
            message: 'Ticket is already claimed',
            errors: ['Ticket already claimed'],
          }
        }

        const expiryDate = new Date()
        expiryDate.setDate(expiryDate.getDate() + HACKATHON_TICKET_EXPIRY_DAYS)

        await ctx.db.hackathonTicketClaim.create({
          data: {
            ticketId: ticket.id,
            userId,
            expiredAt: expiryDate,
          },
        })

        const updatedTicket = await ctx.db.hackathonTicket.findUnique({
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
        })

        if (!updatedTicket) {
          return {
            success: false,
            message: 'Failed to claim ticket',
            errors: ['Failed to find updated ticket'],
          }
        }

        return {
          success: true,
          message: 'Ticket claimed successfully',
          data: updatedTicket,
        }
      } catch (error) {
        return {
          success: false,
          message: 'Failed to claim ticket',
          errors: [
            error instanceof Error ? error.message : 'Something went wrong',
          ],
        }
      }
    }),

  createTeamTicket: trpc
    .input(CreateHackathonTeamTicketDto)
    .mutation(
      async ({ ctx, input }): Promise<Response<HackathonTeamTicket>> => {
        const userId = ctx.session.user?.id
        if (!userId) {
          return {
            success: false,
            message: 'Unauthorized',
            errors: ['Session ID not found'],
          }
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
            })

            if (tickets.length !== 2) {
              return {
                success: false,
                message: 'Both tickets must be claimed by you and not expired',
              }
            }

            const teamTicket = await tx.hackathonTeamTicket.create({
              data: {
                publicId: genPublicId(),
                userId,
                tickets: {
                  connect: input.ticketIds.map((id) => ({ id })),
                },
              },
              include: {
                tickets: true,
              },
            })

            await tx.hackathonTicketClaim.updateMany({
              where: {
                ticketId: { in: input.ticketIds },
                userId,
              },
              data: {
                expiredAt: new Date(),
              },
            })

            return {
              success: true,
              message: 'Team ticket created successfully',
              data: teamTicket,
            }
          } catch (error) {
            return {
              success: false,
              message: 'Failed to create team ticket',
              error:
                error instanceof Error ? error.message : 'Something went wrong',
            }
          }
        })

        if (res.error ?? !res.data) {
          return {
            success: false,
            message: res.message,
            errors: [res.error ?? 'Something went wrong'],
          }
        }

        return {
          success: true,
          message: res.message,
          data: res.data,
        }
      }
    ),

  findMyTeamTicket: trpc.query(
    async ({
      ctx,
    }): Promise<
      Response<(HackathonTeamTicket & { tickets: HackathonTicket[] }) | null>
    > => {
      const userId = ctx.session.user?.id
      if (!userId) {
        return {
          success: false,
          message: 'Unauthorized',
          errors: ['Session ID not found'],
        }
      }

      try {
        const teamTicket = await ctx.db.hackathonTeamTicket.findUnique({
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
        })
        return {
          success: true,
          message: teamTicket ? 'Team ticket found' : 'No team ticket found',
          data: teamTicket,
        }
      } catch (error) {
        return {
          success: false,
          message: 'Failed to fetch team ticket',
          errors: [
            error instanceof Error ? error.message : 'Something went wrong',
          ],
        }
      }
    }
  ),

  getMyActiveClaim: trpc.query(
    async ({
      ctx,
    }): Promise<
      Response<(HackathonTicketClaim & { ticket: HackathonTicket })[] | null>
    > => {
      const userId = ctx.session.user?.id
      if (!userId) {
        return {
          success: false,
          message: 'Unauthorized',
          errors: ['Session ID not found'],
        }
      }

      const res = await ctx.db.$transaction(async (tx) => {
        try {
          const activeClaim = await tx.hackathonTicketClaim.findMany({
            where: {
              userId,
              expiredAt: { gt: new Date() },
            },
            include: {
              ticket: true,
            },
          })

          return {
            success: true,
            message:
              activeClaim.length > 0
                ? 'Active claim found'
                : 'No active claim found',
            data: activeClaim,
          }
        } catch (error) {
          return {
            success: false,
            message: 'Failed to fetch active claim',
            error:
              error instanceof Error ? error.message : 'Something went wrong',
          }
        }
      })

      if (res.error ?? !res.data) {
        return {
          success: false,
          message: res.message,
          errors: [res.error],
        }
      }

      return {
        success: true,
        message: res.message,
        data: res.data,
      }
    }
  ),

  registerTeam: trpc.input(CreateHackathonRegistrationDto).mutation(
    async ({
      ctx,
      input,
    }): Promise<
      Response<
        HackathonRegistration & {
          teamTicket: HackathonTeamTicket
          teamMembers: HackathonTeamMember[]
        }
      >
    > => {
      const userId = ctx.session.user?.id
      if (!userId) {
        return {
          success: false,
          message: 'Unauthorized',
          errors: ['Session ID not found'],
        }
      }

      const updatedTickets = await ctx.db.hackathonTicket
        .updateMany({
          where: {
            teamTicketId: input.teamTicketId,
          },
          data: {
            isRegistered: true,
          },
        })
        .catch(() => null)
      if (updatedTickets === null) {
        return {
          success: false,
          message: 'Failed to update ticket registration status',
          errors: ['Something went wrong while updating ticket registration'],
        }
      }

      const teamMemberCount = input.teamMembers.length
      if (teamMemberCount < 4 || teamMemberCount > 5) {
        return {
          success: false,
          message: 'Team must have 4-5 members',
          errors: ['teamMembers input length must be between 4 and 5'],
        }
      }

      const totalTeamCount = await ctx.db.hackathonRegistration
        .count()
        .catch(() => null)
      if (totalTeamCount === null) {
        return {
          success: false,
          message: 'Failed to count total team',
          errors: ['Something went wrong while counting total team'],
        }
      }
      if (totalTeamCount >= HACKATHON_MAX_TEAMS) {
        return {
          success: false,
          message: `Application is closed. Maximum number of teams (${HACKATHON_MAX_TEAMS}) has been reached`,
          errors: [
            `Maximum number of teams (${HACKATHON_MAX_TEAMS}) has been reached`,
          ],
        }
      }

      const createdRegistration = await ctx.db.hackathonRegistration
        .create({
          data: {
            teamTicketId: input.teamTicketId,
            teamName: input.teamName,
            teamMembers: {
              create: input.teamMembers.map((member) => ({
                ...member,
                publicId: genPublicId(),
              })),
            },
          },
          include: {
            teamTicket: true,
            teamMembers: true,
          },
        })
        .catch(() => null)
      if (createdRegistration === null) {
        return {
          success: false,
          message: 'Failed to create registration',
          errors: ['Something went wrong while creating registration'],
        }
      }

      return {
        success: true,
        message: 'Team registered successfully',
        data: createdRegistration,
      }
    }
  ),

  findMyRegistration: trpc.query(
    async ({
      ctx,
    }): Promise<
      Response<
        | (HackathonRegistration & {
            teamMembers: HackathonTeamMember[]
          })
        | null
      >
    > => {
      const userId = ctx.session.user?.id
      if (!userId) {
        return {
          success: false,
          message: 'Unauthorized',
          errors: ['Session ID not found'],
        }
      }

      const teamTicket = await ctx.db.hackathonTeamTicket.findUnique({
        where: { userId },
      })
      if (!teamTicket) {
        return {
          success: false,
          message: 'No team ticket found',
          errors: ['Team ticket not found'],
        }
      }

      const registration = await ctx.db.hackathonRegistration.findUnique({
        where: { teamTicketId: teamTicket.id },
        include: {
          teamMembers: true,
        },
      })

      return {
        success: true,
        message: registration ? 'Registration found' : 'No registration found',
        data: registration,
      }
    }
  ),

  getMyRegistrationIndex: trpc.query(
    async ({ ctx }): Promise<Response<number>> => {
      try {
        const userId = ctx.session.user?.id
        if (!userId) {
          return {
            success: false,
            message: 'Unauthorized',
            errors: ['Session ID not found'],
          }
        }

        const teamTicket = await ctx.db.hackathonTeamTicket.findUnique({
          where: { userId },
        })

        if (!teamTicket) {
          return {
            success: false,
            message: 'No team ticket found',
            errors: ['No team ticket found'],
          }
        }

        const registrations = await ctx.db.hackathonRegistration.findMany({
          select: { id: true, teamTicketId: true },
        })

        const registrationIndex = registrations.findIndex(
          (reg) => reg.teamTicketId === teamTicket.id
        )

        return {
          success: true,
          message: 'Registration index found',
          data: registrationIndex,
        }
      } catch (error) {
        return {
          success: false,
          message: 'Failed to fetch registration index',
          errors: [
            error instanceof Error ? error.message : 'Something went wrong',
          ],
        }
      }
    }
  ),

  countRegistrations: trpc.query(async ({ ctx }): Promise<Response<number>> => {
    try {
      const count = await ctx.db.hackathonRegistration.count()
      return {
        success: true,
        message: 'Number of registrations found',
        data: count,
      }
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch number of registrations',
        errors: [
          error instanceof Error ? error.message : 'Something went wrong',
        ],
      }
    }
  }),

  updateMyRegistration: trpc
    .input(UpdateHackathonRegistrationDto)
    .mutation(
      async ({
        ctx,
        input,
      }): Promise<
        Response<HackathonRegistration & { teamMembers: HackathonTeamMember[] }>
      > => {
        const userId = ctx.session.user?.id
        if (!userId) {
          return {
            success: false,
            message: 'Unauthorized',
            errors: ['Session ID not found'],
          }
        }

        const res = await ctx.db.$transaction(async (tx) => {
          try {
            const teamTicket = await tx.hackathonTeamTicket.findUnique({
              where: { userId },
            })

            if (!teamTicket) {
              return {
                success: false,
                message: 'No team ticket found',
              }
            }

            const teamMemberCount = input.teamMembers.length
            if (teamMemberCount < 4 || teamMemberCount > 5) {
              return {
                success: false,
                message: 'Team must have 4-5 members',
              }
            }

            const registration = await tx.hackathonRegistration.findUnique({
              where: { teamTicketId: teamTicket.id },
            })

            if (!registration) {
              return {
                success: false,
                message: 'No registration found',
              }
            }

            const updatedRegistration = await tx.hackathonRegistration.update({
              where: { id: registration.id },
              data: {
                teamName: input.teamName,
                teamMembers: {
                  update: input.teamMembers.map((member) => ({
                    where: { id: member.id },
                    data: member,
                  })),
                },
              },
              include: {
                teamMembers: true,
              },
            })

            return {
              success: true,
              message: 'Registration updated successfully',
              data: updatedRegistration,
            }
          } catch (error) {
            return {
              success: false,
              message: 'Failed to update hackathon registration',
              error:
                error instanceof Error ? error.message : 'Something went wrong',
            }
          }
        })

        if (res.error ?? !res.data) {
          return {
            success: false,
            message: res.message,
            errors: [res.error ?? 'Something went wrong'],
          }
        }

        return {
          success: true,
          message: res.message,
          data: res.data,
        }
      }
    ),
})
