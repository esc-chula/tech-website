import { type GithubMemberProps } from "@/types/about";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
// import { TRPCError } from "@trpc/server";

export const aboutRouter = createTRPCRouter({
  get: publicProcedure.query(async () => {
    const response = await fetch(
      `https://api.github.com/orgs/esc-chula/public_members?per_page=200`,
    );

    if (!response.ok) {
      return {
        data: null,
        message: "Error : Can't get ESC members",
      };
    }

    const data: GithubMemberProps[] =
      (await response.json()) as GithubMemberProps[];
    return {
      data,
      message: "Successfully get ESC members",
    };
  }),
});
