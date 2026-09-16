---
title: DOM structure
sidebar_position: 1.5
---

# DOM structure

This page is the reference for the markup the Unyson+ Theme renders — from `<body>` down to a
page-builder `<section>` and its Flexbox layout. The theme aims for a **lean, landmark-correct tree**: one
theme-owned layout root, semantic `<header>` / `<main>` / `<footer>`, and no wrapper `<div>` that
isn't doing a real job. Everything below reflects the current output.

## The skeleton

Every front-end page renders this outer shape:

```html
<body class="… unyson page-builder site-full layout-top spacing-… sidebar-none …">
  <div id="wpadminbar">…</div>            <!-- WordPress core, logged-in only -->
  <!-- wp_body_open() injections land here: cookie banners, tag-manager <noscript>, … -->

  <div id="page" class="site">            <!-- the theme's layout root -->
    <a class="skip-link screen-reader-text" href="#main">Skip to content</a>

    <header id="masthead" class="site-header site-header--…">…</header>   <!-- banner -->
    <div id="primary-navigation-drawer" …>…</div>                        <!-- mobile drawer -->

    <main id="main" class="site-content site-main …" role="main">…</main> <!-- main -->

    <footer id="colophon" class="footer …">…</footer>                    <!-- contentinfo -->
  </div>

  <!-- wp_footer() injections land here -->
</body>
```

Three landmarks, one wrapper. `#page.site` is the only structural `<div>` between `<body>` and the
landmarks, and it is load-bearing (see below). There is **no** `#content` wrapper around `<main>`
any more — its role moved onto the content element itself.

## `<body>` classes

