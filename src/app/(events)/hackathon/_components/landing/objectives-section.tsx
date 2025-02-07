'use client';

import { useEffect, useRef, useState } from 'react';

import { cn } from '~/lib/utils';

import Section from './section';

const objectives = ['Intania', 'Innovate', 'Impressive'];

const ObjectivesSection: React.FC = () => {
  return (
    <Section title="WTH">
      <div className="flex flex-col pt-6 sm:pt-0 md:pt-5 px-0 md:px-5">
        <span className="font-ndot47 text-2xl md:text-4xl text-white/50 select-none">
          what the HACK?!
        </span>
        {objectives.map((objective, index) => (
          <ObjectiveCard key={objective} index={index} title={objective}>
            <div className="flex flex-col gap-5">
              <p className="text-sm md:text-base">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Eveniet excepturi modi nemo eligendi autem, natus dignissimos,
                quae hic error aliquid cupiditate distinctio quasi quia
                pariatur. Voluptatibus id iste molestias debitis!
              </p>
              <p className="text-sm md:text-base">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Eveniet excepturi modi nemo eligendi autem, natus dignissimos,
                quae hic error aliquid cupiditate distinctio quasi quia
                pariatur. Voluptatibus id iste molestias debitis!
              </p>
              <p className="text-sm md:text-base">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Eveniet excepturi modi nemo eligendi autem, natus dignissimos,
                quae hic error aliquid cupiditate distinctio quasi quia
                pariatur. Voluptatibus id iste molestias debitis!
              </p>
            </div>
          </ObjectiveCard>
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
  const [isCollapsed, setIsCollapsed] = useState(index !== 1);

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
        <h2 className="font-ndot47 text-4xl md:text-6xl lowercase select-none duration-75 group-hover:text-hackathon-primary">
          {title}
        </h2>
        <p
          className={cn(
            'font-ndot47 text-2xl md:text-5xl text-white/60 group-hover:text-white',
            isCollapsed ? '' : '-mt-2 mb-2',
          )}
        >
          {isCollapsed ? '+' : '_'}
        </p>
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
