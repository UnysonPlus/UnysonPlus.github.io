---
sidebar_position: 1
slug: /
title: "Animation Studio — timeline motion graphics for the web"
sidebar_label: "Animation Studio"
keywords: [html animation editor, gsap timeline editor, web motion graphics, animated hero section, kinetic typography html, three.js animation editor, ai animation generator]
description: "The plan for the Unyson+ Animation Studio: a browser editor for timeline motion graphics, with drag-and-drop presets, that exports plain HTML for website heroes and sections rather than video."
---

# Animation Studio

> **Alpha, live at [animation-studio.unysonplus.com](https://animation-studio.unysonplus.com/).** The player,
> the responsive stage, the editor, export, the Unyson+ element and AI assist (phases 1 to 5) are built. Alpha means features are still
> missing and the scene file format may change between versions; exported pages and embeds keep working
> regardless. This page records the plan and the decisions behind
> it; the [roadmap](./roadmap.mdx) tracks each task, and the [research](./research.md) page covers what
> already exists and what we borrow from it.

The Animation Studio is a browser editor for motion graphics: big kinetic type, shapes, images and 3D, laid
out on a timeline the way a video editor lays out clips. You drag a preset onto the timeline, change its
text, image or timing, and watch it play. The difference from a video tool is the output: the Studio
exports **plain HTML**, not an MP4. The result plays live in the page, stays sharp at any size, and weighs
kilobytes instead of megabytes.

It lives at **`animation-studio.unysonplus.com`**. The first target is **website heroes and sections**,
dropped into a Unyson+ page or embedded on any site.

## Two ways to make a scene

The Studio opens on a demo: a 38-second Unyson+ promo in six acts, each a group on the timeline, that uses every
preset. Open a group (double-click) to see how an act is built. **New** in the top bar starts an empty scene with the
same screen sizes and fonts; Undo brings the previous one back.

- **By hand.** Drag presets onto the timeline. Their defaults follow timing measured from professional motion
  design, and **Check scene** (the Check tab) points out what could be better while you work: text that leaves
  before it can be read, text too small on a screen size, text off the stage or sitting on other text, two clips
  fighting over one layer, and long stretches where nothing moves. Most items have a one-click fix, and
  **Apply all** runs every sure fix at once.
- **With AI, then by hand.** The **✦ AI assist** button (bottom right of the stage) opens a chat with the AI
  Dev Kit. Ask for a new scene, a change to the whole scene, or a change to the layers you selected. Every answer
  is one undo step with a **Go back to before this** link and a Check scene count; **Fix with AI** in the Check
  tab sends its findings to the AI. From there you keep refining by hand, with the same tools as above.

The rules the AI follows and the rules Check scene measures are the same set, so a scene the AI makes starts
close to clean.

### The preset library

Thirty-five presets in six groups. **Text:** Rise, Slam, Stretch, Scramble, Typewriter, Blur in, Flip, Tracking and
**Count up** (a number counts to its value, keeping its prefix, separators and suffix). **Reveal and exit:** Fade,
Wipe, **Soft wipe** (feathered edge), Iris, Slide, Grow, **Blinds** (staggered strips). **Move and scale:** Pop, Zoom,
Spin, **Turn** (3D), Keyframes, Custom code. **Emphasis:** Wave, Pulse, Shake, Float, Recolour, **Sheen** (one light
sweep). **Ambient and backgrounds:** **Drift** (a slow move and scale creep for held frames), **Gradient flow** (a
gradient fill flowing across a shape) and **Particles** (a seeded field of rising, falling or drifting dots). **3D:** Spin 3D,
Tumble in, Orbit and Camera push, for 3D layers.
Hover a preset in the library to see it play.

### Sound

**+ Audio** adds a voice-over, music or a sound effect. Audio sits on its own timeline rows with a waveform, so you
can line up words and motion by eye; drag to move it, drag an edge to trim, and set volume and fades in the Inspector.
On a web page, a scene with sound starts muted with a small **Tap for sound** button, because browsers block sound
until the visitor interacts. Presentations and full screen play sound from the first click, and video exports mix it
in. Next on the roadmap: styles, and a scene made automatically from your voice-over.

### Sound effects

The **Sounds** tab of the library holds 25 built-in sounds in five groups: movement (whoosh, swish, slide, spin),
clicks and taps (pop, click, tick, tap, typing, beep), hits and drops (impact, thud, sub hit, drop, glitch), tones and
chimes (chime, sparkle, success, notify) and textures and swells (riser, swell, shimmer, reveal). The player makes them
itself from a few lines of code, so there is nothing to download or license, and they sound the same in the Studio, on
your pages and in video exports. Click one to hear it.

- **On a clip.** Select a clip and pick a sound in its **Sound** section (or click **Add** in the Sounds tab). The sound
  plays when the clip starts, or on its last frame for a landing, and moves with the clip whenever you move or stretch
  it. Offset, volume and pitch fine-tune it; a small speaker on the clip shows it has one.
- **Suggested sounds.** **Add suggested sounds** gives a scene's key moments the sound that suits each preset (a slam
  gets an impact, a wipe a swish, a typewriter typing), about one every second and a half at most, so the sound
  supports the motion instead of piling up. Change or remove any of them afterwards.
