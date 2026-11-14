---
sidebar_position: 5.5
title: Extending the engine
slug: /3d-motion-roadmap/extending-the-engine
description: How the Animation Engine is extended today — per-element effects and Motion Gallery designs register from a child theme, an AI agent discovers the natives first, and a gap → fallback → report loop grows the engine from real demand.
---

# Extending the engine

:::tip[Shipped capability]
This page documents how the engine is extended **today** — not a plan. The two enablers it needed
(gallery design registration and the child-theme effect recipe) have shipped.
:::

The engine isn't a closed list of effects. New motion can be added **from a child theme**, without
editing the plugin, through the same hooks the built-in modules use. That extensibility is what makes
the **gap → fallback → report → promote** loop below possible: when AI-assisted creation hits a motion
the engine doesn't cover yet, the agent can add it cleanly instead of writing throwaway code.

## What's pluggable

### Per-element effects

A child theme can register a new per-element effect (an Animations-tab option on any element) with the
same three hooks the built-in modules use:

| Hook | Role |
| --- | --- |
| `sc_animation_fields` | Adds the effect's option to the Animations tab. |
| `sc_build_wrapper_attr` | Emits the effect's config as `data-` attributes on the element wrapper. |
| `sc_needs_wrapper` | Declares that the element needs the wrapper. |

Plus a small runtime that reads those attributes. A child-theme effect registered this way is a
**first-class effect**, not a bolt-on.

### Motion Gallery designs

[Motion Gallery](/animation-engine/motion-gallery) designs used to be a hardcoded list. A child theme (or a
plugin, or an mu-plugin) can now add its own design, and it then sits in the Design picker beside the built-in
ones. There are four touch points:

| Touch point | Role |
| --- | --- |
| `upw_gallery_3d_design_groups` | Adds the design to the picker, with its label and thumbnail. |
| `upw_gallery_3d_render_designs` | Allows the design to render (else it silently falls back to the default design). |
| `upw_gallery_3d_design_assets` | Enqueues the design's driver JS/CSS, only on pages where a gallery uses it. |
| `window.upwGallery3d.registerDesign(key, build)` | The JS driver that lays out and moves the cards. |

One **design key** ties them together: the key you register (`my_arc_deck` below) is the picker value, the
gallery's class (`.tdg--my-arc-deck`, underscores become hyphens), the asset entry and the JS registration.

#### 1. Register the design (PHP)

In the child theme's `functions.php` (or a plugin):

```php
// The picker: add a group (a tab) with one design, or add a design to an existing group's 'designs'.
add_filter( 'upw_gallery_3d_design_groups', function ( $groups ) {
	$groups['grp_my_designs'] = array(
		'label'   => __( 'My designs', 'my-theme' ),
		'designs' => array(
			'my_arc_deck' => array(
				'label' => __( 'Arc Deck', 'my-theme' ),
				'tile'  => get_stylesheet_directory_uri() . '/gallery-designs/arc-deck.svg',
			),
		),
	);
	return $groups;
} );

// Allow it to render.
add_filter( 'upw_gallery_3d_render_designs', function ( $designs ) {
	$designs[] = 'my_arc_deck';
	return $designs;
} );

// Load its driver, only on pages that use it.
add_filter( 'upw_gallery_3d_design_assets', function ( $assets ) {
	$assets['my_arc_deck'] = array(
		'js'  => get_stylesheet_directory_uri() . '/gallery-designs/arc-deck.js',
		'css' => '', // optional stylesheet
		'ver' => '1.0.0',
	);
	return $assets;
} );
```

To add the design to a built-in tab instead of a new one, add it to that group's `designs`, for example
`$groups['grp_stack']['designs']['my_arc_deck'] = array( … );`.

#### 2. The picker thumbnail

Every design in the picker shows a thumbnail tile. **Give a custom design its own with the `'tile'` key**, the
URL of an image. If you pass only a label (`'my_arc_deck' => 'Arc Deck'`), the picker looks for the thumbnail
in the Animation Engine's own image folder, finds nothing and shows a broken image.

- **Format:** an SVG is best (sharp at every size, a few hundred bytes); a PNG or WebP works too.
- **Size and shape:** 3:2 landscape. The built-in tiles use `viewBox="0 0 96 64"`; the picker shows it 62 px
  tall in the grid and 130 px tall in the larger preview when you hover over a tile.
- **Style:** to match the built-in tiles, draw a simple diagram of the layout (a few rounded rectangles for the
  cards, the focused one in a blue gradient, on a transparent background) rather than a photo.

