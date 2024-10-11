import { getEvents } from "@/server/actions/techmonth";

export default async function StampsPage(): Promise<JSX.Element> {
  const events = await getEvents();

  return <div>{events[0]?.name}</div>;
}
