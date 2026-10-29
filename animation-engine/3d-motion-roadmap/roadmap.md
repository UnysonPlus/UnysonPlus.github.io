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
<text x="104" y="90" font-size="13" fill="var(--ifm-color-emphasis-700)">Site-wide smooth scroll + one scroll engine — ✓ shipped</text>
<text x="708" y="58" text-anchor="end" font-size="10" font-weight="700" letter-spacing="1" fill="var(--ifm-color-emphasis-600)">IMPACT</text>
<circle cx="654" cy="82" r="5" fill="#0FA36B"/><circle cx="672" cy="82" r="5" fill="#0FA36B"/><circle cx="690" cy="82" r="5" fill="#0FA36B"/><circle cx="708" cy="82" r="5" fill="#0FA36B"/>
</g>
<g>
<circle cx="46" cy="190" r="19" fill="#2F74E6"/>
<text x="46" y="195" text-anchor="middle" font-size="16" font-weight="700" fill="#ffffff">1</text>
<rect x="82" y="150" width="648" height="80" rx="12" fill="var(--ifm-color-emphasis-100)" stroke="var(--ifm-color-emphasis-200)"/>
<text x="104" y="180" font-size="17" font-weight="700" fill="var(--ifm-font-color-base)">Phase 1 — Motion timeline</text>
<text x="104" y="206" font-size="13" fill="var(--ifm-color-emphasis-700)">Beat keyframes + visual timeline editor — ✓ shipped</text>
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

## Phase 0 — Foundation ✅ Shipped

The highest return for the least effort — and the base everything else builds on. **This phase has
shipped.**

- **Site-wide smooth scroll** — ✅ shipped as [Smooth Scroll](/animation-engine/smooth-scroll)
  (Theme Settings → Site-wide UX → Smooth Scroll), Lenis-powered momentum across the whole page.
- **One scroll engine** — ✅ shipped. Smooth Scroll and [Scroll Loop](/animation-engine/scroll-loop)
  share a single Lenis instance through the `window.__upwLenis` singleton (whichever boots first owns
  it), so everything that scrolls scrubs against the same clock and enabling both never spawns two.
- **Shared guardrails** — a common reduced-motion + mobile-throttle + off-screen-pause discipline
  every effect follows (see [Performance](/animation-engine/performance)).

**Outcome:** the whole engine feels like one polished system, and future scroll features get cheaper.

## Phase 1 — Motion timeline (the pragmatic 80%, then the visual editor)

