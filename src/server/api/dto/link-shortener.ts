import { z } from 'zod';

export const CreateShortenedLinkDto = z.object({
  name: z.string(),
  slug: z.string(),
  url: z.string(),
});

export const GetShortenedLinkBySlugDto = z.object({
  slug: z.string(),
});

export const UpdateShortenedLinkDto = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  url: z.string(),
});

export const DeleteShortenedLinkBySlugDto = z.object({
  slug: z.string(),
});
