---
slug: removing-a-post-type-is-recoverable
title: "Removing a post type row hides content rather than deleting it — so we made removal recoverable instead of forbidding it"
authors: [jon]
tags: [architecture, back-compat]
date: 2026-07-29
description: "Deleting a row in the Post Types screen unregisters the type: the posts stay in wp_posts but become unreachable. We could have blocked deletion, hard-deleted the content, or left it silent. We added an Enabled toggle as the intended off switch, plus a removal record with a Restore — the destructive-looking action is now the recoverable one."
---

**The question:** removing a post type row from the Post Types screen doesn't delete anything, but it
makes every item of that type invisible — no admin menu, no edit screen, URLs stop resolving. A user
who "cleans up" a row loses access to their content with no warning and no obvious way back. What
should the screen do about it?

<!-- truncate -->

## Context

A saved definition is just a row that gets fed to `register_post_type()` on `init`. Stop registering
it and WordPress no longer knows the type exists — but `wp_posts` still holds every row, with its
`post_type` column intact. The data is perfectly safe and completely unreachable at the same time.

That gap between "safe" and "reachable" is invisible from the UI. The screen previously offered a
delete control with no confirmation, no indication of how much content sat behind the row, and no
way to undo. The only way to switch a post type off was to delete its row, which pushed every user
who wanted the harmless outcome straight into the alarming one.

## Options considered

- **Block deletion when content exists.** Safe, but wrong: people legitimately delete a type they
  created by mistake, and refusing turns a reversible situation into a support ticket. It also
  can't be right in general — the extension doesn't own the content and shouldn't hold it hostage.
- **Delete the content along with the row.** Honest about consequences, and by far the most
  dangerous option. A row deletion is a schema edit; silently making it a bulk content deletion is
  exactly the behaviour nobody expects and nobody can undo.
- **Warn and proceed.** Better than silence, but a warning at the moment of deletion is read by
  nobody, and it still leaves the user with no route back afterwards.
- **Make the safe path the obvious one, and the risky path reversible (chosen).** Add an **Enabled**
  checkbox to every row as the intended off switch, and when a row *is* removed, record it — with a
  live count of the content it held — in a "Recently removed" panel offering **Restore**.

## Decision

Three parts, in the order a user meets them:

1. An **Enabled** toggle on each row, documented as the way to switch a type off. The definition and
   its content stay untouched; flipping it back on is instant.
2. A confirmation in front of the delete control, spelling out that the content is not deleted but
   becomes invisible, and pointing at the Enabled toggle instead.
3. The removal itself is recorded in an option (`fw_ext_post_types_removed`) with the definition, a
   content count and a timestamp, surfaced with **Restore** / **Dismiss**. The last twenty are kept.

Alongside these, an overview table shows every definition's status and live content count, so "how
much is behind this row?" is answerable before touching anything rather than after.

## Why

- **The dangerous-looking action should be the recoverable one.** Restoring a definition re-registers
  the type and the content reappears exactly as it was, because nothing was ever destroyed. Given
  that, refusing the deletion buys safety we already have while costing legitimate use.
- **A toggle removes most of the demand for deletion.** Almost everyone deleting a row wants the type
  gone from the admin menu, not the row gone from the database. Offering that directly means the
  destructive path is taken far less often.
- **Counts convert an abstract warning into a concrete one.** "This will hide 47 Books" lands where
  "this may affect existing content" does not.
- **It matches how the rest of the framework treats schema.** Definitions are data the user owns;
  the extension edits its own registration behaviour, not their content. Hard-deleting posts from a
  schema screen would break that boundary.
