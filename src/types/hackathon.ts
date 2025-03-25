import type {
  HackathonPronoun,
  HackathonRole,
  HackathonTicketType,
} from '@prisma/client'

export interface HackathonTicket {
  id: number
  code: string
  ticketType: HackathonTicketType
  teamTicketId: number | null
}

export interface HackathonTeamTicket {
  id: number
  publicId: string
  userId: number
}

export interface HackathonTicketClaim {
  id: number
  ticketId: number
  userId: number
  claimedAt: Date
  expiredAt: Date | null
}

export interface HackathonTeamMember {
  id: number
  publicId: string
  firstName: string
  lastName: string
  nickname: string
  pronoun: HackathonPronoun
  phoneNumber: string
  email: string
  studentId: string
  faculty: string
  department: string
  university: string
  role: HackathonRole
  foodRestriction?: string | null | undefined
  medication?: string | null | undefined
  medicalCondition?: string | null | undefined
  chestSize: number
}

export interface HackathonRegistration {
  id: number
  teamName: string
  teamTicketId: number
}

export type CreateHackathonTeamMemberInput = Omit<
  HackathonTeamMember,
  'id' | 'publicId'
>

export type UpdateHackathonTeamMemberInput = CreateHackathonTeamMemberInput & {
  id: number
}

export interface HackathonSpinResult {
  symbols: string[]
  ticketFragment?: {
    ticketNumber: string
    letter?: string
    fullCode?: string
    position: number
  }
}

export interface TicketProgress {
  ticketNumber: string
  foundPositions: number[]
}

export interface HackathonTicketNonClaimStats {
  dev: number
  des: number
  pro: number
  gen: number
}

export interface HackathonCommunityRegistration {
  registration: {
    code: string
    requiredUniversity: string
    team?: {
      publicId: string
      teamName: string
      teamMembers: HackathonTeamMember[]
    }
  }
}

export interface HackathonCommunityTeamTicket {
  id: number
  publicId: string
  communityRegistrationId: number
  teamName: string
}

export interface HackathonCommunityTeamMember {
  firstName: string
  lastName: string
  nickname: string
  pronoun: HackathonPronoun
  phoneNumber: string
  email: string
  studentId: string
  faculty: string
  department: string
  university: string
  role: HackathonRole
  foodRestriction?: string | null
  medication?: string | null
  medicalCondition?: string | null
  chestSize?: number
}

export interface HackathonTeam {
  id: number
  publicId: string
  teamName: string
  teamMembers: HackathonTeamMember[]
}
