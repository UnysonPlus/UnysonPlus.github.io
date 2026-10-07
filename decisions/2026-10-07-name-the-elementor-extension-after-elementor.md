---
slug: name-the-elementor-extension-after-elementor
title: "Why is the Elementor extension called just \"Elementor\" and not \"Elementor Widgets\"?"
authors: [jon]
tags: [naming, extensions]
date: 2026-10-07
description: "The extension that puts Unyson+ elements into Elementor shipped as \"Elementor Widgets\". It was renamed \"Elementor\" because it is the home for everything Unyson+ does inside Elementor, not only the widgets — the same way the WooCommerce extension is called WooCommerce."
---

**The question:** The extension that turns Unyson+ elements into Elementor widgets is listed as "Elementor Widgets". Would it be better to name it just "Elementor", since more Elementor features may be added to it later?

<!-- truncate -->

## Context

The extension shipped as **Elementor Widgets** (1.0.4 – 1.0.8): 64 Unyson+ elements as native Elementor widgets. It already does more than widgets, though. It hides Elementor's locked Pro tiles, orders the panel categories, prints each element's page CSS, and gives the Site Converter its first choice when converting into Elementor. Everything about it except the display name is already keyed to `elementor`: the folder, the GitHub repo `UnysonPlus-Elementor-Extension` and the settings key. The WooCommerce extension sets the precedent: it is called **WooCommerce**, not "WooCommerce Elements", and it holds widgets, shop pages and storefront features under one name.

## Options considered

- **Keep "Elementor Widgets".** Accurate today. But every later Elementor feature, such as dynamic tags or theme-builder locations, would either live under a name that undersells it or need a second extension.
- **Split per feature** ("Elementor Widgets", "Elementor Theme Builder" …). Several extensions to install and keep in step for one integration, and settings scattered across them.
- **Rename it "Elementor".** One home for everything Unyson+ does inside Elementor, named after the plugin it integrates with, like WooCommerce.

## Decision

The extension is now called **Elementor** (from 1.0.9). The description opens with "Elementor integration for Unyson+". Only the display name changed: the folder, the repo, the widget ids (`up-<tag>`) and the saved settings are untouched, so existing sites and pages are unaffected.

## Why

The name should describe the scope the extension is meant to grow into, not its first feature. Naming it after the integrated plugin is the pattern the extensions list already uses, so people find it where they expect it. Because every technical identifier was already `elementor`, the rename costs nothing in compatibility.
