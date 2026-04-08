import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

let _client: SupabaseClient<Database> | null = null;
export type AdminBackendStatus = "ready" | "missing_config" | "not_initialized";
let _status: AdminBackendStatus = "not_initialized";

export function getAdminClient(): SupabaseClient<Database> | null {
  if (_client) return _client;

  let url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;
  const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID as string | undefined;

  // Derive URL from project ID if missing
  if (!url && projectId) {
    url = `https://${projectId}.supabase.co`;
  }

  if (!url || !key) {
    _status = "missing_config";
    return null;
  }

  _client = createClient<Database>(url, key, {
    auth: {
      storage: localStorage,
      persistSession: true,
      autoRefreshToken: true,
    },
  });

  _status = "ready";
  return _client;
}

export function getAdminBackendStatus(): AdminBackendStatus {
  if (_status === "not_initialized") {
    // Trigger initialization
    getAdminClient();
  }
  return _status;
}
