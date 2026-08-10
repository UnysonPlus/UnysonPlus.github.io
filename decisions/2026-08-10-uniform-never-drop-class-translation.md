---
slug: uniform-never-drop-class-translation
title: "When a source element's styling classes can't all map to native options — like a text logo's font-serif / tracking-tight / hover:text-primary — how should the converter translate them, and does the rule apply to chrome as well as content?"
authors: [jon]
tags: [conversion, architecture, page-builder]
date: 2026-08-10
description: A converted text wordmark ("Maison") kept its text/color/size/weight but silently dropped font-serif, tracking-tight, and hover:text-primary, so it rendered in the theme's sans instead of the source serif. Decision — one uniform three-tier translation for every element (native option → design token/preset → scoped custom CSS as a never-drop last resort), applied to CHROME (logo, menu, footer) exactly as to content, with the dropped-class QA gate extended to chrome so remaining drops are found by evidence.
---

**The question.** A source logo is a text wordmark:
`<a class="font-serif text-2xl md:text-3xl tracking-tight text-foreground hover:text-primary …">Maison</a>`.
The converter captured the text, colour, size and weight — but the output rendered "Maison" in the
theme's **sans** default, with none of the source's serif, tight tracking, or hover colour. So: when
an element's classes can't ALL map to native options, how should we translate them — and does the
rule we adopted for content sections apply to **chrome** (logo / header / footer) too?

<!-- truncate -->

**Context.** Earlier we adopted a strict "never-drop" rule for **content**: a class that maps to no
native option is carried as scoped `:where(selector)` custom CSS rather than dropped, enforced by a
parity gate that fails on any visually-significant dropped class. But that rule lived on the content
path. The **chrome** converters (logo/menu/footer → Theme-Settings values) had their own, older
mapping that captured *some* properties (the logo took colour/size/weight) and silently dropped the
rest (font-family, letter-spacing, hover). The `logo_custom_css` residual channel even existed — it
was used for the two-tone accent colour — but nothing routed the wordmark's font/tracking/hover
through it. So the never-drop principle was real for content and only partial for chrome.

**Options considered.**

1. **Patch the logo only.** Add font-family/letter-spacing/hover to `detect_logo`. *Pro:* fixes the
   reported case fast. *Con:* leaves the same gap on menu links, footer headings/links, and the
   tagline; we'd re-discover it element by element.
2. **Carry the whole raw class string onto the element.** *Rejected:* Tailwind utilities are dead in
   the builder (no runtime), so the classes do nothing; and it forfeits the editable native options.
3. **One uniform three-tier translation for every element — and extend the QA gate to chrome.**
   Per property: (1) a **native option** if the target exposes one (editable, clean); (2) a **design
   token / preset** for brand values (a colour → the Color Preset var, a face → a loaded font); (3)
   **scoped custom CSS** as the never-drop last resort (`logo_custom_css`, a section's `custom_css`,
   the header/footer custom-CSS layer). Then extend the dropped-class parity gate so it audits chrome
   elements' source classes, not just content builder nodes — so the remaining gaps surface by
   evidence instead of guesswork.

**Decision.** **Option 3.** The translation procedure is the same everywhere: **native option →
design token/preset → scoped custom CSS (never dropped)**, applied to chrome exactly as to content.
Concretely for the logo: font-family (`font-serif`) and letter-spacing (`tracking-tight`) have no
native logo option, so they're carried as scoped `.site-title-text{…}` in `logo_custom_css`; the
hover class (`hover:text-primary`, invisible to computed :hover) is read as a **semantic token** and
mapped to the theme's Color-Preset var (`.site-title a:hover .site-title-text{color:var(--color-primary)}`)
— portable and editable, not a hard-coded hex. Only a *distinctive* font family (serif/mono/display or
a named font) is carried, so a plain system-sans stack that already matches the theme body isn't
needlessly overridden. Mirrored in both converter engines (PHP `detect_logo` + JS
`capture-extract` / `to-theme-settings`).

**Why.** The bug wasn't "the logo mapper missed a field" — it was that the never-drop rule was scoped
to content while chrome kept an older, lossier mapping. Fixing only the logo would leave menu links
(`uppercase` / `tracking-[0.15em]` / hover) and footer typography with the identical gap. Making the
three-tier procedure **uniform** means one rule to reason about, and extending the QA gate to chrome
turns "which classes are we still dropping?" into a measured list rather than a hunt — the same way
the content gate already catches dropped width utilities. The token tier matters specifically for
brand values: routing the hover through `var(--color-primary)` keeps the logo consistent with the
rest of the converted palette and editable from Theme Settings, where a captured hex would silently
drift. Verified on a real convert: "Maison" now carries `font-family:"Cormorant Garamond", …, serif;
letter-spacing:-0.75px` and a primary-coloured hover, matching the source; golden fixture holds
(348/0). The remaining chrome targets (menu-link transform/tracking/weight/hover, footer
heading/link skin, tagline) are the next applications of the same rule, found via the extended gate.
