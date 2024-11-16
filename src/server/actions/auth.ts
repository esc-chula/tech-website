"use server";

import { cookies } from "next/headers";
import { api } from "@/trpc/server";
import { type Response } from "@/types/server";
import { type MeResponse } from "@/generated/intania/auth/account/v1/account";

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

export async function me(): Promise<Response<MeResponse>> {
  try {
    const cookieStore = cookies();
    const sid = cookieStore.get("sid")?.value;
    if (!sid) {
      return {
        success: false,
        message: "Failed to get user data",
        errors: ["Session ID not found"],
      };
    }

    const res = await api.auth.me();
    if (!res.success) {
      return {
        success: false,
        message: "Failed to get user data",
        errors: res.errors,
      };
    }

    return {
      success: true,
      message: "User data fetched",
      data: res.data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to get user data",
      errors: [error instanceof Error ? error.message : "Something went wrong"],
    };
  }
}

export async function logout() {
  const cookieStore = cookies();
  cookieStore.delete("sid");
}
