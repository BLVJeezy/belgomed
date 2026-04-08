

## Probleem

De site crasht omdat admin-componenten (die Supabase importeren) eagerly geladen worden, en `ContactForm` + `ChatBot` op de homepage direct de Supabase client aanroepen. Als de env-variabelen niet correct gebundeld zijn, crasht de hele app.

## Plan

### 1. Error Boundary toevoegen (`src/components/ErrorBoundary.tsx`)
Nieuw bestand: React class component die crashes opvangt en een nette foutpagina toont met herlaad-knop. Wordt gewrapt rond `<App />` in `main.tsx`.

### 2. Lazy-load admin routes (`src/App.tsx`)
- Vervang statische imports van `AdminLogin`, `AdminLayout`, `Dashboard`, `Leads`, `AdminSettings` door `React.lazy(() => import(...))`
- Wrap admin routes in `<Suspense fallback={<div>Laden...</div>}>`
- Publieke routes (Index, Terms, Privacy) blijven statisch

### 3. Graceful fallback in ChatBot (`src/components/ChatBot.tsx`)
- Check `import.meta.env.VITE_SUPABASE_URL` bij initialisatie
- Als niet beschikbaar: verberg de chatbot volledig (render `null`)

### 4. Graceful fallback in ContactForm (`src/components/ContactForm.tsx`)
- Check `import.meta.env.VITE_SUPABASE_URL` voor het versturen
- Als niet beschikbaar: toon `mailto:info@belgomed.be` link in plaats van het formulier, of toon het formulier maar redirect submit naar mailto

### 5. Publiceren
Na implementatie moet je op **Publish → Update** klikken om de fix live te zetten op belgomed.com.

## Bestanden

| Bestand | Actie |
|---------|-------|
| `src/components/ErrorBoundary.tsx` | Nieuw |
| `src/main.tsx` | Wrap met ErrorBoundary |
| `src/App.tsx` | Lazy-load admin routes |
| `src/components/ChatBot.tsx` | Guard op env var |
| `src/components/ContactForm.tsx` | Guard op env var |

