---
slug: post-types-ships-its-own-escape-hatch
title: "Post Types ships a \"Get PHP code\" export — the extension argues for itself by making itself removable"
authors: [jon]
tags: [architecture, documentation]
date: 2026-07-29
description: "A no-code CPT builder makes your content schema depend on a plugin, which is a real objection from developers. Rather than argue against it, Tools now generates the equivalent register_post_type() calls from your definitions — and to keep it honest, it generates them from the same arg builder the extension registers with."
---

**The question:** every no-code post type builder has the same objection sitting under it — *now my
content schema depends on your plugin*. It is a fair objection. Do we answer it with documentation,
or with a feature?

<!-- truncate -->

## Context

The extension is, structurally, a UI over two WordPress function calls. Nothing it produces is
proprietary: a post type registered through the screen and one registered in a child theme are the
same object, and the content is plain `wp_posts` rows either way. Deactivating the extension does not
corrupt anything — it just stops registering the types, so the content goes quiet until something
registers them again.

That "something" was the gap. The path off the extension existed in principle and nowhere in practice:
you would have to read your definitions out of a serialized option and hand-translate thirty settings
per row into `register_post_type()` arguments.

Meanwhile the AI Dev Kit already documented the hardcode-in-the-child-theme route as the right choice
for developers who want their schema in version control. We were recommending a path we made
laborious.

## Options considered

- **Document the objection away.** Explain in the docs that it's plain WordPress underneath. True,
  and unconvincing — it asks for trust where a demonstration is possible.
- **Ship a JSON export only.** Useful for moving between sites (and we did ship it), but it exports
  to *our* format. It solves portability between installs, not independence from the extension.
- **Generate the PHP (chosen).** A Tools action that emits the `register_post_type()` /
  `register_taxonomy()` calls equivalent to the current definitions, ready to paste into a child theme.

## Decision

**Tools → Get PHP code** generates the full set, with `labels` strings wrapped in `__()` against a
text domain the user picks. The critical implementation choice: it does **not** contain its own
translation of settings to arguments. It calls the same `build_post_type_args()` /
`build_taxonomy_args()` methods the registrar uses at runtime, so the emitted code is by construction
what the extension would have registered.

The screen says so plainly: paste it in, and you can then delete the row — the definitions are
equivalent, so existing content is unaffected.

## Why

- **A second implementation would drift, and drift silently.** A hand-written generator would be
  correct on the day it shipped and wrong the first time an argument was added. Sharing the builder
  makes that impossible: a new argument appears in the export because it appears in registration.
- **The escape hatch is the argument.** "You can leave whenever you like, here is the code" is a
  stronger case for staying than any amount of explaining that the data is portable.
- **It completes a route we already recommend.** The Dev Kit tells developers to hardcode when they
  want version control or a distributable theme. Now "start in the UI, graduate to code later" is a
  supported workflow rather than a manual re-entry job.
- **It costs almost nothing.** Nearly all of it is a `var_export()` variant that emits short arrays
  and tab indentation; the substance was already there.
