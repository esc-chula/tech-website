import { type GithubMemberProps } from "@/components/about/member-section";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
// import { TRPCError } from "@trpc/server";

export const aboutMemberRouter = createTRPCRouter({
  get: publicProcedure.query(async () => {
    const response = await fetch(
      `https://api.github.com/orgs/esc-chula/public_members?per_page=200`,
    );

    // if (!response.ok) {
    //   throw new TRPCError({
    //     code: 'INTERNAL_SERVER_ERROR',
    //     message: 'Failed to fetch GitHub members',
    //   });
    // }

    const data: GithubMemberProps[] =
      (await response.json()) as GithubMemberProps[];
    return data;
  }),
});
