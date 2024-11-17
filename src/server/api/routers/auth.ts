import { z } from 'zod';

import { type StudentLoginResponse } from '~/generated/intania/auth/account/v1/account';
import { type Student } from '~/generated/intania/auth/student/v1/student';
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '~/server/api/trpc';
import { grpc } from '~/server/auth/grpc';
import { type Response } from '~/types/server';

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .query(async ({ ctx, input }): Promise<Response<StudentLoginResponse>> => {
      try {
        const response = await grpc.account
          .studentLogin({
            username: input.username,
            password: input.password,
            verifyWithLdap: true,
          })
          .catch((error: unknown) => {
            throw new Error(
              error instanceof Error
                ? error.message
                : 'Something went wrong logging in',
            );
          });

        if (!response.account || !response.student?.studentId) {
          throw new Error('Authorized only for students');
        }

        const user = await ctx.db.user.findUnique({
          where: {
            oidcId: response.account.publicId,
          },
        });

        if (user) {
          return {
            success: true,
            message: 'Login successful',
            data: response,
          };
        }

        await ctx.db.user
          .create({
            data: {
              oidcId: response.account.publicId,
              studentId: response.student.studentId,
            },
          })
          .catch((error: unknown) => {
            throw new Error(
              error instanceof Error
                ? error.message
                : 'Something went wrong creating user',
            );
          });

        return {
          success: true,
          message: 'Login successful',
          data: response,
        };
      } catch (error) {
        return {
          success: false,
          message: 'Failed to login',
          errors: [
            error instanceof Error ? error.message : 'Something went wrong',
          ],
        };
      }
    }),

  me: protectedProcedure.query(({ ctx }): Response<Student> => {
    try {
      if (!ctx.session.user) {
        throw new Error('Unauthorized');
      }

      const userData = ctx.session.user;

      return {
        success: true,
        message: 'User data retrieved',
        data: userData,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to get user data',
        errors: [
          error instanceof Error ? error.message : 'Something went wrong',
        ],
      };
    }
  }),
});
