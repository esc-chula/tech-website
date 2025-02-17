import ScrollRevealer from '~/components/common/animation/scroll-revealer'
import { cn } from '~/lib/utils'

import Section from './section'

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
]

const contents = [
  {
    title: 'Ticket Release',
    children: (
      <div className='flex flex-col gap-4 text-xs text-white/90 sm:text-sm md:text-base'>
        <p>
          This is no ordinary registration—this is a ticket hunt! To secure your
          spot in the most intense 48-hour hackathon, you’ll need to{' '}
          <span className='font-bold underline'>
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
      <div className='flex flex-col gap-4 text-xs text-white/90 sm:text-sm md:gap-8 md:text-base'>
        <p>
          The ultimate challenge begins! Over{' '}
          <span className='font-bold underline'>48 hours</span> straight, 40
          teams will push their limits to build groundbreaking and innovative
          solutions. This is not just another hackathon—this is a{' '}
          <span className='font-bold underline'>real hacking marathon</span>{' '}
          where creativity meets execution. Whether you’re coding, designing, or
          strategizing, every second counts.
        </p>
        <div className='grid gap-2 font-semibold md:grid-cols-2 md:gap-4'>
          {details.map((detail) => (
            <div
              key={detail.title}
              className='flex items-center gap-1 rounded-2xl border-2 border-white/10 p-3 md:gap-2 md:p-4'
            >
              <span className='select-none text-lg md:text-xl'>
                {detail.icon}
              </span>
              <div className=''>
                <p className='text-xs font-medium text-white/50'>
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
]

const TimelineSection: React.FC = () => {
  return (
    <Section
      offsetThreshold={2000}
      title={
        <>
          TIME<span className='text-hackathon-primary'>L</span>INE
        </>
      }
    >
      <div className='relative flex flex-col gap-6'>
        {contents.map((content) => (
          <ScrollRevealer key={content.title}>
            <TimelineCard {...content} />
          </ScrollRevealer>
        ))}
      </div>
    </Section>
  )
}

export default TimelineSection

interface TimelineCardProps {
  active?: boolean
  date: string
  title: string
  children: React.ReactNode
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
        'group relative flex items-center gap-5 rounded-3xl border-2 border-white/0 px-4 py-5 duration-500 md:gap-8 md:px-8 md:py-10',
        active
          ? 'border-white/15 bg-black/5'
          : 'hover:border-white/5 hover:bg-black/5'
      )}
    >
      <div
        className={cn(
          'hidden aspect-square min-w-2 rounded-full duration-500 md:block',
          active
            ? 'bg-hackathon-primary'
            : 'bg-neutral-600 group-hover:bg-white'
        )}
      />
      <div
        className={cn(
          'absolute -left-32 top-0 -z-10 aspect-[5/4] w-screen rounded-full bg-hackathon-radial-gradient duration-1000 md:top-auto md:w-[600px]',
          active ? 'opacity-100' : 'opacity-0 group-hover:opacity-20'
        )}
      />
      <div className='flex w-full flex-col gap-3'>
        <h3 className='select-none font-ndot47 text-3xl md:text-5xl'>
          {title}
        </h3>
        <p className='text-white/60'>{date}</p>
        {children}
      </div>
    </div>
  )
}
