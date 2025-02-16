import Image from 'next/image'

import HackathonTitle from './hackathon-title'

const Building1Background: React.FC = () => {
  return (
    <>
      <HackathonTitle className='pointer-events-none fixed bottom-3 left-1/2 -z-10 -translate-x-1/2 text-center text-xl leading-tight md:bottom-5 md:text-2xl' />
      <div className='pointer-events-none fixed inset-0 -z-20 select-none bg-gradient-to-b from-black/50 to-black' />
      <div className='pointer-events-none fixed inset-0 -z-30 select-none'>
        <Image
          fill
          priority
          alt='background'
          className='object-cover'
          src='/hackathon/assets/building-1-background.webp'
        />
      </div>
    </>
  )
}

export default Building1Background
