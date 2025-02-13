import { HackathonTicketType } from '@prisma/client';
import { z } from 'zod';

export const CreateHackathonTicketDto = z.object({
  ticketType: z.nativeEnum(HackathonTicketType),
  quantity: z.number().min(1).default(1),
});

export const ClaimHackathonTicketDto = z.object({
  ticketCode: z.string(),
});

export const CreateHackathonTeamTicketDto = z.object({
  ticketIds: z.array(z.number()).length(2),
});
