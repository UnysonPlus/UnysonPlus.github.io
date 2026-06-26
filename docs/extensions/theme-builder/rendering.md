---
title: How it renders
sidebar_position: 7
---

# How it renders

Once the [resolver](./conditional-assignment.md#how-the-winning-template-is-chosen) has picked the
winning Template for a request, the Theme Builder has to put its header, body, and footer on screen.
**How** it does that depends on whether the active theme is built for the Theme Builder ("native") or
not ("foreign"). Both paths are automatic — you never choose one.

```text
                 resolver picks a Template for this request
                                   │
                 ┌─────────────────┴──────────────────┐
        active theme is NATIVE                 active theme is FOREIGN
   (provides the integration)               (any other theme)
                 │                                    │
   header/footer via the theme's          ┌───────────┴───────────┐
   get_header()/get_footer();        a Body applies?         header/footer only?
   a Body takes over via             FULL takeover:          SURGICAL swap:
   template_include                  plugin renders the      theme renders the page,
                                     whole page itself       plugin swaps just its
                                     (header+body+footer)    <header>/<footer>
```

## Native theme integration

A **native** theme is one that ships the Theme Builder's header/footer integration — it calls the
render helpers from its own `header.php` / `footer.php`. (The framework detects this by the presence
of the theme's integration function; the bundled UnysonPlus theme **and its child themes** are
native, everything else is foreign.)

On a native theme:

- **Header / Footer** — the theme's `get_header()` / `get_footer()` resolve the winning preset and
  render it inside the semantic `<header>` / `<footer>`, with the theme's own chrome classes and
  hooks intact. *Inherit* falls through to the Theme Settings header/footer.
- **Body** — when a Template assigns a Body, a `template_include` filter swaps the page's template for
  the Theme Builder body wrapper, which still calls `get_header()` / `get_footer()` so the header and
  footer resolve normally around it.

This is the richest path: presets compose with the theme's header behaviors, the slot fallbacks, and
per‑page overrides. See the [header/footer fallback chain](./headers-and-footers.md#the-headerfooter-fallback-chain).

## Theme‑independent rendering (any theme)

Under a **foreign** theme the Theme Builder still renders your presets — it just can't lean on a
`get_header()` hook that the theme doesn't have. Two mechanisms cover the two cases, chosen
automatically:

### Full‑page takeover — when a Body applies

If the winning Template assigns a **Body**, the plugin **bypasses the foreign theme's template
entirely** (via `template_include`) and renders the whole page itself in its own document:

```text
<!doctype html> … wp_head()
  ├─ Header preset            (if set)
  ├─ Body  (your body, or the page's content via Post Content)
  └─ Footer preset            (if set)
… wp_footer()
```

This is robust and predictable on any theme. Two consequences follow from bypassing the theme:

- **Body = None** renders the page's own content in a generic wrapper (not the foreign theme's exact
  `single.php` / `page.php` layout).
- **Inherit** header/footer render **nothing** here — under a foreign theme there's no native chrome
  to inherit (that's what the native path is for). Set an explicit header/footer preset for a foreign
  theme.

### Surgical header/footer swap — header/footer‑only Templates

If the Template sets a **header and/or footer but no Body**, the plugin keeps the foreign theme's page
intact — its content, sidebars, and layout — and **swaps only its site `<header>` / `<footer>`** for
your presets, via output buffering. The preset markup is rendered up front (before buffering) and
spliced in over the theme's first `<header>` and last `<footer>`; if a theme has no identifiable
site `<header>`/`<footer>`, the preset is injected at the body edge as a fallback. The target pattern
is filterable for themes with unconventional markup.

This is the gentlest path: an inherited footer keeps the theme's footer, the theme's content stays
exactly as it was, and only the chrome you designed replaces the theme's chrome.

### Preset assets under a foreign theme

A native theme enqueues a preset's shortcode assets itself; a foreign theme doesn't. So under a
foreign theme the Theme Builder **enqueues each matched preset's shortcode CSS/JS into the head**
(reusing the framework's own per‑content asset enqueuer), so presets render fully styled in both the
takeover and the surgical‑swap paths.

### Header behavior & mobile menu under a foreign theme

A header's **Scroll Behavior** (Sticky / Sticky‑shrink / Hide‑on‑scroll / Transparent‑overlay) and
its **Menu Toggle / Off‑canvas / Fullscreen‑overlay** drawer are normally driven by the native
theme's JS. So under a foreign theme the Theme Builder ships small **portable bundles** that
reproduce them — keyed off the same `data-hf-behavior` / `data-hf-type` attributes and the
`.menu-toggle` button. The result: a sticky header still sticks, and a mobile hamburger still opens a
drawer, on **any** theme. (They stand down automatically when the theme already provides them.)

## Precedence at render time

The body that actually renders is decided with one safety rule baked in: a **full‑replacement** body
(no Post Content) never hides a page you deliberately built, while a **Post Content** body wraps it.
After that, the resolved `header_id` / `body_id` / `footer_id` drive the chosen path above.

## Body class hints

When a Template applies, `<body>` is tagged with `up-tb-template` plus `up-tb-has-header` /
`up-tb-has-body` / `up-tb-has-footer`, so your CSS/JS can target Theme‑Builder requests and know which
regions the Template overrides.

## See also

- [Conditional assignment](./conditional-assignment.md) — how the winning Template is chosen
- [Body Templates](./body-templates.md) — the body render modes
- [Developer reference](./developers.md) — the filters and internals behind both paths
