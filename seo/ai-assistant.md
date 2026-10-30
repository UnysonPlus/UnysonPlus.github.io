---
sidebar_position: 11
title: "With the AI Assistant"
sidebar_label: "With the AI Assistant"
description: "What the Unyson+ AI Assistant, or an AI agent connected over MCP, can read and change in your SEO: pages, site-wide settings and redirects, each change undoable."
---
# With the AI Assistant

When the [AI Assistant (Beta)](/extensions/ai-assistant) extension is active, an AI can read and improve
your SEO: from the builder panel for the page you have open, from the site-wide assistant, or from an
AI agent connected to the site over MCP.

## Pages

- **`seo-get-page`**: what a page really outputs (title, description, canonical, robots, social tags)
  and where each value comes from: your override, a settings template, or auto-generated.
- **`seo-update-page`**: sets or clears a page's overrides.
- **`seo-audit`**: checks up to 100 published pages for missing, long, auto-generated or duplicate
  titles and descriptions, and pages hidden with noindex. (The full [Audit](./reports/audit.md) screen
  checks every page.)

## Site-wide settings

- **`seo-get-settings`**: the site-wide SEO settings as stored: title and description templates per
  content type, noindex per group, sitemap, social, structured data and local business, robots.txt,
  feeds and the rest. Pass `keys` to read only some.
- **`seo-update-settings`**: changes the settings it is given and nothing else. Unknown names are
  refused and listed in the answer.

**Credentials never go through an AI client.** The Search Console client ID and secret and the speed
API key are left out of what it can read, and refused if it tries to set them. Only administrators can
use these two.

## Redirects

- **`seo-list-redirects`**: [your redirects](./redirects.md#your-own-redirects), and the most requested
  addresses that came back [not found](./not-found.md): the evidence to make new ones from.
- **`seo-save-redirect`**: adds a redirect, or replaces the one for the same old address (301, 302,
  307 or 410 Gone; a regular expression if asked). A redirect that can't work is refused with the reason,
  exactly as on the screen.
- **`seo-delete-redirect`**: removes one.

## Every change can be undone

Each change an AI makes is recorded first, and **undo_change** puts it back as it was: a page's fields,
the settings it changed, or the whole list of redirects as it stood before that change. Undoing a
redirect change also undoes any redirect edits made by hand after it, since the list is restored as one.
The AI Assistant's list of changes shows each one with what it did.

Try:

- *"Audit the site's SEO and write proper descriptions for the pages that use auto-generated ones."*
- *"Look at the pages not found this month and redirect the ones that clearly moved."*
- *"Set the title separator to an en dash and keep date archives out of search results."*
