import { RoleCheckDto } from '~/server/api/dto/role';
import { createTRPCRouter, trpc } from '~/server/api/trpc';
import { type Response } from '~/types/server';

export const roleRouter = createTRPCRouter({
  check: trpc
    .input(RoleCheckDto)
    .mutation(async ({ ctx, input }): Promise<Response<boolean>> => {
      const userId = ctx.session.user?.id;
      if (!userId) {
        return {
          success: false,
          message: 'Unauthorized',
          errors: ['Session ID not found'],
        };
      }

      try {
        const isAuthorized = await ctx.db.userServiceRole.findFirst({
          where: {
            userId,
            appId: input.appId,
            role: input.role,
          },
        });

        return {
          success: true,
          message: `Successfully checked role for user ${userId}`,
          data: Boolean(isAuthorized),
        };
      } catch (error) {
        return {
          success: false,
          message: `Failed to check role for user ${userId}`,
          errors: [
            error instanceof Error ? error.message : 'Something went wrong',
          ],
        };
      }
    }),
});
