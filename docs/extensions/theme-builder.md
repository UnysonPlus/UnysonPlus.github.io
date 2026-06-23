---
title: Theme Builder
sidebar_position: 2
---

# Theme Builder

**Theme Builder** is the UnysonPlus answer to Divi's Theme Builder: design global **Headers**,
**Footers**, and full-page **Body** layouts with the visual page builder, bundle them into a
**Template**, and assign each Template to parts of your site with conditional rules ("Use On /
Exclude From"). The right header, body, and footer are chosen per request.

<img src="/img/theme-builder-grid.png" alt="The Theme Builder admin grid — Templates with Header / Body / Footer / Used On columns" width="1260" />

:::note A download-only extension
Theme Builder ships from its own GitHub repo (`UnysonPlus/UnysonPlus-Theme-Builder-Extension`) and
is **not bundled** in the plugin package. Install it from **Unyson+ → Extensions** (it shows a
**Download** card), then it appears as its own **Theme Builder** admin menu.
:::

## The building blocks

Theme Builder owns four content types. The first three are authored with the page builder; the
fourth is pure assignment data.

| Type | What it is |
| --- | --- |
| **Header Preset** | A header layout, built with the page builder (use the Header/Footer elements: menu, logo, search, social, menu toggle). |
| **Footer Preset** | A footer layout, built the same way. |
| **Body Template** | A full-page body layout that **replaces the content area** for the requests it's assigned to (a custom 404, an archive layout, a landing-page body, …). |
| **Template** | Binds a Header + Body + Footer (each optional) to a block of **conditional rules**. It holds no layout of its own. This is the "card" in the grid. |

A Template's slots are independent: leave **Header** or **Footer** as *Inherit* to fall through to
your existing header/footer, and leave **Body** as *None* to render the normal page content.

## Header types & behaviors

A Header Preset carries two structural settings (the theme supplies the CSS/JS for each; your builder
content fills it):

- **Header Type** — Standard Top (horizontal), Sidebar (vertical), Off-Canvas / Slide-Out, Fullscreen
  Overlay, or Mega Menu.
- **Scroll Behavior** — Static, Sticky, Sticky + Shrink, Hide on scroll down, or Transparent over hero.

## Conditional assignment

Each Template carries a **conditions** block with two lists:

- **Use On** — the Template applies if **any** rule matches (rules are OR-ed).
- **Exclude From** — the Template is suppressed if any rule matches (exclusions win over Use On).

Rules are **pure typed data** (no code), drawn from the same vocabulary as the Sidebars extension:
specific pages/posts, whole post types, taxonomy terms, post-type archives, and conditional tags
(`is_front_page`, `is_404`, `is_search`, `is_author`, `is_archive`, …).

### How the winner is chosen

On each request the resolver collects every published Template, keeps those whose **Use On** matches,
drops those whose **Exclude From** matches, and ranks the survivors by **specificity**:

```
specific post / term ID  >  taxonomy term  >  post-type archive  >  conditional tag  >  default
```

Ties break by the newest rule. The winning Template supplies the header / body / footer for that
request.

### The fallback chain

For the header and footer, assignment cascades from most to least specific. When nothing higher
matches, your **Theme Settings** header/footer is the baseline, so a site always has a working header
and footer even if no Template matches (or the extension is disabled):

```
1. Theme Builder Template matched by condition   (builder header/footer)
2. Per-page override (the page's Header & Footer box)
3. Site-wide default (Theme Settings → General → Pages)
4. Theme Settings slot-based header/footer        ← final fallback (always present)
```

## Build and assign a template

1. **Theme Builder → Header/Footer Presets / Body Templates → Add New**, build the part with the page
   builder, and **Publish**.
2. **Theme Builder → Add Template**, pick a Header / Body / Footer for its slots.
3. Set its **Used On** (and any Exclude From) rules, then save.

You can also assign a header/footer **per page** (the Header & Footer box on the edit screen) or
**site-wide** (Theme Settings → General → Pages), which slot into the cascade above.

:::tip Dynamic content in body templates
Body templates are normal builder content, so [Dynamic Content](/docs/dynamic-content) tokens work
inside them: a `{{post_title}}` or `{{post_meta|key=…}}` in a body template resolves against whatever
post the request is showing.
:::

## Distribution (file / DB hybrid)

Theme Builder borrows the FSE pattern for shipping templates in a child theme: a child theme can ship
templates as `up-templates/*.json` files. On activation they're seeded into the editable content types
**only if absent and not user-modified** (the same `_upw_import_hash` manual-edit guard the
[importers](/docs/importers-and-demos) use), so the file is the pristine default and the database is
the user's override. This is DB-first, so it also works on read-only hosts.

## Security model

Because a global header/footer/body renders on many pages, the extension holds a strict boundary:

1. **User edits are data only, never executable.** Parts and Templates are stored in the database
   (CPTs). Nothing a user edits is written to a `.php` file or an `include()` path; the shipped `.json`
   seeds are read-only data.
2. **Caps + nonce + sanitize on every write.** Editing is gated on `edit_theme_options`; saves are
   nonce-checked and the builder JSON goes through the page builder's own sanitization; condition keys
   are whitelisted and ids cast to integers.
3. **The resolver never includes request-derived paths.** It maps a matched Template to a registered
   part ID, never a path built from request data (no local-file-inclusion).
4. **Conditions evaluate via whitelisted WordPress conditionals only** (`is_page`, `in_category`,
   `is_post_type_archive`, `is_404`, …) — **no `eval`**, no dynamic callables from stored strings.
