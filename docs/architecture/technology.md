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
| **Admin builder / options UI** | Server-rendered PHP enhanced with jQuery; Backbone at two call sites and Underscore templates in the builder items — the one layer still on an older stack, and the focus of the roadmap below |

For exactly how that layer works — the `_render()` + `fw:options:init` contract, and the measured
footprint of Backbone and Underscore — see [The admin JavaScript layer](./admin-js-layer.md).

## Modernization roadmap

Modernization is **actively underway**, layer by layer. The front end and PHP core are already there;
the work now is the admin UI. We ship these as they're ready rather than on fixed dates.

- **A React admin UI.** The builder and options interface runs today on Backbone + Underscore. The
  direction is to rebuild that layer on **React**, for a faster, more maintainable, component-based
  editor.
- **Native ES6+ instead of Underscore templating.** The admin's Underscore `_.template` rendering
  moves to **modern native JavaScript** as the UI migrates.
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
