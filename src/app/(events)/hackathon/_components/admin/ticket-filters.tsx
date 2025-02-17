import type { Dispatch, SetStateAction } from 'react'

import { Button } from '~/components/ui/button'

interface TicketFiltersProps {
  setFilter: Dispatch<SetStateAction<string>>
}

const TicketFilters: React.FC<TicketFiltersProps> = ({ setFilter }) => {
  return (
    <div className='flex items-center justify-center space-x-4'>
      <Button onClick={() => setFilter('ALL')}>All</Button>
      <Button onClick={() => setFilter('CLAIMED')}>Claimed</Button>
      <Button onClick={() => setFilter('UNCLAIMED')}>Unclaimed</Button>
      <Button onClick={() => setFilter('REGISTERED')}>Registered</Button>
    </div>
  )
}

export default TicketFilters
