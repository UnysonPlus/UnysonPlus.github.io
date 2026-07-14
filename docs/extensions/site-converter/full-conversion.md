---
sidebar_position: 2
title: Full conversion — start to finish
---

# Full conversion — start to finish

This is the **complete picture**: everything you download once, the inputs you gather per site, and
the two ways to run a conversion — the **automated** Site Converter, and the higher-fidelity
**AI-assisted** build. The other pages in this section go deep on each piece; this one ties them
together so you know the whole flow before you start.

:::tip Two lanes, one goal
Both lanes turn a source design into a **native, editable** Unyson+ site — a child theme + page-builder
pages + real menus + populated Media Library. Nothing is hand-coded HTML; every page stays editable in
the builder.
:::

## Step 1 — Install once (your workspace)

You set these up a single time; then every conversion reuses them.

| # | What | Where / how |
|---|------|-------------|
| 1 | **Unyson+ plugin** | Install & activate the plugin in *Plugins → Add New → Upload* (the framework that powers everything). |
| 2 | **Parent theme `unysonplus-theme`** | Install & activate under *Appearance → Themes*. A conversion builds a **child** of this theme. |
| 3 | **Site Converter extension** | Enable it in *Unyson+ → Extensions*. The tool then appears at **Unyson+ → Convert**. |
| 4 | **The capture service** (for URLs + full-fidelity file rendering) | Clone **[UnysonPlus-HTML-to-Wordpress-Conversion](https://github.com/UnysonPlus/UnysonPlus-HTML-to-Wordpress-Conversion)**, then run it (below). Needs **Node 20+** and **Google Chrome**. |
| 5 | **(Optional) AI** | Either the **Claude Code** CLI on your PATH *(uses your subscription — no key)*, **or** an `ANTHROPIC_API_KEY` env var *(pay-per-use API)*. Enables *AI assist* / the AI-assisted lane. |

**Start the capture service** (leave the terminal open while converting):

```bash
# inside the UnysonPlus-HTML-to-Wordpress-Conversion clone
cd tools/design-capture
npm install        # first time only
node serve.mjs     # serves http://localhost:8787
```

The status next to **Analyze & convert** in wp-admin turns green once it's detected. Full detail —
endpoints, ports, security, troubleshooting — is on **[The capture service](./capture-service.md)**.

:::note No Node?
You can still convert a **file** offline (lower fidelity) and import a pre-built bundle under
**Manual tools**. The capture service is only needed to render **live URLs** (and to render file
uploads at full fidelity).
:::

## Step 2 — Gather your source inputs

What you collect depends on how faithful you need the result.

**Minimum (automated lane):** one of —

- a **source URL** (a live site / an AI-generated preview link — Lovable, v0, Bolt, Stitch, any
  Tailwind/Bootstrap page), **or**
- a **design file** — a Google Stitch `.zip` or a pasted `code.html`.

**For the highest fidelity (AI-assisted lane)** — also grab, into a folder per site:

| Input | Why it helps |
|-------|--------------|
| **The rendered `view-source.html`** (the live DOM, "Save as → Webpage, HTML only" or copy the rendered source) | The **authoritative** computed markup/classes. It wins over any framework source (`page.tsx` etc.), which can be an earlier variant. |
| **A full-page reference screenshot** | The fidelity target — you diff the rebuilt page against it, section by section. |
| **Real media** — the hero `video.mp4`, key images | So the build uses the *actual* assets (sideloaded into the Media Library), not hot-linked placeholders. |
| **The source files** (page source / component files) | Exact tokens (hex, font families, spacing) when the view-source is ambiguous. |

## Step 3 — Convert (pick a lane)

### Lane A — Automated (the Site Converter UI)

Point-and-click in **Unyson+ → Convert**. It renders the design, reads the real layout + computed
styles, and rebuilds it as clean shortcodes + a matching child theme — each page **reviewable before
it's built**.

- **[Convert from a URL](./convert-from-url.md)** — the live-site / preview-link path.
- **[Convert from a file](./convert-from-file.md)** — a Stitch export or pasted HTML.
- Tick **AI assist** to have Claude refine the mapping + author a higher-fidelity stylesheet —
  **[AI assist](./ai-assist.md)**.

### Lane B — AI-assisted, high-fidelity build

When you need it *pixel-close* — a flagship page, a client site, a demo — pair the capture service
with an AI coding assistant (**Claude Code**) driving the build from your gathered inputs
(view-source + screenshot + media). This lane leans on the extra inputs from Step 2 and the
**method** below to reproduce the design **from Theme Settings + shortcode options** in a
near-empty child theme (not a wall of scoped CSS).

## Step 4 — Review & refine

- **Review before build** — the converter shows each section → the shortcode it will become; adjust
  roles before committing.
- **Diff against the screenshot** — compare the rebuilt page to your reference, section by section,
  and correct spacing / colors / type until it matches. Fidelity is measured, not guessed.
- **Iterate one thing at a time** — colors → typography → buttons → boxes → spacing → per-element,
  verifying each before the next (never a big-bang rewrite).

## What you end up with

- A **child theme** of `unysonplus-theme` reproducing the palette, fonts, spacing, and header/footer.
- A **dynamic header + footer** — a real WordPress nav menu + footer widget areas, styled to match.
- **Pages** rebuilt as page-builder sections → the right native shortcodes (`special_heading`,
  `icon_box`, `feature_list`, `counter`, `media_image`, `media_video`, `button`, `table`, …).
- **Media** in the Library (de-duped by source URL) and **styling presets** (palette, type scale,
  button styles, spacing) that the shortcodes *reference*.

## The method, in one breath

The north star both lanes aim for:

1. **Theme-Settings-first** — colors, typography, buttons, box/card presets, and spacing become
   **presets** that elements *consume*; if a needed control is missing, it belongs in the framework,
   not in hardcoded child CSS.
2. **Measure, don't guess** — read the source's **computed** styles (the `view-source` is
   authoritative) and match them; verify each step against the reference.
3. **Right element for the content** — pick the purpose-built shortcode (a stat number → `counter`,
   an icon list → `feature_list`, a single image → `media_image`, a video → `media_video`), and don't
   add motion the source doesn't have.

## Read next

- **[How it works](./how-it-works.md)** — the architecture + the conversion algorithm.
- **[The capture service](./capture-service.md)** — install once, endpoints, security, troubleshooting.
- **[Convert from a URL](./convert-from-url.md)** · **[Convert from a file](./convert-from-file.md)** · **[AI assist](./ai-assist.md)**
- **[Manual tools](./manual-tools.md)** — run a single conversion phase by hand.
