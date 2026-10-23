---
title: "Is Unyson+ production-ready?"
sidebar_label: "Is it production-ready?"
sidebar_position: 1
slug: /project-maturity
description: "A direct, evidence-based answer to whether Unyson+ is production-ready — how it is released and versioned, which PHP and WordPress versions it targets, how it is tested, and how portable your content stays."
keywords:
  - is unyson+ production ready
  - is unysonplus stable
  - unyson+ reliability
  - unyson+ release process
  - unyson+ php wordpress compatibility
  - unyson+ vendor lock-in
---

# Is Unyson+ production-ready?

> **The question, head-on:** Unyson+ is a free, open-source framework — can it be trusted on real
> client and production sites, or is it a hobby project?

**Short answer: yes, for its intended use — building and maintaining custom WordPress themes.** It is
built on the proven **Unyson** foundation (a framework that powered thousands of commercial themes),
modernized for current PHP and WordPress, and shipped through a disciplined, versioned release
process. Like any framework, "production-ready" depends on matching the tool to the job, so this
section lays out the actual evidence rather than asking you to take it on faith.

The usual, fair questions a reviewer asks about a smaller framework — and where each is answered:

| Concern | Short answer | Details |
| --- | --- | --- |
| **Is there a real release process?** | Versioned, tagged GitHub releases with changelogs; a version-driven auto-updater; every prior version stays downloadable for rollback. | [Releases, versioning & rollback](./releases-and-versioning.md) |
| **Does it run on current PHP / WordPress?** | A **PHP 8.0+** baseline (8.2-clean), **WordPress 5.8+**, with a safe fail-closed guard on older PHP. | [WordPress & PHP compatibility](./wordpress-php-compatibility.md) |
| **Is it tested, or does every change risk a regression?** | Automated regression suites (golden-output and parity tests), a build-time completeness check that blocks incomplete releases, and ongoing security hardening. | [Testing & stability](./testing-and-stability.md) |
| **Will I be locked in?** | Your content lives in **standard WordPress** posts and post meta; it's GPL; you can export, migrate, or walk away. | [Portability & lock-in](./portability-and-lock-in.md) |

:::tip[Where Unyson+ fits best]
Unyson+ is strongest for **developers building custom, distributable themes** — one integrated,
code-first stack (options framework, custom fields, custom post types, page builder, modular
extensions) instead of assembling a site from unrelated plugins. If your project is built around the
native block editor and Full Site Editing, a block-first stack may suit you better; see
[How Unyson+ compares](/comparisons).
:::

## What "production-ready" means here

It's worth being precise, because the phrase gets used two ways:

- **"Is the direction and the engineering sound for real projects?"** — Yes. That's what the pages in
  this section evidence.
- **"Is every single release independently certified for your specific stack?"** — No framework
  hands you that; you still test a release against your own site, plugins and host before you ship it.
  Unyson+ gives you the things that make that practical: small, readable releases, a clean rollback
  path, and content that stays in standard WordPress so you're never trapped.

That combination — proven lineage, modern baseline, versioned delivery, and no lock-in — is what
makes it a reasonable, and we think good, choice for custom theme work.
