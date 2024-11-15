"use server";

import { cookies } from "next/headers";
import { api } from "@/trpc/server";
import { type Response } from "@/types/server";

export async function login(
  username: string,
  password: string,
): Promise<Response<null>> {
  try {
    const res = await api.auth.login({
      username,
      password,
    });

    if (!res.success) {
      return {
        success: false,
        errors: res.errors,
      };
    }

    const sid = res.data.session?.id;
    const expiredAt = res.data.session?.expiresAt;

    if (!sid || !expiredAt) {
      return {
        success: false,
        message: "Failed to login",
        errors: ["Invalid session data"],
      };
    }

    const cookieStore = cookies();
    cookieStore.set("sid", sid, {
      expires: new Date(expiredAt),
      httpOnly: true,
    });

    console.log(sid);

    return {
      success: true,
      data: null,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to login",
      errors: [error instanceof Error ? error.message : "Something went wrong"],
    };
  }
}
