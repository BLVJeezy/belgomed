import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `Je bent de klantenservice-assistent van Belgomed, een Belgische farmaceutische groothandel gevestigd in Hasselt. Je helpt klanten met vragen over:
- Farmaceutische producten en medicijnen (voorschriftplichtig en OTC)
- Logistiek en leveringen (cold chain, GDP-compliant)
- Export naar Europese markten
- Registratie en vergunningen (FAGG, EMA)
- Contactinformatie en openingstijden

Belgomed info:
- Adres: Trichterheideweg 11, 3500 Hasselt, België
- Email: info@belgomed.be
- Telefoon: +32 11 123 456
- Diensten: groothandel farmaceutica, OTC-producten, medische hulpmiddelen, cold chain logistiek
- GDP-gecertificeerd, FAGG-vergund

Antwoord altijd in het Nederlands tenzij de klant in een andere taal schrijft. Wees professioneel, behulpzaam en beknopt. Als je iets niet weet, verwijs de klant door naar het contactformulier of het telefoonnummer.`,
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Te veel verzoeken, probeer het later opnieuw." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service tijdelijk niet beschikbaar." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Er ging iets mis. Probeer het later opnieuw." }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