The body carries the switches that drive the whole layout. The ones the theme sets (alongside
WordPress's own `page`, `page-id-N`, `logged-in`, …):

| Class | Meaning |
| --- | --- |
| `unyson` | The Unyson+ plugin is active. |
| `page-builder` | This post's content is built with the Unyson+ page builder (vs. classic/Gutenberg). |
| `site-full` / `site-boxed` / `site-framed` | Site Width Mode (General → Layout). |
| `layout-top` / `layout-vertical-left` / `layout-vertical-right` | Header Layout Mode. |
| `spacing-compact` / `spacing-normal` / `spacing-spacious` | Content-density / spacing scale. |
| `sidebar-none` / `sidebar-left` / `sidebar-right` | Resolved sidebar for this view. |
| `sidebar-collapse-lg` | Sidebar collapses under the `lg` breakpoint. |
| `layout-width-narrow` / `-wide` / `-full` | Per-view content width override. |
| `page-layout-landing` | Landing-style page (zeroes `.site-content` padding). |

## `#page.site` — the layout root

`#page.site` looks like a plain site wrapper but is **structurally load-bearing for three systems**,
which is why it is never collapsed into `<body>`:

1. **Sticky footer** — `.site { display:flex; flex-direction:column; min-height:100vh }`, with the
   content element `flex:1 0 auto` and `.site > footer { flex-shrink:0 }`.
2. **Boxed / Framed site widths** — a two-layer model: `<body>` paints the outer surface (site
   background / frame colour / margin gap) and `#page` is the inner box that Boxed centres and
   Framed insets.
3. **Vertical header mode** — `.site` becomes a CSS **grid** whose direct children are placed into
   rail / content / footer cells.

`<body>` can't take over these roles because it is a shared namespace — WordPress core (`#wpadminbar`)
and every `wp_body_open()` consumer (cookie banners, analytics, chat widgets) inject **direct
children** into it, which would become flex/grid items and break the layout. `#page` is the one root
the theme fully controls. See the design decision [Why the #page wrapper stays](/decisions/keep-page-wrapper-as-site-layout-root).

## `<main>` — the content element

`<main id="main" role="main">` is the skip-link target and the sole `<main>` landmark. What wraps it,
and what it wraps, depends on whether the page is builder-driven.

### Builder pages (the common case)

A builder page is a designed composition, not a syndicatable article, so it emits **no `<article>`** —
`<main>` *is* the page's content element and carries the `post_class()` hooks directly:

```html
<div id="page" class="site">
  <header id="masthead" …>…</header>

  <main id="main"
        class="site-content site-main post-71 page type-page status-publish hentry"
        role="main">
    <div class="fw-page-builder-content entry-content">   <!-- plugin wrapper (see below) -->
      <section class="section …">                          <!-- one page-builder section -->
        <div class="fw-flexbox fw-flex fw-gap-24px …">     <!-- a Flexbox: a flex row -->
          <div class="fw-flexbox fw-span-12 fw-span-lg-6 …">  <!-- a Flexbox child: responsive span -->
            …shortcode content…
          </div>
        </div>
      </section>
      <!-- more sections… -->
    </div>
  </main>

  <footer id="colophon" …>…</footer>
</div>
```

`<main>` is a **direct child of `#page`**, a sibling of the header and footer. It carries
`site-content` (the sticky-footer flex-grow region + the Vertical grid's content cell) plus the
`post_class()` output, so plugins and CSS that key off `.post-<id>` / `type-page` / `hentry` keep
working. (The `id="post-<id>"` attribute is not duplicated — `<main>` keeps `id="main"` for the
skip link; the `post-<id>` *class* is preserved.)

### Classic / Gutenberg pages, and posts

When the content is **not** builder-driven, the theme keeps the conventional wrappers — a container
holds `<main>` (and the sidebar, when one is active), and `<article>` wraps the entry:

```html
<div id="page" class="site">
  <header id="masthead" …>…</header>

  <div class="site-content fw-container">        <!-- flex-grow region + width constraint -->
    <div class="with-sidebar has-sidebar">       <!-- content + sidebar grid -->
      <main id="main" class="site-main" role="main">
        <article id="post-71" class="post-71 page type-page status-publish hentry">
          <header class="entry-header">…</header>       <!-- title / hero (conditional) -->
          <div class="entry-content">…the_content()…</div>
          <footer class="entry-footer">…edit link…</footer>
        </article>
      </main>
      <aside class="sidebar" …>…</aside>          <!-- only when has-sidebar -->
    </div>
  </div>

  <footer id="colophon" …>…</footer>
</div>
```

`<article>` is correct here — a **post** is a self-contained, syndicatable composition, and classic
page prose is entry-like. The container (`.fw-container.site-content`) carries the flex-grow /
grid-content role because it must also hold the sidebar alongside `<main>`. Full-width views use
`.fw-container-fluid` instead of `.fw-container`.

## The page-builder content wrapper

`.fw-page-builder-content` is **not** emitted by the theme — the plugin injects it around
`the_content()` output (it also carries the theme's `entry-content` class on builder pages). It is
load-bearing and must stay:

- the **front-end live editor** mounts on it (`querySelector('.fw-page-builder-content')`);
- the theme's **default section spacing** targets `.fw-page-builder-content > section`;
- the **Site Converter** scopes every converted page's CSS to `:where(.fw-page-builder-content)`.

So the minimum builder chain is `main → .fw-page-builder-content → section`.

## Site Width Modes

The three modes are a two-layer design — `<body>` is the outer surface, `#page` the inner box:

```css
/* Full width */
body.site-full   #page { width:100%; max-width:100%; }

/* Boxed — centred fixed-width card */
body.site-boxed        { padding-block: var(--site-margin); }   /* outer gap; site bg shows */
body.site-boxed  #page { max-width: var(--site-max-width);
                         background: var(--color-bg);
                         box-shadow: …; margin-inline: auto; }

/* Framed — coloured border around the viewport */
body.site-framed       { padding: var(--site-frame-width);
                         background: var(--site-frame-color); }
body.site-framed #page { background: var(--color-bg); }
```

The **Site Background** image and pattern also paint on `<body>` (as two stacked `background-image`
layers). Boxed alignment adds `site-boxed--left` / `site-boxed--right`.

## Header Layout Modes

`#masthead` is the `<header class="site-header">` banner. Its markup is produced by the Header &
Footer Builder (or the slot header). The **layout mode** changes how it sits in the page:

| Mode (`body` class) | Behaviour |
| --- | --- |
| **Top** (`layout-top`) | Standard horizontal header in normal flow. |
| **Vertical** (`layout-vertical-left` / `-right`) | `#page.site` becomes a CSS grid; the header is a fixed-width side rail. |
| **Off-Canvas** | Header collapses to an always-visible hamburger; panel slides in. |
| **Overlay** (`overlay-panel` / `-radial` / `-concentric`) | Full-screen overlay menu. |

**Vertical mode** is the one that restructures the outer tree — `.site` switches to grid and places
its direct children by name:

```css
@media (min-width:992px){
  body.layout-vertical-left .site {
     display: grid;
     grid-template-columns: var(--vertical-header-width) minmax(0,1fr);
     grid-template-areas: "header content" "header content" "header footer";
  }
  .site > #masthead     { grid-area: header; }   /* the rail */
  .site > .site-content { grid-area: content; }   /* <main> (builder) or .fw-container (classic) */
  .site > #colophon     { grid-area: footer; }
}
```

This is why `#masthead`, the content element (`.site-content`), and `#colophon` must remain **direct
children** of `#page`.

The separate **Header _Design_** control (Classic / Floating Pill / Elevated Card / Centered) is a
structural treatment of the Top header, applied as a `site-header--{design}` modifier class — it does
not change the outer tree.

### Header internals

Within `#masthead`, the builder emits up to three bars, each an optional row:

```html
<header id="masthead" class="site-header site-header--classic …">
  <div class="header-bar header-topbar">…</div>          <!-- Top Bar (optional) -->
  <div class="header-bar header-main">                    <!-- Main Bar -->
    <div class="fw-container">
      <div class="header-row">
        <div class="header-col header-col--start">…</div>  <!-- logo / left elements -->
        <div class="header-col header-col--center">…</div> <!-- centre elements -->
        <div class="header-col header-col--end">…</div>    <!-- menu / right elements -->
      </div>
    </div>
  </div>
  <div class="header-bar header-bottombar">…</div>        <!-- Bottom Bar (optional) -->
</header>
```

## Footer internals

`#colophon` is the `<footer class="footer">` contentinfo landmark, with up to four stacked regions:

```html
<footer id="colophon" class="footer footer--…">
  <div class="footer__body">          <!-- carries the footer's vertical padding -->
    <div class="footer-section pre-footer">…</div>
    <div class="footer-section main-footer">…</div>
    <div class="footer-section post-footer">…</div>
  </div>
  <div class="footer-section copyright">…</div>   <!-- flush at the bottom edge -->
</footer>
```

## Section anatomy

Layout inside a section is built with the **Flexbox** element (`.fw-flexbox`) — the modern,
nestable layout primitive. There is **no mandatory `container → row → column` chain**: a section
holds Flexboxes directly, each of which is itself a flex (or grid, or block) container whose children
are more Flexboxes carrying responsive twelfths spans. Decorative wrappers render only when their
feature is configured:

```html
<section class="section …" style="…background…">
  <span class="fs-background-overlay"></span>   <!-- only: video background + overlay -->
  <div class="pattern-layer"></div>             <!-- only: background pattern preset -->
  <div class="sc-shape-divider--top"></div>     <!-- only: top shape divider -->
  <div class="sc-shape-divider--bottom"></div>  <!-- only: bottom shape divider -->

  <div class="fw-flexbox fw-flex fw-gap-24px fw-collapse …">   <!-- a Flexbox: a flex row -->
    <div class="fw-flexbox fw-span-12 fw-span-md-6 …">          <!-- a Flexbox child: responsive span -->
      …shortcode content…
    </div>
    <div class="fw-flexbox fw-span-12 fw-span-md-6 …">
      …shortcode content…
    </div>
  </div>
</section>
```

The **Flexbox** (`.fw-flexbox`, per-instance scope class `fx-<hash>`):

- Renders any semantic tag — `div` (default), `section`, `header`, `main`, `article`, `aside`,
  `footer`, `nav` — so structure stays meaningful.
- Has three **display modes**: **Flex** (`fw-flex` + direction/wrap), **Grid** (`fw-grid`, children's
  spans become grid tracks), or **Block** (neither class — clean markup).
- Lays children out with **responsive twelfths spans** — `fw-span-12`, `fw-span-md-6`,
  `fw-span-lg-4`, … — plus `fw-gap-*` (gap scale), `fw-flex-column` / `fw-flex-nowrap`,
  `fw-justify-*` / `fw-items-*` / `fw-content-*`, `fw-order-*` / `fw-self-*`, and `fw-collapse`
  (row children stack on small screens).
- Carries its own **styling directly** (background, border, radius, shadow, box preset, padding),
  scoped by its `fx-<hash>` class — there is no separate inner "styling card" div.

Other notes:

- The section's **background, overlay, min-height and alignment** are inline `style` + classes on the
  `<section>` itself — no extra layer div (an image/gradient overlay is folded into the
  `background-image` stack; only a *video* background needs the `.fs-background-overlay` element).

:::note Legacy grid
Older content — and current **Site Converter** output — may still render the Bootstrap-style grid
(`.fw-container` → `.fw-row` → `.fw-col-12 .fw-col-lg-6 …`), and an explicit **Container** element
emits `.fw-container.fw-container-el`. That path is fully supported and still renders, but new builds
use the Flexbox model above. Don't be surprised to see both on a page assembled from mixed sources.
:::

For the reasoning behind keeping vs. collapsing the outer wrappers, see
[Why the #page wrapper stays](/decisions/keep-page-wrapper-as-site-layout-root).
