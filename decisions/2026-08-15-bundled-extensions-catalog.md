---
slug: bundled-extensions-catalog
title: "Deleting Mega Menu erased it from the Extensions manager — hand-maintain the catalog, or derive it?"
authors: [jon]
tags: [extensions, architecture]
date: 2026-08-15
description: Deleting a bundled extension removed it from the Extensions manager permanently — eleven of them, recoverable only by reinstalling the plugin. The manager reads installed extensions from their manifests but available ones from a hand-maintained catalog that nobody remembered to update. Decision — derive catalog entries from the bundled manifests and remember them in an option, because the folder is gone at exactly the moment the entry is needed.
---

**The question:** Deleting the Mega Menu extension removed it from the Extensions manager
entirely — no card, no way to reinstall it. Deleting Breadcrumbs left it listed, offering an
Install button. Why do some extensions survive deletion and others don't, and what's the right
fix?

<!-- truncate -->

## Context

The Extensions manager renders its page from **two lists with two unrelated sources**:

- **Installed** extensions come from each extension's own `manifest.php` (`$manifest['display']`)
- **Available** extensions — the ones you can install, including anything you've deleted — come
  from a hand-maintained catalog, `available-extensions.php`

An extension therefore survives deletion only if it appears in the *catalog*. Mega Menu didn't,
so deleting it erased the manager's only record of it.

Two separate causes, both inherited from upstream Unyson:

1. Mega Menu was in the catalog but flagged `'display' => false`, so it was never rendered in the
   available list. `forms` had the same flag.
2. A hardcoded rule in the view suppressed `styling` and `megamenu` unless the active theme
   declared them in `supported_extensions`. That made sense when Mega Menu was theme-specific.
   In UnysonPlus it is bundled and user-facing, so it only served to hide it.

Auditing the rest turned up a bigger problem than the reported one. **Eleven bundled extensions
vanished when deleted** — `megamenu` and `forms` from the flag, plus nine that were never added to
the catalog at all as UnysonPlus grew its own extension set: `animated-icons`, `animation-engine`,
`chat`, `gutenberg`, `live-editor`, `newsletter-crm`, `snippets`, `template-library`, `woocommerce`.

Three others — `shortcodes`, `builder`, `mailer` — are hidden in *both* places, deliberately. They
are infrastructure other extensions depend on and users never install or delete them directly.
That's consistent, and was left alone.

## Options considered

**Hand-add the nine to the catalog.** Explicit, reviewable, matches the existing file. But it is
exactly the maintenance step that was already forgotten nine times — every future bundled extension
needs someone to remember a second, unrelated file. The failure is silent and only shows up when a
user deletes something.

**Derive the catalog from the bundled extensions on disk.** No list to maintain: scan
`framework/extensions/*/manifest.php` and build entries from what's there. This is the obvious fix
and it does not work — `uninstall_extensions()` **recursively deletes the extension folder**, so at
the exact moment the entry is needed, the manifest it would be derived from is gone. A scan can
only ever describe extensions that aren't the problem.

**Generate the catalog at build time.** Bake the entries into a static file during
`build-release.ps1`. Correct and stateless, but it moves a runtime concern into the release
pipeline, and a working copy that hasn't been built would disagree with a released one.

## Decision

Derive entries from the bundled manifests **and remember them in an option**
(`fw_bundled_extensions_catalog`). Each page load merges what's on disk into the remembered set;
entries for extensions no longer present are kept. The curated `available-extensions.php` still
wins for any name it defines, so hand-written descriptions and thumbnails are untouched.

Mega Menu and Forms were flipped to `display => true`, and the hardcoded `styling`/`megamenu`
suppression removed.

Each entry's download source comes from the manifest's existing
`$manifest['github_update'] = 'user/repo'` — already present on all 23 bundled extensions, and
already exactly the value the installer needs.

## Why

**The option is the part that does the work.** Everything else is a way of producing entries; the
persistence is what survives `rm -rf` of the extension folder. That reframing is the whole decision
— the disk scan alone is intuitive and useless here.

**It fails safe in the direction that matters.** A bundled extension can only be deleted if it was
installed, and if it was installed this install has seen its manifest. There is no path where an
extension is deletable but was never remembered.

**Repo names could not have been derived.** A mechanical folder-name transform gives
`UnysonPlus-Newsletter-Crm-Extension` and `UnysonPlus-Woocommerce-Extension`; the real repos are
`UnysonPlus-Newsletter-CRM-Extension` and `UnysonPlus-WooCommerce-Extension`. Reading
`github_update` avoids inventing a mapping and a table of exceptions to go with it.

**Hiding stays a per-extension property.** Infrastructure extensions declare
`$manifest['display'] = false` and remain hidden through the derived path too, so the fix doesn't
expose `shortcodes` or `builder` to users as installable things.

The one cosmetic trade-off: derived entries carry no thumbnail. A manifest's thumbnail lives
*inside* the extension folder, so its URL 404s once deleted — precisely when the entry is shown.
They fall back to the manager's default placeholder rather than a broken image, and can be given
real artwork by adding SVGs to the manager's own thumbnails directory.
