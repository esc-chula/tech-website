"use server";

import { cookies } from "next/headers";
import { readItems } from "@directus/sdk";
import directus from "@/lib/directus";
import type { Event } from "@/types/techmonth";
import { api } from "@/trpc/server";
import { type ServerActionResponse } from "@/types/server";

export async function login(
  studentId: string,
): Promise<ServerActionResponse<null>> {
  const cookieStore = cookies();
  cookieStore.set("studentId", studentId);

  return {
    data: null,
  };
}

export async function logout(): Promise<ServerActionResponse<null>> {
  const cookieStore = cookies();
  cookieStore.delete("studentId");

  return {
    data: null,
  };
}

export async function getEvents(): Promise<ServerActionResponse<Event[]>> {
  try {
    const events = await directus.request(
      readItems("Tech_web_techmonth_event" as never),
    );

    return {
      data: events as never as Event[],
    };
  } catch (error) {
    return {
      error: "Failed to fetch events",
      data: [],
    };
  }
}

export async function getEventByEventId(
  eventId: string,
): Promise<ServerActionResponse<Event | null>> {
  try {
    const events = await directus.request(
      readItems("Tech_web_techmonth_event" as never, {
        filter: { eventId },
      }),
    );

    if (events.length === 0) {
      return {
        error: "Event not found",
        data: null,
      };
    }

    const event = events[0];

    return {
      data: event as never as Event,
    };
  } catch (error) {
    return {
      error: "Failed to fetch event",
      data: null,
    };
  }
}

export async function addStamp(
  eventId: string,
): Promise<ServerActionResponse<null>> {
  const cookieStore = cookies();
  const studentId = cookieStore.get("studentId")?.value;
  if (!studentId) {
    throw new Error("Student not found");
  }

  const { data: event, error } = await getEventByEventId(eventId);
  if (error) {
    return {
      error: error,
      data: null,
    };
  }
  if (!event) {
    return {
      error: "Invalid Event ID",
      data: null,
    };
  }

  if (event.stampStrictDate) {
    const today = new Date();
    const eventDate = new Date(event.date);
    if (today.getDate() !== eventDate.getDate()) {
      return {
        error: "Invalid Event Date",
        data: null,
      };
    }
  }

  const userStamps = await api.techMonthStamp
    .getStampsByStudentId({
      studentId,
    })
    .catch(() => null);
  if (!userStamps) {
    return {
      error: "Failed to fetch user stamps",
      data: null,
    };
  }

  const hasAlreadyStamped = userStamps.some(
    (stamp) => stamp.eventId === eventId,
  );

  if (hasAlreadyStamped) {
    return {
      error: "User already stamped",
      data: null,
    };
  }

  await api.techMonthStamp.createStamp({
    studentId,
    eventId,
  });

  return {
    data: null,
  };
}
