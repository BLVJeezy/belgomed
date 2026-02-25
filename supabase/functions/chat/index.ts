import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, action, leadData } = await req.json();

    // Handle lead submission
    if (action === "submit_lead" && leadData) {
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      const supabase = createClient(supabaseUrl, supabaseKey);

      const { error } = await supabase.from("leads").insert({
        contact_naam: leadData.naam,
        contact_email: leadData.email,
        telefoon: leadData.telefoon,
        bedrijfsnaam: leadData.bedrijfsnaam || "Via Chatbot",
        bericht: leadData.bericht || "",
        sector: leadData.sector || "RX",
        land: leadData.land || "België",
        service_type: "chatbot",
      });

      if (error) {
        console.error("Lead insert error:", error);
        return new Response(JSON.stringify({ error: "Kon gegevens niet opslaan." }), {
          status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ success: true }), {
        status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

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
            content: `Je bent de klantenservice-assistent van Belgomed, een Belgische farmaceutische groothandel gevestigd in Hasselt.

OVER BELGOMED:
Belgomed levert farmaceutische producten (RX, OTC), medische hulpmiddelen en verzorgingsproducten aan apotheken, ziekenhuizen en distributeurs in Europa en Afrika. GDP-gecertificeerd, FAGG-vergund. Cold chain logistiek beschikbaar.
Adres: Trichterheideweg 11, 3500 Hasselt | info@belgomed.be | +32 11 123 456

STIJLREGELS:
- Antwoord ALTIJD in MAX 2-3 korte zinnen. Direct en to-the-point.
- Geen opsommingen, geen inleidingen, geen afsluitingen.
- Geen "Heeft u nog vragen?" of soortgelijke zinnen.

LEAD CAPTURE - BELANGRIJK:
Je hoofddoel is om potentiële klanten te identificeren en hun gegevens te verzamelen. Volg dit proces STRIKT:

1. Beantwoord de eerste vraag kort en bondig.
2. Stel ALTIJD een gerichte vervolgvraag om hun behoefte te verduidelijken. Voorbeelden:
   - "Voor welk type producten zoekt u een leverancier?" (RX, OTC, medische hulpmiddelen)
   - "Naar welk land of regio wilt u leveren?"
   - "Bent u een apotheek, ziekenhuis of distributeur?"
   - "Welk volume heeft u ongeveer nodig?"
3. Na maximaal 2 vervolgvragen, zeg: "Ik verbind u graag door met een collega die u persoonlijk verder helpt." en stuur EXACT dit op een nieuwe regel:
   [SHOW_LEAD_FORM]
   Daarna NIETS meer typen.

Bij deze onderwerpen METEEN doorverwijzen na 1 antwoord:
- Prijzen of offertes → direct [SHOW_LEAD_FORM]
- Specifieke productbeschikbaarheid → direct [SHOW_LEAD_FORM]
- Partnerschappen of samenwerking → direct [SHOW_LEAD_FORM]
- Exportvragen met specifiek land → direct [SHOW_LEAD_FORM]

Antwoord in het Nederlands tenzij de klant anders schrijft.`,
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
