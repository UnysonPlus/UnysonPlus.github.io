---
sidebar_position: 6
title: Site Converter
---

# Site Converter

Bring an AI-generated website into WordPress. **Site Converter** is the admin home
(**Unyson+ → Convert**) for the AI-site importer: it ingests the artifacts an agent emits per
the conversion contract and applies them to your site.

## Tools

| Tool | What it imports |
| --- | --- |
| **Media** | Fetches the source site's images into the Media Library (de-duped by source URL) — from a pasted URL list or by scanning a page. |
| **Styling Presets** | Applies a presets export (palette, font sizes, button colors, spacing/gap scales) into the theme-independent preset store in one step. |
| **Menus** | Builds WordPress nav menus from the source navigation and assigns them to the theme's header / footer menu locations. |
| **Theme Settings** | Applies a design-file export (global chrome, typography defaults, custom CSS) to the theme settings. |
| **Pages** | Creates WordPress pages from page-builder trees — the plugin generates the content, so each page stays fully editable. |

## Convert bundle (one-shot)

Upload a single `.zip` and Site Converter applies **media, presets, theme settings, pages and
menus in order** — the full conversion in one step.

## Theme generator

Reproduces the source site's **header and footer design** (logo placement, nav, CTA, fonts,
colors, footer) as a real WordPress theme — either a lightweight **child of unysonplus-theme**
or a **self-contained standalone theme**. Only stylings are copied; the logo stays the site's
own Site Logo / Site Title.

:::note Work in progress
Expand this page with screenshots of the Convert dashboard and a step-by-step bundle import.
:::
