'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import { api } from '~/trpc/server';
import { type ShortenedLink } from '~/types/link-shortener';
import { type Response } from '~/types/server';

export async function createShortenedLink({
  name,
  slug,
  url,
}: {
  name: string;
  slug: string;
  url: string;
}): Promise<Response<ShortenedLink>> {
  try {
    const cookieStore = cookies();
    const sid = cookieStore.get('sid')?.value;
    if (!sid) {
      return {
        success: false,
        message: 'Unauthorized',
        errors: ['Session ID not found'],
      };
    }

    const res = await api.linkShortener.create({
      name,
      slug,
      url,
    });

    if (!res.success) {
      return {
        success: false,
        message: res.message ?? 'Failed to create shortened link',
        errors: res.errors,
      };
    }

    revalidatePath('/tools/link-shortener');

    return {
      success: true,
      message: 'Shortened link created',
      data: res.data,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to create shortened link',
      errors: [error instanceof Error ? error.message : 'Something went wrong'],
    };
  }
}

export async function updateShortenedLink({
  id,
  name,
  slug,
  url,
}: {
  id: number;
  name: string;
  slug: string;
  url: string;
}): Promise<Response<ShortenedLink>> {
  try {
    const cookieStore = cookies();
    const sid = cookieStore.get('sid')?.value;
    if (!sid) {
      return {
        success: false,
        message: 'Unauthorized',
        errors: ['Session ID not found'],
      };
    }

    const res = await api.linkShortener.update({
      id,
      name,
      slug,
      url,
    });

    if (!res.success) {
      return {
        success: false,
        message: res.message,
        errors: res.errors,
      };
    }

    revalidatePath('/tools/link-shortener/');

    return {
      success: true,
      message: 'Shortened link updated',
      data: res.data,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to update shortened link',
      errors: [error instanceof Error ? error.message : 'Something went wrong'],
    };
  }
}

export async function deleteShortenedLink(
  slug: string,
): Promise<Response<null>> {
  try {
    const cookieStore = cookies();
    const sid = cookieStore.get('sid')?.value;
    if (!sid) {
      return {
        success: false,
        message: 'Unauthorized',
        errors: ['Session ID not found'],
      };
    }

    const res = await api.linkShortener.deleteBySlug({
      slug,
    });

    if (!res.success) {
      return {
        success: false,
        message: res.message,
        errors: res.errors,
      };
    }

    revalidatePath('/tools/link-shortener');

    return {
      success: true,
      message: 'Shortened link deleted',
      data: null,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to delete shortened link',
      errors: [error instanceof Error ? error.message : 'Something went wrong'],
    };
  }
}
