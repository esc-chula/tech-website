import { type StudentLoginResponse } from '~/generated/intania/auth/account/v1/account';
import { type Student } from '~/generated/intania/auth/student/v1/student';
import { createTRPCRouter, trpc } from '~/server/api/trpc';
import { grpc } from '~/server/auth/grpc';
import { type Response } from '~/types/server';

import { LoginDto } from '../dto/auth';

export const authRouter = createTRPCRouter({
  login: trpc
    .input(LoginDto)
    .query(async ({ ctx, input }): Promise<Response<StudentLoginResponse>> => {
      let response: StudentLoginResponse;

      try {
        response = await grpc.account.studentLogin({
          username: input.username,
          password: input.password,
          verifyWithLdap: true,
        });
      } catch (error) {
        return {
          success: false,
          message: 'Authentication failed, username or password is incorrect',
          errors: [
            error instanceof Error
              ? error.message
              : 'Something went wrong logging in with GRPC',
          ],
        };
      }

      const res = await ctx.db.$transaction(async (tx) => {
        try {
          if (!response.account || !response.student?.studentId) {
            return {
              data: null,
              message: 'Only students are allowed to login',
              errors: [
                'response.account or response.student.studentId is missing',
              ],
            };
          }

          const user = await tx.user.findUnique({
            where: {
              oidcId: response.account.publicId,
            },
          });

          if (user) {
            return {
              data: null,
              message: 'Successfully logged in',
            };
          }

          await tx.user.create({
            data: {
              oidcId: response.account.publicId,
              studentId: response.student.studentId,
            },
          });

          return {
            data: null,
            message: `Successfully created user for ${response.account.publicId}`,
          };
        } catch (error) {
          return {
            data: null,
            message: `Failed to login, please try again`,
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
        message: 'Successfully logged in',
        data: response,
      };
    }),

  me: trpc.query(({ ctx }): Response<Student> => {
    if (!ctx.session.user) {
      return {
        success: false,
        message: 'Unauthorized',
        errors: ['Session ID not found'],
      };
    }

    const userData = ctx.session.user;

    return {
      success: true,
      message: 'Successfully retrieved user data',
      data: userData,
    };
  }),
});
