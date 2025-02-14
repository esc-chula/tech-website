'use client';

import type { HackathonTicketType } from '@prisma/client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/ui/alert-dialog';

interface Ticket {
  id: number;
  isClaimed: boolean;
  isRegistered: boolean;
  teamTicketId: number | null;
  code: string;
  ticketType: HackathonTicketType;
}

interface TicketActionsProps {
  ticket: Ticket;
  setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
}

const TicketActions = ({
  setTickets,
  ticket,
}: TicketActionsProps): JSX.Element => {
  function deleteTicket(): void {
    setTickets((prev) => prev.filter((t) => t.id !== ticket.id));
  }

  return (
    <>
      <button
        className="bg-yellow-400 text-black font-semibold hover:bg-yellow-600 rounded-md p-2"
        type="button"
      >
        Edit
      </button>
      <AlertDialog>
        <AlertDialogTrigger className="bg-red-400 text-black font-semibold hover:bg-red-600 rounded-md p-2">
          Delete
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-400 hover:bg-red-600"
              onClick={deleteTicket}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TicketActions;
