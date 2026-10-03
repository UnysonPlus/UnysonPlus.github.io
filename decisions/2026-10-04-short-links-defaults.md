---
slug: short-links-defaults
title: "Why Short Links stores links in its own tables, defaults to 307, and counts uniques without trusting cookies"
authors: [jon]
tags: [extensions, architecture, storage-model, security, admin-ui]
date: 2026-10-04
description: "Before building the Short Links extension, an established link-shortener plugin was audited as a feature spec. Its link product was solid; several of its defaults were not. The decisions: custom tables with a UNIQUE slug, a hashed slug index so ordinary page views cost no query, 307 as the default redirect, forwarded-IP headers trusted only from configured proxies, anonymised IPs and hashed uniques by default, a server-rendered admin for v1, and a generic label for the planned migration importer."
---

**The question:** we are adding a link shortener to Unyson+. What should its storage, defaults and admin look like, and what should it deliberately do differently from the plugins people would be switching from?

<!-- truncate -->

## Context

An established GPL link-shortener plugin was audited, read-only, as a feature spec. About half of it is the link product: a links table, a clicks table, a redirect hooked very early on `init`, bot filtering, a REST API and a React admin. The rest is licensing, upsell screens and a vendored framework. Its core ideas are good: write the click after the response is flushed, increment counters atomically, batch deletes, and keep remote lookups off the hot path. Its defaults have twelve weaknesses that matter, including:

- the slug index is not unique, and editing a link never re-checks collisions;
- visitor IPs come from `X-Forwarded-For` without asking who sent it;
- every front-end page view runs a slug query;
- visitor IPs are sent to a third-party geo service;
- HEAD requests and 308 are unsupported;
- the forwarded query string loses its percent-encoding;
- a browser that refuses cookies counts as a new unique visitor on every click.

## Options considered

**Storage: custom post type vs. custom tables.** A post type gets the REST, revision and admin machinery for free. But the redirect needs one indexed lookup by slug on every request it handles, and a clicks table grows without bound. Neither fits `wp_posts` / `wp_postmeta`.

**Avoiding a query per page view: object cache only, vs. an index WordPress already loads.** The object cache is only persistent on hosts that run one. An autoloaded option holding an 8-character hash per live slug is already in memory on every request. It costs 9 bytes per link, so it is capped at 5,000 links, above which the code falls back to one indexed, cached query.

**Default redirect: 302 vs. 307 vs. 301.** 301 is cached by browsers, so later edits are lost. 302 is the common default. 307 is also temporary, and it keeps the request method.

**Unique visitors: cookie only, vs. cookie plus a fallback.** Cookie-only uniques inflate for anyone who blocks cookies. A per-day salted hash of IP and user agent is stable enough for a day and cannot be reversed to an address.

**Admin: React app vs. server-rendered WP_List_Table.** React needs a build step, and the other Unyson+ extensions don't use one. The list, form and settings are standard WordPress screens.

**Migration importer label: name the source plugin vs. a generic label.** Naming the plugin helps people find the feature. The brand rule forbids tool names in option labels.

## Decision

- **Storage:** custom tables (`fw_short_links`, `fw_short_link_meta`, `fw_short_link_clicks`). The slug is **UNIQUE**, and case-insensitive through the collation. A trashed link keeps its slug.
- **Index:** a hashed slug index in an autoloaded option, plus an object-cache lookup with a negative entry. An ordinary page view costs no query.
- **Default redirect:** **307**. Every redirect sends `Cache-Control: no-store`, permanent ones included, so edits take effect and clicks are counted.
- **Visitor IP:** `REMOTE_ADDR` only, unless that address is listed as a **trusted proxy**.
- **Privacy defaults:** IPs anonymised by default; no raw user agent stored; country only from CDN headers.
- **Uniques:** a cookie with a salted-hash fallback, and in full mode the click history is checked as well.
- **Admin:** server-rendered admin with a WP_List_Table for v1. React may come later for reports only.
- **Importer label:** the planned migration importer gets a generic label ("Import from another link plugin") and detects the source tables itself.

## Why

Each default above fixes a specific, measured failure in the plugin people would be switching from, and none costs the user a feature. The unique index and the slug index are cheap to build at the start but would need a data migration to add later. The privacy defaults also need no data migration to change, but the data already collected under weaker defaults could not be cleaned up afterwards. A generic importer label keeps the product within the naming rule; the per-tool conversion guides are where tool names belong.
