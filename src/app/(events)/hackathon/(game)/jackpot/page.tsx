import React from 'react'

import { spinHackathonTicketSlot } from '~/server/actions/hackathon'
import { type HackathonSpinResult } from '~/types/hackathon'

import BirdsBackground from '../../_components/common/birds-background'
import SlotMachine from '../../_components/jackpot/slot-machine'

const HackathonJackpotPage: React.FC = () => {
  const handleSpin = async (): Promise<{
    success: boolean
    message?: string
    data?: HackathonSpinResult
    errors?: string[]
  }> => {
    'use server'
    const result = await spinHackathonTicketSlot()
    return result
  }

  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <SlotMachine handleSpin={handleSpin} />
      <BirdsBackground />
    </div>
  )
}

export default HackathonJackpotPage
