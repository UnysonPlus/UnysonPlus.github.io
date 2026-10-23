---
title: "How Unyson+ is released, versioned & rolled back"
sidebar_label: "Releases & rollback"
sidebar_position: 2
slug: /project-maturity/releases-and-versioning
description: "How Unyson+ ships updates — tagged GitHub releases with changelogs, a version-driven auto-updater that keys on release assets, and how to roll back to any previous version."
keywords:
  - unyson+ release process
  - unysonplus versioning
  - unyson+ rollback previous version
  - wordpress plugin auto update github
  - unyson+ changelog
---

# How Unyson+ is released, versioned & rolled back

A framework is only as trustworthy as the way it ships changes. Unyson+ treats **releases as
known-good milestones**, not a stream of unverified commits.

## Every update is a tagged, versioned release

The plugin, the parent theme, and every extension carry an explicit version marker, and a change is
delivered only through a **tagged GitHub release**:

- Releases are tagged `v<version>` (e.g. `v3.0.49`) so the list stays sortable and every version is
  addressable.
- The public plugin ships a stable, spec-valid release asset — **`unysonplus.zip`** — attached to
  each release. Installers always point at that asset, never at a "Download ZIP" of the source.
- Notable changes are recorded in a **changelog** inside the relevant manifest, so a reader can see
  what shipped in a version without reading the diff.

Because releases are the unit of delivery, the version number tracks *releases*, not keystrokes —
the number you see corresponds to something that was actually cut and published.

## Updates are version-driven and automatic

Unyson+ updates straight from GitHub — no marketplace, no license keys, no manual re-uploads for
routine updates. A bundled update checker compares the installed version against the latest release
and offers the update from the normal WordPress dashboard:

```php
$checker = YahnisElsts\PluginUpdateChecker\v5\PucFactory::buildUpdateChecker(
    'https://github.com/UnysonPlus/UnysonPlus/',
    __FILE__,
    'unysonplus'
);
$checker->setBranch( 'master' );
$checker->getVcsApi()->enableReleaseAssets(); // install the release ZIP, not the source
```

An update appears only when the repo version is **higher** than the installed one, and versions are
**never downgraded in place** (that would break the updater's cached state). Full mechanism:
[Updates & auto-updates](/extensions/updates) and the
[versioning rules](/architecture/manifests-and-versioning#versioning-rules).

## Updates don't wipe the extensions you added

The base plugin is deliberately lean — the core framework plus a couple of bundled extensions —
and everything else installs on demand. A plugin update replaces the plugin folder, so the update
routine **backs up your downloaded extensions first** and restores the ones the new package doesn't
ship. You keep what you added across an update.

## Rolling back

Every release stays published, so rollback is straightforward and doesn't depend on any backup you
remembered to take:

1. Download the **previous version's `unysonplus.zip`** from the
   [Releases list](https://github.com/UnysonPlus/UnysonPlus/releases) (every tagged release keeps its
   asset).
2. Reinstall it over the current one (deactivate, delete the plugin folder — your content in the
   database is untouched — then upload the older zip under *Plugins → Add New → Upload*).
3. Reactivate. Your pages, options and settings live in the database, not in the plugin folder, so
   they're still there.

As with any site change, take a routine backup before a major update — but the project's own
discipline (small versioned releases, retained assets, content kept in the database) is designed so
that going back a version is a non-event.

:::tip[💡 Web dev tip: pin your dependencies to versions you've tested]
Treating each release as an addressable, retained artifact is the same principle as pinning package
versions in a lockfile: you upgrade deliberately and you can always return to a known-good point.
[web.dev: keeping dependencies up to date, safely](https://web.dev/articles/dependencies)
:::
