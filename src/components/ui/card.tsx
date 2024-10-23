import { cn } from "@/lib/utils";

export default function Card({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "w-full rounded-xl bg-gradient-to-b from-neutral-800 to-neutral-900 p-px",
      )}
      {...props}
    >
      <div
        className={cn(
          "space-y-2 rounded-[calc(0.5rem+1px)] bg-neutral-900 p-4",
          props.className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
