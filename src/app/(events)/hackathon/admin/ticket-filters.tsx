import type { Dispatch, SetStateAction } from 'react';

interface TicketFiltersProps {
  setFilter: Dispatch<SetStateAction<string>>;
}

const TicketFilters = ({ setFilter }: TicketFiltersProps): JSX.Element => {
  return (
    <div className="flex space-x-4 items-center justify-center">
      <button
        className="w-32  rounded-md p-2 bg-slate-400 text-black hover:bg-slate-500 cursor-pointer"
        type="button"
        onClick={() => setFilter('ALL')}
      >
        All
      </button>
      <button
        className="w-32  rounded-md p-2 bg-slate-400 text-black hover:bg-slate-500 cursor-pointer"
        type="button"
        onClick={() => setFilter('CLAIMED')}
      >
        Claimed
      </button>
      <button
        className="w-32  rounded-md p-2 bg-slate-400 text-black hover:bg-slate-500 cursor-pointer"
        type="button"
        onClick={() => setFilter('UNCLAIMED')}
      >
        Unclaimed
      </button>
      <button
        className="w-32  rounded-md p-2 bg-slate-400 text-black hover:bg-slate-500 cursor-pointer"
        type="button"
        onClick={() => setFilter('REGISTERED')}
      >
        Registered
      </button>
    </div>
  );
};

export default TicketFilters;
