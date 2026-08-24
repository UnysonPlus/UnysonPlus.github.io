---
title: API Reference
sidebar_label: Overview
sidebar_position: 1
slug: /
description: The UnysonPlus PHP API reference — every public helper function and every action/filter hook, generated from the framework source.
---

<!-- ⚠️ GENERATED — do not edit by hand. Edit the framework docblocks, then run: php scripts/extract-php-api.php … && node scripts/gen-php-api.mjs -->

# API Reference

A generated reference to the UnysonPlus framework's **public PHP surface** — the functions and hooks
theme and extension authors build against. It is produced from the framework's PHPDoc and a source
scan, so it always matches the shipped code (never hand-written).

## What's here

- **[Functions](./functions/index.md)** — 844 public helper functions
  (`fw_` / `unysonplus_` / `upw_` / `sc_` / `fw_ext_`), grouped by subsystem, with signatures,
  parameters, return values and source locations. Pluggable (`function_exists`-guarded) functions are flagged.
- **[Hooks](./hooks/index.md)** — 342 actions & filters, grouped by subsystem — the
  supported extension points.

## What's not here

This is a **contract** reference: the public API + hooks. Internal implementation helpers,
anonymous closures, and WordPress-core hooks are intentionally excluded — read the source for those.
For *how to build* with the framework, see the **Manual**, **The Theme**, and **AI Dev Kit** sections.

> **Regenerating:** run `php scripts/extract-php-api.php "…/unysonplus/framework" reference/_data/php-api.json`
> then `node scripts/gen-php-api.mjs`. The `.md` files are generated — edit the framework docblocks, not the output.
