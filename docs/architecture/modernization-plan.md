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
| First-party namespaced PHP | **1 class** (`UnysonPlus\Admin\Controls\Registry`) since the foundations step; the rest of the namespaced files are the vendored Plugin Update Checker |
| Composer / PSR-4 autoloading | **Present** — `composer.json` maps `UnysonPlus\` → `framework/src/`, loaded by `framework/autoload.php`, which degrades gracefully when `vendor/` is absent |
| Typed PHP signatures | ~23 files with parameter types, ~15 with return types, 4 with `strict_types` |
| Legacy PHP-4/5 patterns (`create_function`, `ereg`, `each`, `mysql_*`) | **None** |
| Backbone | **0 files.** Removed in stages — 2.16.11 (`fw.js`), 2.16.16 (megamenu + editor integration), 2.16.19 (the builder canvas). The vendored `backbone-relational` library is deleted and its script handle unregistered |
| Underscore | **0 files.** Core cleared in 2.16.13; the remaining 36 files (24 using `_.template`) followed in 2.16.19. No script handle declares `underscore` |
| Files hooking `fw:options:init` | **131** |
| Core option types | **58** (5 registrations now also have a React control: `text`, `switch`, `select`, `short-select`, `upload`) |
| Front-end jQuery dependency | **None** — verified: the only front-end reference is `wc_products`, which guards on WooCommerce's own jQuery |
| Admin jQuery dependency | **92 script handles** declare `jquery`; ~116 admin JS files use it |
| jQuery UI dependency | `sortable` × 14, `draggable` × 3, `tabs` × 2, `autocomplete` × 2, `slider` × 1, `widget` × 1 |
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

**Both are now gone** — Backbone in 2.16.19, Underscore in 2.16.19. What follows is the account of how,
because the surprises are the useful part.

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

**Backbone — finished in 2.16.19.** Two files depended on it for a single line each (an event mixin in
`editor_integration.js`, an empty model used as an event bus in megamenu's `admin.js`) and moved to
`fw.Events` in 2.16.16. The builder canvas followed: `fw.Collection` was added to `fw-oo.js`, and the
one `backbone-relational` `HasMany` relation became a declarative `nested` option on `fw.Class`. The
vendored library is deleted and its script handle unregistered.

Three undocumented behaviours broke things, and none was visible in the code being replaced:

- **`fw.View` had no `this.$()`** — Backbone's scoped selector, used in 26 places. Every builder item
  threw mid-render and vanished from the canvas.
- **Backbone collections have no `cid`; only models do.** `builder.js` duck-types on exactly that to
  tell one from the other, because a single handler serves both `add` (model, collection) and `reset`
  (collection). Giving collections a `cid` made every reset look like a model and the canvas failed to
  load.
- **`backbone-relational` defers the constructor's `change` events until after `initialize()`.** That
  deferred event is the *only* thing that performs an item's first render, because item view
  subclasses override `initialize` without calling `render()`. Without it, items were created, added
  to the canvas, and stayed empty.

The lesson generalises: what breaks is never the code being replaced, it is the implicit contract its
consumers depend on. The fix was to write that contract down first — a catalogue of what all 23 files
extending `builder.classes.*` actually call — and to verify every replacement against the real library
rather than against expectation.

**Underscore — core in 2.16.13, the rest in 2.16.19.** Every `_.*` call across the framework is now
native or one of the `fw.*` helpers. No script handle declares `underscore`.

The "mechanical conversion" framing held for most of it, but not for `_.template`. Template literals
were the wrong tool: the addable-box and addable-popup item-title templates are **authored by users and
stored in the database**, with `{{= }}` / `{{- }}` / `{{ }}` delimiters and arbitrary JS in the
evaluate blocks. Their syntax had to keep working, so core gained a real `_.template`-compatible
compiler — `fw.template()` — verified output-identical to Underscore across the delimiter forms,
`with`-scoped bare identifiers, `print()`, escaping and null handling. `fw.escapeHtml()`,
`fw.throttle()` and `fw.debounce()` cover the other non-trivial helpers.

The second lesson was about the dependency itself. Dropping `'underscore'` from the `fw` handle breaks
any script that used `_` while relying on inheriting it — and five did, three of which had *never*
declared it. The rule now enforced: **a script that uses `_` declares `'underscore'` itself.**

Two conversion traps worth recording. Underscore's `_.each` yields `(value, key)` over an object but
`(value, index)` over an array, so a blind rewrite silently reverses the arguments — every ambiguous
receiver had to be read rather than pattern-matched. And rewriting `_.findWhere(list, {id: this.x})`
into `list.filter(function (o) { return o.id === this.x; })[0]` moves `this` inside the callback,
where it is no longer the view; the value has to be hoisted first.

Nothing here was urgent on its own — nothing was broken and WordPress still ships both. The value is
**removing the reason people call the framework legacy**, and clearing the ground so the builder work
isn't happening on top of a stack nobody wants to learn.

## jQuery: the largest dependency, and the one worth *not* rushing

With Backbone and Underscore both at zero, jQuery is now the only large legacy dependency left in the
admin — and until this baseline it was the least measured.

| Measure | Value |
| --- | --- |
| Script handles declaring `jquery` | **92** |
| Admin JS files using it | **~116** |
| Front-end files using it | **0** |
| jQuery UI | `sortable` × 14, `draggable` × 3, `tabs` × 2, `autocomplete` × 2, `slider` × 1, `widget` × 1 |

The API surface is overwhelmingly ordinary DOM work. Counting call sites across all admin JS:

```
.find  1252    .on   721    .attr 524    .closest 367    .val  349
.addClass 334  .remove 303  .trigger 301 .each    297    .data 231
```

Almost all of that has a direct native equivalent. `.data()` is the one to watch — jQuery keeps its own
cache separate from `dataset`, so a naive swap changes behaviour where values are objects.

### The finding that should govern priority

**WordPress loads jQuery in `wp-admin` unconditionally.** Core admin scripts depend on it, so it is on
the page whether or not UnysonPlus asks for it. Removing jQuery from admin code therefore saves the
user **nothing** — not a byte of payload, not a millisecond of parse.

This is the opposite of the front end, where removing jQuery was worth real money and was done. It is
also unlike Backbone and Underscore: those were removed from *core* so that the framework's own
foundation carried no dependency it did not need — a coherence argument that stops applying once you
reach leaf scripts on a page that already loads jQuery for other reasons.

And full removal is not available anyway. `jquery-ui-sortable` and `jquery-ui-draggable` power the
builder's drag-and-drop across 17 handles. Replacing those is not a jQuery migration; it is rewriting
the canvas interaction model, which is step 6.

### What follows from that

Treat admin jQuery as **opportunistic, not a project**. Convert a file when you are already editing it
for another reason — which is what has been happening organically (`$.trim()` → native in Live Editor,
Mailer and Snippets; `.bind()` → `.on()` in the form builder). That work is real and worth continuing;
it does not warrant a migration plan of its own, and it should never be the reason to touch a file that
is otherwise working.

The honest ranking of remaining legacy debt, by value rather than by size:

1. **Underscore in non-canvas files** (~4 in shortcodes, one of which is dead code) — small, isolated
2. **jQuery, opportunistically** — no payload win, so quality only
3. **The builder canvas** — Backbone, jQuery UI and the drag-drop model, together, when forced

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
4. **Retire Backbone from `fw.js`.** ✅ Done in 2.16.11. Replace the two call sites with plain ES6.
   Small, isolated, independently shippable.
5. **Retire Underscore from core.** ✅ Done in 2.16.13. Native equivalents file by file, plus
   `fw.template()` for the user-authored templates that template literals could not cover.
5.5. **Retire the trivial Backbone users.** ✅ Done in 2.16.16. Two files depended on Backbone for a
   single line each — an event mixin in `editor_integration.js` and an empty model used as an event bus
   in megamenu's `admin.js` — both replaced with `fw.Events`, which had shipped in 2.16.11 for exactly
   this shape. Backbone went from five files to three. Neither is canvas code, which is why this could
   run ahead of step 6 rather than inside it.
6. **The builder canvas.** ✅ Done in 2.16.19. `builder.js`, `helpers.js` and the flexbox
   page-builder item moved onto `fw.Class` / `fw.Collection` / `fw.View`, keeping every
   `builder.classes.*` name and signature so the 23 files extending them needed no changes.
   `jquery-ui-sortable` / `draggable` were deliberately left in place — replacing them is an
   interaction-model rewrite, not a dependency swap, and belongs to its own decision.

   The original rule was "only if there is a concrete reason." That rule existed to protect live
   sites from a canvas rewrite; UnysonPlus has not been marketed, so the premise did not hold. The
   23-consumer surface is the cost driver and only grows, breaking changes are near-free pre-launch,
   and the canvas is the product while Gutenberg blocks are additive. See
   [why step 6 moved from deferred to priority](/decisions/builder-canvas-now-not-later).

**jQuery is deliberately not a step.** See the jQuery section above: `wp-admin` loads it regardless, so
converting admin code buys nothing measurable. It is opportunistic work, done while a file is open for
another reason.

Every step here was individually shippable and individually reversible, and none changed a saved
value, a stored option, or a rendered page. That is the test each step had to pass — and for step 6
it was enforced by asserting `JSON.stringify(rootItems)` stayed byte-identical against the real
`backbone-relational`, since that string *is* the page-builder storage format.

## The standard applied throughout

Every change in this plan is measured against three questions:

1. **Does it change the option schema?** If yes, it needs a value-shape migration and probably
   shouldn't happen.
2. **Does it change rendered front-end output?** If yes, it is not modernization, it is a redesign.
3. **Can it ship on its own?** If no, it is too big and should be decomposed.

Modernization that cannot answer those three is how working frameworks get broken. The point here is
not to arrive at a fashionable stack. It is to arrive at a stack a developer in 2030 will recognise —
without a single site noticing the journey.
