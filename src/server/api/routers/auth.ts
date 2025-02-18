import { type StudentLoginResponse } from '~/generated/intania/auth/account/v1/account'
import { type Student } from '~/generated/intania/auth/student/v1/student'
import { createTRPCRouter, trpc } from '~/server/api/trpc'
import { grpc } from '~/server/auth/grpc'
import { type Session } from '~/types/auth'
import { type Response } from '~/types/server'

import { LoginDto, MeDto } from '../dto/auth'

export const authRouter = createTRPCRouter({
  login: trpc
    .input(LoginDto)
    .query(async ({ ctx, input }): Promise<Response<StudentLoginResponse>> => {
      let response: StudentLoginResponse

      try {
        response = await grpc.account.studentLogin({
          username: input.username,
          password: input.password,
          verifyWithLdap: true,
        })
      } catch (error) {
        return {
          success: false,
          message: 'Authentication failed, username or password is incorrect',
          errors: [
            error instanceof Error
              ? error.message
              : 'Something went wrong logging in with GRPC',
          ],
        }
      }

      if (!response.account || !response.student?.studentId) {
        return {
          success: false,
          message: 'Only students are allowed to login',
          errors: ['response.account or response.student.studentId is missing'],
        }
      }

      try {
        const user = await ctx.db.user.findFirst({
          where: {
            OR: [
              {
                studentId: response.student.studentId,
              },
              {
                oidcId: response.account.publicId,
              },
            ],
          },
        })

        if (user) {
          if (!user.oidcId) {
            await ctx.db.user.update({
              where: {
                id: user.id,
              },
              data: {
                oidcId: response.account.publicId,
              },
            })
          }

          return {
            success: true,
            message: 'Successfully logged in',
            data: response,
          }
        }

        await ctx.db.user.create({
          data: {
            oidcId: response.account.publicId,
            studentId: response.student.studentId,
          },
        })

        return {
          success: true,
          message: `Successfully created user for ${response.account.publicId}`,
          data: response,
        }
      } catch (error) {
        return {
          success: false,
          message: 'Failed to login with user creation',
          errors: [
            error instanceof Error
              ? error.message
              : 'Something went wrong creating user',
          ],
        }
      }
    }),

  me: trpc
    .input(MeDto)
    .query(async ({ ctx, input }): Promise<Response<Student>> => {
      if (!ctx.session.user) {
        return {
          success: false,
          message: 'Unauthorized',
          errors: ['Session ID not found'],
        }
      }

      try {
        const res = await grpc.account.me({
          sessionId: input.sessionId,
        })

        if (!res.student) {
          return {
            success: false,
            message: 'Failed to retrieve user data',
            errors: ['Student data not found'],
          }
        }

        return {
          success: true,
          message: 'Successfully retrieved user data',
          data: res.student,
        }
      } catch (error) {
        return {
          success: false,
          message: 'Failed to retrieve user data',
          errors: [
            error instanceof Error
              ? error.message
              : 'Something went wrong retrieving user data',
          ],
        }
      }
    }),

  getSession: trpc.query(({ ctx }): Response<Session> => {
    if (!ctx.session.user) {
      return {
        success: false,
        message: 'Unauthorized',
        errors: ['Session ID not found'],
      }
    }

    const userData = ctx.session.user

    return {
      success: true,
      message: 'Successfully retrieved user data',
      data: userData,
    }
  }),
})
