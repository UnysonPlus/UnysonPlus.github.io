---
title: 3D Scene
sidebar_position: 4
---

# 3D Scene

A **real WebGL scene your visitors travel through on scroll** — fly through a tunnel of your images, dolly past a floating gallery, or orbit a subject. You supply the media and tune a few knobs; the scene *and its scroll-driven camera* are built in. Rendered with Three.js, with a static-image fallback and full motion guardrails.

This is the "camera flying through real depth" moment — not a flat CSS effect, an actual 3D space.

<img src="/img/shortcodes/scene-3d-tunnel.png" alt="The Image Tunnel scene on a page — a seamless corridor tiled with real photos receding to a vanishing point, gently spiralling, as the camera flies through it on scroll" width="1170" />

## The three scenes

| Scene | What happens |
| --- | --- |
| **Image Tunnel** | Your images tile a **seamless corridor** that recedes to a vanishing point; scroll flies the camera straight through it. *Path roll* adds a gentle spiral. |
| **Dolly Gallery** | Framed images float along both sides of an aisle; the camera **dollies** down it — near frames sweep past faster than far ones (real parallax). |
| **Product Orbit** | The images stand in a **ring** at the centre; the camera **circles** them as you scroll, revealing every side. |

## Scene tab

| Option | What it does |
| --- | --- |
| **Scene** | Image Tunnel · Dolly Gallery · Product Orbit. |
| **Images** | The media the scene is built from (a `multi-upload` — add / reorder). They're placed into the scene for you. |
| **Placement** | **Pinned scroll-scrub** (holds the scene on screen and flies the camera as you scroll past — the default), **Inline** (a fixed-height stage in the page), or **Section background** (fill the Section behind its content). Inline / Background gently *auto-drift* the camera instead of scrubbing. |
| **Scroll length (screens)** | Pinned only — how many screen-heights the fly-through spans. |
| **Stage height (px)** | Inline only — the stage height in the page. |
| **Spacing / depth** | How far apart the images sit along the camera path — higher = a longer, airier journey. |
| **Field of view** | The camera lens; wider exaggerates depth and speed. |
| **Path roll** | Rolls / curves the path (a spiral in the tunnel, extra turns in the orbit). |

## Style tab

**Stage background** (also the depth-fog colour — dark reads best), **Depth fog** (fades distant images into the background for depth), and **Corner radius** (inline / background).

## Advanced tab

**Fallback poster** (shown until the scene is ready, and as the still image when WebGL is off or the visitor has *reduce motion* on — recommended), **Max pixel ratio** (caps render resolution on high-DPI / mobile for performance), and **CSS ID / Class / Custom CSS**.

## Performance & accessibility

Built to the engine's [motion guardrails](/animation-engine/3d-motion-roadmap/roadmap#guardrails):

- **WebGL is feature-detected** — no WebGL → the poster (or a plain veil) stays as the still fallback; no 3D work runs.
- **Respects reduced motion** — a visitor with *reduce motion* set gets the poster, never the animation.
- **Pauses off-screen and when the tab is hidden**, and **caps render resolution** (DPR) on mobile.
- Loads **only on pages that use it**, and shares the one vendored Three.js with [WebGL Object](/animation-engine/webgl-object) (no second download).

## Live demo

**→ [See it in the Animation Engine demos](/animation-engine/scene-3d/).**

## Steps

1. Add a **3D Scene** element (builder palette → **Animation Engine**) where the moment should happen.
2. On the **Scene** tab, pick a scene and add your **images**.
3. Choose **Placement** — *Pinned* to fly the camera on scroll (set **Scroll length**), or *Inline* / *Background* to auto-drift — then tune **spacing**, **field of view** and **path roll**.
4. On **Style**, set a dark stage colour and **depth fog**; on **Advanced**, add a **fallback poster**. Save.
