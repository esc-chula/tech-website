'use server';

import { api } from '~/trpc/server';
import { type Response } from '~/types/server';

export async function checkAppRole({
  appId,
  role,
}: {
  appId: string;
  role: string;
}): Promise<Response<boolean>> {
  const res = await api.role.check({
    appId,
    role,
  });

  if (!res.success) {
    return {
      success: false,
      message: res.message,
      errors: res.errors,
    };
  }

  return {
    success: true,
    message: 'Successfully checked link slug',
    data: res.data,
  };
}