Three stages that ladder up — each useful on its own, all writing the **same native builder
options** (see [Area 2](./focus-areas#area-2--a-real-motion-timeline) for the full rationale).
**All three stages (1a, 1b, 1c) have shipped** — the motion timeline is complete.

- **1a · Beat keyframes (native).** ✅ **Shipped as [Scroll Keyframes](/animation-engine/scroll-keyframes)** —
  move any element through Start / Middle / End keyframed states as you scroll, each with an easing
  pick, auto-driven from a [Scroll Story](/animation-engine/scrollytelling) scene or the element's own
  viewport travel. Basic controls in the element panel; the finer knobs (offsets, stagger, custom
  easing, trigger ranges) in the **Advanced** box.
- **1b · The Scroll Timeline Editor (visual).** A tracks-and-keyframes editor built by **reusing the
  Kinetic Scenes timeline**, with the playhead driven by **scroll instead of a clock** — a pinned
  Section is the fixed stage, its `vh` pin length the scrubbable axis. It reads and writes the same
  options as **1a** — a view over the settings, never a separate scene file.
  - **Phase 1 ✅ shipped — the visual timeline surface + live scrub.** A front-end, admin-only
    **[Scroll Timeline](/animation-engine/scroll-timeline)**: a video-editor-style, bottom-docked
    panel with **one track per scroll animation** on the page, each a block on a readable **0–100 %
    scroll axis**, a **draggable playhead that scrubs the real page live** (scrub-linked animations
    animate as you drag), a **scroll %/active** read-out, and **element highlighting** on hover.
    Open with **Shift + T** or the Timeline button (bottom-right). This is the editor *shell* and the
    scrubbing substrate — it reads every live ScrollTrigger, where the elements actually exist, which
    is why it lives on the front end rather than inside a builder modal.
  - **Phase 2 ✅ shipped — drag-to-retime, persisted.** Scroll Motion tracks are editable: **drag the
    block** to move an animation's **start** (scrub blocks keep their length), **drag the right handle**
    to move a scrub block's **end**. It previews live and **persists** to a per-page store
    (`_upw_timing_overrides` post meta) keyed by a stable per-element key — **never the builder JSON**, so
    it survives re-imports and the manual-edit guard — and the runtime applies it for **every visitor**,
    not just in the editor. Each edited track gets a **reset (↺)**. Non-Scroll-Motion triggers show as
    `locked`.
  - **Phase 3a ✅ shipped — keyframe lanes (beat positions).** A [Scroll Keyframes](/animation-engine/scroll-keyframes)
    element now appears on the timeline as a lane with a **diamond per beat** (Start → Middle → End, or a
    Pin · Hold · Exit's enter / appear / hold / exit). **Drag an interior beat** to retime *when* it lands;
    it clamps between its neighbours, previews live, and **persists** to the same per-page store as
    drag-to-retime (`_upw_timing_overrides`, keyed by the element's stable key — never the builder JSON),
    so it ships for **every visitor** and resets with ↺. Scroll Keyframes elements aren't GSAP triggers
    (they ride the shared frame loop), so the editor surfaces them directly.
  - **Phase 3b ✅ shipped — beat states on the lane.** **Click a beat** (any diamond) to edit its **state**
    — the eight animatable props (X, Y, scale, rotate, rotate X/Y, opacity, blur) + the **ease** — in a small
    inline editor; the page seeks to that beat so you edit against its live pose, every change previews live,
    and it **persists as a diff** from the authored values into the same `_upw_timing_overrides` store (never
    the builder JSON), shipping to **every visitor**. Per-beat ↺ and whole-track ↺. The override *is* the
    compile target — a native, framework-free editor on the existing overlay, rather than embedding the
    Kinetic Scenes React component into the front-end tool (see Design Decisions,
    "keyframe-lane-native-editor"). **This completes item 1b — the motion timeline.**
  <br />*How it landed:* rather than embedding the Kinetic Scenes React editor into the admin-only,
  framework-free front-end overlay, the lane edits the element's **native Scroll Keyframes options in place**
  and persists them as an additive per-page override — the override *is* the compile target, so there's no
  stored scene file to keep in sync. (The Kinetic Scenes keyframe editor stays the richer authoring surface
  for full scenes.) See the Design Decisions log ("keyframe-lane-native-editor").
- **1c · Page-level choreography.** ✅ **Shipped (read-only)** as the **Scroll Ruler** — an admin-only
  front-end overlay (⟺ button bottom-left, or Shift+R) that lists every GSAP ScrollTrigger on the page
  (its element, start/end scroll positions, pin and scrub flags) and maps all their ranges onto a vertical
  ruler with a live playhead; click a row or a bar to jump to that trigger. The page-level view of "what
  pins / scrubs where" when composing scroll choreography. A richer **horizontal** view of the same data —
  with a **scrubbing** playhead — now also ships as the **[Scroll Timeline](/animation-engine/scroll-timeline)**
  (1b Phase 1 above). *Editable (drag ranges) is the next step for both.*

## Scroll Choreography & gallery chaining

The [Motion Gallery](/animation-engine/motion-gallery)'s version of the motion timeline: galleries whose
cards **assemble in, morph through arrangements, and exit — all driven by scroll** — and, chained, several
galleries that **hand off one to the next** down the page. The end goal is the author's model: *add N
gallery shortcodes, configure each independently, and they connect into one scroll sequence.*
(Decisions: [motion-gallery-scroll-choreography](/decisions/motion-gallery-scroll-choreography),
[gallery-choreography-chaining](/decisions/gallery-choreography-chaining).)

**Engine — on GSAP + ScrollTrigger.** Rather than a hand-rolled rAF loop, the choreography runs on a
pinned, scrubbed **ScrollTrigger** driving a pose engine (per-card poses for each formation, with per-step
holds, cascade and easing). This is the same timeline substrate the engine's [Motion Sequence](/animation-engine/)
("choreography without code") already uses, so chaining can reuse it. *Finding: GSAP **Flip** is ideal for
non-pinned layout reflows but unreliable under a pinned+scrubbed trigger (its absolute coordinates shift when
the stage goes `position: fixed`), so pinned choreography uses the pose engine, not Flip.*

- **A per-step `scroll_choreography`** (🧪 prototyped): an ordered, addable **Steps** list — each step a
  formation with its own **hold** — that the cards morph through (stack → grid → ring → sphere → exit…),
  reorderable, any number of steps. GSAP-driven, pinned + scrubbed.
- **Chaining** (🧪 prototyped): several choreography galleries on one page **each pin, play, and hand off**
  as you scroll — GSAP ScrollTrigger sequences pinned sections automatically (offsetting each for the
  earlier pins). *This is the sequential mode; the overlap handoff below supersedes it for a connected feel.*
- **Overlap handoff** (✅ built): a container marked `.tdg-choreo-chain` **overlays** its galleries and drives
  **one** pinned, scrubbed master GSAP timeline that nests each gallery's pose sub-timeline placed with an
  overlap at the seams — so gallery 1 flies out *as* gallery 2 assembles in, and so on ("connected as one").
  The pose engine is extracted into a shared `choreoPoser(el)` the master timeline reuses per gallery; each
  gallery stays a real, independently-configured Motion Gallery shortcode. *Proven end-to-end (one master
  ScrollTrigger, 3 galleries, clean handoff at each seam).*
- **Authoring — the Chain switch** (✅ built): each Scroll-Choreography gallery has a **"Chain with
  adjacent galleries"** toggle. Drop several galleries next to each other in one column, tick Chain on
  each, and the runtime **auto-groups** the adjacent chained galleries into a `.tdg-choreo-chain` wrapper
  and drives the overlap handoff — no container class, no hidden step list. This is the author's original
  model: *add N real gallery shortcodes, configure each, they connect into one sequence.* *(Verified: 3
  stacked galleries, Chain on, auto-wrapped into one master ScrollTrigger with clean handoffs.)*
- **Real-design layouts** (✅ built): give each gallery design a declarative resting layout so a step
  is a *real* design, not an abstract formation. Most designs already have a faithful formation proxy
  (ring ≈ Carousel Ring, wall ≈ Panorama Wall, sphere ≈ Card Sphere, tunnel ≈ Card Tunnel, spiral ≈ Spiral
  Stream…); the designs that had **no** faithful look are being added as choreography steps — so far
  **Cover Flow** (one flat front card with steeply angled, receding neighbours), **Film Strip** (an even
  horizontal reel), **Orbit** (a tilted elliptical halo of cards) and **Hero Reel** (one large hero card
  over a thumbnail row), **Focus Slider** (a big centre card with peeking neighbours), **Depth Stack** (cards
  receding straight into depth) and **Mosaic** (a packed collage of varied tiles) — **19 looks total**.
  *All verified live.* And the **declarative registry** is in: a design or child theme contributes a resting
  pose through the `fw_gallery_3d_choreo_formations` PHP filter (it then appears in the Steps picker and
  passes the view whitelist) plus `window.upwGallery3dForms.<name> = fn(N)` in the head (or
  `window.upwGallery3d.registerChoreoForm` at runtime) — **no core edit**. *Proven end-to-end with a
  non-core "ribbon" formation rendering from a drop-in alone.*
- **Authoring polish** (🚧 mostly done): **cross-section grouping** is in — the Chain switch now groups
  consecutive chained galleries whether they're stacked in one column **or each dropped in its own section**;
  the runtime relocates them into one overlay wrapper and non-destructively hides the emptied sections. *Both
  cases verified (one master ScrollTrigger, clean handoff, no empty gaps).* Still ahead: a right-click *Create
  choreography* builder helper, and retiring the standalone abstract `scroll_choreography` steps design once
  native chaining is the only authoring path.

## Phase 2 — Real 3D scenes

- **A parametric "3D Scene" element** — a few pre-built, scroll-scrubbed camera scenes (gallery
  dolly, product orbit, image tunnel). You supply the media and tune a few knobs; the scene and its
  camera choreography are built in.
- **Stretch:** a real-WebGL variant of the [Motion Gallery](/animation-engine/motion-gallery) for true depth,
  lighting and reflection.

## Phase 3 — Flourishes

- **Rive elements** (interactive vector motion) — ✅ **shipped as [Rive](/animation-engine/rive)**:
  stateful vector animations with live inputs, data binding, asset swaps and JS control.
- **Curated WebGL image transitions** — ✅ **shipped** as the **Image Transitions** preset in
  [WebGL Object](/animation-engine/webgl-object): a multi-image slideshow that cross-fades from one image to
  the next on a loop with a **fade / ripple / liquid-dissolve / displace / wave** shader, with per-preset
  time-per-image, transition length and effect strength. Reuses the full-screen-quad shader path (two
  textures + an animated `uProgress`). *Verified live (5-image loop, images render crisply and advance).*
- **Richer particle presets** — ✅ **shipped**: the Particle Field preset gains a **Formation** control —
  **sphere / galaxy / ring / wave grid / cloud / helix** — each a distinct position generator the cloud
  settles into (and still rotates + reacts to the pointer). *This closes the Phase 3 WebGL flourish.*

## Growing the engine from demand ✅ Shipped

Beyond the planned phases, the engine grows from **real use**: when AI-assisted creation hits a motion
it doesn't cover yet, a **gap → fallback → report → promote** loop adds it cleanly and feeds demand back
in. Both enablers this needed — a Motion Gallery design-registration filter and the child-theme effect
recipe — have shipped, so this now works end to end.

➡️ **This is a shipped capability, documented in full on its own page: [Extending the engine](./extending-the-engine).**
(Decision: [gap-report-loop](/decisions/animation-engine-gap-report-loop).)

## At a glance

| Phase | Deliverable | Impact | Status |
| --- | --- | --- | --- |
| **0** | Site-wide smooth scroll + one scroll engine + shared guardrails | Very high | ✅ Shipped |
| **1** | Beat keyframes (the timeline "80%") → visual editor | High | ✅ Shipped (1a · 1b · 1c) |
| **2** | Parametric scroll-camera 3D scene element | Very high | Planned |
| **3** | Rive + WebGL image transitions + particle presets | Medium–High | Rive ✅ · rest planned |

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

:::info[Where this connects]
The engine is already built this way — see [Performance](/animation-engine/performance) for how a
page loads only the effects it actually uses. The roadmap keeps that discipline as it grows.
:::
