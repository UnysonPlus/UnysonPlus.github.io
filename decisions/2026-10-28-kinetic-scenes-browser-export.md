---
slug: kinetic-scenes-browser-export
title: Why does Kinetic Scenes still render videos with the AI Dev Kit when the browser can do it faster?
authors: [jon]
tags: [kinetic-scenes]
date: 2026-10-28
description: A browser export that is 1.5 times faster at the same quality, and why the AI Dev Kit stays the default renderer anyway.
---

**The question:** the Studio can render an MP4 in the browser itself, and in a benchmark it was faster than the AI Dev
Kit. Should it become the default?

<!-- truncate -->

## Context

Kinetic Scenes has two ways to make a video. The AI Dev Kit renders the scene in a headless browser on the person's
computer, frame by frame, and encodes it with ffmpeg. The Studio can also render in the page: it draws each frame with
HTML-in-Canvas, encodes it with WebCodecs and muxes an MP4, with nothing installed. Until now that was only the
fallback when the kit is not running. Phase 23 of the roadmap asked whether the browser path should take over, and to
ship it only if it were faster at the same quality.

On the Studio's 38-second demo scene at 1080p, on a PC with a GTX 1660 Ti, the kit took 46 s and the browser 31 s.
Compared frame by frame, 2D layers were identical, but 3D layers came out in the wrong place: their canvas spills past
the layer's box, and the browser's element drawing placed it wrongly. Drawing those canvases separately fixed it and
brought the two renders to 0.99 similarity.

## Options considered

- **Make the browser export the default.** Faster and nothing to install, but HTML-in-Canvas is still behind an
  experimental flag in Chrome, so most people could not use it at all; it makes larger files; and it cannot do
  see-through or ProRes exports.
- **Drop the browser export.** Simpler, but it is the only way to get a video with no kit, and it is now proven to match.
- **Keep the kit as the default, keep the browser export as the fallback, fix its 3D bug.**

## Decision

The third: the kit stays the default renderer; the browser export stays the fallback, with 3D layers fixed (Studio
0.0.97), and the measurements are published in the Export docs.

## Why

A default has to work for everyone, and today the browser path works only with a flag turned on. Speed matters less
than it seemed: on a graphics card the kit already renders faster than real time. Once HTML-in-Canvas ships on by
default, the browser export becomes the natural quick choice for a plain MP4, and this decision should be revisited.
