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

BELANGRIJK GEDRAG BIJ ONBEKENDE VRAGEN:
Wanneer je een vraag niet volledig kunt beantwoorden of de klant meer specifieke hulp nodig heeft:
1. Beantwoord eerst wat je WEL weet
2. Stel korte, gerichte vervolgvragen om te begrijpen wat de klant precies zoekt (bijv. welk type product, welk land, welke hoeveelheid)
3. Zodra je genoeg context hebt en de klant baat zou hebben bij persoonlijk contact, zeg dan:
   "Om u optimaal te helpen, zou ik graag uw contactgegevens noteren zodat een collega u persoonlijk kan contacteren."
4. Vraag dan om de volgende 3 gegevens (alle 3 VERPLICHT):
   - **Naam** (volledige naam)
   - **Telefoonnummer**
   - **E-mailadres**
5. Vraag ook optioneel naar bedrijfsnaam en een korte omschrijving van hun vraag/behoefte
6. Zodra je alle 3 verplichte gegevens hebt (naam, telefoon, email), antwoord dan met EXACT dit formaat op een nieuwe regel:
   [LEAD_CAPTURED]{"naam":"...","telefoon":"...","email":"...","bedrijfsnaam":"...","bericht":"korte samenvatting van de vraag/behoefte"}[/LEAD_CAPTURED]
   Gevolgd door een bevestigingsbericht aan de klant.

REGELS VOOR LEAD CAPTURE:
- Vraag NOOIT om alle 3 gegevens tegelijk in één bericht. Begin met naam, dan telefoon, dan email.
- Wees natuurlijk en conversationeel, niet als een formulier.
- Als een klant al gegevens heeft gegeven in het gesprek, vraag ze niet opnieuw.
- Verzamel de "bericht" info uit de context van het gesprek (wat de klant zocht/nodig had).

Antwoord altijd in het Nederlands tenzij de klant in een andere taal schrijft. Wees professioneel, behulpzaam en beknopt.`,
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
