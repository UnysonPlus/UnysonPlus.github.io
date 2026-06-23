---
title: Manifests & versioning
sidebar_position: 4
---

# Manifests & versioning

Every part of UnysonPlus — the framework, the theme, and each extension — carries a **manifest**
that declares its version and its requirements. The framework reads these to decide what can
activate and to drive the GitHub auto-updater. This page covers the manifest model and the
project's version-bump rules.

## The manifest model

All three manifest kinds extend the abstract `FW_Manifest`
(`framework/core/class-fw-manifest.php`):

| Class | Source of its data | Notable keys |
| --- | --- | --- |
| `FW_Framework_Manifest` | `framework/manifest.php` (`$manifest`) | `version`, `requirements` (php, wordpress) |
| `FW_Theme_Manifest` | the theme's `style.css` header | `id`, `supported_extensions`, version forced from parent for child themes |
| `FW_Extension_Manifest` | the extension's `manifest.php` | `display`, `standalone`, `thumbnail`, `requirements.extensions`, GitHub repo keys |

`FW_Manifest` normalizes the manifest array (filling `name`, `version` default `0.0.0`, etc.) and
owns the requirement-checking logic shared by all three.

### A framework manifest

```php
// framework/manifest.php
$manifest = array();
$manifest['name']    = __( 'Unyson+', 'fw' );
$manifest['version'] = '2.12.77';
```

The framework manifest also holds the long `Changelog` docblock — see
[the versioning rules](#changelog-entries) for when an entry belongs there.

### An extension manifest

```php
// framework/extensions/portfolio/manifest.php
$manifest['name']        = __( 'Portfolio', 'fw' );
$manifest['version']     = '1.0.16';
$manifest['display']     = true;     // show on the Extensions page (vs a hidden helper ext)
$manifest['standalone']  = true;     // can be activated on its own (not only as a dependency)

// GitHub auto-update source
$manifest['github_update'] = 'UnysonPlus/UnysonPlus-Portfolio-Extension';
$manifest['github_branch'] = 'master';

$manifest['requirements']  = array(
    // 'extensions' => array( 'shortcodes' => array( 'min_version' => '1.5.0' ) ),
);
```

Two flags shape how an extension appears and behaves:

- **`display`** — `true` lists it on **Unyson+ → Extensions**; `false` hides it (a helper
  extension that only exists because something requires it).
- **`standalone`** — `true` means it can be activated on its own; `false` means it only makes
  sense as a dependency of another extension.

## The requirement model

`requirements` can constrain four things, each with `min_version` / `max_version`:

```php
$manifest['requirements'] = array(
    'php'        => array( 'min_version' => '7.4' ),
    'wordpress'  => array( 'min_version' => '6.0' ),
    'framework'  => array( 'min_version' => '2.10.0' ),
    'extensions' => array(
        'shortcodes' => array( 'min_version' => '1.5.0' ),
    ),
);
```

`check_requirements()` evaluates them in order. A failed **php**, **wordpress**, **framework**, or
versioned **extension** requirement is marked *final* (it won't pass on a later retry). A
**missing** required extension is *not* final — it may activate later, at which point the dependent
is retried (see [the dependency model](./extension-system.md#requirements-decide-the-order)). When
a requirement fails in admin, the framework shows a flash-message explaining which version is
needed (`get_not_met_requirement_text()`).

## Versioning rules

UnysonPlus follows a strict, project-wide versioning convention. **Every meaningful change bumps
the version** of each affected project (feature, bug fix, refactor, file move, security hardening,
dependency change). Skip only trivial typo / whitespace / comment edits.

### The bump & rollover scheme

- Each bump adds **+0.0.1** (patch).
- **Segments cap at 99 and cascade:** `0.0.99 → 0.1.0`, and `0.99.99 → 1.0.0`. Major is uncapped.
- **Existing numbers are grandfathered** — never reset a project to `0.0.1`, and never downgrade a
  version (it breaks the GitHub auto-updater's cached update state).
- Minor (`x.Y.0`) or major bumps happen only on explicit request.

### Which file to bump

| Project | File(s) to bump |
| --- | --- |
| **Plugin** (`unysonplus`) | **both** `unysonplus.php` header `Version:` **and** `framework/manifest.php` `$manifest['version']` (kept in sync) |
| **Affected extension** | that extension's `manifest.php` `version` — an **independent sequence per extension**, never synced across extensions |
| **Theme** (`unysonplus-theme`) | `style.css` header `Version:` |
| **Docs site** (`unysonplus-site`) | `package.json` `"version"` |

So a plugin change that lives in an extension touches **two or more** version markers: the plugin
pair *and* each affected extension's manifest. A task spanning multiple projects bumps each
project independently (different sequences; don't synchronize their numbers).

### Changelog entries {#changelog-entries}

A version bump is the normal record; **most bumps get no changelog entry.** Add an entry to the
top of the manifest's `Changelog` docblock **only** for:

- a **new feature** (new option type, shortcode, admin UI, public hook/filter, user-visible
  capability), or
- a **breaking change** downstream code must adapt to, or
- a **deliberate behavior change** explicitly worth recording.

Do **not** add an entry for bug fixes (any size, including security hardening), refactors, file
moves, diagnostics, dependency bumps, or internal performance tweaks — those bump silently. When
in doubt, skip the entry. The theme has no changelog block; bumping `style.css` `Version:` is its
full record.

:::caution `*/` inside changelog prose breaks the file
Watch for a literal `*/` in changelog text (e.g. `normal_*/hover_*`) — it closes the PHP docblock
early and is a syntax error. Rephrase to avoid it.
:::
