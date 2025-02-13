import type { HackathonTicketType } from '@prisma/client';

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
    <button
      className="bg-red-400 text-black font-semibold hover:bg-red-600 rounded-md p-2"
      type="button"
      onClick={deleteTicket}
    >
      Delete
    </button>
  );
};

export default TicketActions;
