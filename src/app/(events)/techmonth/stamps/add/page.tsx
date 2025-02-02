import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

import { getEventByEventId } from '~/server/actions/techmonth';
import { api } from '~/trpc/server';

interface AddStampPageProps {
  searchParams: {
    code: string;
  };
}

const Page: React.FC<AddStampPageProps> = async ({ searchParams }) => {
  const cookieStore = cookies();
  const studentId = cookieStore.get('studentId')?.value;
  if (!studentId) {
    redirect(
      `/techmonth/login?callbackUrl=${encodeURIComponent(`/techmonth/stamps/add?code=${searchParams.code}`)}`,
    );
  }

  const eventId = searchParams.code;
  if (!eventId) {
    return notFound();
  }

  const res = await getEventByEventId(eventId);
  if (!res.success) {
    redirect('/techmonth/stamps');
  }

  const event = res.data;

  if (event.stampStrictDate) {
    const today = new Date();
    const eventDate = new Date(event.date);
    if (today.getDate() !== eventDate.getDate()) {
      return notFound();
    }
  }

  const userStamps = await api.techmonth.getStampsByStudentId({
    studentId,
  });

  const hasAlreadyStamped = userStamps.some(
    (stamp) => stamp.eventId === eventId,
  );

  if (hasAlreadyStamped) {
    redirect('/techmonth/stamps');
  }

  await api.techmonth.createStamp({
    studentId,
    eventId,
  });

  redirect('/techmonth/stamps');
};

export default Page;
