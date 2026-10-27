---
title: "Headless Extension — Roadmap"
sidebar_label: "Roadmap"
sidebar_position: 3
description: "The plan for a Unyson+ Headless extension: run WordPress as a headless CMS with Unyson+ post types, custom fields, settings and page-builder content served over the REST API, in place of ACF and a custom post types plugin."
---

# Headless — Roadmap

A planned extension that lets a WordPress site running Unyson+ act as a **headless CMS**: content is
edited in WordPress, and a separate front end (Next.js, Nuxt, Astro, a mobile app) reads it over the
REST API. Unyson+ already covers what ACF and a custom post types plugin would do in such a setup. This
extension adds the API layer to match.

<span className="badge badge--warning">Coming soon</span> items are intended;
<span className="badge badge--secondary">Exploring</span> items are under consideration and may not
happen. Shipped items move into the extension's main documentation.

:::note
No dates. Items ship when they are properly done, and the order below is a rough intent, not a queue.
:::

## What already exists

The extension builds on these; it does not replace them.

- **Post Types** registers its post types and taxonomies with `show_in_rest` on by default, so they
  already appear under `/wp/v2/`.
- **Custom Fields** can expose a field group in the REST API ("Show in REST API" on the group). The
  values appear under `unysonplus_fields` on each post. Today that output is **read-only**, gives
  **raw stored values** (an image is its attachment ID and a protocol-relative URL, with no sizes or
  alt text), and covers **posts only**.

## Phase 1 — Clean, read-only content API <span className="badge badge--warning">Coming soon</span>

- **Resolved field values.** Each option type gets a REST formatter, so the API returns something a
  front end can use directly: images and galleries as URL, width, height, alt and sizes; links to posts
  as ID, slug and URL; colours, typography and icons as plain values; repeaters and groups as nested
  arrays. The raw value stays available behind `?unysonplus_raw=1`.
- **One switch per field**, as well as per group, so a private field in a public group never leaks.
- **Terms and users.** Field groups attached to taxonomies and user profiles appear on
  `/wp/v2/<taxonomy>` and `/wp/v2/users`.
- **Settings endpoint** — `/unysonplus/v1/settings`: Theme Settings values the site owner marks as
  public (logo, colours, fonts, social links, contact details), like an options page.
- **Menus endpoint** — `/unysonplus/v1/menus/<location>`: a nested menu tree, including mega-menu
  columns.
- **Schema.** Each REST field publishes a JSON schema, so clients can generate types (for example
  TypeScript) from `/wp-json`.
- **Admin screen** under Unyson+ → Headless: which post types, groups, fields and settings are
  exposed, with a live preview of the JSON for a chosen post.

## Phase 2 — Page Builder content <span className="badge badge--warning">Coming soon</span>

Builder pages are stored as a tree of shortcodes and normally render to HTML on the server. The API
offers both forms, and the front end picks one:

- **Rendered** — `content.rendered` plus the CSS that page needs (generated preset and page CSS,
  shortcode styles) as `unysonplus_assets`. This is the simplest option: any front end can show a
  builder page exactly as WordPress would.
- **Structured** — `/unysonplus/v1/layout/<id>`: the builder tree as JSON (sections → columns →
  elements, each with its type and resolved options). The front end maps each element type to its own
  component. This is the truly headless option, and the more work for the front end.

## Phase 3 — Front-end integration <span className="badge badge--warning">Coming soon</span>

- **Front-end URL and preview.** Set the front-end address once; "Preview" and "View" in the admin open
  the front end, with a short-lived token so drafts can be previewed there.
- **Rebuild webhooks.** On publish or update, call a deploy hook (a static-site build) or a
  revalidate URL, with the changed post's type and slug.
- **CORS.** A list of allowed front-end origins.
- **Redirect the WordPress front end** (optional), so visitors who reach the WordPress address are
  sent to the real site.

## Phase 4 — Writes and starter kit <span className="badge badge--secondary">Exploring</span>

- **Write support.** Update callbacks that check each value against its option type, for front ends
  that submit content (application passwords or another token for auth).
- **Forms over REST.** Submit Unyson+ forms from the front end, with the same validation and mailer.
- **A starter front end** with components for the common builder elements, and the typed client.
- **A GraphQL bridge** (WPGraphQL) for sites that prefer GraphQL.

## Not in scope

- **Animation Engine effects and other front-end scripts** do not travel through the API; a headless
  front end rebuilds them itself.
- **Theme Builder headers and footers** are only available as rendered HTML or as a structured
  layout, like any other builder content.
