---
slug: short-links-api-keys-and-webhooks
title: "Why Short Links' API keys only open one door, and webhooks never fire inline"
authors: [jon]
tags: [extensions, architecture, security]
date: 2026-10-04
description: "Short Links needed an API that other apps could use to read, change and measure links. WordPress already has Application Passwords, so the question was whether to add keys of our own. The decision: scoped keys that act as their creator but authenticate only on the Short Links namespace, hashed at rest and rate limited; webhooks that are queued, signed and retried rather than sent during the change that caused them; and click events delivered in batches."
---

**The question:** WordPress already ships Application Passwords. Why give Short Links its own API keys, and how should it tell other apps that something changed?

<!-- truncate -->

## Context

The goal was another app that grabs a site's links, changes them and reads their numbers: a newsletter tool creating campaign links, a dashboard pulling stats.

An Application Password authenticates as the whole user account. Given to a third-party tool, an administrator's password can edit posts, users, plugins and settings across the entire REST API, which is far more than a link tool needs.

Webhooks had a different problem. The obvious implementation posts to the receiver inside the request that made the change. If the receiver is slow, saving a link in the admin waits for it. If it is down, the event is lost. A busy link turns every click into an outbound request.

## Options considered

**Application Passwords only.** Nothing to build, but each integration holds a full-account credential, and there is no way to give an app read-only access to links.

**Keys tied to a dedicated "API" user.** Scoping would come from that user's role. It adds a fake account to manage, and a link created through the API would have no real owner.

**Scoped keys that act as their creator, limited to one namespace.** The key inherits its creator's rights (so an author's key still sees only that author's links), narrowed further by scopes. It authenticates only requests to `fw-short-links/v1`; anywhere else the key is ignored and the request is anonymous.

**Webhooks: inline, a per-event cron, or a queue table.** A cron event per webhook stores its payload in the `cron` option, which every request loads. A queue table stays out of the way until the worker runs.

## Decision

- **API keys:**
  - Scopes: `read`, `write`, `stats`. A key acts as the administrator who made it.
  - A key works on the Short Links namespace only.
  - Stored as an HMAC with the site's auth salt plus a short lookup prefix; shown once.
  - Rate limited per key; revocable in one click.
  - Application Passwords still work for anyone who wants full-account access.
- **Webhooks:**
  - Changes go into a queue table. A cron worker posts them with `wp_safe_remote_post`, retrying with backoff for about 15 hours, and a webhook that keeps failing switches itself off.
  - Every body is signed: HMAC-SHA256 over `timestamp.body`, with the timestamp in the header so the receiver can reject replays.
  - Clicks are sent in batches every five minutes, never one request per click.
  - An import sends one summary event, not one event per link.

## Why

A credential should open only the doors its job needs. A link tool that leaks its key should cost you your links, not your site.

Webhooks must never make the change itself slower or less reliable. Saving a link, or following one, cannot wait on someone else's server.

Building the key on `determine_current_user` turned up one non-obvious constraint. The filter has to run **after** core's cookie and application-password checks (priority 30). `wp_validate_auth_cookie()` treats any value it is handed as a cookie string, so a key filter that runs earlier has its user id silently thrown away.
