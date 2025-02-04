'use client';

import Image from 'next/image';

import { useGridTunnelContext } from '../../_contexts/grid-tunnel-context';

const Credits: React.FC = () => {
  const { offset } = useGridTunnelContext();

  return (
    <>
      <div className="flex flex-col items-center gap-5">
        <p className="sm:text-lg md:text-xl font-semibold">Organized By</p>
        <div className="flex gap-4">
          <div className="relative w-24 aspect-square select-none">
            <Image
              fill
              alt="esc-chula"
              className="object-contain"
              src="/hackathon/assets/esc-organized-logo.svg"
            />
          </div>
          <div className="relative w-24 aspect-square select-none">
            <Image
              fill
              alt="esc-chula"
              className="object-contain"
              src="/hackathon/assets/esc-organized-logo.svg"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-5">
        <p className="sm:text-lg md:text-xl font-semibold">Sponsored By</p>
        <div className="flex gap-4">
          <div className="relative w-24 aspect-square select-none">
            <Image
              fill
              alt="esc-chula"
              className="object-contain"
              src="/hackathon/assets/esc-organized-logo.svg"
            />
          </div>
          <div className="relative w-24 aspect-square select-none">
            <Image
              fill
              alt="esc-chula"
              className="object-contain"
              src="/hackathon/assets/esc-organized-logo.svg"
            />
          </div>
          <div className="relative w-24 aspect-square select-none">
            <Image
              fill
              alt="esc-chula"
              className="object-contain"
              src="/hackathon/assets/esc-organized-logo.svg"
            />
          </div>
        </div>
      </div>
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

export default Credits;
