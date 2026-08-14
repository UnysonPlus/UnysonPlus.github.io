---
slug: extension-contract-is-not-legacy
title: "Is the extension architecture itself legacy — should elements be rewritten block-native?"
authors: [jon]
tags: [architecture, extensions, shortcodes, back-compat]
date: 2026-08-14
description: The standing criticism of Unyson is that its extension layout — config.php, options.php, views/, static/ — is a 2014 pattern that modern WordPress replaced with block.json, React controls and PSR-4 autoloading. The question was whether UnysonPlus should rewrite its element architecture block-native. Decision — keep the extension contract (it is the compatibility promise and it matches what every shipping page builder actually does), and modernize underneath it instead - autoloading and namespaces for new code, a real build pipeline, and React admin surfaces. Blocks, if they come, arrive as an additive wrapper layer, never as a replacement.
---

**The question:** The most common criticism aimed at anything descended from Unyson is that the
extension layout itself is obsolete — a `config.php` / `options.php` / `views/` / `static/` folder,
options declared as PHP arrays, output rendered through a shortcode. Modern WordPress, the argument
goes, means `block.json`, React `InspectorControls`, PSR-4 autoloading and a webpack build. Is the
UnysonPlus extension architecture legacy debt that has to be rewritten?

<!-- truncate -->

## Context

The criticism bundles together four separate claims, and they are not equally true:

1. **The directory convention is old.** True in the sense that it dates from the WordPress 3.8–4.x era.
2. **Array-defined options and shortcode output were replaced by blocks.** This is where the argument
   breaks down — see below.
3. **There is no autoloading, no namespacing, no Composer.** True, and it is real debt.
4. **There is no modern asset pipeline for the admin bundle.** True, and it is real debt.

Claim 2 is the load-bearing one, and it does not survive contact with the market. Gutenberg is the
standard for the *core editor*. It is not the standard for *page builders* — and a page builder is what
UnysonPlus is. Every builder actually shipping at scale registers elements in PHP with
array-or-fluent-defined controls, renders through a PHP view layer, and attaches frontend behaviour
with plain JS: Elementor (`Widget_Base::register_controls()`), Bricks, Beaver Builder, Breakdance,
Oxygen. Not one of them is block-native. Elementor's control registration is the same idea as
`options.php` wearing a class; the difference is packaging, not paradigm. And `do_shortcode()` is core
WordPress, stable, and still how much of that output reaches the page.

So "array options and shortcodes are outdated" describes an *implementation style that went out of
fashion*, not a paradigm the industry moved off. Meanwhile claims 3 and 4 — autoloading and the build
pipeline — describe debt that is genuinely worth paying down, and neither one requires touching the
extension contract to fix.

The other fact that constrains this: the extension contract **is** the compatibility promise. Every
site running an Unyson-descended theme, every third-party extension, every saved page of builder
content resolves through it. Breaking it is not a refactor; it is ending the product and starting a
different one.

## Options considered

- **Rewrite element registration block-native** (`block.json`, React edit components, `render.php`).
  Aligns with core-editor conventions and reads modern on a repo listing. Costs: every existing site,
  every saved layout and every third-party extension breaks; multi-year effort; and it lands the
  framework in the one arena — Gutenberg blocks — where it would compete with core itself rather than
  in the builder space where it is differentiated. No user gains a feature from it.
- **Change nothing and defend the status quo.** Zero risk, but concedes claims 3 and 4, which are fair.
  Missing autoloading and a missing build step are real maintainability and collision costs that grow
  with the codebase, and they are the reason the "legacy" label keeps sticking.
- **Keep the contract, modernize underneath it.** Treat the extension folder shape and the option
  schema as a stable public API, and replace what sits *below* the API — loading, namespacing,
  tooling, admin UI — incrementally, with no breakage at the boundary.

## Decision

**Keep the extension contract; modernize underneath it.** Concretely:

- The extension folder shape (`config.php`, `options.php`, `views/`, `static/`) and the option-array
  schema stay as the **public, stable API** for elements and extensions. `options.php` is treated as a
  declarative schema file, not as a script — which is exactly what makes it safe to keep, and what
  would let a class or a JSON manifest produce the same array later without any extension author
  noticing.
- **New PHP code gets namespaces and Composer PSR-4 autoloading**, alongside the existing convention
  loader rather than in place of it. This addresses the real debt — global-scope `fw_*` collision risk
  and load-order fragility — without a big-bang migration.
- **The admin bundle gets a real build step.** Dependency graph, minification and cache-busting for the
  builder/options assets, replacing hand-enqueued files. This is the highest-leverage of the four
  criticisms and the cheapest to act on.
- **The admin UI modernizes toward React incrementally**, exactly as already decided in
  *Why we're adopting React incrementally* — new isolated surfaces on `wp.element`, the canvas and
  option types untouched. The Backbone + Underscore layer is the next target of that programme, in
  planning now.
- **Blocks, if and when they arrive, arrive additively** — a thin wrapper exposing existing elements as
  blocks for users who work inside Gutenberg. Additive, reversible, no rewrite, no breakage.

## Why

- **The contract is the product's compatibility promise, and it is not what's dated.** What people
  point at when they say "legacy" — the folder names — is cosmetic. What is actually costly —
  autoloading, tooling, the admin JS layer — is fixable without touching the folder names at all. Those
  two things get conflated constantly, and separating them is the whole decision.
- **Rewriting working, load-bearing code without a forcing function is the well-known way to kill a
  mature product.** The same reasoning that settled the React question settles this one, and there is no
  forcing function here: no user is blocked, no feature is unbuildable, and the builder market has not
  moved to blocks.
- **The honest rebuttal is stronger than the defensive one.** UnysonPlus is not old Unyson: the
  visitor-facing front end is jQuery-free, the PHP is 8.2-clean across the codebase, the vendored
  libraries are current, and the remaining legacy is narrow, identified, and on a roadmap that is
  actively being worked. "Here is the modern foundation, here is precisely what we are migrating next,
  and here is why the part you called outdated is a deliberate compatibility boundary" is a position
  that holds up to inspection — which is more than "we rewrote it in the current framework" usually
  does.
- **Deliberate is not the same as dated.** A stable extension API that third parties can build against
  for a decade is a feature of a mature framework, not evidence of neglect. The frameworks that churn
  their extension API every major version are the ones extension authors abandon.

Status: **Accepted.** Autoloading for new code, the admin build pipeline, and the Backbone/Underscore
modernization proceed as separate tracked efforts; the extension contract is explicitly out of scope
for all of them.
