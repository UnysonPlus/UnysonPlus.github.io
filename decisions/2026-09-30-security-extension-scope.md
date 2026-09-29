---
slug: security-extension-scope
title: "Why the Security extension ships few measures, none of them on by default, and why the custom login URL lives there"
authors: [jon]
tags: [security, extensions]
date: 2026-09-30
description: "The Security extension ships only measures that stop a named attack or tell the owner the truth about configuration outside the plugin. Every behaviour-changing measure starts off, each has a recovery path that does not need the admin, and the custom login URL is labelled as what it is: obscurity."
---

**The question:** What should a WordPress security extension for UnysonPlus actually contain — separating what protects from what only implies protection — and where does a custom admin / login URL belong?

<!-- truncate -->

## Context

Security plugins tend to be judged by the length of their feature list, and many of the items on
those lists stop nothing: hiding the WordPress version, renaming the database table prefix, removing
`readme.html`. Several popular "hardening" steps only work in `wp-config.php` or at the web server,
so a plugin that claims to do them either does nothing or edits files the site boots from. And the
worst outcome a security feature can produce is the owner locked out of their own site.

A custom login URL had been planned for the Admin Skin. The Admin Skin is active by default and its
premise is that it changes presentation and nothing else.

Checked before deciding: WordPress core (7.1) already handles password hashing, application
passwords, background updates, the XML-RPC multicall brute-force amplification, and frame/referrer
headers on the login and admin screens. It has no login attempt limit and no two-factor
authentication. Across the plugin's extensions, nothing touched login, front-end headers or user
listing, apart from a Theme Settings XML-RPC switch that only disables authenticated methods.

## Options considered

- **A broad feature list** matching common security plugins. Looks complete; ships measures that are
  obscurity, and several that can break sites or lock owners out.
- **Detect-only.** Safe, but leaves the two real gaps in core — unlimited password guesses and no
  second factor — unfilled.
- **A short list of honest measures plus a report surface.** Each measure names the attack it stops
  and, in its own description, what it does not stop.

For the login URL: put it in the Admin Skin (where it was planned), or in a separate, off-by-default
Security extension.

## Decision

- **Ships in v1:** security checks added to core's Site Health screen (read-only); login throttling
  with generic login errors; two-factor authentication (TOTP + recovery codes, per-user opt-in); an
  XML-RPC control (leave / pingbacks off / block); front-end security headers; limits on anonymous
  user listing; an emergency "log everyone out" action; and a custom login URL, last in priority.
- **Off by default.** The extension itself is not seeded active. Once activated, only the read-only
  checks run; every behaviour-changing measure is its own switch.
- **Deliberately never:** a PHP request firewall, a malware scanner, version hiding presented as
  security, table-prefix changes, writing to `wp-config.php` or `.htaccess`, blocking the REST API
  for anonymous visitors, an auto-generated enforcing Content-Security-Policy, and permanent or
  per-username lockouts.
- **Every lock has a way back that does not need the admin:** one `wp-config.php` safe-mode constant
  that turns all behaviour-changing measures off, WP-CLI commands, and — because nothing is persisted
  outside the extension's own settings (no rewrite rules, no files) — deactivation returns WordPress
  to stock immediately.
- **The custom login URL lives in the Security extension**, not the Admin Skin. Its description says
  plainly that it reduces automated login noise and is not protection.

## Why

A feature that implies safety it does not provide is worse than no feature: owners skip the measures
that matter because they believe they are covered. So each measure had to name a concrete attack,
and anything core already does well became a documentation line instead of code. Throttling and
two-factor were kept because they fill the only gaps in core that directly stop an attack. The
measures that belong at the server are detected and reported, with the exact line to add, rather
than half-enforced from PHP.

Off by default follows from the same reasoning: a measure that changes how people sign in should be
a choice the owner makes knowingly, with its recovery path in view. The login URL is the clearest
case — putting a URL rewriter behind the Admin Skin's default-on, cosmetic switch would have shipped
lockout risk to every new site for a measure that is obscurity.
