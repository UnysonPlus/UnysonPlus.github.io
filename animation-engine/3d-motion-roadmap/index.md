---
sidebar_position: 1
title: 3D Motion & Roadmap
slug: /3d-motion-roadmap
description: How premium "3D motion" websites are built, what the Animation Engine can do today, and where it's headed next.
---

# 3D Motion & Roadmap

This is the vision section for the Animation Engine — a plain-language guide to how modern
**"3D motion"** websites are built, an honest map of **what the engine can already do**, and the
**roadmap** for where it's going next: real 3D scenes, motion timelines, and buttery site-wide
scroll.

:::info A living document
This is a forward-looking roadmap, not a changelog. Priorities and sequencing may shift — but the
direction below is where we're taking motion in UnysonPlus.
:::

## The short version

Most people assume a WordPress builder can't touch the "3D motion" you see on award-winning studio
sites. The Animation Engine is already much closer than that suggests:

- It runs on **GSAP + ScrollTrigger** — the same animation core the pros use.
- It has **real WebGL 3D** ([WebGL Object](/animation-engine/webgl-object) via Three.js and
  [Model Viewer](/animation-engine/model-viewer) for glTF/GLB models, with AR).
- It has a **cinematic scroll system** ([Scrollytelling / Scroll Story](/animation-engine/scrollytelling))
  with a pinned full-screen stage, scrubbed backdrops, and a camera-glide (pan + dolly) over a still
  image — the "Apple-style product ride" look.
- It has **frame-scrub "video-from-stills"** ([Image Sequence](/animation-engine/image-sequence)),
  self-drawing SVG, CSS-3D galleries, physics, kinetic text, a custom cursor, and more.

So the goal isn't to "catch up." It's to push past the everyday scroll-and-fade vocabulary into the
three things that define genuinely premium motion:

