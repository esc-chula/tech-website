import { cn } from "@/lib/utils";
import Link from "next/link";

const items = [
  { label: "Hero" },
  { label: "Tech Month?" },
  { label: "Schedule" },
];

export default function Navigation(): JSX.Element {
  return (
    <div className="sticky top-4 mt-[calc(100vh-72px)] flex justify-center font-tiny5">
      <div className="flex h-14 w-full max-w-screen-md gap-4">
        <div className="flex h-full w-full items-center justify-between bg-techmonth-white px-4 text-3xl">
          {items.map((item) => {
            const active = item.label === "Hero";
            return (
              <button
                key={item.label}
                className={cn(
                  "px-1 text-techmonth-black",
                  active
                    ? "bg-techmonth-green"
                    : "bg-techmonth-white hover:bg-techmonth-magenta",
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        <Link
          href="/techmonth/stamp"
          className="bg-techmonth-yellow grid h-full w-min place-content-center whitespace-nowrap px-3 text-2xl text-techmonth-black duration-300 ease-in-out hover:translate-x-2"
        >
          {`COLLECT STAMP ->`}
        </Link>
      </div>
    </div>
  );
}
