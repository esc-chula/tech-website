'use server';

import { type HackathonTicketType } from '@prisma/client';

import { api } from '~/trpc/server';
import { type HackathonTicket } from '~/types/hackathon';
import { type Response } from '~/types/server';

export async function createHackathonTicket(
  ticketType: HackathonTicketType,
  quantity: number,
): Promise<Response<HackathonTicket[]>> {
  const res = await api.hackathon.createTicket({
    ticketType,
    quantity,
  });

  return res;
}
