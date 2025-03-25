import { ChevronDown, Mouse } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import HackathonTitle from '../common/hackathon-title'
import HackathonTitleHover from '../common/hackathon-title-hover'
import Button from '../ui/button'

const IS_REGISTRATION_OPEN = true as true | false

const HeroSection: React.FC = () => {
  return (
    <>
      <div className='flex flex-col items-center gap-2 sm:gap-1 md:gap-0'>
        <HackathonTitleHover
          className='hidden pt-5 md:flex'
          dotSize={10.5}
          lines={['INTANIA', 'HACKATHON']}
          colorMap={{
            HACKATHON: {
              text: 'O',
              color: 'bg-hackathon-primary',
            },
          }}
        />
        <HackathonTitle className='pt-7 text-5xl sm:pt-5 sm:text-6xl md:hidden' />
        <div className='flex items-center gap-2 sm:gap-3'>
          <span className='text-xs sm:text-sm'>Sponsored by</span>
          <div className='relative aspect-square h-7 sm:h-8 md:h-10'>
            <Image
              fill
              alt='garena'
              src='/hackathon/assets/garena-vertical-logo.svg'
            />
          </div>
        </div>
      </div>
      {IS_REGISTRATION_OPEN ? (
        <>
          <Link className='rounded-full' href='/hackathon/ticket'>
            <Button className='duration-300 ease-in-out hover:scale-110'>
              <span>Register</span>
              <span>{'->'}</span>
            </Button>
          </Link>
          <div className='absolute flex w-full flex-col items-center justify-center'>
            <p className='absolute top-[128px] text-xs opacity-50 sm:top-[138px] md:top-[180px] md:text-sm'>
              28 - 30 March 2025
            </p>
          </div>
        </>
      ) : (
        <>
          <Button className='cursor-default select-text'>
            <span className='cursor-text'>28 - 30 March 2025</span>
          </Button>
          <div className='absolute flex w-full flex-col items-center justify-center'>
            <p className='absolute top-[108px] text-xs opacity-50 sm:top-[118px] md:top-40 md:text-sm'>
              Ticket release on 17 Feb
              <span className='hidden md:inline'>ruary</span> 2025
            </p>
          </div>
        </>
      )}

      <div className='absolute -z-10 aspect-square w-[600px] rounded-full bg-hackathon-radial-gradient sm:w-[800px] md:w-[1000px]' />
      <div className='absolute bottom-8 flex scale-90 flex-col opacity-70'>
        <Mouse />
        <ChevronDown className='animate-pulse' />
      </div>
    </>
  )
}

export default HeroSection
