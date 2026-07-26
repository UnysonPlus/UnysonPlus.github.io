---
sidebar_position: 6
title: Roadmap
slug: /3d-motion-roadmap/roadmap
description: The phased plan for 3D motion and timelines — what we build as presets, what stays curated, and the performance rules every effect follows.
---

# Roadmap

The plan is phased so each stage ships value on its own, and the expensive work (real 3D) rides on
foundations laid earlier. We're doing the three [focus areas](./focus-areas) **one at a time**.

<figure role="group" aria-label="The motion roadmap in four phases" style="margin:1.75rem 0;">
<svg viewBox="0 0 760 476" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="rm-t rm-d" style="width:100%;height:auto;max-width:760px;font-family:var(--ifm-font-family-base, system-ui, sans-serif);">
<title id="rm-t">Motion roadmap — four phases</title>
<desc id="rm-d">Phase 0 Foundation, very high impact. Phase 1 Motion timeline, high impact. Phase 2 Real 3D scenes, very high impact. Phase 3 Flourishes, medium to high impact.</desc>
<line x1="46" y1="74" x2="46" y2="422" stroke="var(--ifm-color-emphasis-300)" stroke-width="3"/>
<polygon points="46,438 39,425 53,425" fill="var(--ifm-color-emphasis-300)"/>
<g>
<circle cx="46" cy="74" r="19" fill="#0FA36B"/>
<text x="46" y="79" text-anchor="middle" font-size="16" font-weight="700" fill="#ffffff">0</text>
<rect x="82" y="34" width="648" height="80" rx="12" fill="var(--ifm-color-emphasis-100)" stroke="var(--ifm-color-emphasis-200)"/>
<text x="104" y="64" font-size="17" font-weight="700" fill="var(--ifm-font-color-base)">Phase 0 — Foundation</text>
<text x="104" y="90" font-size="13" fill="var(--ifm-color-emphasis-700)">Site-wide smooth scroll + one scroll engine</text>
<text x="708" y="58" text-anchor="end" font-size="10" font-weight="700" letter-spacing="1" fill="var(--ifm-color-emphasis-600)">IMPACT</text>
<circle cx="654" cy="82" r="5" fill="#0FA36B"/><circle cx="672" cy="82" r="5" fill="#0FA36B"/><circle cx="690" cy="82" r="5" fill="#0FA36B"/><circle cx="708" cy="82" r="5" fill="#0FA36B"/>
</g>
<g>
<circle cx="46" cy="190" r="19" fill="#2F74E6"/>
<text x="46" y="195" text-anchor="middle" font-size="16" font-weight="700" fill="#ffffff">1</text>
<rect x="82" y="150" width="648" height="80" rx="12" fill="var(--ifm-color-emphasis-100)" stroke="var(--ifm-color-emphasis-200)"/>
<text x="104" y="180" font-size="17" font-weight="700" fill="var(--ifm-font-color-base)">Phase 1 — Motion timeline</text>
<text x="104" y="206" font-size="13" fill="var(--ifm-color-emphasis-700)">Beat keyframes across a pinned section</text>
<text x="708" y="174" text-anchor="end" font-size="10" font-weight="700" letter-spacing="1" fill="var(--ifm-color-emphasis-600)">IMPACT</text>
<circle cx="654" cy="198" r="5" fill="#2F74E6"/><circle cx="672" cy="198" r="5" fill="#2F74E6"/><circle cx="690" cy="198" r="5" fill="#2F74E6"/><circle cx="708" cy="198" r="5" fill="none" stroke="var(--ifm-color-emphasis-400)" stroke-width="1.5"/>
</g>
<g>
<circle cx="46" cy="306" r="19" fill="#7C4DFF"/>
<text x="46" y="311" text-anchor="middle" font-size="16" font-weight="700" fill="#ffffff">2</text>
<rect x="82" y="266" width="648" height="80" rx="12" fill="var(--ifm-color-emphasis-100)" stroke="var(--ifm-color-emphasis-200)"/>
<text x="104" y="296" font-size="17" font-weight="700" fill="var(--ifm-font-color-base)">Phase 2 — Real 3D scenes</text>
<text x="104" y="322" font-size="13" fill="var(--ifm-color-emphasis-700)">A scroll-driven camera through real depth</text>
<text x="708" y="290" text-anchor="end" font-size="10" font-weight="700" letter-spacing="1" fill="var(--ifm-color-emphasis-600)">IMPACT</text>
<circle cx="654" cy="314" r="5" fill="#7C4DFF"/><circle cx="672" cy="314" r="5" fill="#7C4DFF"/><circle cx="690" cy="314" r="5" fill="#7C4DFF"/><circle cx="708" cy="314" r="5" fill="#7C4DFF"/>
</g>
<g>
<circle cx="46" cy="422" r="19" fill="#B26A00"/>
<text x="46" y="427" text-anchor="middle" font-size="16" font-weight="700" fill="#ffffff">3</text>
<rect x="82" y="382" width="648" height="80" rx="12" fill="var(--ifm-color-emphasis-100)" stroke="var(--ifm-color-emphasis-200)"/>
<text x="104" y="412" font-size="17" font-weight="700" fill="var(--ifm-font-color-base)">Phase 3 — Flourishes</text>
<text x="104" y="438" font-size="13" fill="var(--ifm-color-emphasis-700)">Rive, WebGL image transitions, particles</text>
<text x="708" y="406" text-anchor="end" font-size="10" font-weight="700" letter-spacing="1" fill="var(--ifm-color-emphasis-600)">IMPACT</text>
<circle cx="654" cy="430" r="5" fill="#B26A00"/><circle cx="672" cy="430" r="5" fill="#B26A00"/><circle cx="690" cy="430" r="5" fill="#B26A00"/><circle cx="708" cy="430" r="5" fill="none" stroke="var(--ifm-color-emphasis-400)" stroke-width="1.5"/>
</g>
</svg>
<figcaption style="text-align:center;font-size:.85rem;color:var(--ifm-color-emphasis-600);margin-top:.5rem;">The plan, in four phases — each ships value on its own; later phases build on earlier foundations.</figcaption>
</figure>

