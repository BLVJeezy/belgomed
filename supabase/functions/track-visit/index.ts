import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { path, referrer, userAgent, deviceType, sessionId } = await req.json();

    // Get IP from headers
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("cf-connecting-ip") ||
      "unknown";

    // Simple IP hash for unique visitor counting (privacy-friendly)
    const encoder = new TextEncoder();
    const data = encoder.encode(ip + new Date().toISOString().slice(0, 10));
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const ipHash = Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .slice(0, 16);

    // Geo lookup via free API
    let country = null;
    let countryCode = null;
    let region = null;
    try {
      if (ip !== "unknown" && ip !== "127.0.0.1") {
        const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=country,countryCode,regionName`);
        if (geoRes.ok) {
          const geo = await geoRes.json();
          if (geo.country) {
            country = geo.country;
            countryCode = geo.countryCode;
            region = geo.regionName || null;
          }
        }
      }
    } catch {
      // Geo lookup failed, continue without it
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error } = await supabase.from("page_views").insert({
      path: path || "/",
      referrer: referrer || null,
      user_agent: userAgent || null,
      device_type: deviceType || "desktop",
      country,
      country_code: countryCode,
      ip_hash: ipHash,
      session_id: sessionId || null,
    });

    if (error) {
      console.error("Insert error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Track error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
