---
slug: cross-column-drag-drop-connect-group
title: "Why cross-column drag-and-drop was a small opt-in, not a new post type"
authors: [jon]
tags: [option-types, header, architecture]
date: 2026-07-25
description: "The header/footer column builders let you sort elements within a column but not drag them between columns. The question was whether that needs a data-model overhaul or a new post type. It needed neither — jQuery-UI already has connectWith — but the prototype surfaced a real trap: the settings form saves by input name, so a moved item must be re-keyed on receive or it silently reverts."
---

**The question:** Can the header/footer columns' addable-popups drag-and-drop between each other (not
just reorder within one column)? Is that a big refactor of the option type, or do we need a new post
type for it?

<!-- truncate -->

## Context

Each column is a separate `addable-popup` option, and each uses jQuery-UI `sortable()` with `axis:'y'` —
one vertical list per column, so drags are column-locked. The data already lives as an array of
per-item JSON blobs inside each column's option value.

Two facts made the answer easy:

- **jQuery-UI `sortable` has `connectWith` built in** — dragging between lists is a native feature of
  the library already in use. No new drag engine.
- **A new post type would be pure over-engineering.** The item data is already self-contained JSON in
  the option value; a post type would add a whole storage/query layer for zero benefit.

## Options considered

| Option | Verdict |
|---|---|
| **New post type for elements** | Rejected — massive over-engineering; the data model already holds everything. |
| **Rewrite the addable-popup** | Unnecessary — the change is additive, not structural. |
| **Opt-in `connect_group` config** | Chosen — a small, scoped, backward-compatible flag that wires `connectWith` between same-group lists only. |

## Decision

Add an opt-in **`connect_group`** to the `addable-popup` option type. Two or more addable-popups that
share the same non-empty group id interlink (`connectWith`); empty (default) stays self-contained. The
id is scoped per logical group — one footer row's columns, one header bar's Left/Center/Right — so
unrelated addable-popups on the same settings page never interlink. Empty connected columns stay
visible as drop targets. The header/footer column helpers opt in by passing the bar/row id.

## Why — and the trap the prototype caught

The reassuring part (self-contained item data) hid a real trap that only a **test on a real install**
exposed. My first read was "the value is collected by DOM position, so a moved item just works." Wrong:
the settings form saves via native **`$el.serialize()`**, and each item's input name encodes its
column (`fw_options[…][col_1][]`). A dragged item kept its **origin** column's name, so it moved
visually but **reverted on save**. The fix is to **re-key the moved item's input name on jQuery-UI
`receive`** to the receiving column (the name template captured from that column's default item, so it
works even for an empty column).

The lesson: "it drags and drops" in the DOM is not the same as "it saves." When a framework serializes
by input name, moving a node between lists isn't enough — the name has to move too. Prototyping against
the actual save path, rather than reasoning about it, is what turned a plausible-but-wrong assumption
into a shipped, verified feature (drag → save → reload round-trip confirmed in the database).

Status: **Accepted.** Live on all footer rows and header bars; the `connect_group` flag is reusable by
any addable-popup that wants cross-list DnD.