- **On its own.** With no clip selected, **Add** puts the sound on the audio rows at the playhead, like a sound file.

AI assist uses the same sounds when you ask for a scene with sound, a video or an ad.

### Search engines and screen readers

A scene shows its words a few at a time, so every scene also carries them once as plain text, in reading order: the
headline as a heading, each act's headline one level below, the rest as paragraphs. Search engines index it and screen
readers read it, while visitors see the animation (screen readers skip the animated copy, so nothing is read twice). The
scene's **Search engines and screen readers** settings show exactly what is written, set the headline's level (Heading 2
by default; Heading 1 only when the scene is the page's main title) and can mark a scene **decorative** (no text at all).
The Studio Scene element in WordPress writes this text into the page's HTML, and the Studio's embed code and HTML export
include it too.

### Styles

A style is a look to build from: a colour palette, a font pairing, a motion personality (how headlines, supporting text
and shapes enter and leave, and how they ease), a pace and a sound palette. The **Styles** tab of the library has eight:
**Night**, **Clean**, **Kinetic**, **Pastel**, **Neon**, **Editorial**, **Playful** and **Luxe**. Hover a card to see
its title card play; click it for what you can do with it.

- **Apply to this scene.** Choose any of **Colours and fonts**, **Motion** and **Sounds**. Words and timing stay as
  they are. Colours are matched by their role (text, secondary text, accent, panels), each act's headline gets the
  style's display font, and entrances keep their variety: clips that entered differently before still do. Undo brings
  the previous look back.
- **New scene.** Starts a title card in the style (kicker, headline, a line and a supporting line), ready to edit.
- **Use with AI assist.** AI assist follows the style when it makes or changes a scene; a new scene gets exactly the
  style's colours and fonts. The style can also be picked in AI assist itself.
- **Save this scene as a style.** Takes your scene's colours, fonts, the presets it uses for each role and its sounds,
  and adds it to the list (kept in this browser).

### Share links

**Export → Share link** gives you a link with the whole scene inside it. Whoever opens it gets their own copy in the
Studio, to watch or change, and their own work comes back with Undo. Nothing is uploaded and no account is needed, so
sharing costs nothing to run. Scenes with uploaded images make long links; image addresses keep them short.

### Click-to-advance presentations

Turn a scene into a presentation: set **Advance** to **On click** in the scene's Playback settings and drop
**markers** on the timeline (**+ Marker**, or the M key, at the playhead). The scene then stops at each marker and waits
for a click, a tap or the arrow keys, with a small pulsing arrow as the cue; the left arrow goes back. Full screen (F)
is a presenter mode. Visitors who turn off animation jump from slide to slide.

### Video export

**Export → Video** turns a scene into an MP4 or WebM for social posts, presentations, or anywhere HTML can't go:
Full HD, HD, 4K, vertical (1080 × 1920) or square, at 24, 30 or 60 frames a second. The AI Dev Kit on your computer
renders it frame by frame, so every frame is exact, 3D included, however slow the machine. The size picks the layout:
a vertical video uses the scene's mobile layout, as a phone would. The kit needs ffmpeg; the Studio tells you how to
install it if it is missing.

### Full screen and transitions

The **full screen** icon at the right of the stage toolbar (or the **F** key) plays the scene at your screen's real
size, without the editor. Select a group and use **Transition to the next group** to hand it over to the next part
of the scene with a Crossfade, Push, Zoom through, Soft wipe, Blinds, Iris or 3D turn: a matched exit and entrance,
timed together, as ordinary clips you can still edit.

### 3D layers

**+ 3D** adds a 3D object to the scene: **3D text** with rounded edges, a **shape** (rounded box, sphere, ring,
knot, cylinder, crystal), your **logo** extruded from an SVG, or a **glTF / GLB model**. Pick a finish (matte, satin,
glossy, metal, chrome) and a resting pose; it is lit by a built-in studio environment with real reflections. The 3D
presets **Spin 3D**, **Tumble in**, **Orbit** and **Camera push** turn the object and move the camera, and the usual
presets (Fade, Slide, Pop…) work on it too. 3D is drawn from the timeline like everything else, so it scrubs, loops
and plays as the page scrolls. The 3D engine (three.js) loads only for scenes that have a 3D layer, so other scenes
stay as light as before.

### Keyframes and curves

When no preset does what you want, a **Keyframes** clip lets you set values by hand: Move X/Y, scale, rotation,
opacity and blur. Each property is its own track, moving between the keyframes that set it. Put the playhead
where you want a keyframe and click **Add keyframe at playhead**, or, with the clip selected, simply **drag the
layer on the stage**: that sets its position keyframe at the playhead. Diamonds on the timeline select
keyframes and drag them in time. For the move into each keyframe, pick an ease or draw a **custom curve** by
dragging two handles, including overshoot (above the box) and anticipation (below it).

### Scroll-linked playback

Set **Starts** to **As the page scrolls** and the page's scroll position becomes the playhead: scroll down to play,
up to rewind. **Pin while playing** holds the stage still (below the header height) for the **Scroll length** you
set, in screens; unpinned, the scene plays while it crosses the window. **Smoothing** lets the playhead glide to
the scroll position. **Try scrolling in a test page** (Inspector, Playback) opens the scene between stand-in page
content. The Studio Scene element offers the same choice, with its own Scroll length.

### Measured eases

Clips can use twelve **measured eases**, listed first in the Easing menu with what each is for: Soft land,
Snap and settle, Glide, Whip, Pop over, Crash in, Bounce hard, Cruise, Soft in-out, Gentle in, Leave and Crash
out. Exits default to **Leave**, which speeds up out of frame: an exit is new motion, not the entrance played
backwards. Staggered text presets have a **Rhythm** setting, natural (uneven, but the same on every play) or
even.

## Why HTML instead of video

- **Small.** A scene is a few kilobytes of data plus a shared player, not a multi-megabyte video file.
- **Sharp everywhere.** Text and shapes are drawn by the browser, so they stay crisp on any screen.
- **Real text.** Headlines remain text, so search engines, screen readers and translation tools can read
  them, and the words can change without re-rendering anything.
- **Interactive.** A scene can play on load, when it scrolls into view, or in step with the scroll.
- **Kind to motion-sensitive visitors.** Scenes respect the visitor's reduced-motion setting automatically.

## How it is built

The Studio has three parts, and each uses the technology that suits its job.

| Part | Technology | Why |
|---|---|---|
| **The editor** (timeline, canvas, panels) | React + TypeScript, built with Vite | A drag-and-drop timeline editor is a large interactive app that runs in the browser. It compiles to static files, so the server never runs Node.js. |
| **The player** (what an exported scene ships) | Plain JavaScript + GSAP, with three.js only when a scene uses 3D | It has to be tiny and work on any page, including inside WordPress. React stays in the editor and never ships with a scene. |
| **Hosting** | GitHub Pages | Free, and published automatically from the repository. The Studio needs no server of its own: it is static files, and the AI runs on each user's own computer. |

The editor is a static site. A GitHub Action builds it from the repository on each push and publishes it to
GitHub Pages under the `animation-studio.unysonplus.com` subdomain. A server only becomes necessary for
accounts and cloud saving, which come late in the [roadmap](./roadmap.mdx).

### The scene file

Everything rests on one data format, the **scene file** (JSON). It lists:

- **Tracks**, stacked like layers.
- **Clips** on each track. A clip is one preset placed at a time, with its own settings (text, image,
  colours, duration, easing).
- **Keyframes**, for anything animated by hand rather than by a preset.
- **Assets**: images, fonts and 3D models the scene uses.
- **Breakpoints**: the stage shape and any per-device overrides (see below).

The player reads a scene file and builds one GSAP timeline from it. Each preset is a small function that adds
its tweens to that timeline at the clip's start time. Because the timeline is the single source of truth, the
same scene file drives the editor's preview, the exported HTML, the page-builder element, the AI and, later,
video export.

**Every timeline is seekable and repeatable.** Scenes use no unseeded randomness and no real-time physics, so
any frame can be shown exactly at any moment. That keeps scrubbing frame-accurate in the editor and makes
thumbnails and video export possible later.

### Presets

Presets are the building blocks people drag in: text entrances (split, slam, scramble, stretch, glitch),
shape and line reveals, image wipes, counters, backgrounds, and 3D objects. They share a library with the
[Animation Engine](/animation-engine), so an effect built once is available in both places.

## The stage

A scene plays inside a **stage**: a box with a set shape, like a video frame. You design on a fixed canvas and
it plays the same everywhere. A single 16:9 box doesn't work for website heroes, though:

- On a 1920px-wide monitor, a 16:9 stage is 1080px tall, but the browser window is only about 950px tall
  once tabs and the address bar take their share.
- On a 390px-wide phone, the same stage is 219px tall, and large headline type becomes fine print.

So the stage is responsive in three ways.

1. **A shape per breakpoint.** Desktop, tablet and mobile each have their own aspect ratio (for example 16:9,
   4:3 and 4:5). There is one timeline; each breakpoint can override position, size and type size.
2. **A height mode per placement:**
   - **Ratio**: pure video behaviour. The stage keeps its shape, and the page scrolls if it is taller than the
     window.
   - **Ratio, capped to the window**: the stage never grows taller than the window minus the site header. This
     is the default for heroes, so the whole animation is on screen at first load.
   - **Fill the window**: exactly one screen tall, whatever its shape.
3. **A safe area.** The editor shows a central safe zone, as video editors do. Key text stays inside it and
   backgrounds bleed to the edges, so nothing important is cut off when a height mode trims the stage.

Sizes and positions are stored relative to the stage width (CSS container units) rather than by scaling a
fixed-size box. Text stays sharp and selectable, and the stage lays out like any other section.

## Exports

A finished scene can leave the Studio in three ways:

- **A standalone HTML file**: open it, host it, or send it.
- **An embed snippet** for any website.
- **A Unyson+ element**: a page-builder element plays the scene inside a Unyson+ page, with an
  **Open in Studio** button to edit it again.

Every export records the player version it was made with, so later changes to a preset never alter a scene
that is already published.

## AI

The AI runs through the [AI Dev Kit](/ai-dev-kit) on the user's own computer, using their own AI
subscription or a local model. The Studio sends the prompt to the kit, and the kit sends a scene back. The
Studio's server needs no AI keys and runs no AI calls, so there is no per-use cost to cover.

The AI writes a **scene file, not code**. It chooses presets from the catalogue and fills in their settings,
so everything it makes lands on the timeline as ordinary clips that can be moved, trimmed and edited by hand.
A **custom code clip** stays available as an escape hatch for effects no preset covers. It runs your own GSAP code
with the layer (`el`), the scene timeline (`tl`), `gsap` and the clip's start (`at`) and `duration`. Because it is real
JavaScript, it runs only where the page allows it: the Studio, your own downloads and embed codes (which add
`data-upw-allow-code`, and the Export window says so), and WordPress pages whose author may publish unfiltered HTML.
Elsewhere the player skips it and plays the rest. A clip that throws is logged and skipped. The AI never writes one.

How the connection works in practice:

- **The browser asks first.** Chrome and other browsers ask before a website may reach apps on your own
  computer ("…wants to access other apps and services on this device"). Choose **Allow** once. If it was
  refused, AI assist says so and shows where to turn it back on.
- **Only the Studio may call the kit.** The kit answers only the Studio's own address, so other websites cannot
  use your AI.

- **Who is answering is shown.** The panel names the AI at work, for example "Connected: Claude, your Claude
  subscription, through the AI Dev Kit", or the local model's name.
- **The Studio sends its own motion rules** with each request, so the kit never holds an out-of-date copy.

The AI Dev Kit's dashboard opens on a Home page showing each of its jobs (Site Converter, AI Assistant and
Animation Studio) and whether it is connected.

## Still to decide

- **Free or paid.** Whether the Studio is free with the AI optional, or tied to accounts from the start.
- **Where projects are saved.** In the browser and as downloadable project files at first, with cloud saving
  and accounts added later.
- **Playback beyond heroes.** Click-to-advance slides and longer presentations come after the hero and section
  use case works.
