import type { Dispatch, SetStateAction } from 'react';

interface TicketFiltersProps {
  setFilter: Dispatch<SetStateAction<string>>;
}

const TicketFilters = ({ setFilter }: TicketFiltersProps): JSX.Element => {
  return (
    <div className="flex space-x-4">
      <button className="btn" type="button" onClick={() => setFilter('ALL')}>
        All
      </button>
      <button
        className="btn"
        type="button"
        onClick={() => setFilter('CLAIMED')}
      >
        Claimed
      </button>
      <button
        className="btn"
        type="button"
        onClick={() => setFilter('UNCLAIMED')}
      >
        Unclaimed
      </button>
      <button
        className="btn"
        type="button"
        onClick={() => setFilter('REGISTERED')}
      >
        Registered
      </button>
    </div>
  );
};

export default TicketFilters;
