---
slug: crm-company-logos-from-own-site
title: "Where should the CRM get company logos from?"
authors: [jon]
tags: [extensions, privacy, admin-ui]
date: 2026-11-12
description: Company logos in the CRM could come from a free logo service or from each company's own website. Decision — fetch the icon from the company's own website on the server, keep a copy, and let people upload one; never send the company list to a third-party service.
---

**The question:** Can the CRM show company logos instead of initials? It would look much neater.

<!-- truncate -->

## Context

Every company in the CRM already has its domain, and every company badge is drawn by one function, so a logo can
replace the initials everywhere at once. The open part was where the pictures come from. The CRM is installed on
other people's sites, and its company list is private business data: the leads someone is chasing, their clients,
their suppliers.

## Options considered

- **A free logo or favicon service** (a URL per domain, loaded by the browser). Quickest to build, and nothing to
  store. But every time someone opens the Companies list, the browser asks that service for every company on the
  page, so the service learns the whole company list of every site using the CRM. It also depends on the service
  staying free and online.
- **The company's own website, fetched on the server.** Read the site's homepage once, take the icon it declares
  for phones and tabs (apple-touch-icon, else its largest favicon), check it is a real picture of a usable size,
  and keep a copy in the site's uploads. Nobody else learns anything, and the list loads from local files. Costs a
  background queue (so a 200-lead import stays fast) and some sites give nothing usable (a 403 for bots, a tiny
  favicon).
- **Uploads only.** Private and simple, but nobody uploads 200 logos, so most companies would keep their initials.

## Decision

Fetch from the company's own website, on the server, in the background (a few companies per WP-Cron run), and
keep a copy in `uploads/unysonplus/crm-logos/`. Let people upload a logo or remove one on the company page. A
company with no usable icon keeps its initials. Never use a third-party logo service.

## Why

The logo is a nicety; the company list is the CRM's most sensitive content. A design that leaks the list to make
the nicety cheaper gets the priorities backwards, for every site that installs the extension, not just ours. The
own-website fetch gives nearly the same coverage (5 of 6 real local-business sites in the first test), the
background queue keeps imports fast, and uploads cover the rest.
