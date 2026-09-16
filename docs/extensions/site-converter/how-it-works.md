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

## Bands keep the source container

Many designs hold each band inside a plain shell — a wrapper declared as the site container (say, up to 1440px wide, centred, with a 24px gutter) or simply padded on the sides. The converter reads the declared rule, not just how it happened to measure at capture time: a declared container becomes the band's **Content Width** cap plus the theme's native **Container Gutter**, so the band sits exactly where the source band sits on every screen size — inset on a laptop, centred at its cap on a wide monitor. A wrapper that is only a fixed side margin or padding keeps that inset as the band's **Spacing** margin. Both the one-shot Convert flow and a bundle import go through the same mapper setup, so they produce the same page.

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

## Phones are measured too

A page is captured at desktop width and again at phone width, and only what changes between the two is kept: a section's tighter phone rhythm, a card's smaller inset, a minimum height that no longer applies when cards stack, a heading or paragraph that steps down a size, an element the design hides on small screens. Each of those lands on the option the theme already makes responsive (section padding tiers, the cell's Min Height tiers, Responsive Hide) or on a scoped phone rule, so the converted page follows the design on a phone instead of relying on generic breakpoint behaviour. Images that fill a card beside their text return to their natural height when the layout stacks. Tablets are measured as well, so the middle tier follows the design too: a grid the design stacks at its own tablet breakpoint stacks on tablets on the converted page, and the side gutter tightens on phones the way the design does.

## Headers are measured, never inherited

A masthead is read by geometry: the brand row and a links-only row count as two rows only when one box sits below the other, so a classic one-row header (logo, links and actions side by side) keeps its menu in the centre zone and a genuinely stacked header sends its menu to the bottom bar. A plain text link beside the call to action ("Sign in") is carried as its own element, the menu's size and weight are the values most of the visible links share (a hidden phone drawer is never sampled), a captured hover colour beats any guess at the active item, and colour values are cleaned before they become theme options. A conversion also owns every header and footer design key it can emit: whatever the new source gives no signal for is reset to the theme's default, so nothing from the previous conversion — a drawer colour, a bar fill, a tagline — survives into the next.

## Bento grids, toolbar rows and the whole button

A grid whose tiles span different numbers of tracks across several rows is rebuilt from what the capture measured: tiles that share a top edge form a row, each keeps its measured width and height. A title bar made of short labels and dots spread across a row stays a row, with its placement, hairline, padding and tint. A hero intro's bottom padding is the gap before the buttons it precedes, a page whose source has no masthead hides the theme header, and a footer's row of pill links stays a row. A button is carried whole: its resting look, its hover transform and shadow, the layers it draws with ::before and ::after, the hover state of each, and the keyframes they animate with — the converted button moves exactly like the source, with no library effect substituted on top.
## A page without sections

Some pages put everything in one `<main>`: a hero wrapper, then a card grid, with no `<section>` tags — and a video
pinned behind the whole page by a fixed wrapper. The converter cuts the container into bands (each becomes a section,
and the container's own top and bottom padding go to the first and last band), keeps a band content-tall rather than
stretching it to the viewport, reads a band that is itself a card grid as that grid (cards, box presets, icon badges),
and routes the page-wide video to **Theme Settings → General → Layout → Site Background** as a fixed video, so every
section stays transparent over it. A signup pill whose button sits inside the field becomes the newsletter's
**Capsule** design; a masthead that is the `<nav>` keeps its wordmark and its button; a footer that is only a brand
and a disclaimer becomes those two columns, with no invented copyright line.

## A page laid out on a grid canvas

Some pages have no sections at all: the whole page is one grid, and each piece — the hero copy, a product card, a tile —
sits on its own tracks, side by side and offset from one another. The converter now reads that placement. Pieces that share
a grid row become one row of columns at their measured widths, each keeping its own top margin and the offset that pushed
it right, so the asymmetric composition survives instead of collapsing into a stack of full-width bands.

The same page taught a few more shapes. A video pinned to the right half of the viewport, masked and glowing, that the whole
page scrolls over is the site's background video, not the first section's: it lands on Site Background (fixed) and keeps
its width, anchor, mask, filter and glow. A fixed bar of three plain labels with no links is still the masthead — the label
matching the site's name becomes the wordmark, the others ride as chips, no menu is invented, and its blend mode stays so
the labels read over light and dark. A card's empty gradient frame becomes a real painted block that grows to fill the card;
a price beside a button stays a row; and an empty ring holding a blurred dot renders as a painted emblem rather than
invisible markup.

## The header lockup is the site identity

A header that stacks a small eyebrow over the wordmark — "ARCHIVE" over "Basin Trust" — is the site's identity, and the
theme keeps that identity in one place: the Site Title and Tagline in Settings → General mirror the header's own title and
eyebrow. The importer now lets the measured lockup own both, so the browser tab, the header and the footer all read the
source brand exactly as the source stacked it; the page `<title>` only fills the tagline when the header carried none.

The same page taught a few layout shapes: a bento tile that spans two rows beside smaller tiles is split by its column,
not folded into one row of slivers; the small row of a glyph and a boxed chip at the top of a panel keeps its two ends
apart, and the chip keeps its own width and its monospace face; a stat keeps the weight and family its digits were set
in, and its caption goes through the same Text Style matching as any label; a video that carried a filter no longer
paints black under its frames while it loads; and a button filled with a modern colour notation (oklch, oklab, hsl)
still finds its button preset.

## Rules that live on the page itself

Not every rule belongs to a section. A source can style its `<main>` or `<body>` directly — a background that darkens as
you scroll (a scroll-driven animation with its keyframes), a page-wide blend. Those classes are never dropped: their
rules travel to **Misc Custom CSS**, re-pointed at the theme's own `main` and `body`, keyframes included, with the
wrapper's layout left to the theme. The same page taught a few more shapes: a numbered chip beside a hairline and a
label becomes one line whose rule grows to fill the row; a mock editor of code lines becomes one code block that keeps
its indents and token colours; a huge faint heading pinned behind a title becomes a watermark on the Position option;
a stat whose value is a glyph (∞) still sits in the stat row; footer columns titled by small uppercase labels are
columns; and the body font is the face the paragraphs actually use, not the second family a font URL happens to list.

## Sharp corners, centred rows and other unrounded facts

Not every card is rounded. A console-style design draws its cards, its terminal window and its spec table with
square corners, and a card with a fill, a full border or a shadow is a card whatever its radius. A grid that centres
its columns vertically (`items-center`) puts a shorter copy column lower than the taller card grid beside it, so rows
are found by what overlaps vertically, not by matching tops. A statistic keeps a comparison sign as its prefix and a
unit written onto its digits as its suffix (`< 1.2ms`), while a number inside a filename or a small "TTY // 1" label is
left alone. A numbered card that also carries a label and a status line stays a card (the steps element would drop
both). A terminal's title bar — three window dots beside a filename, a label at the right — is rebuilt as that bar with
its fill and hairline. A footer column titled over a row of icon links becomes that column, and every icon in the row
becomes a profile, even a glyph no network names. A page-wide fixed grid pattern behind everything goes to the theme's
Site Background Pattern.

## Type lands on presets, not on the paragraph

A small label — uppercase, tracked, 12px, a muted ink — is a typographic role, not a one-off. The converter matches a
text's measured treatment (size, transform, tracking, weight) against the Text Styles it derived for the site and
sets the block's **Text Style** to the one whose every declared property agrees, so a tracked uppercase label takes
the Eyebrow rather than whatever style is merely closest in size; its colour goes to the block's **Text Color**. Nothing
is written inline on the paragraph: what the preset owns stays on the preset, and the little that is per-instance (a
zero margin, no wrapping, a separator dot's size and tint) rides the block's own Custom CSS. A line of short labels
separated by dots becomes one text block of spans, laid out as the same flex line, instead of three elements in a row.

## Entrances and their sequence

Many sites animate their content in with a pair of classes — one that hides an element (`opacity: 0` plus a small
offset and a transition) and one that reveals it once it scrolls into view — with delay helpers that stage a title,
then a paragraph, then a form, or the cards of a grid one after another. Those are not framework hooks, so nothing
used to carry them. The capture now pairs each hidden rule with its shown rule and records what it measures on every
element it matches: the direction and distance of the offset, whether it scales in, the transition's duration, its
delay, and the timing function. The converter turns that into the element's **Scroll Motion → Reveal** (from the
Animation Engine, which the import switches on when a source needs it): the same direction and distance, the delay
kept exactly so the sequence plays as staged, the character chosen from the offset (a plain slide is Subtle, a
scaled-in entrance Standard or Dramatic) and the nearest GSAP ease for the source's curve. A card that animates as a
whole gets its reveal on its column, so the stagger belongs to the grid, not to the icon inside each tile. A field
row that brightens when the pointer is over it keeps that hover as a scoped rule on the newsletter.

## A footer built as a panel

A footer whose rows sit inside one inset panel — a bordered or tinted, padded shell with a width cap and a bottom
label bar — converts to the theme's **Boxed Body** footer rather than flattening to plain bars. The converter reads
the panel's measures (its cap from the wide-viewport pass, the gutter from its side margin, padding, fill, border,
shadow, radius) into the option, sets every bar inside it to full width, and carries the rows' own vertical
rhythm as scoped CSS. A decorative strip inside the panel (an empty, absolutely positioned gradient) becomes the
panel's pseudo-element. A lead heading with a small label above it keeps the label as an eyebrow; a grid whose
columns share a baseline sets the row's **Column Alignment** to Bottom; the columns take the grid's measured
split. The footer's last row, when it is a bar of short labels rather than a © line, becomes the copyright bar's
columns as they are — nothing is invented in its place. Translucent hairlines and muted colours keep their alpha
instead of flattening to a solid.

## Spacing that belongs to a wrapper

A grouping wrapper the converter flattens (a centred heading group with a bottom margin, a strip pinned to the bottom of a hero with its own padding) hands its vertical margin and padding to the first and last block it produced, and those land on the block's native Spacing — under a section heading, above a "trusted by" caption, below its logo row. A button only inherits a wrapper's margin when that wrapper holds nothing but buttons, a hero's header clearance is read from its first in-flow child only, and a heading asserts its own captured top margin so a theme default cannot double a carried gap. Brand strips built from icon marks beside visible names keep those names, the strip's measured gap and its item typography; a card's icon chip is its icon, never a decoration; and when a page carries two distinct outline button designs each becomes its own preset, so a header call to action keeps its own border and hover instead of wearing the plan buttons' style.

## Utility classes: measured, never listed

Sites built with a utility-class framework generate their classes from a grammar — a utility, a value (often arbitrary), and any stack of variants — so there is no finite list to map, and the converter keeps none. Two things make that safe. For a captured site the framework's own generated stylesheet is carried whole and scoped to the mirrored markup, so every responsive, state, dark-mode, print and attribute variant an untouched block relies on keeps working. And every element the converter *rebuilds* as a native element is rebuilt from what the browser computed, not from the class names: a brand-filled card's white title becomes the native Title Colour because the title's measured ink differs from the page's; a card's hover ink and a `group-hover` title become hover rules because the capture stamped the change; a two-up tablet grid under a three-up desktop, a card that spans the whole tablet row, a card hidden only on tablets and desktops, a 64px round avatar, an uppercase tracked description that truncates, and a 4px accent bar drawn by a pseudo-element are all read from measurements at 390, 820 and 1440 pixels. A probe page of 36 utility families graded on the rendered result now matches on 48 of 55 checks; the misses left are a lone input inside a card, list-item variants, and a link inside a card that becomes the card's link.

A second pass closed the structural gaps: the rhythm between a card's paragraphs (a `space-y` gap, a `divide-y` hairline) is read from the second paragraph; a card whose title and text sit side by side becomes a row from the width the source makes it one; a form field's focus ring is resolved and carried onto the signup input; an empty painted box inside a card — an aspect-ratio placeholder, a pattern tile — survives as a styled box in the description; a styled inline label keeps its vertical writing mode and tracking; and a fourth capture viewport (1920px) feeds the `2xl:` tier of section padding, card insets and type sizes. The converter also stops adding a panel's padding to its children twice, follows a wrapper's inset per viewport, and keeps a chip row on one line on phones when the source does.

## The long tail of CSS

Beyond layout, colour and type, a design leans on dozens of one-off properties: a card at 72% opacity, a grayscale photo, a clipped or masked panel, an outline with an offset, a single accent border on the left, a gradient border, a tiled background, a text shadow, an italic line, a two-line clamp, multi-column text, a sticky sidebar, a card that lifts on hover, a colour written with color-mix(). The converter reads all of these from the rendered page and keeps them where they belong: box-level properties ride the card's Box Preset (so two cards that differ only in opacity or hover get their own presets), text properties ride the heading or text element, an image's own treatment rides its picture, and a cell's order or self-alignment becomes the native option. Both engines carry the same set, proven by the same fixture.

## Animated pseudo-elements

A card whose `::after` sweeps a band of light across it (an oversized gradient layer with a transform, a keyframe animation and a blend mode) is read from the stylesheet rule the designer wrote, not from a single frame of the running animation. The converter carries the layer's position, gradient, transform, animation and blend mode onto the element's scoped CSS, keeps the host clipped like the source, and brings the keyframes along under a name unique to that element, so the sweep keeps moving on the converted page and never collides with another site's animation of the same name.

## Tints painted by pseudo-elements

A dark wash over a hero video or photo is often not an element at all but a `::before` or `::after` layer on the section — for example a radial vignette stacked on a top-to-bottom fade. The capture records such a covering pseudo-layer, and the converter splits it: the linear fade (or a flat colour) becomes the section's native **Background → Overlay**, editable like any other, while layers the overlay field cannot express (the radial vignette) are carried verbatim as a scoped pseudo-layer on the section. The tint reads like the source, and nothing is painted twice.

## Boxed text and floating notes

A paragraph that is *also* a box — a translucent glass callout, a bordered aside — is not folded into the heading's subtitle (a subtitle can't carry a box). It becomes a **Text Block wearing a real Box Preset**: the converter reads the box's fill, border, corners, shadow, padding and blur from the source and registers them as a preset under Theme Settings → Components → Box Presets, then assigns it on the block's *Styling → Box Style*. Edit the preset once and every block that wears it follows.

A short text **pinned over a band** (a note at `left: 8%; top: 18%` of a hero) keeps its placement through the native **Position** option (Advanced tab): the converter carries exactly the sides the source declared — a percentage stays a percentage — and makes the section the positioned ancestor so the note measures against the band, exactly like the source. The note itself also wears a Box Preset for its pill.
