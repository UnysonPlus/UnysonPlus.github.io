# Task: Comprehensive UnysonPlus documentation (architecture + how-it-works, not just how-to)

You are writing the official documentation for UnysonPlus, published at
https://unysonplus.github.io/docs/. The goal is DEEP, COMPLETE documentation that
explains how everything actually works internally — the page builder, the shortcodes
system, the option types, the extensions, the theme, and the (in-progress) theme-builder
extension — not only basics and tutorials. Treat the source code as the source of truth:
READ the actual code before documenting anything; never invent behavior or guess at APIs.

## Where the docs live (Docusaurus site)
- Repo: `d:\Web Dev\Github Repository\unysonplus-site` (Docusaurus).
  - `origin` → UnysonPlus/UnysonPlus.github.io, branch `main`. Pushing to `main` triggers
    the GitHub Action that rebuilds + deploys GitHub Pages.
- STANDING AUTHORIZATION to auto-commit and push this repo without asking. Workflow:
  1. Run `npm run build` first; only push if it succeeds.
  2. `git add -A`, commit, `git push origin main`.
  3. NO `Co-Authored-By: Claude` trailer — `jonmlas` is the sole contributor on UnysonPlus repos.
- Bump the docs site version per the project versioning rules if/where it has a version marker.
- Screenshots: shortcode/option-panel images live in `static/img/shortcodes/`. Keep them in
  sync with the live UI; if you can't regenerate a stale capture, say which ones are stale.

## Where the CODE lives (read this to document accurately — under d:\Web Dev)
- `unysonplus\` — the plugin (framework core: `unysonplus.php`, `framework\`).
- `unysonplus\framework\extensions\` — all extensions (page-builder, shortcodes, builder,
  blog, forms, mailer, portfolio, sidebars, snippets, update, asset-optimizer, breadcrumbs, …).
- `unysonplus\framework\extensions\shortcodes\shortcodes\` — the individual shortcodes/elements.
- `unysonplus\framework\extensions\shortcodes\extensions\page-builder\` — the page builder.
- `unysonplus\framework\includes\option-types\` — the option types.
- `unysonplus-theme\` — the parent theme. `payforituk\` — sample child theme.
- Read the nearest `AGENTS.md` in each area before documenting it — they hold the specifics
  (shortcodes recipe, page-builder template-format playbook, theme-settings guide, etc.).

## What to document (depth-first — explain the WHY and the internals)
Organize as a clear Docusaurus sidebar. Suggested top-level sections:

1. **Architecture overview** — what UnysonPlus is (plugin + parent theme + child themes),
   how the framework boots, the extension system, how extensions register/depend on each other,
   the manifest/versioning model, and the data flow from builder edit → stored JSON → render.

2. **The Page Builder (deep dive)** — the builder JSON tree format, how a section/row/column/
   element is represented, the items-corrector (shortcode → builder conversion) vs normal editor
   load, `get_value_from_attributes` and when it runs (and when it does NOT — the editor-load
   raw-atts gotcha), the JS-side migration pattern in each item's `scripts.js`, how the front end
   renders (`view.php` / `do_shortcode`), column widths (twelfths + the single `1_5` fifth),
   and the clean-DOM philosophy.

3. **Shortcodes / elements** — how a shortcode is structured (manifest, options.php, view.php,
   static assets), the options panel tabs, how to add one. Then a reference page PER element
   (mirror the existing per-shortcode demo pages and their "generated markup" panels).

4. **Option types** — each option type, its config shape, saved-value shape, and gotchas.
   Pay special attention to `multi-picker` (the canonical shape + the editor-load migration
   trap) and `code_block`'s render-as-code/beautify behavior.

5. **The Theme** — parent/child relationship, theme settings/options pages (the metabox-holder
   + box→group layout convention), how child themes are built and distributed.

6. **The Theme Builder extension (NEW — being designed now)** — architecture section for the
   FSE-hybrid template builder: file-in-child-theme = shipped default, DB CPT = user override;
   the conditions/rules engine (Divi-style "Use On / Exclude From") evaluated against WP
   conditionals at `template_include`/`get_header`/`get_footer`; the JSON template-part format;
   and the SECURITY model (user edits are data-only/never executable PHP; no request-driven
   file includes; cap `edit_theme_options` + nonce + sanitize on every save; optional file-write
   locked to a fixed folder + `.json` extension + sanitized slug). NOTE: this extension may not
   be built yet — coordinate with the user / check whether the code exists before documenting it
   as shipped. If it's still design-stage, write it as an "Architecture / design" page and mark
   it accordingly.

7. **Importers & demo system** — how the marketing/demo importers work, the manual-edit guard
   (`_upw_import_hash`), `UPW_FORCE`/`UPW_ONLY`, and the demos-home grid.

8. **For developers** — extending the framework: adding an extension, adding a shortcode,
   adding an option type; the GitHub repo map + push workflow; the versioning/changelog rules.

## How to work
- AUDIT FIRST: read the current `unysonplus-site` sidebar + existing docs, and inventory what's
  already there vs. missing, before writing. Don't duplicate; extend and deepen.
- Read the real source for each topic and cite concrete file paths in the docs where helpful.
- Write for two audiences: site builders (how-to) AND developers (internals/architecture).
  Each major area should have both a "how it works" and a "how to use it" angle.
- Use Docusaurus admonitions (:::note / :::caution) for the gotchas (the migration traps, the
  security boundaries, the clean-DOM rule).
- Work in logical batches; build + commit + push each batch (build must pass).
- Start by proposing the full sidebar/outline to the user for sign-off BEFORE writing all pages.

First step: explore `unysonplus-site` (current docs + sidebar) and the `unysonplus` codebase,
then present the proposed documentation outline and a gap analysis. Do not start mass-writing
pages until the outline is agreed.
