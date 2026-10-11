# AAVEG 2026 - Halloween hostel fest site

Front-end only site for AAVEG 2026 (22-24 October 2026, Poornima College of Engineering, Jaipur).
Stack: Vite, React 18, GSAP + ScrollTrigger, Three.js. No backend.

## Setup
```bash
npm install
npm run dev       # local dev server
npm run build     # production build in dist/
npm run preview   # serve the build locally
```
Requires Node 18+. Fonts (Anton, UnifrakturCook, DM Sans) load from Google Fonts.

## Configuration (all content lives in src/data)
- **houses.js** - eight houses. Set each `formUrl` to the real Google Form URL (must start with `https://`).
  While it is still `PASTE_GOOGLE_FORM_URL_HERE` the card shows a disabled "Form link coming soon" button.
  Change `label` to the real house name and set `logo` (optional) and `accent` colour.
- **clubs.js** - club cards (`name`, `description`, optional `image`, optional `link`). Currently placeholders.
- **experiences.js** - HUNT FEST, HOOK, 4X, CINEMATIC. Descriptions are placeholders; no rules, prizes or schedules are invented.
- **site.js** - optional social links; the footer shows them only when real URLs exist.

## Structure
- `src/scene/forestScene.js` - Three.js forest flight (instanced trees, fog, moon, house, title plane, smoke, embers). Scroll progress comes from a ScrollTrigger on the 500vh hero in `components/Hero.jsx`.
- `src/components/` - Navbar, Hero, FallbackForest, Intro, Experiences, Clubs, Houses, Footer.
- `src/styles.css` - palette tokens, layout, grain and vignette.

## Performance and fallbacks
- Phones/coarse pointers: 110 trees, 260 embers, 16 smoke sprites, lower pixel ratio, no mouse parallax.
- WebGL unavailable or scene error: an SVG moon-and-trees parallax is scrubbed by scroll instead.
- `prefers-reduced-motion`: static one-screen SVG hero, no scroll animation, no grain motion.

## Not included
No Lenis smooth-scroll library (native smooth anchors are used), no bloom post-processing (kept off so the title stays readable).
