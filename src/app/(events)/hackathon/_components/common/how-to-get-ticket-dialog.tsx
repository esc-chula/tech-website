'use client'

import { MessageCircleQuestion } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'

const HowToGetTicketDialog: React.FC = () => {
  return (
    <Dialog modal>
      <DialogTrigger asChild>
        <button
          className='flex rounded-full border-2 border-white/10 bg-white/10 px-4 py-2 text-xs font-medium tracking-tighter text-white/70 backdrop-blur-md hover:bg-white/15 sm:text-base'
          type='button'
          onClick={() => {
            console.log('DEV_3AUO70434N')
          }}
        >
          <MessageCircleQuestion className='mr-0.5 size-3.5 sm:mr-1.5 sm:size-6' />
          How to Get Tickets?
        </button>
      </DialogTrigger>
      <DialogContent className='w-4/5 rounded-2xl border-2 border-white/40 bg-white/10 px-4 py-4 backdrop-blur-md sm:w-full md:px-10 md:py-8'>
        <DialogTitle className='select-none text-center font-ndot47 text-xl tracking-tighter sm:text-4xl'>
          Ticket Rules & Guides
        </DialogTitle>
        <DialogDescription asChild>
          <ol className='flex list-decimal flex-col gap-2 text-xs leading-relaxed text-white/80 sm:text-base'>
            <li>
              <span className='font-bold'>Form Your Team:</span> Team up with
              4-5 undergrad Hackers and at least 2 students from Faculty of
              Engineering, Chulalongkorn University.
            </li>
            <li>
              <span className='font-bold'>Find Your Tickets:</span> Follow the
              hints and Easter eggs on our social media & LINE OpenChat to
              locate your two Ticket Codes.
            </li>
            <li>
              <span className='font-bold'>Register Your Ticket:</span> Each
              Ticket Code must be claimed at Register page.
              <br />
              <br />
              <span className='font-medium'>Note:</span> There are 4 types of
              ticket, which are General, Developer, Designer, and Product. Both
              of your claimed tickets must be a different type to be able to
              merge them into a Team Pass.
              <br />
              <br />
              <span className='font-medium'>Note:</span> When you claim a
              ticket, you have around 48 hours to find another ticket before the
              ticket expires, allowing others that have the same code to claim
              your ticket too
            </li>
            <li>
              <span className='font-bold'>Combine Your Tickets:</span> Once your
              team has collected 2 Ticket Codes, you can merge them into a Team
              Pass to complete your registration in the website.
            </li>
          </ol>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

export default HowToGetTicketDialog
