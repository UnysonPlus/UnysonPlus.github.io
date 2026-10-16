---
slug: admin-app-shell-in-core
title: "The CRM, Membership and SEO screens all draw the same sidebar — should that frame move into core?"
authors: [jon]
tags: [architecture, admin]
date: 2026-10-16
description: Yes — as FW_Admin_App, a developer API in the framework, not a user-facing setting. Three hand-kept copies of one frame is two too many, and the fourth app was about to start as a fourth copy.
---

**The question:** The CRM, Membership and now SEO each render an app shell — a folded WordPress menu,
a left sidebar, a top bar. Is that duplicated code, and can it become a hook or a feature in Unyson+
so any screen can display its menus that way?

<!-- truncate -->

## Context

Three extensions had grown the same frame independently:

| | CRM | Membership | SEO |
| --- | --- | --- | --- |
| app class | 474 lines | 460 | 251 |
| shell CSS | ~520 lines | ~520 | ~440 |

Normalising the three class prefixes (`fw-crm-`, `fw-mbr-`, `fw-sa-`) and diffing showed the shell
stylesheets were **~96% identical**: of 523 lines, 20 differed, and those were a header comment and
one extra rule. The PHP differed more, but almost entirely in the parts that *should* differ — the
menu contents, and the CRM's extra top-bar pieces.

The clincher was already written down. Membership's stylesheet opens with *"Kept in step with the CRM
app… so the two read as one family"* — a comment doing a compiler's job. SEO was the third copy, made
by lifting the CRM's file and renaming its prefixes.

## Options considered

- **Leave it.** Zero risk today. But drift is already a manual discipline across three files, a
  focus-mode bug has to be fixed three times, and every extension ships 500 lines of the same CSS.
- **A shared file the extensions include from each other.** No new API to maintain, but it makes one
  extension depend on another being installed — and the public release zip is core-only, so an
  extension downloaded through the Extensions manager cannot rely on a sibling being there.
- **A user-facing setting** ("display my menus like this"). Rejected on its face: the frame folds the
  user's WordPress menu, which is only worth it on a screen that is genuinely an application. On an
  ordinary settings page it spends the menu and gives nothing back.
- **A developer API in core** — `FW_Admin_App`, opted into per admin page.

## Decision

`FW_Admin_App` in `framework/includes/admin-app/`, with the shell's CSS and JS in core
(`framework/static/{css,js}/admin-app.*`). An extension builds one, `attach()`es it to its admin page
and wraps its view in `open()` / `close()`; everything inside the content column stays the
extension's own. Extension-specific styling stays in the extension — only the frame moved.

The SEO extension adopted it first and now carries no shell of its own: its app file is a navigation
definition plus the reconciliation that keeps the sidebar honest against the options schema. CRM and
Membership follow.

Two details settled along the way:

- **Focus mode is one preference for every app** (`fw_admin_app_focus`), not one per app. Someone who
  wants the WordPress menu out of the way while they work wants that on every app screen, not
  re-decided in each one.
- **The shared ajax handler registers from the framework bootstrap**, not from `attach()`. `attach()`
  runs on `admin_menu`, which `admin-ajax.php` never fires — the toggle worked until the page
  reloaded, which is exactly the kind of bug that would otherwise have been found and fixed three
  times.

## Why

The duplication was not expensive to carry — it was expensive to *keep correct*. Three copies means
three places a fix has to land and three chances one of them is missed, enforced by a comment asking
the next person to remember. Extracting pays for itself at three copies, and the fourth app was about
to be written as a fourth copy.

Keeping it a developer API rather than a setting is the other half. The frame is a claim that a screen
is an application; that claim is something the person building the screen makes, not something a
checkbox should be able to assert about any settings page in the admin.
