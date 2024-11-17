"use server";

import { api } from "@/trpc/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createShortenedLink({
  name,
  slug,
  url,
}: {
  name: string;
  slug: string;
  url: string;
}) {
  try {
    const cookieStore = cookies();
    const sid = cookieStore.get("sid")?.value;
    if (!sid) {
      return {
        success: false,
        message: "Unauthorized",
        errors: ["Session ID not found"],
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
        message: res.message ?? "Failed to create shortened link",
        errors: res.errors,
      };
    }

    revalidatePath("/tools/link-shortener");

    return {
      success: true,
      message: "Shortened link created",
      data: res.data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to create shortened link",
      errors: [error instanceof Error ? error.message : "Something went wrong"],
    };
  }
}
