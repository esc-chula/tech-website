'use server';

import { type HackathonTicketType } from '@prisma/client';

import { withRateLimit } from '~/lib/rate-limit';
import { api } from '~/trpc/server';
import {
  type HackathonRegistration,
  type HackathonTeamMemberInput,
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

async function claimHackathonTicket(
  ticketCode: string,
): Promise<Response<HackathonTicket>> {
  const res = await api.hackathon.claimTicket({
    ticketCode,
  });

  return res;
}

export const claimHackahonTicketWithRateLimit = withRateLimit(
  claimHackathonTicket,
  {
    maxAttempts: 5,
    windowInSeconds: 300,
  },
  'claim-hackathon-ticket',
);

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

export async function registerHackathonTeam(
  teamName: string,
  teamMembers: HackathonTeamMemberInput[],
): Promise<Response<HackathonRegistration>> {
  const res = await api.hackathon.registerTeam({ teamName, teamMembers });
  return res;
}
