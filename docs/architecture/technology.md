---
title: Technology & modernization
sidebar_position: 6
description: The technology UnysonPlus is built on — a jQuery-free front end, PHP 8-ready code, and current libraries — plus the modernization roadmap (React admin UI, native ES6+, more REST).
---

# Technology & modernization

UnysonPlus is a modern continuation of the Unyson framework. The old "Unyson is outdated" reputation
predates this fork: the parts users and their visitors actually touch have already been modernized,
and the remaining legacy is isolated to one place — the admin builder UI — which is where our
roadmap is focused.

This page is a straight, verifiable account of what the framework is built on today, and where it's
going next.

## A modern foundation

### The front end is jQuery-free

Every visitor-facing script the framework ships is **vanilla JavaScript** — no page-builder element
declares a `jquery` dependency. Carousels and sliders run on **Splide** (vanilla), and elements like
ratings render as inline SVG rather than an icon font. This is the single biggest rebuttal to the
"outdated" perception: a UnysonPlus page never sends the visitor a jQuery-dependent script.

### Current vendored libraries

The bundled front-end libraries are on their current major lines:

| Library | Version | Role |
| --- | --- | --- |
| Splide | 4.1.4 | Carousels / sliders (vanilla) |
| Leaflet | 1.9.4 | Maps |
| noUiSlider | 15.8.1 | Range sliders (vanilla) |
| Air Datepicker | 3.6.0 | Date/time pickers (replaced the jQuery UI datepicker) |
| Font Awesome | 6.7.2 | Icon library |
| Bootstrap | 5 | Grid & utilities (the BS3 grid is opt-in legacy) |
| Lottie · Rive | current + WASM | Animation runtimes |
| GSAP · Lenis · three.js | current | The Animation Engine (scroll, smooth-scroll, WebGL) |
| Plugin Update Checker | v5 | GitHub-based updates |

### PHP is modern and 8-ready

The whole framework (1,200+ PHP files) is clean under **PHP 8.2** — none of the PHP-4/5-era patterns
that plague old forks (`create_function`, `ereg`, `each()`, `mysql_*`, `eval`, `FILTER_SANITIZE_STRING`,
…) appear anywhere.

Being precise about the rest, because a claim you can `grep` should survive being `grep`ed: the
codebase is **procedural and convention-loaded**, not namespaced — typed signatures and
`declare(strict_types=1)` appear only in the newest files, and there is no Composer autoloader yet.
Adopting PSR-4 and namespaces for new code is the first item on
[the modernization plan](./modernization-plan.md).

### Layouts are stored as structured data

Builder content is saved as a **JSON tree in post meta**, not as nested shortcodes in `post_content`
— so deactivating the plugin leaves no bracket residue, and rendering starts from parsed data rather
than by scanning markup. This is the criterion usually used to define a modern builder, and it is
measurable on any install: see [Storage model: JSON, not shortcodes](./storage-model.md).

### CSS is layout-modern

Styling is **flex/grid-first** with CSS custom properties — the Components preset system compiles into
`--color-*` / `--font-size-*` tokens and modern utility rules (see
[Components](/theme/components)). Floats survive only inside the opt-in Bootstrap 3 grid, which is off
by default.

## The stack, layer by layer

| Layer | Built on |
| --- | --- |
| **Front end (visitor)** | Vanilla JS, Bootstrap 5 CSS, CSS custom properties; Splide / Leaflet / noUiSlider; GSAP / Lenis / three.js / Lottie / Rive for motion |
| **PHP core** | The options-framework engine, the extension system, the manifest/updater — PHP 7.4+ (8.2-clean), typed & namespaced in the newer code |
| **Admin builder / options UI** | Server-rendered PHP enhanced with jQuery. **No Backbone and no Underscore anywhere in the framework** as of 2.16.18 — the options modal and the page-builder canvas both run on the framework's own `fw.Class` / `fw.Collection` / `fw.View` / `fw.ModalFrame`, and core ships `fw.template` / `fw.escapeHtml` / `fw.throttle` / `fw.debounce` / `fw.clone` / `fw.isObject` / `fw.isEmpty`. jQuery remains, deliberately — see the roadmap below |

For exactly how that layer works — the `_render()` + `fw:options:init` contract, and the measured
footprint of what was removed — see [The admin JavaScript layer](./admin-js-layer.md).

:::caution Extension authors
`'fw'` no longer declares `'underscore'`. Any script that uses `_` must list `'underscore'` in its own
`wp_enqueue_script` dependency array — it is no longer inherited.
:::

## Modernization roadmap

Modernization is **actively underway**, layer by layer. The front end and PHP core are already there;
the work now is the admin UI. We ship these as they're ready rather than on fixed dates.

- **A React admin UI.** New admin surfaces are built on **React**, using the copy WordPress already
  ships in wp-admin (`wp.element`) rather than bundling another. The same React controls drive
  UnysonPlus's Gutenberg block inspectors, so the two efforts compound instead of duplicating.
- **Retiring Backbone.** ✅ Complete. Core in 2.16.11, two stragglers in 2.16.16, the builder canvas
  in 2.16.18. The vendored `backbone-relational` library is deleted and its script handle
  unregistered. Backbone still *loads* on admin pages because WordPress's media library uses it —
  but nothing in UnysonPlus asks for it.
- **Retiring Underscore.** ✅ Complete. Core in 2.16.13, the remaining 36 files in 2.16.18. No script
  handle declares `underscore`.
- **jQuery: deliberately not next.** It is now the largest legacy dependency (92 handles, ~116 admin
  files), but `wp-admin` loads jQuery unconditionally, so converting admin code saves users nothing.
  It is opportunistic work — done while a file is open for another reason — not a project.
- **Vanilla admin controls.** The remaining jQuery-based admin widgets (tooltips, enhanced dropdowns)
  are being replaced with dependency-free equivalents, continuing the front end's jQuery-free story
  into wp-admin.
- **More REST, less ad-hoc AJAX.** New admin/data endpoints favor the **WordPress REST API** over
  classic `admin-ajax` handlers.
- **A leaner admin bundle.** Unused vendored libraries are being retired so the admin ships only what
  it uses.

The principle throughout: modernize where it changes the experience, keep what already works, and never
break saved content or a live site to do it.

The detailed, measured version of this roadmap — what the audit found, why React is adopted as a
*second renderer* rather than a rewrite, and the order the work happens in — is
[The modernization plan](./modernization-plan.md).
