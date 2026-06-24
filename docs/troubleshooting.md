---
title: Troubleshooting & FAQ
sidebar_position: 12
---

# Troubleshooting & FAQ

Answers to the issues that come up most often, with the cause and the fix. Each links to the
deeper reference where relevant.

## Editor & Page Builder

### I see two editors stacked on the post screen

The Page Builder sits in a meta box **below** the content editor. With the Gutenberg block editor
active you see both at once. Unyson+ shows a dismissible notice recommending the **Classic Editor**
plugin, which restores WordPress's original editor and works much better alongside the builder.
Install and activate Classic Editor, or dismiss the notice if you prefer the stacked layout.

### An element's options panel opens blank with just "error:"

This happens on **pre-existing** elements (never on newly-added ones) after an option's stored value
*shape* changed in a plugin update, most often when an option was converted to a different type.

- **Cause:** the options modal opens with the element's **raw saved atts**, because
  `get_value_from_attributes()` (the PHP that would re-derive values) does **not** run on normal
  editor load. A legacy value reaching the new option type's renderer throws.
- **Fix (for users):** the element still renders correctly on the front end; re-saving the page once
  through a working modal usually clears it. If a specific element is stuck, report which one.
- **Fix (for developers):** ship a JS-side migrator in the element's `scripts.js` that runs before
  the modal opens. See [Migrating an option's value shape](/docs/page-builder/value-shape-migrations).

### My builder layout doesn't render on the front end

The page needs the **builder active**. When you switch a page to the Unyson Builder and save, a
`builder_active` flag is stored alongside the builder JSON, that flag is what tells the theme to
render builder output instead of the default content. If a page shows its plain content, open it,
confirm the **Unyson Builder** is the active editor, and re-save.

### Columns aren't wrapping the way I expect

Two things to know:

- The only fifth-width is **`1_5`** (20%). There is no `2_5` / `3_5` / `4_5`.
- By default (Bootstrap 5 mode) all of a section's columns stay in one row and **flex-wrap** handles
  wrapping. **Bootstrap 3 Legacy Mode** (Page Builder settings) instead auto-splits columns into
  separate rows once they exceed 12/12.

See [Column widths & the grid](/docs/page-builder/column-widths).

### A `{{token}}` shows literally on the page

[Dynamic Content](/docs/dynamic-content) leaves **unknown tags literal** (it never fatals or blanks).
Check the tag id is spelled correctly and exists in the catalog. Also note resolution is scoped to the
shortcode/builder render path and the post body, to resolve a token elsewhere in a theme template,
call `fw_dynamic_content()->resolve( $text, array( 'post_id' => $id ) )` directly.

## Options & settings

### "Undefined option type: page-builder"

An extension read settings **too early** (inside its `_init()`), which forces the option types to
initialize before the Page Builder extension has registered its `page-builder` option type.

- **Fix:** defer settings reads to the `init` hook or later, never during `_init()`. See
  [How the framework boots](/docs/architecture/framework-boot).

### "Framework requirements not met" / an extension won't activate

An extension declares **requirements** (a minimum PHP / WordPress / framework version, or another
extension). If a required extension isn't active or is too old, the dependent stays inactive and (in
admin) a notice explains which version is needed. Activate or update the required extension. See
[The extension system](/docs/architecture/extension-system#requirements-decide-the-order).

### Importing theme settings wiped unrelated settings (developers)

Don't write the whole settings map at once (`fw_set_db_settings_option( null, $map )`), that re-runs
every option's storage-save on its already-stored value and corrupts unrelated settings. Apply each
imported key **individually** (`fw_set_db_settings_option( $id, $value )`). The Site Converter's
theme-settings importer does exactly this.

## Importing & converting

### A re-import skipped my page ("manually edited — preserved")

That's the **manual-edit guard** working as intended. The importer fingerprints the builder JSON it
writes (`_upw_import_hash`); on a later run it **skips** any page whose current builder JSON differs
(you edited it) so your work is never clobbered.

- Re-import a single page: `UPW_ONLY=<slug>`.
- Force-overwrite: `UPW_FORCE=1`, but only after folding your manual edits back into the source JSON.

See [Importers & demo system](/docs/importers-and-demos).

### Site Converter imported no images

- **JS apps (React / Vite / Lovable):** the static HTML is a shell; the scanner mines the page's
  script bundles for asset URLs. Very heavy Wix-style sites still expose few images statically, use
  the **URL-list** mode and supply the image URLs.
- **SVG sites:** WordPress blocks SVG upload by default, so inline-SVG graphics yield zero bitmap
  fetches (their graphics live inline in the markup, which is expected).

### The admin got restyled after a conversion / custom CSS

Global selectors in **Misc → Custom CSS** can be absorbed by the Asset Optimizer into a combined
bundle that **also loads in wp-admin**, so a bare `body{}` / `h1{}` rule restyles the dashboard.
Scope global rules to **`body:not(.wp-admin)`**. Page-scoped classes/ids are safe.

### My header/footer disappeared after activating a theme

WordPress stores menu-location assignments as theme mods, so activating **any** new theme clears
them. Re-assign your menus (Appearance → Menus), or, after a Site Converter / Theme Builder theme,
re-run the **menu import**, which re-assigns them.

## Updates

### Updates aren't showing up

Updates are **version-driven**: an update appears only when the version in the GitHub repo is higher
than the installed one.

- Confirm the new version was pushed and its manifest `version` was bumped.
- **Never downgrade** a version, it breaks the updater's cached state.
- For your own extension/theme, confirm the `github_update` manifest key (and `github_branch`) point
  at the right repo. See [Updates & auto-updates](/docs/extensions/updates).

## Performance & assets

### Asset Optimizer lists no CSS/JS to combine

It detects assets by doing an internal homepage render, which a **full-page cache** (e.g. WP Engine)
can serve from cache, hiding the real asset list. Visit any page with
**`?fw_asset_optimizer_discover=1`** appended to force a fresh render, then return to the settings and
refresh. See [Asset Optimizer](/docs/extensions/asset-optimizer).

### A script broke after I combined it

JS combining is conservative by design (only safe local footer scripts are merged), but if you ticked
a third-party script that misbehaves, **uncheck it** so it loads on its own again. The combined bundle
is dependency-ordered; the **Defer** switch is safe, the **Minify** switch is experimental, leave it
off if you see issues.

## Still stuck?

- Read the **`AGENTS.md`** nearest the relevant code in the plugin, they're the most detailed,
  continuously-verified references.
- Check the [Hooks reference](/docs/hooks) for a filter that lets you adjust the behavior you're
  fighting.
- File an issue on the relevant [GitHub repo](https://github.com/UnysonPlus).
