import { headers } from "next/headers";
import { auth } from "@/lib/auth";

/** Server-side session for the current request, or null when signed out. */
export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}