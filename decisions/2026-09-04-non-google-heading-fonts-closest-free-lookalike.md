---
slug: non-google-heading-fonts-closest-free-lookalike
title: "Why a non-Google heading font is substituted with the closest FREE Google lookalike, never re-hosted"
authors: [jon]
tags: [conversion, typography]
date: 2026-09-04
description: "A converted source often sets its headings in a licensed, self-hosted display face (jukeboxburgers.com uses Neutraface Condensed Titling — a commercial House Industries font, not on Google Fonts). We can neither load it nor legally re-host it. The question was how to handle it: ask the user to buy and upload it, have an AI hunt the web for a copy, or pick the closest free Google font automatically. The decision is a deterministic closest-free-Google-lookalike substitution — the licensed name stays first in the stack so a user upload still wins, but the browser actually renders a near match (Neutraface Condensed → Oswald) instead of a coarse web-safe fallback."
---

**The question:** When a converted site sets its headings in a **non-Google, licensed** display face — jukeboxburgers.com uses *Neutraface Condensed Titling*, a commercial House Industries family that is not on Google Fonts — the theme generator can't load it. Should the user download and set it **manually**, should the **deterministic + local AI hunt the web** for a copy to grab, or should the converter **pick the closest free lookalike** on its own?

<!-- truncate -->

## Context

The theme generator resolves a heading family from the capture, then loads it via `pick_google_fonts()` / `synth_google_fonts_url()`. Those only work for Google-hosted families. A licensed face like Neutraface simply 400s, and the heading falls through to whatever coarse web-safe name the source declared after it — for jukebox that was *Alfa Slab One*, a **wide** slab with the wrong proportions for a **condensed** titling face. The heading looked nothing like the source.

The signal that the primary is non-Google is already computable: `heading_fallback_stack()` returns a non-empty stack **only when the source declared ≥2 named families** (a licensed primary followed by a named fallback) — exactly the shape a self-hosted/licensed face produces. A single-family declaration (a plain Google font) returns empty and is left alone.

Re-hosting is the trap. Almost every non-Google display face is commercial or personal-use-only (Neutraface, Gotham, Avenir, DIN, Knockout…). Auto-downloading one and serving it from the generated theme would redistribute a paid font — a licensing violation baked into every converted site. So the font file itself is off the table.

## Options considered

- **Manual only — the user buys/downloads it and sets it in Typography → Custom Fonts.** *Pro:* perfectly faithful and unambiguously licensed (the user owns the copy they upload). *Con:* the 90% case (someone converting a site to see how it looks) gets a broken-looking heading with no hint why, and no guidance toward a fix.
- **Deterministic + local AI hunts the web for the font.** *Pro:* could sometimes find a free/near copy. *Con:* the same licensing minefield as re-hosting — "a curative site that has it" is usually a piracy mirror; automating grab-from-the-web is exactly what we must not do. Also non-deterministic and network-dependent, which the no-AI converter path must never be.
- **Closest free Google lookalike, chosen deterministically (chosen).** A small curated map of well-known commercial families → their nearest free Google font, backed by name-shape heuristics (condensed/narrow → Oswald, slab → Roboto Slab, mono → JetBrains Mono, script → Dancing Script, serif → Merriweather, titling/poster → Anton). Insert the lookalike into the stack **after** the original name; load the lookalike (a real Google font) instead of the licensed primary. Return nothing when no confident match exists, leaving the source's own fallback in place.

## Decision

The deterministic converter substitutes the **closest free Google Font** for a non-Google heading face, and never touches the font file:

- **`google_lookalike($name)`** — a curated map of commercial families (Neutraface, Gotham, Proxima, Avenir, Futura, DIN, Knockout, Garamond, Bodoni, Clarendon…) to their nearest free Google font, then name-**shape** heuristics for anything unmapped. A *condensed/narrow* variant of any family overrides to a condensed Google display font (Oswald). Unknown shapes return `''` — the converter does **not** guess a plain sans; it keeps whatever fallback the source declared.
- **Trigger:** only when `heading_fallback_stack()` is non-empty (the ≥2-named-fonts = licensed-primary signal). A plain Google heading is never rewritten.
- **Stack shape:** the licensed name stays **first** — e.g. `"Neutraface Condensed Titling", "Oswald", "Alfa Slab One", cursive`. A user who later uploads their licensed copy via **Typography → Custom Fonts** still wins (their `@font-face` matches the first name); the lookalike is the loadable middle ground the browser actually paints in the meantime; the source's own fallback remains as the last resort.
- **Loading:** the **lookalike** (Oswald) is what gets added to the Google Fonts request, so it actually renders. The licensed primary would only 400, so it is not relied on to load.

## Why

The user's framing — "manual, or AI-grab, or lookalike?" — has one option that's a legal non-starter (grabbing the font), one that's correct but user-hostile as a default (manual only), and one that degrades gracefully (lookalike). They compose: the lookalike is the **default** that makes a conversion look right immediately, and manual upload is the **escape hatch** for perfect fidelity when the user owns the font — and because the licensed name stays first in the stack, turning the escape hatch on requires *no* converter change, just an upload.

Keeping it deterministic (a curated map + shape heuristics, no network, no AI) matters because this runs in the no-AI converter path, which must be reproducible and offline. A near match in the right **proportion** (condensed → Oswald) is worth far more than an exact name that never loads or a coarse slab that loads but looks wrong. And refusing to re-host the file isn't just caution — redistributing a paid font from every generated theme would be a licensing liability we'd be shipping to users, so the font file stays the user's responsibility while the *look* is reproduced for free.

*Status: Accepted.*
