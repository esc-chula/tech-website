'use client'

import type { HackathonTicketType } from '@prisma/client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/ui/alert-dialog'

interface Ticket {
  id: number
  isClaimed: boolean
  teamTicketId: number | null
  code: string
  ticketType: HackathonTicketType
}

interface TicketActionsProps {
  ticket: Ticket
  setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>
}

const TicketActions: React.FC<TicketActionsProps> = ({
  setTickets,
  ticket,
}) => {
  function deleteTicket(): void {
    setTickets((prev) => prev.filter((t) => t.id !== ticket.id))
  }

  return (
    <>
      <button
        className='rounded-md bg-yellow-400 p-2 font-semibold text-black hover:bg-yellow-600'
        type='button'
      >
        Edit
      </button>
      <AlertDialog>
        <AlertDialogTrigger className='rounded-md bg-red-400 p-2 font-semibold text-black hover:bg-red-600'>
          Delete
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className='bg-red-400 hover:bg-red-600'
              onClick={deleteTicket}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default TicketActions
