import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/**
 * Next.js 16 Proxy (formerly "middleware"). Refreshes the Supabase session and
 * guards authenticated routes. Inert until Supabase env is configured.
 */
export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Run on all paths except Next internals and static assets. The public
     * marketing site and /[slug] pages pass straight through while Supabase is
     * unconfigured, and get session refresh once it is.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
