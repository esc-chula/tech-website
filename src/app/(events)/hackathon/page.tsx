import { TicketConsolePathfinding } from './(ticket-releasing)/ticket-releasing'
import HiddenTicketFetcher from './(ticket-releasing)/ticket-post'
import {
  TicketRandomConsoleLog,
  TicketRandomTransparentText,
  TicketSetLocalStorage,
} from './(ticket-releasing)/ticket-releasing'
import Footer from './_components/common/footer'
import Socials from './_components/common/socials'
import AnimatedGridTunnel from './_components/landing/animated-grid-tunnel'
import ContainerLines from './_components/landing/container-lines'
import HeroSection from './_components/landing/hero-section'
import ObjectivesSection from './_components/landing/objectives-section'
import OffsetRevealer from './_components/landing/offset-revealer'
import PrizeSection from './_components/landing/prize-section'
// import PrizesSection from './_components/landing/prizes-section';
import SponsorsSection from './_components/landing/sponsors-section'
import TicketSection from './_components/landing/ticket-section'
import TimelineSection from './_components/landing/timeline-section'
import GridTunnelContextProvider from './_contexts/grid-tunnel-context'

const Page: React.FC = () => {
  return (
    <>
      {/* TICKET_HERE PATHFINDING */}
      <TicketConsolePathfinding pathway='ลองไปดูที่ Footer ใต้คำว่า Intania Hackathon' />
      <HiddenTicketFetcher />
      <TicketRandomConsoleLog
        tickets={[
          'DEV_GM0HP5G68B',
          'DEV_LZVHRI8AD4',
          'DEV_J99LB1RMSA',
          'DEV_FGSNU249N0',
          'ไหนอั่งเปา',
          'ไหนอั่งเปา',
          'ไหนอั่งเปา',
          'ไหนอั่งเปา',
          'ไหนอั่งเปา',
        ]}
      />
      <TicketRandomConsoleLog
        tickets={[
          'บางปีก็เสียใจที่ไม่ได้อั่งเปา แต่ปีนี้เสียเราที่ไม่มีเธอ เพราะเธอะละเมอกินอั่งเปา เราเลยกินนาย อยากคลายรีเฟรชหัวใจ หาไฟไปหาอั่งเปา',
          'https://intania.tech/hackathon/jackpot',
        ]}
      />
      <TicketSetLocalStorage name='tae-eia' ticket='DEV_FSTUON8IUL' />
      <GridTunnelContextProvider>
        <div className='relative'>
          {/* fixed components */}
          <Socials />
          <ContainerLines />

          {/* hero grid tunnel */}
          <AnimatedGridTunnel>
            <OffsetRevealer className='gap-5'>
              <HeroSection />
            </OffsetRevealer>
            <OffsetRevealer
              className='gap-2 sm:gap-4 md:gap-6'
              offsetThreshold={500}
              zPosition={-750}
            >
              <PrizeSection />
            </OffsetRevealer>
            <OffsetRevealer
              className='gap-8 sm:gap-10 md:gap-12'
              offsetThreshold={1100}
              zPosition={-1600}
            >
              <SponsorsSection />
            </OffsetRevealer>
          </AnimatedGridTunnel>

          {/* info sections */}
          <TimelineSection />
          <TicketSection />
          {/* <PrizesSection /> */}
          <ObjectivesSection />
          {/* TODO: judges, swags */}

          <Footer />
        </div>
      </GridTunnelContextProvider>
    </>
  )
}

export default Page
