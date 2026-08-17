---
title: The admin JavaScript layer
sidebar_position: 7
description: How the options UI actually works — PHP renders every option, JavaScript enhances it on the fw:options:init event, and the framework's own code uses neither Backbone nor Underscore. The measured shape of the admin stack, and which parts are load-bearing.
---

# The admin JavaScript layer

Everything else in this section describes how the framework *loads* and how data *flows*. This page
describes the one layer people most often misread: the JavaScript that powers the options UI and the
page builder.

It is worth understanding precisely, because almost every claim made about UnysonPlus being "a
Backbone framework" is wrong in an interesting way. Backbone is present, but it is not the
architecture. The architecture is **PHP renders, JavaScript enhances** — and that distinction decides
what modernization is cheap and what is expensive.

## The core contract: PHP renders every option

Every option type is a PHP class extending `FW_Option_Type`
(`framework/core/extends/class-fw-option-type.php`) and implementing three methods:

```php
protected function _render( $id, $name, $data ) { /* returns the option's HTML */ }
protected function _get_value_from_input( $option, $input_value ) { /* POST → value */ }
protected function _get_defaults() { /* the option's default config */ }
```

`_render()` is the important one. **The option's markup is produced on the server**, as a string of
HTML, and printed into the page. By the time any JavaScript runs, the control already exists in the
DOM — the `<select>`, the colour swatch, the repeater rows are all there.

This is not an accident of age. It is what makes the option system extensible from PHP alone: an
extension author writes a PHP class, and gets a working control with no build step, no npm, and no
JavaScript at all.

## The enhancement bus: `fw:options:init`

JavaScript's job is to *attach behaviour to markup that already exists*. It does that through a
single global event bus, `fwEvents`, and one event in particular:

```js
fwEvents.on( 'fw:options:init', function ( data ) {
    data.$elements
        .find( '.fw-option-type-switch:not(.fw-option-initialized)' )
        .addClass( 'fw-option-initialized' )
        .find( 'input[type="checkbox"]' )
        .on( 'change', function () { /* … */ } );
} );
```

That pattern — *find my option type inside the newly-rendered region, mark it initialized, bind
handlers* — is repeated across **131 files** in the framework. It is the single most common idiom in
the admin codebase, and it is the real contract that every option type honours.

`fw:options:init` fires whenever a region of options enters the DOM: on page load, when a modal opens,
when a repeater row is added. The `:not(.fw-option-initialized)` guard is what makes it safe to fire
repeatedly over overlapping regions.

Two implications follow, and they matter for everything below:

- **The admin JS is progressive enhancement, not a rendering framework.** No JavaScript component owns
  an option's markup. The server does.
- **The DOM is the state.** An option's current value lives in its form inputs, and is read back by
  serializing the form. There is no client-side model store for option values.

## Where Backbone actually is

Backbone is often described as pervasive here. It never was — and as of **2.16.11 the framework core
does not use it at all**.

`fw.js` used it in exactly two places: `fw.Modal = Backbone.Model.extend(…)` and its
`ContentView: Backbone.View.extend(…)`. Those are now `fw.Class` and `fw.View`, from
`framework/static/js/fw-oo.js` — plain-JavaScript equivalents with the same signatures. The `fw`
script handle no longer declares `backbone` as a dependency. See
[why the media frame was replaced](/decisions/replacing-the-wp-media-modal-frame).

**Nothing in the framework uses Backbone any more.** The last of it — the builder canvas
(`builder.js`, `helpers.js`, the flexbox item) — moved to `fw.Class` / `fw.Collection` / `fw.View` in
2.16.19, and the vendored `backbone-relational` library is deleted with its script handle
unregistered.

One thing worth being precise about, because it is easy to misread:

- **Backbone still loads on many admin pages.** WordPress's own media library is Backbone, and
  `wp_enqueue_media()` runs wherever an upload-style option appears. The framework deliberately keeps
  using that picker — it is WordPress's, and reimplementing it would be a mistake. What changed is
  that the framework's *own* code no longer asks for Backbone anywhere.

Everything else in `fw.js` — `fw.OptionsModal`, the loading indicator, notifications, form validation,
`fw.opg`/`fw.ops` for nested value access, the confirm/soleModal helpers — was always plain JavaScript
and jQuery.

## Where Underscore templates were

