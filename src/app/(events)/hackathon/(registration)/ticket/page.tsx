import { MessageCircleQuestion } from 'lucide-react'
import { redirect } from 'next/navigation'

import {
  findMyRegistration,
  findMyTeamTicket,
  getMyActiveClaim,
} from '~/server/actions/hackathon'

import Building1Background from '../../_components/common/bulding-1-background'
import UserBox from '../../_components/common/user-box'
import TicketForm from '../../_components/ticket/ticket-form'

const Page: React.FC = async () => {
  const resMyTeamTicket = await findMyTeamTicket()
  const resMyActiveClaim = await getMyActiveClaim()

  let ticket1
  let ticket2

  if (resMyActiveClaim.success && resMyActiveClaim.data) {
    if (resMyActiveClaim.data.length > 0) {
      ticket1 = {
        id: resMyActiveClaim.data[0]?.ticketId ?? 0,
        ticketType: resMyActiveClaim.data[0]?.ticket.ticketType ?? 'GENERAL',
        expiredAt: resMyActiveClaim.data[0]?.expiredAt ?? null,
      }
    }

    if (resMyActiveClaim.data.length > 1) {
      ticket2 = {
        id: resMyActiveClaim.data[1]?.ticketId ?? 0,
        ticketType: resMyActiveClaim.data[1]?.ticket.ticketType ?? 'GENERAL',
        expiredAt: resMyActiveClaim.data[1]?.expiredAt ?? null,
      }
    }
  }

  if (resMyTeamTicket.success && resMyTeamTicket.data) {
    const resMyRegistration = await findMyRegistration()

    if (!resMyRegistration.success) {
      return 'Something went wrong, please try again later...'
    }

    if (!resMyRegistration.data) {
      return redirect('/hackathon/registration')
    }

    return (
      <>
        <div className='flex min-h-dvh flex-col items-center gap-10 pb-24 pt-8'>
          <UserBox />
          <div className='mt-4 flex flex-col items-center gap-4'>
            <h1 className='text-center text-6xl font-semibold capitalize tracking-tighter text-white'>
              Your Team Ticket
            </h1>
          </div>
          hehe
        </div>
        <Building1Background />
      </>
    )
  }

  return (
    <>
      <div className='flex min-h-dvh flex-col items-center gap-10 pb-24 pt-8'>
        <UserBox />
        <div className='mt-4 flex flex-col items-center gap-4'>
          <h1 className='text-center text-6xl font-semibold capitalize tracking-tighter text-white'>
            Claim Your Ticket
          </h1>
          <button
            className='flex rounded-full bg-white/10 px-4 py-2 font-medium tracking-tighter text-white/70 backdrop-blur-md hover:bg-white/15'
            type='button'
          >
            <MessageCircleQuestion className='mr-1.5 h-6 w-6' />
            How to Get Tickets?
          </button>
        </div>
        <div className='flex h-1/2 w-full grow-[0.5] items-center justify-center'>
          <TicketForm ticket1={ticket1} ticket2={ticket2} />
        </div>
      </div>
      <Building1Background />
    </>
  )
}

export default Page
