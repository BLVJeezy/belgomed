import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

let _client: SupabaseClient<Database> | null = null;

export function getAdminClient(): SupabaseClient<Database> | null {
  if (_client) return _client;

  let url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;
  const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID as string | undefined;

  // Derive URL from project ID if missing
  if (!url && projectId) {
    url = `https://${projectId}.supabase.co`;
  }

  if (!url || !key) return null;

  _client = createClient<Database>(url, key, {
    auth: {
      storage: localStorage,
      persistSession: true,
      autoRefreshToken: true,
    },
  });

  return _client;
}
