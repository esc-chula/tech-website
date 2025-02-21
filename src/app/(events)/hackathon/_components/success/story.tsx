'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { cn } from '~/lib/utils'

interface StoryProps {
  className?: string
  background: 1 | 2 | 3
  layoutType: 1 | 2 | 3
  emoji: string
  teamName: string
  teamNo: number
  phrase: string
}

const Story: React.FC<StoryProps> = ({
  className,
  background,
  layoutType,
  emoji,
  teamName,
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
                fontSize: `${fontFactor}px`,
              }}
            >
              Team {teamName}
            </p>
            <p
              className='text-white/50'
              style={{
                fontSize: `${fontFactor * 2}px`,
              }}
            >
              TEAM NO.
            </p>
            <p
              className='pl-[4%] text-white'
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
            <div className='flex flex-col items-center gap-[1%]'>
              <p
                className='text-white/50'
                style={{
                  fontSize: `${fontFactor}px`,
                }}
              >
                Team {teamName}
              </p>
              <p
                className='text-white/60'
                style={{
                  fontSize: `${fontFactor * 2}px`,
                }}
              >
                TEAM NO.{' '}
                <span className='text-hackathon-primary'>{teamNo}</span>
              </p>
            </div>
          </div>
        ) : null}
        {layoutType === 3 ? (
          <div className='flex h-full w-full flex-col items-center justify-center gap-[1.5%] text-center font-ndot47'>
            <div className='flex flex-col items-center gap-[1%]'>
              <p
                className='text-white/50'
                style={{
                  fontSize: `${fontFactor}px`,
                }}
              >
                Team {teamName}
              </p>
              <p
                className='text-white/60'
                style={{
                  fontSize: `${fontFactor * 1.25}px`,
                }}
              >
                TEAM NO.{' '}
                <span className='text-hackathon-primary'>{teamNo}</span>
              </p>
            </div>
            <p
              className='text-white'
              style={{
                fontSize: `${fontFactor * 1.75}px`,
              }}
            >
              HUNTING FOR
            </p>
            <div
              className='grid aspect-square place-content-center rounded-full'
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
        <Image
          fill
          alt='overlay'
          quality={100}
          src='/hackathon/assets/story-overlay.png'
        />
      </div>
      <div
        className='absolute inset-0'
        style={{
          display: background === 1 ? 'block' : 'none',
        }}
      >
        <Image
          fill
          priority
          alt='overlay'
          quality={100}
          src='/hackathon/assets/story-background-1.png'
        />
      </div>
      <div
        className='absolute inset-0'
        style={{
          display: background === 2 ? 'block' : 'none',
        }}
      >
        <Image
          fill
          priority
          alt='overlay'
          quality={100}
          src='/hackathon/assets/story-background-2.png'
        />
      </div>
      <div
        className='absolute inset-0'
        style={{
          display: background === 3 ? 'block' : 'none',
        }}
      >
        <Image
          fill
          priority
          alt='overlay'
          quality={100}
          src='/hackathon/assets/story-background-3.png'
        />
      </div>
    </div>
  )
}

export default Story
