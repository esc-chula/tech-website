'use client';

import { useRouter } from 'next/navigation';
import { createContext, useContext, useState } from 'react';

import { useToast } from '~/hooks/use-toast';
import { addStamp } from '~/server/actions/techmonth';

interface ModalContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ModalContext = createContext<ModalContextProps>({
  open: false,
  setOpen: () => null,
});

interface ModalProps {
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        open,
        setOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

interface TriggerModalProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const TriggerModal: React.FC<TriggerModalProps> = (props) => {
  const { setOpen } = useContext(ModalContext);

  return (
    <button type="button" onClick={() => setOpen(true)} {...props}>
      {props.children}
    </button>
  );
};

export const ModalContent: React.FC = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { open, setOpen } = useContext(ModalContext);
  const [loading, setLoading] = useState(false);

  const formHandler = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const eventId = formData.get('eventId');

    if (!eventId) {
      toast({
        title: 'Invalid event ID',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    const res = await addStamp(eventId as string);
    if (!res.success) {
      toast({
        title: 'Failed to add stamp',
        description: res.errors.join(', '),
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    router.refresh();
    setOpen(false);
    setLoading(false);
  };

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      style={{
        display: open ? 'flex' : 'none',
      }}
      onClick={() => setOpen(false)}
    >
      <div
        aria-hidden="true"
        className="flex h-80 w-full max-w-screen-sm flex-col gap-16 bg-techmonth-black px-4 pt-10 font-tiny5"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-center text-5xl">ADD STAMP</h3>
        <form
          className="flex items-center justify-center gap-4"
          onSubmit={formHandler}
        >
          <input
            className="h-16 w-full border-4 border-techmonth-white bg-transparent p-4 text-2xl text-techmonth-white outline-none placeholder:text-techmonth-white lg:w-1/2"
            name="eventId"
            placeholder="Fill in the event ID"
          />
          <button
            className="bg-techmonth-yellow px-6 py-2 text-3xl text-techmonth-black duration-200 hover:translate-x-3"
            disabled={loading}
            type="submit"
          >
            {loading ? 'loaAding...' : 'ADD'}
          </button>
        </form>
      </div>
    </div>
  );
};
