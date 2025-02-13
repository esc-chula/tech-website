'use server';

import { type HackathonTicketType } from '@prisma/client';

import { api } from '~/trpc/server';
import {
  type HackathonTeamTicket,
  type HackathonTicket,
} from '~/types/hackathon';
import { type Response } from '~/types/server';

import { checkAppRole } from './role';

export async function createHackathonTicket(
  ticketType: HackathonTicketType,
  quantity: number,
): Promise<Response<HackathonTicket[]>> {
  const resCheck = await checkAppRole({ appId: 'hackathon', role: 'admin' });
  if (!resCheck.success) {
    return {
      success: false,
      message: 'Unauthorized: Requires admin role',
      errors: resCheck.errors,
    };
  }

  const res = await api.hackathon.createTicket({
    ticketType,
    quantity,
  });

  return res;
}

export async function createHackathonTeamTicket(
  ticketIds: number[],
): Promise<Response<HackathonTeamTicket>> {
  const res = await api.hackathon.createTeamTicket({
    ticketIds,
  });

  return res;
}
