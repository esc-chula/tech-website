'use client'

import { useEffect, useState } from 'react'

import {
  HACKATHON_GAME_JACKPOT_MODE,
  HACKATHON_GAME_JACKPOT_SYMBOLS,
  HACKATHON_GAME_JACKPOT_TICKET_CODES,
} from '~/constants/hackathon'
import { toast } from '~/hooks/use-toast'
import { ticketGameProgressStorage } from '~/lib/hackathon-ticket'
import { spinHackathonTicketSlotWithRateLimit } from '~/server/actions/hackathon'
import { type TicketProgress } from '~/types/hackathon'

import Lever from './slot-lever'
import Reel from './slot-reel'

const SlotMachine = (): JSX.Element => {
  const reelLength = 100

  const [reels, setReels] = useState<string[][]>([[], [], []])
  const [spinning, setSpinning] = useState<boolean[]>([false, false, false])
  const [ticketProgress, setTicketProgress] = useState<TicketProgress | null>(
    null
  )

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

    // SAVE PROGRESS
    const savedProgress = ticketGameProgressStorage.getItem('ticketProgress')
    if (savedProgress) {
      setTicketProgress(savedProgress)
    } else {
      const randomIdx = Math.floor(
        Math.random() * HACKATHON_GAME_JACKPOT_TICKET_CODES.length
      )
      const newProgress = {
        ticketNumber: `${randomIdx + 1}`,
        foundPositions: [],
      }
      ticketGameProgressStorage.setItem('ticketGameProgress', newProgress)
      setTicketProgress(newProgress)
    }
  }, [])

  const spin = async (): Promise<void> => {
    if (spinning.some((spin) => spin) || !ticketProgress) return

    setReels([
      generateReelSymbols(),
      generateReelSymbols(),
      generateReelSymbols(),
    ])
    setSpinning([true, true, true])

    const result = await spinHackathonTicketSlotWithRateLimit(
      ticketProgress.ticketNumber,
      ticketProgress.foundPositions
    )

    if (result.success) {
      stopReelsOnResult(result.data.symbols, result.data.ticketFragment)
    } else {
      console.error(result.errors)
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
    ticketFragment?: {
      ticketNumber: string
      letter?: string
      fullCode?: string
      position: number
    }
  ): void => {
    if (!resultSymbols[0] || !resultSymbols[1] || !resultSymbols[2]) return

    const symbols = resultSymbols.map((symbol) => symbol) as [
      string,
      string,
      string,
    ]

    stopSpin(0, 1000, symbols[0])
    stopSpin(1, 2000, symbols[1])
    stopSpin(2, 3000, symbols[2], () => {
      setTimeout(() => {
        if (ticketFragment && ticketProgress) {
          if (
            HACKATHON_GAME_JACKPOT_MODE === 'FULL_TICKET' &&
            ticketFragment.fullCode
          ) {
            const updatedProgress = {
              ...ticketProgress,
              foundPositions: Array.from(
                { length: ticketFragment.fullCode.length },
                (_, i) => i
              ),
            }
            ticketGameProgressStorage.setItem(
              'ticketGameProgress',
              updatedProgress
            )
            setTicketProgress(updatedProgress)

            toast({
              title: '🎉 JACKPOT WIN! 🎉',
              description: `You won the full ticket #${ticketFragment.ticketNumber}: ${ticketFragment.fullCode}!`,
              style: { fontFamily: 'var(--font-ndot47)' },
            })
          } else if (ticketFragment.letter) {
            const updatedProgress = {
              ...ticketProgress,
              foundPositions: [
                ...ticketProgress.foundPositions,
                ticketFragment.position,
              ],
            }
            ticketGameProgressStorage.setItem(
              'ticketGameProgress',
              updatedProgress
            )
            setTicketProgress(updatedProgress)

            toast({
              title: '🎉 JACKPOT WIN! 🎉',
              description: `You found letter "${ticketFragment.letter}" for Hackathon Ticket Number #${ticketFragment.ticketNumber}! Keep spinning to collect them all!`,
              style: { fontFamily: 'var(--font-ndot47)' },
            })
          }
        } else {
          toast({
            title: 'NOT THIS TIME!',
            description: 'Keep spinning - your next pull could be lucky!',
            style: { fontFamily: 'var(--font-ndot47)' },
          })
        }
      }, 500)
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
    <div className='mt-8 flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center space-y-5 p-4 sm:mt-auto sm:space-y-6 md:space-y-8'>
      {ticketProgress ? (
        <div className='pixel-border mx-auto w-full max-w-md rounded-lg border-2 border-white bg-black/50 p-2 md:p-4'>
          <p className='text-center font-press-start-2p text-xs text-gray-300'>
            TICKET #{ticketProgress.ticketNumber}:{' '}
            {Array(HACKATHON_GAME_JACKPOT_TICKET_CODES[0]?.length ?? 0)
              .fill('?')
              .map((_, idx) => (
                <span
                  key={`ticket-${ticketProgress.ticketNumber}-position-${Math.random().toString(36).substring(7)}`}
                  className={
                    ticketProgress.foundPositions.includes(idx)
                      ? 'text-yellow-400'
                      : 'text-gray-600'
                  }
                >
                  {ticketProgress.foundPositions.includes(idx)
                    ? (HACKATHON_GAME_JACKPOT_TICKET_CODES[
                        parseInt(ticketProgress.ticketNumber) - 1
                      ]?.[idx] ?? '?')
                    : '?'}
                </span>
              ))}
          </p>
        </div>
      ) : null}
      <div className='flex w-full max-w-md flex-col items-center space-y-2 md:space-y-4'>
        <h1 className='pixel-shadow animate-pulse text-center font-press-start-2p text-xl font-semibold text-white md:text-4xl'>
          TICKET SLOT
        </h1>
        <div className='pixel-border mx-auto w-full rounded-lg border-2 border-white bg-black/50 p-2 md:p-4'>
          <p className='text-center font-press-start-2p text-[8px] leading-relaxed text-gray-300 md:text-xs'>
            {HACKATHON_GAME_JACKPOT_MODE === 'FULL_TICKET' ? (
              <>
                HOW TO PLAY:
                <br />
                1. SPIN TO WIN TICKET
                <br />
                2. GET JACKPOT(888)
                <br />
                3. REVEAL FULL TICKET
              </>
            ) : (
              <>
                HOW TO PLAY:
                <br />
                1. SPIN TO WIN TICKET LETTERS
                <br />
                2. GET JACKPOT(888) TO REVEAL A LETTER
                <br />
                3. COLLECT ALL LETTERS TO WIN!
              </>
            )}
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

      <div className='flex flex-col items-center gap-8'>
        <button
          className='pixel-border shadow-neon w-full max-w-[160px] transform bg-carmine-600 px-4 py-2 font-press-start-2p text-sm text-white transition-transform hover:scale-105 hover:bg-carmine-500 disabled:cursor-not-allowed disabled:opacity-50 md:max-w-[200px] md:px-8 md:py-3 md:text-xl'
          disabled={spinning.some((s) => s)}
          type='button'
          onClick={spin}
        >
          SPIN!
        </button>
        <p className='-mt-5 text-xs text-white/40'>Sponsored by Intania 888</p>
      </div>
    </div>
  )
}

export default SlotMachine
