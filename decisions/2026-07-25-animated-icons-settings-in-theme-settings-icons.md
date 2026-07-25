---
slug: animated-icons-settings-in-theme-settings-icons
title: "Where do the Animated Icons toggles live — a standalone extension Settings page, or Theme Settings → Icons?"
authors: [jon]
tags: [architecture, option-types, animation]
date: 2026-07-25
description: "The opt-in Animated Icons extension gained per-technology toggles (Lottie, Rive, Animated SVG, Animated raster). They first lived on the extension's own Settings page (Extensions → Animated Icons → Settings). But all other icon configuration — which webfont packs and SVG libraries are on — already lives in Theme Settings → Icons, which is a box with Library / Browse / Upload sub-tabs. So the toggles moved there as a fourth 'Animated' sub-tab: co-located with the packs they belong beside, discoverable where people configure icons, and consistent with how the Animation Engine contributes its section to Theme Settings. The extension injects the tab via a filter only while active; storage moved from extension-scoped to theme-scoped (same scope as the pack toggles)."
---

**The question:** the Animated Icons extension has per-technology toggles (Lottie, Rive, Animated
SVG, Animated raster). Should they live on the extension's **own** Settings page, or move into
**Theme Settings → Icons** — perhaps as a new tab?

<!-- truncate -->

## Context

Animated icons are an opt-in extension: activating it reveals an "Animated" tab in the icon picker
and lets you choose which animation technologies are enabled. Those choices started on the
extension's own settings page (`settings-options.php` → Extensions → Animated Icons → Settings).

Meanwhile, **all other icon configuration already lives in Theme Settings → Icons** — an `Icon
Settings` box whose sub-tabs are **Library / Browse / Upload** (which webfont packs and SVG
libraries are enabled, catalog installs, custom uploads). So a user configuring icons had to look in
two places: packs in Theme Settings → Icons, animation technologies buried under Extensions.

Two codebase precedents pointed the way. The **Animation Engine** extension does not ship a settings
page at all — it contributes a section to Theme Settings via the `fw_settings_options` filter while
active. And the Icons page is already a tabbed box, so a fourth tab slots in cleanly.

## Options considered

- **Keep the extension's own Settings page.** Self-contained and extension-scoped (persists across
  theme switches). But it splits icon configuration across two screens and hides the toggles where
  few people look — the opposite of discoverable.
- **Fold the toggles into Theme Settings → Icons as an "Animated" sub-tab** — chosen. Co-locates
  every icon setting on one screen, puts the toggles exactly where someone configuring icons is
  already looking, and matches the Animation-Engine-style "extension contributes to Theme Settings"
  convention. The tab appears only while the extension is active.
- **A separate top-level Theme Settings tab (e.g. "Animated Icons").** More discoverable than the
  extension page, but it divorces the toggles from the packs they belong with; a sub-tab of Icons is
  tighter.

## Decision

Move the toggles into **Theme Settings → Icons** as a fourth **"Animated"** sub-tab (beside Library /
Browse / Upload) and drop the extension's standalone `settings-options.php`. The Icons page exposes a
filter (`unysonplus_icons_animated_settings`) that it fills into the box; the **extension hooks that
filter only while active**, so with the extension off the Icons page shows just Library / Browse /
Upload. The four gate filters (`fw_icon_lottie_enabled` / `_rive` / `_svg_animation` / `_raster`) now
read their values from **theme settings** (`fw_get_db_settings_option`) instead of extension
settings. No data migration was needed — the feature is unreleased.

## Why

It removes the "two places to configure icons" split: packs and animation technologies now sit on one
screen, in the order you'd reason about them. It follows the framework's own pattern (an animation
extension augmenting Theme Settings rather than shipping a bespoke page), so it reads as native rather
than bolted-on. And the injection-via-filter keeps the coupling clean — the Icons page owns the tab
*slot*, the extension owns the *contents*, and nothing appears when the extension is inactive.

The one deliberate trade-off: settings are now **theme-scoped** (a theme switch resets them) rather
than extension-scoped. That is a feature, not a regression here — the pack toggles the animated
toggles now sit beside are *also* theme-scoped, so the whole Icons screen behaves as one consistent
unit.

## Status

Accepted.
