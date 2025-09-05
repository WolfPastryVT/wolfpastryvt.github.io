# WolfPastry Studio

Portfolio + stream hub + commisions site for **WolfPastryVT**.

## Files
- `index.html` — your pages/sections
- `styles.css` — theme + layout
- `script.js` — small interactivity (nav toggle + commission mailto)
- `assets/` — put images here (logo, cover, gallery)

## Quick edit
1. Open `index.html` in Notepad++ and customize text/links.
2. Replace images in `assets/` (create `assets/art/` for your pieces).
3. Update social links and email in `index.html` and `script.js`.

## Easiest deployments (no backend needed)
### Option 1: GitHub Pages (free)
1. Create a GitHub repo (e.g., `wolfpastry-studio-site`).
2. Upload these files to the repository root (or push via Git).
3. In repo **Settings → Pages**, set **Branch: main / root**.
4. Your site will appear at `https://<username>.github.io/<repo>/`.
5. To use a custom domain (e.g., `wolfpastryvt.com`), add it in **Pages** settings and create a `CNAME` file (GitHub guides you).

### Option 2: Netlify (drag‑and‑drop)
1. Go to https://app.netlify.com/drop and drag the **folder**.
2. Add your custom domain in Netlify → Domain settings.
3. Update DNS at your registrar to point to Netlify (instructions there).

### Option 3: Cloudflare Pages
1. Create a new Pages project.
2. Upload the folder or connect GitHub.
3. Add your custom domain in Cloudflare and update DNS.

## Upgrading the contact/commission form
Right now it uses a **mailto** fallback. For a real inbox/queue:
- **Serverless:** Netlify Functions, Vercel Functions, or Cloudflare Workers + Resend/SendGrid to send email and log requests.
- **Database:** Supabase/Neon + simple REST endpoint.
- **Java backend:** Build a small Spring Boot API and deploy on Render/Fly; point the form to `/api/commissions`.

## Local quick test server (optional)
- Python 3: `python -m http.server 8080` then open http://localhost:8080
- Node: `npx http-server`

## Suggested structure if you grow
- `/art/[slug].html` (or use a static site generator later)
- `/assets/art/` for full-size images, `/assets/thumbs/` for thumbs
- Add `sitemap.xml` and `robots.txt` for SEO when public

Enjoy!
