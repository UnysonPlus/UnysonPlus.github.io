---
slug: keyframe-lane-native-editor
title: Editing Scroll Keyframes beats on the timeline — embed the Kinetic Scenes editor, or edit the native options in place?
authors: [jon]
tags: [animation-engine, architecture]
date: 2026-10-29
description: Phase 3b of the Scroll Timeline edits each beat's state by changing the element's native Scroll Keyframes options in place and persisting a per-page diff — the override is the compile target — rather than embedding the Kinetic Scenes React editor into the front-end tool.
---

**The question:** the Scroll Timeline's keyframe lanes (roadmap item 1b, Phase 3) let you retime a
[Scroll Keyframes](/animation-engine/scroll-keyframes) element's beats. Phase 3b adds editing each beat's
**state** — its transform / opacity / blur and ease. The roadmap had always framed this as *"reuse the
Kinetic Scenes keyframe editor,"* with a *native-options ⇄ scene compiler* to be built. When it came time to
build it, was embedding that editor still the right move?

<!-- truncate -->

**Context.** The Scroll Timeline is a **front-end, admin-only overlay** written in plain, framework-free
JavaScript (decided in "scroll-timeline-front-end-first"). It reads the page's live animations where they
actually exist. A Scroll Keyframes element bakes its timeline as `data-upw-skf` — a list of beats, each a
set of the eight animatable props at a `0..1` position — and a tiny runtime interpolates them on the shared
frame loop. The [Kinetic Scenes](/kinetic-scenes) keyframe editor, by contrast, is a React component inside a
separate web app, speaking its own scene format.

**Options considered.**

- **Embed the Kinetic Scenes React editor in the overlay.** Richest UI, and the long-stated plan. But it
  means loading React (and the editor's dependencies) onto the *front end* of every admin's page view, a
  format bridge (scene ⇄ native options) in both directions, and a second source of truth to keep in sync —
  all to edit eight numbers and an ease per beat. The overlay would stop being framework-free.
- **Edit the native Scroll Keyframes options in place.** Click a beat → a small inline editor of the same
  eight props + ease the element already stores. Changes mutate the live beat (instant preview) and persist
  as an **additive per-page diff** in the existing `_upw_timing_overrides` store — the same spine as
  drag-to-retime — never touching the builder JSON. No React, no scene file, no bridge.

**Decision.** Edit the native options in place. The per-page override **is** the compile target — there is no
stored scene to keep in sync, because the thing being edited is the element's own option model. The Kinetic
Scenes keyframe editor stays the richer authoring surface for full *scenes*; the timeline lane stays a thin,
native view over the Scroll Keyframes a page already has.

**Why.** The value of 1b was always *edit a page's real motion where it lives*, cheaply and safely. A
diff-based override over native options delivers exactly that — live preview, ships to every visitor, survives
re-import, resets per beat — without the weight, the format-bridge, or the dual source-of-truth that embedding
a React scene editor would drag onto the front end. "Reuse the Kinetic Scenes editor" was a means to the end
(editing beats visually); the native-in-place editor reaches the same end with far less to maintain. If a
future need genuinely calls for the full scene editor on a page, it can be added as an escalation — but the
common case no longer waits on it.
