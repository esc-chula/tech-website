import { HackathonTicketType } from '@prisma/client';

export const mockHackathonTickets = [
  {
    id: 1,
    code: 'TICKET123',
    ticketType: HackathonTicketType.DEVELOPER,
    isClaimed: false,
    isRegistered: false,
    claims: [],
    teamTicketId: null,
  },
  {
    id: 2,
    code: 'TICKET456',
    ticketType: HackathonTicketType.DESIGNER,
    isClaimed: true,
    isRegistered: true,
    claims: [
      {
        id: 1,
        ticketId: 2,
        userId: 101,
        claimedAt: new Date(),
        expiredAt: null,
      },
    ],
    teamTicketId: 1,
  },
  {
    id: 3,
    code: 'TICKET789',
    ticketType: HackathonTicketType.PRODUCT,
    isClaimed: false,
    isRegistered: true,
    claims: [],
    teamTicketId: null,
  },
  {
    id: 4,
    code: 'TICKET101',
    ticketType: HackathonTicketType.GENERAL,
    isClaimed: true,
    isRegistered: false,
    claims: [
      {
        id: 2,
        ticketId: 4,
        userId: 102,
        claimedAt: new Date(),
        expiredAt: null,
      },
    ],
    teamTicketId: 2,
  },
];

export const mockHackathonTicketClaims = [
  {
    id: 1,
    ticketId: 2,
    userId: 101,
    claimedAt: new Date(),
    expiredAt: null,
  },
  {
    id: 2,
    ticketId: 4,
    userId: 102,
    claimedAt: new Date(),
    expiredAt: null,
  },
];

export const mockHackathonTeamTickets = [
  {
    id: 1,
    publicId: 'TEAM123',
    userId: 101,
    tickets: [mockHackathonTickets[1]],
    registration: null,
  },
  {
    id: 2,
    publicId: 'TEAM456',
    userId: 102,
    tickets: [mockHackathonTickets[3]],
    registration: null,
  },
];
