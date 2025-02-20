import { useEffect, useState } from 'react'

function getNumberByDate({
  startDate,
  endDate,
  max,
}: {
  startDate: Date
  endDate: Date
  max: number
}): number {
  const currentDate = new Date()
  if (currentDate < startDate) {
    return 0
  }
  if (currentDate > endDate) {
    return max
  }
  const percentage =
    (currentDate.getTime() - startDate.getTime()) /
    (endDate.getTime() - startDate.getTime())

  return max * Math.pow(percentage, 4)
}

export const usePrize = (): { prize: number | null; prizeString: string } => {
  const [prize, setPrize] = useState<number | null>(null)

  useEffect(() => {
    const config = {
      startDate: new Date('2025-02-19T00:00:00'),
      endDate: new Date('2025-03-17T00:00:00'),
      max: 1_111_111,
    }

    const initialPrize = getNumberByDate(config)

    setPrize(initialPrize)

    const interval = setInterval(() => {
      setPrize(getNumberByDate(config))
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const decimalPlaces =
    prize === null ? 0 : Math.max(4 - Math.floor(Math.log10(prize)), 0)
  const prizeWithDecimal = prize === null ? '0' : prize.toFixed(decimalPlaces)
  const wholePart = prizeWithDecimal.split('.')[0] ?? '0'
  const decimalPart = prizeWithDecimal.split('.')[1] ?? ''
  const prizeString = `${wholePart.replace(/\B(?=(?:\d{3})+(?!\d))/g, ',')}${decimalPart === '' ? '' : `.${decimalPart}`}`

  return { prize, prizeString }
}
