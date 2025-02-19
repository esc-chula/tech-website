'use client'

import { useEffect, useState } from 'react'

const PrizeSection: React.FC = () => {
  function getNumberByDate({
    startDate,
    endDate,
    max,
  }: {
    startDate: Date
    endDate: Date
    max: number
  }): number {
    const currentDate = new Date()
    if (currentDate < startDate) {
      return 0
    }
    if (currentDate > endDate) {
      return max
    }
    const percentage =
      (currentDate.getTime() - startDate.getTime()) /
      (endDate.getTime() - startDate.getTime())

    return Math.floor(max * Math.pow(percentage, 4))
  }

  const [runningPrize, setRunningPrize] = useState<number | null>(null)

  useEffect(() => {
    const config = {
      startDate: new Date('2025-02-19'),
      endDate: new Date('2025-03-17'),
      max: 1111111,
    }

    const initialPrize = getNumberByDate(config)

    setRunningPrize(initialPrize)

    const interval = setInterval(() => {
      setRunningPrize(getNumberByDate(config))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* <p className="text-5xl sm:text-6xl md:text-8xl font-ndot47">
        1,<span className="text-hackathon-primary">111</span>,111
      </p> */}
      {/* <p className='select-none font-ndot47 text-5xl sm:text-6xl md:text-8xl'>
        ?<span className='text-hackathon-primary'>?</span>???
      </p> */}
      <p className='select-none pl-[0.7%] font-ndot47 text-5xl sm:text-6xl md:text-8xl'>
        {runningPrize === null ? (
          <>
            ?<span className='text-hackathon-primary'>?</span>???
          </>
        ) : (
          runningPrize.toLocaleString()
        )}
      </p>
      <p className='text-lg font-semibold sm:text-xl md:text-2xl'>Prize Pool</p>
      <p className='-mt-3 text-xs text-white/50 sm:-mt-4 md:-mt-6'>(baht)</p>
      <div className='absolute -z-10 aspect-square w-[400px] rounded-full bg-hackathon-radial-gradient sm:w-[600px] md:w-[800px]' />
    </>
  )
}

export default PrizeSection