## Phase 0 — Foundation

The highest return for the least effort — and the base everything else builds on.

- **Site-wide smooth scroll** — a Theme Settings toggle (plus a smoothing/strength control), with the
  scroll engine routed through it.
- **One scroll engine** — progressively bring the scroll-based sections onto a single scroll system
  so they all scrub against the same clock.
- **Shared guardrails** — a common reduced-motion + mobile-throttle + off-screen-pause helper every
  effect uses, so quality and accessibility are uniform.

**Outcome:** the whole engine feels like one polished system, and future scroll features get cheaper.

## Phase 1 — Motion timeline (the pragmatic 80%)

- **Beat keyframes** — per-element 2–3 keyframed states across a pinned Section's beats, each with an
  easing pick, built on the existing [Scroll Story](/animation-engine/scrollytelling) plumbing.
- **(Optional)** a bounded "Motion Timeline" element for advanced users, only if there's demand.

## Phase 2 — Real 3D scenes

- **A parametric "3D Scene" element** — a few pre-built, scroll-scrubbed camera scenes (gallery
  dolly, product orbit, image tunnel). You supply the media and tune a few knobs; the scene and its
  camera choreography are built in.
- **Stretch:** a real-WebGL variant of the [3D Gallery](/animation-engine/3d-gallery) for true depth,
  lighting and reflection.

## Phase 3 — Flourishes

- **Rive elements** (interactive vector motion), **curated WebGL image transitions** (ripple / liquid
  / displace presets), and richer particle presets in [WebGL Object](/animation-engine/webgl-object).

## At a glance

| Phase | Deliverable | Impact |
| --- | --- | --- |
| **0** | Site-wide smooth scroll + one scroll engine + shared guardrails | Very high |
| **1** | Beat keyframes (the timeline "80%") | High |
| **2** | Parametric scroll-camera 3D scene element | Very high |
| **3** | Rive + WebGL image transitions + particle presets | Medium–High |

## What we build vs. what stays curated {#build-vs-curated}

The guiding principle: be the **"GSAP-quality scroll + smooth-scroll + text-reveal + light-3D"**
builder that delivers the vast majority of premium motion through **presets** — plus a small,
performance-budgeted set of WebGL/Rive flourishes. Fully bespoke studio scenes stay a hand-built
concern; trying to genericize them is where builders drown.

| Build as presets | Use internally / curated | Not planned |
| --- | --- | --- |
| Site-wide smooth scroll | Theatre.js to author 3D camera scenes | A general visual timeline editor |
| One unified scroll engine | Three.js for a few parametric scenes | A user-facing shader editor |
| Beat keyframes on pinned sections | Spline for an optional no-code hero object | Open 3D scene composition from scratch |
| Rive / model-viewer / image-transition presets | Curtains.js/OGL for the shader preset set | Arbitrary per-project camera fly-throughs |
| Text reveals everywhere | | Whole-page WebGL as the only content layer |

## Performance & accessibility rules {#guardrails}

Every motion feature ships with these — they're part of the design, not an afterthought:

- **Respects reduced motion.** When a visitor has "reduce motion" set, heavy effects swap for instant
  or minimal states. This is mandatory.
- **Throttled on mobile.** Mobile GPUs thermally throttle; effects cap their work, cap resolution,
  and pause when off-screen or when the tab is hidden.
- **Progressive enhancement.** WebGL is detected and falls back to a static image or video. Real
  content always lives in the HTML (for SEO and screen readers) — 3D is an enhancement layer over the
  page, never the only source of content.
- **Web Vitals first.** On content and conversion pages, the light path ships by default; spectacle
  is reserved for pages where it adds meaning.

:::info Where this connects
The engine is already built this way — see [Performance](/animation-engine/performance) for how a
page loads only the effects it actually uses. The roadmap keeps that discipline as it grows.
:::
