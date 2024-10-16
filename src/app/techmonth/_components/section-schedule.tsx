import { getEvents } from "@/server/actions/techmonth";

export default async function ScheduleSection(): Promise<JSX.Element> {
  const events = await getEvents();

  return (
    <div
      id="schedule"
      className="min-h-screen w-full max-w-screen-xl space-y-8 px-8 py-28 font-tiny5 md:px-16 xl:px-4"
    >
      <h2 className="text-center text-5xl uppercase lg:text-left lg:text-8xl">
        Sche
        <span className="text-techmonth-magenta">dule</span>
      </h2>
      <div className="flex w-full flex-col gap-4">
        {events.map((event, index) => (
          <div
            key={index}
            className="flex w-full flex-col justify-between gap-10 border-4 border-techmonth-white bg-techmonth-white/10 p-5 xl:flex-row xl:items-center xl:gap-0"
          >
            <div>
              <h3 className="text-3xl xl:text-5xl">{event.name}</h3>
              <p className="font-ibm-plex-sans-thai">
                Powered by {event.club || "TECH ESC"}
              </p>
            </div>
            <div className="text-right">
              <p className="hidden font-press-start-2p md:inline xl:text-lg">
                {/* Monday, 1st November 2021 */}
                {new Date(event.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="font-press-start-2p text-sm md:hidden">
                {/* Monday, 1st November */}
                {new Date(event.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="font-press-start-2p text-xs sm:text-sm xl:text-base">
                {/* 10:00 - 12:00 */}
                {new Date(event.date).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                })}{" "}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
