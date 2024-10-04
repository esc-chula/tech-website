import { createDirectus, rest } from "@directus/sdk";
import { env } from "@/env";

interface Schema {}

const directus = createDirectus<Schema>(env.DIRECTUS_URL).with(rest());

export default directus;
