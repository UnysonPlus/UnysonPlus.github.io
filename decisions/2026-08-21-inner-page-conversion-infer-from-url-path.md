---
slug: inner-page-conversion-infer-from-url-path
title: "Converting an inner page — does the user hand-uncheck options, or should the converter infer it from the URL?"
authors: [jon]
tags: [conversion, extensions, page-builder]
date: 2026-08-21
description: "The Site Converter hard-coded every single-URL conversion as the site's FRONT page — so converting an inner page like /services hijacked the homepage pointer and re-derived the whole child theme + chrome. The fix isn't a new 'create new page' checkbox: the converter already knows the source URL, so it should INFER page type from the path (root → homepage; any inner path → a new content-only page under its own slug), flip the chrome/child-theme defaults to match, and expose a single 'Set as homepage' toggle as the explicit override."
---

**The question:** A single-URL conversion of an inner page (e.g. `https://site/services`) — should the user
have to manually uncheck *Create child theme*, *Capture header*, *Capture footer* to get "just the sections
content"? Will it create a new page or override the homepage? And if it can override the homepage, don't we
need a "Create new page" checkbox?

<!-- truncate -->

## Context

The single-URL build hard-coded the target as the front page:

```php
$screens[] = array( 'html' => …, 'title' => <page <title>>, 'slug' => '', 'front' => true );
```

The importer is idempotent by slug (update-if-exists, else create), and `front => true` writes
`show_on_front` / `page_on_front`. So converting `/services`:

- created a **new** page (slug derived from the messy `<title>`, e.g. `services-noir`) — it did NOT overwrite
  the Home page's *content*;
- **but set that new page as the site's front page** — so visiting the site now showed Services. That's the
  real bug: the homepage *pointer* was hijacked;
- and re-captured header/footer + rebuilt the child theme — redundant, and destructive when *adding* a page to
  an already-converted site (it re-derives chrome over the tuned one).

The converter already receives the source URL (`source_url` in the build opts), so it has everything it needs
to tell an inner page from the homepage — it just wasn't using it.

## Options considered

- **Make the user uncheck the boxes.** Rely on the human to turn off *Create child theme* / *Capture header*
  / *Capture footer* for an inner page. *Trade-off:* easy to forget (the front-page hijack still happens even
  if they do, because `front` is hard-coded), and it pushes converter knowledge onto the user for something the
  URL already tells us.
- **Add a "Create new page" checkbox.** *Trade-off:* the importer already creates a new page per slug — the
  thing actually missing is control over the *front-page* assignment, not page creation. A "create new page"
  toggle would be redundant and wouldn't fix the hijack.
- **Infer from the URL path + one "Set as homepage" toggle (chosen).** Derive `slug` + `front` from the
  source path; flip the chrome/child-theme defaults for inner pages; expose a single explicit override.

## Decision

**Infer the target from the source URL path, and expose a "Set as homepage" toggle:**

- **Root path** (`/`, `/index.*`, `/home`) → the homepage: blank slug → `home`, set as the front page (today's
  behavior).
- **Any inner path** (`/services`) → a **new page** under the clean path-segment slug (`services`), `front:false`
  — the homepage is left untouched.
- The Convert panel's **"Set as homepage"** checkbox always wins when the user sets it (threaded as the
  `set_as_homepage` build opt); it's **auto-ON for a root URL and auto-OFF for an inner URL**.
- Typing an inner URL also **auto-unchecks** *Create child theme* / *Capture header* / *Capture footer* (with a
  hint) so an inner page imports as content-only into the existing site — any box the user has touched is left
  as they set it.

## Why

The URL path is an unambiguous, already-available signal for "is this the homepage or an inner page," so making
the human re-encode it by hand (and remember to do so) is the wrong layer — especially since the real hazard
(the front-page hijack) came from a hard-coded `front => true` the checkboxes couldn't even fix. A "create new
page" checkbox misdiagnoses the gap: creation was never the problem, *front-page assignment* was. Inferring the
defaults from the path and surfacing exactly one override ("Set as homepage") makes the common cases correct
with zero clicks — convert the homepage → it's the homepage; convert `/services` → it's a new page, your site
untouched — while keeping the user in full control for the exceptions.
