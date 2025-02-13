import { type HackathonTicketType } from '@prisma/client';

export interface HackathonTicket {
  id: number;
  code: string;
  ticketType: HackathonTicketType;
  isClaimed: boolean;
  isRegistered: boolean;
  teamTicketId: number | null;
}

export interface HackathonTeamTicket {
  id: number;
  publicId: string;
  userId: number;
  tickets: HackathonTicket[];
}

export interface HackathonTicketClaim {
  id: number;
  ticketId: number;
  userId: number;
  claimedAt: Date;
  expiredAt: Date | null;
}
