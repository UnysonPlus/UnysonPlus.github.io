---
slug: animation-studio-architecture
title: "How should the Animation Studio be built, hosted and connected to AI?"
authors: [jon]
tags: [architecture, animation]
date: 2026-10-15
description: The Animation Studio is a React editor built to static files and hosted on GitHub Pages, scenes are JSON played by a plain GSAP player, the stage has a shape per breakpoint, and AI runs through the user's own AI Dev Kit and writes scene data rather than code.
---

**The question:** We want a browser studio for timeline motion graphics that exports HTML for website heroes
and sections, with AI that builds an animation from a prompt. What should it be built with, where can it run
when the only hosting is a basic cPanel account, how should its stage handle different screens, and how
does the AI connect?

<!-- truncate -->

## Context

The [Animation Studio](/kinetic-scenes) is a drag-and-drop timeline editor: presets placed as clips, text
and images edited in place, 3D later. Its output is plain HTML rather than video. The hosting available for
`kinetic-scenes.unysonplus.com` is ordinary shared cPanel hosting, which runs PHP and MySQL but may not run
Node.js. The [AI Dev Kit](/ai-dev-kit) already runs on users' computers for the Site Converter and the AI
Assistant.

## Options considered

**Editor technology.** A PHP-rendered app can't deliver a smooth drag-and-drop timeline, because PHP only
runs on the server. A browser app is required. React has the widest range of ready-made editor parts
(drag-and-drop, panels, colour pickers).

**Hosting.** GitHub Pages is free and automatic but serves only static files, so it can't hold an AI key or
save projects. cPanel serves static files too and adds PHP and MySQL. A Node.js server would need hosting we
don't have. The choice turns on the AI decision below: once AI runs on the user's own computer, the Studio
is static files only, and nothing needs a server until accounts and cloud saving.

**Stage.** A single fixed 16:9 frame is simplest, but on a phone it shrinks a hero to about 219px tall, and on
a desktop monitor it is taller than the browser window. Fully free-form responsive layout is what page
builders already do, and it loses the "design on a fixed canvas" simplicity.

**AI.** A hosted AI key on the Studio's server means paying for every generation and holding a secret on
shared hosting, where long requests also hit time limits. Routing through the user's AI Dev Kit uses their
own subscription or a local model. On output, an AI that writes code produces results nobody can edit on a
timeline; an AI that writes scene data produces ordinary clips.

## Decision

- **The editor is React + TypeScript, built with Vite to static files.** No Node.js runs on the server.
- **Exports ship a plain JavaScript player on GSAP**, with three.js loaded only for 3D. React never ships
  with a scene.
- **Host on GitHub Pages** under the `kinetic-scenes.unysonplus.com` subdomain, published by an Action on
  each push. PHP and MySQL on the cPanel hosting come in only for accounts and cloud saving, late in the
  roadmap.
- **Scenes are a JSON scene file** played as one seekable GSAP timeline, so frames are exact and video export
  stays possible.
- **The stage has a shape per breakpoint** (for example 16:9, 4:3 and 4:5), three height modes (ratio, ratio
  capped to the window, fill the window) and a safe area. Sizes use CSS container units.
- **AI runs through the user's AI Dev Kit** and writes scene files from the preset catalogue, never raw code.
  A custom code clip remains as an escape hatch.

## Why

The static-build model costs nothing to run and needs no server. (We first planned the cPanel subdomain,
assuming the Studio would hold an AI key; routing AI through the kit removed that need, so GitHub Pages
was simpler.) Keeping React out of exports keeps
published scenes small, which is the main reason to choose HTML over video. A per-breakpoint stage keeps the
video-like simplicity of a fixed canvas while still giving phones a usable hero. Routing AI through the kit
removes the cost and the secret from our server, and having the AI write scene data rather than code means
everything it makes can be edited by hand on the timeline.
