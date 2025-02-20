import { type Metadata } from 'next'
import React from 'react'

// import BackButton from '../../_components/common/back-button'
import BirdsBackground from '../../_components/common/birds-background'
import SlotMachine from '../../_components/jackpot/slot-machine'

export const metadata: Metadata = {
  title: 'Intania Hackathon - Jackpot',
}

const HackathonJackpotPage: React.FC = () => {
  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <p className='hidden'>{`FYI: There's 1.5% chance to win the full ticket, and 15% chance to win per character.`}</p>
      {/* <BackButton /> */}
      <SlotMachine />
      <BirdsBackground />
    </div>
  )
}

export default HackathonJackpotPage
