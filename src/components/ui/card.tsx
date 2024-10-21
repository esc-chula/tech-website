import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function Card(props: CardProps) {
  return (
    <div
      {...props}
      className={cn(
        "w-full rounded-xl bg-gradient-to-b from-neutral-800 to-neutral-900 p-px",
      )}
    >
      <div
        className={cn(
          "space-y-2 rounded-[calc(0.5rem+1px)] bg-neutral-900 p-4",
          props.className,
        )}
      >
        {props.children}
      </div>
    </div>
  );
}
