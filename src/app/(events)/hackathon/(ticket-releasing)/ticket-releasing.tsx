'use client'

import { useEffect, useState } from 'react'

interface TicketRandomConsoleLogProps {
  tickets: string[]
}

export const TicketRandomConsoleLog: React.FC<TicketRandomConsoleLogProps> = ({
  tickets,
}) => {
  const [random, setRandom] = useState<string>('')

  useEffect(() => {
    setRandom(tickets[Math.floor(Math.random() * tickets.length)] ?? '')
  }, [tickets])

  if (random) {
    console.log(random)
  }

  return null
}

interface TicketRandomTransparentProps {
  tickets: string[]
}

export const TicketRandomTransparentText: React.FC<
  TicketRandomTransparentProps
> = ({ tickets }) => {
  const [random, setRandom] = useState<string>('')

  useEffect(() => {
    setRandom(tickets[Math.floor(Math.random() * tickets.length)] ?? '')
  }, [tickets])

  return <p className='absolute opacity-0'>{random}</p>
}

interface TicketSetLocalStorageProps {
  name: string
  ticket: string
}

export const TicketSetLocalStorage: React.FC<TicketSetLocalStorageProps> = ({
  name,
  ticket,
}) => {
  useEffect(() => {
    localStorage.setItem(name, ticket)
  }, [name, ticket])

  return null
}
