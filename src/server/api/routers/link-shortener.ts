import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { CreateShortenedLinkDto } from "@/server/api/dto/link-shortener";
import { type ShortenedLink } from "@/types/link-shortener";

export const linkShortenerRouter = createTRPCRouter({
  create: publicProcedure
    .input(CreateShortenedLinkDto)
    .mutation(async ({ ctx, input }) => {
      const userId = Number(input.userId);

      if (isNaN(userId)) {
        return {
          data: null,
          error: `Invalid User ID provided.`,
        };
      }
      return await ctx.db.$transaction(async (tx) => {
        // check if slug is unique.
        const shortenedLinkWithSameSlug = await tx.userShortenedLink.findUnique(
          {
            where: {
              slug: input.slug,
            },
          },
        );
        if (shortenedLinkWithSameSlug) {
          return {
            data: null,
            error: `The Slug "${input.slug}" have already been used. Please choose a different slug.`,
          };
        }

        const newShortenedLink: ShortenedLink =
          await tx.userShortenedLink.create({
            data: {
              name: input.name,
              url: input.url,
              slug: input.slug,
              userId: Number(input.userId),
            },
          });
        return {
          data: newShortenedLink,
          message: `Created a shortened link for user with ID:${input.userId}`,
        };
      });
    }),

  get: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const userId = Number(input.userId);

      if (isNaN(userId)) {
        return {
          data: null,
          error: `Invalid User ID provided.`,
        };
      }

      const userShortenedLink = await ctx.db.userShortenedLink.findMany({
        where: {
          userId: Number(input.userId),
        },
      });

      if (userShortenedLink === null || userShortenedLink.length == 0) {
        return {
          data: null,
          error: `No shortened link found for user with ID:${input.userId}`,
        };
      }

      return {
        data: userShortenedLink,
        message: `List of shortened link associated to user with ID:${input.userId}`,
      };
    }),

  update: publicProcedure
    .input(CreateShortenedLinkDto)
    .mutation(async ({ ctx, input }) => {
      const id = Number(input.id);
      const userId = Number(input.userId);

      if (isNaN(id) || isNaN(userId)) {
        return {
          data: null,
          error: `Invalid ID or User ID provided.`,
        };
      }

      return await ctx.db.$transaction(async (tx) => {
        // can only update own link
        const currentShortenedLink = await tx.userShortenedLink.findUnique({
          where: {
            id: Number(input.id),
          },
        });

        if (
          currentShortenedLink == null ||
          currentShortenedLink.userId !== Number(input.userId)
        ) {
          return {
            data: null,
            error: `The shortened link with ID:${input.id} might not exist or The user with ID:${input.userId} might not be associated with it.`,
          };
        }

        const updatedShortenedLink = await tx.userShortenedLink.update({
          where: {
            id: Number(input.id),
          },
          data: {
            name: input.name,
            url: input.url,
            slug: input.slug,
          },
        });

        return {
          data: updatedShortenedLink,
          message: `update success for shortened link with the ID:${input.id}`,
        };
      });
    }),

  delete: publicProcedure
    .input(z.object({ userId: z.string(), id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const id = Number(input.id);
      const userId = Number(input.userId);

      if (isNaN(id) || isNaN(userId)) {
        return {
          data: null,
          error: `Invalid ID or User ID provided.`,
        };
      }

      // can only delete own link
      return await ctx.db.$transaction(async (tx) => {
        const currentShortenedLink = await tx.userShortenedLink.findUnique({
          where: { id },
        });

        if (
          currentShortenedLink == null ||
          currentShortenedLink.userId !== userId
        ) {
          return {
            data: null,
            error: `The shortened link with ID:${id} might not exist or the user with ID:${userId} might not be associated with it.`,
          };
        }

        await tx.userShortenedLink.delete({
          where: { id },
        });

        return {
          data: null,
          message: `Shortened link with the ID:${input.id} have successfully been deleted.`,
        };
      });
    }),
});
