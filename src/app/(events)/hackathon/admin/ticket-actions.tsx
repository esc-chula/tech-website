interface Ticket {
  id: number;
  // add other properties of Ticket if needed
}

interface TicketActionsProps {
  ticket: Ticket;
  setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
}

export const TicketActions = ({
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
