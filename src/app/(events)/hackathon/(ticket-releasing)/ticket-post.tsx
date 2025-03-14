'use client'

import { useEffect } from 'react'

const HiddenTicketFetcher: React.FC = () => {
  useEffect((): void => {
    const postTicket = async (): Promise<void> => {
      await fetch('/api/hackathon/deenoo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    void postTicket()
  }, [])

  return null
}

export default HiddenTicketFetcher
