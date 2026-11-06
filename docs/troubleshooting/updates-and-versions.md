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

## "Cannot backup the extensions" during an update

Updating the plugin can print a warning like:

> **Warning**: Cannot backup the extensions in …/class--fw-extensions-manager.php on line 615

**This is a warning, not a failed update.** If the line after it says *Plugin updated successfully*,
the update completed.

Here is what that step does and why it exists. Extensions installed from **UnysonPlus → Extensions**
live *inside* the plugin folder, and a plugin update replaces that whole folder. So before updating,
the plugin copies your extensions to `wp-content/tmp/fw-plugin-update-extensions-backup`, and
afterwards puts back any the new package does not ship. The warning means that copy did not finish.

**Whether you need to do anything depends on what you installed:**

- **Updating to a full package** (one that already contains every extension you use — for example a
  complete plugin zip): nothing is lost, because nothing needed restoring. You can ignore it.
- **Updating to the standard release package** (core plus `blog` and `update`): any extension you had
  added from the Extensions manager may be gone. Open **UnysonPlus → Extensions** and reinstall
  anything missing. Your extension *settings* are kept in the database, so they come back with it.

The warning now names each extension it could not copy and the reason, and a problem with one no
longer costs you the backup of the others. If you see it repeatedly, the cause is almost always the
host: `wp-content/tmp` not being writable, or the copy running out of time or memory on a large
install. Checking that folder's permissions is the first thing to try.

## How the bundle version relates to extensions

The whole plugin (core plus every bundled extension) ships as **one** release, and delivery is triggered
by the **core** version. A change to an extension only reaches sites once the core version is bumped and
a matching release is cut, so if an extension fix isn't live yet, check that a new core release went out.
