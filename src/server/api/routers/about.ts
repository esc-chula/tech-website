import { createTRPCRouter, trpc } from '~/server/api/trpc';
import { type GithubMember } from '~/types/about';
import { type Response } from '~/types/server';

export const aboutRouter = createTRPCRouter({
  getMembers: trpc.query(async (): Promise<Response<GithubMember[]>> => {
    try {
      const response = await fetch(
        `https://api.github.com/orgs/esc-chula/public_members?per_page=200`,
      );

      if (!response.ok) {
        throw new Error('Fetch failed');
      }

      const data = (await response.json()) as GithubMember[];

      return {
        success: true,
        message: 'Successfully fetched members',
        data,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch members from Github',
        errors: [
          error instanceof Error ? error.message : 'Something went wrong',
        ],
      };
    }
  }),
});
