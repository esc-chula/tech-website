"use server";

import { cookies } from "next/headers";
import { readItems } from "@directus/sdk";
import directus from "@/lib/directus";
import type { Event } from "@/types/techmonth";

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
