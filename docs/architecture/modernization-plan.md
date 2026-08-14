---
title: The modernization plan
sidebar_position: 8
description: An evidence-based plan for modernizing UnysonPlus without breaking it — what the audit measured, why the option schema (not the renderer) is the thing to protect, how React earns its place as a second renderer rather than a rewrite, and the order the work should happen in.
---

# The modernization plan

This page is the architectural answer to a fair question: *if the admin layer is older than the rest
of the framework, what exactly are we going to do about it?*

It is deliberately specific. Vague roadmaps ("we're moving to React") are unfalsifiable and
uninformative. What follows is what was measured, what it implies, and the sequence that follows from
it.

## What the audit measured

Counted across the plugin as it stands:

| Area | Finding |
| --- | --- |
| PHP files | 1,212 · 365 classes · 132 global `fw_*` functions |
| First-party namespaced PHP | **0** — the only namespaced files are the vendored Plugin Update Checker |
| Composer / PSR-4 autoloading | **None** — loading is by convention and explicit `require` |
| Typed PHP signatures | ~23 files with parameter types, ~15 with return types, 4 with `strict_types` |
| Legacy PHP-4/5 patterns (`create_function`, `ereg`, `each`, `mysql_*`) | **None** |
| Backbone | **12 files**; exactly **2 call sites** inside `fw.js` |
| Underscore `_.template` | **29 files**, clustered in builder items + form-builder items |
| Files hooking `fw:options:init` | **131** |
| Core option types | 54 (45 with their own JS, ~11,700 lines total) |
| Front-end jQuery dependency | **None** — no builder element enqueues `jquery` |
| Asset build | Exists — esbuild transform-only + PostCSS, `.min` siblings, not a bundler |

Two of these deserve emphasis because they cut against the received wisdom in *both* directions.

**In the framework's favour:** Backbone is not the architecture. It is a dependency at two call sites.
The "Backbone framework" characterisation does not survive measurement.

**Against it:** there is no first-party namespaced PHP, no autoloader, and 132 functions in the global
namespace. The typed-signature footprint is small. This is real, and it is the debt least visible from
the outside — and the most worth paying down.

## The principle: protect the schema, not the renderer

The single most important architectural fact in this framework is the one described in
[the admin JS layer](./admin-js-layer.md): an option type is a **PHP class that renders HTML**, and
JavaScript enhances that HTML afterwards.

That gives two separable things:

1. **The option *schema*** — the array in `options.php` declaring `type`, `label`, `value`, `choices`,
   conditional `show_if` rules, and so on. This is *data*. It is what extension authors write, what the
   Site Converter emits, what presets store, and what saved content is keyed against.
2. **The option *renderer*** — `_render()` producing HTML, plus the JS that enhances it. This is
   *implementation*.

The schema is the compatibility promise. Every site, every third-party extension, every saved page and
every preset depends on it. The renderer is an internal detail that nothing outside the framework
depends on.

**So: the schema is frozen and the renderer is free.** Any modernization that respects that line is
safe; any that crosses it is a rewrite in disguise. That single rule decides most of the questions
below without further argument.

## Where React genuinely earns its place

React is worth adopting here for one concrete reason, and it is not fashion.

The framework currently has **one renderer** for the option schema: PHP `_render()`, consumed by the
page builder and the options pages. Anywhere the option schema needs to appear that *cannot* consume
server-rendered HTML, the framework simply has nothing to offer.

The Gutenberg block inspector is exactly such a place. A block's sidebar is a React tree; core renders
it. There is no supported way to hand it a blob of PHP-rendered HTML and have it feel native.

So the useful framing is:

> **React is not a replacement for the option system. It is a second renderer for the same option
> schema.**

```
                    options.php  (the schema — frozen)
                            │
             ┌──────────────┴──────────────┐
             ▼                             ▼
    PHP _render()  ──────────▶     React components  ──────────▶
    HTML + fw:options:init          wp.element controls
             │                             │
       page builder,                  Gutenberg block
      options pages,                    inspectors,
     Theme Settings                 new admin surfaces
```

That reframing has a consequence worth stating plainly: **the modernization project and the Gutenberg
project are the same project.** A React control for `color-picker` is simultaneously (a) a modern
replacement for a jQuery control and (b) the thing that makes a UnysonPlus block's sidebar work. Doing
them separately means building that control twice.

It also settles the sequencing question. They are not "modernization first, then Gutenberg." They are
one effort with one shared deliverable — a React component library that speaks the option schema —
approached from two ends.

### The one constraint that decides whether they compound

React components for the admin **must consume WordPress's bundled React** (`wp.element`, exposed as the
`wp-element` script handle) and mark `react` / `react-dom` as build externals — never bundle their own
copy.

If they do, every control written for the admin drops into a block inspector unchanged. If they don't,
wp-admin loads two Reacts on the same page and every advanced control gets written twice. It is one
line of build configuration, and it is the difference between the two efforts compounding and
colliding.

## What React is *not* for

Being specific about the non-goals is what keeps this from becoming a rewrite:

- **Not the page-builder canvas.** It works, it is load-bearing, and rebuilding it delivers nothing a
  user can see. Rewriting a working editor is the classic way to spend two years and ship a regression.
