import Image from 'next/image'

import type { Event } from '~/types/techmonth'

interface StampProps {
  stamp: {
    event: Event | undefined
    id: number
    studentId: string
    eventId: string
  }
}

const Stamp: React.FC<StampProps> = ({ stamp }) => {
  return (
    <div className='h-full w-full -rotate-[20deg] rounded-full bg-[#474747] pt-3 text-center'>
      <div className='relative h-3/4 w-full'>
        <Image
          fill
          alt={stamp.eventId}
          className='object-contain'
          src={
            stamp.event?.club
              ? `/techmonth/assets/clubs/${stamp.event.club}.png`
              : '/techmonth/assets/tech_logo.svg'
          }
        />
      </div>
      <div className='h-20'>{`<${stamp.eventId}>`}</div>
    </div>
  )
}

export default Stamp
