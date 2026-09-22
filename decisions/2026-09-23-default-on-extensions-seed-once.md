---
slug: default-on-extensions-seed-once
title: "Why an extension that ships 'on by default' is seeded once and never re-checked"
authors: [jon]
tags: [admin-ui, extensions, architecture]
date: 2026-09-23
description: "Making the Admin Skin active out of the box looks like a one-liner: on each admin load, if it is not active, activate it. That version is unswitchable-off — the next page load undoes the user's choice. The decision: a one-time seed guarded by an option, which hands ownership of the setting to the user the moment it has run."
---

**The question:** The Admin Skin should be on as soon as the plugin is installed, the way the Page Builder is, rather than sitting unnoticed in the Extensions manager. Where does that activation live, and how should it behave when someone turns the extension back off?

<!-- truncate -->

## Context

The framework decides what is active purely from the `fw_active_extensions` option. Nothing else votes: if a slug is not a key in that array, the extension does not load. So "on by default" means one thing only — putting the slug into that option.

There was already a pattern to copy. The Page Builder keeps its hidden `page-editor` child active with an `admin_init` hook that checks and re-adds on every request. That works there because the child is not a user-facing choice; it is an implementation detail that rides with its parent, and there is no sensible state in which someone wants the Page Builder without it.

The Admin Skin is the opposite. It restyles the entire admin, which is exactly the kind of change some people will want to undo.

## Options considered

**Copy the `page-editor` pattern — ensure it is active on every admin load.** Simple, self-healing, survives anything that clears the option. It is also a trap: a user who deactivates the extension gets it back on the next page load, with no error and nothing to explain why. The Extensions screen would appear to be broken, and the only real fix would be to stop using the plugin.

**Activate it from the plugin activation hook.** Runs once, which is the right shape, but it only fires for people who activate the plugin *after* this version ships. Existing installs updating in place would never see it, and the hook does not run at all in some provisioning flows.

**A one-time seed on `admin_init`, guarded by its own option.** Runs on the next admin page load whether the plugin was freshly installed or updated in place, and then never again.

## Decision

A one-time seed: `fw_upw_seed_default_extensions()` in `framework/includes/default-extensions.php`, guarded by `unysonplus_default_extensions_v1`.

Three details that matter more than they look:

- **The guard is written first**, before any activation work. If anything below it fails, the seed still never re-runs — a half-failed seed must not become a loop that fights the user on every page load.
- **It only seeds what is on disk.** The public release zip is core-only, so the seed finds no `admin-skin/manifest.php` and does nothing; the extension arrives later through the Extensions manager, which already activates on install.
- **It is a list, not a special case.** `fw_upw_default_extensions` is filterable, so the next extension that should ship on is a one-line addition rather than another bespoke hook.

The seed also sets a flag that makes the extension introduce itself once, with a dismissible notice naming both ways back: the profile checkbox for just that user, and the Extensions manager for the whole site.

## Why

The deciding argument is about ownership. A default is a **starting position**, not a policy — it says "most people want this" and then gets out of the way. An "ensure active" loop confuses the two: it keeps asserting the default forever, which quietly removes the setting from the user without ever saying so.

Guarding with an option draws the line cleanly. Before the seed runs, the framework owns the value. After it has run, the user does, and deactivating sticks — which is the behaviour anyone would expect from a checkbox on an Extensions screen.

The notice is part of the same reasoning. Changing how someone's admin looks without being asked is defensible **only** if undoing it is obvious, and the place to undo it is not where most people would think to look.
