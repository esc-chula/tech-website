import { getHackathonTicketNonClaimStats } from '~/server/actions/hackathon'
import { type HackathonTicketNonClaimStats } from '~/types/hackathon'

interface TicketStatsProps {
  mock?: boolean
}

const TicketStats: React.FC<TicketStatsProps> = async ({ mock = false }) => {
  let data = null as null | HackathonTicketNonClaimStats

  const res = await getHackathonTicketNonClaimStats()
  if (!res.success) {
    data = null
  } else if (mock) {
    data = null
  } else {
    data = res.data
  }

  return (
    <div className='flex select-none gap-2 font-ndot47'>
      <div className='flex flex-col items-center rounded-md border border-white/20 bg-white/5 p-1 md:p-2'>
        <span className='bg-gradient-to-b from-indigo-900/50 to-black/50 px-1 text-sm md:text-base'>
          DEV
        </span>
        <span className='text-xl md:text-2xl'>{data?.dev ?? '??'}</span>
      </div>
      <div className='flex flex-col items-center rounded-md border border-white/20 bg-white/5 p-1 md:p-2'>
        <span className='bg-gradient-to-b from-violet-500 to-emerald-500 px-1 text-sm md:text-base'>
          DES
        </span>
        <span className='text-xl md:text-2xl'>{data?.des ?? '??'}</span>
      </div>
      <div className='flex flex-col items-center rounded-md border border-white/20 bg-white/5 p-1 md:p-2'>
        <span className='bg-gradient-to-b from-yellow-700/50 to-black/50 px-1 text-sm md:text-base'>
          PRO
        </span>
        <span className='text-xl md:text-2xl'>{data?.pro ?? '??'}</span>
      </div>
      <div className='flex flex-col items-center rounded-md border border-white/20 bg-white/5 p-1 md:p-2'>
        <span className='bg-hackathon-primary px-1 text-sm md:text-base'>
          GEN
        </span>
        <span className='text-xl md:text-2xl'>{data?.gen ?? '??'}</span>
      </div>
    </div>
  )
}

export default TicketStats
