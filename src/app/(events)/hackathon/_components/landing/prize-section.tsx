/* eslint-disable react/no-array-index-key -- Array index is used as key for static array */
'use client'

import { usePrize } from '../../_hooks/prize'

const PrizeSection: React.FC = () => {
  const { prize, prizeString } = usePrize()

  return (
    <>
      {/* <p className="text-5xl sm:text-6xl md:text-8xl font-ndot47">
        1,<span className="text-hackathon-primary">111</span>,111
      </p> */}
      {/* <p className='select-none font-ndot47 text-5xl sm:text-6xl md:text-8xl'>
        ?<span className='text-hackathon-primary'>?</span>???
      </p> */}
      <p className='select-none pl-[0.7%] font-ndot47 text-5xl sm:text-6xl md:text-8xl'>
        {prize === null ? (
          <>
            ?<span className='text-hackathon-primary'>?</span>???
          </>
        ) : (
          <>
            {prizeString.split('').map((char, i) => (
              <span
                key={i}
                className={
                  i === prizeString.split('').length - 1
                    ? 'text-hackathon-primary'
                    : ''
                }
              >
                {char}
              </span>
            ))}
          </>
        )}
      </p>
      <p className='text-lg font-semibold sm:text-xl md:text-2xl'>Prize Pool</p>
      <p className='-mt-3 text-xs text-white/50 sm:-mt-4 md:-mt-6'>(baht)</p>
      <div className='absolute -z-10 aspect-square w-[400px] rounded-full bg-hackathon-radial-gradient sm:w-[600px] md:w-[800px]' />
    </>
  )
}

export default PrizeSection
