import { useState } from 'react';
import { type FC } from 'react';

import { mockHackathonTickets } from '../_components/admin/mock-ticket-data';
import Footer from '../_components/common/footer';

import TicketFilters from './ticket-filters';
import TicketStats from './ticket-stats';
import TicketsTable from './tickets-table';

interface Ticket {
  isClaimed: boolean;
  isRegistered: boolean;
  teamTicketId: string;
}

const AdminTicketsPage: FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>(mockHackathonTickets);
  const [filter, setFilter] = useState('ALL');

  const filteredTickets = tickets.filter((ticket) => {
    if (filter === 'CLAIMED') return ticket.isClaimed;
    if (filter === 'UNCLAIMED') return !ticket.isClaimed;
    if (filter === 'REGISTERED') return ticket.isRegistered;
    return true;
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Ticket Management</h1>
      <TicketStats tickets={tickets} />
      <TicketFilters setFilter={setFilter} />
      <TicketsTable setTickets={setTickets} tickets={filteredTickets} />
      <Footer />
    </div>
  );
};

export default AdminTicketsPage;
