'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import ScrollRevealer from '~/components/common/animation/scroll-revealer'
import { cn } from '~/lib/utils'

import Section from './section'

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
        <p className='text-lg font-semibold md:text-xl'>
          “Made in{' '}
          <span className='font-bold text-hackathon-primary'>Intania</span>”
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
        <p className='text-lg font-semibold md:text-xl'>
          Discovery → Ideation →{' '}
          <span className='font-bold text-white underline'>POC Creation</span> →{' '}
          <span className='font-bold text-hackathon-primary'>Execution</span>
        </p>
        <p>
          Unlike typical competitions, Intania Hackathon is a{' '}
          <span className='font-bold'>REAL</span> hackathon. Our goal is not
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
          <span className='font-semibold text-white'>
            thrilling,{' '}
            <span className='font-bold text-hackathon-primary'>fun</span>, and
            memorable
          </span>{' '}
          tech event ever. This isn’t just about winning—it’s about the
          experience, and the community
          {/* TICKET_HERE PATHFINDING DOT REMOVED TOO*/}{' '}
          <Link
            className='font-bold text-hackathon-primary underline'
            href='/hackathon/doonee'
          >
            here
          </Link>
          .
        </p>
      </>
    ),
  },
]

const ObjectivesSection: React.FC = () => {
  return (
    <Section
      title={
        <>
          WT<span className='text-hackathon-primary'>H</span>
        </>
      }
    >
      <div className='flex flex-col gap-6 px-0 pt-6 sm:pt-0 md:gap-8 md:px-5 md:pt-5'>
        <span className='select-none font-ndot47 text-2xl text-white/50 md:text-4xl'>
          what the HACK?!
        </span>
        {objectives.map((objective, index) => (
          <ScrollRevealer key={objective.title}>
            <ObjectiveCard index={index} title={objective.title}>
              <div className='flex flex-col gap-5 text-sm text-white/90 md:text-base'>
                {objective.children}
              </div>
            </ObjectiveCard>
          </ScrollRevealer>
        ))}
      </div>
    </Section>
  )
}

export default ObjectivesSection

interface ObjectiveCardProps {
  children: React.ReactNode
  index: number
  title: string
}

const ObjectiveCard: React.FC<ObjectiveCardProps> = ({
  children,
  index,
  title,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(index !== 1)

  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(0)

  useEffect(() => {
    setContentHeight(contentRef.current?.clientHeight ?? 0)
  }, [contentRef])

  return (
    <div className='flex flex-col'>
      <button
        className='group flex w-full items-end justify-between'
        type='button'
        onClick={() => setIsCollapsed((prev) => !prev)}
      >
        <h3 className='select-none font-ndot47 text-4xl uppercase duration-75 group-hover:text-hackathon-primary md:text-6xl'>
          {title}
        </h3>
        <span
          className={cn(
            'select-none font-ndot47 text-2xl text-white/60 group-hover:text-white md:text-5xl',
            isCollapsed ? '' : '-mt-[1.4%] mb-[1.4%]'
          )}
        >
          {isCollapsed ? '+' : '_'}
        </span>
      </button>
      <div
        className={cn(
          'transform-gpu overflow-hidden transition-all',
          isCollapsed ? 'h-0' : 'h-40'
        )}
        style={{
          height: isCollapsed ? 0 : `${contentHeight + 40}px`,
        }}
      >
        <div
          ref={contentRef}
          className='flex flex-col gap-4 pt-4 md:gap-6 md:px-2'
        >
          <hr className='border-b border-white/25 md:border-b-2' />
          {children}
        </div>
      </div>
    </div>
  )
}
