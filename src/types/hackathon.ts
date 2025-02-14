import type { HackathonPronoun, HackathonTicketType } from '@prisma/client';

export interface HackathonTicket {
  id: number;
  code: string;
  ticketType: HackathonTicketType;
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

export interface HackathonTeamMember {
  id: number;
  firstName: string;
  lastName: string;
  nickname: string;
  pronoun: HackathonPronoun;
  phoneNumber: string;
  email: string;
  studentId: string;
  faculty: string;
  department: string;
}

export interface HackathonRegistration {
  id: number;
  teamName: string;
  teamMembers: HackathonTeamMember[];
}
