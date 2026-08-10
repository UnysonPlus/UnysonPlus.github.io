---
slug: container-widths-as-a-converter-populated-preset-family
title: "When a source constrains its content to a max-width the theme has no preset for, should the converter snap to the nearest fixed preset, emit a per-section custom width, or tokenize container widths into a reusable library?"
authors: [jon]
tags: [architecture, page-builder, shortcodes]
date: 2026-08-10
description: "A converted section used the source's `container-narrow` (64rem) but the section shortcode's Container Width presets were fixed (narrow 768 / medium 896 / wide 1024 / custom). Decision — make Container Widths the sixth converter-populated preset family: a named library (Theme Settings → Components → Section Styles → Container Widths) that the converter gathers from the source's distinct widths, clustered and standard-named, with every constrained section referencing a shared named width. Rejected — snap-to-fixed-preset (no reuse for non-standard widths) and per-section custom (repeats a value site-wide, no single edit point)."
---

**The question:** A converted "About" section used the source's `container-narrow` class
(`max-width: 64rem`). The section shortcode's **Container Width** control offered only fixed presets
— Narrow 768 / Medium 896 / Wide 1024 / Custom. 64rem *is* 1024px, so this one mapped to Wide — but
the general problem stood: **when a site uses a container width the theme has no named slot for
(and reuses it across many pages), how should the converter represent it** so the result is faithful
*and* reusable, not a value copy-pasted onto every section?

<!-- truncate -->

**Context.** The converter already builds **five converter-populated preset families** — button
colors/sizes, section styles, box presets, color presets, icon-badge presets. Each is gathered from
the source, written into a Theme-Settings library, and read dynamically by the shortcodes. That
pattern — *source → clustered library → shortcode references the library* — is the house style for
"a reusable thing the whole converted site shares." Container width is the same shape of problem: a
per-section property with a small set of distinct values a site reuses.

Two facts framed the options:

- **Design-system sources land on standard steps.** The theme's fixed presets (768/896/1024) are
  exactly Tailwind's `max-w-3xl/4xl/5xl`, so a measured width usually *matches a preset value* — the
  hard case is only the recurring **non-standard** width (e.g. 1120px on many pages).
- **A width lives in one place or many.** If the value is inlined per section, changing it means
  editing every section; if it's a named token, it's one edit.

**Options considered.**

1. **Snap-to-fixed-preset, custom as fallback.** Map the measured width to the nearest of
   narrow/medium/wide within a tolerance; otherwise emit a per-section `custom` width. *Pro:* zero
   new surface; solves the standard-step case (and the scandi `container-narrow` → Wide case)
   immediately. *Con:* a recurring **non-standard** width becomes `custom: 1120px` repeated on every
   section — no reuse, no single edit point. Exactly the thing to avoid on a site that leans on one
   odd width.
2. **Per-section custom width, always.** Faithful, but the worst for reuse — every section carries
   its own inlined value; there's no named concept at all.
3. **Tokenize as a converter-populated preset family.** A **Container Widths** library
   (`{ name, width }` rows) the converter gathers from the source's distinct content-band widths —
   clustered (±16px, so measurement noise doesn't spawn near-duplicates) and **standard-named**
   (a value match to `max-w-2xl…7xl` reuses "Prose/Narrow/Medium/Wide/…", non-standard gets
   "Content 1120"). The section's Container Width dropdown reads the library; every constrained
   section references a **shared named width**. *Pro:* named reuse at *any* value, one edit point,
   and it's the same mechanism as the five existing preset families. *Con:* more moving parts than a
   snap — a new library file, a Components group, the dropdown wiring, and the converter's gather +
   per-section map.

**Decision.** **Option 3 — Container Widths becomes the sixth converter-populated preset family.**
Placed in Theme Settings → **Components → Section Styles → Container Widths** (below the Section
Styles list, the other reusable per-section axis). The three defaults keep the slugs
`narrow`/`medium`/`wide` so existing sections render unchanged. The converter's
`build_container_width_presets()` gathers the source's distinct centered content-band widths,
clusters and standard-names them, and `map_container_width()` sets each **genuinely-constrained**
section (narrower than the global container) to the matching named slug — a section whose cap is
effectively the global width simply **Inherits** rather than pinning a redundant width.

**Why.** Snap-to-preset was "cheap enough" but structurally caps out: it can't give named reuse to a
non-standard recurring width, which is precisely the case that motivated the question. Tokenizing
costs more up front, but it's the *consistent* choice — it slots into the existing preset-family
architecture the converter already uses everywhere else, so a maintainer meets one pattern, not a
special case. It also earns the reuse the whole idea was about: change "Content 1120" once and every
section that references it updates. The clustering + standard-naming + inherit-when-near-global rules
keep the generated library tidy (verified on a real convert: three defaults plus the source's actual
Prose 672 / wide bands, with only the two sections that truly narrow their content pinned to a named
width). The upfront cost is bounded because the machinery — a Theme-Settings addable-box, a slug map,
a dynamic dropdown, a converter cluster pass — already existed five times over.

**Update (2026-08-11) — where the preset CSS lives.** The named-library widths are now generated
**once** as reusable `.section--cw-{slug}` classes in `presets-{hash}.css` (by `css-tokens.php`, keyed
into the preset hash so editing a width regenerates it) — exactly like Gap and Section Variant. The
section view adds the class for a preset; only a one-off **Custom** width is written per-instance into
`page-{id}.css`. Earlier the whole control routed through the per-page file, which duplicated a shared
width (e.g. "Narrow") into every page; the class form defines it a single time and caches it site-wide,
so this slots the library into the same generated-preset mechanism the other families already use.
