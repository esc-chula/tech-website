import Image from 'next/image';

const BirdsBackground: React.FC = () => {
  return (
    <div className="-z-30 fixed inset-0 select-none pointer-events-none">
      <Image
        fill
        priority
        alt="background"
        className="object-cover"
        src="/hackathon/assets/birds-background.png"
      />
    </div>
  );
};

export default BirdsBackground;
