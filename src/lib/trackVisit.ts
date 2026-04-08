const SESSION_KEY = "belgomed_session_id";

function getSessionId(): string {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

function getDeviceType(): string {
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

export function trackVisit() {
  // Don't track admin pages
  if (window.location.pathname.startsWith("/admin")) return;

  const { getBackendConfig } = await_import();
  const cfg = getBackendConfig();
  if (!cfg.isConfigured) return;
  const projectId = cfg.projectId;
  const anonKey = cfg.publishableKey;

  const payload = {
    path: window.location.pathname,
    referrer: document.referrer || null,
    userAgent: navigator.userAgent,
    deviceType: getDeviceType(),
    sessionId: getSessionId(),
  };

  const url = `https://${projectId}.supabase.co/functions/v1/track-visit`;

  // Use fetch with keepalive (sendBeacon can't send custom headers)
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": anonKey,
    },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {});
}
