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

## Style tab

**Fit** (contain / cover / fill / fit-width / fit-height / none), **Alignment**, **Height**, **Trim empty space**, and a **Background** (transparent by default — Rive files usually are).

**Trim empty space** (on by default) shrinks the element to the animation's own aspect ratio, centered, so a *contained* artboard leaves no empty canvas around it — the hover/click area then matches the artwork instead of the full column width. Turn it off to let the canvas fill the whole column.

## Advanced tab

A **fallback poster** (shown if the runtime can't load, and as the still image under *reduce motion*), plus **CSS ID / Class / Custom CSS**.

## Performance & accessibility

- **Canvas-rendered** — no WebGL needed; runs where 2D canvas runs.
- **Respects reduced motion** — a visitor with *reduce motion* set gets the poster (or a single static frame), never the animation.
- **Pauses off-screen and when the tab is hidden**; the runtime + WASM load **only on pages that use the element** and are shared across every Rive element on the page.
- **Vector + tiny** — resolution-independent and usually a few KB; real content stays in the page, the animation is an enhancement layer.

## Live demo

**→ [See it in the Animation Engine demos](https://demos.unysonplus.com/animation-engine/rive/)** — an interactive State-Machine car (click to fire its trigger), plus play-on-hover and play-on-view examples.

## Steps

1. Add a **Rive** element (builder palette → **Animation Engine**).
2. On the **Animation** tab, upload your `.riv`; for interactivity, enter the **State Machine** name exactly as it appears in Rive.
3. Choose how it **Plays** — Autoplay, On view, On hover, On click, or Scroll-scrub.
4. On **Style** set the Fit, height and background; on **Advanced** add a **fallback poster**. Save.
