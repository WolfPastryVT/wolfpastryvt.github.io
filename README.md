# WolfPastry Studio

Portfolio + stream hub + commissions site for **WolfPastryVT**.

- **Live site:** https://wolfpastrystudio.com  
- **Pages fallback:** https://wolfpastryvt.github.io/<repo-name>  <!-- replace with your actual repo path or remove if using user-site -->
- **Contact:** `hello@wolfpastrystudio.com` (forwards to my inbox via Porkbun)

---

## What’s inside
- Pure **HTML/CSS/JS** (no framework)
- Sections: Home, Gallery, Commissions, Stream, About, Contact
- **Email copy modal** (works even if `mailto:` isn’t set up)
- Commissions form with **mailto** fallback

## Project structure
/
├─ index.html # Main page & sections (includes modal markup at the end)
├─ styles.css # Theme + layout (modal styles at bottom)
├─ script.js # Nav toggle, year, mailto fallback, email-copy modal
└─ assets/
├─ logo.png # optional
├─ cover.jpg # optional (OG/social image)
└─ art/ # gallery images

---

## Local preview
- Open `index.html` directly in a browser, **or**
- Tiny server:
  - Python: `python -m http.server 8080` → http://localhost:8080  
  - VS Code + “Live Server”: right-click `index.html` → *Open with Live Server*

## Editing workflow
- **GitHub (web):** open a file → ✏️ → edit → **Commit** (site auto-updates).
- **VS Code (local):**
  ```bash
  git clone https://github.com/WolfPastryVT/<repo-name>.git
  cd <repo-name>
  # edit files, then:
  git add -A
  git commit -m "Update"
  git push