A thumbnail matching the built-in ones:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 64" fill="none">
<defs><linearGradient id="A" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#cfe2ff"/><stop offset="1" stop-color="#2f74e6"/></linearGradient></defs>
<g stroke="#0f1424" stroke-width=".5">
<rect x="6" y="14" width="16" height="22" rx="2" fill="#9aa3b5" transform="rotate(-14 14 25)"/>
<rect x="74" y="14" width="16" height="22" rx="2" fill="#9aa3b5" transform="rotate(14 82 25)"/>
<rect x="20" y="22" width="17" height="24" rx="2" fill="#5d6886" transform="rotate(-7 28 34)"/>
<rect x="59" y="22" width="17" height="24" rx="2" fill="#5d6886" transform="rotate(7 68 34)"/>
<rect x="36" y="24" width="24" height="32" rx="2" fill="url(#A)"/>
</g>
</svg>
```

#### 3. The driver (JS)

```js
( function () {
	if ( ! window.upwGallery3d || ! window.upwGallery3d.registerDesign ) { return; }
	window.upwGallery3d.registerDesign( 'my_arc_deck', function ( ctx ) {
		var cards = ctx.cards, n = cards.length;
		if ( ! n ) { return; }
		ctx.stage.style.perspective = '1200px';
		var pose = function ( p ) {                         // p: 0..1, which card is in front
			cards.forEach( function ( card, i ) {
				var a = ( i / Math.max( 1, n - 1 ) - p ) * 2;   // -1..1 around the front card
				card.style.transform = 'translateX(' + a * 40 + '%) rotateY(' + a * -25 + 'deg) translateZ(' + ( -Math.abs( a ) * 200 ) + 'px)';
				card.style.zIndex = String( 100 - Math.round( Math.abs( a ) * 50 ) );
			} );
		};
		if ( ctx.reduce ) { pose( 0.5 ); return; }          // reduced motion: one still layout
		// ctx.loop() runs every frame while the gallery is on screen; it freezes in the editor and stops
		// when the builder's preview rebuilds, like the built-in designs.
		ctx.loop( function () { pose( ctx.progress() ); } ); // progress(): 0..1 as the gallery scrolls past
	} );
} )();
```

The driver is handed the same `ctx` primitives the built-ins use: the stage, the cards, a scroll
`progress()`, `attachDrag`, a generation-stamped `loop()` (freezes in the editor, dies on a preview rebuild)
and a pre-resolved `reduce` flag (the visitor asked for reduced motion: show a still layout). Use them rather
than your own `requestAnimationFrame` and listeners, so the design behaves exactly like a native one.

#### What a custom design does not get (yet)

- **Its own settings.** The picker shows the design, but no design-specific controls appear under it. The
  shared options (images, captions, lightbox, card style, motion) still apply.
- **The builder's live preview.** The Design tab's preview draws only the built-in designs; for a custom
  design it shows the default design. Check yours on the page or in the Live Editor.

#### A working example

The demos site runs this exact pattern as an mu-plugin, the **Arc Deck** design in an "Extensible (demo)" tab,
with its own thumbnail and a demo page at `/motion-gallery/demo-arc-deck/`.

### Discoverable by the AI

So an AI agent reproducing a source's motion can **try a native effect first** (the cheapest, most
native result), the engine exposes read-only catalogue abilities to the AI Assistant:

- **`animation-effects`** — every per-element effect field an element offers, with its choices and
  per-effect settings.
- **`animation-gallery-designs`** — every Motion Gallery design, including child-theme-registered ones
  (flagged `custom`), so the agent sees the whole catalogue before writing anything.

## The gap → fallback → report → promote loop

The phases on the [roadmap](./roadmap) are the *planned* build; this is how the engine grows from
**real use**. As AI-assisted creation and replication becomes the focus, an agent reproducing a
source's motion will routinely hit an animation the engine doesn't cover yet. Rather than let it write
throwaway bespoke code, the engine reuses the Site Converter's findings loop, pointed at motion
(decision: [gap-report-loop](/decisions/animation-engine-gap-report-loop)):

1. **Try a native effect first.** The agent consults the catalogue abilities above and uses a built-in
   effect or gallery design wherever one fits.
2. **Else write a scoped, labelled child-theme fallback.** Using the hooks above, so the site works
   today. The fallback carries a stable label / `data-` key tied to its **report id**, honours
   reduce-motion, and loads on demand — so it **migrates off cleanly** when the effect later ships
   natively.
3. **Always report the gap.** A **fixture-backed** finding (the captured source motion + the fallback
   produced, keyed to a neutral fixture id — never the source site's name) goes to the shared ledger.
   Never silently absorb a gap.
4. **Promote by demand, gated on quality.** The ledger's **frequency** decides which gaps become native
   first; a pattern earns a native preset only when it can be **reusable, reduce-motion-aware and
   performant** — site-specific one-offs stay child-theme fallbacks.

**Why it matters:** every gap becomes data, the engine grows in priority order toward the long tail, and
the token economics compound — a scoped fallback is cheap once, a promoted native effect is near-zero
tokens for every future agent.

:::info[The recipe]
The step-by-step pattern — the label / `data-` key → report-id convention, the reduce-motion branch,
and the report — lives in the AI Dev Kit's child-theme fallback recipe, covering both per-element
effects and gallery designs.
:::
