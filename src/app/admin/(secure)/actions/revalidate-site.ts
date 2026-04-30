"use server";

import { revalidatePath } from "next/cache";

const paths = ["/", "/about", "/skills", "/projects", "/resume", "/contact", "/gallery"] as const;

export async function revalidatePortfolioPaths() {
  for (const p of paths) {
    revalidatePath(p);
  }
  revalidatePath("/", "layout");
}
