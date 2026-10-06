---
slug: two-way-design-sync-with-page-builders
title: "Can Unyson+ colours and fonts stay in sync with Elementor's — both ways?"
authors: [jon]
tags: [architecture, color, typography, extensions]
date: 2026-10-06
description: "On a site running both Unyson+ and Elementor, should the design live in one place or two? The decision: keep both, and sync them both ways through a small Builder Sync extension — a builder-neutral design model in the middle, one provider per builder, an identity map so renamed colours stay attached, and a rule that a field one side cannot express is never erased on the other."
---

**The question:** When a site is converted into Elementor, its colours and fonts live in Unyson+ Theme Settings *and* in the Elementor Site Kit. Is it possible to make them bi-directional — edit either one and the other follows — and what else besides colours and fonts should follow?

<!-- truncate -->

## Context

Both sides keep their design as plain lists that are saved through a known event — Theme Settings fire `fw_settings_form_saved`, the Elementor kit fires `elementor/document/after_save`. The work is not the plumbing; it is that the two models do not line up exactly. Unyson+ derives a colour's identity from its *name*, so renaming "Primary" changes it; Elementor keeps a fixed id. Unyson+ shrinks type for mobile automatically, Elementor stores a size per device. A Unyson+ Text Style can carry a colour and custom CSS; an Elementor global font cannot.

## Options considered

- **One-way, Unyson+ → Elementor only.** Simple, but an Elementor user edits colours in Elementor and would see them silently overwritten.
- **Point one side at the other's CSS variables.** Neither side's colour picker stores a variable; the editors would show nonsense.
- **Two-way sync through a neutral middle model.** Each builder becomes a small provider that maps the model onto its settings; the model only ever speaks plain values.
- **Give every Unyson+ colour a hidden permanent id** (a schema change) vs. **keep an identity map beside the sync.** The schema change ripples into the preset library, the AI abilities and every converter that writes a palette; the map keeps the same promise — a renamed colour stays the same colour — inside the extension.

## Decision

A separate **Builder Sync** extension, not part of the converter, because it is useful on any site running both. It keeps a builder-neutral design model (`FW_Builder_Sync_Design`) and one provider per builder (`fw_builder_sync_providers`); Elementor is the first. It syncs colour presets, the body text colour, heading and body fonts, H1–H6, link colours, container width, the site background, the primary button and Text Styles. Direction is a setting: two-way (default), Theme Settings → builder, or off. Renames ride an identity map rather than a schema change.

Two rules make it safe:

- **Lossy, never destructive.** A field one side cannot express is left untouched on the other, so syncing from Elementor never wipes a Text Style's colour or custom CSS.
- **Deletions do not cross.** A colour deleted in Elementor is not deleted from Unyson+, because elements reference presets by name; Elementor entries the user created themselves are never removed by a push.

The converter writes both sides from the same design on every Elementor conversion, so a converted site starts in step.

## Why

Making the person pick one place to edit design would be wrong for exactly the people this feature serves: someone converting into Elementor expects to edit in Elementor, and the Unyson+ theme still renders the header and footer from Theme Settings. A neutral model in the middle keeps every builder after Elementor to one provider class. The identity map delivers what the user asked for — a renamed colour stays attached — without a schema change that would have touched half the product.
