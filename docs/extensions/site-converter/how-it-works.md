---
sidebar_position: 3
title: How it works
---

# How it works — the short version

Site Converter renders your source (a URL, or an uploaded HTML/Stitch export), reads its **live DOM +
computed CSS**, and rebuilds it as a **native UnysonPlus site** — a child theme plus page‑builder
pages, real menus, footer widget areas, and a populated Media Library. Nothing is hand‑coded; every
page stays editable in the builder.

:::tip[💡 Web dev tip: a faithful clone can still inherit the original's problems]
Reproducing a source's DOM and computed CSS gets you a pixel-accurate copy — including any missing
alt text, skipped heading levels, or low-contrast text the original already had. A conversion is a
great starting point, not a finished, accessible page; give the result a quick pass afterward rather
than assuming fidelity to the source means it's already correct. [W3C WAI: Introduction to Web Accessibility](https://www.w3.org/WAI/fundamentals/accessibility-intro/)
:::

## Two engines, plus optional AI

| Engine | When it runs | Trade‑off |
|---|---|---|
| **Deterministic (offline)** | A **file upload** with the capture service **off** — pure PHP, no browser, no AI | Fast and fully **repeatable** (same input → same output), zero setup. Lower fidelity on JavaScript‑rendered pages. |
| **Capture service** | **From a URL**, or a **file upload** while the service is **running** — real Google Chrome reads the computed CSS + DOM | Highest fidelity, even for JS‑heavy pages. Needs the one‑time [service install](./capture-service.md). Still deterministic — no AI unless you turn it on. |
| **AI assist** *(optional)* | "Use AI" checked — **Claude** corrects the **mapping only** | Smarter element identification without touching the faithful CSS/chrome output. See [AI assist](./ai-assist.md). |

Everything runs **entirely on your machine** — nothing is sent to a third party.

> **Which do I use?** Need an identical result every time (a template you re‑import)? Use the
> deterministic/offline path. Need maximum fidelity from a live or JS‑heavy page? Use the capture
> service. Reach for AI only to clean up element roles after the fact.

## The full architecture & algorithm

The complete pipeline — capture → extract → apply → review → build, section detection, chrome‑vs‑content,
the role→shortcode map, the navigation and footer‑widget mappers, design‑token extraction, the
two kept‑in‑sync implementations, and exactly where AI fits — is documented once, canonically, in the
AI Dev Kit:

**→ [Conversion Architecture — pipeline & algorithm](https://docs.unysonplus.com/ai-dev-kit/conversion-architecture)**

That same engine powers both this plugin and the AI Dev Kit's agent‑driven builds, so the deep
reference lives in one place. This page and the other Site Converter pages
([Convert from a URL](./convert-from-url.md), [Convert from a file](./convert-from-file.md),
[the capture service](./capture-service.md), [AI assist](./ai-assist.md),
[Manual tools](./manual-tools.md)) are the **task guides** for using the extension in `wp-admin`.

## Button sizes: how many, and what they're called

The converter never invents sizes. It creates **exactly as many Button Sizes as the source has distinct button boxes**: every short-text link or button is clustered by its computed font-size, paddings and fixed height (small measurement noise collapses into one cluster), and each cluster becomes one size whose values are the most common ones in that cluster.

Sizes are **ranked by the box a reader perceives** — a fixed height (`height: 58px`, a Tailwind `h-11`), otherwise the font box plus vertical padding. Size means the button's box, not its type size: a tall pill with 10px uppercase text ranks above a shorter, padded button with 14px text.

Names follow two rules, in order:

1. **The source's own size names win.** A button carrying `btn-sm`, `btn-lg`, `btn-xl`, `button--large` and the like keeps that name.
2. **Otherwise the most-used size is "Default"** (slug `md`), and every other size is named by where it sits relative to it — *Large*, *X-Large*, *2X-Large* above; *Small*, *X-Small*, *2X-Small* below.

So a site with one button size gets a single **Default**; two sizes give **Default + Large** or **Default + Small**; three give **Small / Default / Large** — or **Default / Small / X-Small** when the default is the biggest. The size the site uses most is always the one a new button gets.

## Container width: the declared cap, not the measured one

The site-wide Container Width comes from the source's main content column. The capture measures that column in the browser, but a measurement is limited by the capture viewport: a shell declared as `width: min(1440px, calc(100% - 48px))` measures only 1392px at a 1440px-wide capture, and a converted site pinned to 1392 would never grow to the design's 1440 on a wider screen. So the converter also reads the source stylesheet's own declaration for that container — `max-width: 1440px`, `max-width: min(1440px, …)` or `width: min(1440px, …)` — and uses the declared cap when it is larger than the measurement (within a sanity bound, so an unrelated rule can't take over). Responsive `.container` steps are handled separately by the container ladder.

## Headers with two rows, several buttons, and chips

A masthead is rarely just logo · menu · one button, and the converter no longer forces it into that shape.

**Two rows become the Header's native rows.** When a source header stacks a *brand row* (logo, a label, the buttons) over a row that holds *only the menu links*, the menu is placed in the **Bottom Bar** (or the Top Bar when the links sit above the brand) in the column matching the source alignment. The nav row's rule line becomes the bar's own border on the edge facing the brand row, its fill becomes the bar background, and its padding and link spacing are carried exactly. The header's at-rest height is the brand row's height, since the theme lays the bar out as its own row.

**Every button in the header becomes a CTA Button element**, in source order, and each one is matched to the Button Preset that has its skin — colour, border, size — the same way body buttons are. A translucent "glass" button matches its glass preset; nothing falls back to a hardcoded style or size.

**A decorative label** beside the logo — a pill with a small glowing dot and a short line of text — becomes a **List Item** element: the text stays editable, the dot is an icon in the dot's colour, and the pill styling rides along. If the source hides the label on small screens, the element's *Hide On* checkboxes are set to match.

**The header's hairline and the menu hover colour** are read from the source's own stylesheet rules (`border-bottom` on the bar, `a:hover` on the links), so a faint translucent rule and a warm hover tint arrive as-is instead of the theme defaults.

**A header with no container wrapper is Full Width**, inset by exactly the side padding the source row used, so the logo and buttons sit where the design put them instead of at the theme's default gutter.

## Two-column cards: geometry, skins and rhythm

A split band, a text panel beside a photo tile, is where a conversion usually drifts. The converter reads each piece from the source's computed layout:

- **Unequal columns stay unequal.** A grid with `1.08fr .92fr` tracks becomes a native Grid carrying that exact ratio, not two equal halves.
- **Cards keep their height and centring.** A cell's minimum height and its vertically centred content are native flexbox options on the column.
- **Every card wears a Box Preset**, including a photo tile that holds only an image. The image fills the frame edge to edge and the preset clips it to the corner radius. A two-layer shadow (an inset highlight plus a drop) keeps both layers: the most visible one in the preset's Box Shadow field, the full value in the preset's CSS.
- **Pill labels become a chip row.** A row of short boxed labels is a wrapping flex row of Text Blocks, each wearing the same pill Box Preset, sized to content so nothing wraps.
- **Heading rhythm comes from the source.** A plain-CSS eyebrow folds into the heading's Overline with its exact size and tracking; the gaps between eyebrow, title and intro are read from whichever element carries the margin; an intro at the body size stays at the body size; a fluid `clamp()` title keeps scaling with the viewport.
- **A fluid heading stays fluid on every screen.** When the source sizes a heading with `clamp()` or `vw`, the converter carries the expression itself — never the pixel size measured at capture — and expresses the heading's line-height and letter-spacing relative to the font (`.9`, `-.06em`) so they scale with it. A title that is 80px at 1440 is 96px at 1920 in both the source and the conversion.
- **Decorative glows survive.** A blurred corner glow painted by a `::before` layer is carried onto the column as a scoped pseudo-layer, scaled in percentages of the card, and the card clips it as the source does.

## Stacked band cards

A stack of full-width band cards, each a painted panel beside a copy column, is read from the source's own layout rather than guessed from its child count:

- **A single-track grid is a stack**, not a row: the bands stay full width, one under another, with the source gap and the space above them.
- **Each band is a card that is also a row.** The card's radius, fill, hairline, shadow and height become a Box Preset on the row, clipped so the painted panel stays inside the corners; the two tracks keep their exact ratio.
- **An empty painted panel is content.** A cell that holds no text or image but is painted by the source (a stack of gradient blooms) survives as an empty cell carrying that paint.
- **The copy column keeps its inset and spread**, and its label, heading and paragraph fold into one Special Heading with the source's sizes and gaps.
- **A zero padding is a value.** A section the source deliberately sets to no top padding stays at zero instead of picking up the theme default, and a heading capped narrower than its section keeps its own measure without narrowing the section.

## Panels that hold content

A design often wraps a block of copy in a painted shape — a translucent card, a glass box, a large decorative ring — rather than laying cards out in a grid. The converter treats such a wrapper as a **panel**:

- **The wrapper becomes a container wearing its own Box Preset** (fill, gradient, hairline, shadow, corner radius), with its padding, its declared width or aspect ratio, and its place: centred when the source centres it, its content centred when the source does.
- **Panels nest.** A card inside a ring inside a centred shell converts as the same three layers, each editable.
- **Decorative layers on the shape survive** — an inner hairline ring and a blurred colour bloom drawn by `::before` / `::after` are carried onto the container, scaled to it, painted ones and bordered ones alike.
- **A radial or multi-layer fill** the preset's gradient field cannot express rides in the preset's own CSS.
- **The source stylesheet is read like a browser reads it**: a heading sized by a descendant rule such as `.card h2 { font-size: clamp(…) }` keeps that fluid size, and a later, weaker reset cannot override it.
- **Small pill labels stay a chip row**, and a label that sits flush on its heading stays flush — a zero gap is a value, not a missing one.

## No footer in the source, no footer on the page

Some designs end on their own closing band and never render a site footer. The converter notices when the source has no footer (or no header) and sets the page's native **Hide Site Footer** / **Hide Site Header** switch, so the converted page ends exactly where the design ends instead of growing a theme footer underneath. The switch lives on the page's Layout options, so you can turn the footer back on with one click.

## Signup forms become the Newsletter element

An email signup in the source — with or without a real `<form>` tag — converts to the native **Newsletter** element, and the import activates the **Newsletter CRM** so submissions are captured from the first visit. The converter reads the form the way a visitor sees it: a field wrapped in a pill keeps that pill (its fill, hairline, blur, shadow, padding and placeholder colour), a button below the field gives the stacked design with a full-width submit, the button wears the site's own Button Preset while keeping its exact type, and a glyph inside the field becomes the element's **Field Icon** — an inline SVG or a pack icon, or the nearest Lucide glyph by meaning when the source used an icon set the theme doesn't ship.

## Horizontal scroll strips

A row of wide cards that scrolls sideways — each card a fixed share of the container, snapping into place, the scrollbar hidden — is kept as exactly that: one non-wrapping row that scrolls on the x axis with the source's item width and snap points, never squeezed into a three-column grid. A card that is itself a two-column layout (copy beside a painted panel) keeps that layout, its skin, and its exact heading size inside the strip.

Rows also keep their line discipline: a row the source does not wrap stays on one line, and a cell capped to a fixed width (an intro capped at 400px beside a heading) holds that width while the heading takes the rest — so the heading breaks where the source breaks.

## Rounded bands with rows inside

A design's closing band is often one large rounded shell — a gradient wash with a soft glow, clipped corners, a two-column grid inside and a thin footer row underneath. The converter keeps every piece:

- **The shell fills the section.** When the shell's own width is the site's container rule, the panel fills the section instead of subtracting the gutter twice; its inner wrapper's padding becomes the panel's inset; a glow layered over a gradient stays layered, and the shell clips like the source.
- **Rows keep their layout inside a panel** — the exact column ratio, the gap, bottom alignment, a `space-between` spread with content-sized cells, and the row's own margin, inset and one-sided hairline (a Box Preset whose border sits on one side).
- **A column that is a stack of cards** (two glass stat cards, spaced by a gap) converts as that stack, gap included; a big word beside a big number is a stat value like the number.
- **Plain tag rows stay rows**, and a bare line of text in a cell stays a text block.
- **The stylesheet is read for the capture's viewport**: a mobile-only rule never overrides the desktop one.

## Tints painted by pseudo-elements

A dark wash over a hero video or photo is often not an element at all but a `::before` or `::after` layer on the section — for example a radial vignette stacked on a top-to-bottom fade. The capture records such a covering pseudo-layer, and the converter splits it: the linear fade (or a flat colour) becomes the section's native **Background → Overlay**, editable like any other, while layers the overlay field cannot express (the radial vignette) are carried verbatim as a scoped pseudo-layer on the section. The tint reads like the source, and nothing is painted twice.

## Boxed text and floating notes

A paragraph that is *also* a box — a translucent glass callout, a bordered aside — is not folded into the heading's subtitle (a subtitle can't carry a box). It becomes a **Text Block wearing a real Box Preset**: the converter reads the box's fill, border, corners, shadow, padding and blur from the source and registers them as a preset under Theme Settings → Components → Box Presets, then assigns it on the block's *Styling → Box Style*. Edit the preset once and every block that wears it follows.

A short text **pinned over a band** (a note at `left: 8%; top: 18%` of a hero) keeps its placement through the native **Position** option (Advanced tab): the converter carries exactly the sides the source declared — a percentage stays a percentage — and makes the section the positioned ancestor so the note measures against the band, exactly like the source. The note itself also wears a Box Preset for its pill.
