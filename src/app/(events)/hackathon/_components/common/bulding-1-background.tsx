import Image from 'next/image';

import HackathonTitle from './hackathon-title';

const Building1Background: React.FC = () => {
  return (
    <>
      <HackathonTitle className="-z-10 absolute bottom-3 md:bottom-5 text-xl md:text-2xl leading-tight text-center left-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="-z-20 absolute inset-0 select-none pointer-events-none bg-gradient-to-b from-black/50 to-black" />
      <div className="-z-30 absolute inset-0 select-none pointer-events-none">
        <Image
          fill
          priority
          alt="background"
          className="object-cover"
          src="/hackathon/assets/building-1.webp"
        />
      </div>
    </>
  );
};

export default Building1Background;
