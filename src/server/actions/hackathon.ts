'use server'

import { type HackathonTicketType } from '@prisma/client'

import { withRateLimit } from '~/lib/rate-limit'
import { api } from '~/trpc/server'
import {
  type CreateHackathonTeamMemberInput,
  type HackathonRegistration,
  type HackathonTeamMember,
  type HackathonTeamTicket,
  type HackathonTicket,
  type HackathonTicketClaim,
  type UpdateHackathonTeamMemberInput,
} from '~/types/hackathon'
import { type Response } from '~/types/server'

export async function createHackathonTicket(
  tickets: {
    code: string
    ticketType: HackathonTicketType
  }[]
): Promise<Response<HackathonTicket[]>> {
  const res = await api.hackathon.createTicket({
    tickets,
  })

  return res
}

export async function createHackathonTeamTicket(
  ticketIds: number[]
): Promise<Response<HackathonTeamTicket>> {
  if (ticketIds.length !== 2) {
    return {
      success: false,
      message: 'Invalid ticketIds',
      errors: ['ticketIds must have exactly 2 elements'],
    }
  }

  return await api.hackathon.createTeamTicket({
    ticketIds,
  })
}

async function claimHackathonTicket(
  ticketCode: string
): Promise<Response<HackathonTicket>> {
  return await api.hackathon.claimTicket({
    ticketCode,
  })
}

export const claimHackahonTicketWithRateLimit = withRateLimit(
  claimHackathonTicket,
  {
    maxAttempts: 5,
    windowInSeconds: 300,
  },
  'claim-hackathon-ticket'
)

export async function findMyTeamTicket(): Promise<
  Response<(HackathonTeamTicket & { tickets: HackathonTicket[] }) | null>
> {
  return await api.hackathon.findMyTeamTicket()
}

export async function getMyActiveClaim(): Promise<
  Response<(HackathonTicketClaim & { ticket: HackathonTicket })[] | null>
> {
  return await api.hackathon.getMyActiveClaim()
}

export async function registerHackathonTeam(
  teamTicketId: number,
  teamName: string,
  teamMembers: CreateHackathonTeamMemberInput[]
): Promise<
  Response<
    HackathonRegistration & {
      teamTicket: HackathonTeamTicket
      teamMembers: HackathonTeamMember[]
    }
  >
> {
  const resMyRegistration = await api.hackathon.findMyRegistration()
  if (!resMyRegistration.success) {
    return {
      success: false,
      message: 'Failed to get registration data',
      errors: resMyRegistration.errors,
    }
  }

  if (resMyRegistration.data) {
    return {
      success: false,
      message: 'You have already registered',
      errors: ['User already has HackathonRegistration in database'],
    }
  }

  return await api.hackathon.registerTeam({
    teamTicketId,
    teamName,
    teamMembers,
  })
}

export async function findMyRegistration(): Promise<
  Response<
    | (HackathonRegistration & {
        teamMembers: HackathonTeamMember[]
      })
    | null
  >
> {
  return await api.hackathon.findMyRegistration()
}

export async function getMyRegistrationIndex(): Promise<Response<number>> {
  return await api.hackathon.getMyRegistrationIndex()
}

export async function countHackathonRegistrations(): Promise<Response<number>> {
  return await api.hackathon.countRegistrations()
}

export async function updateHackathonRegistration(
  teamName: string,
  teamMembers: UpdateHackathonTeamMemberInput[]
): Promise<
  Response<HackathonRegistration & { teamMembers: HackathonTeamMember[] }>
> {
  const res = await api.hackathon.updateMyRegistration({
    teamName,
    teamMembers,
  })
  return res
}
