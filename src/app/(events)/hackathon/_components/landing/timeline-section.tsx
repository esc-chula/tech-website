import React from 'react';

import { cn } from '~/lib/utils';

import Section from './section';

const timelines = [
  {
    title: 'Ticket Release',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium sunt architecto eos voluptas optio ea sit aperiam iure tempora natus quibusdam molestiae necessitatibus, doloribus sapiente illum quod odio at fugit.',
    date: '14 February 2025',
  },
  {
    title: 'Teams Announcement',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium sunt architecto eos voluptas optio ea sit aperiam iure tempora natus quibusdam molestiae necessitatibus, doloribus sapiente illum quod odio at fugit.',
    date: '14 February 2025',
  },
  {
    title: 'HACK Day',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium sunt architecto eos voluptas optio ea sit aperiam iure tempora natus quibusdam molestiae necessitatibus, doloribus sapiente illum quod odio at fugit.',
    date: '28 - 30 March 2025',
    active: true,
  },
];

const TimelineSection: React.FC = () => {
  return (
    <Section offsetThreshold={2000} title="TIMELINE">
      <div className="relative flex flex-col gap-6">
        {timelines.map((timeline) => (
          <TimelineCard key={timeline.title} {...timeline} />
        ))}
      </div>
    </Section>
  );
};

export default TimelineSection;

interface TimelineCardProps {
  active?: boolean;
  date: string;
  title: string;
  description: string;
}

const TimelineCard: React.FC<TimelineCardProps> = ({
  active,
  date,
  title,
  description,
}) => {
  return (
    <div
      className={cn(
        'relative flex items-center py-6 md:py-10 px-5 md:px-8 group gap-5 md:gap-8 border-2 border-white/0 duration-500 rounded-3xl',
        active
          ? 'border-white/15 bg-black/5'
          : 'hover:border-white/5 hover:bg-black/5',
      )}
    >
      <div
        className={cn(
          'hidden md:block w-5 aspect-square rounded-full duration-500',
          active
            ? 'bg-hackathon-primary'
            : 'bg-neutral-600 group-hover:bg-white',
        )}
      />
      <div
        className={cn(
          '-z-10 rounded-full absolute w-screen md:w-[600px] duration-1000 -left-32 aspect-[5/4] bg-hackathon-radial-gradient',
          active ? 'opacity-100' : 'opacity-0 group-hover:opacity-20',
        )}
      />
      <div className="flex flex-col gap-3">
        <h4 className="font-ndot47 text-3xl md:text-5xl select-none">
          {title}
        </h4>
        <p className="text-white/60">{date}</p>
        <p className="text-xs sm:text-sm md:text-base text-white/90">
          {description}
        </p>
      </div>
    </div>
  );
};