:::info[Underscore is gone (core 2.16.13, the rest 2.16.19)]
No file in the framework uses `_` any more, and **no script handle declares `underscore`**. Core ships
`fw.template()`, `fw.escapeHtml()`, `fw.throttle()`, `fw.debounce()`, `fw.clone()`, `fw.isObject()`
and `fw.isEmpty()` instead (see [the core helpers](#the-core-helpers-that-replaced-underscore) below).

**If you write an extension and use `_`, declare `'underscore'` in your own `wp_enqueue_script`
dependency array.** It is not inherited through `'fw'`, and nothing in the framework pulls it in for
you any more.
:::

Templating clustered tightly, and that shape is still worth knowing because it explains where the
client genuinely renders markup at all:

- **Builder items** (`section`, `column`, `flexbox`, `container`, `global-section`, the page-builder
  `simple` item type) — these render the item's *preview inside the canvas*.
- **Form-builder items** (13 files under `forms/includes/option-types/form-builder/items/`) — same
  pattern for the drag-and-drop form designer.
- The email builder, and the addable-box / addable-popup item titles.

All of them now compile through `fw.template()`.

The pattern is consistent: **wherever the client has to draw something that PHP did not render, it uses
a template.** Everywhere else, PHP already drew it.

## The core helpers that replaced Underscore

Seven helpers cover the Underscore functions with no one-line native equivalent. They are public —
use them instead of adding an `underscore` dependency:

| Helper | Replaces | Notes |
| --- | --- | --- |
| `fw.template(text, settings)` | `_.template` | Custom delimiters, the `variable` option, `with`-scoped bare identifiers, and `print()`. Signature drops Underscore's unused middle argument: `fw.template(text, settings)`, not `_.template(text, undefined, settings)`. |
| `fw.escapeHtml(value)` | `_.escape` | Same character set (`& < > " ' \``); `null`/`undefined` render as `''`. |
| `fw.throttle(fn, wait)` | `_.throttle` | Leading **and** trailing edge, matching Underscore's default. |
| `fw.debounce(fn, wait, immediate)` | `_.debounce` | Trailing by default; pass `immediate` for the leading-edge variant. |
| `fw.clone(value)` | `_.clone` | Shallow: arrays sliced, objects copied one level, primitives returned as-is. |
| `fw.isObject(value)` | `_.isObject` | Underscore's definition — **functions count**, `null` does not. |
| `fw.isEmpty(value)` | `_.isEmpty` | Length check for arrays/strings/`arguments` only; everything else by own keys — so `fw.isEmpty({length: 0})` is `false`, matching Underscore. |

`fw.template()` is a real compiler rather than a template-literal shim on purpose: the addable-box and
addable-popup item-title templates are **authored by users and stored in the database**, so their
syntax had to keep working exactly as it did.

## The builder canvas

The page builder is the densest part of the admin, and the only place with a genuine client-side model
tree:

| File | Lines | Role |
| --- | --- | --- |
| `builder/…/builder.js` | 1,648 | The `builder` option type — model tree, drag/drop, save |
| `page-builder/…/visual-elements.js` | 456 | Element palette |
| `page-builder/…/editor_integration.js` | 406 | WP editor ↔ builder bridge |
| `page-builder/…/section-sorter.js` | 334 | Section reordering |
| `page-builder/…/insert-section.js` | 331 | Section insertion UI |
| `page-builder/…/section-like-factory.js` | 277 | Shared section/row/column item behaviour |
| `page-builder/…/{flex-canvas,modal-save-all,device-preview}.js` | ~300 | Canvas helpers |

Each builder item is a Backbone model; the tree serializes to the JSON string described in
[Data flow](./data-flow.md). Editing an item opens `fw.OptionsModal`, which fetches PHP-rendered
option HTML over AJAX and fires `fw:options:init` on it — which is how the builder and the plain
options page share one option system.

## The option-type inventory

| Measure | Count |
| --- | --- |
| Core option types (`framework/includes/option-types/`) | 54 |
| …of those, shipping their own JavaScript | 45 |
| Total option-type JavaScript | ~11,700 lines |
| Extensions contributing further option types | 4 (`builder`, `forms`, `shortcodes`, `animation-engine`) |

Most of those 45 are small: a `fw:options:init` handler, some event binding, a jQuery plugin
initialization. The heavy ones are the composite types (`multi-picker`, `addable-box`, `typography-v2`,
`background-pro`, the builder).

## The asset pipeline

The plugin **does** have a build step — `unysonplus/build/build.mjs`:

- **CSS** → PostCSS with `autoprefixer` (targets from `.browserslistrc`) + `cssnano`.
- **JS** → `esbuild`, **transform-only, not bundled**.
- Output is a `*.min.css` / `*.min.js` **sibling next to each source file**, plus a generated
  `framework/build-manifest.php` listing what was produced.
- `fw_get_framework_asset_uri()` serves the `.min` sibling when it exists and `SCRIPT_DEBUG` is off,
  falling back to the readable source otherwise. Running the build is therefore *optional* for the
  plugin to function.

The "transform-only, not bundled" choice is deliberate and load-bearing: the framework's scripts
depend on **globals** (`fw`, `fwEvents`, `jQuery`, `Backbone`) and on **`wp_enqueue_script` dependency
order**. A bundler would have to replace that entire dependency graph with imports. Minification per
file preserves it exactly.

This is the difference between "has a build step" and "has a module pipeline." UnysonPlus has the
former. Moving to the latter is a real project — see
[the modernization plan](./modernization-plan.md).

## What this means

Read together, the measurements say something specific:

- The admin is **server-rendered HTML with jQuery enhancement**. Core uses neither Backbone nor
  Underscore; both remain only in the builder canvas and the form builder, where the client must draw.
- The **contract that matters** is `_render()` + `fw:options:init`, not any JavaScript framework.
- Therefore "replace Backbone with React" is a much smaller job than it sounds — and "make the option
  types React components" is a much larger one, because it means moving rendering out of PHP.

Those two facts pull in opposite directions, and reconciling them is what the
[modernization plan](./modernization-plan.md) is about.
