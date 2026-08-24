---
slug: php-api-reference-generated-not-exhaustive
title: "Should we document every PHP function — and how?"
authors: [jon]
tags: [documentation, architecture]
date: 2026-08-24
description: "The framework has ~845 public helper functions and ~350 hooks. Do we hand-write a page per function? We decided NO — internal implementation is documented by its docblock in the code; the docs site publishes a GENERATED reference of the public contract (all prefixed helpers + all framework-owned hooks), extracted from PHPDoc + a token scan so it never drifts, organized by subsystem, with hooks given equal billing to functions."
---

**The question:** UnysonPlus has a large PHP surface — ~845 public-prefixed helper functions and ~350
actions/filters. Is it wise to document *all* of it, the way people mean when they say "document every
function"? And if so, how — hand-written pages, or generated?

<!-- truncate -->

## Context

Documenting functions inline and publishing a browsable reference is a standard, named practice:
**docblocks** (PHPDoc / PSR-5/19) parsed by **doc generators** (phpDocumentor, Doxygen; JSDoc, Javadoc,
rustdoc elsewhere). WordPress itself ships the **Code Reference** auto-generated from PHPDoc via
`phpdoc-parser`. In the **Diátaxis** documentation model (Tutorials / How-to / **Reference** /
Explanation), a function catalogue is squarely *Reference* — a different axis from our existing how-to
Manual, The Theme, and AI Dev Kit sections.

The temptation is to generate a page per symbol for all ~845 functions. That's the classic trap:
exhaustive auto-references become dumping grounds nobody reads, they go stale the moment a signature
changes, and 90% of the entries are internal helpers meaningless without their surrounding code.

## Options considered

- **A — Hand-write a reference.** Highest quality per page, but unmaintainable at this scale and
  guaranteed to drift from the code. Rejected outright.
- **B — Auto-generate a page per function for everything (WP-style).** Comprehensive, but noisy and
  low-signal; buries the ~5% that authors actually consume (public helpers + hooks) under internal
  plumbing. This is the "dumping ground" outcome.
- **C — Generate a reference for the public *contract* only, organized by subsystem.** The public
  helper functions (the `fw_` / `unysonplus_` / `upw_` / `sc_` / `fw_ext_` families) and — with equal
  billing — **every framework-owned hook**, since hooks are the real extensibility surface a framework
  lives or dies by. Internal closures and WordPress-core hooks are excluded on purpose.

## Decision

**Option C.** The docs site gets a dedicated, generated **API Reference** section
(`/reference`), split into **Functions** and **Hooks**, each grouped by subsystem. It's produced by a
two-step pipeline — `scripts/extract-php-api.php` (a `token_get_all` scan that pulls signatures,
docblocks, `function_exists()`-guarded/pluggable flags, and `do_action`/`apply_filters` sites) →
`scripts/gen-php-api.mjs` (emits the grouped Markdown). The `.md` is **generated, never hand-authored**:
you edit the framework docblocks and re-run the two commands.

Implementation stance: **the code documents the implementation (via docblocks); the site documents the
contract people depend on (public API + hooks).**

## Why

- **Signal over noise.** Authors search for "which function formats an upload path" or "which filter
  lets me change X" — the public helpers and hooks. Those are exactly what's published; the internal
  90% stays where it belongs (in the source, next to the code it explains).
- **It can't drift.** Because it's extracted from the shipped source every build, the reference always
  matches the code — the failure mode that kills hand-written and even per-symbol-generated references.
- **Hooks are first-class.** For a *framework*, the hook catalogue is the single highest-value
  reference — it's the supported way to extend without forking. Giving it a peer section to Functions
  reflects that.
- **It slots into the existing IA.** As a Diátaxis *Reference* section it sits cleanly beside the
  how-to Manual / The Theme / AI Dev Kit rather than competing with them.

Status: **Accepted** — the generated section ships with the functions + hooks pipeline; future
framework changes flow through by re-running the extractor + generator.
