"use client";
import { cn } from "@/lib/utils";
import { createContext, useContext, useState } from "react";
interface NavMenuContextProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const NavMenuContext = createContext<NavMenuContextProps>({
  isOpen: false,
  setIsOpen: () => null,
});
export const NavMenu = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <NavMenuContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </NavMenuContext.Provider>
  );
};
type NavMenuTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
export const NavMenuTrigger = ({ ...props }: NavMenuTriggerProps) => {
  const { setIsOpen } = useContext(NavMenuContext);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        props.onClick?.(e);
      }}
      {...props}
    />
  );
};
interface NavMenuContentProps {
  children: React.ReactNode;
}
export function NavMenuContent({ children }: NavMenuContentProps) {
  const { isOpen, setIsOpen } = useContext(NavMenuContext);
  if (typeof window !== "undefined") {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }
  return (
    <>
      <nav
        className={cn(
          "fixed left-0 right-0 top-16 z-40 border-b border-neutral-800 bg-neutral-950/70 backdrop-blur-lg duration-300 ease-in-out",
          isOpen ? "translate-y-0" : "translate-y-[calc(-100%-4rem)]",
        )}
      >
        {children}
      </nav>
      <div
        className={cn(
          "fixed inset-0 z-30 bg-black/50 backdrop-blur-sm duration-300 ease-in-out",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => {
          setIsOpen(false);
        }}
      />
    </>
  );
}
