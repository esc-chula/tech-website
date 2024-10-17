import Image from "next/image";
import type { Event } from "@/types/techmonth";

export default function Stamp({
  stamp,
}: {
  stamp: {
    event: Event | undefined;
    id: number;
    studentId: string;
    eventId: string;
  };
}) {
  return (
    <div className="h-full w-full -rotate-[20deg] rounded-full bg-[#474747] pt-3 text-center">
      <div className="relative h-3/4 w-full">
        <Image
          src={
            stamp.event?.club
              ? `/techmonth/clubs/${stamp.event?.club}.png`
              : "/techmonth/tech_logo.svg"
          }
          alt={stamp.eventId}
          fill
          className="object-contain"
        />
      </div>
      <div className="h-20">{`<${stamp.eventId}>`}</div>
    </div>
  );
}
