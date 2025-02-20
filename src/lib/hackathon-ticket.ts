import CryptoJS from 'crypto-js'
import { v4 as uuidv4 } from 'uuid'

import { HACKATHON_GAME_JACKPOT_PROGRESS_STORAGE_SECRET_KEY } from '~/constants/hackathon'
import { type TicketProgress } from '~/types/hackathon'

export function genPublicId(): string {
  return uuidv4()
}

export const ticketGameProgressStorage = {
  setItem(key: string, data: TicketProgress): void {
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      HACKATHON_GAME_JACKPOT_PROGRESS_STORAGE_SECRET_KEY
    ).toString()
    sessionStorage.setItem(key, encrypted)
  },

  getItem(key: string): TicketProgress | null {
    const encrypted = sessionStorage.getItem(key)
    if (!encrypted) return null

    try {
      const decrypted = CryptoJS.AES.decrypt(
        encrypted,
        HACKATHON_GAME_JACKPOT_PROGRESS_STORAGE_SECRET_KEY
      ).toString(CryptoJS.enc.Utf8)
      const parsed = JSON.parse(decrypted) as TicketProgress

      if (
        typeof parsed.ticketNumber === 'string' &&
        Array.isArray(parsed.foundPositions) &&
        parsed.foundPositions.every((pos) => typeof pos === 'number')
      ) {
        return parsed
      }
      return null
    } catch {
      return null
    }
  },

  removeItem(key: string): void {
    sessionStorage.removeItem(key)
  },
}
