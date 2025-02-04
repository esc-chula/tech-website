import { ChevronDown, Mouse } from 'lucide-react';

import HackathonTitle from '../common/hackathon-title';
import Button from '../ui/button';

const Hero: React.FC = () => {
  return (
    <>
      <HackathonTitle className="text-5xl sm:text-6xl md:text-8xl pt-10 sm:pt-8 md:pt-4" />
      <Button className="cursor-default select-text">
        <span className="cursor-text">28 - 30 March 2025</span>
      </Button>
      <div className="absolute w-full flex justify-center items-center flex-col">
        <p className="absolute top-[124px] sm:top-[136px] md:top-44 text-xs md:text-sm opacity-50">
          Open for registration 14 Feb
          <span className="hidden md:inline">ruary</span> 2025
        </p>
      </div>
      {/* <Button>
            <span>Register</span>
            <span>{'->'}</span>
          </Button> */}
      <div className="-z-10 rounded-full absolute w-[600px] sm:w-[800px] md:w-[1000px] aspect-square bg-hackathon-radial-gradient" />
      <div className="absolute flex flex-col bottom-8 opacity-70 scale-90">
        <Mouse />
        <ChevronDown className="animate-pulse" />
      </div>
    </>
  );
};

export default Hero;
