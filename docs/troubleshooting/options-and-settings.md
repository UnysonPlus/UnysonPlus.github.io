---
title: Options & settings
sidebar_position: 4
slug: /troubleshooting/options-and-settings
description: 'Fixes for Unyson+ options and settings: "Undefined option type: page-builder", extension requirements not met, and settings overwritten on import.'
---

# Options & settings

## "Undefined option type: page-builder"

**Symptom:** a fatal or notice reading `Undefined option type: page-builder`.

**Cause:** an extension read settings **too early** (inside its `_init()`), which forces the option
types to initialize before the Page Builder extension has registered its `page-builder` option type.

**Fix:** defer settings reads to the `init` hook or later — never during `_init()`. See
[How the framework boots](/architecture/framework-boot).

## "Framework requirements not met" / an extension won't activate

**Symptom:** an extension stays inactive, with a notice about a required version or extension.

**Cause:** an extension declares **requirements** — a minimum PHP / WordPress / framework version, or
another extension. If a requirement isn't met, the dependent stays inactive.

**Fix:** activate or update the required extension (or raise the PHP / WordPress version). See
[The extension system](/architecture/extension-system#requirements-decide-the-order).

## Importing theme settings wiped unrelated settings (developers)

**Symptom:** importing one group of settings changed or corrupted unrelated ones.

**Cause:** writing the whole settings map at once with `fw_set_db_settings_option( null, $map )` re-runs
every option's storage-save on its already-stored value, which can corrupt unrelated settings.

**Fix:** apply each imported key **individually** — `fw_set_db_settings_option( $id, $value )`. The Site
Converter's theme-settings importer does exactly this.
