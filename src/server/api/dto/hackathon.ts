import { HackathonPronoun, HackathonRole } from '@prisma/client'
import { z } from 'zod'

export const ClaimHackathonTicketDto = z.object({
  ticketCode: z.string(),
})

export const CreateHackathonTeamTicketDto = z.object({
  ticketIds: z.array(z.number()).length(2),
})

export const DeleteHackathonRegistrationDto = z.object({
  teamTicketId: z.number(),
})

export const CreateHackathonTeamMemberDto = z.object({
  firstName: z.string(),
  lastName: z.string(),
  nickname: z.string(),
  pronoun: z.nativeEnum(HackathonPronoun),
  phoneNumber: z.string(),
  email: z.string().email(),
  studentId: z.string(),
  faculty: z.string(),
  department: z.string(),
  university: z.string(),
  role: z.nativeEnum(HackathonRole),
  foodRestriction: z.string().nullish(),
  medication: z.string().nullish(),
  medicalCondition: z.string().nullish(),
  chestSize: z.number(),
})

export const CreateHackathonRegistrationDto = z.object({
  teamTicketId: z.number(),
  teamName: z.string(),
  teamMembers: z.array(CreateHackathonTeamMemberDto),
})

export const UpdateHackathonTeamMemberDto = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  nickname: z.string(),
  pronoun: z.nativeEnum(HackathonPronoun),
  phoneNumber: z.string(),
  email: z.string().email(),
  studentId: z.string(),
  faculty: z.string(),
  department: z.string(),
  university: z.string(),
  role: z.nativeEnum(HackathonRole),
  foodRestriction: z.string().nullish(),
  medication: z.string().nullish(),
  medicalCondition: z.string().nullish(),
})

export const UpdateHackathonRegistrationDto = z.object({
  teamName: z.string(),
  teamMembers: z.array(UpdateHackathonTeamMemberDto),
})

export const CreateHackathonCommunityRegistrationLinkDto = z.object({
  requiredUniversity: z.string(),
  expiresAt: z.date().optional(),
})

export const CheckHackathonCommunityRegistrationCodeDto = z.object({
  code: z.string(),
})

export const CreateHackathonCommunityTeamMemberDto = z.object({
  firstName: z.string(),
  lastName: z.string(),
  nickname: z.string(),
  pronoun: z.nativeEnum(HackathonPronoun),
  phoneNumber: z.string(),
  email: z.string().email(),
  studentId: z.string(),
  faculty: z.string(),
  department: z.string(),
  university: z.string(),
  role: z.nativeEnum(HackathonRole),
  foodRestriction: z.string().nullish(),
  medication: z.string().nullish(),
  medicalCondition: z.string().nullish(),
  chestSize: z.number().optional().default(0),
})

export const CreateHackathonCommunityTeamDto = z.object({
  code: z.string(),
  teamName: z.string(),
  teamMembers: z.array(CreateHackathonCommunityTeamMemberDto),
})

export const GetHackathonCommunityRegistrationByCodeDto = z.object({
  code: z.string(),
})
