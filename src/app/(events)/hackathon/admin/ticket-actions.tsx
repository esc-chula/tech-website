import type { HackathonTicketType } from '@prisma/client';

interface Ticket {
  id: number;
  isClaimed: boolean;
  isRegistered: boolean;
  teamTicketId: string;
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
    <button className="btn btn-danger" type="button" onClick={deleteTicket}>
      Delete
    </button>
  );
};

export default TicketActions;
