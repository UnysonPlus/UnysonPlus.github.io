---
sidebar_position: 3
title: Convert from a URL
---

# Convert from a URL

The highest‑fidelity path. Point it at a live site and it's rendered + converted in one step. Best
for AI builders that render in the browser (Lovable, v0, Bolt, React/Vite apps).

## Prerequisite

The **[capture service](./capture-service.md)** must be running on your machine. The status next to
the **Analyze & convert** button shows green when it's detected.

## Steps

1. Go to **Unyson+ → Convert** → the **Convert** tab.
2. Paste the site URL (e.g. `https://your-site.lovable.app/`).
3. Choose options:
   - **Create child theme** — on = build a matching child theme; off = *grab content only* (the
     sections become a **new page**, your homepage and active theme are untouched, no section CSS is
     written — useful for pulling structure into an existing site).
   - **Capture header** / **Capture footer** — reproduce the source chrome.
   - **Import images** — fetch images into the Media Library.
   - **AI assist** *(optional)* — see [AI assist](./ai-assist.md).
4. Click **Analyze & convert**. The page is rendered in headless Chrome (~15s) and the **design
   phase** runs: it installs the child theme, imports media/presets/theme settings, and builds a
   **Style Guide** page.
5. **Review the mapping** — for each section, set every element's role (or uncheck/omit it), give
   the section a CSS id, or keep a section as a verbatim code block. (See
   [How it works → role mapping](./how-it-works.md#role-mapping--shortcodes).)
6. Click **Build the page from this mapping**. The pages are created and the per‑section CSS is
   merged into the child stylesheet. You're redirected to the result.

## What's produced

- A child theme with a **dynamic header** (Site Logo/Title + a real WP nav menu) and **dynamic
  footer** (columns → widget areas + a copyright area).
- Page‑builder pages, fully editable.
- Media in the Library, styling presets, and theme settings applied.

## Progress feedback

The conversion is one long request with no server‑side progress stream, so the progress bar is
**time‑estimated** — it eases toward a ceiling and snaps forward when each phase actually completes.
With AI assist on, a rotating set of "what Claude is doing now" messages plays during the (longer)
AI step so the wait never looks frozen.

## Tips

- **Grab content only** (Create child theme off) is the safe way to pull a site's content/structure
  into an existing WordPress site without touching its theme.
- If a custom widget (an audio player, an interactive demo) matters, keep it as a **code block** in
  the review step so it's reproduced verbatim instead of flattened to an image.
- Re‑running a conversion replaces the previously generated child theme.
