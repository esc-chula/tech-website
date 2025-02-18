'use client'

import type { HackathonTicketType } from '@prisma/client'
import { useState } from 'react'

import { mockHackathonTickets } from '../_components/admin/mock-ticket-data'
import TicketFilters from '../_components/admin/ticket-filters'
import TicketStats from '../_components/admin/ticket-stats'
import TicketsTable from '../_components/admin/tickets-table'

interface Ticket {
  id: number
  isClaimed: boolean
  teamTicketId: number | null
  code: string
  ticketType: HackathonTicketType
}
const AdminTicketsPage: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>(mockHackathonTickets)
  const [filter, setFilter] = useState('ALL')

  const filteredTickets = tickets.filter((ticket) => {
    if (filter === 'CLAIMED') return ticket.isClaimed
    if (filter === 'UNCLAIMED') return !ticket.isClaimed
    return true
  })

  return (
    <div className='space-y-10 p-6'>
      <h1 className='text-center text-2xl font-bold'>
        Admin Ticket Management
      </h1>
      <TicketStats tickets={tickets} />
      <TicketFilters setFilter={setFilter} />
      <TicketsTable setTickets={setTickets} tickets={filteredTickets} />
    </div>
  )
}

export default AdminTicketsPage
