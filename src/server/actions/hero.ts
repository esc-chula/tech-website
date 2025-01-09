'use server';

import { readItems } from '@directus/sdk';

import directus from '~/lib/directus';
import { type Slide } from '~/types/hero';
import { type Response } from '~/types/server';

export async function getCarousel(): Promise<Response<Slide[]>> {
  try {
    const projects = await directus.request(
      readItems('Tech_web_home_carousel' as never),
    );

    return {
      success: true,
      message: 'Successfully fetched slides',
      data: projects as never as Slide[],
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to fetch slides',
      errors: [error instanceof Error ? error.message : 'Unknown error'],
    };
  }
}
