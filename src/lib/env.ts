/**
 * Central access to Supabase environment variables.
 *
 * The whole Supabase layer is designed to be INERT until these are set, so the
 * existing (already-deployed) site keeps working before the project exists.
 * Never read `SUPABASE_SERVICE_ROLE_KEY` here — it lives only in admin.ts
 * (server-only) so it can never leak into a client bundle.
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

/**
 * The public browser key. Supports both the new key format
 * (`sb_publishable_…`, env `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`) and the
 * legacy anon JWT, so either naming works.
 */
export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "";

/** True once the public Supabase URL + publishable key are configured. */
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export function assertSupabaseConfigured() {
  if (!isSupabaseConfigured) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and " +
        "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local " +
        "(see .env.local.example).",
    );
  }
}
