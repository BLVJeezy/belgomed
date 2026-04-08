import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { getBackendConfig } from "@/lib/backendConfig";

let _client: SupabaseClient<Database> | null = null;
export type AdminBackendStatus = "ready" | "missing_config" | "not_initialized";
let _status: AdminBackendStatus = "not_initialized";

export function getAdminClient(): SupabaseClient<Database> | null {
  if (_client) return _client;

  const cfg = getBackendConfig();
  if (!cfg.isConfigured) {
    _status = "missing_config";
    return null;
  }

  _client = createClient<Database>(cfg.url, cfg.publishableKey, {
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
    getAdminClient();
  }
  return _status;
}
