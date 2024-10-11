import { createDirectus, rest } from "@directus/sdk";
import { env } from "@/env";
import type { Event } from "@/types/techmonth";

interface Schema {
  Tech_web_techmonth_event: Event;
}

const directus = createDirectus<Schema>(env.DIRECTUS_URL).with(rest());

export default directus;
