
## Doel

De admin-omgeving op de live site weer stabiel maken zodat login, dashboard, leads en settings opnieuw laden zoals vroeger, zonder in de algemene foutpagina te vallen.

## Diagnose

- De preview-admin werkt: `/admin/dashboard` laadt daar correct.
- De live admin crasht nog steeds met `supabaseUrl is required`.
- De oorzaak zit niet in de database of RLS: `user_roles`, `page_views` en `leads` zijn al aanwezig en de policies passen bij de admin-flow.
- De echte oorzaak is dat meerdere admin-bestanden de gegenereerde backend-client nog steeds **bovenaan het bestand** importeren. Zodra de live admin-chunk geladen wordt, probeert die client meteen te initialiseren en crasht de pagina nog vóór de UI kan renderen.

## Implementatieplan

### 1. Veilige admin-backend helper toevoegen
Een kleine runtime helper toevoegen voor de admin, zonder `src/integrations/supabase/client.ts` te wijzigen.

Die helper moet:
- eerst `VITE_SUPABASE_URL` gebruiken als die bestaat
- anders de backend-URL afleiden uit `VITE_SUPABASE_PROJECT_ID`  
- dezelfde auth-instellingen behouden als nu, zodat sessies blijven werken zoals eerder
- `null` of een nette foutstatus teruggeven als de backend echt niet geconfigureerd is

Dit volgt hetzelfde patroon dat nu al gebruikt wordt in `src/lib/trackVisit.ts`.

### 2. Alle admin-bestanden loskoppelen van top-level backend imports
De admin mag niet meer crashen tijdens module-load.

Refactoren van:
- `src/pages/AdminLogin.tsx`
- `src/components/admin/AdminLayout.tsx`
- `src/components/admin/AdminSidebar.tsx`
- `src/pages/admin/Dashboard.tsx`
- `src/pages/admin/Leads.tsx`
- `src/pages/admin/AdminSettings.tsx`

In al deze bestanden:
- top-level import van de backend-client verwijderen
- backend pas ophalen **binnen** `useEffect`, event handlers of fetch-functies

### 3. AdminLayout robuust maken
`AdminLayout` moet duidelijke statussen krijgen in plaats van alleen `authorized`:

- `loading`
- `ready`
- `unauthorized`
- `backend_unavailable`

Gedrag:
- tijdens sessie/rol-check: loader tonen
- bij geen sessie: redirect naar `/admin`
- bij backend-probleem: nette admin-specifieke melding tonen
- auth listener alleen starten als de client beschikbaar is

Zo vermijden we zowel de crash als een oneindige “Laden...” toestand.

### 4. Bestaande functionaliteit behouden
Na de refactor moet alles werken zoals eerder:

- `AdminLogin`: zelfde e-mail/wachtwoord login en admin role-check
- `Dashboard`: zelfde query op `page_views`, zelfde filters en refresh
- `Leads`: zelfde lijst, detailmodal, realtime update en delete
- `AdminSettings`: zelfde gebruikersinfo
- `AdminSidebar`: zelfde navigatie en logout

Met andere woorden: alleen de initialisatie verandert, niet de werking.

### 5. Foutafhandeling in admin zelf tonen
De globale `ErrorBoundary` mag blijven als laatste vangnet, maar mag niet langer de normale admin-ervaring zijn.

Bij backend-init fouten:
- admin-specifieke status tonen
- retry-knop voorzien
- eventueel link terug naar homepage of login

Zo ziet de gebruiker een gecontroleerde melding in plaats van de algemene crash-pagina.

### 6. Publiceren en live verifiëren
Na implementatie opnieuw publiceren en specifiek controleren op de live site:

- `/admin`
- `/admin/dashboard`
- `/admin/leads`
- `/admin/settings`

Te bevestigen:
- login werkt
- dashboarddata verschijnt
- leads laden
- logout werkt
- refreshen van een admin deep-link geeft geen crash meer

## Technische details

- Geen database-migratie nodig voor deze fix.
- `src/integrations/supabase/client.ts` niet aanpassen.
- Waarschijnlijk nieuw helperbestand toevoegen, bv. `src/lib/adminBackend.ts`.
- `App.tsx` hoeft in principe niet opnieuw aangepast te worden; de lazy-loading staat al goed.
- Publieke pagina’s hoeven in deze ronde niet gewijzigd te worden.
- Als enkel `VITE_SUPABASE_URL` ontbreekt maar project-ID en publishable key wel aanwezig zijn, herstelt deze aanpak de admin volledig.
- Als ook de andere backend-variabelen ontbreken, moet de admin veilig falen met een nette melding in plaats van te crashen.
