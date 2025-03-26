import crypto from 'node:crypto'

import {
  HACKATHON_MAX_TEAMS,
  HACKATHON_TICKET_EXPIRY_DAYS,
} from '~/constants/hackathon'
import { genPublicId } from '~/lib/hackathon-ticket'
import { createTRPCRouter, trpc } from '~/server/api/trpc'
import type {
  HackathonCommunityRegistration,
  HackathonCommunityTeamTicket,
  HackathonRegistration,
  HackathonTeamMember,
  HackathonTeamTicket,
  HackathonTicket,
  HackathonTicketClaim,
  HackathonTicketNonClaimStats,
} from '~/types/hackathon'
import { type Response } from '~/types/server'

import {
  CheckHackathonCommunityRegistrationCodeDto,
  ClaimHackathonTicketDto,
  CreateHackathonCommunityTeamDto,
  CreateHackathonRegistrationDto,
  CreateHackathonTeamTicketDto,
  DeleteHackathonRegistrationDto,
  GetHackathonCommunityRegistrationByCodeDto,
  GetRegistrationIndexByCommunityCodeDto,
  GetTeamByPublicId,
  UpdateHackathonRegistrationDto,
} from '../dto/hackathon'

export const hackathonRouter = createTRPCRouter({
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
            message: 'You already have a Team Pass',
            errors: ['Team Pass already exists'],
          }
        }

        const activeClaims = await ctx.db.hackathonTicketClaim.findMany({
          where: {
            userId,
            expiredAt: { gt: new Date() },
          },
          include: {
            ticket: true,
          },
        })

        const activeClaimsCount = activeClaims.length

        if (activeClaimsCount >= 2) {
          return {
            success: false,
            message: 'You can only have 2 active claims at a time',
            errors: ['Maximum active claims reached'],
          }
        }

        const isTicketHasTeam = await ctx.db.hackathonTicket.findFirst({
          where: {
            code: input.ticketCode,
            teamTicketId: { not: null },
          },
        })

        if (isTicketHasTeam) {
          return {
            success: false,
            message: 'This ticket has already merged',
            errors: ['This ticket has already merged'],
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
            message: 'Ticket not found',
            errors: ['Ticket not found'],
          }
        }

        if (ticket.claims.some((claim) => claim.userId === userId)) {
          return {
            success: false,
            message: 'You cannot re-claim ticket',
            errors: ['Ticket already claimed by you'],
          }
        }

        // if input ticket type is same as active claim ticket type
        if (
          activeClaimsCount > 0 &&
          activeClaims.some(
            (claim) => claim.ticket.ticketType === ticket.ticketType
          )
        ) {
          return {
            success: false,
            message: 'You cannot claim the same ticket type',
            errors: ['Ticket type already claimed'],
          }
        }

        if (
          ticket.claims.some(
            (claim) => claim.expiredAt && claim.expiredAt > new Date()
          )
        ) {
          return {
            success: false,
            message: 'Ticket already claimed by someone else',
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
              message: 'Team Pass created successfully',
              data: teamTicket,
            }
          } catch (error) {
            return {
              success: false,
              message: 'Failed to create Team Pass',
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
                teamTicketId: true,
              },
            },
          },
        })
        return {
          success: true,
          message: teamTicket ? 'Team Pass found' : 'No Team Pass found',
          data: teamTicket,
        }
      } catch (error) {
        return {
          success: false,
          message: 'Failed to fetch Team Pass',
          errors: [
            error instanceof Error ? error.message : 'Something went wrong',
          ],
        }
      }
    }
  ),

  deleteTeamTicket: trpc
    .input(DeleteHackathonRegistrationDto)
    .mutation(async ({ ctx, input }): Promise<Response<null>> => {
      const userId = ctx.session.user?.id
      if (!userId) {
        return {
          success: false,
          message: 'Unauthorized',
          errors: ['Session ID not found'],
        }
      }

      try {
        await ctx.db.hackathonTeamTicket.delete({
          where: { id: input.teamTicketId },
        })

        return {
          success: true,
          message: 'Team Pass deleted successfully',
          data: null,
        }
      } catch (error) {
        return {
          success: false,
          message: 'Failed to delete Team Pass',
          errors: [
            error instanceof Error ? error.message : 'Something went wrong',
          ],
        }
      }
    }),

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

      const teamMemberCount = input.teamMembers.length
      if (teamMemberCount < 4 || teamMemberCount > 5) {
        return {
          success: false,
          message: 'Team must have 4-5 members',
          errors: ['teamMembers input length must be between 4 and 5'],
        }
      }

      const totalLocalTeamCount = await ctx.db.hackathonRegistration
        .count()
        .catch(() => null)

      const totalCommunityTeamCount = await ctx.db.hackathonCommunityTeam
        .count()
        .catch(() => null)
      if (totalLocalTeamCount === null || totalCommunityTeamCount === null) {
        return {
          success: false,
          message: 'Failed to count total team',
          errors: ['Something went wrong while counting total team'],
        }
      }

      if (
        totalLocalTeamCount + totalCommunityTeamCount >=
        HACKATHON_MAX_TEAMS
      ) {
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
          message: 'No Team Pass found',
          errors: ['Team Pass not found'],
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
            message: 'No Team Pass found',
            errors: ['No Team Pass found'],
          }
        }

        const regularRegistrations =
          await ctx.db.hackathonRegistration.findMany({
            select: { id: true, teamTicketId: true, createdAt: true },
          })

        const communityRegistrations =
          await ctx.db.hackathonCommunityRegistration.findMany({
            select: { id: true, code: true, createdAt: true },
          })

        const mergedRegistrations = [
          ...regularRegistrations.map((reg) => ({
            ...reg,
            type: 'regular',
            code: null,
          })),
          ...communityRegistrations.map((reg) => ({
            ...reg,
            type: 'community',
            teamTicketId: null,
          })),
        ]

        mergedRegistrations.sort((a, b) => {
          const aDate = new Date(a.createdAt).getTime()
          const bDate = new Date(b.createdAt).getTime()
          if (aDate !== bDate) {
            return aDate - bDate
          }
          return a.id - b.id
        })

        const registrationIndex = mergedRegistrations.findIndex(
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

  getRegistrationIndexByCommunityCode: trpc
    .input(GetRegistrationIndexByCommunityCodeDto)
    .mutation(async ({ ctx, input }): Promise<Response<number>> => {
      try {
        const regularRegistrations =
          await ctx.db.hackathonRegistration.findMany({
            select: { id: true, teamTicketId: true, createdAt: true },
          })

        const communityRegistrations =
          await ctx.db.hackathonCommunityRegistration.findMany({
            select: { id: true, code: true, createdAt: true },
          })

        const mergedRegistrations = [
          ...regularRegistrations.map((reg) => ({
            ...reg,
            type: 'regular',
            code: null,
          })),
          ...communityRegistrations.map((reg) => ({
            ...reg,
            type: 'community',
            teamTicketId: null,
          })),
        ]

        mergedRegistrations.sort((a, b) => {
          const aDate = new Date(a.createdAt).getTime()
          const bDate = new Date(b.createdAt).getTime()
          if (aDate !== bDate) {
            return aDate - bDate
          }
          return a.id - b.id
        })

        const registrationIndex = mergedRegistrations.findIndex(
          (reg) => reg.type === 'community' && reg.code === input.code
        )

        return {
          success: true,
          message: 'Registration index found',
          data: registrationIndex,
        }
      } catch (error) {
        return {
          success: false,
          message: 'Failed to fetch registration index by community code',
          errors: [
            error instanceof Error ? error.message : 'Something went wrong',
          ],
        }
      }
    }),

  countRegistrations: trpc.query(async ({ ctx }): Promise<Response<number>> => {
    try {
      const count = await ctx.db.hackathonRegistration.count()
      const communityCount = await ctx.db.hackathonCommunityTeam.count()

      return {
        success: true,
        message: 'Number of registrations found',
        data: count + communityCount,
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
                message: 'No Team Pass found',
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

  getTicketNonClaimStats: trpc.query(
    async ({ ctx }): Promise<Response<HackathonTicketNonClaimStats>> => {
      try {
        const devCount = await ctx.db.hackathonTicket.count({
          where: {
            teamTicketId: null,
            ticketType: 'DEVELOPER',
            claims: {
              none: {
                expiredAt: { gt: new Date() },
              },
            },
          },
        })

        const desCount = await ctx.db.hackathonTicket.count({
          where: {
            teamTicketId: null,
            ticketType: 'DESIGNER',
            claims: {
              none: {
                expiredAt: { gt: new Date() },
              },
            },
          },
        })

        const proCount = await ctx.db.hackathonTicket.count({
          where: {
            teamTicketId: null,
            ticketType: 'PRODUCT',
            claims: {
              none: {
                expiredAt: { gt: new Date() },
              },
            },
          },
        })

        const genCount = await ctx.db.hackathonTicket.count({
          where: {
            teamTicketId: null,
            ticketType: 'GENERAL',
            claims: {
              none: {
                expiredAt: { gt: new Date() },
              },
            },
          },
        })

        return {
          success: true,
          message: 'Ticket stats fetched successfully',
          data: {
            dev: devCount,
            des: desCount,
            pro: proCount,
            gen: genCount,
          },
        }
      } catch (error) {
        return {
          success: false,
          message: 'Failed to fetch ticket stats',
          errors: [
            error instanceof Error ? error.message : 'Something went wrong',
          ],
        }
      }
    }
  ),

  checkCommunityRegistrationCode: trpc
    .input(CheckHackathonCommunityRegistrationCodeDto)
    .query(
      async ({
        ctx,
        input,
      }): Promise<
        Response<{ valid: boolean; requiredUniversity: string | null }>
      > => {
        try {
          const { code } = input

          const communityRegistration =
            await ctx.db.hackathonCommunityRegistration.findUnique({
              where: {
                code,
              },
            })

          if (!communityRegistration) {
            return {
              success: true,
              data: {
                valid: false,
                requiredUniversity: null,
              },
              message: 'Code not found',
            }
          }

          if (!communityRegistration.isActive) {
            return {
              success: true,
              data: {
                valid: false,
                requiredUniversity: null,
              },
              message: 'This registration is not active',
            }
          }

          if (
            communityRegistration.expiresAt &&
            communityRegistration.expiresAt < new Date()
          ) {
            return {
              success: true,
              data: {
                valid: false,
                requiredUniversity: null,
              },
              message: 'This registration has expired',
            }
          }

          const existingTeam = await ctx.db.hackathonCommunityTeam.findFirst({
            where: {
              communityRegistrationId: communityRegistration.id,
            },
          })

          if (existingTeam) {
            return {
              success: true,
              data: {
                valid: false,
                requiredUniversity: null,
              },
              message: 'This registration link has already been used',
            }
          }

          return {
            success: true,
            data: {
              valid: true,
              requiredUniversity: communityRegistration.requiredUniversity,
            },
            message: 'Code is valid',
          }
        } catch (error) {
          console.error('Error checking community registration code:', error)
          return {
            success: false,
            message: 'Failed to check community registration code',
            errors: ['Failed to check community registration code'],
          }
        }
      }
    ),

  createCommunityTeam: trpc
    .input(CreateHackathonCommunityTeamDto)
    .mutation(async ({ ctx, input }): Promise<Response<{ teamId: string }>> => {
      try {
        const { code, teamName, teamMembers } = input

        const communityRegistration =
          await ctx.db.hackathonCommunityRegistration.findUnique({
            where: {
              code,
            },
          })

        if (!communityRegistration) {
          return {
            success: false,
            message: 'Community registration code not found',
            errors: ['Community registration code not found'],
          }
        }

        if (!communityRegistration.isActive) {
          return {
            success: false,
            message: 'Community registration is not active',
            errors: ['Community registration is not active'],
          }
        }

        if (
          communityRegistration.expiresAt &&
          communityRegistration.expiresAt < new Date()
        ) {
          return {
            success: false,
            message: 'Community registration has expired',
            errors: ['Community registration has expired'],
          }
        }

        const existingTeam = await ctx.db.hackathonCommunityTeam.findFirst({
          where: {
            communityRegistrationId: communityRegistration.id,
          },
        })

        if (existingTeam) {
          return {
            success: false,
            message: 'This community registration link has already been used',
            errors: ['This community registration link has already been used'],
          }
        }

        const engineeringStudentsFromRequiredUniversity = teamMembers.filter(
          (member) =>
            member.university === communityRegistration.requiredUniversity
        )

        if (
          communityRegistration.requiredUniversity !== '' &&
          engineeringStudentsFromRequiredUniversity.length < 2
        ) {
          return {
            success: false,
            message: `At least 2 team members must be from ${communityRegistration.requiredUniversity}`,
            errors: [
              `At least 2 team members must be from ${communityRegistration.requiredUniversity}`,
            ],
          }
        }

        /*
         * TODO: Frontend faculty input is not a dropdown menu
         * We need to do something about this to ensure consistent input values
         */
        const engineeringStudentsFromChula = teamMembers.filter(
          (member) =>
            member.faculty === 'Engineering' &&
            member.university === 'Chulalongkorn University'
        )

        if (engineeringStudentsFromChula.length < 2) {
          return {
            success: false,
            message:
              'At least 2 team members must be from the Engineering faculty at Chulalongkorn University',
            errors: [
              'At least 2 team members must be from the Engineering faculty at Chulalongkorn University',
            ],
          }
        }

        const publicId = crypto.randomUUID()
        const communityTeam = await ctx.db.hackathonCommunityTeam.create({
          data: {
            publicId,
            teamName,
            communityRegistrationId: communityRegistration.id,
            teamMembers: {
              create: teamMembers.map((member) => ({
                publicId: crypto.randomUUID(),
                firstName: member.firstName,
                lastName: member.lastName,
                nickname: member.nickname,
                pronoun: member.pronoun,
                phoneNumber: member.phoneNumber,
                email: member.email,
                studentId: member.studentId,
                faculty: member.faculty,
                department: member.department,
                university: member.university,
                role: member.role,
                foodRestriction: member.foodRestriction,
                medication: member.medication,
                medicalCondition: member.medicalCondition,
                chestSize: member.chestSize || 0,
              })),
            },
          },
          include: {
            teamMembers: true,
          },
        })

        return {
          success: true,
          data: { teamId: communityTeam.publicId },
          message: 'Community team created successfully',
        }
      } catch (error) {
        console.error('Error creating community team:', error)
        return {
          success: false,
          message: 'Failed to create community team',
          errors: ['Failed to create community team'],
        }
      }
    }),

  getCommunityRegistrationByCode: trpc
    .input(GetHackathonCommunityRegistrationByCodeDto)
    .query(
      async ({
        ctx,
        input,
      }): Promise<Response<HackathonCommunityRegistration>> => {
        try {
          const registration =
            await ctx.db.hackathonCommunityRegistration.findUnique({
              where: { code: input.code },
              include: {
                communityTeam: {
                  select: {
                    publicId: true,
                    teamName: true,
                    teamMembers: {
                      select: {
                        id: true,
                        publicId: true,
                        firstName: true,
                        lastName: true,
                        nickname: true,
                        pronoun: true,
                        phoneNumber: true,
                        email: true,
                        studentId: true,
                        faculty: true,
                        department: true,
                        university: true,
                        role: true,
                        foodRestriction: true,
                        medication: true,
                        medicalCondition: true,
                        chestSize: true,
                      },
                    },
                  },
                },
              },
            })

          if (!registration) {
            return {
              success: false,
              message: 'Registration not found',
              errors: ['Registration not found'],
            }
          }

          const hasTeam = registration.communityTeam !== null

          return {
            success: true,
            message: hasTeam
              ? 'Registration found with team already registered'
              : 'Registration found without team',
            data: {
              registration: {
                code: registration.code,
                requiredUniversity: registration.requiredUniversity,
                team: registration.communityTeam
                  ? {
                      publicId: registration.communityTeam.publicId,
                      teamName: registration.communityTeam.teamName,
                      teamMembers: registration.communityTeam.teamMembers,
                    }
                  : undefined,
              },
            },
          }
        } catch (error) {
          console.error('Error fetching community registration:', error)
          return {
            success: false,
            message: 'Failed to fetch community registration',
            errors: ['Failed to fetch community registration'],
          }
        }
      }
    ),

  findTeamByPublicId: trpc.input(GetTeamByPublicId).query(
    async ({
      ctx,
      input,
    }): Promise<
      Response<
        | (HackathonTeamTicket & {
            registration: HackathonRegistration | null
            teamMembers: HackathonTeamMember[]
          })
        | null
      >
    > => {
      try {
        const teamTicket = await ctx.db.hackathonTeamTicket.findUnique({
          where: {
            publicId: input.publicId,
          },
          include: {
            registration: true,
          },
        })

        if (!teamTicket?.registration) {
          return {
            success: true,
            data: null,
          }
        }

        const teamMembers = await ctx.db.hackathonTeamMember.findMany({
          where: {
            registrationId: teamTicket.registration.id,
          },
        })

        return {
          success: true,
          data: {
            ...teamTicket,
            teamMembers,
          },
        }
      } catch (error) {
        console.error('Error fetching team ticket:', error)
        return {
          success: false,
          message: 'Failed fetch team ticket',
          errors: [
            error instanceof Error ? error.message : 'Something went wrong',
          ],
        }
      }
    }
  ),

  findCommunityTeamByPublicId: trpc.input(GetTeamByPublicId).query(
    async ({
      ctx,
      input,
    }): Promise<
      Response<
        | (HackathonCommunityTeamTicket & {
            teamMembers: HackathonTeamMember[]
          })
        | null
      >
    > => {
      try {
        const teamTicket = await ctx.db.hackathonCommunityTeam.findUnique({
          where: {
            publicId: input.publicId,
          },
        })

        if (!teamTicket) {
          return {
            success: true,
            data: null,
          }
        }

        const teamMembers = await ctx.db.hackathonCommunityTeamMember.findMany({
          where: {
            teamId: teamTicket.id,
          },
        })

        return {
          success: true,
          data: { ...teamTicket, teamMembers },
        }
      } catch (error) {
        console.error('Error fetching team ticket:', error)
        return {
          success: false,
          message: 'Failed fetch team ticket',
          errors: ['Failed fetch team ticket'],
        }
      }
    }
  ),
})
