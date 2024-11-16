import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { grpc } from "@/server/auth/grpc";
import {
  type MeResponse,
  type StudentLoginResponse,
} from "@/generated/intania/auth/account/v1/account";
import { TRPCError } from "@trpc/server";
import { type Response } from "@/types/server";

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .query(async ({ input }): Promise<Response<StudentLoginResponse>> => {
      try {
        const response = await grpc.account.studentLogin({
          username: input.username,
          password: input.password,
          verifyWithLdap: true,
        });

        return {
          success: true,
          message: "Login successful",
          data: response,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            error instanceof Error ? error.message : "Something went wrong",
        });
      }
    }),

  me: protectedProcedure.query(
    async ({ ctx }): Promise<Response<MeResponse>> => {
      try {
        const sessionId = ctx.session?.id;
        if (!sessionId) {
          return {
            success: false,
            errors: ["Session not found"],
          };
        }

        const response = await grpc.account.me({
          sessionId,
        });

        return {
          success: true,
          message: "User data retrieved",
          data: response,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            error instanceof Error ? error.message : "Something went wrong",
        });
      }
    },
  ),
});
