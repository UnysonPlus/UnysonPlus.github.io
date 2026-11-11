---
slug: motion-preview-in-the-live-editor
title: "Why motion is previewed in the Live Editor (not the classic builder), and why Preview is a fresh page built from the unsaved model"
authors: [jon]
tags: [animation, live-editor, animation-engine, architecture]
date: 2026-11-11
description: The Framer & Webflow analysis ranked live preview of motion as the second-biggest gap. Decision — preview motion in the Live Editor's iframe canvas, with an Edit / Preview switch; Preview POSTs the unsaved model into the canvas as a normal visitor page instead of restarting every animation module in place.
---

**The question:** Live preview of animations was the second-biggest gap against Framer and Webflow. Where should it live, the classic dashboard builder or the Live Editor? And how should the editor switch between editing a still page and watching it play?

<!-- truncate -->

## Context

- The **classic builder** in wp-admin shows the page as boxes and option modals; it never renders the real page, so it can't show real motion.
- The **Live Editor** renders the real front end in an iframe and re-renders single elements after each change. But motion was switched off there: the shared entrance script, Scroll Motion, Smooth Scroll and Scroll Loop stand down whenever they run inside an iframe, and the Motion Gallery freezes in the editor, so elements stay still and selectable. About 25 other modules simply keep running.
- After a single-element re-render nothing restarts that element's scripts, and each module guards against starting twice.

## Options considered

1. **Preview in the classic builder:** small previews per element (as the Motion Gallery has). Never the real page, scroll or layout.
2. **Live Editor, motion restarted in place:** turn motion on inside the editing canvas and give every module a "restart this element" hook. Edits stay instant, but it needs work in every module, and moving, pinned and hidden elements fight the selection overlays.
3. **Live Editor, Edit / Preview modes, Preview as a fresh page:** Edit stays a still, selectable canvas; Preview reloads the canvas as a normal visitor request whose content is the editor's unsaved model (POSTed with a nonce). Every module starts the way it does for a visitor.

## Decision

**Option 3.** Motion is previewed in the **Live Editor**, the home for the rest of the Interactions work (Phase 4). An **Edit / Preview** switch sits in its toolbar:

- **Edit** holds motion at its final state, and the editing canvas always shows entrance-pending and exited elements.
- **Preview** POSTs the model into the canvas iframe (`?fw-le-motion-preview=1`, nonce plus `edit_post`); the server swaps it in as the page content, with no editor markup, no admin bar, no caching and noindex. The four iframe-gated runtimes skip their stand-down on that URL. Back in Edit, the canvas reloads and the unsaved model is re-rendered into it.

## Why

- **The real page, for free.** A fresh page load starts every module exactly as for a visitor, including scroll, pinning and hover. Nothing per-module has to change, and nothing previews differently from the live site.
- **Unsaved changes included.** POSTing the model means Preview shows what you are working on, not the saved page (the old Preview button opened the saved page in a new tab).
- **Edit stays reliable.** Selection, drag and inline editing never compete with moving or hidden elements.
- **Option 2 isn't thrown away.** A "re-initialise this element" hook is still worth building, to replay the element you're editing without leaving Edit. But it's an addition, not a requirement for previewing the page.
- **The classic builder keeps every option.** It just doesn't preview motion; the Live Editor is where you watch it.
