"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function redirectAndRevalidate(path: string) {
  revalidatePath(path);
  redirect(path);
}
