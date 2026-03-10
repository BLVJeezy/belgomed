

## Problem

The Google search result currently shows `belgomed.lovable.app` as the domain and uses the default preview image instead of the Belgomed logo favicon. Two things need to happen:

1. **Custom domain**: Connect `belgomed.com` to the project so Google shows the correct domain
2. **Favicon for search results**: Ensure the favicon is properly configured so Google picks up the Belgomed "B" logo

## What needs to change

### 1. Custom Domain Setup (manual step, no code)
The domain showing as `belgomed.lovable.app` in Google is because no custom domain is connected yet. You need to:
- Go to **Project Settings → Domains**
- Click **Connect Domain** and enter `belgomed.com`
- Add the required DNS records at your domain registrar:
  - **A Record** for `@` → `185.158.133.1`
  - **A Record** for `www` → `185.158.133.1`
  - **TXT Record** for `_lovable` → the verification value provided

### 2. Update all URLs from `belgomed.lovable.app` → `belgomed.com`
Once the domain is connected, update references in code:
- **`index.html`**: Update `canonical`, `og:url`, `og:image`, `twitter:image`, and all structured data URLs
- **`public/sitemap.xml`**: Update all `<loc>` URLs
- **`public/robots.txt`**: Update sitemap URL
- **`src/components/Footer.tsx`** and **`src/contexts/LangContext.tsx`**: Update any hardcoded URLs

### 3. Favicon tags (already in place)
The favicon (`/favicon.png` with the "B" logo) and apple-touch-icon (`/app-icon.png`) are already configured. Google should pick these up once the site is re-crawled on the new domain. No code changes needed here — just ensure `favicon.png` exists in `public/`.

## Summary
The main action is connecting the custom domain `belgomed.com` in project settings, then updating all hardcoded `belgomed.lovable.app` URLs to `belgomed.com`. The favicon/logo is already properly set up.

