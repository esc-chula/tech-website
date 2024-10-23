"use client";

import { addStamp } from "@/server/actions/techmonth";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";

interface ModalContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ModalContext = createContext<ModalContextProps>({
  open: false,
  setOpen: () => null,
});

export function Modal({ children }: { children: React.ReactNode }) {
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
}

interface TriggerModalProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function TriggerModal(props: TriggerModalProps) {
  const { setOpen } = useContext(ModalContext);

  return (
    <button type="button" onClick={() => setOpen(true)} {...props}>
      {props.children}
    </button>
  );
}

export function ModalContent(): JSX.Element {
  const router = useRouter();
  const { open, setOpen } = useContext(ModalContext);
  const [loading, setLoading] = useState(false);

  const formHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const eventId = formData.get("eventId");

    if (!eventId) {
      alert("Invalid event ID");
      return;
    }

    setLoading(true);

    const { error } = await addStamp(eventId as string);
    if (error) {
      alert(error);
      setLoading(false);
      return;
    }

    router.refresh();
    setOpen(false);
    setLoading(false);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50`}
      style={{
        display: open ? "flex" : "none",
      }}
      onClick={() => setOpen(false)}
    >
      <div
        className={`flex h-80 w-full max-w-screen-sm flex-col gap-16 bg-techmonth-black px-4 pt-10 font-tiny5`}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-center text-5xl">ADD STAMP</h3>
        <form
          onSubmit={formHandler}
          className="flex items-center justify-center gap-4"
        >
          <input
            name="eventId"
            placeholder="Fill in the event ID"
            className="h-16 w-full border-4 border-techmonth-white bg-transparent p-4 text-2xl text-techmonth-white outline-none placeholder:text-techmonth-white lg:w-1/2"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-techmonth-yellow px-6 py-2 text-3xl text-techmonth-black duration-200 hover:translate-x-3"
          >
            {loading ? "loaAding..." : "ADD"}
          </button>
        </form>
      </div>
    </div>
  );
}
