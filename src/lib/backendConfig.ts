/**
 * Central backend configuration with hardcoded public fallbacks.
 * These are PUBLIC keys (anon/publishable) — safe to include in client bundles.
 * This ensures the app works even when Vite fails to inject env vars at build time.
 */

const FALLBACK_PROJECT_ID = "qjhyojwdvhkwwfvplaab";
const FALLBACK_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqaHlvandkdmhrd3dmdnBsYWFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2OTUyNzAsImV4cCI6MjA4NzI3MTI3MH0.40FcJoWk4W6Dtd5b1RzbzNblvQJ4SYab7qDKVHbxudc";

function resolve() {
  const envUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const envKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;
  const envProject = import.meta.env.VITE_SUPABASE_PROJECT_ID as string | undefined;

  const projectId = envProject || FALLBACK_PROJECT_ID;
  const url = envUrl || `https://${projectId}.supabase.co`;
  const publishableKey = envKey || FALLBACK_ANON_KEY;

  return { url, projectId, publishableKey, isConfigured: true };
}

// Cache after first call
let _cached: ReturnType<typeof resolve> | null = null;

export function getBackendConfig() {
  if (!_cached) _cached = resolve();
  return _cached;
}
