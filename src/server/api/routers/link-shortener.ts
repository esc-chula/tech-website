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

      const res = await ctx.db.$transaction(async (tx) => {
        try {
          const shortenedLinkWithSameSlug =
            await tx.userShortenedLink.findUnique({
              where: {
                slug: input.slug,
              },
            });
          if (shortenedLinkWithSameSlug) {
            return {
              data: null,
              message: `The Slug "${input.slug}" have already been used. Please choose a different slug.`,
              error: `Duplicate slug: ${input.slug}`,
            };
          }

          const newShortenedLink = await tx.userShortenedLink.create({
            data: {
              userId,
              name: input.name,
              url: input.url,
              slug: input.slug,
            },
          });

          return {
            data: newShortenedLink,
            message: `Shortened link with the slug "${input.slug}" have successfully been created.`,
          };
        } catch (error) {
          return {
            data: null,
            message: `Failed to create shortened link with the slug "${input.slug}"`,
            error:
              error instanceof Error ? error.message : 'Something went wrong',
          };
        }
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

  get: trpc.query(async ({ ctx }): Promise<Response<ShortenedLink[]>> => {
    const userId = ctx.session.user?.id;
    if (!userId) {
      return {
        success: false,
        message: 'Unauthorized',
        errors: ['Session ID not found'],
      };
    }

    const res = await ctx.db.$transaction(async (tx) => {
      try {
        const userShortenedLink = await tx.userShortenedLink.findMany({
          where: {
            userId,
          },
          orderBy: {
            editedAt: 'desc',
          },
        });

        return {
          data: userShortenedLink,
          message: `Successfully fetched shortened links`,
        };
      } catch (error) {
        return {
          data: null,
          message: `Failed to fetch shortened links`,
          error:
            error instanceof Error
              ? error.message
              : 'Something went wrong fetching shortened links',
        };
      }
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

      const res = await ctx.db.$transaction(async (tx) => {
        try {
          const shortenedLink = await tx.userShortenedLink.findFirst({
            where: {
              slug: input.slug,
              userId,
            },
          });

          if (!shortenedLink) {
            return {
              data: null,
              message: `Shortened link with the slug "${input.slug}" not found`,
              error: 'Shortened link not found',
            };
          }

          return {
            data: shortenedLink,
            message: `Successfully fetched shortened link with the slug "${input.slug}"`,
          };
        } catch (error) {
          return {
            data: null,
            message: `Failed to fetch shortened link with the slug "${input.slug}"`,
            error:
              error instanceof Error
                ? error.message
                : 'Something went wrong fetching shortened link',
          };
        }
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

        const res = await ctx.db.$transaction(async (tx) => {
          try {
            const shortenedLink = await tx.userShortenedLink.findFirst({
              where: {
                slug: input.slug,
                userId,
              },
              include: {
                userShortenedLinkVisitedRecords: true,
              },
            });

            if (!shortenedLink) {
              return {
                data: null,
                message: `Shortened link with the slug "${input.slug}" not found`,
                error: 'Shortened link not found',
              };
            }

            return {
              data: shortenedLink,
              message: `Successfully fetched shortened link with the slug "${input.slug}"`,
            };
          } catch (error) {
            return {
              data: null,
              message: `Failed to fetch shortened link with the slug "${input.slug}"`,
              error:
                error instanceof Error
                  ? error.message
                  : 'Something went wrong fetching shortened link',
            };
          }
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

      const res = await ctx.db.$transaction(async (tx) => {
        try {
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
              message: `The shortened link with slug "${input.slug}" might not exist or The user might not be associated with it.`,
              error: `Invalid ID or User ID provided.`,
            };
          }

          const existedShortenedLinkWithSameSlug =
            await tx.userShortenedLink.findFirst({
              where: {
                slug: input.slug,
                userId,
                NOT: {
                  id: input.id,
                },
              },
            });

          if (existedShortenedLinkWithSameSlug) {
            return {
              data: null,
              message: `The Slug "${input.slug}" have already been used. Please choose a different slug.`,
              error: `Duplicate slug: ${input.slug}`,
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
              editedAt: new Date(),
            },
          });

          return {
            data: updatedShortenedLink,
            message: `Shortened link with the ID:${input.id} have successfully been updated.`,
          };
        } catch (error) {
          return {
            data: null,
            message: `Failed to update shortened link with the slug "${input.slug}"`,
            error:
              error instanceof Error ? error.message : 'Something went wrong',
          };
        }
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

      const res = await ctx.db.$transaction(async (tx) => {
        try {
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
        } catch (error) {
          return {
            data: null,
            message: `Failed to delete shortened link with the slug "${input.slug}"`,
            error:
              error instanceof Error ? error.message : 'Something went wrong',
          };
        }
      });

      if (res.error) {
        return {
          success: false,
          message: res.message,
          errors: [res.error],
        };
      }

      return {
        success: true,
        message: res.message,
        data: null,
      };
    }),
});