1. **[Scroll that feels effortless](./focus-areas.md#area-1--scroll-feel)** — one smooth-scroll
   substrate under everything.
2. **[A real motion timeline](./focus-areas.md#area-2--a-real-motion-timeline)** — keyframing several
   properties over one scrubbable axis, not just single-effect presets.
3. **[Real 3D scenes you move through](./focus-areas.md#area-3--real-3d-scenes)** — a camera flying
   through actual depth, not a flat image with a fake camera.

## How to read this section

| Page | What it covers |
| --- | --- |
| **[Motion vocabulary](./terminology.md)** | What "scrub," "pin," "motion timeline," "real 3D vs CSS 3D," shaders and particles actually mean |
| **[What the engine does today](./current-capabilities.md)** | The full, accurate map of current motion capabilities |
| **[Where we're leveling up](./focus-areas.md)** | The three focus areas that separate good from award-tier |
| **[The modern motion toolbox](./toolbox.md)** | The libraries behind these effects, and which fit a page builder |
| **[Roadmap](./roadmap.md)** | The phased plan, what we'll build vs. keep bespoke, and the performance rules every effect follows |

## About "camera-glide" background motion

A popular effect right now is a slow cinematic drift on a hero background — a camera that seems to
pan and push into a scene as you scroll. It looks 3D, but on most sites it's actually **2.5D**: a
flat image or video with a *faked* camera move over it. It reads as a nice drift, but never as depth
you can travel *through*.

<figure role="group" aria-label="2.5D faked camera versus real depth" style="margin:1.5rem 0;">
<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="cg-t cg-d" style="width:100%;height:auto;max-width:760px;font-family:var(--ifm-font-family-base, system-ui, sans-serif);">
<title id="cg-t">2.5D versus real depth</title>
<desc id="cg-d">2.5D moves a flat image with a faked camera. Real depth is a camera travelling through multiple layers.</desc>
<rect x="8" y="12" width="356" height="276" rx="14" fill="var(--ifm-color-emphasis-100)" stroke="var(--ifm-color-emphasis-200)"/>
<rect x="396" y="12" width="356" height="276" rx="14" fill="var(--ifm-color-emphasis-100)" stroke="var(--ifm-color-emphasis-200)"/>
<text x="186" y="46" text-anchor="middle" font-size="16" font-weight="700" fill="var(--ifm-font-color-base)">2.5D — a faked camera</text>
<rect x="104" y="86" width="168" height="98" rx="6" fill="#2F74E6" opacity="0.28" stroke="#2F74E6" stroke-width="1.5"/>
<line x1="104" y1="150" x2="272" y2="150" stroke="#2F74E6" stroke-width="1.5" opacity="0.5"/>
<circle cx="242" cy="116" r="9" fill="#2F74E6" opacity="0.5"/>
<polygon points="150,150 186,120 222,150" fill="#2F74E6" opacity="0.4"/>
<rect x="172" y="200" width="30" height="22" rx="3" fill="#B26A00"/><polygon points="202,204 214,198 214,224 202,218" fill="#B26A00"/>
<path d="M150,210 C168,197 204,197 224,208" fill="none" stroke="#B26A00" stroke-width="2" stroke-dasharray="4 4"/>
<text x="186" y="250" text-anchor="middle" font-size="12" fill="var(--ifm-color-emphasis-800)">One flat layer — the image pans &amp; scales</text>
<text x="186" y="272" text-anchor="middle" font-size="11" fill="var(--ifm-color-emphasis-600)">Looks 3D, but it's 2.5D</text>
<text x="574" y="46" text-anchor="middle" font-size="16" font-weight="700" fill="var(--ifm-font-color-base)">Real depth</text>
<line x1="500" y1="108" x2="636" y2="132" stroke="var(--ifm-color-emphasis-300)" stroke-width="1" stroke-dasharray="3 4"/>
<line x1="500" y1="196" x2="636" y2="172" stroke="var(--ifm-color-emphasis-300)" stroke-width="1" stroke-dasharray="3 4"/>
<polygon points="500,110 524,120 524,196 500,186" fill="#0FA36B" opacity="0.8"/>
<polygon points="556,120 578,129 578,186 556,177" fill="#0FA36B" opacity="0.6"/>
<polygon points="612,128 632,136 632,174 612,166" fill="#0FA36B" opacity="0.45"/>
<rect x="440" y="139" width="30" height="26" rx="4" fill="#7C4DFF"/><polygon points="470,143 484,136 484,168 470,161" fill="#7C4DFF"/>
<path d="M488,152 C540,150 580,148 634,145" fill="none" stroke="#7C4DFF" stroke-width="2.5" stroke-dasharray="5 5" marker-end="url(#cg-arrow)"/>
<text x="574" y="250" text-anchor="middle" font-size="12" fill="var(--ifm-color-emphasis-800)">Many layers — a camera moves through</text>
<text x="574" y="272" text-anchor="middle" font-size="11" fill="var(--ifm-color-emphasis-600)">Depth you travel through</text>
<circle cx="380" cy="150" r="19" fill="var(--ifm-background-color)" stroke="var(--ifm-color-emphasis-300)" stroke-width="1.5"/>
<text x="380" y="155" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ifm-color-emphasis-700)">vs</text>
<defs><marker id="cg-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#7C4DFF"/></marker></defs>
</svg>
<figcaption style="text-align:center;font-size:.85rem;color:var(--ifm-color-emphasis-600);margin-top:.5rem;">The everyday "3D" hero is 2.5D — a faked camera over a flat image. Real 3D moves a camera through actual layers of depth.</figcaption>
</figure>

The Animation Engine already produces this exact effect on purpose — see the **Backdrop Motion**
(`pan` / `dolly` / `pan_dolly`) options in [Scroll Story](/animation-engine/scrollytelling). The
roadmap's 3D work is about going **beyond** it: a camera moving through a real rendered scene, which
is the leap that separates a polished marketing page from a studio showpiece.
