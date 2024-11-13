import {z} from "Zod";

export const CreateShortenedLinkDto = z.object({
  name: z.string(),
  url: z.string(),
  slug: z.string(),
  count: z.string(),
  userId: z.string(),
  id: z.string().optional(),
})