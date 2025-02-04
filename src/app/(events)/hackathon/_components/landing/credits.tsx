import Image from 'next/image';
import React from 'react';

const Credits: React.FC = () => {
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
      <div className="-z-10 rounded-full absolute w-[400px] sm:w-[600px] md:w-[800px] aspect-square bg-hackathon-radial-gradient" />
    </>
  );
};

export default Credits;
