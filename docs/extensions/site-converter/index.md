---
sidebar_position: 1
title: Site Converter
---

# Site Converter

**Site Converter** turns an existing website — especially an **AI‑generated design** (Lovable, v0,
Bolt, Google Stitch, any Tailwind/Bootstrap page) — into a **native, fully‑editable Unyson+
WordPress site**: a child theme plus page‑builder pages, real menus, footer widget areas, and the
Media Library populated. Nothing is hand‑coded — every page stays editable in the builder.

It lives at **Unyson+ → Convert** in wp‑admin.

:::tip The one‑sentence mental model
Point it at a **URL** or upload a design **file**; it renders the design, reads the real layout and
styles, and rebuilds it as clean Unyson+ shortcodes + a matching child theme — pixel‑close, but
*editable*, not a frozen copy.
:::

## Two ways in — the same engine

| Input | Needs | How it renders |
|---|---|---|
| **Convert from a URL** | The local capture service running | A real browser (headless Chrome) loads the live site |
| **Convert from a file** | A Stitch `.zip` / pasted `code.html` | The capture service renders the file **the same way** — or an offline PHP fallback when the service is off |

Both inputs feed the **same deterministic extractor**, so they produce consistent, high‑fidelity
results. (A Google Stitch export is just self‑contained HTML — the service opens it in Chrome
exactly like a URL.) See **[How it works](./how-it-works.md)** for the architecture.

## What you get from a conversion

- A **child theme** of `unysonplus-theme` (`style.css`, `header.php`/`footer.php`) reproducing the
  source's palette, fonts, spacing and **header/footer design**.
- A **dynamic header**: your Site Logo/Title + a **real WordPress nav menu** (built by a
  framework‑agnostic *navigation mapper*, not a Bootstrap walker) styled to match the source.
- A **dynamic footer**: each source footer column mapped to a **widget area** (plus a copyright
  area), so you edit footer content in *Appearance → Widgets*.
- **Pages** rebuilt as page‑builder sections → the right shortcodes (`special_heading`, `icon_box`,
  `button`, `testimonials`, `counter`, `table`, …), each reviewable before it's built.
- **Media** fetched into the Media Library (de‑duped by source URL).
- **Styling presets** (palette, font sizes, button colors, spacing scales) and **theme settings**.

## The admin page at a glance

The Convert screen has three tabs:

- **Convert** — the happy path. Set up the capture service once, then convert from a URL or a file.
  Optionally tick **AI assist** to have Claude refine the mapping + author a higher‑fidelity
  stylesheet ([details](./ai-assist.md)).
- **Manual tools** — the piece‑by‑piece importers (bundle `.zip`, header/footer theme generator,
  images, styling presets, theme settings, pages, menus) for running a single phase by hand.
- **Diagnostics** — a capture‑service health check and the Theme Settings doctor.

## Read next

- **[How it works](./how-it-works.md)** — the architecture and the conversion algorithm.
- **[Convert from a URL](./convert-from-url.md)** — the live‑site path, step by step.
- **[Convert from a file](./convert-from-file.md)** — Google Stitch & other exports.
- **[The capture service](./capture-service.md)** — install once, endpoints, security, troubleshooting.
- **[AI assist](./ai-assist.md)** — optional Claude‑powered refinement.
