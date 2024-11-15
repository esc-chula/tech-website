import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { grpc } from "@/server/grpc";
import { type StudentLoginResponse } from "@/generated/intania/auth/account/v1/account";

type Response<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      errors: string[];
    };
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
          data: response,
        };
      } catch (error) {
        return {
          success: false,
          errors: [
            error instanceof Error ? error.message : "Something went wrong",
          ],
        };
      }
    }),

  // create: publicProcedure
  //   .input(z.object({ name: z.string().min(1) }))
  //   .mutation(async ({ ctx, input }) => {
  //     return ctx.db.post.create({
  //       data: {
  //         name: input.name,
  //       },
  //     });
  //   }),

  // getLatest: publicProcedure.query(async ({ ctx }) => {
  //   const post = await ctx.db.post.findFirst({
  //     orderBy: { createdAt: "desc" },
  //   });

  //   return post ?? null;
  // }),
});
