import type { Dispatch, SetStateAction } from 'react';

// import TicketActions from './ticket-actions';

// import { Table } from '@/components/ui/table';

interface Ticket {
  isClaimed: boolean;
  isRegistered: boolean;
  teamTicketId: string;
}

interface TicketsTableProps {
  tickets: Ticket[];
  setTickets: Dispatch<SetStateAction<Ticket[]>>;
}

const TicketsTable = ({
  tickets,
  // setTickets,
}: TicketsTableProps): JSX.Element => {
  return (
    <div>
      <p>this is table {tickets[0]?.isClaimed}</p>
    </div>
    // <Table>
    //   <thead>
    //     <tr>
    //       <th>Code</th>
    //       <th>Type</th>
    //       <th>Claimed</th>
    //       <th>Registered</th>
    //       <th>Actions</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {tickets.map((ticket) => (
    //       <tr key={ticket.id || ''}>
    //         <td>{ticket.code}</td>
    //         <td>{ticket.ticketType}</td>
    //         <td>{ticket.isClaimed ? 'Yes' : 'No'}</td>
    //         <td>{ticket.isRegistered ? 'Yes' : 'No'}</td>
    //         <td>
    //           <TicketActions setTickets={setTickets} ticket={ticket} />
    //         </td>
    //       </tr>
    //     ))}
    //   </tbody>
    // </Table>
  );
};

export default TicketsTable;
