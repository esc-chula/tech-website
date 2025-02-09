'use client';

import Image from 'next/image';

import { useGridTunnelContext } from '../../_contexts/grid-tunnel-context';

const organizers = [
  {
    name: 'esc-chula',
    logo: '/hackathon/assets/organizer-logo-1.png',
  },
  {
    name: 'esc-chula',
    logo: '/hackathon/assets/organizer-logo-2.png',
  },
];

const SponsorsSection: React.FC = () => {
  const { offset } = useGridTunnelContext();

  return (
    <>
      <div className="flex flex-col items-center gap-5">
        <p className="sm:text-lg md:text-xl font-semibold">Organized By</p>
        <div className="flex gap-4">
          {organizers.map((organizer) => (
            <div
              key={organizer.name}
              className="relative w-24 aspect-square select-none"
            >
              <Image
                fill
                alt={organizer.name}
                className="object-contain"
                src={organizer.logo}
              />
            </div>
          ))}
        </div>
      </div>
      {/* <div className="flex flex-col items-center gap-5">
        <p className="sm:text-lg md:text-xl font-semibold">Sponsored By</p>
      </div> */}
      <div
        className="-z-10 rounded-full absolute w-[200px] sm:w-[400px] md:w-[600px] aspect-square bg-hackathon-radial-gradient"
        style={{
          // opacity from 100 to 0, start from offset 1400 to 1900
          opacity: Math.max(0, 1 - (offset - 1400) / 500),
        }}
      />
    </>
  );
};

export default SponsorsSection;
