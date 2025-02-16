import { z } from 'zod'

import { CreateQrCodeDto, UpdateQrCodeDto } from '~/server/api/dto/qr-code'
import { createTRPCRouter, trpc } from '~/server/api/trpc'
import { type QrCode } from '~/types/qr-code'
import { type Response } from '~/types/server'

export const qrCodeRouter = createTRPCRouter({
  create: trpc
    .input(CreateQrCodeDto)
    .mutation(async ({ ctx, input }): Promise<Response<QrCode>> => {
      const userId = ctx.session.user?.id
      if (!userId) {
        return {
          success: false,
          message: 'Unauthorized',
          errors: ['Session ID not found'],
        }
      }

      const res = await ctx.db.$transaction(async (tx) => {
        try {
          const existingQrCode = await tx.userQrCode.findFirst({
            where: {
              name: input.name,
              userId: Number(userId),
            },
          })

          if (existingQrCode) {
            return {
              message: `The QR Code with ${input.name} have already been used. Please use a different name.`,
              error: 'The QR Code name already exists',
            }
          }

          const newQrCode: QrCode = await tx.userQrCode.create({
            data: {
              name: input.name,
              url: input.url,
              qrCode: input.qrCode,
              color: input.color,
              logo: input.logo,
              userId: Number(userId),
            },
          })

          await tx.user.update({
            where: {
              id: userId,
            },
            data: {
              userQrCodes: {
                connect: { id: newQrCode.id },
              },
            },
          })

          return {
            message: `The QR Code with name ${input.name} have been successfully created.`,
            data: newQrCode,
          }
        } catch (error) {
          return {
            data: null,
            message: `Failed to create QR Code with name ${input.name}`,
            error:
              error instanceof Error ? error.message : 'Something went wrong',
          }
        }
      })

      if (res.error ?? !res.data) {
        return {
          success: false,
          message: res.message,
          errors: [res.error],
        }
      }

      return {
        success: true,
        message: res.message,
        data: res.data,
      }
    }),

  get: trpc.query(async ({ ctx }): Promise<Response<QrCode[]>> => {
    const userId = ctx.session.user?.id
    if (!userId) {
      return {
        success: false,
        message: 'Unauthorized',
        errors: ['Session ID not found'],
      }
    }

    const res = await ctx.db.$transaction(async (tx) => {
      try {
        const qrCode = await tx.userQrCode.findMany({
          where: {
            userId: Number(userId),
          },
          orderBy: {
            editedAt: 'desc',
          },
        })

        return {
          data: qrCode,
          message: `Successfully fetched QR Codes`,
        }
      } catch (error) {
        return {
          data: null,
          message: `Failed to fetch QR Codes`,
          error:
            error instanceof Error ? error.message : 'Something went wrong',
        }
      }
    })

    if (res.error ?? !res.data) {
      return {
        success: false,
        message: res.message,
        errors: [res.error],
      }
    }

    return {
      success: true,
      message: res.message,
      data: res.data,
    }
  }),

  update: trpc
    .input(UpdateQrCodeDto)
    .mutation(async ({ ctx, input }): Promise<Response<QrCode>> => {
      const userId = ctx.session.user?.id
      if (!userId) {
        return {
          success: false,
          message: 'Unauthorized',
          errors: ['Session ID not found'],
        }
      }
      const { id, ...inputWithoutId } = input

      const res = await ctx.db.$transaction(async (tx) => {
        try {
          const currentQrCode = await tx.userQrCode.findFirst({
            where: {
              id: Number(id),
              userId,
            },
          })

          if (!currentQrCode) {
            return {
              data: null,
              message: `The QR Code might not exist or The user with ID:${userId} might not be associated with it.`,
              error: 'Invalid QR Code ID or User ID provided.',
            }
          }

          const existingQrCode = await tx.userQrCode.findFirst({
            where: {
              name: input.name,
              userId: Number(userId),
              NOT: {
                id: Number(id),
              },
            },
          })

          if (existingQrCode) {
            return {
              message: `The QR Code with ${input.name} have already been used. Please use a different name.`,
              error: 'The QR Code name already exists',
            }
          }

          const updateQrCode = await tx.userQrCode.update({
            where: {
              id: Number(id),
              userId,
            },
            data: {
              ...inputWithoutId,
              userId: Number(userId),
              editedAt: new Date(),
            },
          })

          return {
            message: `The QR Code have successfully been updated.`,
            data: updateQrCode,
          }
        } catch (error) {
          return {
            data: null,
            message: `Failed to update QR Code`,
            error:
              error instanceof Error ? error.message : 'Something went wrong',
          }
        }
      })

      if (res.error ?? !res.data) {
        return {
          success: false,
          message: res.message,
          errors: [res.error],
        }
      }

      return {
        success: true,
        message: res.message,
        data: res.data,
      }
    }),

  delete: trpc
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user?.id
      if (!userId) {
        return {
          success: false,
          message: 'Unauthorized',
          errors: ['Session ID not found'],
        }
      }

      const res = await ctx.db.$transaction(async (tx) => {
        try {
          const currentQrCode = await tx.userQrCode.findFirst({
            where: {
              id: Number(input.id),
              userId,
            },
          })

          if (!currentQrCode) {
            return {
              message: `The QR Code might not exist or The user with ID:${userId} might not be associated with it.`,
              error: 'Invalid QR Code ID or User ID provided.',
            }
          }

          await tx.userQrCode.delete({
            where: {
              id: Number(input.id),
              userId,
            },
          })

          return {
            message: `The QR Code have successfully been deleted.`,
            data: null,
          }
        } catch (error) {
          return {
            data: null,
            message: `Failed to delete QR Code`,
            error:
              error instanceof Error ? error.message : 'Something went wrong',
          }
        }
      })

      if (res.error) {
        return {
          success: false,
          message: res.message,
          errors: [res.error],
        }
      }

      return {
        success: true,
        message: res.message,
        data: null,
      }
    }),
})
