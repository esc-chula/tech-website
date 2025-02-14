'use server';

import { type HackathonTicketType } from '@prisma/client';

import { api } from '~/trpc/server';
import {
  type HackathonTeamTicket,
  type HackathonTicket,
  type HackathonTicketClaim,
} from '~/types/hackathon';
import { type Response } from '~/types/server';

export async function createHackathonTicket(
  tickets: {
    code: string;
    ticketType: HackathonTicketType;
  }[],
): Promise<Response<HackathonTicket[]>> {
  const res = await api.hackathon.createTicket({
    tickets,
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

export async function claimHackathonTicket(
  ticketCode: string,
): Promise<Response<HackathonTicket>> {
  const res = await api.hackathon.claimTicket({
    ticketCode,
  });

  return res;
}

export async function getMyTeamTicket(): Promise<
  Response<HackathonTeamTicket | null>
> {
  const res = await api.hackathon.getMyTeamTicket();
  return res;
}

export async function getMyActiveClaim(): Promise<
  Response<HackathonTicketClaim[] | null>
> {
  const res = await api.hackathon.getMyActiveClaim();
  return res;
}
