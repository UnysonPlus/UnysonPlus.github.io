---
title: Add a dynamic copyright year to your footer
description: Show the current year automatically in your WordPress footer using Unyson+ Dynamic Content, no yearly edits.
---

# Add a dynamic copyright year to your footer

A footer copyright line that always shows the current year, with no January edits, using
[Dynamic Content](/docs/dynamic-content) tokens.

## Steps

1. Edit your footer copyright. Either:
   - **Theme Settings → Footer** (the copyright field), or
   - a **Text Block** inside a Theme Builder **Footer Preset**.
2. Type the line with tokens:
   ```text
   © {{copyright_year}} {{site_name}}. All rights reserved.
   ```
3. Save. It renders as `© 2026 Your Site. All rights reserved.` and rolls over on its own each year.

`{{copyright_year}}` resolves to the current year; `{{site_name}}` pulls your WordPress Site Title, so
the line also stays correct if you rename the site.

## See also

- [Dynamic Content](/docs/dynamic-content) — the full tag catalog (post, site, author, date, …)
- [Build a sticky site header](./sticky-header.md)
