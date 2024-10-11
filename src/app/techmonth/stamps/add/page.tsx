import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { getEventByEventId } from "@/server/actions/techmonth";

interface AddStampPageProps {
  searchParams: {
    code: string;
  };
}

export default async function AddStampPage({
  searchParams,
}: AddStampPageProps): Promise<JSX.Element> {
  const cookieStore = cookies();
  const studentId = cookieStore.get("studentId");
  if (!studentId) {
    redirect("/techmonth/login");
  }

  const eventId = searchParams.code;
  if (!eventId) {
    return notFound();
  }

  const event = await getEventByEventId(eventId).catch(() => null);
  if (!event) {
    return notFound();
  }

  return <div>Registering event: {event.name}...</div>;
}
