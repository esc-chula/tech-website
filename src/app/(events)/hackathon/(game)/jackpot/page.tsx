import React from 'react'

import BackButton from '../../_components/common/back-button'
import BirdsBackground from '../../_components/common/birds-background'
import SlotMachine from '../../_components/jackpot/slot-machine'

const HackathonJackpotPage: React.FC = () => {
  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <BackButton />
      <SlotMachine />
      <BirdsBackground />
    </div>
  )
}

export default HackathonJackpotPage
