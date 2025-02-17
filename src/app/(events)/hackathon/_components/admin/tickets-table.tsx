import type { HackathonTicketType } from '@prisma/client'
import type { Dispatch, SetStateAction } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '~/components/ui/table'

import TicketActions from './ticket-actions'

interface Ticket {
  id: number
  isClaimed: boolean
  isRegistered: boolean
  teamTicketId: number | null
  code: string
  ticketType: HackathonTicketType
}

interface TicketsTableProps {
  tickets: Ticket[]
  setTickets: Dispatch<SetStateAction<Ticket[]>>
}

const TicketsTable: React.FC<TicketsTableProps> = ({ tickets, setTickets }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>Code</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Claimed</TableCell>
          <TableCell>Registered</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tickets.map((ticket) => (
          <TableRow key={ticket.id}>
            <TableCell>{ticket.code}</TableCell>
            <TableCell>{ticket.ticketType}</TableCell>
            <TableCell>{ticket.isClaimed ? 'Yes' : 'No'}</TableCell>
            <TableCell>{ticket.isRegistered ? 'Yes' : 'No'}</TableCell>
            <TableCell>
              <TicketActions setTickets={setTickets} ticket={ticket} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TicketsTable
