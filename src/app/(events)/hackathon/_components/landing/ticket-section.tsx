'use client';

import { useInView } from 'react-intersection-observer';

import GridTunnel from '../common/grid-tunnel';
import TicketBand from '../three/ticket-band';

import Section from './section';

const TicketSection: React.FC = () => {
  const { ref, inView } = useInView();

  return (
    <Section title="TICKET">
      <div className="flex flex-col-reverse gap-5 sm:gap-7 justify-end lg:grid w-full h-full lg:grid-cols-5">
        <div className="lg:col-span-3 flex flex-col gap-4 sm:gap-6">
          <p className="text-sm sm:text-base text-white/80">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            rem sequi officiis aspernatur at perferendis quos nemo illum
            explicabo quisquam sit, neque obcaecati nisi magnam veniam commodi
            amet. Mollitia, eaque?
          </p>
          <p className="text-sm sm:text-base text-white/80">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            rem sequi officiis aspernatur at perferendis quos nemo illum
            explicabo quisquam sit, neque obcaecati nisi magnam veniam commodi
            amet. Mollitia, eaque?
          </p>
          <p className="text-sm sm:text-base text-white/80">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            rem sequi officiis aspernatur at perferendis quos nemo illum
            explicabo quisquam sit, neque obcaecati nisi magnam veniam commodi
            amet. Mollitia, eaque?
          </p>
          <p className="text-sm sm:text-base text-white/80">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            rem sequi officiis aspernatur at perferendis quos nemo illum
            explicabo quisquam sit, neque obcaecati nisi magnam veniam commodi
            amet. Mollitia, eaque?
          </p>
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
