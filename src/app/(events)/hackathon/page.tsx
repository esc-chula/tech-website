import ContainerLines from './_components/landing/container-lines';
import Credits from './_components/landing/credits';
import GridTunnel from './_components/landing/grid-tunnel';
import Hero from './_components/landing/hero';
import OffsetRevealer from './_components/landing/offset-revealer';
import Prize from './_components/landing/prize';
import Timeline from './_components/landing/timeline';
import GridTunnelContextProvider from './_contexts/grid-tunnel-context';

const Page: React.FC = () => {
  return (
    <GridTunnelContextProvider>
      <div className="relative">
        <div className="relative">
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
          <div className="h-[1570px]" />
        </div>
        <ContainerLines />
        <Timeline />
      </div>
    </GridTunnelContextProvider>
  );
};

export default Page;
