---
slug: animation-studio-web-and-video-modes
title: "Should the Animation Studio also make videos for Reels and TikTok?"
authors: [jon]
tags: [architecture, animation]
date: 2026-10-16
description: Yes, as a second mode of the same Studio, not a second product, and not a video editor. Web stays the main mode; Video makes motion graphics, backgrounds and effects for power users who edit their footage elsewhere.
---

**The question:** The Studio was built for website kinetics, but many more people make Reels, TikToks and Shorts. Can
the workspace have two modes, one for websites and one for full videos, to reach that audience?

<!-- truncate -->

## Context

Every Studio scene can already be exported as an MP4 through the AI Dev Kit, and most of Phases 8 and 9 (voice-overs,
transcription, sound effects, transitions, the camera, captions, beat sync) serve video as much as the web. Video
creators already have strong editors (CapCut, Premiere, DaVinci Resolve), and competing with them on cutting and
trimming would mean building a different product.

## Options considered

- **Stay web-only.** Simplest, but leaves out a large audience that the existing tools already half-serve.
- **A separate video app.** Clear for users, but two products to maintain, and scenes could no longer serve both a
  website and a video.
- **A full video editor.** Head-on competition with mature, free tools, and a move away from what the Studio is good at.
- **Two modes of one Studio,** sharing one scene format and one player, with the mode setting the destination:
  formats, playback, guides, checks, AI rules and export.

## Decision

Two modes, named **Web** and **Video**. Web is the default and the focus; Video comes after Phase 9 as Phase 10.

Video mode is a **motion-graphics companion for power users**, not an editor: they cut and trim in their video editor
and use the Studio for kinetic type, backgrounds, objects, transitions and effects. Its first features are fixed
formats with platform safe zones, **transparent overlay export** (WebM with alpha, ProRes 4444) to drop over footage,
the user's footage as a reference layer to design against, and video-specific checks and AI rules. Simple trim and
speed tools may come later; editing stays the video editor's job.

## Why

One scene format means one scene can serve a website and a Reel ("make it once, publish everywhere"), which no
video-only tool offers and which leads video creators back to Unyson+. Not cloning an editor keeps the Studio on
what it does best, and avoids competing with free tools on their home ground. Names describe the destination
("Web", "Video") rather than a style or a file type, since both modes are kinetic and Video exports more than MP4.
