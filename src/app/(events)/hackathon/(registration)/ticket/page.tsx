import { type Metadata } from 'next'
import { redirect } from 'next/navigation'

import {
  findMyRegistration,
  findMyTeamTicket,
  getMyActiveClaim,
} from '~/server/actions/hackathon'

import BackButton from '../../_components/common/back-button'
import Building1Background from '../../_components/common/bulding-1-background'
import HowToGetTicketDialog from '../../_components/common/how-to-get-ticket-dialog'
import UserBox from '../../_components/common/user-box'
import TeamTicket from '../../_components/ticket/team-ticket'
import TicketForm from '../../_components/ticket/ticket-form'
import TicketStats from '../../_components/ticket/ticket-stats'

export const metadata: Metadata = {
  title: 'Intania Hackathon - Ticket',
}

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
        <BackButton href='/hackathon' />
        <div className='flex min-h-dvh flex-col items-center gap-8 pb-24 pt-8'>
          <UserBox />
          <div className='mt-4 flex flex-col items-center gap-4'>
            <h1 className='text-center text-4xl font-semibold capitalize tracking-tighter text-white sm:text-5xl md:text-6xl'>
              Your Team Pass
            </h1>
          </div>
          <TeamTicket
            registration={resMyRegistration.data}
            teamTicket={resMyTeamTicket.data}
          />
        </div>
        <Building1Background />
      </>
    )
  }

  return (
    <>
      <BackButton href='/hackathon' />
      <div className='flex min-h-dvh flex-col items-center gap-10 overflow-hidden pb-24 pt-8'>
        <UserBox />
        <div className='mt-4 flex flex-col items-center gap-4'>
          <h1 className='text-center text-4xl font-semibold capitalize tracking-tighter text-white sm:text-6xl'>
            Claim Your Ticket
          </h1>
          <HowToGetTicketDialog />
        </div>
        <TicketStats />
        <div className='-mt-4 flex h-1/2 w-full grow-[0.5] items-center justify-center'>
          <TicketForm ticket1={ticket1} ticket2={ticket2} />
        </div>
      </div>
      <Building1Background />
    </>
  )
}

export default Page
