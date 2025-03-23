import Image from 'next/image'

import Section from './section'

const SwagSection: React.FC = () => {
  return (
    <Section
      title={
        <>
          <span className='text-hackathon-primary'>S</span>WAG
        </>
      }
    >
      <div className='relative aspect-video w-full'>
        <Image
          fill
          alt='swag'
          className='object-contain'
          src='/hackathon/assets/swag-1.png'
        />
        {/* <Image
          fill
          alt='swag'
          className='object-contain'
          src='/hackathon/assets/swag-2.png'
        /> */}
      </div>
      <div className='flex flex-col items-center gap-8 pt-10 sm:gap-10 md:gap-14'>
        <div className='relative text-center'>
          <p className='select-none font-ndot47 text-5xl sm:text-6xl md:text-8xl'>
            25<span className='text-hackathon-primary'>0</span>,000
          </p>
          <div className='tiems-center -gap-1 mt-4 flex flex-col'>
            <p className='text-lg font-semibold sm:text-xl md:text-2xl'>
              Prize Pool
            </p>
            <p className='text-xs text-white/50'>(baht)</p>
            <p className='text-xs text-white/50'>
              <br />
              10 Out of 40 Teams Will Take Home a Prize!
            </p>
          </div>
          <div className='absolute -left-10 top-1/2 -z-10 -mt-5 aspect-[5/4] w-[200px] -translate-y-1/2 rounded-full bg-hackathon-radial-gradient opacity-60 sm:-left-7 sm:-mt-5 md:left-3 md:-mt-6 md:w-[250px]' />
        </div>
      </div>
    </Section>
  )
}

export default SwagSection
