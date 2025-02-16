export interface Event {
  id: number
  eventId: string
  name: string
  club?: 'thinc' | 'gdsc' | 'grdc' | 'quant' | 'cubs' | 'eic' | 'robo-racer'
  date: string
  stampStrictDate: boolean
}
