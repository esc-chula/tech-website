import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-neutral-800 bg-neutral-950/70 p-4 backdrop-blur-lg",
        className,
      )}
    >
      {children}
    </div>
  );
}
