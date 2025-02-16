'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { cn } from '~/lib/utils'

interface StoryProps {
  className?: string
  background: 1 | 2 | 3
  layoutType: 1 | 2 | 3
  emoji: string
  teamNo: number
  phrase: string
}

const Story: React.FC<StoryProps> = ({
  className,
  background,
  layoutType,
  emoji,
  teamNo,
  phrase,
}) => {
  const ref = useRef<HTMLDivElement>(null)

  const [fontFactor, setFontFactor] = useState(0)

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const handleResize = (): void => {
      setFontFactor((ref.current?.offsetWidth ?? 0) / 30)
    }

    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div
      ref={ref}
      className={cn('relative aspect-[9/16] select-none', className)}
    >
      <div className='absolute inset-0 z-20 mb-[30%]'>
        {layoutType === 1 ? (
          <div className='flex h-full w-full flex-col items-center justify-center text-center font-ndot47'>
            <p
              className='text-white/50'
              style={{
                fontSize: `${fontFactor * 2}px`,
              }}
            >
              TEAM NO.
            </p>
            <p
              className='text-white'
              style={{
                fontSize: `${fontFactor * 12}px`,
              }}
            >
              {teamNo}
            </p>
            <p
              className='text-hackathon-primary'
              style={{
                fontSize: `${fontFactor * 2}px`,
              }}
            >
              {phrase}
            </p>
          </div>
        ) : null}
        {layoutType === 2 ? (
          <div className='flex h-full w-full flex-col items-center justify-center gap-[3%] text-center font-ndot47'>
            <p
              className='text-white/50'
              style={{
                fontSize: `${fontFactor * 2}px`,
              }}
            >
              JOIN ME AT
            </p>
            <p
              className='leading-tight text-white'
              style={{
                fontSize: `${fontFactor * 4}px`,
              }}
            >
              INTANIA
              <br />
              HACKATH<span className='text-hackathon-primary'>O</span>N
            </p>
            <p
              className='text-white/60'
              style={{
                fontSize: `${fontFactor * 2}px`,
              }}
            >
              TEAM NO. <span className='text-hackathon-primary'>{teamNo}</span>
            </p>
          </div>
        ) : null}
        {layoutType === 3 ? (
          <div className='flex h-full w-full flex-col items-center justify-center gap-[1.5%] text-center font-ndot47'>
            <p
              className='text-white/60'
              style={{
                fontSize: `${fontFactor * 1.25}px`,
              }}
            >
              TEAM NO. <span className='text-hackathon-primary'>{teamNo}</span>
            </p>
            <p
              className='text-white'
              style={{
                fontSize: `${fontFactor * 1.75}px`,
              }}
            >
              HUNTING FOR
            </p>
            <div
              className='grid aspect-square place-content-center rounded-full bg-white p-[6%]'
              style={{
                fontSize: `${fontFactor * 8.5}px`,
              }}
            >
              {emoji}
            </div>

            <p
              className='pt-[1%] text-white/60'
              style={{
                fontSize: `${fontFactor * 2}px`,
              }}
            >
              AT{' '}
              <span className='text-white'>
                INTANIA HACKATH<span className='text-hackathon-primary'>O</span>
                N
              </span>
            </p>
          </div>
        ) : null}
      </div>
      <div className='absolute inset-0 z-10'>
        <Image fill alt='overlay' src='/hackathon/assets/story-overlay.png' />
      </div>
      <div className='absolute inset-0 z-0'>
        <Image
          fill
          priority
          alt='overlay'
          src={`/hackathon/assets/story-background-${background}.png`}
        />
      </div>
    </div>
  )
}

export default Story
