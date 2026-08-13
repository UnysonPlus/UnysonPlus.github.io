---
slug: converter-maps-to-native-options-not-tailwind-class-transplant
title: "When the deterministic converter reads a source built in Tailwind, why not just copy the source's Tailwind classes into each shortcode's Advanced → Custom CSS Class field and be done — instead of mapping every element to native options?"
authors: [jon]
tags: [conversion, architecture, page-builder]
date: 2026-08-13
description: A converted site looked wrong, and the tempting shortcut was to transplant the source's Tailwind class names (grid-cols-2, min-h-screen, items-center) onto each element's css_class. Decision — never transplant class NAMES; keep mapping to native options + concrete scoped CSS VALUES derived from the captured computed styles. Class names have no CSS on a non-Tailwind target (dead strings), the transplant is the maximal version of the inline-style hack we already banned, and the converter already extracts the same intent as editable output.
---

**The question.** A Tailwind-built source (a jiro.build finance template) converted badly on
localhost. The obvious shortcut surfaced: the source markup is *full* of Tailwind utilities that
already encode the design (`grid grid-cols-2 gap-16 items-center`, `min-h-screen`,
`absolute inset-0`, `text-4xl font-bold`) — so why does the converter bother mapping each element to
native shortcode options at all? Why not paste the source element's class string straight into the
shortcode's **Advanced → Custom CSS Class** (`css_class`) field and let those classes do the work?

<!-- truncate -->

**Context.** The deterministic converter's whole output contract is an **editable native site**: a
source element becomes a real shortcode with real option values (a column's `align_self`/`content_v`,
a heading's typography, a section's background), so the user can open the builder and change things
with controls. Where no native option can express a source detail, it's carried as **concrete CSS**
— to the element's own `custom_css` att, the child theme `style.css`, or Theme Settings → Misc Custom
CSS, chosen by scope (see the never-drop-css-placement decision). Crucially, the converter already
*reads* Tailwind: `FW_Site_Converter_Tailwind` parses the source's config, and every element carries
its **resolved computed styles** in `data-sc-cs` (real `px`/`rem`/`rgb`), which the mappers turn into
native values. So "use the Tailwind design intent" is already happening — via resolved *values*, not
class *names*. The transplant idea is specifically: skip the mapping, keep the class *strings*.

**Options considered.**

1. **Transplant the source class names into `css_class`** — copy `class="grid grid-cols-2 gap-16
   items-center …"` verbatim onto each element's Custom CSS Class field. *Rejected on three hard
   points:*
   - **The names have no CSS on the target.** `grid-cols-2` / `min-h-screen` / `items-center` only do
     anything because *Tailwind's stylesheet* defines them. A converted UnysonPlus site ships **no
     Tailwind**, so those strings render as inert dead class attributes — zero layout, zero styling.
   - **To make them live you'd have to ship all of Tailwind** into every converted site — megabytes of
     utility CSS, plus its reset/preflight fighting the theme — which defeats the point of a clean
     native theme and reintroduces exactly the framework coupling the conversion exists to remove.
   - **It's the inline-style hack, squared.** We had just banned dumping computed styling inline (the
     footer lead heading) in favour of native options + scoped rules. Pasting dozens of opaque
     utilities into the Advanced tab is the *maximal* form of that anti-pattern: the builder's own
     panels can't reflect them (a column would read "Top / Default" while stray `items-center` fights
     it), they're not editable, and they silently override the native controls.
2. **Ship a scoped subset of Tailwind + transplant classes** — emit only the utilities the source
   actually used, namespaced. *Rejected:* still non-editable opaque classes in the builder, still a
   parallel styling system competing with native options, and now a bespoke per-site CSS bundle to
   maintain — all cost, none of the "editable native site" benefit.
3. **Keep mapping to native options + concrete scoped CSS values** *(chosen)* — resolve each source
   element's `data-sc-cs`/Tailwind intent to a native option where one exists, and carry the residue
   as concrete CSS values (not class names) to the scope-appropriate destination.

**Decision — Option 3. Never transplant Tailwind class names; map to native options, carry residue as
concrete CSS values.**

- Source intent is read from the **resolved computed styles** (`data-sc-cs`) and the parsed Tailwind
  config, then expressed as **native shortcode/theme-settings values** (the editable surface).
- What no native option covers is emitted as **real CSS declarations** (`px`/`rem`/hex), scoped to the
  element/section/chrome by the never-drop placement rule — framework-free, so it works with no
  Tailwind present.
- `css_class` stays what it's for: a **hook / a handful of theme-shipped utility classes**
  (spacing/alignment utilities that DO exist in the theme), never a transplant of a foreign
  framework's class vocabulary.

**Why.** The transplant is seductive because the Tailwind classes visibly *are* the design — but a
class name is a **reference into a stylesheet we don't ship**, so copying the reference without the
stylesheet copies nothing. The value already lives in the capture (`data-sc-cs` is the class *resolved*
to concrete numbers); mapping that to native options is strictly more useful than the class string,
because it's both faithful *and* editable. And the transplant would undo the very principle we'd just
committed to twice — native options over opaque CSS — trading a clean, controllable native site for a
pile of dead or framework-coupled class attributes. The converter's real failures on that finance
template were never "we ignored Tailwind"; they were specific detection bugs (chrome not reset between
runs, an absolute-overlay hero flattened, two-column widths collapsing). Those get fixed in the
detection code — which keeps producing editable native output — not by abandoning the mapping for a
class-name paste.
