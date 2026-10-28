---
slug: kinetic-scenes-github-issues
title: Why doesn't the Kinetic Scenes repository have "good first issue" tasks?
authors: [jon]
tags: [kinetic-scenes]
date: 2026-10-28
description: GitHub issues on the Kinetic Scenes repository are kept for problems other people report; whatever we find ourselves, we fix.
---

**The question:** a friendlier public repository usually comes with labelled starter issues for newcomers. Should
Kinetic Scenes have them, or should we just fix those things?

<!-- truncate -->

## Context

Launching the repository properly (Phase 23) meant a README with a demo, a one-command start, an FAQ and issue
forms. The usual last step is a handful of small tasks labelled **good first issue**, deliberately left unfixed so a
newcomer has an easy first pull request. A first draft listed six of them; three were worth doing, three were filler
written to be easy.

## Options considered

- **Post starter issues** and leave them for contributors: the usual way an open-source project grows contributors,
  but it means knowingly leaving improvements undone, and a beta that changes daily makes a newcomer's pull request
  likely to clash with work in progress.
- **Fix what we find, and keep issues for what others report.**

## Decision

The second. GitHub issues on the repository are for problems and ideas other people report; anything we notice
ourselves we fix (the three worthwhile items shipped in Studio 0.0.99: keyboard shortcuts in Help, Copy scene file,
and a test suite that found and fixed a rounding edge in Reframe). The issue forms and pull-request template stay, so
reports that do come in are useful.

## Why

An issue tracker is most useful as a record of what people actually run into. Filling it with tasks we could do
ourselves makes it harder to see real reports, and leaves the product worse in the meantime. Starter issues can be
revisited once the Studio is out of beta and the code changes less often.
