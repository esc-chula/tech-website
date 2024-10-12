import { getEvents } from "@/server/actions/techmonth";
import { api } from "@/trpc/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function StampsPage(): Promise<JSX.Element> {
  const cookieStore = cookies();
  const studentId = cookieStore.get("studentId")?.value;
  if (!studentId) {
    redirect("/techmonth/login");
  }

  const stamps = await api.techMonthStamp.getStampsByStudentId({
    studentId,
  });

  const events = await getEvents();
  const eventMap = new Map(events.map((event) => [event.eventId, event]));

  const stampsWithEvent = stamps.map((stamp) => ({
    ...stamp,
    event: eventMap.get(stamp.eventId),
  }));

  return <div>{JSON.stringify(stampsWithEvent)}</div>;
}
