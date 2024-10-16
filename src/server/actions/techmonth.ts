"use server";

import { cookies } from "next/headers";
import { readItems } from "@directus/sdk";
import directus from "@/lib/directus";
import type { Event } from "@/types/techmonth";
import { api } from "@/trpc/server";

export async function login(studentId: string) {
  const cookieStore = cookies();
  cookieStore.set("studentId", studentId);
}

export async function logout() {
  const cookieStore = cookies();
  cookieStore.delete("studentId");
}

export async function getEvents(): Promise<Event[]> {
  const events = await directus.request(
    readItems("Tech_web_techmonth_event" as never),
  );
  return events as never as Event[];
}

export async function getEventByEventId(eventId: string): Promise<Event> {
  const events = await directus.request(
    readItems("Tech_web_techmonth_event" as never, {
      filter: { eventId },
    }),
  );

  if (events.length === 0) {
    throw new Error("Event not found");
  }

  const event = events[0];

  return event as never as Event;
}

export async function addStamp(eventId: string): Promise<void> {
  const cookieStore = cookies();
  const studentId = cookieStore.get("studentId")?.value;
  if (!studentId) {
    throw new Error("Student not found");
  }

  const event = await getEventByEventId(eventId).catch(() => null);
  if (!event) {
    throw new Error("Invalid Event ID");
  }

  if (event.stampStrictDate) {
    const today = new Date();
    const eventDate = new Date(event.date);
    if (today.getDate() !== eventDate.getDate()) {
      throw new Error("Invalid Event ID");
    }
  }

  const userStamps = await api.techMonthStamp.getStampsByStudentId({
    studentId,
  });

  const hasAlreadyStamped = userStamps.some(
    (stamp) => stamp.eventId === eventId,
  );

  if (hasAlreadyStamped) {
    throw new Error("Already stamped");
  }

  await api.techMonthStamp.createStamp({
    studentId,
    eventId,
  });
}
