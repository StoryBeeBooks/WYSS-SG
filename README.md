# WYSS-SG — Design System & Implementation Notes

This file contains the important design decisions and where they are implemented in the repository. Use this as the single source of truth for typography, colors, hero/video behavior, navigation treatment, and key assets.

**Project**: WYSS corporate landing site (WYSS-SG)

**Where to edit**:
- HTML pages: `*.html` (root)
- Header/footer components: `header.html`, `footer.html`
- Global styles: `css/base.css`
- Header styles: `css/header.css`
- Home hero styles: `css/home.css`
- Pages header/video styles: `css/pages.css`
- FAQ: `css/faq.css`
- JS dynamic loader: `js/components.js`
- Video assets: `Video Assets/`

**Typography**
- Title (H1, H2): Didonesque-style serif — implemented using Playfair Display (fallbacks included).
  - CSS variable: `--font-title` (declared in `css/base.css`). Example: `font-family: var(--font-title);`
- Subtitle (hero and page subtitles): Modern Sans — implemented using Inter.
  - CSS variable: `--font-subtitle` (declared in `css/base.css`). Example: `font-family: var(--font-subtitle);`
- Body / Regular copy: Chanticleer Roman NF alternative — implemented with Palatino / Georgia fallback.
  - CSS variable: `--font-body` (declared in `css/base.css`). Example: `font-family: var(--font-body);`

Notes:
- If you want to replace the Playfair / Inter / Chanticleer with different webfonts, update the `@import` or `@font-face` entries in `css/base.css` and keep the CSS variables unchanged for minimal edits across stylesheets.

**Color System**
- Primary color: `--primary-color: #E74C3C` (industrial red)
- Secondary (dark): `--secondary-color: #0A0A0A`
- Text: `--text-color: #2C3E50`
- Light text: `--light-text: #5A6C7D`
- White: `--white: #ffffff`

Where used:
- Buttons, accents, and link hover: `--primary-color`
- Header background and overlays use progressive blacks/rgba with transparency (see `css/header.css`)

**Hero / Video Section**
- Files: `index.html` (home) and internal pages that use `page-header` (`solutions.html`, `products.html`, `projects.html`).
- Video assets live in `Video Assets/` and the hero on `index.html` is currently configured to use the `Singa1.mp4` file via the GitHub raw URL.
- Video markup uses `<video autoplay muted loop playsinline>` and a dark overlay layer (`.hero-overlay`) to ensure readable text.
- Decorative line (the thin white "W" curve): implemented as an inline SVG with class `.hero-w-line` positioned absolutely on the hero. You can update the path in `index.html` or replace with an SVG file and include it in the DOM.

How to replace the hero video:
1. Put the MP4 in `Video Assets/` (filename must be URL-safe or encoded when referenced).
2. Update the `<source src="...">` inside the `.hero-video-bg` element in `index.html` or use a raw GitHub URL for remote hosting.

**Navigation Bar**
- The header uses a progressive gradient from black → transparent (top to bottom). See `css/header.css` for `background: linear-gradient(to bottom, rgba(...))`.
- The header is `position: fixed` and includes a `backdrop-filter: blur()` for the frosted effect.
- Menu link styles use `--font-subtitle` and are uppercased.

**Buttons**
- Primary hero button uses a semi-transparent white outline (transparent fill) with `border: 2px solid rgba(255,255,255,0.6)`. On hover it becomes filled with `--primary-color`.
- Buttons use `border-radius: 50px` and uppercase, consistent spacing, and `--font-subtitle`.

**Accessibility & Performance Notes**
- All hero videos are muted & autoplay to allow modern browsers to autoplay when muted.
- Overlay gradients provide sufficient contrast for hero text—adjust opacity if you change imagery.
- For production, consider optimized web-friendly encodings (H.264 baseline, compressed bitrate) and provide smaller fallback images for mobile to save bandwidth.

**Where to tweak spacing, sizes**
- Hero text sizing, spacing: `css/home.css` (`.hero h1`, `.hero p`)
- Page header sizing: `css/pages.css` (`.page-header h1`, `.page-header p`)

**Deployment / Git**
- The project is pushed to `https://github.com/StoryBeeBooks/WYSS-SG` on branch `main`.
- To update and deploy, edit files locally, then run:
```
git add .
git commit -m "Update design documentation"
git push
```

**Quick Editing Tips**
- To change fonts globally: update `--font-title`, `--font-subtitle`, `--font-body` in `css/base.css`.
- To change the primary color: update `--primary-color` in `css/base.css`.
- To change nav gradient: edit `css/header.css` `background: linear-gradient(...)` values.

**Contact / Next steps**
- If you want a downloadable style token file (JSON) or a Figma style guide exported, I can generate that next.

---
Generated and updated by the development workflow on Nov 15, 2025.
