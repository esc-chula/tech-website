import Footer from './_components/common/footer';
import Socials from './_components/common/socials';
import ContainerLines from './_components/landing/container-lines';
import Credits from './_components/landing/credits';
import GridTunnel from './_components/landing/grid-tunnel';
import Hero from './_components/landing/hero';
import ObjectivesSection from './_components/landing/objectives-section';
import OffsetRevealer from './_components/landing/offset-revealer';
import Prize from './_components/landing/prize';
import PrizesSection from './_components/landing/prizes-section';
import TicketSection from './_components/landing/ticket-section';
import TimelineSection from './_components/landing/timeline-section';
import GridTunnelContextProvider from './_contexts/grid-tunnel-context';

const Page: React.FC = () => {
  return (
    <GridTunnelContextProvider>
      <main className="relative">
        <GridTunnel>
          <OffsetRevealer className="gap-8 sm:gap-10 md:gap-12">
            <Hero />
          </OffsetRevealer>
          <OffsetRevealer
            className="gap-2 sm:gap-4 md:gap-6"
            offsetThreshold={500}
            zPosition={-750}
          >
            <Prize />
          </OffsetRevealer>
          <OffsetRevealer
            className="gap-8 sm:gap-10 md:gap-12"
            offsetThreshold={1100}
            zPosition={-1600}
          >
            <Credits />
          </OffsetRevealer>
        </GridTunnel>

        <Socials />
        <ContainerLines />

        <TimelineSection />
        <TicketSection />
        <PrizesSection />
        <ObjectivesSection />

        <Footer />
      </main>
    </GridTunnelContextProvider>
  );
};

export default Page;
