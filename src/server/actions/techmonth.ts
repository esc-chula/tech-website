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
    message: "Successfully logged in",
    data: null,
  };
}

export async function logout(): Promise<ServerActionResponse<null>> {
  const cookieStore = cookies();
  cookieStore.delete("studentId");

  return {
    message: "Successfully logged out",
    data: null,
  };
}

export async function getEvents(): Promise<
  ServerActionResponse<Event[] | null>
> {
  try {
    const events = await directus.request(
      readItems("Tech_web_techmonth_event" as never),
    );

    return {
      message: "Successfully fetched events",
      data: events as never as Event[],
    };
  } catch (error) {
    return {
      message: "Failed to fetch events",
      error: error instanceof Error ? error.message : "Unknown error",
      data: null,
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
        message: "Event not found",
        error: "Not found",
        data: null,
      };
    }

    const event = events[0];

    return {
      message: "Successfully fetched event",
      data: event as never as Event,
    };
  } catch (error) {
    return {
      message: "Failed to fetch event",
      error: error instanceof Error ? error.message : "Unknown error",
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
    return {
      message: "Not logged in",
      error: "Unauthorized",
      data: null,
    };
  }

  const { data: event, error } = await getEventByEventId(eventId);
  if (error) {
    return {
      message: "Failed to fetch event",
      error: error,
      data: null,
    };
  }
  if (!event) {
    return {
      message: "Event not found",
      error: "Invalid Event ID",
      data: null,
    };
  }

  if (event.stampStrictDate) {
    const today = new Date();
    const eventDate = new Date(event.date);
    if (today.getDate() !== eventDate.getDate()) {
      return {
        message: "Failed to stamp",
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
      message: "Failed to fetch user stamps",
      error: "Unknown error",
      data: null,
    };
  }

  const hasAlreadyStamped = userStamps.some(
    (stamp) => stamp.eventId === eventId,
  );

  if (hasAlreadyStamped) {
    return {
      message: "User already stamped",
      error: "Failed to stamp",
      data: null,
    };
  }

  await api.techMonthStamp.createStamp({
    studentId,
    eventId,
  });

  return {
    message: "Successfully stamped",
    data: null,
  };
}
