'use server'

import {
  HACKATHON_GAME_JACKPOT_FULL_TICKET_MODE_RATE,
  HACKATHON_GAME_JACKPOT_MODE,
  HACKATHON_GAME_JACKPOT_PER_CHARACTER_MODE_RATE,
  HACKATHON_GAME_JACKPOT_SYMBOLS,
  HACKATHON_GAME_JACKPOT_TICKET_CODES,
} from '~/constants/hackathon'
import { withRateLimit } from '~/lib/rate-limit'
import { api } from '~/trpc/server'
import {
  type CreateHackathonTeamMemberInput,
  type HackathonCommunityRegistration,
  type HackathonCommunityTeamMember,
  type HackathonCommunityTeamTicket,
  type HackathonRegistration,
  type HackathonSpinResult,
  type HackathonTeam,
  type HackathonTeamMember,
  type HackathonTeamTicket,
  type HackathonTicket,
  type HackathonTicketClaim,
  type HackathonTicketNonClaimStats,
  type UpdateHackathonTeamMemberInput,
} from '~/types/hackathon'
import { type Response } from '~/types/server'

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

export async function deleteMyHackathonRegistration(): Promise<Response<null>> {
  const resMyTeamTicket = await api.hackathon.findMyTeamTicket()
  if (!resMyTeamTicket.success) {
    return {
      success: false,
      message: 'Failed to get team ticket data',
      errors: resMyTeamTicket.errors,
    }
  }

  if (!resMyTeamTicket.data) {
    return {
      success: false,
      message: 'You have not registered',
      errors: ['User does not have HackathonTeamTicket in database'],
    }
  }

  return await api.hackathon.deleteTeamTicket({
    teamTicketId: resMyTeamTicket.data.id,
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
    windowInSeconds: 20,
    identifierMethod: 'sid',
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

export async function getMyRegistrationIndex({
  communityCode,
}: {
  communityCode?: string
}): Promise<Response<number>> {
  if (communityCode) {
    return await api.hackathon.getRegistrationIndexByCommunityCode({
      code: communityCode,
    })
  }
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

export async function spinHackathonTicketSlot(
  ticketNumber: string,
  foundPositions: number[] = []
): Promise<Response<HackathonSpinResult>> {
  const jackpotRate =
    HACKATHON_GAME_JACKPOT_MODE === 'FULL_TICKET'
      ? HACKATHON_GAME_JACKPOT_FULL_TICKET_MODE_RATE
      : HACKATHON_GAME_JACKPOT_PER_CHARACTER_MODE_RATE
  const isJackpot = Math.random() < jackpotRate

  const symbols: string[] = Array(3)
    .fill(null)
    .map(() =>
      isJackpot
        ? HACKATHON_GAME_JACKPOT_SYMBOLS[0]
        : (HACKATHON_GAME_JACKPOT_SYMBOLS[
            1 +
              Math.floor(
                Math.random() * (HACKATHON_GAME_JACKPOT_SYMBOLS.length - 1)
              )
          ] ?? HACKATHON_GAME_JACKPOT_SYMBOLS[1])
    ) as string[]

  if (symbols.every((symbol) => symbol === symbols[0]) && !isJackpot) {
    return Promise.resolve({
      success: true,
      message: 'Spin result successful',
      data: { symbols },
    })
  }

  if (!isJackpot) {
    return Promise.resolve({
      success: true,
      message: 'Spin result successful',
      data: { symbols },
    })
  }

  const idx = parseInt(ticketNumber) - 1
  const ticketCode = HACKATHON_GAME_JACKPOT_TICKET_CODES[idx] ?? 'INVALID CODE'

  if (HACKATHON_GAME_JACKPOT_MODE === 'FULL_TICKET') {
    return Promise.resolve({
      success: true,
      message: 'Spin result successful',
      data: {
        symbols,
        ticketFragment: {
          ticketNumber,
          fullCode: ticketCode,
          position: -1,
        },
      },
    })
  }

  // PER_CHARACTER mode
  const remainingPositions = Array.from(
    { length: ticketCode.length },
    (_, i) => i
  ).filter((pos) => !foundPositions.includes(pos))

  const position =
    remainingPositions[Math.floor(Math.random() * remainingPositions.length)] ??
    0

  return Promise.resolve({
    success: true,
    message: 'Spin result successful',
    data: {
      symbols,
      ticketFragment: {
        ticketNumber,
        letter: ticketCode.charAt(position),
        position,
      },
    },
  })
}

export const spinHackathonTicketSlotWithRateLimit = withRateLimit(
  spinHackathonTicketSlot,
  {
    maxAttempts: 1,
    windowInSeconds: 3,
    identifierMethod: 'ip',
  },
  'spin-hackathon-ticket'
)

export const getHackathonTicketNonClaimStats = async (): Promise<
  Response<HackathonTicketNonClaimStats>
> => {
  return await api.hackathon.getTicketNonClaimStats()
}

export async function checkCommunityRegistrationCode(
  code: string
): Promise<Response<{ valid: boolean; requiredUniversity: string | null }>> {
  return await api.hackathon.checkCommunityRegistrationCode({
    code,
  })
}

export async function createCommunityTeam(
  code: string,
  teamName: string,
  teamMembers: HackathonCommunityTeamMember[]
): Promise<Response<{ teamId: string }>> {
  return await api.hackathon.createCommunityTeam({
    code,
    teamName,
    teamMembers,
  })
}

export async function getCommunityRegistrationByCode(
  code: string
): Promise<Response<HackathonCommunityRegistration>> {
  return await api.hackathon.getCommunityRegistrationByCode({
    code,
  })
}

export async function findTeamTicketByPublicId(
  publicId: string
): Promise<Response<HackathonTeam>> {
  let res = null as
    | (HackathonTeamTicket & {
        registration: HackathonRegistration | null
        teamMembers: HackathonTeamMember[]
      })
    | (HackathonCommunityTeamTicket & {
        teamMembers: HackathonTeamMember[]
      })
    | null
  let teamName = ''

  try {
    const resTeamTicket = await api.hackathon.findTeamByPublicId({ publicId })
    if (!resTeamTicket.success) {
      throw new Error('')
    } else if (resTeamTicket.data && resTeamTicket.data.registration) {
      res = resTeamTicket.data
      teamName = resTeamTicket.data.registration.teamName
    }

    if (!resTeamTicket.data) {
      const resCommunityTeamTicket =
        await api.hackathon.findCommunityTeamByPublicId({ publicId })
      if (!resCommunityTeamTicket.success) {
        throw new Error('')
      } else if (resCommunityTeamTicket.data) {
        res = resCommunityTeamTicket.data
        teamName = resCommunityTeamTicket.data.teamName
      }
    }
  } catch (error) {
    return {
      success: false,
      message: 'Error fetching team ticket',
      errors: ['Error fetching team ticket'],
    }
  }

  if (!res) {
    return {
      success: false,
      message: 'Team ticket not found',
      errors: ['Team ticket not found'],
    }
  }

  return {
    success: true,
    data: {
      id: res.id,
      publicId: res.publicId,
      teamMembers: res.teamMembers,
      teamName,
    },
  }
}
