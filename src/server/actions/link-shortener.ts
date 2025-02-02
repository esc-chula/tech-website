'use server';

import { revalidatePath } from 'next/cache';

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
  const res = await api.linkShortener.create({
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

  revalidatePath('/tools/link-shortener');

  return {
    success: true,
    message: `Successfully created /${slug} shortened link`,
    data: res.data,
  };
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

  revalidatePath(`/tools/link-shortener/${res.data.slug}`);

  return {
    success: true,
    message: `Successfully updated /${slug} shortened link`,
    data: res.data,
  };
}

export async function deleteShortenedLink(
  slug: string,
): Promise<Response<null>> {
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
    message: `Successfully deleted /${slug} shortened link`,
    data: null,
  };
}
