

## Probleem

De sitemap wordt door de hosting als **HTML** geserveerd (met `Content-Type: text/html`) in plaats van als XML. Google Search Console verwacht `Content-Type: application/xml` en weigert het bestand daarom. Dit is zichtbaar in de response: het XML-bestand wordt gewrapt in `<html><body>` tags.

## Oplossing

Een backend function aanmaken die de sitemap met het juiste `Content-Type: application/xml` header serveert. Daarnaast de `robots.txt` updaten om naar deze nieuwe URL te verwijzen.

### Stappen

1. **Backend function `sitemap`** aanmaken (`supabase/functions/sitemap/index.ts`) die de sitemap XML retourneert met correcte headers (`Content-Type: application/xml`).

2. **`robots.txt` updaten** — de sitemap-URL wijzigen naar de backend function URL:
   ```
   Sitemap: https://qjhyojwdvhkwwfvplaab.supabase.co/functions/v1/sitemap
   ```

3. **Google Search Console** — na deployment de nieuwe sitemap-URL indienen.

### Alternatief (geen code nodig)

Als tussenoplossing kun je ook individuele URL's handmatig laten indexeren via **URL Inspection → Request Indexing** in Google Search Console voor:
- `https://belgomed.com/`
- `https://belgomed.com/terms`
- `https://belgomed.com/privacy`

Dit werkt onafhankelijk van de sitemap.

