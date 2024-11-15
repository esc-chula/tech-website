"use server";

import { cookies } from "next/headers";
import { readItems } from "@directus/sdk";
import directus from "@/lib/directus";
import type { Event } from "@/types/techmonth";
import { api } from "@/trpc/server";
import { type Response } from "@/types/server";

export async function login(studentId: string): Promise<Response<null>> {
  const cookieStore = cookies();
  cookieStore.set("studentId", studentId);

  return {
    success: true,
    message: "Successfully logged in",
    data: null,
  };
}

export async function logout(): Promise<Response<null>> {
  const cookieStore = cookies();
  cookieStore.delete("studentId");

  return {
    success: true,
    message: "Successfully logged out",
    data: null,
  };
}

export async function getEvents(): Promise<Response<Event[]>> {
  try {
    const events = await directus.request(
      readItems("Tech_web_techmonth_event" as never),
    );

    return {
      success: true,
      message: "Successfully fetched events",
      data: events as never as Event[],
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch events",
      errors: [error instanceof Error ? error.message : "Unknown error"],
    };
  }
}

export async function getEventByEventId(
  eventId: string,
): Promise<Response<Event>> {
  try {
    const events = await directus.request(
      readItems("Tech_web_techmonth_event" as never, {
        filter: { eventId },
      }),
    );

    if (events.length === 0) {
      return {
        success: false,
        message: "Event not found",
        errors: ["Not found"],
      };
    }

    const event = events[0];

    return {
      success: true,
      message: "Successfully fetched event",
      data: event as never as Event,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch event",
      errors: [error instanceof Error ? error.message : "Unknown error"],
    };
  }
}

export async function addStamp(eventId: string): Promise<Response<null>> {
  const cookieStore = cookies();
  const studentId = cookieStore.get("studentId")?.value;
  if (!studentId) {
    return {
      success: false,
      message: "Not logged in",
      errors: ["Unauthorized"],
    };
  }

  const res = await getEventByEventId(eventId);
  if (!res.success) {
    return {
      success: false,
      message: "Failed to fetch event",
      errors: res.errors,
    };
  }

  const event = res.data;

  if (event.stampStrictDate) {
    const today = new Date();
    const eventDate = new Date(event.date);
    if (today.getDate() !== eventDate.getDate()) {
      return {
        success: false,
        message: "Failed to stamp",
        errors: ["Invalid Event Date"],
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
      success: false,
      message: "Failed to fetch user stamps",
      errors: ["Unknown error"],
    };
  }

  const hasAlreadyStamped = userStamps.some(
    (stamp) => stamp.eventId === eventId,
  );

  if (hasAlreadyStamped) {
    return {
      success: false,
      message: "User already stamped",
      errors: ["Failed to stamp"],
    };
  }

  await api.techMonthStamp.createStamp({
    studentId,
    eventId,
  });

  return {
    success: true,
    message: "Successfully stamped",
    data: null,
  };
}
