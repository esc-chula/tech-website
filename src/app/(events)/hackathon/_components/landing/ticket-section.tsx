'use client'

import { useInView } from 'react-intersection-observer'

import ScrollRevealer from '~/components/common/animation/scroll-revealer'
import { HACKATHON_IG_URL, HACKATHON_OPENCHAT_URL } from '~/constants/hackathon'

import GridTunnel from '../common/grid-tunnel'
import HowToGetTicketDialog from '../common/how-to-get-ticket-dialog'
import TicketBand from '../three/ticket-band'

import Section from './section'

const contents = [
  {
    title: 'Who Can',
    children: (
      <>
        <p className='text-sm text-white/90 sm:text-base'>
          <span className='font-bold'>Undergraduate</span> students from{' '}
          <span className='font-bold underline'>
            all faculties and universities
          </span>{' '}
          are eligible to participate!
        </p>
        <p className='text-sm text-white/90 sm:text-base'>
          ✅ Each team must have at least 2 students from Faculty of
          Engineering, Chulalongkorn University.
        </p>
      </>
    ),
  },
  {
    title: 'How To',
    children: (
      <>
        <div>
          <HowToGetTicketDialog />
        </div>
        <p className='text-sm text-white/90 sm:text-base'>
          🚀 When the tickets are released, it’s game on! Each team must find{' '}
          <span className='font-bold underline'>2 Ticket Codes</span> before
          they can combine them into a{' '}
          <span className='font-bold underline'>Team Pass</span> to secure their
          spot in the hackathon.
        </p>
        <p className='text-sm sm:text-base'>
          🤫 Hint: You can find one of the code in this section too.
        </p>
      </>
    ),
  },
  {
    title: 'Step-by-Step',
    children: (
      <>
        <div className='flex flex-col gap-2 rounded-3xl border-2 border-white/10 p-4 md:flex-row'>
          <span className='relative min-w-6 select-none font-ndot47 text-3xl text-hackathon-primary md:text-center md:text-4xl'>
            1
            <div className='absolute left-2 top-1/2 -z-10 aspect-square w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-hackathon-radial-gradient opacity-70 md:left-1/2 md:-translate-y-[60%]' />
          </span>
          <div>
            <h4 className='font-semibold'>Form Your Team</h4>
            <p className='text-sm text-white/70 md:text-base'>
              Team up with <span className='font-bold underline'>4-5</span>{' '}
              undergrad Hackers and at least 2 students from Faculty of
              Engineering, Chulalongkorn University.
            </p>
          </div>
        </div>
        <div className='flex flex-col gap-2 rounded-3xl border-2 border-white/10 p-4 md:flex-row'>
          <span className='min-w-6 select-none font-ndot47 text-3xl text-white/70 md:text-4xl'>
            2
          </span>
          <div>
            <h4 className='font-semibold'>Register Your Ticket</h4>
            <p className='text-sm text-white/70 md:text-base'>
              Follow the <span className='underline'>hints</span> and{' '}
              <span className='underline'>easter eggs</span> on our{' '}
              <a
                className='font-bold underline'
                href={HACKATHON_IG_URL}
                rel='noopener noreferrer'
                target='_blank'
              >
                Instagram
              </a>{' '}
              &{' '}
              <a
                className='font-bold underline'
                href={HACKATHON_OPENCHAT_URL}
                rel='noopener noreferrer'
                target='_blank'
              >
                LINE OpenChat
              </a>{' '}
              to locate your two Ticket Codes. Each Ticket Code must be claimed
              at Register page.
            </p>
          </div>
        </div>
        <div className='flex flex-col gap-2 rounded-3xl border-2 border-white/10 p-4 md:flex-row'>
          <span className='min-w-6 select-none font-ndot47 text-3xl text-white/30 md:text-4xl'>
            3
          </span>
          <div>
            <h4 className='font-semibold'>Combine Your Tickets</h4>
            <p className='text-sm text-white/70 md:text-base'>
              Once your team has collected 2 Ticket Codes, you can merge them
              into a Team Pass to complete your registration in the website.
            </p>
          </div>
        </div>
      </>
    ),
  },
]

const TicketSection: React.FC = () => {
  const { ref, inView } = useInView()

  return (
    <Section
      title={
        <>
          T<span className='text-hackathon-primary'>I</span>CKET
        </>
      }
    >
      <div className='flex h-full w-full flex-col-reverse justify-end gap-5 pt-6 sm:gap-7 md:pt-5 lg:grid lg:grid-cols-5'>
        <div className='flex flex-col gap-6 px-0 sm:gap-8 md:px-5 lg:col-span-3'>
          {contents.map((content) => (
            <ScrollRevealer
              key={content.title}
              className='flex flex-col gap-4 sm:gap-6'
            >
              <h3 className='select-none font-ndot47 text-2xl uppercase text-white/50 md:text-4xl'>
                {content.title}
              </h3>
              {content.children}
            </ScrollRevealer>
          ))}
        </div>

        <div className='relative h-[50vh] select-none overflow-hidden rounded-3xl border-2 border-white/15 lg:col-span-2 lg:my-auto lg:h-[80vh]'>
          <div className='absolute inset-0'>
            <div
              ref={ref}
              className='absolute bottom-0 left-0 right-0 top-1/4'
            />
            <TicketBand pausedPhysics={!inView} />
          </div>
          <GridTunnel>
            <div className='absolute left-1/2 top-1/2 -z-10 aspect-square w-[480px] -translate-x-1/2 -translate-y-[38%] rounded-full bg-hackathon-radial-gradient opacity-25' />
          </GridTunnel>
        </div>
      </div>
    </Section>
  )
}

export default TicketSection
