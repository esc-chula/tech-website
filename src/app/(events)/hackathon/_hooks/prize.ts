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

  return max * Math.pow(percentage, 8)
}

const MARGIN_DATE = 0

export const usePrize = (): { prize: number | null; prizeString: string } => {
  const [prize, setPrize] = useState<number | null>(null)

  useEffect(() => {
    const config = {
      startDate: new Date(
        new Date('2025-02-10T00:00:00').getTime() -
          MARGIN_DATE * 24 * 60 * 60 * 1000
      ),
      endDate: new Date(
        new Date('2025-03-22T11:11:11').getTime() -
          MARGIN_DATE * 24 * 60 * 60 * 1000
      ),

      max: 250_000,
    }

    const initialPrize = getNumberByDate(config)

    setPrize(initialPrize)

    const interval = setInterval(() => {
      setPrize(getNumberByDate(config))
    }, 100)
    return () => clearInterval(interval)
  }, [])

  const decimalPlaces =
    prize === null ? 0 : Math.max(5 - Math.floor(Math.log10(prize)), 0)
  const prizeWithDecimal = prize === null ? '0' : prize.toFixed(decimalPlaces)
  const wholePart = prizeWithDecimal.split('.')[0] ?? '0'
  const decimalPart = prizeWithDecimal.split('.')[1] ?? ''
  const prizeString = `${wholePart.replace(/\B(?=(?:\d{3})+(?!\d))/g, ',')}${decimalPart === '' ? '' : `.${decimalPart}`}`

  return { prize, prizeString }
}
