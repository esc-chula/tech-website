'use client'
import { useEffect, useState } from 'react'

import { HACKATHON_GAME_JACKPOT_SYMBOLS } from '~/constants/hackathon'
import { toast } from '~/hooks/use-toast'
import { spinHackathonTicketSlot } from '~/server/actions/hackathon'

import Lever from './slot-lever'
import Reel from './slot-reel'

const SlotMachine = (): JSX.Element => {
  const reelLength = 100

  const [reels, setReels] = useState<string[][]>([[], [], []])
  const [spinning, setSpinning] = useState<boolean[]>([false, false, false])

  const generateReelSymbols = (): string[] => {
    return Array(reelLength)
      .fill(null)
      .map(
        () =>
          HACKATHON_GAME_JACKPOT_SYMBOLS[
            Math.floor(Math.random() * HACKATHON_GAME_JACKPOT_SYMBOLS.length)
          ] ?? HACKATHON_GAME_JACKPOT_SYMBOLS[0]
      ) as string[]
  }

  useEffect(() => {
    setReels([
      generateReelSymbols(),
      generateReelSymbols(),
      generateReelSymbols(),
    ])
  }, [])

  const spin = async (): Promise<void> => {
    if (spinning.some((spin) => spin)) return

    setReels([
      generateReelSymbols(),
      generateReelSymbols(),
      generateReelSymbols(),
    ])
    setSpinning([true, true, true])

    const result = await spinHackathonTicketSlot()
    if (result.success) {
      stopReelsOnResult(result.data.symbols, result.data.ticketFragment)
    } else {
      toast({
        title: 'Error',
        description: 'Failed to spin. Please try again.',
        variant: 'destructive',
      })
      setSpinning([false, false, false])
    }
  }

  const stopReelsOnResult = (
    resultSymbols: string[],
    ticketFragment?: { ticketNumber: string; letter: string }
  ): void => {
    if (!resultSymbols[0] || !resultSymbols[1] || !resultSymbols[2]) return

    stopSpin(0, 1000, resultSymbols[0])
    stopSpin(1, 2000, resultSymbols[1])
    stopSpin(2, 3000, resultSymbols[2], () => {
      if (ticketFragment) {
        toast({
          title: '🎉 JACKPOT WIN! 🎉',
          description: `You found letter "${ticketFragment.letter}" for Hackathon Ticket Number #${ticketFragment.ticketNumber}! Keep spinning to collect them all!`,
          style: {
            fontFamily: 'var(--font-ndot47)',
          },
        })
      } else {
        toast({
          title: 'NOT THIS TIME!',
          description: `Keep spinning - your next pull could be lucky!`,
          style: {
            fontFamily: 'var(--font-ndot47)',
          },
        })
      }
    })
  }

  const stopSpin = (
    reelIndex: number,
    delay: number,
    resultSymbol: string,
    onComplete?: () => void
  ): void => {
    setTimeout(() => {
      setSpinning((prev) => {
        const newSpinning = [...prev]
        newSpinning[reelIndex] = false
        return newSpinning
      })

      setReels((prev) => {
        const newReels = [...prev]
        newReels[reelIndex] = [resultSymbol]
        return newReels
      })

      if (onComplete) {
        onComplete()
      }
    }, delay)
  }

  return (
    <div className='flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center space-y-6 p-4 md:space-y-8'>
      <div className='flex w-full max-w-md flex-col items-center space-y-3 md:space-y-4'>
        <h1 className='pixel-shadow animate-pulse text-center font-press-start-2p text-xl font-semibold text-white md:text-4xl'>
          TICKET SLOT
        </h1>
        <div className='pixel-border mx-auto w-full rounded-lg border-2 border-white bg-black/50 p-2 md:p-4'>
          <p className='text-center font-press-start-2p text-[8px] leading-relaxed text-gray-300 md:text-xs'>
            HOW TO PLAY:
            <br />
            1. SPIN TO WIN TICKET LETTERS
            <br />
            2. GET JACKPOT TO REVEAL A LETTER
            <br />
            3. COLLECT ALL LETTERS TO WIN!
          </p>
        </div>
      </div>

      <div className='flex items-center justify-center gap-3 md:gap-8'>
        <div className='relative'>
          <div className='pixel-border shadow-neon rounded-lg border-4 border-white bg-black p-3 md:p-6'>
            <div className='pixel-border-inner rounded bg-carmine-900 p-2 md:p-4'>
              <div className='pixel-border-inset flex space-x-2 bg-black p-2 md:space-x-4 md:p-5'>
                {reels.map((reelSymbols, index) => {
                  const reelPosition = ['left', 'middle', 'right'][index]
                  return (
                    <Reel
                      key={`slot-reel-${String(reelPosition)}`}
                      spinning={spinning[index] ?? false}
                      reelSymbols={reelSymbols.map((symbol, id) => ({
                        id,
                        value: symbol,
                      }))}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        <div className='flex scale-75 flex-col items-center justify-center md:scale-100'>
          <Lever onPullEnd={spin} />
        </div>
      </div>

      <button
        className='pixel-border shadow-neon w-full max-w-[160px] transform bg-carmine-600 px-4 py-2 font-press-start-2p text-sm text-white transition-transform hover:scale-105 hover:bg-carmine-500 disabled:cursor-not-allowed disabled:opacity-50 md:max-w-[200px] md:px-8 md:py-3 md:text-xl'
        disabled={spinning.some((s) => s)}
        type='button'
        onClick={spin}
      >
        SPIN!
      </button>
    </div>
  )
}

export default SlotMachine
