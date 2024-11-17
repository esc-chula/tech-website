import {
  CreateShortenedLinkDto,
  DeleteShortenedLinkDto,
  GetShortenedLinkBySlugDto,
  UpdateShortenedLinkDto,
} from '~/server/api/dto/link-shortener';
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc';
import { type ShortenedLink } from '~/types/link-shortener';
import { type Response } from '~/types/server';

export const linkShortenerRouter = createTRPCRouter({
  create: protectedProcedure
    .input(CreateShortenedLinkDto)
    .mutation(async ({ ctx, input }): Promise<Response<ShortenedLink>> => {
      const userId = ctx.session.user?.id;
      if (!userId) {
        throw new Error('Unauthorized');
      }

      const res = await ctx.db.$transaction(async (tx) => {
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
            message: `The Slug "${input.slug}" have already been used. Please choose a different slug.`,
            error: `Duplicate slug: ${input.slug}`,
          };
        }

        const newShortenedLink: ShortenedLink =
          await tx.userShortenedLink.create({
            data: {
              userId,
              name: input.name,
              url: input.url,
              slug: input.slug,
            },
          });
        return {
          data: newShortenedLink,
          message: `Shortened link with the ID:${newShortenedLink.id} have successfully been created.`,
        };
      });

      if (res.error ?? !res.data) {
        return {
          success: false,
          message: res.message,
          errors: [res.error],
        };
      }

      return {
        success: true,
        message: res.message,
        data: res.data,
      };
    }),

  get: protectedProcedure.query(
    async ({ ctx }): Promise<Response<ShortenedLink[]>> => {
      try {
        const userId = ctx.session.user?.id;
        if (!userId) {
          throw new Error('Unauthorized');
        }

        const userShortenedLink = await ctx.db.userShortenedLink
          .findMany({
            where: {
              userId,
            },
          })
          .catch((error: unknown) => {
            throw new Error(
              error instanceof Error
                ? error.message
                : 'Something went wrong fetching shortened links',
            );
          });

        return {
          success: true,
          message: 'Successfully fetched shortened links',
          data: userShortenedLink,
        };
      } catch (error) {
        return {
          success: false,
          message: 'Failed to fetch shortened links',
          errors: [
            error instanceof Error ? error.message : 'Something went wrong',
          ],
        };
      }
    },
  ),

  getBySlug: protectedProcedure
    .input(GetShortenedLinkBySlugDto)
    .query(async ({ ctx, input }) => {
      try {
        const userId = ctx.session.user?.id;
        if (!userId) {
          throw new Error('Unauthorized');
        }

        const shortenedLink = await ctx.db.userShortenedLink
          .findFirst({
            where: {
              slug: input.slug,
              userId,
            },
          })
          .catch((error: unknown) => {
            throw new Error(
              error instanceof Error
                ? error.message
                : 'Something went wrong fetching shortened link',
            );
          });

        if (!shortenedLink) {
          return {
            success: false,
            message: `Shortened link with the slug "${input.slug}" not found`,
            errors: ['Shortened link not found'],
          };
        }

        return {
          success: true,
          message: `Successfully fetched shortened link with the slug "${input.slug}"`,
          data: shortenedLink,
        };
      } catch (error) {
        return {
          success: false,
          message: 'Failed to fetch shortened link',
          errors: [
            error instanceof Error ? error.message : 'Something went wrong',
          ],
        };
      }
    }),

  getBySlugWithStats: protectedProcedure
    .input(GetShortenedLinkBySlugDto)
    .query(async ({ ctx, input }) => {
      try {
        const userId = ctx.session.user?.id;
        if (!userId) {
          throw new Error('Unauthorized');
        }

        const shortenedLink = await ctx.db.userShortenedLink
          .findFirst({
            where: {
              slug: input.slug,
              userId,
            },
            include: {
              userShortenedLinkVisitedRecords: true,
            },
          })
          .catch((error: unknown) => {
            throw new Error(
              error instanceof Error
                ? error.message
                : 'Something went wrong fetching shortened link',
            );
          });

        if (!shortenedLink) {
          return {
            success: false,
            message: `Shortened link with the slug "${input.slug}" not found`,
            errors: ['Shortened link not found'],
          };
        }

        return {
          success: true,
          message: `Successfully fetched shortened link with the slug "${input.slug}"`,
          data: shortenedLink,
        };
      } catch (error) {
        return {
          success: false,
          message: 'Failed to fetch shortened link',
          errors: [
            error instanceof Error ? error.message : 'Something went wrong',
          ],
        };
      }
    }),

  update: protectedProcedure
    .input(UpdateShortenedLinkDto)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user?.id;
      if (!userId) {
        throw new Error('Unauthorized');
      }

      const res = await ctx.db.$transaction(async (tx) => {
        const currentShortenedLink = await tx.userShortenedLink.findUnique({
          where: {
            id: input.id,
          },
        });

        if (
          currentShortenedLink === null ||
          currentShortenedLink.userId !== userId
        ) {
          return {
            data: null,
            message: `The shortened link with ID:${input.id} might not exist or The user with ID:${userId} might not be associated with it.`,
            error: `Invalid ID or User ID provided.`,
          };
        }

        const updatedShortenedLink = await tx.userShortenedLink.update({
          where: {
            id: input.id,
          },
          data: {
            name: input.name,
            slug: input.slug,
            url: input.url,
          },
        });

        return {
          data: updatedShortenedLink,
          message: `Shortened link with the ID:${input.id} have successfully been updated.`,
        };
      });

      if (res.error ?? !res.data) {
        return {
          success: false,
          message: res.message,
          errors: [res.error],
        };
      }

      return {
        success: true,
        message: res.message,
        data: res.data,
      };
    }),

  delete: protectedProcedure
    .input(DeleteShortenedLinkDto)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user?.id;
      if (!userId) {
        throw new Error('Unauthorized');
      }

      const res = await ctx.db.$transaction(async (tx) => {
        const currentShortenedLink = await tx.userShortenedLink.findUnique({
          where: { id: input.id },
        });

        if (
          currentShortenedLink === null ||
          currentShortenedLink.userId !== userId
        ) {
          return {
            data: null,
            message: `The shortened link with ID:${input.id} might not exist or The user with ID:${userId} might not be associated with it.`,
            error: `Invalid ID or User ID provided.`,
          };
        }

        await tx.userShortenedLink.delete({
          where: {
            id: input.id,
          },
        });

        return {
          data: null,
          message: `Shortened link with the ID:${input.id} have successfully been deleted.`,
        };
      });

      if (res.error ?? !res.data) {
        return {
          success: false,
          message: res.message,
          errors: [res.error],
        };
      }

      return {
        success: true,
        message: res.message,
        data: res.data,
      };
    }),

  deleteBySlug: protectedProcedure
    .input(GetShortenedLinkBySlugDto)
    .mutation(async ({ ctx, input }): Promise<Response<null>> => {
      const userId = ctx.session.user?.id;
      if (!userId) {
        throw new Error('Unauthorized');
      }

      const res = await ctx.db.$transaction(async (tx) => {
        const currentShortenedLink = await tx.userShortenedLink.findFirst({
          where: {
            slug: input.slug,
            userId,
          },
        });

        if (!currentShortenedLink) {
          return {
            data: null,
            message: `The shortened link with the slug "${input.slug}" might not exist or The user with ID:${userId} might not be associated with it.`,
            error: `Invalid slug or User ID provided.`,
          };
        }

        await tx.userShortenedLink.delete({
          where: {
            id: currentShortenedLink.id,
          },
        });

        return {
          data: null,
          message: `Shortened link with the slug "${input.slug}" have successfully been deleted.`,
        };
      });

      if (res.error ?? !res.data) {
        return {
          success: false,
          message: res.message,
          errors: [res.error ?? 'Failed to delete shortened link'],
        };
      }

      return {
        success: true,
        message: res.message,
        data: null,
      };
    }),
});
