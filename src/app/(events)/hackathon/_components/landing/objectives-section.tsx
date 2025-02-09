'use client';

import { useEffect, useRef, useState } from 'react';

import ScrollRevealer from '~/components/common/animation/scroll-revealer';
import { cn } from '~/lib/utils';

import Section from './section';

const objectives = [
  {
    title: 'Intania',
    children: (
      <>
        <p>
          This hackathon is designed to unleash the full potential of
          engineering students from Chulalongkorn University’s Faculty of
          Engineering (Intania).
        </p>
        <p className="text-lg md:text-xl font-semibold">
          “Made in{' '}
          <span className="text-hackathon-primary font-bold">Intania</span>”
        </p>
        <p>
          A statement that represents real innovation with a global impact. This
          is where the brightest minds come together to solve problems, create
          groundbreaking technology, and make a difference in the world.
        </p>
      </>
    ),
  },
  {
    title: 'Innovate',
    children: (
      <>
        <p className="text-lg md:text-xl font-semibold">
          Discovery → Ideation →{' '}
          <span className="text-white font-bold underline">POC Creation</span> →{' '}
          <span className="text-hackathon-primary font-bold">Execution</span>
        </p>
        <p>
          Unlike typical competitions, Intania Hackathon is a{' '}
          <span className="font-bold">REAL</span> hackathon. Our goal is not
          just ideas but tangible innovation. This event pushes teams to go
          beyond ideation and develop a real Proof of Concept (POC).
        </p>
        <p>
          The best products / solutions / or innovations will receive support
          and funding to turn their ideas into reality, making this more than
          just a competition—it’s the start of something big.
        </p>
      </>
    ),
  },
  {
    title: 'Impressive',
    children: (
      <>
        <p>
          From the moment you decided to participate, you’ll experience an event
          like no other—a competition that no one has ever participated in
          before, and one they will never forget.
        </p>
        <p>
          We aim to make Intania Hackathon the most{' '}
          <span className="text-white font-semibold">
            thrilling,{' '}
            <span className="text-hackathon-primary font-bold">fun</span>, and
            memorable
          </span>{' '}
          tech event ever. This isn’t just about winning—it’s about the
          experience, and the community.
        </p>
      </>
    ),
  },
];

const ObjectivesSection: React.FC = () => {
  return (
    <Section
      title={
        <>
          WT<span className="text-hackathon-primary">H</span>
        </>
      }
    >
      <div className="flex flex-col pt-6 sm:pt-0 md:pt-5 px-0 md:px-5">
        <span className="font-ndot47 text-2xl md:text-4xl text-white/50 select-none">
          what the HACK?!
        </span>
        {objectives.map((objective, index) => (
          <ScrollRevealer key={objective.title}>
            <ObjectiveCard index={index} title={objective.title}>
              <div className="flex flex-col gap-5 text-white/90 text-sm md:text-base">
                {objective.children}
              </div>
            </ObjectiveCard>
          </ScrollRevealer>
        ))}
      </div>
    </Section>
  );
};

export default ObjectivesSection;

interface ObjectiveCardProps {
  children: React.ReactNode;
  index: number;
  title: string;
}

const ObjectiveCard: React.FC<ObjectiveCardProps> = ({
  children,
  index,
  title,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(index !== 0);

  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    setContentHeight(contentRef.current?.clientHeight ?? 0);
  }, [contentRef]);

  return (
    <div className="flex flex-col">
      <button
        className="w-full flex justify-between items-end group"
        type="button"
        onClick={() => setIsCollapsed((prev) => !prev)}
      >
        <h3 className="font-ndot47 text-4xl md:text-6xl lowercase select-none duration-75 group-hover:text-hackathon-primary">
          {title}
        </h3>
        <span
          className={cn(
            'font-ndot47 text-2xl md:text-5xl select-none text-white/60 group-hover:text-white',
            isCollapsed ? '' : '-mt-[1.4%] mb-[1.4%]',
          )}
        >
          {isCollapsed ? '+' : '_'}
        </span>
      </button>
      <div
        className={cn(
          'overflow-hidden transform-gpu transition-all',
          isCollapsed ? 'h-0' : 'h-40',
        )}
        style={{
          height: isCollapsed ? 0 : `${contentHeight + 40}px`,
        }}
      >
        <div
          ref={contentRef}
          className="flex flex-col gap-4 md:gap-6 pt-4 md:px-2"
        >
          <hr className="border-b md:border-b-2 border-white/25" />
          {children}
        </div>
      </div>
    </div>
  );
};
