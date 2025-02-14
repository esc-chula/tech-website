import {
  HackathonPronoun,
  HackathonRole,
  HackathonTicketType,
} from '@prisma/client';
import { z } from 'zod';

export const CreateHackathonTicketDto = z.object({
  tickets: z.array(
    z.object({
      code: z.string(),
      ticketType: z.nativeEnum(HackathonTicketType),
    }),
  ),
});

export const ClaimHackathonTicketDto = z.object({
  ticketCode: z.string(),
});

export const CreateHackathonTeamTicketDto = z.object({
  ticketIds: z.array(z.number()).length(2),
});

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
});

export const CreateHackathonRegistrationDto = z.object({
  teamName: z.string(),
  teamMembers: z.array(CreateHackathonTeamMemberDto),
});

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
});

export const UpdateHackathonRegistrationDto = z.object({
  teamName: z.string(),
  teamMembers: z.array(UpdateHackathonTeamMemberDto),
});
