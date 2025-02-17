import { MessageCircleQuestion } from 'lucide-react'
import { redirect } from 'next/navigation'

import { Dialog, DialogContent, DialogTrigger } from '~/components/ui/dialog'
import {
  findMyRegistration,
  findMyTeamTicket,
  getMyActiveClaim,
} from '~/server/actions/hackathon'

import Building1Background from '../../_components/common/bulding-1-background'
import UserBox from '../../_components/common/user-box'
import TeamTicket from '../../_components/ticket/team-ticket'
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
        <div className='flex min-h-dvh flex-col items-center gap-8 pb-24 pt-8'>
          <UserBox />
          <div className='mt-4 flex flex-col items-center gap-4'>
            <h1 className='text-center text-4xl font-semibold capitalize tracking-tighter text-white sm:text-5xl md:text-6xl'>
              Your Team Ticket
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
      <div className='flex min-h-dvh flex-col items-center gap-10 pb-24 pt-8'>
        <UserBox />
        <div className='mt-4 flex flex-col items-center gap-4'>
          <h1 className='text-center text-4xl font-semibold capitalize tracking-tighter text-white sm:text-6xl'>
            Claim Your Ticket
          </h1>
          <Dialog modal>
            <DialogTrigger asChild>
              <button
                className='flex rounded-full bg-white/10 px-4 py-2 text-xs font-medium tracking-tighter text-white/70 backdrop-blur-md hover:bg-white/15 sm:text-base'
                type='button'
              >
                <MessageCircleQuestion className='mr-0.5 size-3.5 sm:mr-1.5 sm:size-6' />
                How to Get Tickets?
              </button>
            </DialogTrigger>
            <DialogContent className='w-4/5 rounded-2xl border-2 border-white/40 bg-white/10 px-10 py-8 backdrop-blur-md sm:w-full'>
              <h2 className='select-none text-center font-ndot47 text-xl tracking-tighter sm:text-4xl'>
                Ticket Rules & Guides
              </h2>
              <ol className='flex list-decimal flex-col gap-2 text-xs leading-relaxed text-white/80 sm:text-base'>
                <li>
                  <span className='font-bold'>Form Your Team:</span> Team up
                  with 4-5 undergrad Hackers and at least 2 students from
                  Faculty of Engineering, Chulalongkorn University.
                </li>
                <li>
                  <span className='font-bold'>Find Your Tickets:</span> Follow
                  the hints and Easter eggs on our social media & LINE OpenChat
                  to locate your two Ticket Codes.
                </li>
                <li>
                  <span className='font-bold'>Register Your Ticket:</span> Each
                  Ticket Code must be claimed at Register page.
                  <br />
                  <br />
                  <span className='font-medium'>Note:</span> There are 4 types
                  of ticket, which are General, Developer, Designer, and
                  Product. Both of your claimed tickets must be a different type
                  to be able to merge them into a Team Ticket.
                  <br />
                  <br />
                  <span className='font-medium'>Note:</span> When you claim a
                  ticket, you have around 48 hours to find another ticket before
                  the ticket expires, allowing others that have the same code to
                  claim your ticket too
                </li>
                <li>
                  <span className='font-bold'>Combine Your Tickets:</span> Once
                  your team has collected 2 Ticket Codes, you can merge them
                  into a Team Ticket to complete your registration in the
                  website.
                </li>
              </ol>
            </DialogContent>
          </Dialog>
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
