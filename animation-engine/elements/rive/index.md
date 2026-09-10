---
sidebar_position: 11.7
title: Rive Animation
slug: /rive
---

# Rive Animation

Drop a real **[Rive](https://rive.app) animation** onto any page — interactive vector graphics that react to **hover, click, scroll or view** at 60fps, in a file that's usually a few KB. Not a video, not a GIF: a live animation with a **State Machine** you design in the Rive editor.

<img src="/img/shortcodes/rive-demo.png" alt="A Rive animation on a page — a detailed illustrated off-road 4x4 with luggage and a rubber duck, playing on a gradient background" width="720" />

Rendered on a **canvas** (no WebGL required), loaded **only on pages that use it**, and safe by default: it falls back to a poster (or the first frame) when the runtime can't load or the visitor has *reduce motion* on.

## Add it

Builder palette → **Animation Engine** → **Rive Animation**. Upload a `.riv` in the Media Library (the engine enables that file type) or paste a direct `.riv` URL. Export the `.riv` from the [Rive editor](https://rive.app).

## What Rive can do

A `.riv` is more than a timeline — it's a small **visual logic graph** (a **State Machine**) with **inputs** you drive at runtime:

- **Triggers** — fire-once events (a "bump", a button press, a success burst).
- **Booleans** — on/off states (hovered, toggled, open).
- **Numbers** — continuous values you feed in; **blend states** interpolate smoothly between animations as the number changes (a gauge needle, a character turning to face the pointer, a progress fill).

State Machines can carry their own **pointer listeners**, so a well-built file reacts to hover and click with no configuration. This element then adds the page-side plumbing — *when* it plays and how the pointer/scroll feed it. (Rive's newer **data-binding** and **events → JavaScript** features aren't surfaced by this element yet.)

## Animation tab

| Option | What it does |
| --- | --- |
| **Rive file (.riv)** | Upload or pick a `.riv` from the Media Library. `.riv` uploads are enabled by the engine. |
| **…or a .riv URL** | Paste a direct `.riv` URL instead (takes priority over the upload). |
| **State Machine** | The State Machine to run — **recommended**, since it's what makes Rive interactive. Copy the name exactly as it appears in Rive. |
| **Animation** | Used only when no State Machine is set — a specific timeline to play (empty = the file's default). |
| **Artboard** | Optional — a specific artboard by name. |
| **Click fires trigger** | Optional — the name of a State Machine **Trigger** input to fire on click (a "bump", a button press…). For files whose State Machine doesn't carry its own pointer listeners. |
| **Plays** | **Autoplay** (pauses off-screen) · **On view** · **On hover** · **On click** · **Scroll-scrub**. |
| **Scroll input** (scroll-scrub) | The name of a **Number** input in your State Machine — the scroll position (0–100) is written to it, so you design the SM to blend on that input as the visitor scrolls. |

:::tip[Interactivity: listeners vs. triggers]
State Machines that carry their own pointer **listeners** react to hover/click automatically. For a State Machine that only exposes a **trigger** input (no built-in listener), use **Click fires trigger** to fire it on click.
:::

### Events → page actions

A State Machine can **emit events** at runtime (Rive editor → **Events** tab) — for example an *Open URL* event on a button, or a named event when an animation reaches a milestone. The **Events** group (Animation tab) lets those drive the page. Both are **off by default**, so a `.riv` can't navigate or fire hooks unless you allow it:

| Option | What it does |
| --- | --- |
| **Follow "Open URL" events** | When the animation fires a Rive **Open URL** event, navigate to that URL — turning a Rive graphic into a real link/menu/button. Only `http` / `https` / `mailto` / `tel` links are followed (`javascript:` / `data:` are ignored); `_blank` opens with `noopener`. |
| **Open link in** | How to open a followed Open-URL event — the event's own target, the same tab, or a new tab. |
| **Emit a JS event** | Dispatch a DOM **`fwRiveEvent`** CustomEvent for every Rive event, so your own JavaScript can react — fire analytics, open a modal, and so on. |

The **JS hook** is the safe way to wire custom behaviour (it dispatches data, never runs code from the file). Listen for it anywhere on the page:

```js
document.addEventListener('fwRiveEvent', function (e) {
  // e.detail = { name, type, properties, url, target, element }
  if (e.detail.name === 'purchase') openCart();
  console.log('Rive event:', e.detail.name, e.detail.properties);
});
```

### Data bindings

Rive's **data binding** (a file's *View Model*) exposes named properties you can set at runtime. The **Data bindings** list (Animation tab) drives them from the builder — so **one `.riv` becomes a live label, counter, progress value or brand re-theme** without re-exporting. Add a row per property:

| Field | What it does |
| --- | --- |
| **Property name / path** | The View-Model property, e.g. `score`. A nested one uses `/` — `card/title`. Names come from the Rive editor's **Data** panel. |
| **Type** | **Text** · **Number** · **Boolean** (`yes`/`no`) · **Colour** (a hex like `#00b295`) · **Enum** (a value name) · **Trigger** (fires once on load, after the other bindings — handy to set an initial state). |
| **Value** | The value to set (empty for a Trigger). |

Missing properties are skipped silently, so a binding that doesn't match hurts nothing. Needs a `.riv` built with data binding.

### Asset swaps (images / fonts)

The image half of data binding: a `.riv` can **reference** images (an avatar, a product photo, a logo) or fonts instead of baking them in, and the **Swap file assets** list replaces them with your own — from the Media Library, a URL, or your data. Add a row per asset:

| Field | What it does |
| --- | --- |
| **Asset name** | The asset's name exactly as it appears in the Rive editor's **Assets** panel (e.g. `avatar.png`). |
| **Image** | Upload / pick the replacement image from the Media Library. |
| **…or a URL** | A direct image *or* font URL (takes priority) — use it for a `.ttf` / `.otf` / `.woff` font or a remote image. |

Only **referenced (“exported”) assets** can be swapped — mark an asset for export in the Rive editor. Unmatched names are left as the file's own asset.

### Live inputs (pointer / scroll)

Wire a **Number input** (or a View-Model number property) to a live page signal — the **pointer** or **scroll** — so the animation reacts continuously, no code: a character that follows the cursor, a gauge that tracks scroll, a value that sweeps with the mouse. Add a row per input:

| Field | What it does |
| --- | --- |
| **Number input / property** | The State-Machine Number input to drive (falls back to a View-Model number property of the same name). |
| **Driven by** | **Pointer X** (left→right) · **Pointer Y** (top→bottom) · **Pointer distance** (near→far) · **Scroll** (through the element). |
| **Maps to — min / max** | The output range: the value at signal 0 and at signal 1. |
| **Smoothing** | How much to ease toward the target each frame — 0 is instant, higher is floatier. |

It pauses off-screen and when the tab is hidden, and is skipped under *reduce motion*.

### Live control from JavaScript

Every Rive element exposes a control handle so your own scripts can drive it at runtime — the same one that makes bindings **live** (a real counter, a colour picker, data from your app or a REST call), not just static builder values. Reach an instance two ways:

- `el.fwRive` — the handle on the element's wrapper (`document.querySelector('#my-rive').fwRive`).
- `window.fwRive.get(target)` — where `target` is the element, a CSS id, or a selector.

A **`fwRiveReady`** event (bubbles) fires when an instance becomes drivable. The handle's methods:

| Method | Does |
| --- | --- |
| `play()` · `pause()` · `stop()` | Playback. |
| `fireTrigger(name)` | Fire a State-Machine **trigger** input. |
| `setInput(name, value)` · `getInput(name)` | Set / read a State-Machine **number/boolean** input. |
| `setBinding(prop, value, type?)` · `getBinding(prop, type?)` | Set / read a **data-binding** (View-Model) property. `type` is `text` / `number` / `boolean` / `color` / `enum` (inferred for text/number/boolean). |
| `.rive` | The raw Rive instance (escape hatch). |

```js
document.addEventListener('fwRiveReady', function (e) {
  var r = e.detail.api;            // or window.fwRive.get('#hero-rive')
  r.setBinding('score', 42, 'number');
  r.setBinding('theme', '#00b295', 'color');
});
```

## Style tab

**Fit** (contain / cover / fill / fit-width / fit-height / none), **Alignment**, **Height**, **Trim empty space**, a **Background** (transparent by default — Rive files usually are), and **Margin & Padding**.

**Trim empty space** (on by default) shrinks the element to the animation's own aspect ratio, centered, so a *contained* artboard leaves no empty canvas around it — the hover/click area then matches the artwork instead of the full column width. Turn it off to let the canvas fill the whole column.

## Animations tab

Like every element, Rive carries the shared **Animations** tab — an **entrance animation**, **scroll motion** / parallax, hover effects and the rest — applied to the element wrapper. Use it to fade or reveal the Rive element as it scrolls in, or to move it with the page. (This is separate from the animation *inside* the `.riv`, which the Animation tab configures.)

## Advanced tab

A Rive-specific **fallback poster** (shown if the runtime can't load, and as the still image under *reduce motion*), then the standard element controls: **CSS ID / Class / Custom CSS**, **position + z-index**, **responsive visibility**, **display conditions** and **custom attributes**.

## Performance & accessibility

- **Canvas-rendered** — no WebGL needed; runs where 2D canvas runs.
- **Respects reduced motion** — a visitor with *reduce motion* set gets the poster (or a single static frame), never the animation.
- **Pauses off-screen and when the tab is hidden**; the runtime + WASM load **only on pages that use the element** and are shared across every Rive element on the page.
- **Vector + tiny** — resolution-independent and usually a few KB; real content stays in the page, the animation is an enhancement layer.

## Step-by-step guides

Setting up data-driven Rive — where the property names come from and how values are passed:

- **[Data binding](./data-binding.md)** — drive a file's title / labels / numbers / colours from the builder (the live-dashboard demo, built from scratch).
- **[Drive Rive from JavaScript](./live-js-control.md)** — reach an instance with `window.fwRive` and push **live** data (a REST poll / WebSocket) into it.
- **[Pointer & scroll inputs](./live-inputs.md)** — wire a Number input to the pointer or scroll, no code (cursor-follow characters, scroll gauges).
- **[Asset swaps](./asset-swaps.md)** — replace the images / fonts a `.riv` references with your own (avatars, product photos, logos, brand fonts).

## Live demo

**→ [See it in the Animation Engine demos](https://demos.unysonplus.com/animation-engine/rive/)** — an interactive State-Machine car (click to fire its trigger), play-on-hover and play-on-view examples, a **Rive button whose event your page handles** (the `fwRiveEvent` JS hook, live), a **data-bound dashboard** whose title, tickers and figures come from bound values (one file, any data), a **"push new figures"** button that updates it live via `window.fwRive`, a **scroll gauge** whose bar tracks your scroll — no code, and an **asset-swap** card whose three images are all swapped in from outside the `.riv`.

## Steps

1. Add a **Rive** element (builder palette → **Animation Engine**).
2. On the **Animation** tab, upload your `.riv`; for interactivity, enter the **State Machine** name exactly as it appears in Rive.
3. Choose how it **Plays** — Autoplay, On view, On hover, On click, or Scroll-scrub.
4. On **Style** set the Fit, height and background; on **Advanced** add a **fallback poster**. Save.
