import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { type QRcodeInterface, CreateQRCodeInput } from "@/types/qrcode";

export const postRouter = createTRPCRouter({
  create: publicProcedure
    .input(CreateQRCodeInput)
    .mutation(async ({ ctx, input }) => {
      const newQRCode: QRcodeInterface = await ctx.db.userQrCode.create({
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
        message: `Created QRcode for ID ${input.userId}`,
        data: newQRCode,
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

      if (qrCode == null) {
        return {
          message: `No QR code found for ID ${input.userId}`,
          data: null,
        };
      }

      return {
        message: `Updated for ID ${input.userId}`,
        data: qrCode,
      };
    }),

  update: publicProcedure
    .input(CreateQRCodeInput)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.userQrCode.findFirst({
        where: {
          userId: Number(input.userId),
        },
      });
      const newQRCode = await ctx.db.userQrCode.update({
        where: {
          id: Number(user?.id),
        },
        data: {
          ...input,
          userId: Number(input.userId),
          editedAt: new Date(),
        },
      });

      return {
        message: `Updated QRCode for ${user?.id}`,
        data: newQRCode,
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

      await ctx.db.userQrCode.delete({
        where: {
          id: Number(user?.id),
        },
      });

      return {
        message: `Deleted QRCode for ${input.userId}`,
      };
    }),
});
