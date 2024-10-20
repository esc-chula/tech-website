import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { getEventByEventId } from "@/server/actions/techmonth";
import { api } from "@/trpc/server";

interface AddStampPageProps {
  searchParams: {
    code: string;
  };
}

export default async function AddStampPage({
  searchParams,
}: AddStampPageProps): Promise<JSX.Element> {
  const cookieStore = cookies();
  const studentId = cookieStore.get("studentId")?.value;
  if (!studentId) {
    redirect(
      `/techmonth/login?callbackUrl=${encodeURIComponent(`/techmonth/stamps/add?code=${searchParams.code}`)}`,
    );
  }

  const eventId = searchParams.code;
  if (!eventId) {
    return notFound();
  }

  const { data: event, error } = await getEventByEventId(eventId);
  if (!event) {
    return notFound();
  }
  if (error) {
    redirect("/techmonth/stamps");
  }

  if (event.stampStrictDate) {
    const today = new Date();
    const eventDate = new Date(event.date);
    if (today.getDate() !== eventDate.getDate()) {
      return notFound();
    }
  }

  const userStamps = await api.techMonthStamp.getStampsByStudentId({
    studentId,
  });

  const hasAlreadyStamped = userStamps.some(
    (stamp) => stamp.eventId === eventId,
  );

  if (hasAlreadyStamped) {
    redirect("/techmonth/stamps");
  }

  await api.techMonthStamp.createStamp({
    studentId,
    eventId,
  });

  redirect("/techmonth/stamps");
}
