import Image from 'next/image'

const BirdsBackground: React.FC = () => {
  return (
    <div className='pointer-events-none fixed inset-0 -z-30 select-none'>
      <Image
        fill
        priority
        alt='background'
        className='object-cover'
        src='/hackathon/assets/birds-background.png'
      />
    </div>
  )
}

export default BirdsBackground
