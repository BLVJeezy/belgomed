
Doel

De admin-login weer stabiel maken zodat `/admin` niet meer blokkeert met “Backend niet beschikbaar” en geautoriseerde gebruikers opnieuw normaal kunnen inloggen.

Wat ik heb vastgesteld

- De fout in je screenshot komt alleen uit `src/pages/AdminLogin.tsx` wanneer `getAdminClient()` `null` teruggeeft.
- In de preview werken backend-requests al met een geldige admin-sessie, dus database, authenticatie en admin-RLS lijken in principe correct te werken.
- Het probleem zit daardoor waarschijnlijk in de frontend bootstrap van de admin-flow: configuratie-detectie en auth-readiness, niet in de analytics- of leads-tabellen zelf.

Implementatieplan

1. Admin client bootstrap robuuster maken
- `src/lib/adminBackend.ts` uitbreiden zodat die niet alleen `client/null` teruggeeft, maar ook een duidelijke status zoals `ready`, `missing_config` of `initializing`.
- De backend-URL blijven afleiden uit de projectconfig wanneer de directe URL ontbreekt, zodat de admin niet afhankelijk blijft van één enkele env-waarde.

2. Centrale auth-ready hook toevoegen
- Een kleine `useAdminAuthReady` hook toevoegen die eerst de sessie volledig laat herstellen en pas daarna protected queries toelaat.
- Geen async werk meer in `onAuthStateChange`; die listener alleen gebruiken om lokale state bij te werken.

3. Login flow herstellen
- `src/pages/AdminLogin.tsx` aanpassen zodat:
  - de submit-knop pas actief is wanneer backend-config klaar is
  - na `signInWithPassword` eerst de actuele sessie bevestigd wordt
  - daarna pas de `user_roles` check gebeurt
- Drie aparte foutmeldingen tonen:
  - backend/config niet beschikbaar
  - ongeldige login
  - geen admin-toegang

4. Admin route guard stabiliseren
- `src/components/admin/AdminLayout.tsx` laten wachten op dezelfde auth-ready status in plaats van direct queries te doen bij mount.
- Alleen redirecten naar `/admin` wanneer auth echt klaar is en er géén sessie is.
- Bij config-problemen een nette admin fallback tonen; bij geldige sessie pas `<Outlet />` renderen.

5. Beschermde admin-pagina’s op dezelfde guard aansluiten
- `Dashboard.tsx`, `Leads.tsx`, `AdminSettings.tsx` en `AdminSidebar.tsx` pas backend-calls laten doen zodra client + sessie + admin-status klaar zijn.
- Zo verdwijnt het risico dat login wel lukt maar vervolgpagina’s leeg blijven of vastlopen.

6. Rollen alleen controleren/backfillen indien nodig
- Verifiëren of het bedoelde admin-account nog een `user_roles` rij heeft.
- Alleen als daar echt een gat zit, een kleine backfill-migratie toevoegen voor bestaande toegelaten admin-gebruikers.
- Op basis van de huidige preview verwacht ik dat dit waarschijnlijk niet nodig is voor het bestaande hoofdaccount.

7. Verificatie na implementatie
- `/admin` toont geen “Backend niet beschikbaar” meer
- Inloggen met bestaand admin-account werkt opnieuw
- `/admin/dashboard`, `/admin/leads` en `/admin/settings` laden ook na refresh correct
- Uitloggen werkt
- Verkeerde credentials geven een normale foutmelding in plaats van een backend-fout

Technische details

- Geen aanpassing aan `src/integrations/supabase/client.ts`
- Waarschijnlijk nieuwe hook:
  - `src/hooks/useAdminAuthReady.ts`
- Belangrijkste bestanden:
  - `src/lib/adminBackend.ts`
  - `src/pages/AdminLogin.tsx`
  - `src/components/admin/AdminLayout.tsx`
  - `src/pages/admin/Dashboard.tsx`
  - `src/pages/admin/Leads.tsx`
  - `src/pages/admin/AdminSettings.tsx`
  - `src/components/admin/AdminSidebar.tsx`

Verwachte uitkomst

De admin-login werkt weer zoals vroeger, maar wordt tegelijk veel stabieler tegen configuratie- en timingproblemen tijdens het laden van de backend-sessie.
