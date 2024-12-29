import { z } from 'zod';

import { CreateQrCodeDto } from '~/server/api/dto/qr-code';
import { createTRPCRouter, trpc } from '~/server/api/trpc';
import { type QRcode } from '~/types/qr-code';

export const qrCodeRouter = createTRPCRouter({
  create: trpc.input(CreateQrCodeDto).mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user?.id;
    if (!userId) {
      return {
        success: false,
        message: 'Unauthorized',
        errors: ['Session ID not found'],
      };
    }

    const newQrCode: QRcode = await ctx.db.userQrCode.create({
      data: {
        name: input.name,
        url: input.url,
        qrCode: input.qrCode,
        color: input.color,
        logo: input.logo,
        userId: Number(userId),
      },
    });

    await ctx.db.user.update({
      where: {
        id: userId,
      },
      data: {
        userQrCodes: {
          connect: { id: newQrCode.id },
        },
      },
    });
    return {
      data: newQrCode,
      message: `Created QRcode for ID ${input.userId}`,
    };
  }),

  get: trpc
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const qrCode = await ctx.db.userQrCode.findMany({
        where: {
          userId: Number(input.userId),
        },
      });

      if (qrCode.length === 0) {
        return {
          data: null,
          error: `No QR code found for ID ${input.userId}`,
        };
      }

      return {
        data: qrCode,
        message: `QRcodes for ID ${input.userId}`,
      };
    }),

  update: trpc.input(CreateQrCodeDto).mutation(async ({ ctx, input }) => {
    const { id, ...inputWithoutId } = input;
    const newQrCode = await ctx.db.userQrCode.update({
      where: {
        id: Number(id),
      },
      data: {
        ...inputWithoutId,
        userId: Number(input.userId),
        editedAt: new Date(),
      },
    });

    return {
      data: newQrCode,
      message: `Updated QrCode for ID ${input.userId}`,
    };
  }),

  delete: trpc
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.userQrCode.delete({
        where: {
          id: Number(input.id),
        },
      });

      return {
        message: `Deleted QrCode for ${input.id}`,
      };
    }),
});
