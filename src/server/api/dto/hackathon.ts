import { HackathonTicketType } from '@prisma/client';
import { z } from 'zod';

export const CreateHackathonTicketDto = z.object({
  ticketType: z.nativeEnum(HackathonTicketType),
  quantity: z.number().min(1).default(1),
});

export const ClaimHackathonTicketDto = z.object({
  ticketId: z.number(),
});

export const CreateHackathonTeamTicketDto = z.object({
  ticketIds: z.array(z.number()).length(2),
});

export const GetTicketClaimedByStudentIdDto = z.object({
  studentId: z.string(),
});
