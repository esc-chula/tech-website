import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { type QRcode } from "@/types/qr-code";
import { CreateQrCodeDto } from "@/server/api/dto/qr-code";

export const qrCodeRouter = createTRPCRouter({
  create: publicProcedure
    .input(CreateQrCodeDto)
    .mutation(async ({ ctx, input }) => {
      const newQrCode: QRcode = await ctx.db.userQrCode.create({
        data: {
          name: input.name,
          url: input.url,
          qrCode: input.qrCode,
          color: input.color,
          logo: input.logo,
          userId: Number(input.userId),
        },
      });
      return {
        data: newQrCode,
        message: `Created QRcode for ID ${input.userId}`,
      };
    }),

  get: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const qrCode = await ctx.db.userQrCode.findFirst({
        where: {
          userId: Number(input.userId),
        },
      });

      if (qrCode === null) {
        return {
          data: null,
          error: `No QR code found for ID ${input.userId}`,
        };
      }

      return {
        data: qrCode,
        message: `Updated for ID ${input.userId}`,
      };
    }),

  update: publicProcedure
    .input(CreateQrCodeDto)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.userQrCode.findFirst({
        where: {
          userId: Number(input.userId),
        },
      });
      const newQrCode = await ctx.db.userQrCode.update({
        where: {
          id: Number(user?.id),
        },
        data: {
          ...input,
          userId: Number(input.userId),
          editedAt: new Date(),
        },
      });
      if (newQrCode === null) {
        return {
          data: null,
          error: `No QR code found for ID ${input.userId}`,
        };
      }

      return {
        data: newQrCode,
        message: `Updated QrCode for ${user?.id}`,
      };
    }),

  delete: publicProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.userQrCode.findFirst({
        where: {
          userId: Number(input.userId),
        },
      });
      if (user === null) {
        return {
          data: null,
          error: `No Qr code found for ID ${input.userId}`,
        };
      }

      await ctx.db.userQrCode.delete({
        where: {
          id: Number(user?.id),
        },
      });

      return {
        data: user,
        message: `Deleted QrCode for ${input.userId}`,
      };
    }),
});
