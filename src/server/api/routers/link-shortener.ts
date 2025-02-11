import {
  CreateShortenedLinkDto,
  DeleteShortenedLinkBySlugDto,
  GetShortenedLinkBySlugDto,
  UpdateShortenedLinkDto,
} from '~/server/api/dto/link-shortener';
import { createTRPCRouter, trpc } from '~/server/api/trpc';
import {
  type ShortenedLink,
  type ShortenedLinkWithVisitedRecords,
} from '~/types/link-shortener';
import { type Response } from '~/types/server';

export const linkShortenerRouter = createTRPCRouter({
  create: trpc
    .input(CreateShortenedLinkDto)
    .mutation(async ({ ctx, input }): Promise<Response<ShortenedLink>> => {
      const userId = ctx.session.user?.id;
      if (!userId) {
        return {
          success: false,
          message: 'Unauthorized',
          errors: ['Session ID not found'],
        };
      }

      try {
        const existingSlug = await ctx.db.userShortenedLink.findUnique({
          where: { slug: input.slug },
        });

        if (existingSlug) {
          return {
            success: false,
            message: `The Slug "${input.slug}" is already in use. Choose a different one.`,
            errors: [`Duplicate slug: ${input.slug}`],
          };
        }

        const newShortenedLink = await ctx.db.userShortenedLink.create({
          data: {
            userId,
            name: input.name,
            url: input.url,
            slug: input.slug,
          },
        });

        return {
          success: true,
          message: `Shortened link with the slug "${input.slug}" created successfully.`,
          data: newShortenedLink,
        };
      } catch (error) {
        return {
          success: false,
          message: `Failed to create shortened link.`,
          errors: [
            error instanceof Error ? error.message : 'Something went wrong',
          ],
        };
      }
    }),

  get: trpc.query(async ({ ctx }): Promise<Response<ShortenedLink[]>> => {
    const userId = ctx.session.user?.id;
    if (!userId) {
      return {
        success: false,
        message: 'Unauthorized',
        errors: ['Session ID not found'],
      };
    }

    try {
      const userShortenedLinks = await ctx.db.userShortenedLink.findMany({
        where: { userId },
        orderBy: { editedAt: 'desc' },
      });

      return {
        success: true,
        message: 'Successfully fetched shortened links.',
        data: userShortenedLinks,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch shortened links.',
        errors: [
          error instanceof Error ? error.message : 'Something went wrong',
        ],
      };
    }
  }),

  getBySlug: trpc
    .input(GetShortenedLinkBySlugDto)
    .query(async ({ ctx, input }): Promise<Response<ShortenedLink>> => {
      const userId = ctx.session.user?.id;
      if (!userId) {
        return {
          success: false,
          message: 'Unauthorized',
          errors: ['Session ID not found'],
        };
      }

      try {
        const shortenedLink = await ctx.db.userShortenedLink.findFirst({
          where: { slug: input.slug, userId },
        });

        if (!shortenedLink) {
          return {
            success: false,
            message: `Shortened link with the slug "${input.slug}" not found.`,
            errors: ['Shortened link not found'],
          };
        }

        return {
          success: true,
          message: 'Successfully fetched shortened link.',
          data: shortenedLink,
        };
      } catch (error) {
        return {
          success: false,
          message: 'Failed to fetch shortened link.',
          errors: [
            error instanceof Error ? error.message : 'Something went wrong',
          ],
        };
      }
    }),

  getBySlugWithStats: trpc
    .input(GetShortenedLinkBySlugDto)
    .query(
      async ({
        ctx,
        input,
      }): Promise<Response<ShortenedLinkWithVisitedRecords>> => {
        const userId = ctx.session.user?.id;
        if (!userId) {
          return {
            success: false,
            message: 'Unauthorized',
            errors: ['Session ID not found'],
          };
        }

        try {
          const shortenedLink = await ctx.db.userShortenedLink.findFirst({
            where: { slug: input.slug, userId },
            include: {
              userShortenedLinkVisitedRecords: true,
            },
          });

          if (!shortenedLink) {
            return {
              success: false,
              message: `Shortened link with the slug "${input.slug}" not found.`,
              errors: ['Shortened link not found'],
            };
          }

          return {
            success: true,
            message: 'Successfully fetched shortened link.',
            data: shortenedLink,
          };
        } catch (error) {
          return {
            success: false,
            message: 'Failed to fetch shortened link.',
            errors: [
              error instanceof Error ? error.message : 'Something went wrong',
            ],
          };
        }
      },
    ),

  update: trpc
    .input(UpdateShortenedLinkDto)
    .mutation(async ({ ctx, input }): Promise<Response<ShortenedLink>> => {
      const userId = ctx.session.user?.id;
      if (!userId) {
        return {
          success: false,
          message: 'Unauthorized',
          errors: ['Session ID not found'],
        };
      }

      try {
        const existingLink = await ctx.db.userShortenedLink.findUnique({
          where: { id: input.id },
        });

        if (!existingLink || existingLink.userId !== userId) {
          return {
            success: false,
            message: `Shortened link with ID "${input.id}" not found or unauthorized.`,
            errors: ['Invalid ID or unauthorized access'],
          };
        }

        const duplicateSlug = await ctx.db.userShortenedLink.findFirst({
          where: { slug: input.slug, userId, NOT: { id: input.id } },
        });

        if (duplicateSlug) {
          return {
            success: false,
            message: `The Slug "${input.slug}" is already in use.`,
            errors: [`Duplicate slug: ${input.slug}`],
          };
        }

        const updatedShortenedLink = await ctx.db.userShortenedLink.update({
          where: { id: input.id },
          data: {
            name: input.name,
            slug: input.slug,
            url: input.url,
            editedAt: new Date(),
          },
        });

        return {
          success: true,
          message: `Shortened link updated successfully.`,
          data: updatedShortenedLink,
        };
      } catch (error) {
        return {
          success: false,
          message: 'Failed to update shortened link.',
          errors: [
            error instanceof Error ? error.message : 'Something went wrong',
          ],
        };
      }
    }),

  deleteBySlug: trpc
    .input(DeleteShortenedLinkBySlugDto)
    .mutation(async ({ ctx, input }): Promise<Response<null>> => {
      const userId = ctx.session.user?.id;
      if (!userId) {
        return {
          success: false,
          message: 'Unauthorized',
          errors: ['Session ID not found'],
        };
      }

      try {
        const existingLink = await ctx.db.userShortenedLink.findFirst({
          where: { slug: input.slug, userId },
        });

        if (!existingLink) {
          return {
            success: false,
            message: `Shortened link with the slug "${input.slug}" not found or unauthorized.`,
            errors: ['Invalid slug or unauthorized access'],
          };
        }

        await ctx.db.userShortenedLink.delete({
          where: { id: existingLink.id },
        });

        return {
          success: true,
          message: `Shortened link deleted successfully.`,
          data: null,
        };
      } catch (error) {
        return {
          success: false,
          message: 'Failed to delete shortened link.',
          errors: [
            error instanceof Error ? error.message : 'Something went wrong',
          ],
        };
      }
    }),
});
