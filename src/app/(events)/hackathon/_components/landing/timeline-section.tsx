import ScrollRevealer from '~/components/common/animation/scroll-revealer';
import { cn } from '~/lib/utils';

import Section from './section';

const details = [
  {
    title: 'Non-stop innovation',
    description: '48 hours of hacking, building, and creating.',
    icon: '⏳',
  },
  {
    title: 'A fun & supportive environment',
    description: 'Collaborate, learn, and make memories.',
    icon: '😋',
  },
  {
    title: 'Fuel for the grind',
    description: 'Provided food, snacks, and drinks to keep you going.',
    icon: '🍕',
  },
  {
    title: 'Because you deserve it!',
    description: 'Swag & goodies for all hackers',
    icon: '🎁',
  },
  {
    title: 'Astonishing Prize',
    description: 'Awards and Opportunities for all hackers',
    icon: '🏆',
  },
  {
    title: 'Hack Eat Sleep',
    description: 'Engineering Library, Chulalongkorn University',
    icon: '🏛️',
  },
];

const contents = [
  {
    title: 'Ticket Release',
    children: (
      <div className="flex flex-col gap-4 text-xs sm:text-sm md:text-base text-white/90">
        <p>
          This is no ordinary registration—this is a ticket hunt! To secure your
          spot in the most intense 48-hour hackathon, you’ll need to{' '}
          <span className="font-bold underline">
            follow the clues, crack the codes, and claim your ticket.
          </span>
        </p>
        <p>
          👀 Follow our social media & LINE OpenChat for hidden hints and Easter
          eggs.
        </p>
        <p>💡 Solve the challenges to unlock your team’s ticket.</p>
        <p>
          🤝 Team up, strategize, and get ready for the real hackathon
          experience!
        </p>
      </div>
    ),
    date: '17 February 2025—Super Early Bird',
  },
  {
    title: 'HACK Day',
    children: (
      <div className="flex flex-col gap-4 md:gap-8 text-xs sm:text-sm md:text-base text-white/90">
        <p>
          The ultimate challenge begins! Over{' '}
          <span className="font-bold underline">48 hours</span> straight, 40
          teams will push their limits to build groundbreaking and innovative
          solutions. This is not just another hackathon—this is a{' '}
          <span className="font-bold underline">real hacking marathon</span>{' '}
          where creativity meets execution. Whether you’re coding, designing, or
          strategizing, every second counts.
        </p>
        <div className="grid md:grid-cols-2 gap-2 md:gap-4 font-semibold">
          {details.map((detail) => (
            <div
              key={detail.title}
              className="flex items-center gap-1 md:gap-2 p-3 md:p-4 rounded-2xl border-2 border-white/10"
            >
              <span className="text-lg md:text-xl select-none">
                {detail.icon}
              </span>
              <div className="">
                <p className="text-xs font-medium text-white/50">
                  {detail.title}
                </p>
                <p>{detail.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    date: '28 - 30 March 2025',
    active: true,
  },
];

const TimelineSection: React.FC = () => {
  return (
    <Section
      offsetThreshold={2000}
      title={
        <>
          TIME<span className="text-hackathon-primary">L</span>INE
        </>
      }
    >
      <div className="relative flex flex-col gap-6">
        {contents.map((content) => (
          <ScrollRevealer key={content.title}>
            <TimelineCard {...content} />
          </ScrollRevealer>
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
  children: React.ReactNode;
}

const TimelineCard: React.FC<TimelineCardProps> = ({
  active,
  date,
  title,
  children,
}) => {
  return (
    <div
      className={cn(
        'relative flex items-center py-5 md:py-10 px-4 md:px-8 group gap-5 md:gap-8 border-2 border-white/0 duration-500 rounded-3xl',
        active
          ? 'border-white/15 bg-black/5'
          : 'hover:border-white/5 hover:bg-black/5',
      )}
    >
      <div
        className={cn(
          'hidden md:block min-w-2 aspect-square rounded-full duration-500',
          active
            ? 'bg-hackathon-primary'
            : 'bg-neutral-600 group-hover:bg-white',
        )}
      />
      <div
        className={cn(
          '-z-10 rounded-full absolute w-screen md:w-[600px] duration-1000 -left-32 top-0 md:top-auto aspect-[5/4] bg-hackathon-radial-gradient',
          active ? 'opacity-100' : 'opacity-0 group-hover:opacity-20',
        )}
      />
      <div className="flex flex-col gap-3 w-full">
        <h3 className="font-ndot47 text-3xl md:text-5xl select-none">
          {title}
        </h3>
        <p className="text-white/60">{date}</p>
        {children}
      </div>
    </div>
  );
};
