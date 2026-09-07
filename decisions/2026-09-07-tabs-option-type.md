---
slug: tabs-option-type
title: "Why the Background Pro tab UI became a reusable `tabs` option type"
authors: [jon]
tags: [option-types, animation-engine]
date: 2026-09-07
description: "Scroll Keyframes stacked its Start / Middle / End states as one long scrolling column of sliders. Making those states into tabs raised the real question: reach for the existing `tab` CONTAINER, or extract Background Pro's in-option tab strip into a proper value-holding `tabs` option type? The decision: build the option type, because the pattern already recurs (box / icon-badge / button / table presets) and the container type cannot live inside a value."
---

**The question:** The Scroll Keyframes control renders its Start, Middle (optional) and End states as one tall stack of sliders — you scroll the modal to reach the End state. Those three states are the textbook case for tabs. The framework already has a `tab` *container* type. So: use that, or build a new `tabs` *option* type by extracting the compact tab strip Background Pro already uses internally?

<!-- truncate -->

## Context

Two kinds of "tabs" exist in the framework, and they are not interchangeable:

- **The `tab` CONTAINER type** (`framework/includes/container-types/tab/`) organizes the options *tree* at the modal's top level — Content / Styling / Animations / Advanced. It holds **no value**; it is pure layout over a set of options defined at that level. It cannot be dropped inside a value-holding option (a `multi-picker` choice's group, say), and its full-width modal tabs nested three levels deep (modal tabs → Animations → picker → these) would read as heavy chrome.
- **Background Pro's in-option tabs** (Color / Gradient / Image / Overlay / Video) are the opposite: a **compact, value-holding** tab strip — small uppercase pills with a green "has value" dot — that switches between panels of nested controls and stores one keyed value (`{ color:{…}, gradient:{…}, … }`). But that UI was hand-rolled *inside* the Background Pro class, reachable by nothing else.

Start / Middle / End wants exactly the second thing, and so do several controls we already ship: **box presets, icon-badge presets, button presets, table presets** all render grouped option sets that would read better as tabs. The pattern recurs; the implementation didn't.

## Options considered

- **Reuse the `tab` container inside the picker group.** *Pro:* no new type. *Con:* the container holds no value and isn't meant to nest inside an option; even forced, its heavy full-width tabs three levels deep look wrong. It solves neither the value-shape nor the density.
- **Hand-roll another tab strip in Scroll Keyframes** (copy Background Pro's markup/JS). *Pro:* fast. *Con:* a second copy of the same UI, drifting from the first; the next control that wants tabs copies a third. This is the duplication we keep paying down elsewhere (PHP/JS converter parity, preset schemas).
- **Extract Background Pro's tab UI into a reusable `tabs` option type.** *Pro:* one polished, value-holding tab control any option can use — Scroll Keyframes now, and box / icon-badge / button / table presets later; Background Pro itself can eventually delegate to it so the UI lives in one place. *Con:* a value-holding option type that renders *nested* option types needs careful JS so inner controls initialize inside each panel — real work, done once.

## Decision

Build the **`tabs` option type** (`framework/includes/option-types/tabs/`), modeled on `multi` for value handling (`fw_extract_only_options` + per-child `get_value_from_input`, value shaped `{ tabId: { innerId: value } }`) and on `background-pro` for the tab strip (uppercase pills, optional per-tab "customized" dot). Each tab declares a `title` and a standard Unyson `options` array; panels render through `render_options` with `id_prefix` / `name_prefix` so inner controls keep native label/desc chrome and namespaced inputs. Eager-required in `bootstrap.php` (like the other plugin-only composite types) so its `register()` fires before any `options.php` uses `'type' => 'tabs'`.

Scroll Keyframes is the first adopter: Start / Middle / End are now three tabs (`states` value = `{ start:{x,y,…}, mid:{enable,at,ease,…}, end:{ease,…} }`), with `run_on_mobile` left outside the tabs as a global.

## Why

The container type answers a different question (organize the tree) than the one asked (a compact, value-holding, nestable tab control). Background Pro had already *proven* the exact UI — extracting it turns a one-off into a primitive, and every future multi-state option (hover/normal, per-breakpoint, before/after) reuses it instead of growing a fourth and fifth copy. The one real cost — initializing nested controls per panel — is paid once, in one place, behind a stable option contract.
