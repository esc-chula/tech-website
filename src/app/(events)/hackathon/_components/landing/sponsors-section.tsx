'use client'

import Image from 'next/image'

import { useGridTunnelContext } from '../../_contexts/grid-tunnel-context'

const organizers = [
  {
    name: 'esc-chula',
    logo: '/hackathon/assets/organizer-logo-1.png',
  },
  // {
  //   name: '111th',
  //   logo: '/hackathon/assets/organizer-logo-2.png',
  // },
  {
    name: 'intania-expo',
    logo: '/hackathon/assets/organizer-logo-3.png',
  },
]

const SponsorsSection: React.FC = () => {
  const { offset } = useGridTunnelContext()

  return (
    <>
      <div className='flex flex-col items-center gap-8'>
        <div className='flex flex-col items-center gap-4'>
          <p className='text-sm font-semibold sm:text-base md:text-lg'>
            Sponsored By
          </p>
          <div className='flex gap-4'>
            <div className='relative aspect-square w-24 select-none'>
              <Image
                fill
                alt='garena'
                className='object-contain'
                sizes='100px'
                src='/hackathon/assets/sponsor-logo-1.png'
              />
            </div>
          </div>
        </div>

        <div className='flex flex-col items-center gap-3'>
          <p className='text-sm font-semibold sm:text-base md:text-lg'>
            Organized By
          </p>
          <div className='flex gap-4'>
            {organizers.map((organizer) => (
              <div
                key={organizer.name}
                className='relative aspect-square w-20 select-none'
              >
                <Image
                  fill
                  alt={organizer.name}
                  className='object-contain'
                  sizes='100px'
                  src={organizer.logo}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className='absolute -z-10 aspect-square w-[200px] rounded-full bg-hackathon-radial-gradient sm:w-[400px] md:w-[600px]'
        style={{
          // opacity from 100 to 0, start from offset 1400 to 1900
          opacity: Math.max(0, 1 - (offset - 1400) / 500),
        }}
      />
    </>
  )
}

export default SponsorsSection
