import type { HackathonTicketType } from '@prisma/client';
import type { Dispatch, SetStateAction } from 'react';

import { Table } from '~/components/ui/table';

import TicketActions from './ticket-actions';

interface Ticket {
  id: number;
  isClaimed: boolean;
  isRegistered: boolean;
  teamTicketId: string;
  code: string;
  ticketType: HackathonTicketType;
}

interface TicketsTableProps {
  tickets: Ticket[];
  setTickets: Dispatch<SetStateAction<Ticket[]>>;
}

const TicketsTable = ({
  tickets,
  setTickets,
}: TicketsTableProps): JSX.Element => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Code</th>
          <th>Type</th>
          <th>Claimed</th>
          <th>Registered</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((ticket) => (
          <tr key={ticket.id}>
            <td>{ticket.code}</td>
            <td>{ticket.ticketType}</td>
            <td>{ticket.isClaimed ? 'Yes' : 'No'}</td>
            <td>{ticket.isRegistered ? 'Yes' : 'No'}</td>
            <td>
              <TicketActions setTickets={setTickets} ticket={ticket} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TicketsTable;
