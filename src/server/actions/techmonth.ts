"use server";

import { readItems } from "@directus/sdk";
import directus from "@/lib/directus";
import type { Event } from "@/types/techmonth";

export async function getEvents(): Promise<Event[]> {
  const events = await directus.request(
    readItems("Tech_web_techmonth_event" as never),
  );
  return events as never as Event[];
}
