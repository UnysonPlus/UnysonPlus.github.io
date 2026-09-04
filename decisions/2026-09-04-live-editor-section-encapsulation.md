---
slug: live-editor-section-encapsulation
title: "Why the live editor wraps Flexbox/Grid/Block in a Section (when the backend doesn't)"
authors: [jon]
tags: [architecture, live-editor, page-builder]
date: 2026-09-04
description: The backend page builder lets a Flexbox / Grid / Block Div sit directly at the page root, but the live editor now enforces a section-based root — adding one of those Divs nests it into the last Section (or creates a Section to hold it) — because the live editor is a linear, band-oriented canvas where a bare root Div reads as a stray element rather than a page band, and keeping the two builders behaviourally identical mattered less than each one being clear in its own context.
---

**The question:** In the live editor, when you add a **Flexbox / Grid / Block Div**, should it drop at
the page root the way it does in the backend builder — or should it be **encapsulated in a Section**
(placed inside the last section, or wrapped in a new one when the page has none)?

<!-- truncate -->

## Context

Earlier this session we settled that a Flexbox is a **root-capable primitive** — the backend palette
offers Section / Block / Flexbox / Grid as sibling tiles, and any of them can be dropped straight onto
the canvas root (see "Why the Flexbox stays one shortcode, split only in the UI"). That's right for the
backend, where the tree view makes nesting explicit and a root-level Div is obviously a root-level Div.

The live editor is a different surface: a **linear, WYSIWYG canvas** with a persistent "+ Add Section"
bar and an "Add your first section" empty state. The whole mental model there is *a page is a stack of
sections (bands), and layout tools live inside them*. In that context a bare Flexbox or Grid sitting at
the root — no band around it, full-bleed against the page edges — reads as a stray element, not as
"a page section". It also made the canvas item badge and the add-flow feel inconsistent with how the
rest of the editor talks about the page.

## Options considered

- **Mirror the backend exactly** (root-capable Divs). *Pro:* the two builders behave identically, one
  fewer rule to explain. *Con:* imports the backend's tree-view assumptions into a surface that has no
  tree view; a root Div with no band is a confusing thing to end up with by clicking "Add".
- **Section-encapsulation in the live editor** (chosen). Only a Section lives at the live-editor root.
  Adding a Block / Flexbox / Grid places it inside the **last** section, or — when the page has none —
  creates a section to hold it, so a bare Div is never orphaned at the root. The Section tile still
  drops a root section. Implemented client-side by reusing the existing child-insert path
  (`insert-element` into the section's `_items`), with a one-shot "create a section first, then nest"
  chain for the empty-page case.

## Decision

The live editor is **section-based at the root**: adding a Section adds a section; adding a
Block / Flexbox / Grid encapsulates it in the last (or a new) section. The backend keeps its
root-capable behaviour unchanged. The two builders **deliberately differ** here. As a consequence the
live editor's root add button stays **"Add Section"** (a brief experiment renaming it to the
structure-neutral "Add Structure" was reverted, since the root really is section-only), while the
structure picker still offers all four kinds — picking a non-Section one simply seeds the section it
lands in.

## Why

Behavioural parity between the two builders is worth something, but not more than each builder being
unambiguous in its own idiom. The backend's tree makes a root Div legible; the live editor's flat canvas
does not, and its entire vocabulary ("Add Section", "Add your first section") already promises a
section-first page. Encapsulation makes the live editor honour that promise, keeps every added element
inside a real band (so it inherits the band's width, background and spacing rather than floating
full-bleed), and — because it rides the existing child-insert plumbing — cost almost nothing to build.
This does not walk back the root-capable-primitive decision; it scopes it: the *shortcode* is still one
root-capable primitive, and only the *live-editor surface* chooses to present a section-first root.

*Status: Accepted.*
