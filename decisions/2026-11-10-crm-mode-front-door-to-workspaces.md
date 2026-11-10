---
slug: crm-mode-front-door-to-workspaces
title: "CRM mode: why it is a switch in the CRM over the existing workspaces, and why it hides instead of locking"
authors: [jon]
tags: [admin, admin-ui, extensions, architecture, security, seo]
date: 2026-11-10
description: A site used only as a CRM should open to the CRM and have no public website. Decision — a CRM mode switch in CRM settings that drives core Workspaces (no second mechanism), per-person switch back to WordPress with an updates count, menus hidden rather than screens locked, and a separate No public website option that redirects the front end to login while email links, forms and the REST API keep working.
---

**The question:** A desk site on its own subdomain is just a CRM, with no website. Should the CRM extension get a "CRM mode" option that hides the other WordPress menu items, or makes the CRM the default screen, with a link in the top right to switch back to the WordPress dashboard?

<!-- truncate -->

## Context

Core already had **Workspaces** (Unyson+ → Admin Menu → Roles): per role, what a person opens to after login, a menu trimmed to that app, a "Switch to WordPress" link for administrators, and a one-click "Run the site as a CRM" set-up. It worked, but it sat in a menu editor that someone setting up a CRM would never look in. It also had nothing for a site with no public front end: visitors still saw whatever theme was active, and the SEO extension warned in red that search engines were blocked, which on a CRM-only site is exactly what you want.

## Options considered

1. **A new CRM mode inside the CRM extension**, with its own menu hiding and redirects. Easy to find, but a second copy of what Workspaces does, and the two would drift (Membership's "members' site" mode is the same mechanism pointed at another app).
2. **Leave it in Workspaces and document it better.** No new code, but people still would not find it, and the no-website part would be missing.
3. **A CRM mode switch in CRM Settings that drives Workspaces**, plus the missing pieces added to Workspaces itself so every app benefits.

For the menu itself, two ways to "hide":

- **Lock the screens**: take capabilities away or block admin URLs. Strict, but it breaks plugins that send people to their own pages (a security plugin's alerts, an update screen) and can lock the owner out.
- **Hide the menu items**: the screens still open by URL for anyone whose role allows them; what a person may do stays with their role.

## Decision

Option 3. **CRM → Settings → CRM mode** has two choices, both ticked by default: **Administrators open to the CRM too** and **No public website**. Turning it on applies the CRM's workspace to its own roles (CRM Manager, Sales Rep) and, if ticked, to Administrators. Turning it off unmaps every role from the CRM and makes the website public again. CRM data is never touched.

Menus are **hidden, not locked**. Real limits come from roles, which is why the CRM ships its own roles with only the capabilities they need.

The switch back is **per person**. "Switch to WordPress" in the top bar changes only that administrator's view. While they are in the CRM, the switch shows a **count of waiting updates**, because the usual updates item is hidden there.

**No public website** lives in Workspaces, not in the CRM, so any app-only site can use it:

- what it does: front-end page views go to the login screen, and signed-in people go to their app;
- what search engines get: `noindex, nofollow` and a `robots.txt` that disallows the whole site;
- the SEO extension no longer shows its "search engines may not be able to find this site" warning.

## Why

- **One mechanism.** CRM mode and the members' site set-up are the same idea, so a fix to Workspaces reaches both, and the CRM switch stays a few lines.
- **Found where people look.** Someone setting up a CRM looks in the CRM's settings, not in a menu editor.
- **Hiding keeps the site working.** Locking screens would break other plugins and could strand the owner, and it would give a false sense of security: the CRM roles are what actually limit access.
- **Private is not broken.** The redirect runs late, on `template_redirect`, so everything a CRM needs from the outside stays open:
  - the confirm and unsubscribe links in emails (unsubscribe must work by law and by Gmail's bulk-sender rules);
  - email open and click tracking;
  - forms, the REST API (AI assistants and integrations connect through it) and cron.
- **Updates stay visible.** Hiding the updates item without the count on the switch would let a CRM-only site fall behind on security updates unnoticed.

**Status:** Accepted.
