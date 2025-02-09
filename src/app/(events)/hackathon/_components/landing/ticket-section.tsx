'use client';

import { useInView } from 'react-intersection-observer';

import GridTunnel from '../common/grid-tunnel';
import TicketBand from '../three/ticket-band';

import Section from './section';

const TicketSection: React.FC = () => {
  const { ref, inView } = useInView();

  return (
    <Section
      title={
        <>
          T<span className="text-hackathon-primary">I</span>CKET
        </>
      }
    >
      <div className="flex flex-col-reverse gap-5 sm:gap-7 justify-end lg:grid w-full h-full lg:grid-cols-5 pt-6 md:pt-5">
        <div className="lg:col-span-3 flex flex-col gap-4 sm:gap-6 px-0 md:px-5">
          <div className="flex flex-col gap-1">
            <h3 className="font-ndot47 text-2xl md:text-4xl lowercase text-white/50 select-none">
              Who Can
            </h3>
            {/* <span className="text-xs md:text-sm font-medium text-white/25">
              How to acquire a ticket?
            </span> */}
          </div>
          <p className="text-sm sm:text-base text-white/90">
            <span className="font-bold">Undergraduate</span> students from{' '}
            <span className="font-bold underline">
              all faculties and universities
            </span>{' '}
            are eligible to participate!
          </p>
          <p className="text-sm sm:text-base text-white/90">
            ✅ Each team must have at least 2 students from Faculty of
            Engineering, Chulalongkorn University’s.
          </p>
          <div className="flex flex-col gap-1">
            <h3 className="font-ndot47 text-2xl md:text-4xl lowercase text-white/50 select-none">
              How To
            </h3>
          </div>
          <p className="text-sm sm:text-base text-white/90">
            🚀 The Ticket Hunt Begins! When the tickets are released, it’s game
            on! Each team must find{' '}
            <span className="font-bold underline">2 ticket codes</span> before
            they can combine them into a{' '}
            <span className="font-bold underline">Team Ticket</span> to secure
            their spot in the hackathon.
          </p>
          <div className="flex flex-col gap-1">
            <h3 className="font-ndot47 text-2xl md:text-4xl lowercase text-white/50 select-none">
              Step-by-Step
            </h3>
          </div>
          <div className="p-4 rounded-3xl border-2 border-white/10 flex gap-2">
            <span className="font-ndot47 text-3xl md:text-4xl w-10 text-hackathon-primary text-center select-none">
              1
            </span>
            <div>
              <h4 className="font-semibold">Find Your Tickets</h4>
              <p className="text-white/70 text-sm md:text-base">
                Follow the hints and Easter eggs on our social media & LINE
                OpenChat to locate your two individual tickets.
              </p>
            </div>
          </div>
          <div className="p-4 rounded-3xl border-2 border-white/10 flex gap-2">
            <span className="font-ndot47 text-3xl md:text-4xl w-10 text-white/70 select-none">
              2
            </span>
            <div>
              <h4 className="font-semibold">Register Your Ticket</h4>
              <p className="text-white/70 text-sm md:text-base">
                Each ticket must be claimed using a Chulalongkorn University
                Engineering Student account.
              </p>
            </div>
          </div>
          <div className="p-4 rounded-3xl border-2 border-white/10 flex gap-2">
            <span className="font-ndot47 text-3xl md:text-4xl w-10 text-white/30 select-none">
              3
            </span>
            <div>
              <h4 className="font-semibold">Combine Your Tickets</h4>
              <p className="text-white/70 text-sm md:text-base">
                Once your team has collected 2 tickets, you can merge them into
                a Team Ticket to complete your registration.
              </p>
            </div>
          </div>
        </div>

        <div className="relative lg:col-span-2 border-2 lg:my-auto h-[50vh] lg:h-[80vh] border-white/15 rounded-3xl select-none overflow-hidden">
          <div className="absolute inset-0">
            <div
              ref={ref}
              className="absolute top-1/4 left-0 right-0 bottom-0"
            />
            <TicketBand pausedPhysics={!inView} />
          </div>
          <GridTunnel>
            <div className="-z-10 rounded-full absolute w-[480px] top-1/2 -translate-y-[38%] left-1/2 -translate-x-1/2 aspect-square bg-hackathon-radial-gradient opacity-25" />
          </GridTunnel>
        </div>
      </div>
    </Section>
  );
};

export default TicketSection;
