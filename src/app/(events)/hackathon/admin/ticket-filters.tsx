import type { Dispatch, SetStateAction } from 'react';

import { Button } from '~/components/ui/button';

interface TicketFiltersProps {
  setFilter: Dispatch<SetStateAction<string>>;
}

const TicketFilters = ({ setFilter }: TicketFiltersProps): JSX.Element => {
  return (
    <div className="flex space-x-4 items-center justify-center">
      <Button onClick={() => setFilter('ALL')}>All</Button>
      <Button onClick={() => setFilter('CLAIMED')}>Claimed</Button>
      <Button onClick={() => setFilter('UNCLAIMED')}>Unclaimed</Button>
      <Button onClick={() => setFilter('REGISTERED')}>Registered</Button>
    </div>
  );
};

export default TicketFilters;