- **Not the 54 existing PHP `_render()` methods.** They stay. Porting a type to React adds a second
  renderer for it; it never removes the first. Third-party option types keep working forever precisely
  because PHP rendering is never withdrawn.
- **Not a Gutenberg-native rewrite of the element library.** Elements stay shortcodes rendered by PHP;
  blocks delegate to that same render. See
  [why the extension contract is not legacy](/decisions/extension-contract-is-not-legacy).

## Removing Backbone and Underscore

Because Backbone is 12 files and 2 call sites, this is a bounded piece of work rather than a migration.

**Backbone — core done in 2.16.11.** `fw.Modal` used `Backbone.Model` for attributes plus `on`/`set`,
and `Backbone.View` for a render shell. Both are now `fw.Class` / `fw.View` in
`framework/static/js/fw-oo.js`, and the options modal's frame is `fw.ModalFrame` rather than
`wp.media.view.MediaFrame`. The `fw` handle no longer declares `backbone`.

The estimate above ("~60 lines, no behaviour change") turned out to be wrong in an instructive way. The
modal was built on WordPress's media frame, so removing Backbone meant reimplementing that frame's DOM,
its regions and its toolbar — and reproducing the parts of Backbone that callers relied on
*implicitly*: the `events` hash a view expects its base class to delegate, and the event-map form
`listenTo(obj, {event: handler})` that eight call sites use. Neither appears in the code you are
replacing; both surface only when something silently stops working. The full account, including the
three bugs it shook out, is in
[replacing the media frame](/decisions/replacing-the-wp-media-modal-frame).

The builder items are the larger remaining share: they use models, collections and events more
genuinely, and move with the canvas work rather than ahead of it.

**Underscore templates.** `_.template` is string interpolation with `<%= %>` delimiters. Native template
literals cover the same ground. The 29 files are mechanical conversions, individually testable, with
the builder-item previews being the only ones where the output is visually load-bearing.

Neither is urgent on its own — nothing is broken and WordPress still ships both. Their real value is
**removing the reason people call the framework legacy**, and clearing the ground so the builder work
isn't happening on top of a stack nobody wants to learn.

## The PHP side

This is the debt the audit found that the outside world doesn't see, and it is cheap to start:

- **Composer + PSR-4 autoloading for new code**, alongside the existing convention loader rather than
  replacing it. No existing `require` has to change.
- **Namespaces for new classes.** 365 classes and 132 functions currently sit in the global namespace;
  `fw_*` prefixing has held collisions off so far, but prefixing is a convention, not a guarantee.
- **Typed signatures on new and touched code.** Not a sweep — a standard applied going forward.

None of this is visible to a user. All of it compounds, and all of it is the honest answer to the one
criticism of the framework's structure that is actually correct.

## Housekeeping the audit surfaced

Small, concrete, worth doing early:

- **Dead vendored files.** `shortcodes/section/static/js/{core,transition,background}.js` are the old
  Formstone jQuery stack. They were replaced by a vanilla `background.init.js` and are **no longer
  enqueued anywhere** — but they still ship, and still appear in `build-manifest.php`. They should be
  removed.
- **The public technology claims must stay verifiable.** Any statement about namespaced or typed PHP
  should match what a developer finds when they `grep`. Overstating is the one thing that would make
  the "modern framework" case collapse on contact.

## The order of work

1. **Foundations.** Composer + PSR-4 for new PHP. A `wp.element`-external build config for admin React.
   Delete the dead Formstone files. Nothing user-visible; everything downstream depends on it.
2. **The React control layer.** Port the ~15 most common option types (`text`, `textarea`, `select`,
   `switch`, `radio`, `checkbox`, `color-picker`, `slider`, `unit-input`, `upload`, `icon`, `spacing`,
   `multi-select`, `image-picker`, `typography`) to React components consuming `wp.element`, driven by
   the same schema. This is the shared deliverable.
3. **First Gutenberg block.** One dynamic block, `block.json` + `render.php` delegating to an existing
   shortcode, its inspector built from the step-2 controls plus core `supports`. Proves the bridge end
   to end. `before-after` is a good first candidate — the shortcode already exists, so the render side
   is free.
4. **Retire Backbone from `fw.js`.** Replace the two call sites with plain ES6. Small, isolated,
   independently shippable.
5. **Underscore templates → template literals.** File by file, starting with the least visual.
6. **The builder canvas.** Only after 1–5 have established the patterns, and only if there is a
   concrete reason — a feature it blocks, a bug class it causes. Not on principle.

Steps 1–5 are all individually shippable and individually reversible. None of them changes a saved
value, a stored option, or a rendered page. That is the test each step has to pass.

## The standard applied throughout

Every change in this plan is measured against three questions:

1. **Does it change the option schema?** If yes, it needs a value-shape migration and probably
   shouldn't happen.
2. **Does it change rendered front-end output?** If yes, it is not modernization, it is a redesign.
3. **Can it ship on its own?** If no, it is too big and should be decomposed.

Modernization that cannot answer those three is how working frameworks get broken. The point here is
not to arrive at a fashionable stack. It is to arrive at a stack a developer in 2030 will recognise —
without a single site noticing the journey.
