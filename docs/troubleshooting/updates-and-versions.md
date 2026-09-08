---
title: Updates & versions
sidebar_position: 6
slug: /troubleshooting/updates-and-versions
description: Fixes for Unyson+ updates — why an update isn't showing up, the version rules, and pointing an extension at the right repo.
---

# Updates & versions

:::tip[💡 Web dev tip: staying updated is a security practice, not a chore]
Outdated software — a plugin, a theme, a JS library — is one of the most common ways a website gets
compromised, because known vulnerabilities in old versions are public and easy to scan for.
Treating updates as routine maintenance rather than something to defer indefinitely is one of the
cheapest ways to keep a site safe. [OWASP: Vulnerable and Outdated Components](https://owasp.org/Top10/A06_2021-Vulnerable_and_Outdated_Components/)
:::

## Updates aren't showing up

**Symptom:** a new release exists but WordPress doesn't offer the update.

**Cause:** updates are **version-driven** — one appears only when the version in the GitHub repo is
higher than the installed one.

**Fix:**

- Confirm the new version was pushed **and** its manifest `version` was bumped.
- **Never downgrade** a version — it breaks the updater's cached state.
- For your own extension or theme, confirm the `github_update` manifest key (and `github_branch`) point
  at the right repo.

See [Updates & auto-updates](/extensions/updates).

## How the bundle version relates to extensions

The whole plugin (core plus every bundled extension) ships as **one** release, and delivery is triggered
by the **core** version. A change to an extension only reaches sites once the core version is bumped and
a matching release is cut, so if an extension fix isn't live yet, check that a new core release went out.
