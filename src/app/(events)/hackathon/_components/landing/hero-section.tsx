import { ChevronDown, Mouse } from 'lucide-react';
import Link from 'next/link';

import HackathonTitle from '../common/hackathon-title';
import HackathonTitleHover from '../common/hackathon-title-hover';
import Button from '../ui/button';

const IS_REGISTRATION_OPEN = true as true | false;

const HeroSection: React.FC = () => {
  return (
    <>
      <HackathonTitleHover
        className="hidden md:flex pt-5"
        dotSize={10.5}
        lines={['INTANIA', 'HACKATHON']}
        colorMap={{
          HACKATHON: {
            text: 'O',
            color: 'bg-hackathon-primary',
          },
        }}
      />
      <HackathonTitle className="text-5xl sm:text-6xl md:hidden pt-7 sm:pt-5" />
      {IS_REGISTRATION_OPEN ? (
        <>
          <Link className="rounded-full" href="/hackathon/register">
            <Button className="hover:scale-110 duration-300 ease-in-out">
              <span>Register</span>
              <span>{'->'}</span>
            </Button>
          </Link>
          <div className="absolute w-full flex justify-center items-center flex-col">
            <p className="absolute top-[108px] sm:top-[118px] md:top-40 text-xs md:text-sm opacity-50">
              28 - 30 March 2025
            </p>
          </div>
        </>
      ) : (
        <>
          <Button className="cursor-default select-text">
            <span className="cursor-text">28 - 30 March 2025</span>
          </Button>
          <div className="absolute w-full flex justify-center items-center flex-col">
            <p className="absolute top-[108px] sm:top-[118px] md:top-40 text-xs md:text-sm opacity-50">
              Ticket release on 17 Feb
              <span className="hidden md:inline">ruary</span> 2025
            </p>
          </div>
        </>
      )}

      <div className="-z-10 rounded-full absolute w-[600px] sm:w-[800px] md:w-[1000px] aspect-square bg-hackathon-radial-gradient" />
      <div className="absolute flex flex-col bottom-8 opacity-70 scale-90">
        <Mouse />
        <ChevronDown className="animate-pulse" />
      </div>
    </>
  );
};

export default HeroSection;
