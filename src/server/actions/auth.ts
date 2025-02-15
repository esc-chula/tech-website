/* eslint-disable @typescript-eslint/require-await -- server actions need to be async */
'use server';

import { cookies } from 'next/headers';

import { type Student } from '~/generated/intania/auth/student/v1/student';
import { api } from '~/trpc/server';
import { type Session } from '~/types/auth';
import { type Response } from '~/types/server';

import { getCachedMapping } from '../auth/mapper';

export async function login(
  username: string,
  password: string,
): Promise<Response<null>> {
  const res = await api.auth.login({
    username,
    password,
  });

  if (!res.success) {
    return {
      success: false,
      message: res.message,
      errors: res.errors,
    };
  }

  const sid = res.data.session?.id;
  const expiredAt = res.data.session?.expiresAt;

  if (!sid || !expiredAt) {
    return {
      success: false,
      message: 'Failed to login, please try again',
      errors: ['Invalid session data'],
    };
  }

  const cookieStore = cookies();
  cookieStore.set('sid', sid, {
    expires: new Date(expiredAt),
    httpOnly: true,
  });

  return {
    success: true,
    data: null,
  };
}

export async function me(): Promise<Response<Student>> {
  const cookieStore = cookies();
  const sid = cookieStore.get('sid')?.value;

  if (!sid) {
    return {
      success: false,
      message: 'Unauthorized: No session ID found',
      errors: ['No session ID found'],
    };
  }

  const resMe = await api.auth.me({ sessionId: sid });
  if (!resMe.success) {
    return {
      success: false,
      message: resMe.message,
      errors: resMe.errors,
    };
  }

  const miscData = await getCachedMapping(['departments']);

  const student = resMe.data;
  student.department = miscData.departments.find(
    (department) => department.id === student.department?.id,
  );

  return {
    success: true,
    message: 'Successfully retrieved user data',
    data: student,
  };
}

export async function getSession(): Promise<Response<Session>> {
  return await api.auth.getSession();
}

export async function logout(): Promise<Response<null>> {
  const cookieStore = cookies();
  cookieStore.delete('sid');

  return {
    success: true,
    message: 'Logged out',
    data: null,
  };
}
