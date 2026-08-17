---
title: AI Dev Kit — Overview
sidebar_label: Overview
sidebar_position: 1
slug: /
description: The UnysonPlus AI Dev Kit lets an AI agent build a full, editable WordPress site on UnysonPlus from a URL, screenshot, or mockup — matching the source 95–100% on the first pass.
---

# The UnysonPlus AI Dev Kit

The **AI Dev Kit** is a ready-made workspace that lets an **AI coding agent** (Claude Code, Cursor,
and similar) build a complete, fully-editable **WordPress site** on the **UnysonPlus** framework — from
a URL, a screenshot, or an HTML/CSS mockup — and match the source closely on the **first pass**.

You don't need to learn UnysonPlus. You stand up a WordPress install, point your agent at the kit,
paste one prompt, and the agent does the rest: it reads the kit's build playbook, captures the source,
converts it into native UnysonPlus pages, and verifies the result region by region.

## Why it exists

Hand-building a site to match a design is slow and drifts from the original. The kit encodes a
**repeatable method** — capture the source, translate it into the page builder's native options, then
**measure** the result against the original instead of eyeballing it — so an agent produces an accurate,
maintainable site instead of a rough approximation.

## What you get

- A **one-command WordPress** (via `wp-env`) with the UnysonPlus plugin + parent theme pre-installed —
  or instructions to use your own local install.
- A **child-theme starter** to copy per site.
- The **build playbook** the agent follows (design tokens → chrome → sections → motion → verify).
- The **capture + conversion pipeline** (the Capture Service + Site Converter) that turns a source into
  native builder content, plus a **browser dashboard** (`localhost:4600`) to run and watch conversions.
- A **parity harness** that measures how close the build is to the source.
- **Pen → Shortcode** (Alpha) — paste a pen's HTML/CSS/JS in the dashboard and get an installable
  UnysonPlus shortcode `.zip` with editable text/image options.

## Who it's for

- **Site builders / agencies** who want to convert or clone a design onto a real, editable WordPress
  stack — not a static export.
- **AI agents** that need a structured, tool-backed process to build UnysonPlus sites reliably.

## Next steps

- **[Quick Start](./quick-start.md)** — set up WordPress and run your first build.
- **[How It Works](./how-it-works.md)** — the capture-first, measure-don't-eyeball method.
- **[What It Can Build](./what-it-can-build.md)** — conversions, demos, from-scratch sites, and pens → shortcodes.
- **[The Capture Service](./capture-service.md)** — the capture pipeline and its browser dashboard.
- **[Get the Kit](./get-the-kit.md)** — requirements and the download.
