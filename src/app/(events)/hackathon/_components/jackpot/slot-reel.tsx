import { motion } from 'framer-motion'
import React from 'react'

interface ReelProps {
  reelSymbols: string[]
  spinning: boolean
}

const Reel: React.FC<ReelProps> = ({ reelSymbols, spinning }): JSX.Element => {
  return (
    <div className='pixel-border-inset relative h-10 w-10 overflow-hidden rounded bg-black md:h-16 md:w-16'>
      <motion.div
        className='flex flex-col items-center justify-center'
        animate={{
          y: spinning ? [-500, 0] : 0,
        }}
        transition={{
          duration: 1,
          repeat: spinning ? Infinity : 0,
          ease: 'linear',
        }}
      >
        {reelSymbols.map((symbol) => (
          <div
            key={symbol}
            className='flex h-10 w-10 items-center justify-center bg-gradient-to-b from-yellow-400/10 to-transparent font-press-start-2p text-base text-yellow-400 md:h-16 md:w-16 md:text-2xl'
          >
            {symbol}
          </div>
        ))}
      </motion.div>

      <div className='bg-scanline pointer-events-none absolute inset-0 opacity-30' />
      <div className='pointer-events-none absolute inset-0 animate-pulse bg-yellow-400/5' />
    </div>
  )
}

export default Reel
