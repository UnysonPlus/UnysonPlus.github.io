---
title: Importing & converting
sidebar_position: 5
slug: /troubleshooting/importing-and-converting
description: Fixes for Unyson+ importers and the Site Converter — skipped re-imports, missing images, a restyled admin, and menus disappearing after a theme switch.
---

# Importing & converting

## A re-import skipped my page ("manually edited — preserved")

**Symptom:** re-running an importer reports a page as skipped / preserved.

**Cause:** that's the **manual-edit guard** working as intended. The importer fingerprints the builder
JSON it writes (`_upw_import_hash`); on a later run it **skips** any page whose current builder JSON
differs (which means you edited it), so your work is never clobbered.

**Fix / override:**

- Re-import a single page: `UPW_ONLY=<slug>`.
- Force-overwrite: `UPW_FORCE=1` — but only after folding your manual edits back into the source JSON.

See [Importers & demo system](/importers-and-demos).

## Site Converter imported no images

**Cause depends on the source:**

- **JS apps (React / Vite / Lovable):** the static HTML is a shell, so the scanner mines the page's
  script bundles for asset URLs. Very heavy Wix-style sites still expose few images statically — use the
  **URL-list** mode and supply the image URLs.
- **SVG sites:** WordPress blocks SVG upload by default, so inline-SVG graphics yield zero bitmap
  fetches. Their graphics live inline in the markup, which is expected.

## The admin got restyled after a conversion / custom CSS

**Symptom:** the WordPress dashboard picks up styling it shouldn't after a conversion.

**Cause:** global selectors in **Misc → Custom CSS** can be absorbed by the Asset Optimizer into a
combined bundle that **also loads in wp-admin**, so a bare `body{}` / `h1{}` rule restyles the
dashboard.

**Fix:** scope global rules to **`body:not(.wp-admin)`**. Page-scoped classes / ids are safe.

## My header/footer disappeared after activating a theme

**Symptom:** menus vanish from the header or footer after switching themes.

**Cause:** WordPress stores menu-location assignments as theme mods, so activating **any** new theme
clears them.

**Fix:** re-assign your menus (*Appearance → Menus*), or, after a Site Converter / Theme Builder theme,
re-run the **menu import**, which re-assigns them.
