/* eslint-disable */
/**
 * GENERATED — do not edit. Re-run: node src/components/Gallery3DPlayground/vendor.mjs
 *
 * The REAL Motion Gallery runtime (CSS + driver), vendored verbatim from the plugin
 * (framework/extensions/animation-engine/shortcodes/gallery-3d/static/). Only the auto-scan
 * bootstrap is replaced with the initEl() / bumpGen() exports below.
 */

export const GALLERY_CSS = "/**\n * Motion Gallery — base + Carousel Ring. Pure CSS 3D scene; gallery-3d.js sets the per-card\n * transforms, the ring rotation and (for Back Fade) per-card opacity at runtime.\n */\n\n.tdg {\n\tposition: relative;\n\twidth: 100%;\n\toverflow: hidden;\n\tbackground: var(--tdg-bg, transparent);\n}\n\n/* Stage Overflow = Spill (opt-in): stop clipping at the Stage Height frame so fanned / oversized\n * cards show in full. The wrapper AND the absolutely-positioned stage both open up, so the 3D scene\n * isn't cut at the box. The reserved layout height is unchanged (only Stage Height), so spilled cards\n * can visually overlap neighbours — the control's help asks for vertical breathing room. Designs that\n * clip at the stage on purpose (photo-scatter, hero-reel, mosaic-marquee, card-stack, …) are overridden\n * only when the author explicitly turns Spill on for that instance. */\n/* Spill releases the VERTICAL clip so fanned / oversized cards show in full above and below the stage,\n   but keeps the HORIZONTAL clip so wide layouts (totem/wall rows, off-screen reel cards) can't push the\n   page into a horizontal scrollbar. overflow-x:clip on the non-3D wrapper is safe; the stage stays\n   overflow:visible so it never flattens its preserve-3d. (clip in the x keeps y computed as visible.) */\n.tdg--spill { overflow-x: clip; overflow-y: visible; }\n.tdg--spill .tdg__stage { overflow: visible; }\n\n.tdg__stage {\n\tposition: absolute;\n\tinset: 0;\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: center;\n\ttransform-style: preserve-3d;\n\tperspective-origin: 50% 50%;\n\t/* perspective set by JS from the Perspective control */\n}\n\n/* Pin while scrubbing (Motion: Scroll-scrub): the wrapper is stretched by Scroll Length (see\n * view.php — height: stage + N×100vh, with --tdg-stage-h carrying the stage height) and the stage\n * STICKS, viewport-centred, while the wrapper scrolls past — so the visitor's scroll drives the\n * scrub across the whole pinned stretch, then the stage releases with the page. position:sticky\n * dies inside an overflow:hidden ancestor, so the wrapper opens up and the scene clip moves onto\n * the stage instead. */\n.tdg--pinned { overflow: visible; }\n.tdg--pinned .tdg__stage {\n\tposition: sticky;\n\tinset: auto;\n\ttop: max(0px, calc((100vh - var(--tdg-stage-h, 730px)) / 2));\n\twidth: 100%;\n\theight: var(--tdg-stage-h, 730px);\n\toverflow: hidden;\n}\n\n.tdg__ring {\n\tposition: absolute;\n\ttransform-style: preserve-3d;\n\twill-change: transform;\n\t/* transform (rotateX tilt + rotateY spin) set by JS */\n}\n\n/* Panorama Wall — stacked rows, each a scrolling cylinder of cards. Anchored at the stage centre so\n   it lines up with the perspective-origin (50% 50%) — otherwise the barrel skews to one corner. */\n.tdg__wall {\n\tposition: absolute;\n\tleft: 50%;\n\ttop: 50%;\n\ttransform-style: preserve-3d;\n\twill-change: transform;\n}\n.tdg__row {\n\tposition: absolute;\n\tleft: 50%;\n\ttop: 50%;\n\ttransform-style: preserve-3d;\n\twill-change: transform;\n}\n.tdg--panorama-wall .tdg__card { backface-visibility: hidden; }\n\n/* Card Sphere — bands (latitude rings) wrapped on a sphere. */\n.tdg__globe {\n\tposition: absolute;\n\ttransform-style: preserve-3d;\n\twill-change: transform;\n}\n.tdg__band {\n\tposition: absolute;\n\tleft: 50%;\n\ttop: 50%;\n\ttransform-style: preserve-3d;\n\twill-change: transform;\n}\n.tdg--card-sphere .tdg__card { backface-visibility: hidden; }\n\n/* Orbit Globe — billboarded cards distributed through a sphere volume (JS translate3d's each card;\n * the container itself does not rotate, so cards always face the camera). */\n.tdg__orbit {\n\tposition: absolute;\n\tleft: 50%;\n\ttop: 50%;\n\ttransform-style: preserve-3d;\n\twill-change: transform;\n}\n\n.tdg__card {\n\tposition: absolute;\n\tleft: 50%;\n\ttop: 50%;\n\taspect-ratio: var(--tdg-ratio, 1 / 1);\n\ttransform-style: preserve-3d;\n\twill-change: transform, opacity;\n\tbackface-visibility: visible;\n\t/* width / margins / transform set by JS */\n}\n\n.tdg__inner {\n\twidth: 100%;\n\theight: 100%;\n\tbox-sizing: border-box;\n\tborder-radius: var(--tdg-radius, 14px);\n\tpadding: var(--tdg-pad, 0);\n\toverflow: hidden;\n\t/* NOTE: the layout JS never poses .tdg__inner — it drives .tdg__card. That free seam is what the\n\t * built-in sequential Entrance uses (see .tdg--entrance below), so a per-card reveal composes with\n\t * the 3D motion instead of fighting it. */\n\t/* Card backing is TRANSPARENT so opaque photos sit flush and a thumbnail with a transparent\n\t * margin (documents / logos / alpha PNGs) shows the STAGE through it instead of a dark fill\n\t * reading as an unwanted black border. Set a Card Background / Box Preset (or Card Padding for the\n\t * polaroid frame) if you WANT a card colour behind the image. */\n}\n\n.tdg__link {\n\tdisplay: block;\n\tposition: relative;\n\twidth: 100%;\n\theight: 100%;\n\tborder-radius: inherit;\n\toverflow: hidden;\n\ttext-decoration: none;\n}\n\n.tdg__img {\n\tdisplay: block;\n\t/* !important defends against theme resets like `.content img { height: auto }` (higher specificity\n\t * than `.tdg__img`) — without a full 100% height, object-fit:cover can't fill the card and a card\n\t * whose ratio differs from the image (e.g. a portrait card + a square photo) shows empty space. */\n\twidth: 100% !important;\n\theight: 100% !important;\n\tobject-fit: cover;\n\tborder-radius: inherit;\n}\n\n.tdg__overlay {\n\tposition: absolute;\n\tinset: 0;\n\tdisplay: flex;\n\talign-items: flex-end;\n\tpadding: 10px 12px;\n\tbackground: linear-gradient(to top, rgba(0, 0, 0, 0.62), transparent 62%);\n\topacity: 0;\n\ttransition: opacity 0.3s ease;\n\tpointer-events: none;\n}\n.tdg__card:hover .tdg__overlay { opacity: 1; }\n.tdg__overlay-text { color: #fff; font-size: 13px; line-height: 1.3; }\n\n.tdg__caption {\n\tposition: absolute;\n\tleft: 0;\n\tright: 0;\n\tbottom: -1.6em;\n\ttext-align: center;\n\tfont-size: 12px;\n\topacity: 0.75;\n}\n\n.tdg--empty {\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: center;\n\tmin-height: 180px;\n\tborder: 1px dashed rgba(127, 127, 127, 0.4);\n\tborder-radius: 10px;\n}\n.tdg__empty { margin: 0; opacity: 0.6; font-size: 14px; }\n\n/* ---- Photo Scatter — photos scattered flat on a tabletop ---- */\n/* Clip to the stage: edge cards (and cards flying in from off-stage) bleed to the frame edge and are\n * cut there — a true edge-to-edge scatter — instead of pushing the page wider (horizontal scrollbar). */\n.tdg--photo-scatter { overflow: hidden; }\n.tdg--photo-scatter .tdg__stage { overflow: hidden; }\n/* Photos lie on a surface, so the card backing is TRANSPARENT — a document/logo thumbnail with a\n * transparent margin then shows the desk/stage through it (a page resting on the table) instead of\n * the dark default card fill reading as an unwanted black border. Opaque photos fill the card as\n * usual. (The generic dark `.tdg__inner` fill still applies to the 3D designs on dark stages.) */\n.tdg--photo-scatter .tdg__inner { background: transparent; box-shadow: none; }\n/* The scatter card is portrait (Card Ratio), but a square source image left its height:100% collapsing\n * to the image's own square aspect — so the photo only filled the TOP of the card and the card's\n * box-shadow sat detached below it (a \"spaced polaroid shadow\"). Pin the image to fill the whole card. */\n.tdg--photo-scatter .tdg__img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }\n.tdg--photo-scatter .tdg__plane {\n\tposition: absolute;\n\tinset: 0;\n}\n.tdg--photo-scatter .tdg__card {\n\tposition: absolute;\n\tleft: -200%; /* parked off-stage until the driver seats it */\n\ttop: 50%;\n\topacity: 0;\n\ttransition:\n\t\ttransform 0.95s cubic-bezier(0.22, 0.9, 0.24, 1),\n\t\topacity 0.6s ease;\n\twill-change: transform, opacity;\n\tbox-shadow: var(--tdg-shadow, 0 6px 16px rgba(0, 0, 0, 0.35));\n}\n.tdg--photo-scatter .tdg__card.is-set { pointer-events: auto; }\n.tdg--photo-scatter .tdg__card:not(.is-set) { pointer-events: none; }\n\n@media (prefers-reduced-motion: reduce) {\n\t.tdg__ring { will-change: auto; }\n\t.tdg--photo-scatter .tdg__card { transition: none; will-change: auto; }\n}\n\n/* =====================================================================================\n   Device Cycler — a device frame whose SCREEN cross-fades through the images (view modes).\n   ===================================================================================== */\n.tdg--device-cycler .tdg__stage { display: flex; align-items: center; justify-content: center; width: 100%; }\n.tdg--device-cycler .tdg__device { position: relative; width: var(--tdg-dev-w, 62%); max-width: 100%; margin-inline: auto; flex: 0 0 auto; }\n.tdg--device-cycler .tdg__screen {\n\tposition: relative; width: 100%; aspect-ratio: var(--tdg-ratio, 16 / 9);\n\toverflow: hidden; border-radius: var(--tdg-radius, 4px); background: #0b0b0d;\n}\n.tdg--device-cycler .tdg__plane { position: absolute; inset: 0; }\n.tdg--device-cycler .tdg__card { position: absolute; inset: 0; aspect-ratio: auto; opacity: 0; transition: opacity .55s ease, transform .55s ease; }\n.tdg--device-cycler .tdg__card.is-active { opacity: 1; }\n.tdg--device-cycler .tdg__inner, .tdg--device-cycler .tdg__link { position: absolute; inset: 0; display: block; padding: 0; border-radius: 0; }\n.tdg--device-cycler .tdg__img { width: 100%; height: 100%; object-fit: cover; display: block; }\n\n/* Transition variants */\n.tdg--device-cycler[data-tdg-transition=\"slide_up\"] .tdg__card { transform: translateY(7%); }\n.tdg--device-cycler[data-tdg-transition=\"slide_up\"] .tdg__card.is-active { transform: translateY(0); }\n.tdg--device-cycler[data-tdg-transition=\"slide_up\"] .tdg__card.is-past { transform: translateY(-7%); }\n.tdg--device-cycler[data-tdg-transition=\"none\"] .tdg__card { transition: none; }\n\n/* Laptop — screen bezel + a base bar below */\n.tdg--device-cycler .tdg__device--laptop .tdg__screen { border: 10px solid #1c1c1f; border-radius: 14px; box-shadow: 0 22px 50px rgba(0,0,0,.35); }\n.tdg--device-cycler .tdg__device--laptop::after { content: \"\"; display: block; width: 116%; margin: -1px 0 0 -8%; height: 15px; background: linear-gradient(#cbced4, #a7abb4); border-radius: 0 0 13px 13px; box-shadow: 0 9px 18px rgba(0,0,0,.22); }\n.tdg--device-cycler .tdg__device--laptop::before { content: \"\"; position: absolute; left: 50%; bottom: 4px; transform: translateX(-50%); width: 11%; height: 6px; background: rgba(0,0,0,.22); border-radius: 0 0 7px 7px; z-index: 3; }\n\n/* Tablet — even bezels + a front-camera dot, iPad-style */\n.tdg--device-cycler .tdg__device--tablet { position: relative; }\n.tdg--device-cycler .tdg__device--tablet .tdg__screen { border: 12px solid #16161a; border-radius: 24px; box-shadow: 0 22px 50px rgba(0,0,0,.35); }\n.tdg--device-cycler .tdg__device--tablet::before { content: \"\"; position: absolute; top: 5px; left: 0; right: 0; margin-inline: auto; width: 6px; height: 6px; border-radius: 50%; background: #34353c; box-shadow: 0 0 0 1.5px rgba(0,0,0,.3); z-index: 10; }\n\n/* Phone — rounded body, a dynamic-island pill, and a home indicator (centred via auto margins so the\n   pills stay dead-centre regardless of any transform on the preview/stage). */\n.tdg--device-cycler .tdg__device--phone { position: relative; }\n.tdg--device-cycler .tdg__device--phone .tdg__screen { border: 10px solid #0d0d11; border-radius: 36px; box-shadow: 0 18px 44px rgba(0,0,0,.4); }\n.tdg--device-cycler .tdg__device--phone::before { content: \"\"; position: absolute; top: 18px; left: 0; right: 0; margin-inline: auto; width: 28%; max-width: 110px; height: 18px; background: #0d0d11; border-radius: 10px; z-index: 10; }\n.tdg--device-cycler .tdg__device--phone::after { content: \"\"; position: absolute; bottom: 12px; left: 0; right: 0; margin-inline: auto; width: 30%; max-width: 120px; height: 4px; border-radius: 2px; background: rgba(255,255,255,.7); z-index: 10; }\n\n/* Browser window — title bar with traffic-light dots */\n.tdg--device-cycler .tdg__device--browser .tdg__screen { border: 1px solid rgba(0,0,0,.14); border-top: 32px solid #e8e8ec; border-radius: 10px; box-shadow: 0 18px 44px rgba(0,0,0,.22); }\n.tdg--device-cycler .tdg__device--browser::before { content: \"\"; position: absolute; top: 11px; left: 14px; width: 10px; height: 10px; border-radius: 50%; background: #ff5f57; box-shadow: 18px 0 0 #febc2e, 36px 0 0 #28c840; z-index: 4; }\n\n@media (prefers-reduced-motion: reduce) { .tdg--device-cycler .tdg__card { transition: none; } }\n\n/* Sphere Cascade — columns of cards on a sphere, cascading vertically (JS positions each card;\n * cards sit tangent to the surface, so the back hemisphere is hidden by backface-visibility). */\n.tdg__cascade {\n\tposition: absolute;\n\ttransform-style: preserve-3d;\n\twill-change: transform;\n}\n.tdg__col {\n\tposition: absolute;\n\tleft: 50%;\n\ttop: 50%;\n\ttransform-style: preserve-3d;\n}\n.tdg--sphere-cascade .tdg__card { backface-visibility: hidden; }\n/* Totem Wall — reuses the cascade DOM (.tdg__cascade > .tdg__col > .tdg__card); each column is an\n   independent vertical cylinder, so hide the card backs as they wrap around behind the totem. */\n.tdg--totem-wall .tdg__card { backface-visibility: hidden; }\n/* Parallax Totem — same cascade DOM; cards float at seeded depths, so keep their backs hidden too. */\n.tdg--parallax-totem .tdg__card { backface-visibility: hidden; }\n\n/* Card Tunnel — four walls of cards receding to a vanishing point. The tunnel is centred at the stage\n   origin; JS sizes each card to its wall (so drop the ratio-driven aspect) and sets its 3D transform. */\n.tdg__tunnel { position: absolute; left: 50%; top: 50%; transform-style: preserve-3d; will-change: transform; }\n/* Scoped to Card Tunnel — the four wall groups sit at the tunnel origin. (Unscoped, this collided with\n   Panorama Wall's own .tdg__wall and skewed its barrel to a corner.) */\n.tdg--card-tunnel .tdg__wall { position: absolute; left: 0; top: 0; transform-style: preserve-3d; }\n.tdg--card-tunnel .tdg__card { aspect-ratio: auto; backface-visibility: hidden; }\n\n/* Spiral Stream — cards threaded on a tapering helix, each rotating around its vertical axis. Backs\n   stay VISIBLE so a card turned away shows its mirrored face (part of the stream's character). */\n.tdg__spiral { position: absolute; left: 50%; top: 50%; transform-style: preserve-3d; will-change: transform; }\n.tdg--spiral-stream .tdg__card { backface-visibility: visible; }\n\n/* Depth Stack — a deck receding into depth, billboarded (facing the camera) with a depth-of-field\n   blur/fade toward the back. JS sets each card's translate3d + wobble + filter. */\n.tdg__depth { position: absolute; left: 50%; top: 50%; transform-style: preserve-3d; will-change: transform; }\n.tdg--depth-stack .tdg__card { will-change: transform, opacity, filter; }\n\n/* Tilt Deck (Isometric) — an isometric ground plane (JS sets its rotateX/rotateZ) holding a grid of\n   tiles. The tile crossing the focus point lifts off the plane and faces the camera; JS writes each\n   tile's translate3d + counter-rotation + brightness per frame. */\n.tdg__iso { position: absolute; left: 50%; top: 50%; transform-style: preserve-3d; will-change: transform; }\n.tdg--tilt-deck .tdg__card { will-change: transform, opacity, filter; backface-visibility: hidden; }\n/* Iso Orbit — a ring of tiles revolving on the same isometric plane (`.tdg__iso`); the near tile lifts\n   to face the camera. JS writes each tile's translate3d + counter-rotation + brightness per frame. */\n.tdg--iso-orbit .tdg__card { will-change: transform, filter; backface-visibility: hidden; }\n/* Iso Stack — slabs stacked into a tower on the same isometric plane (`.tdg__iso`), streaming up; the\n   focus slab lifts to face the camera. JS writes each slab's translate3d + counter-rotation per frame. */\n.tdg--iso-stack .tdg__card { will-change: transform, opacity, filter; backface-visibility: hidden; }\n/* Iso Cascade — tiles descend a diagonal staircase on the same isometric plane (`.tdg__iso`); the\n   front tile lifts to face the camera. JS writes each tile's translate3d + counter-rotation per frame. */\n.tdg--iso-cascade .tdg__card { will-change: transform, opacity, filter; backface-visibility: hidden; }\n/* Iso Fan — tiles spread along a flat arc on the same isometric plane (`.tdg__iso`) and sweep across;\n   the centre tile lifts to face the camera. JS writes each tile's translate3d + counter-rotation. */\n.tdg--iso-fan .tdg__card { will-change: transform, opacity, filter; backface-visibility: hidden; }\n\n/* Orbit Bloom + Focus Orbit — billboarded cards on a tilted orbit disc (reuses `.tdg__orbit`). JS sets\n   the per-card translate3d (+ counter-rotation to face the camera), scale, opacity and brightness. */\n.tdg--orbit-bloom .tdg__card,\n.tdg--focus-orbit .tdg__card { will-change: transform, opacity, filter; backface-visibility: hidden; }\n\n/* Card Reel — a vertical cover-flow carousel: a single column of cards wrapped on a horizontal\n   cylinder, the centre card flat and forward. JS sets each card's translate + rotateX. */\n.tdg__reel { position: absolute; left: 50%; top: 50%; transform-style: preserve-3d; will-change: transform; }\n.tdg--card-reel .tdg__card,\n.tdg--film-strip .tdg__card { backface-visibility: hidden; }\n\n/* Hero Reel — a reel of thumbnail cards over a dimmed, Ken-Burns HERO background (the active card).\n   The stage colour sits behind the hero; the reel sits above it. */\n.tdg--hero-reel .tdg__stage { display: block; overflow: hidden; }\n.tdg--hero-reel .tdg__hero { position: absolute; inset: 0; z-index: 0; will-change: opacity; }\n.tdg--hero-reel .tdg__hero-layer { position: absolute; inset: 0; background-size: cover; background-position: center; opacity: 0; will-change: opacity, transform; }\n.tdg--hero-reel .tdg__reel { position: absolute; left: 50%; top: 50%; z-index: 2; transform: none; will-change: auto; }\n.tdg--hero-reel .tdg__card { position: absolute; left: 50%; top: 50%; will-change: transform; transform-origin: 50% 50%; }\n\n/* Focus Slider — a centred-focus reel (JS: initFocusSlider). No perspective; pure translate + scale. */\n.tdg--focus-slider .tdg__stage { display: block; overflow: hidden; }\n.tdg--focus-slider .tdg__reel { position: absolute; left: 50%; top: 50%; z-index: 2; transform: none; will-change: auto; }\n.tdg--focus-slider .tdg__card { position: absolute; left: 50%; top: 50%; will-change: transform; transform-origin: 50% 50%; }\n\n/* Wheel Carousel — cards fanned on a flat 2D wheel (hub below the frame); JS sets each card's\n   translate + in-plane rotate + scale as the wheel steps around. */\n.tdg__wheel { position: absolute; left: 50%; top: 50%; }\n.tdg--wheel-carousel .tdg__card { transform-origin: 50% 50%; }\n\n/* Cover Flow + Carousel Flow — center-focus carousels sliding horizontally or vertically. JS sets each\n   card's translate + (Cover Flow) tilt / (Carousel Flow) scale + opacity. */\n.tdg__flow { position: absolute; left: 50%; top: 50%; transform-style: preserve-3d; will-change: transform; }\n.tdg--cover-flow .tdg__card,\n.tdg--carousel-flow .tdg__card { backface-visibility: hidden; }\n\n/* Mosaic Marquee — airy bento tiles (varied 1×1 / 1×2 / 2×2 spans, some cells left empty so the\n * background shows through) on a track that scrolls sideways forever. */\n.tdg--mosaic-marquee .tdg__stage { display: block; overflow: hidden; box-sizing: border-box; }\n.tdg__mosaic-track { position: absolute; top: 50%; left: 0; display: flex; align-items: flex-start; will-change: transform; }\n.tdg__mosaic { display: grid; grid-auto-flow: column; flex: 0 0 auto; }\n.tdg--mosaic-marquee .tdg__card { position: static; left: auto; top: auto; width: auto; height: auto; margin: 0; aspect-ratio: auto; overflow: hidden; }\n/* The \"Padding\" option frames each card (via the shared --tdg-pad inner padding). Because a CSS %\n * padding resolves against the element's WIDTH, a 2×2 \"full square\" (double the width of a 1×1) would\n * get double the pixel frame — so HALVE the padding on the wide tiles to keep the frame visually equal\n * across sizes. The half / quarter tiles keep the full var(--tdg-pad). */\n.tdg--mosaic-marquee .tdg__card--wide .tdg__inner { padding: calc(var(--tdg-pad, 0%) / 2); }\n.tdg--mosaic-marquee .tdg__card img { width: 100%; height: 100%; object-fit: cover; display: block; }\n\n/* =====================================================================================\n   Card Stack — a deck of image cards; the top is featured, the rest peek behind it, and the\n   deck advances (top peels away, next comes forward) on scroll / a dwell timer. gallery-3d.js\n   sets each card's transform + opacity + z-index every frame from its depth in the deck.\n   ===================================================================================== */\n.tdg--card-stack .tdg__stage { display: flex; align-items: center; justify-content: center; overflow: hidden; }\n.tdg--card-stack .tdg__deck {\n\tposition: relative;\n\twidth: var(--tdg-card-w, 52%);\n\taspect-ratio: var(--tdg-ratio, 4 / 3);\n\ttransform-style: preserve-3d;\n}\n.tdg--card-stack .tdg__card {\n\tposition: absolute;\n\tleft: 0; top: 0;\n\twidth: 100%; height: 100%;\n\taspect-ratio: auto;            /* override the base 50%/50% + ratio positioning */\n\ttransform-origin: 50% 50%;\n\twill-change: transform, opacity;\n}\n\n@media (prefers-reduced-motion: reduce) {\n\t.tdg--card-stack .tdg__card { will-change: auto; }\n}\n\n/* ---- Built-in sequential Entrance (opt-in; poses .tdg__inner, composes with the 3D layout) ---- */\n.tdg--entrance .tdg__inner {\n\topacity: 0;                       /* the JS reveals per card, staggered by index, driven by scroll */\n\twill-change: transform, opacity, filter;\n}\n@media (prefers-reduced-motion: reduce) {\n\t.tdg--entrance .tdg__inner { opacity: 1; }   /* no scrubbing under reduced motion — just show them */\n}\n\n/* ---- Scroll Choreography (cards morph through formations as you scroll) ---- */\n.tdg--scroll-choreography .tdg__stage {\n\tperspective: 1200px;\n\ttransform-style: preserve-3d;\n\toverflow: hidden;\n}\n/* The driver poses every card every frame (absolute, centred, sized in JS) — no CSS transition. */\n.tdg--scroll-choreography .tdg__card {\n\tposition: absolute;\n\tbackface-visibility: hidden;\n\ttransition: none;\n}\n\n/* ---- Chained galleries (overlap handoff) ---- */\n/* The chain controller overlays each gallery inside the marked container and drives one master\n   timeline; galleries are stacked absolutely so one can fly out while the next assembles in. */\n.tdg-choreo-chain { position: relative; }\n.tdg-choreo-chain .tdg--scroll-choreography { margin: 0; }\n.tdg-choreo-chain .tdg--scroll-choreography .tdg__stage { height: 100%; }\n/* A section whose only content was a chained gallery that got relocated into the overlay wrapper — hidden\n   non-destructively (no DOM removal) so cross-section chains don't leave empty gaps. */\n.tdg-choreo-vacated { display: none !important; }\n";

// Reduced motion: the driver renders a static scene instead of animating.
var reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// The playground rebuilds the scene on every option change, but the plugin's rAF loops never stop by
// design. Shadowing requestAnimationFrame here stamps each callback with the current generation, so
// bumpGen() lets every previous loop die instead of piling up.
var GEN = 0;
export function bumpGen() { GEN++; }
function requestAnimationFrame(fn) {
  var g = GEN;
  return window.requestAnimationFrame(function (t) { if (g === GEN) { fn(t); } });
}

function num( el, attr, dflt ) { var v = parseFloat( el.getAttribute( attr ) ); return isNaN( v ) ? dflt : v; }
	function clamp( v, a, b ) { return v < a ? a : ( v > b ? b : v ); }

	// Shared drag wiring (mouse + touch) — extracted from the 5 designs that each repeated it verbatim.
	// Passes BOTH (clientX, clientY) to the design's down/move callbacks; each uses the coordinate it
	// needs (X for the horizontal designs, Y for the vertical cascade, both for the ring's hit-test).
	function attachDrag( el, down, move, up ) {
		if ( IN_EDITOR ) { return; } // no drag in the Live Editor — its mousedown/preventDefault would block element selection
		el.addEventListener( 'mousedown', function ( e ) { down( e.clientX, e.clientY ); e.preventDefault(); } );
		window.addEventListener( 'mousemove', function ( e ) { move( e.clientX, e.clientY ); } );
		window.addEventListener( 'mouseup', up );
		el.addEventListener( 'touchstart', function ( e ) { down( e.touches[ 0 ].clientX, e.touches[ 0 ].clientY ); }, { passive: true } );
		window.addEventListener( 'touchmove', function ( e ) { move( e.touches[ 0 ].clientX, e.touches[ 0 ].clientY ); }, { passive: true } );
		window.addEventListener( 'touchend', up );
	}

	// Scroll-scrub progress 0..1, shared by every design. Pass-through mode: the element's travel
	// through the viewport. Pinned mode (.tdg--pinned, "Pin while scrubbing"): progress through the
	// pinned stretch — the stage sticks while the stretched wrapper passes, so the span is
	// wrapperH − stageH and the stick offset mirrors the CSS `top:` rule (viewport-centred stage).
	function scrollProgress( el, stage ) {
		// Chained gallery: the chain master drives its slice of the sequence and sets `__tdgChainProgress`
		// (0..1) each frame. Return that so the design's own loop AND the entrance reveal scrub with the
		// chain instead of the element's own viewport position — this is what makes chaining design-agnostic.
		if ( el.__tdgChainProgress != null ) { return clamp( el.__tdgChainProgress, 0, 1 ); }
		// Live Editor: scroll-driven galleries would sit at progress 0 (cards hidden by the entrance) and
		// look empty. Pin a representative mid-frame so the cards are revealed and visible while editing.
		if ( IN_EDITOR ) { return 0.4; }
		var r = el.getBoundingClientRect();
		var vh = window.innerHeight || 1;
		if ( el.classList.contains( 'tdg--pinned' ) ) {
			var sh = ( stage && stage.offsetHeight ) || 1;
			var stick = Math.max( 0, ( vh - sh ) / 2 );
			return clamp( ( stick - r.top ) / Math.max( 1, r.height - sh ), 0, 1 );
		}
		return clamp( 1 - ( r.top + r.height / 2 ) / ( vh + r.height ), 0, 1 );
	}

	// ---- Built-in sequential Entrance / scroll choreography -------------------
	// Reveal the cards one by one as the gallery scrolls in — on EVERY design. The design owns each
	// .tdg__card transform; we pose the inner content layer (.tdg__inner), which the layout never
	// touches, so the reveal composes with the 3D motion instead of fighting it. Staggered by index.
	//
	// Two progress sources:
	//   • Pinned Scroll-scrub (data-tdg-drive=scroll + .tdg--pinned) → a full scroll CHOREOGRAPHY: the
	//     images fade in one by one over the FIRST slice of the pin, hold while the design scrubs (e.g.
	//     the ring spins its Rounds), then fade out one by one over the LAST slice. Driven by the pin.
	//   • Otherwise → a one-shot cascade as the gallery travels into the viewport (optional exit).
	function initReveal( el ) {
		var effect = el.getAttribute( 'data-tdg-entrance' );
		if ( ! effect || effect === 'none' || el.__tdgReveal ) { return; }
		el.__tdgReveal = true;

		var cards = el.querySelectorAll( '.tdg__card' ), layers = [], i;
		for ( i = 0; i < cards.length; i++ ) { var inr = cards[ i ].querySelector( '.tdg__inner' ); if ( inr ) { layers.push( inr ); } }
		var n = layers.length;
		if ( ! n ) { return; }
		if ( reduce ) { for ( i = 0; i < n; i++ ) { layers[ i ].style.opacity = ''; } return; }

		// Pinned scroll-scrub → choreography mode (enter + exit tied to the pin, never tears down).
		var scrub  = el.getAttribute( 'data-tdg-drive' ) === 'scroll' && el.classList.contains( 'tdg--pinned' );
		var stage  = scrub ? el.querySelector( '.tdg__stage' ) : null;
		var ENTER  = 0.16, EXIT = 0.84;   // first/last 16% of the pin = the in / out sequences

		var stagger = num( el, 'data-tdg-entrance-stagger', 60 ) / 100;   // 0..0.9 spread of the cascade
		var dist    = num( el, 'data-tdg-entrance-distance', 40 );        // px the card rises from
		var doExit  = scrub || el.getAttribute( 'data-tdg-exit' ) === 'yes';
		var span    = Math.max( 0.25, 1 - stagger );                      // each card's own reveal length
		var step    = n > 1 ? stagger / ( n - 1 ) : 0;                    // per-index delay
		function ease( t ) { return t <= 0 ? 0 : t >= 1 ? 1 : 1 - Math.pow( 1 - t, 3 ); }

		var ticking = false, done = false;
		function apply() {
			var enterP, exitP;
			if ( scrub ) {
				var P = scrollProgress( el, stage );                          // 0..1 across the pinned scrub
				enterP = clamp( P / ENTER, 0, 1 );
				exitP  = clamp( ( P - EXIT ) / ( 1 - EXIT ), 0, 1 );
			} else {
				var r = el.getBoundingClientRect(), vh = window.innerHeight || 1;
				enterP = clamp( ( vh - r.top ) / ( vh * 0.6 ), 0, 1 );        // rises in over ~60% vh
				exitP  = doExit ? clamp( ( vh * 0.15 - r.bottom ) / ( vh * 0.5 ), 0, 1 ) : 0;
			}
			var allIn = true;
			for ( var k = 0; k < n; k++ ) {
				var inL  = ease( clamp( ( enterP - k * step ) / span, 0, 1 ) );
				var outL = doExit ? ease( clamp( ( exitP - ( n - 1 - k ) * step ) / span, 0, 1 ) ) : 0;
				var v = inL * ( 1 - outL ), e = 1 - v, L = layers[ k ]; // e: 0 shown → 1 hidden
				L.style.opacity = v.toFixed( 3 );
				// Each effect poses the inner layer differently; all compose with the design's 3D transform.
				if ( effect === 'scale' )      { L.style.transform = 'scale(' + ( 0.82 + 0.18 * v ).toFixed( 3 ) + ')';          L.style.filter = ''; }
				else if ( effect === 'blur' )  { L.style.transform = '';                                                          L.style.filter = e > 0.01 ? 'blur(' + ( e * 9 ).toFixed( 1 ) + 'px)' : ''; }
				else if ( effect === 'slide' ) { L.style.transform = 'translateX(' + ( e * dist ).toFixed( 1 ) + 'px)';           L.style.filter = ''; }
				else if ( effect === 'flip' )  { L.style.transform = 'perspective(720px) rotateY(' + ( e * 70 ).toFixed( 1 ) + 'deg)'; L.style.filter = ''; }
				else                           { L.style.transform = 'translateY(' + ( e * dist ).toFixed( 1 ) + 'px)';           L.style.filter = ''; } // rise
				if ( v < 0.999 ) { allIn = false; }
			}
			// One-shot cascade with nothing left to watch → stop listening. Scrub/exit keep running.
			if ( allIn && ! doExit ) { teardown(); }
		}
		function onScroll() { if ( ticking || done ) { return; } ticking = true; requestAnimationFrame( function () { ticking = false; apply(); } ); }
		function teardown() { done = true; window.removeEventListener( 'scroll', onScroll ); window.removeEventListener( 'resize', onScroll ); }

		window.addEventListener( 'scroll', onScroll, { passive: true } );
		window.addEventListener( 'resize', onScroll, { passive: true } );
		apply();
	}

	// Hover behaviour for auto-rotating drives: 'none' keeps full speed, 'pause' stops on hover,
	// 'slow' eases to a crawl. Returns a getter for the current speed multiplier so each driver can
	// scale its per-frame advance. (Legacy data-tdg-pause="1"/"0" is honoured as pause/none.)
	//
	// The hit area is the CARDS' bounding box, not the whole stage: the stage is much larger than the
	// artwork (side/top margins), so reacting out in a dead corner feels broken. We hit-test with maths
	// instead of an overlay <div>, because an overlay above the cards would swallow their lightbox
	// clicks + caption hovers, and one behind them would never fire when hovering an actual card.
	// The box is stable, so unlike per-card hover this needs no hysteresis — no flicker.
	function hoverFactor( el ) {
		var mode = el.getAttribute( 'data-tdg-hover' );
		if ( mode === null ) { mode = num( el, 'data-tdg-pause', 1 ) ? 'pause' : 'none'; }
		if ( mode !== 'pause' && mode !== 'slow' ) { return function () { return 1; }; }

		var over = false, box = null, elRect = null;
		// Union of the cards' rects, cached as offsets from the element's top-left.
		function measure() {
			elRect = el.getBoundingClientRect();
			var cards = el.querySelectorAll( '.tdg__card' );
			var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity, i, r;
			for ( i = 0; i < cards.length; i++ ) {
				r = cards[ i ].getBoundingClientRect();
				if ( ! r.width || ! r.height ) { continue; }
				if ( r.left < minX )   { minX = r.left; }
				if ( r.top < minY )    { minY = r.top; }
				if ( r.right > maxX )  { maxX = r.right; }
				if ( r.bottom > maxY ) { maxY = r.bottom; }
			}
			box = ( minX < maxX ) ? { l: minX - elRect.left, t: minY - elRect.top, r: maxX - elRect.left, b: maxY - elRect.top } : null;
		}
		el.addEventListener( 'mousemove', function ( e ) {
			if ( ! box ) { measure(); }                 // measured lazily, once the 3D layout has settled
			if ( ! box || ! elRect ) { over = true; return; } // can't measure → fall back to the whole element
			var x = e.clientX - elRect.left, y = e.clientY - elRect.top;
			over = ( x >= box.l && x <= box.r && y >= box.t && y <= box.b );
		} );
		el.addEventListener( 'mouseleave', function () { over = false; } );
		// The box is element-relative, so scrolling only invalidates the element's own rect.
		window.addEventListener( 'scroll', function () { if ( box ) { elRect = el.getBoundingClientRect(); } }, { passive: true } );
		window.addEventListener( 'resize', function () { box = null; }, { passive: true } );

		return function () { return over ? ( mode === 'slow' ? 0.2 : 0 ) : 1; };
	}

	function initRing( el ) {
		if ( el.__tdg ) { return; }
		el.__tdg = true;
		var stage = el.querySelector( '.tdg__stage' );
		var ring  = el.querySelector( '.tdg__ring' );
		if ( ! stage || ! ring ) { return; }
		var cards = Array.prototype.slice.call( ring.querySelectorAll( '.tdg__card' ) );
		var n = cards.length;
		if ( ! n ) { return; }

		var drive    = el.getAttribute( 'data-tdg-drive' ) || 'auto';
		var speed    = num( el, 'data-tdg-speed', 16 );
		var dir      = num( el, 'data-tdg-dir', 1 );
		var momentum = num( el, 'data-tdg-momentum', 1 );
		var tilt     = num( el, 'data-tdg-tilt', -28 );
		var roll     = num( el, 'data-tdg-roll', 0 );
		var sway     = num( el, 'data-tdg-sway', 0 );     // +/- degrees of vertical rock as the ring spins
		var opening  = num( el, 'data-tdg-opening', 55 ); // how far you look INTO the ring (0 edge-on .. 100 open)
		var ringMul  = num( el, 'data-tdg-ring', 80 ) / 100;
		var spacing  = num( el, 'data-tdg-spacing', 100 ) / 100;
		var perspVal = num( el, 'data-tdg-persp', 40 );
		var backFade = clamp( num( el, 'data-tdg-backfade', 65 ) / 100, 0, 1 );
		// Card Size is % of the stage width, but scaled ×0.5 so the numbers line up with the reference
		// control (their 21% default = our card that fits the frame). Keeps the value portable.
		var cardPct  = num( el, 'data-tdg-card', 21 ) / 100 * 0.5;

		var step = 360 / n;
		var angle = 0, vel = 0, R = 0;

		function layout() {
			var W = stage.clientWidth || el.clientWidth || 1;
			var cardW = Math.max( 40, W * cardPct );
			// Radius that fits N cards around the ring. chordFit = the radius at which the card width
			// exactly equals the chord between neighbours (edge-to-edge). We scale it up (×1.35 bakes a
			// default gap; ring size + spacing tune it) and clamp so the flat cards can NEVER overlap.
			var chordFit = cardW / ( 2 * Math.sin( Math.PI / n ) );
			R = chordFit * 1.35 * ringMul * spacing;
			if ( R < chordFit * 1.03 ) { R = chordFit * 1.03; }
			// Perspective is WIDTH-RELATIVE so the depth reads the same at any stage size (a fixed px
			// value looked strong on a wide screen and flat on a narrow one). HIGHER value = STRONGER
			// perspective (closer camera, bigger px→smaller distance), matching the reference control.
			var pDist = W * Math.max( 0.35, Math.min( 1.25, 1.35 - perspVal * 0.013 ) );
			stage.style.perspective = pDist + 'px';
			// Eye sits below the ring centre so the near cards render lower with margin beneath them and
			// the whole loop lifts slightly above centre — the reference framing.
			stage.style.perspectiveOrigin = '50% 60%';
			cards.forEach( function ( c, i ) {
				c.__rot = i * step;
				c.style.width = cardW + 'px';
				c.style.marginLeft = ( -cardW / 2 ) + 'px';
				c.style.transform = 'rotateY(' + c.__rot + 'deg) translateZ(' + R + 'px)';
			} );
			// height comes from aspect-ratio; centre vertically once it's measured
			requestAnimationFrame( function () {
				cards.forEach( function ( c ) { c.style.marginTop = ( -( c.offsetHeight || cardW ) / 2 ) + 'px'; } );
			} );
		}

		// Ring Opening: a vertical squash of the whole projected ring. Low opening → the ring flattens
		// toward edge-on (the hole closes, cards compress); high opening → the loop opens up. Maps
		// 0..100 → scaleY 0.35..1.15 (55 ≈ 1.0, so the default is un-squashed).
		var openScale = clamp( 0.42 + opening * 0.0106, 0.3, 1.18 );

		function applyRing() {
			// scaleY (Ring Opening) is outermost, then rotateZ (Diagonal Tilt) rolls the oval diagonally,
			// rotateX tips it back, and rotateY spins the cards around the ring.
			// Vertical Sway: rock the ring up/down as it spins (two rocks per revolution) — turns a flat
			// carousel into an orbiting "product" showcase seen from shifting heights. 0 = off.
			var rx = sway ? ( tilt + sway * Math.sin( angle * Math.PI / 90 ) ) : tilt;
			ring.style.transform = 'scaleY(' + openScale + ') rotateZ(' + roll + 'deg) rotateX(' + rx.toFixed( 2 ) + 'deg) rotateY(' + angle + 'deg)';
			if ( backFade > 0 ) {
				for ( var i = 0; i < n; i++ ) {
					var facing = Math.cos( ( cards[ i ].__rot + angle ) * Math.PI / 180 ); // 1 front, -1 back
					cards[ i ].style.opacity = ( 1 - ( ( 1 - facing ) / 2 ) * backFade ).toFixed( 3 );
				}
			}
		}

		layout();
		applyRing();
		window.addEventListener( 'resize', function () { layout(); applyRing(); }, { passive: true } );

		// --- Motion: auto-rotate / scroll-scrub / static, with an independent "Drag to spin" layer ---
		var hoverF = hoverFactor( el );
		var allowDrag = num( el, 'data-tdg-allowdrag', 1 );
		var dragging = false, px = 0, scrollAngle = null;

		// Drag to spin layers over ANY base Motion: grabbing pauses the base drive, releasing flings (Drag
		// Momentum), then the base resumes. Kept even under reduced motion (user-initiated) and when static
		// (= pure drag). A Section background can't be grabbed (sc-bg-fill sets pointer-events:none).
		if ( allowDrag ) {
			el.style.cursor = 'grab';
			var flipDrag = 1;
			// Which half of the ring did you grab? A back card moves OPPOSITE a front card for the same spin,
			// so dragging one with the front's mapping feels reversed. Back cards are NOT hit-testable (the
			// stage plane sits over them), so the event target can't tell us — instead we find the card whose
			// on-screen centre is nearest the grab point (back cards are rendered, so their rects exist) and
			// use its facing (the same cos test the back-fade uses). Grab the back half → invert the delta for
			// the whole gesture so the grabbed card follows the cursor. Locked per gesture.
			var down = function ( x, y ) {
				dragging = true; px = x; vel = 0; el.style.cursor = 'grabbing'; flipDrag = 1;
				var best = null, bestD = Infinity;
				for ( var i = 0; i < n; i++ ) {
					var b = cards[ i ].getBoundingClientRect();
					var ddx = x - ( b.left + b.width / 2 ), ddy = y - ( b.top + b.height / 2 ), d = ddx * ddx + ddy * ddy;
					if ( d < bestD ) { bestD = d; best = cards[ i ]; }
				}
				if ( best && Math.cos( ( best.__rot + angle ) * Math.PI / 180 ) < 0 ) { flipDrag = -1; }
			};
			var move = function ( x ) { if ( ! dragging ) { return; } var dx = ( x - px ) * flipDrag; px = x; angle += dx * 0.3; vel = dx * 0.3; };
			var up = function () { dragging = false; el.style.cursor = 'grab'; };
			attachDrag( el, down, move, up );
		}

		if ( drive === 'scroll' ) {
			var rounds = num( el, 'data-tdg-rounds', 1 );   // full turns across the pinned scrub
			var onScroll = function () { scrollAngle = dir * scrollProgress( el, stage ) * 360 * rounds; };
			window.addEventListener( 'scroll', onScroll, { passive: true } );
			onScroll();
		}

		var autoSpin = ( drive === 'auto' && ! reduce );
		// A render loop is only needed when something moves without a DOM event: auto spin, a momentum
		// fling, or scroll-scrub. Static with no drag is already rendered — nothing to loop.
		if ( ! ( autoSpin || allowDrag || drive === 'scroll' ) ) { return; }
		var last = 0;
		var loop = function ( t ) {
			if ( ! last ) { last = t; }
			var dt = ( t - last ) / 1000; last = t;
			if ( ! dragging ) {
				if ( autoSpin ) { angle += dir * ( 360 / speed ) * dt * hoverF(); }             // auto-rotate
				if ( momentum && Math.abs( vel ) > 0.02 ) { angle += vel; vel *= 0.95; }         // fling tail
				else if ( drive === 'scroll' && scrollAngle !== null ) { angle += ( scrollAngle - angle ) * 0.14; }  // scroll drives when idle (eased glide)
			}
			applyRing();
			requestAnimationFrame( loop );
		};
		requestAnimationFrame( loop );
	}

	/* ------------------------------------------------------------------ *
	 * Panorama Wall — a concave cylinder grid: the viewer sits at the centre of a cylinder whose inner
	 * wall is papered with a grid of cards (columns × rows). Each card is placed by rotateY(angle)
	 * translateZ(-R) so it faces the viewer; columns wrap around for seamless horizontal scroll and
	 * fade out at the rim (which also hides the recycle). Rows stack vertically to fill the frame.
	 * ------------------------------------------------------------------ */
	function initWall( el ) {
		if ( el.__tdg ) { return; }
		el.__tdg = true;
		var stage = el.querySelector( '.tdg__stage' );
		var wall  = el.querySelector( '.tdg__wall' );
		if ( ! stage || ! wall ) { return; }
		var rows = Array.prototype.slice.call( wall.querySelectorAll( '.tdg__row' ) );
		if ( ! rows.length ) { return; }

		var drive    = el.getAttribute( 'data-tdg-drive' ) || 'continuous';
		var speed    = num( el, 'data-tdg-speed', 24 );
		var dir      = num( el, 'data-tdg-dir', 1 );
		var alt      = num( el, 'data-tdg-alt', 0 );
		// Curvature is SIGNED: negative = concave (wraps toward you), positive = convex (bulges away).
		// |curv| 0..150 = flat..tight.
		var curv     = num( el, 'data-tdg-curv', -100 );
		var tilt     = num( el, 'data-tdg-tilt', 0 );
		var gap      = num( el, 'data-tdg-gap', 5 ) / 100; // % of the card width
		var edge     = clamp( num( el, 'data-tdg-edge', 45 ) / 100, 0, 1 );
		var perspVal = num( el, 'data-tdg-persp', 55 );
		var cardPct  = num( el, 'data-tdg-card', 14 ) / 100;

		var rowData = rows.map( function ( rw ) { return { row: rw, cards: Array.prototype.slice.call( rw.querySelectorAll( '.tdg__card' ) ), y: 0 }; } );
		var C = rowData[ 0 ].cards.length; // columns per row
		if ( ! C ) { return; }
		// Concave pushes the cards AWAY (-Z, viewer inside the cylinder); convex pulls them toward the
		// viewer (+Z, the outside of a barrel bulging at you).
		var zSign = curv >= 0 ? 1 : -1;
		var R = 0, dTheta = 0, span = 0, base = 0, gapPx = 0;

		function layout() {
			var W = stage.clientWidth || el.clientWidth || 1;
			var cardW = Math.max( 40, W * cardPct );
			gapPx = cardW * gap;
			// Radius from |curvature| (inverse: tighter curve = smaller R). |curv| 150 → R ≈ cardW·2.9
			// (tight wrap); 100 → ≈4.3; near 0 → very large R = effectively flat.
			var amt = clamp( Math.abs( curv ) / 150, 0.08, 1 );
			R = cardW * 2.87 / amt;
			// Angular step so neighbouring columns sit edge-to-edge with the gap (chord = cardW + gap).
			dTheta = 2 * Math.asin( clamp( ( cardW + gapPx ) / ( 2 * R ), 0, 0.5 ) ) * 180 / Math.PI;
			span = C * dTheta;                               // full angular width the columns occupy
			stage.style.perspective = ( W * Math.max( 0.6, Math.min( 2.2, 2.4 - perspVal * 0.02 ) ) ) + 'px';
			rowData.forEach( function ( rd ) {
				rd.cards.forEach( function ( c, i ) { c.__col = i; c.style.width = cardW + 'px'; c.style.marginLeft = ( -cardW / 2 ) + 'px'; } );
			} );
			requestAnimationFrame( function () {
				var ch = ( rowData[ 0 ].cards[ 0 ] && rowData[ 0 ].cards[ 0 ].offsetHeight ) ? rowData[ 0 ].cards[ 0 ].offsetHeight : cardW * 0.5625;
				var rowH = ch + gapPx;
				var total = ( rowData.length - 1 ) * rowH;
				rowData.forEach( function ( rd, r ) {
					rd.y = r * rowH - total / 2;
					rd.cards.forEach( function ( c ) { c.style.marginTop = ( -ch / 2 ) + 'px'; } );
				} );
				applyWall();
			} );
		}

		function applyWall() {
			// Concave puts the viewer at the cylinder's centre (cards sit R away at -Z). Convex puts the
			// viewer OUTSIDE it, so push the whole wall back by 2R — the front cards then bulge toward
			// the viewer at the same working depth instead of flying into the camera.
			wall.style.transform = 'rotateX(' + tilt + 'deg)' + ( zSign > 0 ? ' translateZ(' + ( -2 * R ) + 'px)' : '' );
			var half = span / 2;
			rowData.forEach( function ( rd, r ) {
				var b = alt ? ( r % 2 ? -base : base ) : base;
				rd.row.style.transform = 'translateY(' + rd.y + 'px)';
				for ( var i = 0; i < rd.cards.length; i++ ) {
					var c = rd.cards[ i ];
					var raw = ( c.__col - ( C - 1 ) / 2 ) * dTheta + b;
					var ang = ( ( raw + half ) % span + span ) % span - half; // wrap into [-half, half)
					var af  = half > 0 ? Math.abs( ang ) / half : 0;          // 0 centre .. 1 rim
					c.style.transform = 'rotateY(' + ang + 'deg) translateZ(' + ( zSign * R ) + 'px)';
					// fade the outer 14% to 0 (hides the wrap pop), plus Edge Fade dims across the span
					var vis = af > 0.86 ? Math.max( 0, ( 1 - af ) / 0.14 ) : 1;
					c.style.opacity = ( vis * ( 1 - af * af * edge ) ).toFixed( 3 );
					c.style.zIndex = String( 1000 - Math.round( af * 1000 ) );
				}
			} );
		}

		layout();
		applyWall();
		window.addEventListener( 'resize', function () { layout(); applyWall(); }, { passive: true } );
		var hoverF = hoverFactor( el );
		var allowDrag = num( el, 'data-tdg-allowdrag', 1 );
		var momentum = num( el, 'data-tdg-momentum', 1 );
		var dragging = false, px = 0, vel = 0, scrollBase = null;
		// One loop = scroll by the full span (one recycle); Loop Duration is the seconds for that.
		var advance = function ( dt ) { base += dir * ( span / Math.max( 1, speed ) ) * dt * hoverF(); };

		// Drag to spin — layers over the base Motion (grabbing pauses it, releasing flings, then it resumes).
		if ( allowDrag ) {
			el.style.cursor = 'grab';
			var down = function ( x ) { dragging = true; px = x; vel = 0; el.style.cursor = 'grabbing'; };
			var move = function ( x ) { if ( ! dragging ) { return; } var dx = x - px; px = x; base -= dx * 0.12; vel = -dx * 0.12; };
			var up = function () { dragging = false; el.style.cursor = 'grab'; };
			attachDrag( el, down, move, up );
		}

		if ( drive === 'scroll' ) {
			var onScroll = function () { scrollBase = dir * scrollProgress( el, stage ) * span * 2 * num( el, 'data-tdg-rounds', 1 ); };
			window.addEventListener( 'scroll', onScroll, { passive: true } );
			onScroll();
		}

		var autoRun = ( drive === 'continuous' && ! reduce );
		if ( ! ( autoRun || allowDrag || drive === 'scroll' ) ) { return; }
		var last = 0;
		var loop = function ( t ) {
			if ( ! last ) { last = t; }
			var dt = ( t - last ) / 1000; last = t;
			if ( ! dragging ) {
				if ( autoRun ) { advance( dt ); }
				if ( momentum && Math.abs( vel ) > 0.02 ) { base += vel; vel *= 0.95; }
				else if ( drive === 'scroll' && scrollBase !== null ) { base += ( scrollBase - base ) * 0.14; }
			}
			applyWall();
			requestAnimationFrame( loop );
		};
		requestAnimationFrame( loop );
	}

	/* ------------------------------------------------------------------ *
	 * Card Sphere — cards wrapped on a spinning sphere (disco ball). Each band is a horizontal ring at
	 * its latitude (radius = R·cosφ, height = R·sinφ); the card count per band is thinned toward the
	 * poles. Back hemisphere hidden; Back Fade dims cards toward the rim.
	 * ------------------------------------------------------------------ */
	function initGlobe( el ) {
		if ( el.__tdg ) { return; }
		el.__tdg = true;
		var stage = el.querySelector( '.tdg__stage' );
		var globe = el.querySelector( '.tdg__globe' );
		if ( ! stage || ! globe ) { return; }
		var bands = Array.prototype.slice.call( globe.querySelectorAll( '.tdg__band' ) );
		if ( ! bands.length ) { return; }

		var drive    = el.getAttribute( 'data-tdg-drive' ) || 'continuous';
		var speed    = num( el, 'data-tdg-speed', 20 );
		var dir      = num( el, 'data-tdg-dir', 1 );
		var momentum = num( el, 'data-tdg-momentum', 1 );
		// Globe Size sets the sphere directly (diameter as % of the stage width); the band/card counts
		// are already derived in PHP from the same ratios, so here we only convert to pixels.
		var globePct = num( el, 'data-tdg-globe', 70 ) / 100;
		var maxLat   = num( el, 'data-tdg-maxlat', 80 );  // top/bottom band latitude (off the poles)
		var backFade = clamp( num( el, 'data-tdg-backfade', 55 ) / 100, 0, 1 );
		var tilt     = num( el, 'data-tdg-tilt', 0 );
		var perspVal = num( el, 'data-tdg-persp', 55 );
		var cardPct  = num( el, 'data-tdg-card', 20 ) / 100;

		var nRows = bands.length;
		var bandData = bands.map( function ( bw, r ) {
			// Latitude of each band, evenly spaced from -maxLat (bottom) to +maxLat (top). PHP emits the
			// matching per-band card count (fewer toward the poles), so we just lay out what's there.
			var lat = ( ( r + 0.5 ) / nRows * 2 - 1 ) * maxLat;
			return { band: bw, cards: Array.prototype.slice.call( bw.querySelectorAll( '.tdg__card' ) ), lat: lat, angle: 0 };
		} );
		if ( ! bandData[ 0 ].cards.length ) { return; }
		var R = 0;

		function layout() {
			var W = stage.clientWidth || el.clientWidth || 1;
			var H = stage.clientHeight || el.clientHeight || W;
			// A sphere is bounded by the stage's SHORTER side, so Globe Size and Card Size are both % of
			// that: it fits at any stage aspect, and sharing one base keeps R/cardW a pure ratio — which
			// is what makes the band/card counts PHP derived from the same ratio come out right.
			var base = Math.min( W, H );
			R = base * globePct / 2; // straight from Globe Size — nothing else resizes the globe
			// Card Size is a % of the GLOBE, so Globe Size is a pure zoom and Card Size sets the tiling
			// density (matching the counts PHP derived from R/cardW = 1/(2·card%)).
			var cardW = Math.max( 8, base * globePct * cardPct );
			stage.style.perspective = ( W * Math.max( 0.6, Math.min( 2.4, 2.6 - perspVal * 0.02 ) ) ) + 'px';
			bandData.forEach( function ( bd ) {
				var vis = bd.cards.length;
				bd.step = 360 / Math.max( 1, vis );
				bd.cards.forEach( function ( c, i ) {
					c.__rot = i * bd.step;
					c.style.width = cardW + 'px';
					c.style.marginLeft = ( -cardW / 2 ) + 'px';
					// Place on the sphere surface at (longitude __rot, latitude lat), tangent + facing out.
					c.style.transform = 'rotateY(' + c.__rot + 'deg) rotateX(' + bd.lat + 'deg) translateZ(' + R + 'px)';
				} );
			} );
			requestAnimationFrame( function () {
				bandData.forEach( function ( bd ) {
					bd.cards.forEach( function ( c ) { c.style.marginTop = ( -( c.offsetHeight || cardW ) / 2 ) + 'px'; } );
				} );
			} );
		}

		function applyGlobe() {
			var spin = bandData[ 0 ].angle;
			globe.style.transform = 'rotateX(' + tilt + 'deg) rotateY(' + spin + 'deg)';
			var spinR = spin * Math.PI / 180;
			// Back-hemisphere cards are auto-hidden by backface-visibility (CSS); here we only dim cards
			// toward the rim by their outward normal's z-component (frontZ = cosLat·cos(worldLon)).
			bandData.forEach( function ( bd ) {
				var cl = Math.cos( bd.lat * Math.PI / 180 );
				for ( var i = 0; i < bd.cards.length; i++ ) {
					var c = bd.cards[ i ];
					var frontZ = cl * Math.cos( c.__rot * Math.PI / 180 + spinR );
					c.style.opacity = backFade > 0 ? ( 1 - clamp( 1 - frontZ, 0, 1 ) * backFade ).toFixed( 3 ) : '1';
				}
			} );
		}

		layout();
		applyGlobe();
		window.addEventListener( 'resize', function () { layout(); applyGlobe(); }, { passive: true } );
		var hoverF = hoverFactor( el );
		var allowDrag = num( el, 'data-tdg-allowdrag', 1 );
		var dragging = false, px = 0, vel = 0, scrollAngle = null;
		var advance = function ( dt ) { var d = dir * ( 360 / speed ) * dt * hoverF(); bandData.forEach( function ( bd ) { bd.angle += d; } ); };

		// Drag to spin — layers over the base Motion (grabbing pauses it, releasing flings, then it resumes).
		if ( allowDrag ) {
			el.style.cursor = 'grab';
			var down = function ( x ) { dragging = true; px = x; vel = 0; el.style.cursor = 'grabbing'; };
			var move = function ( x ) { if ( ! dragging ) { return; } var dx = x - px; px = x; bandData.forEach( function ( bd ) { bd.angle += dx * 0.25; } ); vel = dx * 0.25; };
			var up = function () { dragging = false; el.style.cursor = 'grab'; };
			attachDrag( el, down, move, up );
		}

		if ( drive === 'scroll' ) {
			var rounds = num( el, 'data-tdg-rounds', 1 );   // full turns across the pinned scrub
			var onScroll = function () { scrollAngle = dir * scrollProgress( el, stage ) * 360 * rounds; };
			window.addEventListener( 'scroll', onScroll, { passive: true } );
			onScroll();
		}

		var autoRun = ( drive === 'continuous' && ! reduce );
		if ( ! ( autoRun || allowDrag || drive === 'scroll' ) ) { return; }
		var last = 0;
		var loop = function ( t ) {
			if ( ! last ) { last = t; }
			var dt = ( t - last ) / 1000; last = t;
			if ( ! dragging ) {
				if ( autoRun ) { advance( dt ); }
				if ( momentum && Math.abs( vel ) > 0.02 ) { bandData.forEach( function ( bd ) { bd.angle += vel; } ); vel *= 0.95; }
				else if ( drive === 'scroll' && scrollAngle !== null ) { bandData.forEach( function ( bd ) { bd.angle += ( scrollAngle - bd.angle ) * 0.14; } ); }
			}
			applyGlobe();
			requestAnimationFrame( loop );
		};
		requestAnimationFrame( loop );
	}

	/* ------------------------------------------------------------------ *
	 * Orbit Globe — cards distributed through a sphere VOLUME (Fibonacci points), each BILLBOARDED
	 * (always facing the camera) rather than tangent to the surface like Card Sphere. The whole cloud
	 * spins; the stage perspective makes near cards big + far cards small, and Back Fade dims the far
	 * side — a depth-of-field orbit. Each card is positioned every frame from its rotated unit vector.
	 * ------------------------------------------------------------------ */
	function initOrbit( el ) {
		if ( el.__tdg ) { return; }
		el.__tdg = true;
		var stage = el.querySelector( '.tdg__stage' );
		var orbit = el.querySelector( '.tdg__orbit' );
		if ( ! stage || ! orbit ) { return; }
		var cards = Array.prototype.slice.call( orbit.querySelectorAll( '.tdg__card' ) );
		if ( ! cards.length ) { return; }

		var drive    = el.getAttribute( 'data-tdg-drive' ) || 'continuous';
		var speed    = num( el, 'data-tdg-speed', 20 );
		var dir      = num( el, 'data-tdg-dir', 1 );
		var momentum = num( el, 'data-tdg-momentum', 1 );
		var globePct = num( el, 'data-tdg-globe', 50 ) / 100;
		var backFade = clamp( num( el, 'data-tdg-backfade', 55 ) / 100, 0, 1 );
		var tilt     = num( el, 'data-tdg-tilt', 27 );
		var cardPct  = num( el, 'data-tdg-card', 28 ) / 100;

		var n = cards.length;
		// Fibonacci sphere: an even spread of unit directions, one per card.
		var GA = Math.PI * ( 3 - Math.sqrt( 5 ) ); // golden angle
		cards.forEach( function ( c, i ) {
			var uy = 1 - ( i / Math.max( 1, n - 1 ) ) * 2;      // 1 .. -1
			var rr = Math.sqrt( Math.max( 0, 1 - uy * uy ) );
			var th = i * GA;
			c.__u = [ Math.cos( th ) * rr, uy, Math.sin( th ) * rr ];
		} );
		var R = 0, tiltR = tilt * Math.PI / 180;
		var angle = 0, vel = 0;

		function layout() {
			var W = stage.clientWidth || el.clientWidth || 1;
			var H = stage.clientHeight || el.clientHeight || W;
			var base = Math.min( W, H );
			R = base * globePct / 2;
			var cardW = Math.max( 8, base * globePct * cardPct );
			// Perspective IS the effect here (near big / far small); orbit has no perspective control, so
			// it is fixed + width-relative to read the same at any stage size.
			stage.style.perspective = ( W * 0.9 ) + 'px';
			cards.forEach( function ( c ) {
				c.style.width = cardW + 'px';
				c.style.marginLeft = ( -cardW / 2 ) + 'px';
			} );
			requestAnimationFrame( function () {
				cards.forEach( function ( c ) { c.style.marginTop = ( -( c.offsetHeight || cardW ) / 2 ) + 'px'; } );
			} );
		}

		function applyOrbit() {
			var ar = angle * Math.PI / 180, sa = Math.sin( ar ), ca = Math.cos( ar );
			var st = Math.sin( tiltR ), ct = Math.cos( tiltR );
			for ( var i = 0; i < n; i++ ) {
				var u = cards[ i ].__u;
				var x = u[ 0 ] * ca + u[ 2 ] * sa;      // spin around Y
				var z = -u[ 0 ] * sa + u[ 2 ] * ca;
				var y2 = u[ 1 ] * ct - z * st;          // then tilt around X
				var z2 = u[ 1 ] * st + z * ct;
				var c = cards[ i ];
				c.style.transform = 'translate3d(' + ( x * R ).toFixed( 1 ) + 'px,' + ( y2 * R ).toFixed( 1 ) + 'px,' + ( z2 * R ).toFixed( 1 ) + 'px)';
				// far side (z2 < 0) fades toward the back
				c.style.opacity = backFade > 0 ? ( 1 - clamp( ( 1 - z2 ) / 2, 0, 1 ) * backFade ).toFixed( 3 ) : '1';
			}
		}

		layout();
		applyOrbit();
		window.addEventListener( 'resize', function () { layout(); applyOrbit(); }, { passive: true } );
		var hoverF = hoverFactor( el );
		var allowDrag = num( el, 'data-tdg-allowdrag', 1 );
		var dragging = false, px = 0, scrollAngle = null;
		var advance = function ( dt ) { angle += dir * ( 360 / speed ) * dt * hoverF(); };

		// Drag to spin — layers over the base Motion (grabbing pauses it, releasing flings, then resumes).
		if ( allowDrag ) {
			el.style.cursor = 'grab';
			var down = function ( x ) { dragging = true; px = x; vel = 0; el.style.cursor = 'grabbing'; };
			var move = function ( x ) { if ( ! dragging ) { return; } var dx = x - px; px = x; angle += dx * 0.25; vel = dx * 0.25; };
			var up = function () { dragging = false; el.style.cursor = 'grab'; };
			attachDrag( el, down, move, up );
		}

		if ( drive === 'scroll' ) {
			var rounds = num( el, 'data-tdg-rounds', 1 );   // full turns across the pinned scrub
			var onScroll = function () { scrollAngle = dir * scrollProgress( el, stage ) * 360 * rounds; };
			window.addEventListener( 'scroll', onScroll, { passive: true } );
			onScroll();
		}

		var autoRun = ( drive === 'continuous' && ! reduce );
		if ( ! ( autoRun || allowDrag || drive === 'scroll' ) ) { return; }
		var last = 0;
		var loop = function ( t ) {
			if ( ! last ) { last = t; }
			var dt = ( t - last ) / 1000; last = t;
			if ( ! dragging ) {
				if ( autoRun ) { advance( dt ); }
				if ( momentum && Math.abs( vel ) > 0.02 ) { angle += vel; vel *= 0.95; }
				else if ( drive === 'scroll' && scrollAngle !== null ) { angle += ( scrollAngle - angle ) * 0.14; }
			}
			applyOrbit();
			requestAnimationFrame( loop );
		};
		requestAnimationFrame( loop );
	}

	/**
	 * Photo Scatter — photos scattered flat on a tabletop. The pool is server-rendered; the driver
	 * picks which cards are "on the table", places them on a jittered grid (desk-like, no heavy
	 * collision maths), glides them in from the chosen edge with a stagger, dwells, sweeps them out
	 * and slides the next set in. Auto / click / off cycling; hover-pause; reduced-motion = static.
	 */
	function initScatter( el ) {
		if ( el.__tdgInit ) { return; } el.__tdgInit = true;
		var cards   = el.querySelectorAll( '.tdg__plane > .tdg__card' );
		var pool    = cards.length;
		if ( ! pool ) { return; }
		var visible = clamp( num( el, 'data-tdg-visible', 9 ), 3, 50 );
		var N       = Math.min( visible, pool );
		var sets    = Math.max( 1, Math.ceil( pool / N ) );
		var cycleMd = el.getAttribute( 'data-tdg-cycle' ) || 'auto';
		var dwell   = clamp( num( el, 'data-tdg-dwell', 6 ), 2, 20 ) * 1000;
		var hpause  = !! num( el, 'data-tdg-hpause', 1 );
		var from    = el.getAttribute( 'data-tdg-from' ) || 'edges';
		var rotMax  = clamp( num( el, 'data-tdg-rot', 12 ), 0, 35 );
		var sizeVar = clamp( num( el, 'data-tdg-sizevar', 30 ), 0, 60 ) / 100;
		var spread  = clamp( num( el, 'data-tdg-spread', 90 ), 50, 100 ) / 100;
		var cardPct = clamp( num( el, 'data-tdg-card', 18 ), 8, 40 );
		var exitStyle = el.getAttribute( 'data-tdg-exit' ) || 'sweep'; // sweep | gather | fade
		var centerClear = !! num( el, 'data-tdg-center-clear', 0 ); // ring the cards around a centered heading
		var stage   = el.querySelector( '.tdg__stage' );
		// One-set galleries still animate in the scroll modes (a single set scatters in→out, or the
		// scroll_cycle final grid resolves); only the timed/click cyclers have nothing to shuffle to.
		if ( pool <= N && cycleMd !== 'scroll' && cycleMd !== 'scroll_cycle' ) { cycleMd = 'off'; }

		var setIdx = 0, hovering = false, timer = 0, inView = true, entered = false;

		// One scattered placement for the N slots: a jittered ceil(√N) grid, shuffled so neighbours
		// don't correlate — a natural pile without collision maths. The grid is mapped EDGE-TO-EDGE
		// (the outer rows/cols sit at the frame edges) and `spread` expands the field around centre —
		// ≥ ~95 lets edge cards BLEED off-frame (clipped by the stage's overflow:hidden) for a true
		// edge-to-edge fill instead of an inset island in the middle.
		function placements() {
			var g = Math.ceil( Math.sqrt( N ) ), cells = [], i;
			for ( i = 0; i < g * g; i++ ) { cells.push( i ); }
			for ( i = cells.length - 1; i > 0; i-- ) { var j = ( Math.random() * ( i + 1 ) ) | 0, t = cells[ i ]; cells[ i ] = cells[ j ]; cells[ j ] = t; }
			var out = [], denom = ( g > 1 ) ? ( g - 1 ) : 1, reach = spread * 106;   // spread is already 0–1
			for ( i = 0; i < N; i++ ) {
				var c  = cells[ i ], nx = ( c % g ) / denom, ny = ( ( c / g ) | 0 ) / denom;   // 0..1 edge-to-edge
				var jx = ( Math.random() - 0.5 ) * ( 1 / g ), jy = ( Math.random() - 0.5 ) * ( 1 / g );
				var px = 50 + ( ( nx + jx ) - 0.5 ) * reach, py = 50 + ( ( ny + jy ) - 0.5 ) * reach;
				if ( centerClear ) {
					// Push any card that lands in a central ellipse outward so a centered heading stays
					// readable — the cards "ring" the text. The zone is wider than tall (headings are wide).
					var nx = ( px - 50 ) / 30, ny = ( py - 50 ) / 22;
					if ( nx * nx + ny * ny < 1 ) {
						var ang = Math.atan2( py - 50, px - 50 ); if ( isNaN( ang ) ) { ang = Math.random() * Math.PI * 2; }
						px = 50 + Math.cos( ang ) * ( 30 + Math.random() * 16 );
						py = 50 + Math.sin( ang ) * ( 24 + Math.random() * 14 );
					}
				}
				out.push( {
					x: px, y: py,
					r: ( Math.random() * 2 - 1 ) * rotMax,
					s: 1 + ( Math.random() * 2 - 1 ) * sizeVar / 2,
					z: 1 + ( ( Math.random() * N ) | 0 ),
				} );
			}
			return out;
		}

		// The TIDY target for the scroll-driven "scatter -> organize" morph: N cards in an even,
		// upright grid (no rotation, uniform size), rows centred. Cards lerp from the scattered
		// placement to this as the visitor scrolls through the scene.
		function organized() {
			var cols = Math.max( 2, Math.min( N, Math.round( Math.sqrt( N ) * 1.4 ) ) );
			var rows = Math.ceil( N / cols );
			var out = [], padx = 0.06, pady = 0.10, i;
			for ( i = 0; i < N; i++ ) {
				var col = i % cols, row = ( i / cols ) | 0;
				var inRow = Math.min( cols, N - row * cols );   // centre a short final row
				var rowPad = ( cols - inRow ) / 2;
				out.push( {
					x: ( padx + ( ( col + rowPad + 0.5 ) / cols ) * ( 1 - padx * 2 ) ) * 100,
					y: ( pady + ( ( row + 0.5 ) / rows ) * ( 1 - pady * 2 ) ) * 100,
					r: 0, s: 1, z: i + 1,
				} );
			}
			return out;
		}

		function applySet( idx, animateIn ) {
			var start = idx * N, i, k = 0;
			for ( i = 0; i < pool; i++ ) {
				var card = cards[ i ];
				var active = ( i >= start && i < start + N ) || ( start + N > pool && i < ( start + N ) % pool );
				if ( ! active ) { card.classList.remove( 'is-set' ); card.style.transitionDelay = '0ms'; card.style.opacity = ''; continue; }
				var p = pts[ k ], off = offDir( p, from );
				card.classList.add( 'is-set' );
				card.style.width  = ( cardPct * p.s ) + '%';
				card.style.zIndex = p.z;
				if ( animateIn ) {
					card.style.transitionDuration = '0ms';
					card.style.transform = 'translate(-50%,-50%) translate(' + off.dx + '%,' + off.dy + '%) rotate(' + ( p.r * 2 ) + 'deg)';
					card.style.left = p.x + '%'; card.style.top = p.y + '%';
					card.style.opacity = '0';
					void card.offsetWidth; // reflow → transition from the off-stage pose
					card.style.transitionDuration = '';
					card.style.transitionDelay = ( k * 90 ) + 'ms';
				} else {
					card.style.left = p.x + '%'; card.style.top = p.y + '%';
				}
				card.style.transform = 'translate(-50%,-50%) rotate(' + p.r + 'deg)';
				card.style.opacity = '1';
				k++;
			}
		}

		function sweepOut( done ) {
			var start = setIdx * N, i, k = 0;
			for ( i = 0; i < pool; i++ ) {
				var card = cards[ i ];
				if ( ! card.classList.contains( 'is-set' ) ) { continue; }
				var p = pts[ k ] || pts[ 0 ];
				if ( exitStyle === 'gather' ) {
					// Converge to a loose stack at the centre (the poly "collect into a pile" moment):
					// each card slides to ~centre with a small residual offset + a lean, then fades.
					var jx = ( Math.random() * 2 - 1 ) * 6, jy = ( Math.random() * 2 - 1 ) * 6;
					card.style.transitionDelay = ( k * 45 ) + 'ms';
					card.style.left = ( 50 + jx ) + '%'; card.style.top = ( 50 + jy ) + '%';
					card.style.transform = 'translate(-50%,-50%) rotate(' + ( ( Math.random() * 2 - 1 ) * 10 ) + 'deg) scale(0.92)';
					card.style.opacity = '0';
				} else if ( exitStyle === 'fade' ) {
					card.style.transitionDelay = ( k * 40 ) + 'ms';
					card.style.opacity = '0';
				} else { // directional sweep — fly out per "Photos exit toward" (nearest edge by default)
					var off = offDir( p, exitStyle );
					card.style.transitionDelay = ( k * 60 ) + 'ms';
					card.style.transform = 'translate(-50%,-50%) translate(' + off.dx + '%,' + off.dy + '%) rotate(' + ( p.r * 1.6 ) + 'deg)';
					card.style.opacity = '0';
				}
				k++;
			}
			setTimeout( done, 700 + N * 60 );
		}

		function shuffle() {
			if ( sets < 2 ) { return; }
			sweepOut( function () {
				setIdx = ( setIdx + 1 ) % sets;
				pts = placements();
				applySet( setIdx, true );
				schedule();
			} );
		}

		function schedule() {
			if ( cycleMd !== 'auto' ) { return; }
			clearTimeout( timer );
			timer = setTimeout( function tick() {
				if ( ! inView || ( hpause && hovering ) ) { timer = setTimeout( tick, 600 ); return; }
				shuffle();
			}, dwell );
		}

		var pts = placements();

		// Shared progress reader for the scroll-driven modes. Resolves the parent scrollytelling
		// Stage LAZILY — the module adds `.upw-story--stage` AFTER this gallery inits, so caching it
		// once would miss it and fall back to the gallery's own progress (frozen while the Stage is
		// pinned → no motion). A RANGED persist layer remaps the story's 0→1 to its own beat slice so
		// the effect completes within its beats. Re-checks each frame until found, then caches.
		var storyEl = null, scene = null;
		function progOf() {
			if ( ! storyEl && el.closest ) { storyEl = el.closest( '.upw-story--stage' ); }
			if ( storyEl && typeof storyEl.__storyProgress === 'number' ) {
				var pr = storyEl.__storyProgress;
				if ( scene === null ) { scene = ( el.closest && el.closest( '.upw-story-scene' ) ) || false; }
				if ( scene && storyEl.__storyBeats ) {
					// Remap the story's 0→1 to THIS scene's beat slice so the effect completes within its
					// own scroll span: a ranged persist layer uses [__pFrom, __pTo]; a normal beat scene
					// (a gallery placed inside one) uses its single [__beatIndex, __beatIndex].
					var from, to;
					if ( typeof scene.__pFrom === 'number' ) { from = scene.__pFrom; to = scene.__pTo; }
					else if ( typeof scene.__beatIndex === 'number' ) { from = scene.__beatIndex; to = scene.__beatIndex; }
					if ( from !== undefined ) {
						var lo = from / storyEl.__storyBeats, hi = ( to + 1 ) / storyEl.__storyBeats;
						if ( hi > lo ) { pr = Math.max( 0, Math.min( 1, ( pr - lo ) / ( hi - lo ) ) ); }
					}
				}
				return pr;
			}
			return scrollProgress( el, stage );
		}
		function clamp01( t ) { return t < 0 ? 0 : t > 1 ? 1 : t; }
		function ease( t ) { t = clamp01( t ); return t * t * ( 3 - 2 * t ); }
		function lerp( a, b, t ) { return a + ( b - a ) * t; }

		// Off-stage displacement (dx,dy in %) for a resting position, per an enter/exit direction.
		// 'random' is resolved ONCE at setup (stable across frames); 'gather'/'fade' are non-directional
		// (0,0 — those exits are handled specially in the render).
		function offDir( p, mode ) {
			if ( mode === 'random' ) { mode = [ 'up', 'right', 'down', 'left' ][ ( Math.random() * 4 ) | 0 ]; }
			if ( mode === 'top' || mode === 'up' ) { return { dx: 0, dy: -130 }; }
			if ( mode === 'bottom' || mode === 'down' ) { return { dx: 0, dy: 130 }; }
			if ( mode === 'left' ) { return { dx: -130, dy: 0 }; }
			if ( mode === 'right' ) { return { dx: 130, dy: 0 }; }
			if ( mode === 'sides' ) { return { dx: p.x < 50 ? -130 : 130, dy: 0 }; }
			if ( mode === 'gather' || mode === 'fade' ) { return { dx: 0, dy: 0 }; }
			var dl = p.x, dr = 100 - p.x, dt = p.y, db = 100 - p.y, m = Math.min( dl, dr, dt, db ); // edges/sweep — nearest
			if ( m === dt ) { return { dx: 0, dy: -130 }; }
			if ( m === db ) { return { dx: 0, dy: 130 }; }
			if ( m === dl ) { return { dx: -130, dy: 0 }; }
			return { dx: 130, dy: 0 };
		}

		// SCROLL mode: the pile organizes itself as you scroll. Cards lerp from the scattered
		// placement to the tidy grid by scroll progress (0 = scattered pile, 1 = organized grid) —
		// the poly "find your files -> your search results" moment. Content stays live, editable cards.
		if ( cycleMd === 'scroll' ) {
			var scat = pts, org = organized(), setEls = [], i2;
			for ( i2 = 0; i2 < pool; i2++ ) {
				var c2 = cards[ i2 ];
				if ( i2 < N ) {
					c2.classList.add( 'is-set' );
					c2.style.transition = 'none';      // scroll-driven — no CSS transition lag
					c2.style.transitionDelay = '0ms';
					c2.style.opacity = '1';
					setEls.push( c2 );
				} else { c2.classList.remove( 'is-set' ); c2.style.opacity = ''; }
			}
			var renderScroll = function () {
				var t = ease( progOf() );   // smoothstep for a soft settle
				for ( var k = 0; k < setEls.length; k++ ) {
					var a = scat[ k ], b = org[ k ], card = setEls[ k ];
					if ( ! a || ! b || ! card ) { continue; }
					card.style.width  = ( cardPct * ( a.s + ( b.s - a.s ) * t ) ) + '%';
					card.style.left   = ( a.x + ( b.x - a.x ) * t ) + '%';
					card.style.top    = ( a.y + ( b.y - a.y ) * t ) + '%';
					card.style.transform = 'translate(-50%,-50%) rotate(' + ( a.r + ( b.r - a.r ) * t ) + 'deg)';
					card.style.zIndex = Math.round( a.z + ( b.z - a.z ) * t );
				}
			};
			// Drive with a rAF loop WHILE IN VIEW (not just scroll events): inside a pinned Stage the
			// element's own position is frozen but story progress keeps advancing, and smooth-scroll
			// libraries don't always emit a 'scroll' per frame — rAF reads the freshest progress.
			var sraf = 0, sInView = true;
			var loop = function () { if ( ! sInView ) { sraf = 0; return; } renderScroll(); sraf = requestAnimationFrame( loop ); };
			if ( 'IntersectionObserver' in window ) {
				new IntersectionObserver( function ( es ) {
					sInView = es[ 0 ].isIntersecting;
					if ( sInView && ! sraf ) { sraf = requestAnimationFrame( loop ); }
				}, { threshold: 0 } ).observe( storyEl || el );
			} else { sraf = requestAnimationFrame( loop ); }
			window.addEventListener( 'resize', renderScroll, { passive: true } );
			renderScroll();
			return;   // scroll mode fully handles placement + motion
		}

		// SCROLL-CYCLE mode (Poly's cinematic pile): as the visitor scrolls, each SET of photos flies
		// in from the chosen edge, holds scattered, then flies back out — one set after the next.
		// Optionally the LAST set arrives as a tidy grid (entering from the bottom, the "search
		// results" resolution) with a couple of corner stragglers from the previous set. Fully
		// scroll-scrubbed; content stays live, editable cards — no baked footage.
		if ( cycleMd === 'scroll_cycle' ) {
			var setsN    = Math.max( 1, Math.ceil( pool / N ) );
			var finalOrg = !! num( el, 'data-tdg-final-org', 1 );
			var corners  = !! num( el, 'data-tdg-corners', 0 );
			var orgG     = organized();
			// Per-set, per-slot poses (scatter target, resting target, enter/exit offsets), computed
			// ONCE so positions are stable frame to frame.
			var setData = [], s, k;
			for ( s = 0; s < setsN; s++ ) {
				var placeS = placements(), isFin = ( s === setsN - 1 ), poses = [];
				for ( k = 0; k < placeS.length; k++ ) {
					var scatP = placeS[ k ];
					var orgP  = ( isFin && finalOrg && orgG[ k ] ) ? orgG[ k ] : null;
					var restP = orgP || scatP;
					poses.push( {
						scat: scatP, rest: restP, org: !! orgP,
						enterOff: offDir( restP, ( isFin && finalOrg ) ? 'bottom' : from ),
						exitOff:  offDir( scatP, exitStyle ),
						gJx: ( Math.random() * 2 - 1 ) * 15, gJy: ( Math.random() * 2 - 1 ) * 12, gR: ( Math.random() * 2 - 1 ) * 17,
						corner: null,
					} );
				}
				setData.push( { isFin: isFin, poses: poses } );
			}
			// Corner stragglers: pin two cards of the set JUST BEFORE the final one to the corners so
			// they linger as the grid enters (bounded — never accumulates across the whole scroll).
			if ( corners && setsN >= 2 ) {
				var pen = setData[ setsN - 2 ].poses, spots = [ { x: 9, y: 12 }, { x: 91, y: 14 } ];
				for ( var ci = 0; ci < Math.min( 2, pen.length ); ci++ ) { pen[ ci ].corner = spots[ ci ]; }
			}
			function setCard( card, L, T, tx, ty, r, w, z, op ) {
				card.style.left = L + '%'; card.style.top = T + '%';
				card.style.transform = 'translate(-50%,-50%) translate(' + tx + '%,' + ty + '%) rotate(' + r + 'deg)';
				card.style.width = w + '%'; card.style.zIndex = z; card.style.opacity = op;
			}
			// Position ONE card given its set-local progress u (may be <0 before its turn, >1 after).
			function placeCard( card, po, u, isFin ) {
				var scatP = po.scat, restP = po.rest, w0 = cardPct * scatP.s, wR = cardPct * restP.s, e, x;
				if ( u <= 0 ) { // not entered yet — parked at its enter-offstage, hidden
					setCard( card, restP.x, restP.y, po.enterOff.dx, po.enterOff.dy, restP.r, wR, scatP.z, 0 ); return;
				}
				if ( isFin && po.org ) { // final organized set: enter once, then rest forever (no exit)
					e = ease( u / 0.5 );
					setCard( card, restP.x, restP.y, po.enterOff.dx * ( 1 - e ), po.enterOff.dy * ( 1 - e ), restP.r, wR, 30 + scatP.z, clamp01( u / 0.12 ) ); return;
				}
				if ( u < 0.28 ) { // ENTER: slide from the enter edge to the scatter pose
					e = ease( u / 0.28 );
					setCard( card, scatP.x, scatP.y, po.enterOff.dx * ( 1 - e ), po.enterOff.dy * ( 1 - e ), scatP.r, w0, scatP.z, clamp01( u / 0.09 ) );
				} else if ( u <= 0.72 ) { // HOLD: resting scatter (a long dwell so the set reads clearly)
					setCard( card, scatP.x, scatP.y, 0, 0, scatP.r, w0, scatP.z, 1 );
				} else if ( u < 1 ) { // EXIT: clear per the exit direction/style
					x = ease( ( u - 0.72 ) / 0.28 );
					if ( exitStyle === 'gather' ) {
						// Gather into a centred OVERLAPPING PILE (poly's "all your files" stack): converge to
						// centre with a loose stack spread + natural lean, keeping FULL size so the cards
						// overlap into a visible pile (not a shrinking cluster). It forms over the first ~70%
						// and HOLDS, then fades only at the very end so the next set can enter; later cards
						// stack on top (raised z).
						var pileT = ease( clamp01( x / 0.7 ) );
						setCard( card, lerp( scatP.x, 50 + po.gJx, pileT ), lerp( scatP.y, 50 + po.gJy, pileT ), 0, 0, lerp( scatP.r, po.gR, pileT ), w0, 30 + scatP.z, x < 0.86 ? 1 : ( 1 - ( x - 0.86 ) / 0.14 ) );
					} else if ( exitStyle === 'fade' ) {
						setCard( card, scatP.x, scatP.y, 0, 0, scatP.r, w0, scatP.z, 1 - x );
					} else { // directional sweep (nearest/up/down/sides)
						setCard( card, scatP.x, scatP.y, po.exitOff.dx * x, po.exitOff.dy * x, scatP.r * ( 1 + 0.6 * x ), w0, scatP.z, 1 - clamp01( ( x - 0.2 ) / 0.8 ) );
					}
				} else { // PAST exit — corner straggler stays; everyone else is gone
					if ( po.corner ) { setCard( card, po.corner.x, po.corner.y, 0, 0, scatP.r * 0.6, w0 * 0.9, 5, 0.5 ); }
					else { setCard( card, scatP.x, scatP.y, po.exitOff.dx, po.exitOff.dy, scatP.r, w0, scatP.z, 0 ); }
				}
			}
			for ( var ii = 0; ii < pool; ii++ ) { cards[ ii ].classList.add( 'is-set' ); cards[ ii ].style.transition = 'none'; cards[ ii ].style.transitionDelay = '0ms'; }

			if ( reduce ) { // reduced motion: show each set's resting layout (final grid visible), no scrub
				for ( var sr = 0; sr < setsN; sr++ ) {
					for ( var kr = 0; kr < setData[ sr ].poses.length; kr++ ) {
						var ir = sr * N + kr; if ( ir >= pool ) { break; }
						var pr2 = setData[ sr ].poses[ kr ];
						setCard( cards[ ir ], pr2.rest.x, pr2.rest.y, 0, 0, pr2.rest.r, cardPct * pr2.rest.s, pr2.scat.z, setData[ sr ].isFin ? 1 : 0 );
					}
				}
				return;
			}
			var renderCycle = function () {
				var p = progOf();
				for ( var s2 = 0; s2 < setsN; s2++ ) {
					var sd = setData[ s2 ], u = ( p - s2 / setsN ) * setsN;
					for ( var k2 = 0; k2 < sd.poses.length; k2++ ) {
						var idx = s2 * N + k2; if ( idx >= pool ) { break; }
						placeCard( cards[ idx ], sd.poses[ k2 ], u, sd.isFin );
					}
				}
			};
			var craf = 0, cInView = true;
			var cloop = function () { if ( ! cInView ) { craf = 0; return; } renderCycle(); craf = requestAnimationFrame( cloop ); };
			if ( 'IntersectionObserver' in window ) {
				new IntersectionObserver( function ( es ) { cInView = es[ 0 ].isIntersecting; if ( cInView && ! craf ) { craf = requestAnimationFrame( cloop ); } }, { threshold: 0 } ).observe( storyEl || el );
			} else { craf = requestAnimationFrame( cloop ); }
			window.addEventListener( 'resize', renderCycle, { passive: true } );
			renderCycle();
			return;   // scroll-cycle mode fully handles placement + motion
		}

		if ( reduce ) { applySet( 0, false ); return; } // reduced motion: static scatter, no cycling

		// Enter once the scatter is actually in view (and pause auto-cycling off-screen).
		if ( 'IntersectionObserver' in window ) {
			var io = new IntersectionObserver( function ( es ) {
				inView = es[ 0 ].isIntersecting;
				if ( inView && ! entered ) { entered = true; applySet( 0, true ); schedule(); }
			}, { threshold: 0.15 } );
			io.observe( el );
		} else { entered = true; applySet( 0, true ); schedule(); }

		el.addEventListener( 'mouseenter', function () { hovering = true; } );
		el.addEventListener( 'mouseleave', function () { hovering = false; } );
		if ( cycleMd === 'click' ) {
			el.addEventListener( 'click', function ( e ) {
				if ( e.target && e.target.closest && e.target.closest( 'a' ) ) { return; } // links keep their job
				shuffle();
			} );
		}
	}

	/* Device Cycler — a device frame whose SCREEN steps through the images one at a time. The active
	 * screen index comes from scroll progress (parent Scroll Story Stage when present, else the
	 * gallery's own viewport travel) or an automatic dwell timer; CSS cross-fades / slides between
	 * them. Every screen is a live editable image. */
	function initDeviceCycler( el ) {
		if ( el.__tdgInit ) { return; } el.__tdgInit = true;
		var cards = el.querySelectorAll( '.tdg__screen .tdg__card' );
		var N = cards.length;
		if ( ! N ) { return; }
		var mode  = el.getAttribute( 'data-tdg-cycle' ) || 'scroll';
		var dwell = clamp( num( el, 'data-tdg-dwell', 3 ), 1, 12 ) * 1000;
		var stage = el.querySelector( '.tdg__stage' );
		var device = el.querySelector( '.tdg__device' );
		var cur = -1;

		// Fit the device to the stage: a tall device (a 9:16 phone) sized purely by Device Size (width)
		// can be TALLER than the stage and get clipped top/bottom by the stage's overflow. Reset to the
		// width-based size, and if that overflows the stage height, scale the width down so it fits.
		function fit() {
			if ( ! device || ! stage ) { return; }
			device.style.width = '';
			var maxH = ( stage.clientHeight || 1 ) * 0.95;
			var dh = device.offsetHeight;
			if ( dh > maxH ) { device.style.width = ( device.offsetWidth * ( maxH / dh ) ) + 'px'; }
		}
		fit();
		window.addEventListener( 'resize', fit, { passive: true } );
		function activate( i ) {
			i = Math.max( 0, Math.min( N - 1, i ) );
			if ( i === cur ) { return; } cur = i;
			for ( var k = 0; k < N; k++ ) { cards[ k ].classList.toggle( 'is-active', k === i ); cards[ k ].classList.toggle( 'is-past', k < i ); }
		}
		activate( 0 );
		if ( reduce || mode === 'off' || N < 2 ) { return; }

		if ( mode === 'scroll' ) {
			var storyEl = null, pScene = null;
			var progOf = function () {
				if ( ! storyEl && el.closest ) { storyEl = el.closest( '.upw-story--stage' ); }
				if ( storyEl && typeof storyEl.__storyProgress === 'number' ) {
					var pr = storyEl.__storyProgress;
					if ( pScene === null ) { pScene = ( el.closest && el.closest( '.upw-story-scene--persist' ) ) || false; }
					if ( pScene && storyEl.__storyBeats && typeof pScene.__pFrom === 'number' ) {
						var lo = pScene.__pFrom / storyEl.__storyBeats, hi = ( pScene.__pTo + 1 ) / storyEl.__storyBeats;
						if ( hi > lo ) { pr = Math.max( 0, Math.min( 1, ( pr - lo ) / ( hi - lo ) ) ); }
					}
					return pr;
				}
				return scrollProgress( el, stage );
			};
			var raf = 0, inView = true;
			var loop = function () { if ( ! inView ) { raf = 0; return; } activate( Math.floor( progOf() * N ) ); raf = requestAnimationFrame( loop ); };
			if ( 'IntersectionObserver' in window ) {
				new IntersectionObserver( function ( es ) { inView = es[ 0 ].isIntersecting; if ( inView && ! raf ) { raf = requestAnimationFrame( loop ); } }, { threshold: 0 } ).observe( el );
			} else { raf = requestAnimationFrame( loop ); }
			return;
		}

		// auto — dwell timer, paused while off-screen.
		var idx = 0, timer = 0, vis = true;
		function tick() { if ( vis ) { idx = ( idx + 1 ) % N; activate( idx ); } timer = setTimeout( tick, dwell ); }
		if ( 'IntersectionObserver' in window ) {
			new IntersectionObserver( function ( es ) { vis = es[ 0 ].isIntersecting; }, { threshold: 0.2 } ).observe( el );
		}
		timer = setTimeout( tick, dwell );
	}

	/* ------------------------------------------------------------------ *
	 * Sphere Cascade — the vertical, spherical sibling of Panorama Wall. A grid of Columns × K cards is
	 * mapped onto a sphere (column = longitude, card = latitude) and CASCADES vertically: each column's
	 * cards scroll along latitude and recycle. Signed Curvature bends BOTH axes from a concave bowl
	 * (viewer inside) through flat to a full convex sphere. Edge Fade dims toward the rim; the latitude
	 * wrap edge fades to hide the recycle. Cards sit tangent to the surface (like Card Sphere).
	 * ------------------------------------------------------------------ */
	function initCascade( el ) {
		if ( el.__tdg ) { return; }
		el.__tdg = true;
		var stage   = el.querySelector( '.tdg__stage' );
		var cascade = el.querySelector( '.tdg__cascade' );
		if ( ! stage || ! cascade ) { return; }
		var cols = Array.prototype.slice.call( cascade.querySelectorAll( '.tdg__col' ) );
		if ( ! cols.length ) { return; }

		var drive    = el.getAttribute( 'data-tdg-drive' ) || 'continuous';
		var speed    = num( el, 'data-tdg-speed', 20 );
		var dir      = num( el, 'data-tdg-dir', 1 );   // +1 up, -1 down
		var alt      = num( el, 'data-tdg-alt', 0 );   // alternate: odd columns cascade the other way
		var curv     = num( el, 'data-tdg-curv', -100 ); // signed: -concave .. +convex
		var tilt     = num( el, 'data-tdg-tilt', 0 );
		var gap      = num( el, 'data-tdg-gap', 5 ) / 100;
		var edge     = clamp( num( el, 'data-tdg-edge', 0 ) / 100, 0, 1 );
		var cardPct  = num( el, 'data-tdg-card', 18 ) / 100;

		var colData = cols.map( function ( cw ) { return { col: cw, cards: Array.prototype.slice.call( cw.querySelectorAll( '.tdg__card' ) ) }; } );
		var C = colData.length;                 // columns
		var K = colData[ 0 ].cards.length;      // cards per column
		if ( ! K ) { return; }
		var zSign = curv >= 0 ? 1 : -1;
		var R = 0, dPhi = 0, dTheta = 0, lonSpan = 0, latSpan = 0, Y = 0, vel = 0;

		function layout() {
			var W = stage.clientWidth || el.clientWidth || 1;
			var cardW = Math.max( 30, W * cardPct );
			var cardH = ( colData[ 0 ].cards[ 0 ] && colData[ 0 ].cards[ 0 ].offsetHeight ) ? colData[ 0 ].cards[ 0 ].offsetHeight : cardW * 0.5625;
			var gapPx = cardW * gap;
			// Radius from |curvature| (inverse: tighter curve = smaller R = more wrap). Same mapping as
			// the Panorama Wall so the two read as siblings.
			var amt = clamp( Math.abs( curv ) / 150, 0.08, 1 );
			R = cardW * 2.87 / amt;
			// Angular steps so neighbours sit edge-to-edge with the gap, on each axis.
			dPhi   = 2 * Math.asin( clamp( ( cardW + gapPx ) / ( 2 * R ), 0, 0.5 ) ) * 180 / Math.PI;
			dTheta = 2 * Math.asin( clamp( ( cardH + gapPx ) / ( 2 * R ), 0, 0.5 ) ) * 180 / Math.PI;
			lonSpan = C * dPhi;
			latSpan = K * dTheta;
			stage.style.perspective = ( W * 1.2 ) + 'px';
			colData.forEach( function ( cd ) {
				cd.cards.forEach( function ( c ) { c.style.width = cardW + 'px'; c.style.marginLeft = ( -cardW / 2 ) + 'px'; c.style.marginTop = ( -cardH / 2 ) + 'px'; } );
			} );
		}

		function applyCascade() {
			// Centre the sphere so its NEAR pole sits at the working depth (z≈0) for ANY radius: cards are
			// at translateZ(zSign·R), so translate the container by -zSign·R. Concave (curv<0) → edges bow
			// TOWARD the viewer (a bowl); convex (curv>0) → centre bulges toward the viewer (a ball). At
			// low |curvature| R is huge, angles tiny → a flat grid filling the frame (no runaway depth).
			cascade.style.transform = 'rotateX(' + tilt + 'deg) translateZ(' + ( -zSign * R ) + 'px)';
			var lonHalf = lonSpan / 2, latHalf = latSpan / 2;
			for ( var j = 0; j < C; j++ ) {
				var cd  = colData[ j ];
				var phi = ( j - ( C - 1 ) / 2 ) * dPhi;                 // fixed column longitude
				var nph = lonHalf > 0 ? Math.abs( phi ) / lonHalf : 0;
				var sdir = alt ? ( j % 2 ? -1 : 1 ) : 1;               // alternate columns cascade opposite
				for ( var k = 0; k < K; k++ ) {
					var c = cd.cards[ k ];
					var raw = ( k - ( K - 1 ) / 2 ) * dTheta + Y * sdir;
					var theta = ( ( raw + latHalf ) % latSpan + latSpan ) % latSpan - latHalf; // wrap into [-latHalf,latHalf)
					var nth = latHalf > 0 ? Math.abs( theta ) / latHalf : 0;
					c.style.transform = 'rotateY(' + phi + 'deg) rotateX(' + ( -theta ) + 'deg) translateZ(' + ( zSign * R ) + 'px)';
					// radial rim fade (both axes) + a hard fade at the latitude wrap edge to hide the recycle
					var af  = Math.min( 1, Math.sqrt( nph * nph + nth * nth ) );
					var vis = nth > 0.86 ? Math.max( 0, ( 1 - nth ) / 0.14 ) : 1;
					c.style.opacity = ( vis * ( 1 - af * af * edge ) ).toFixed( 3 );
					c.style.zIndex = String( 1000 - Math.round( af * 1000 ) );
				}
			}
		}

		layout();
		applyCascade();
		window.addEventListener( 'resize', function () { layout(); applyCascade(); }, { passive: true } );
		var hoverF = hoverFactor( el );
		var allowDrag = num( el, 'data-tdg-allowdrag', 1 );
		var momentum = num( el, 'data-tdg-momentum', 1 );
		var dragging = false, py = 0, scrollY = null;
		var advance = function ( dt ) { Y += dir * ( latSpan / Math.max( 1, speed ) ) * dt * hoverF(); }; // one loop = one full latitude span

		if ( allowDrag ) {
			el.style.cursor = 'grab';
			var down = function ( x, y ) { dragging = true; py = y; vel = 0; el.style.cursor = 'grabbing'; };
			var move = function ( x, y ) { if ( ! dragging ) { return; } var dy = y - py; py = y; Y += dy * 0.15; vel = dy * 0.15; };
			var up = function () { dragging = false; el.style.cursor = 'grab'; };
			attachDrag( el, down, move, up );
		}

		if ( drive === 'scroll' ) {
			var onScroll = function () { scrollY = dir * scrollProgress( el, stage ) * latSpan * 2 * num( el, 'data-tdg-rounds', 1 ); };
			window.addEventListener( 'scroll', onScroll, { passive: true } );
			onScroll();
		}

		var autoRun = ( drive === 'continuous' && ! reduce );
		if ( ! ( autoRun || allowDrag || drive === 'scroll' ) ) { return; }
		var last = 0;
		var loop = function ( t ) {
			if ( ! last ) { last = t; }
			var dt = ( t - last ) / 1000; last = t;
			if ( ! dragging ) {
				if ( autoRun ) { advance( dt ); }
				if ( momentum && Math.abs( vel ) > 0.02 ) { Y += vel; vel *= 0.95; }
				else if ( drive === 'scroll' && scrollY !== null ) { Y += ( scrollY - Y ) * 0.14; }
			}
			applyCascade();
			requestAnimationFrame( loop );
		};
		requestAnimationFrame( loop );
	}

	/* Totem Wall — a flat row of INDEPENDENT vertical cylinders ("totems"). Where Sphere Cascade maps
	 * every column onto ONE shared sphere, here each column is its own vertical barrel: the column sits
	 * at a fixed X and its cards wrap around that column's own horizontal axis (rotateX) into a rounded
	 * pillar. The columns cascade vertically (up / down / alternate) and the cards recycle at the wrap.
	 * Signed Curvature curls each column: negative concave (curves away) → near-flat → positive convex
	 * (bulges toward you into a rounded totem). Zoom sets totem size (fewer, larger totems as it rises).
	 * Shares the cascade DOM (.tdg__cascade > .tdg__col > .tdg__card) and driver shape. */
	function initTotem( el ) {
		if ( el.__tdg ) { return; }
		el.__tdg = true;
		var stage   = el.querySelector( '.tdg__stage' );
		var cascade = el.querySelector( '.tdg__cascade' );
		if ( ! stage || ! cascade ) { return; }
		var cols = Array.prototype.slice.call( cascade.querySelectorAll( '.tdg__col' ) );
		if ( ! cols.length ) { return; }

		var drive = el.getAttribute( 'data-tdg-drive' ) || 'continuous';
		var speed = num( el, 'data-tdg-speed', 20 );
		var dir   = num( el, 'data-tdg-dir', 1 );   // +1 up, -1 down
		var alt   = num( el, 'data-tdg-alt', 0 );   // alternate: odd columns cascade the other way
		var curv  = num( el, 'data-tdg-curv', -150 ); // signed: -concave .. +convex
		var tilt  = num( el, 'data-tdg-tilt', -45 );
		var gap   = num( el, 'data-tdg-gap', 0.5 ) / 100;
		var edge  = clamp( num( el, 'data-tdg-edge', 0 ) / 100, 0, 1 );
		var zoom  = clamp( num( el, 'data-tdg-zoom', 10 ), 0, 100 );

		var colData = cols.map( function ( cw ) { return { col: cw, cards: Array.prototype.slice.call( cw.querySelectorAll( '.tdg__card' ) ) }; } );
		var C = colData.length;                 // totems (columns)
		var K = colData[ 0 ].cards.length;      // cards per totem
		if ( ! K ) { return; }
		var zSign = curv >= 0 ? 1 : -1;
		var R = 0, dTheta = 0, latSpan = 0, pitchX = 0, cardW = 0, cardH = 0, Y = 0, vel = 0;

		function layout() {
			var W = stage.clientWidth || el.clientWidth || 1;
			// Zoom → card width as a fraction of the stage: higher zoom = larger totems, fewer visible
			// (the rim totems fall off the sides and fade). Matches the reference "Zoom" behaviour.
			var cardPct = 0.10 + ( zoom / 100 ) * 0.30;
			cardW = Math.max( 30, W * cardPct );
			cardH = ( colData[ 0 ].cards[ 0 ] && colData[ 0 ].cards[ 0 ].offsetHeight ) ? colData[ 0 ].cards[ 0 ].offsetHeight : cardW * 0.5625;
			var gapPx = cardW * gap;
			// Radius from |curvature| (inverse: tighter curve = smaller R = more wrap), keyed to card
			// HEIGHT because the totem wraps vertically. Same 2.87 constant as its horizontal sibling
			// (Panorama Wall) so the two curves read alike.
			var amt = clamp( Math.abs( curv ) / 150, 0.08, 1 );
			R = cardH * 2.87 / amt;
			dTheta = 2 * Math.asin( clamp( ( cardH + gapPx ) / ( 2 * R ), 0, 0.5 ) ) * 180 / Math.PI;
			latSpan = K * dTheta;
			pitchX  = cardW + gapPx;                // horizontal spacing between totems
			stage.style.perspective = ( W * 1.2 ) + 'px';
			colData.forEach( function ( cd ) {
				cd.cards.forEach( function ( c ) { c.style.width = cardW + 'px'; c.style.marginLeft = ( -cardW / 2 ) + 'px'; c.style.marginTop = ( -cardH / 2 ) + 'px'; } );
			} );
		}

		function applyTotem() {
			// The whole wall only tips (Tilt). Each column is centred at the stage origin, then pushed to
			// its X slot and depth-centred so its NEAR face sits at z≈0 for ANY radius (cards translateZ
			// (zSign·R); the column translates by -zSign·R). So concave (curv<0) curls the totem away, and
			// convex (curv>0) bulges it toward the viewer — each column independent, in a flat row.
			// Tilt tips the wall; perspective then foreshortens it and drags the projected centre down, so
			// re-centre with a translateY that scales with the radius and the tilt (keeps it filling the stage).
			var comp = R * Math.sin( tilt * Math.PI / 180 );
			cascade.style.transform = 'translateY(' + comp.toFixed( 1 ) + 'px) rotateX(' + tilt + 'deg)';
			var latHalf = latSpan / 2;
			var xHalf   = ( C - 1 ) / 2;
			for ( var j = 0; j < C; j++ ) {
				var cd = colData[ j ];
				var x  = ( j - xHalf ) * pitchX;
				cd.col.style.transform = 'translateX(' + x + 'px) translateZ(' + ( -zSign * R ) + 'px)';
				var nx   = xHalf > 0 ? Math.abs( j - xHalf ) / xHalf : 0; // 0 centre column .. 1 rim column
				var sdir = alt ? ( j % 2 ? -1 : 1 ) : 1;                  // alternate columns cascade opposite
				for ( var k = 0; k < K; k++ ) {
					var c   = cd.cards[ k ];
					var raw = ( k - ( K - 1 ) / 2 ) * dTheta + Y * sdir;
					var theta = ( ( raw + latHalf ) % latSpan + latSpan ) % latSpan - latHalf; // wrap into [-latHalf,latHalf)
					var nth = latHalf > 0 ? Math.abs( theta ) / latHalf : 0;
					c.style.transform = 'rotateX(' + ( -theta ) + 'deg) translateZ(' + ( zSign * R ) + 'px)';
					// hard fade at the wrap edge hides the recycle; Edge Fade dims the rim totems (left/right).
					var vis = nth > 0.86 ? Math.max( 0, ( 1 - nth ) / 0.14 ) : 1;
					c.style.opacity = ( vis * ( 1 - nx * nx * edge ) ).toFixed( 3 );
					c.style.zIndex = String( 1000 - Math.round( nth * 1000 ) );
				}
			}
		}

		layout();
		applyTotem();
		window.addEventListener( 'resize', function () { layout(); applyTotem(); }, { passive: true } );
		var hoverF = hoverFactor( el );
		var allowDrag = num( el, 'data-tdg-allowdrag', 1 );
		var momentum = num( el, 'data-tdg-momentum', 1 );
		var dragging = false, py = 0, scrollY = null;
		var advance = function ( dt ) { Y += dir * ( latSpan / Math.max( 1, speed ) ) * dt * hoverF(); }; // one loop = one latitude span

		if ( allowDrag ) {
			el.style.cursor = 'grab';
			var down = function ( x, y ) { dragging = true; py = y; vel = 0; el.style.cursor = 'grabbing'; };
			var move = function ( x, y ) { if ( ! dragging ) { return; } var dy = y - py; py = y; Y += dy * 0.15; vel = dy * 0.15; };
			var up = function () { dragging = false; el.style.cursor = 'grab'; };
			attachDrag( el, down, move, up );
		}

		if ( drive === 'scroll' ) {
			var onScroll = function () { scrollY = dir * scrollProgress( el, stage ) * latSpan * 2 * num( el, 'data-tdg-rounds', 1 ); };
			window.addEventListener( 'scroll', onScroll, { passive: true } );
			onScroll();
		}

		var autoRun = ( drive === 'continuous' && ! reduce );
		if ( ! ( autoRun || allowDrag || drive === 'scroll' ) ) { return; }
		var last = 0;
		var loop = function ( t ) {
			if ( ! last ) { last = t; }
			var dt = ( t - last ) / 1000; last = t;
			if ( ! dragging ) {
				if ( autoRun ) { advance( dt ); }
				if ( momentum && Math.abs( vel ) > 0.02 ) { Y += vel; vel *= 0.95; }
				else if ( drive === 'scroll' && scrollY !== null ) { Y += ( scrollY - Y ) * 0.14; }
			}
			applyTotem();
			requestAnimationFrame( loop );
		};
		requestAnimationFrame( loop );
	}

	/* Parallax Totem — the depth-scatter sibling of Totem Wall. Same flat row of vertical totems
	 * (columns wrapping their cards around a horizontal axis, cascading vertically), but every card also
	 * gets a SEEDED depth (translateZ), size and position jitter, and drifts at a depth-varied speed —
	 * near cards scroll faster than far ones (the parallax). At Scatter/Size/Parallax all 0 it is a
	 * clean vertical grid; raised, it becomes a floating depth field. Seeded so the layout is stable. */
	function initParallax( el ) {
		if ( el.__tdg ) { return; }
		el.__tdg = true;
		var stage   = el.querySelector( '.tdg__stage' );
		var cascade = el.querySelector( '.tdg__cascade' );
		if ( ! stage || ! cascade ) { return; }
		var cols = Array.prototype.slice.call( cascade.querySelectorAll( '.tdg__col' ) );
		if ( ! cols.length ) { return; }

		var drive    = el.getAttribute( 'data-tdg-drive' ) || 'continuous';
		var speed    = num( el, 'data-tdg-speed', 20 );
		var dir      = num( el, 'data-tdg-dir', 1 );   // +1 up, -1 down
		var curv     = num( el, 'data-tdg-curv', -150 );
		var gap      = num( el, 'data-tdg-gap', 0.5 ) / 100;
		var edge     = clamp( num( el, 'data-tdg-edge', 0 ) / 100, 0, 1 );
		var zoom     = clamp( num( el, 'data-tdg-zoom', 10 ), 0, 100 );
		var scatter  = clamp( num( el, 'data-tdg-scatter', 0 ) / 100, 0, 1 );
		var sizeVar  = clamp( num( el, 'data-tdg-sizevar', 0 ) / 100, 0, 1 );
		var parallax = clamp( num( el, 'data-tdg-parallax', 0 ) / 100, 0, 1 );

		// Stable per-card pseudo-random in [0,1) from the (column,row,salt) triple — no Math.random so the
		// scatter never reshuffles between frames or reloads.
		function rnd( c, k, salt ) { var x = Math.sin( ( c + 1 ) * 127.1 + ( k + 1 ) * 311.7 + salt * 74.7 ) * 43758.5453; return x - Math.floor( x ); }

		var colData = cols.map( function ( cw ) { return { col: cw, cards: Array.prototype.slice.call( cw.querySelectorAll( '.tdg__card' ) ) }; } );
		var C = colData.length;
		var K = colData[ 0 ].cards.length;
		if ( ! K ) { return; }
		var zSign = curv >= 0 ? 1 : -1;
		var R = 0, dTheta = 0, latSpan = 0, pitchX = 0, cardW = 0, cardH = 0, Y = 0, vel = 0;
		// bake the seeded per-card variation once
		colData.forEach( function ( cd, c ) {
			cd.meta = cd.cards.map( function ( _, k ) {
				var d = rnd( c, k, 1 ) * 2 - 1;      // depth −1 (far) .. +1 (near)
				return {
					depth: d,
					size:  1 + sizeVar * ( rnd( c, k, 2 ) - 0.5 ) * 1.3,
					jx:    ( rnd( c, k, 3 ) - 0.5 ),
					jy:    ( rnd( c, k, 4 ) - 0.5 ),
					spd:   1 + parallax * d * 0.85    // near cards drift faster (the parallax)
				};
			} );
		} );

		function layout() {
			var W = stage.clientWidth || el.clientWidth || 1;
			var cardPct = 0.10 + ( zoom / 100 ) * 0.30;
			cardW = Math.max( 30, W * cardPct );
			cardH = ( colData[ 0 ].cards[ 0 ] && colData[ 0 ].cards[ 0 ].offsetHeight ) ? colData[ 0 ].cards[ 0 ].offsetHeight : cardW * 0.5625;
			var gapPx = cardW * gap;
			var amt = clamp( Math.abs( curv ) / 150, 0.08, 1 );
			R = cardH * 2.87 / amt;
			dTheta = 2 * Math.asin( clamp( ( cardH + gapPx ) / ( 2 * R ), 0, 0.5 ) ) * 180 / Math.PI;
			latSpan = K * dTheta;
			pitchX  = cardW + gapPx;
			stage.style.perspective = ( W * 1.2 ) + 'px';
			colData.forEach( function ( cd ) {
				cd.cards.forEach( function ( c ) { c.style.width = cardW + 'px'; c.style.marginLeft = ( -cardW / 2 ) + 'px'; c.style.marginTop = ( -cardH / 2 ) + 'px'; } );
			} );
		}

		function applyParallax() {
			cascade.style.transform = ''; // no tilt on the parallax field
			var latHalf = latSpan / 2, xHalf = ( C - 1 ) / 2;
			for ( var j = 0; j < C; j++ ) {
				var cd = colData[ j ];
				var x  = ( j - xHalf ) * pitchX;
				cd.col.style.transform = 'translateX(' + x + 'px) translateZ(' + ( -zSign * R ) + 'px)';
				var nx = xHalf > 0 ? Math.abs( j - xHalf ) / xHalf : 0;
				for ( var k = 0; k < K; k++ ) {
					var c = cd.cards[ k ], m = cd.meta[ k ];
					var raw = ( k - ( K - 1 ) / 2 ) * dTheta + Y * m.spd;   // parallax: per-card drift rate
					var theta = ( ( raw + latHalf ) % latSpan + latSpan ) % latSpan - latHalf;
					var nth = latHalf > 0 ? Math.abs( theta ) / latHalf : 0;
					var jitX  = m.jx * scatter * pitchX * 0.85;
					var jitY  = m.jy * scatter * cardH * 1.3;
					var depthZ = m.depth * parallax * cardW * 1.6;         // seeded depth offset (parallax volume)
					c.style.transform = 'translate3d(' + jitX.toFixed( 1 ) + 'px,' + jitY.toFixed( 1 ) + 'px,' + depthZ.toFixed( 1 ) + 'px) '
						+ 'rotateX(' + ( -theta ) + 'deg) translateZ(' + ( zSign * R ) + 'px) scale(' + m.size.toFixed( 3 ) + ')';
					var vis = nth > 0.86 ? Math.max( 0, ( 1 - nth ) / 0.14 ) : 1;
					var dfade = m.depth < 0 ? ( 1 + m.depth * parallax * 0.55 ) : 1; // far cards dim a touch
					c.style.opacity = ( vis * ( 1 - nx * nx * edge ) * dfade ).toFixed( 3 );
					c.style.zIndex = String( 1000 + Math.round( m.depth * 400 ) - Math.round( nth * 600 ) );
				}
			}
		}

		layout();
		applyParallax();
		window.addEventListener( 'resize', function () { layout(); applyParallax(); }, { passive: true } );
		var hoverF = hoverFactor( el );
		var allowDrag = num( el, 'data-tdg-allowdrag', 1 );
		var momentum = num( el, 'data-tdg-momentum', 1 );
		var dragging = false, py = 0, scrollY = null;
		var advance = function ( dt ) { Y += dir * ( latSpan / Math.max( 1, speed ) ) * dt * hoverF(); };

		if ( allowDrag ) {
			el.style.cursor = 'grab';
			var down = function ( x, y ) { dragging = true; py = y; vel = 0; el.style.cursor = 'grabbing'; };
			var move = function ( x, y ) { if ( ! dragging ) { return; } var dy = y - py; py = y; Y += dy * 0.15; vel = dy * 0.15; };
			var up = function () { dragging = false; el.style.cursor = 'grab'; };
			attachDrag( el, down, move, up );
		}

		if ( drive === 'scroll' ) {
			var onScroll = function () { scrollY = dir * scrollProgress( el, stage ) * latSpan * 2 * num( el, 'data-tdg-rounds', 1 ); };
			window.addEventListener( 'scroll', onScroll, { passive: true } );
			onScroll();
		}

		var autoRun = ( drive === 'continuous' && ! reduce );
		if ( ! ( autoRun || allowDrag || drive === 'scroll' ) ) { return; }
		var last = 0;
		var loop = function ( t ) {
			if ( ! last ) { last = t; }
			var dt = ( t - last ) / 1000; last = t;
			if ( ! dragging ) {
				if ( autoRun ) { advance( dt ); }
				if ( momentum && Math.abs( vel ) > 0.02 ) { Y += vel; vel *= 0.95; }
				else if ( drive === 'scroll' && scrollY !== null ) { Y += ( scrollY - Y ) * 0.14; }
			}
			applyParallax();
			requestAnimationFrame( loop );
		};
		requestAnimationFrame( loop );
	}

	/* Card Tunnel — an infinite perspective corridor. Four walls (ceiling / floor / left / right), each a
	 * ribbon of cards tiled along the tunnel axis (Z), receding to a central vanishing point. The whole
	 * set flies Forward or Backward and recycles seamlessly (a card fading out at the near mouth is the
	 * same one reappearing, dim, at the far end). Tunnel Size sets the corridor width; Card Length the
	 * per-card depth; Depth Fade dims the far end into the dark. Cards are sized to their wall (not by
	 * card ratio), so the images fill each wall segment. */
	function initTunnel( el ) {
		if ( el.__tdg ) { return; }
		el.__tdg = true;
		var stage  = el.querySelector( '.tdg__stage' );
		var tunnel = el.querySelector( '.tdg__tunnel' );
		if ( ! stage || ! tunnel ) { return; }
		var walls = [ 'top', 'bottom', 'left', 'right' ].map( function ( n ) {
			var w = el.querySelector( '.tdg__wall--' + n );
			return { name: n, cards: w ? Array.prototype.slice.call( w.querySelectorAll( '.tdg__card' ) ) : [] };
		} );
		var N = walls[ 0 ].cards.length;
		if ( ! N ) { return; }

		var drive = el.getAttribute( 'data-tdg-drive' ) || 'continuous';
		var speed = num( el, 'data-tdg-speed', 20 );
		var dir   = num( el, 'data-tdg-dir', 1 );                 // +1 forward (into the tunnel), -1 backward
		var tsize = clamp( num( el, 'data-tdg-tsize', 60 ), 0, 120 ) / 100;
		var clen  = clamp( num( el, 'data-tdg-clen', 30 ), 0, 120 ) / 100;
		var gap   = clamp( num( el, 'data-tdg-gap', 2 ), 0, 40 ) / 100;
		var dfade = clamp( num( el, 'data-tdg-dfade', 0 ) / 100, 0, 1 );
		var spiral = num( el, 'data-tdg-spiral', 0 );            // degrees of corridor roll per full pass
		var square = num( el, 'data-tdg-square', 0 );            // 1 = equal-sided (square) cross-section
		var W = 0, H = 0, L = 0, step = 0, D = 0, Y = 0, vel = 0;

		function layout() {
			var SW = stage.clientWidth || el.clientWidth || 1;
			var SH = stage.clientHeight || el.clientHeight || 1;
			W = SW * 0.5 * tsize; H = SH * 0.5 * tsize;          // half tunnel width / height
			if ( square ) { var sq = Math.min( SW, SH ) * 0.5 * tsize; W = sq; H = sq; }
			L = SW * ( 0.15 + clen * 0.6 );                       // per-card depth (Z-length)
			step = L + L * gap;                                    // card + gap along Z
			D = step * N;                                          // full tunnel length → seamless wrap
			stage.style.perspective = ( SW * 0.72 ) + 'px';
			walls.forEach( function ( wl ) {
				var horiz = ( wl.name === 'top' || wl.name === 'bottom' );
				var w = horiz ? ( 2 * W ) : L, h = horiz ? L : ( 2 * H );
				wl.cards.forEach( function ( c ) { c.style.width = w + 'px'; c.style.height = h + 'px'; c.style.marginLeft = ( -w / 2 ) + 'px'; c.style.marginTop = ( -h / 2 ) + 'px'; } );
			} );
		}

		function applyTunnel() {
			// Spiral: roll the whole corridor as it flies (rotateZ grows with travel), turning the straight
			// tube into a helix. 0 = off.
			tunnel.style.transform = spiral ? ( 'rotateZ(' + ( spiral * ( Y / ( D || 1 ) ) ).toFixed( 2 ) + 'deg)' ) : '';
			for ( var wi = 0; wi < walls.length; wi++ ) {
				var wl = walls[ wi ];
				for ( var i = 0; i < N; i++ ) {
					var c = wl.cards[ i ];
					var raw  = i * step - Y * dir;
					var zpos = ( ( raw % D ) + D ) % D;             // [0,D)
					var z    = -zpos;                               // 0 near mouth .. -D far end
					var pFar = zpos / D;                            // 0 near .. 1 far
					var base;
					if ( wl.name === 'top' )         { base = 'translate3d(0,' + ( -H ) + 'px,' + z + 'px) rotateX(-90deg)'; }
					else if ( wl.name === 'bottom' ) { base = 'translate3d(0,' + ( H )  + 'px,' + z + 'px) rotateX(90deg)'; }
					else if ( wl.name === 'left' )   { base = 'translate3d(' + ( -W ) + 'px,0,' + z + 'px) rotateY(90deg)'; }
					else                             { base = 'translate3d(' + ( W )  + 'px,0,' + z + 'px) rotateY(-90deg)'; }
					c.style.transform = base;
					// fade both wrap seams (near mouth + far end) so the recycle is invisible either direction,
					// plus the optional Depth Fade dimming toward the far end.
					var seam = pFar < 0.06 ? pFar / 0.06 : ( pFar > 0.94 ? ( 1 - pFar ) / 0.06 : 1 );
					c.style.opacity = ( seam * ( 1 - dfade * pFar * pFar ) ).toFixed( 3 );
					c.style.zIndex = String( 1000 - Math.round( pFar * 1000 ) );
				}
			}
		}

		layout();
		applyTunnel();
		window.addEventListener( 'resize', function () { layout(); applyTunnel(); }, { passive: true } );
		var hoverF = hoverFactor( el );
		var allowDrag = num( el, 'data-tdg-allowdrag', 1 );
		var momentum = num( el, 'data-tdg-momentum', 1 );
		var dragging = false, py = 0, scrollY = null;
		var advance = function ( dt ) { Y += ( D / Math.max( 1, speed ) ) * dt * hoverF(); }; // one loop = whole tunnel

		if ( allowDrag ) {
			el.style.cursor = 'grab';
			var down = function ( x, y ) { dragging = true; py = y; vel = 0; el.style.cursor = 'grabbing'; };
			var move = function ( x, y ) { if ( ! dragging ) { return; } var dy = y - py; py = y; var d = -dy * step * 0.05; Y += d; vel = d; };
			var up = function () { dragging = false; el.style.cursor = 'grab'; };
			attachDrag( el, down, move, up );
		}

		if ( drive === 'scroll' ) {
			var onScroll = function () { scrollY = scrollProgress( el, stage ) * D * 2 * num( el, 'data-tdg-rounds', 1 ); };
			window.addEventListener( 'scroll', onScroll, { passive: true } );
			onScroll();
		}

		var autoRun = ( drive === 'continuous' && ! reduce );
		if ( ! ( autoRun || allowDrag || drive === 'scroll' ) ) { return; }
		var last = 0;
		var loop = function ( t ) {
			if ( ! last ) { last = t; }
			var dt = ( t - last ) / 1000; last = t;
			if ( ! dragging ) {
				if ( autoRun ) { advance( dt ); }
				if ( momentum && Math.abs( vel ) > 0.02 ) { Y += vel; vel *= 0.95; }
				else if ( drive === 'scroll' && scrollY !== null ) { Y += ( scrollY - Y ) * 0.14; }
			}
			applyTunnel();
			requestAnimationFrame( loop );
		};
		requestAnimationFrame( loop );
	}

	/* Spiral Stream — cards threaded along a 3D helix that streams past the camera. Each card sits at a
	 * point on the spiral (angle = position along it × Spiral Turns) at a tapering radius (Taper narrows
	 * the coil into a vortex or flares it out) and rotates around its own vertical axis as it goes — so
	 * you see fronts, edges and mirrored backs, upright throughout. The whole helix tips by Ring Tilt;
	 * Perspective sets the depth, Back Fade dims the tail, Scale Pulse breathes the card sizes. */
	function initSpiral( el ) {
		if ( el.__tdg ) { return; }
		el.__tdg = true;
		var stage  = el.querySelector( '.tdg__stage' );
		var spiral = el.querySelector( '.tdg__spiral' );
		if ( ! stage || ! spiral ) { return; }
		var cards = Array.prototype.slice.call( spiral.querySelectorAll( '.tdg__card' ) );
		var Nc = cards.length;
		if ( ! Nc ) { return; }

		var drive = el.getAttribute( 'data-tdg-drive' ) || 'continuous';
		var speed = num( el, 'data-tdg-speed', 20 );
		var dir   = num( el, 'data-tdg-dir', 1 );
		var turns = clamp( num( el, 'data-tdg-turns', 1 ), 0.25, 6 );
		var size  = clamp( num( el, 'data-tdg-size', 35 ), 0, 100 ) / 100;
		var taper = clamp( num( el, 'data-tdg-taper', -90 ), -100, 100 ) / 100;
		var cardPct = clamp( num( el, 'data-tdg-card', 12 ), 0, 60 ) / 100;
		var backFade = clamp( num( el, 'data-tdg-backfade', 10 ) / 100, 0, 1 );
		var perspPct = clamp( num( el, 'data-tdg-persp', 0 ), 0, 100 ) / 100;
		var tilt  = num( el, 'data-tdg-tilt', -45 );
		var gap   = clamp( num( el, 'data-tdg-gap', 0 ) / 100, 0, 1 );
		var pulse = clamp( num( el, 'data-tdg-pulse', 0 ) / 100, 0, 1 );
		var R = 0, depth = 0, cardW = 0, S = 0, vel = 0;

		function layout() {
			var W = stage.clientWidth || el.clientWidth || 1;
			var H = stage.clientHeight || el.clientHeight || 1;
			R = W * 0.5 * size;                              // helix radius (swing of the coil)
			depth = W * ( 0.9 + gap * 1.8 );                  // axial length; Card Gap stretches the coil
			cardW = Math.max( 20, W * cardPct );
			stage.style.perspective = ( W * ( 2.2 - perspPct * 1.5 ) ) + 'px'; // higher % = stronger depth
			cards.forEach( function ( c ) { c.style.width = cardW + 'px'; c.style.marginLeft = ( -cardW / 2 ) + 'px'; } );
			cards.forEach( function ( c ) { c.style.marginTop = ( -( c.offsetHeight || cardW ) / 2 ) + 'px'; } );
		}

		function applySpiral() {
			// Tilt the coil axis, then push the (centred) coil back ALONG that axis so it recedes cleanly —
			// nothing sits on top of the camera (no blow-up) and the tilt pivots the coil, not the stage.
			var backoff = depth * 0.5 + ( stage.clientWidth || 1 ) * 0.35;
			spiral.style.transform = 'translateZ(' + ( -backoff ) + 'px) rotateX(' + tilt + 'deg)';
			for ( var i = 0; i < Nc; i++ ) {
				var c = cards[ i ];
				var t0 = Nc > 1 ? i / ( Nc - 1 ) : 0;
				var t  = ( ( t0 + S * dir ) % 1 + 1 ) % 1;      // stream: shift along the helix and wrap
				var ang = t * turns * Math.PI * 2;
				var rf = Math.max( 0.04, 1 + taper * ( t * 2 - 1 ) ); // Taper radius profile (vortex ↔ flare)
				var r = R * rf;
				var x = r * Math.cos( ang ), y = r * Math.sin( ang );
				var z = ( 0.5 - t ) * depth;                    // coil centred on its axis (pushed back by the container)
				var sc = 1 + pulse * 0.5 * Math.sin( ang * 1.3 + S * Math.PI * 2 );
				c.style.transform = 'translate3d(' + x.toFixed( 1 ) + 'px,' + y.toFixed( 1 ) + 'px,' + z.toFixed( 1 ) + 'px) '
					+ 'rotateY(' + ( ang * 180 / Math.PI ).toFixed( 1 ) + 'deg) scale(' + sc.toFixed( 3 ) + ')';
				// seam fade at both ends of the coil (hide the wrap) + Back Fade dimming toward the tail
				var seam = t < 0.05 ? t / 0.05 : ( t > 0.95 ? ( 1 - t ) / 0.05 : 1 );
				c.style.opacity = ( seam * ( 1 - backFade * t ) ).toFixed( 3 );
				c.style.zIndex = String( 1000 + Math.round( z ) );
			}
		}

		layout();
		applySpiral();
		window.addEventListener( 'resize', function () { layout(); applySpiral(); }, { passive: true } );
		var hoverF = hoverFactor( el );
		var allowDrag = num( el, 'data-tdg-allowdrag', 1 );
		var momentum = num( el, 'data-tdg-momentum', 1 );
		var dragging = false, py = 0, scrollY = null;
		var advance = function ( dt ) { S += ( 1 / Math.max( 1, speed ) ) * dt * hoverF(); }; // one loop = one card slot cycle

		if ( allowDrag ) {
			el.style.cursor = 'grab';
			var down = function ( x, y ) { dragging = true; py = y; vel = 0; el.style.cursor = 'grabbing'; };
			var move = function ( x, y ) { if ( ! dragging ) { return; } var dy = y - py; py = y; var d = -dy * 0.0015; S += d; vel = d; };
			var up = function () { dragging = false; el.style.cursor = 'grab'; };
			attachDrag( el, down, move, up );
		}

		if ( drive === 'scroll' ) {
			var onScroll = function () { scrollY = scrollProgress( el, stage ) * 2 * num( el, 'data-tdg-rounds', 1 ); };
			window.addEventListener( 'scroll', onScroll, { passive: true } );
			onScroll();
		}

		var autoRun = ( drive === 'continuous' && ! reduce );
		if ( ! ( autoRun || allowDrag || drive === 'scroll' ) ) { return; }
		var last = 0;
		var loop = function ( tm ) {
			if ( ! last ) { last = tm; }
			var dt = ( tm - last ) / 1000; last = tm;
			if ( ! dragging ) {
				if ( autoRun ) { advance( dt ); }
				if ( momentum && Math.abs( vel ) > 0.00002 ) { S += vel; vel *= 0.95; }
				else if ( drive === 'scroll' && scrollY !== null ) { S += ( scrollY - S ) * 0.14; }
			}
			applySpiral();
			requestAnimationFrame( loop );
		};
		requestAnimationFrame( loop );
	}

	/* Depth Stack — a deck of cards receding straight into DEPTH (z), the front one the hero. The stack
	 * streams toward the camera: the front card flies out and fades while the next comes forward and a
	 * new one fades in at the back. Spread (in a chosen angle, Fan) or Scatter fans the deck out; Wobble
	 * jitters each card's tilt; Depth Fade dims and Depth Blur softens the cards toward the back (a
	 * depth-of-field falloff). Cards billboard (face the camera) so they stay readable. */
	function initDepthStack( el ) {
		if ( el.__tdg ) { return; }
		el.__tdg = true;
		var stage = el.querySelector( '.tdg__stage' );
		var deck  = el.querySelector( '.tdg__depth' );
		if ( ! stage || ! deck ) { return; }
		var cards = Array.prototype.slice.call( deck.querySelectorAll( '.tdg__card' ) );
		var N = cards.length;
		if ( ! N ) { return; }

		var drive = el.getAttribute( 'data-tdg-drive' ) || 'continuous';
		var speed = num( el, 'data-tdg-speed', 20 );
		var dir   = num( el, 'data-tdg-dir', 1 );
		var gap   = clamp( num( el, 'data-tdg-gap', 18 ), 0, 80 ) / 100;
		var cardPct = clamp( num( el, 'data-tdg-card', 20 ), 4, 80 ) / 100;
		var spread = clamp( num( el, 'data-tdg-spread', 0 ), 0, 120 ) / 100;
		var ang   = num( el, 'data-tdg-angle', -180 ) * Math.PI / 180;
		var wobble = clamp( num( el, 'data-tdg-wobble', 0 ) / 100, 0, 1 );
		var dFade = clamp( num( el, 'data-tdg-dfade', 0 ) / 100, 0, 1 );
		var dBlur = clamp( num( el, 'data-tdg-dblur', 0 ) / 100, 0, 1 );
		var layoutMode = el.getAttribute( 'data-tdg-layout' ) || 'fan'; // fan | scatter | aisle | field

		function rnd( i, s ) { var x = Math.sin( ( i + 1 ) * 91.7 + s * 47.3 ) * 43758.5453; return x - Math.floor( x ); }
		var meta = cards.map( function ( _, i ) { return { rot: rnd( i, 1 ) * 2 - 1, sx: rnd( i, 2 ) * 2 - 1, sy: rnd( i, 3 ) * 2 - 1 }; } );

		var totalDepth = 0, cardW = 0, spreadMag = 0, W = 1;
		function layout() {
			W = stage.clientWidth || el.clientWidth || 1;
			cardW = Math.max( 24, W * cardPct );
			totalDepth = W * ( 1.2 + gap * 3.2 );
			spreadMag = W * 0.62 * spread;
			stage.style.perspective = ( W * 1.5 ) + 'px';
			cards.forEach( function ( c ) { c.style.width = cardW + 'px'; c.style.marginLeft = ( -cardW / 2 ) + 'px'; } );
			cards.forEach( function ( c ) { c.style.marginTop = ( -( c.offsetHeight || cardW ) / 2 ) + 'px'; } );
		}

		function applyDepth() {
			deck.style.transform = '';
			for ( var i = 0; i < N; i++ ) {
				var c = cards[ i ], m = meta[ i ];
				var raw = i / N - S * dir;
				// d in [-0.15, 0.85): 0 = hero front, <0 = flying out past the camera, →0.85 = far back
				var d = ( ( raw + 0.15 ) % 1 + 1 ) % 1 - 0.15;
				var z = -d * totalDepth;
				var ox, oy;
				if ( layoutMode === 'scatter' ) { ox = m.sx * spreadMag; oy = m.sy * spreadMag; }        // fixed random scatter
				else if ( layoutMode === 'field' ) {                                                     // a cloud you fly INTO: wide at the back, funnelling past you near the front
					var ff = 0.28 + Math.max( 0, d ) * 1.25;
					ox = m.sx * spreadMag * ff; oy = m.sy * spreadMag * ff;
				}
				else if ( layoutMode === 'aisle' ) {                                                     // an aisle: cards to both sides, camera dollies down the middle (Dolly Gallery)
					var side = ( i % 2 ) ? 1 : -1;
					ox = side * spreadMag * ( 0.62 + 0.38 * Math.abs( m.sx ) );
					oy = m.sy * spreadMag * 0.22;
				}
				else { var f = Math.max( 0, d ); ox = spreadMag * f * Math.cos( ang ); oy = spreadMag * f * Math.sin( ang ); } // fan: more spread toward the back
				var rot = m.rot * wobble * 22;
				c.style.transform = 'translate3d(' + ox.toFixed( 1 ) + 'px,' + oy.toFixed( 1 ) + 'px,' + z.toFixed( 1 ) + 'px) rotateZ(' + rot.toFixed( 1 ) + 'deg)';
				var bl = dBlur * Math.max( 0, d ) * 18;
				c.style.filter = bl > 0.3 ? ( 'blur(' + bl.toFixed( 1 ) + 'px)' ) : '';
				// fade the fly-out (d<0) and the far entry (d→0.85); Depth Fade dims toward the back
				var fadeOut = d < 0 ? Math.max( 0, 1 + d / 0.15 ) : 1;
				var fadeIn  = d > 0.80 ? Math.max( 0, ( 0.85 - d ) / 0.05 ) : 1;
				c.style.opacity = ( fadeOut * fadeIn * ( 1 - dFade * Math.max( 0, d ) ) ).toFixed( 3 );
				c.style.zIndex = String( 2000 - Math.round( ( d + 0.15 ) * 1000 ) );
			}
		}

		var S = 0, vel = 0;
		layout();
		applyDepth();
		window.addEventListener( 'resize', function () { layout(); applyDepth(); }, { passive: true } );
		var hoverF = hoverFactor( el );
		var allowDrag = num( el, 'data-tdg-allowdrag', 1 );
		var momentum = num( el, 'data-tdg-momentum', 1 );
		var dragging = false, py = 0, scrollY = null;
		var advance = function ( dt ) { S += ( 1 / Math.max( 1, speed ) ) * dt * hoverF(); };

		if ( allowDrag ) {
			el.style.cursor = 'grab';
			var down = function ( x, y ) { dragging = true; py = y; vel = 0; el.style.cursor = 'grabbing'; };
			var move = function ( x, y ) { if ( ! dragging ) { return; } var dy = y - py; py = y; var dd = -dy * 0.0016; S += dd; vel = dd; };
			var up = function () { dragging = false; el.style.cursor = 'grab'; };
			attachDrag( el, down, move, up );
		}

		if ( drive === 'scroll' ) {
			var onScroll = function () { scrollY = scrollProgress( el, stage ) * ( N > 1 ? N - 1 : 1 ) * num( el, 'data-tdg-rounds', 1 ); };
			window.addEventListener( 'scroll', onScroll, { passive: true } );
			onScroll();
		}

		var autoRun = ( drive === 'continuous' && ! reduce );
		if ( ! ( autoRun || allowDrag || drive === 'scroll' ) ) { return; }
		var last = 0;
		var loop = function ( tm ) {
			if ( ! last ) { last = tm; }
			var dt = ( tm - last ) / 1000; last = tm;
			if ( ! dragging ) {
				if ( autoRun ) { advance( dt ); }
				if ( momentum && Math.abs( vel ) > 0.00002 ) { S += vel; vel *= 0.95; }
				else if ( drive === 'scroll' && scrollY !== null ) { S += ( scrollY - S ) * 0.14; if ( Math.abs( scrollY - S ) < 0.0004 ) { S = scrollY; } } // ease toward the scroll target (glide, not frame-lock)
			}
			applyDepth();
			requestAnimationFrame( loop );
		};
		requestAnimationFrame( loop );
	}

	/* Tilt Deck (Isometric) — photos lie flat on an isometric ground plane in a grid and march
	 * diagonally across it; the tile crossing the focus point lifts off the plane, rotates flat to
	 * face the viewer and brightens, then settles back as the next one rises. Pure CSS 3D, one rAF
	 * loop. The view emits cols*rows cards (images cycle). An original UnysonPlus design. */
	function initTiltDeck( el ) {
		if ( el.__tdg ) { return; }
		el.__tdg = true;
		var stage = el.querySelector( '.tdg__stage' );
		var plane = el.querySelector( '.tdg__iso' );
		if ( ! stage || ! plane ) { return; }
		var cards = Array.prototype.slice.call( plane.querySelectorAll( '.tdg__card' ) );
		var N = cards.length;
		if ( ! N ) { return; }

		var drive   = el.getAttribute( 'data-tdg-drive' ) || 'continuous';
		var speed   = num( el, 'data-tdg-speed', 12 );
		var dir     = num( el, 'data-tdg-dir', 1 );
		var cols    = Math.max( 1, Math.round( num( el, 'data-tdg-cols', 4 ) ) );
		var gap     = clamp( num( el, 'data-tdg-gap', 12 ), 0, 60 ) / 100;
		var tilt    = clamp( num( el, 'data-tdg-tilt', 58 ), 20, 75 );
		var lift    = clamp( num( el, 'data-tdg-lift', 60 ) / 100, 0, 1 );
		var glow    = clamp( num( el, 'data-tdg-glow', 135 ), 100, 220 ) / 100;
		var dFade   = clamp( num( el, 'data-tdg-dfade', 30 ) / 100, 0, 1 );
		var cardPct = clamp( num( el, 'data-tdg-card', 16 ), 4, 60 ) / 100;
		var SPIN = 45; // the isometric Z rotation of the ground plane

		var rows = Math.max( 1, Math.ceil( N / cols ) );
		var cardW = 0, cell = 0, W = 1;
		function layout() {
			W = stage.clientWidth || el.clientWidth || 1;
			cardW = Math.max( 20, W * cardPct );
			cell  = cardW * ( 1 + gap );
			stage.style.perspective = ( W * 1.6 ) + 'px';
			plane.style.transform = 'rotateX(' + tilt + 'deg) rotateZ(' + SPIN + 'deg)';
			cards.forEach( function ( c ) { c.style.width = cardW + 'px'; c.style.marginLeft = ( -cardW / 2 ) + 'px'; } );
			cards.forEach( function ( c ) { c.style.marginTop = ( -( c.offsetHeight || cardW ) / 2 ) + 'px'; } );
		}

		function applyFrame() {
			for ( var i = 0; i < N; i++ ) {
				var c = cards[ i ];
				var col = i % cols, row = Math.floor( i / cols );
				var pos = ( ( ( row - S * dir ) % rows ) + rows ) % rows;          // 0..rows (the march, wrapped)
				var py  = ( pos - ( rows - 1 ) / 2 ) * cell;                        // plane Y (depth across the grid)
				var px  = ( col - ( cols - 1 ) / 2 ) * cell;                        // plane X (fixed per column)
				var k   = Math.max( 0, 1 - Math.abs( py ) / ( cell * 1.15 ) );      // focus proximity (peak at plane centre)
				k = k * k * ( 3 - 2 * k );                                          // smoothstep
				var edge = Math.min( pos, rows - pos );
				var seam = clamp( edge / 0.7, 0, 1 );                               // fade the wrap seam so recycling is invisible
				var lz = lift * k * cardW * 0.95;                                   // lift off the plane toward the viewer
				var rx = -tilt * lift * k;                                          // counter the plane tilt …
				var rz = -SPIN * lift * k;                                          // … and spin, so the focus tile faces you
				var sc = 1 + lift * k * 0.16;
				c.style.transform = 'translate3d(' + px.toFixed( 1 ) + 'px,' + py.toFixed( 1 ) + 'px,' + lz.toFixed( 1 ) + 'px) rotateZ(' + rz.toFixed( 1 ) + 'deg) rotateX(' + rx.toFixed( 1 ) + 'deg) scale(' + sc.toFixed( 3 ) + ')';
				var back = clamp( pos / rows, 0, 1 );                               // 0 front … 1 back
				var bright = ( 1 - dFade * back ) * ( 1 + ( glow - 1 ) * k );
				c.style.filter = 'brightness(' + bright.toFixed( 3 ) + ')';
				c.style.opacity = seam.toFixed( 3 );
			}
		}

		var S = 0, vel = 0;
		layout();
		applyFrame();
		window.addEventListener( 'resize', function () { layout(); applyFrame(); }, { passive: true } );
		var hoverF = hoverFactor( el );
		var allowDrag = num( el, 'data-tdg-allowdrag', 1 );
		var momentum = num( el, 'data-tdg-momentum', 1 );
		var dragging = false, py0 = 0, scrollTarget = null;
		var advance = function ( dt ) { S += ( rows / Math.max( 1, speed ) ) * dt * hoverF(); };

		if ( allowDrag ) {
			el.style.cursor = 'grab';
			var down = function ( x, y ) { dragging = true; py0 = y; vel = 0; el.style.cursor = 'grabbing'; };
			var move = function ( x, y ) { if ( ! dragging ) { return; } var dy = y - py0; py0 = y; var dd = -dy * 0.006; S += dd; vel = dd; };
			var up = function () { dragging = false; el.style.cursor = 'grab'; };
			attachDrag( el, down, move, up );
		}

		if ( drive === 'scroll' ) {
			var onScroll = function () { scrollTarget = scrollProgress( el, stage ) * rows * num( el, 'data-tdg-rounds', 1 ); };
			window.addEventListener( 'scroll', onScroll, { passive: true } );
			onScroll();
		}

		var autoRun = ( drive === 'continuous' && ! reduce );
		if ( ! ( autoRun || allowDrag || drive === 'scroll' ) ) { return; }
		var last = 0;
		var loop = function ( tm ) {
			if ( ! last ) { last = tm; }
			var dt = ( tm - last ) / 1000; last = tm;
			if ( ! dragging ) {
				if ( autoRun ) { advance( dt ); }
				if ( momentum && Math.abs( vel ) > 0.00002 ) { S += vel; vel *= 0.94; }
				else if ( drive === 'scroll' && scrollTarget !== null ) { S += ( scrollTarget - S ) * 0.14; if ( Math.abs( scrollTarget - S ) < 0.0004 ) { S = scrollTarget; } }
			}
			applyFrame();
			requestAnimationFrame( loop );
		};
		requestAnimationFrame( loop );
	}

	/* Iso Orbit (Isometric) — tiles sit on a ring lying flat on the isometric ground plane and revolve
	 * around its centre; the tile at the near point of the orbit lifts off the plane, rotates flat to
	 * face the viewer and brightens, settling back as it carries on round. Far side dims. Pure CSS 3D,
	 * one rAF loop. The view emits one tile per image. An original UnysonPlus design. */
	function initIsoOrbit( el ) {
		if ( el.__tdg ) { return; }
		el.__tdg = true;
		var stage = el.querySelector( '.tdg__stage' );
		var plane = el.querySelector( '.tdg__iso' );
		if ( ! stage || ! plane ) { return; }
		var cards = Array.prototype.slice.call( plane.querySelectorAll( '.tdg__card' ) );
		var N = cards.length;
		if ( ! N ) { return; }

		var drive   = el.getAttribute( 'data-tdg-drive' ) || 'continuous';
		var speed   = num( el, 'data-tdg-speed', 18 );
		var dir     = num( el, 'data-tdg-dir', 1 );
		var radPct  = clamp( num( el, 'data-tdg-radius', 30 ), 8, 60 ) / 100;
		var tilt    = clamp( num( el, 'data-tdg-tilt', 58 ), 20, 75 );
		var lift    = clamp( num( el, 'data-tdg-lift', 70 ) / 100, 0, 1 );
		var glow    = clamp( num( el, 'data-tdg-glow', 140 ), 100, 220 ) / 100;
		var dFade   = clamp( num( el, 'data-tdg-dfade', 35 ) / 100, 0, 1 );
		var cardPct = clamp( num( el, 'data-tdg-card', 16 ), 4, 60 ) / 100;
		var SPIN = 45; // the isometric Z rotation of the ground plane

		var cardW = 0, R = 0, W = 1, TWO = Math.PI * 2;
		function layout() {
			W = stage.clientWidth || el.clientWidth || 1;
			cardW = Math.max( 20, W * cardPct );
			R = W * radPct;
			stage.style.perspective = ( W * 1.6 ) + 'px';
			plane.style.transform = 'rotateX(' + tilt + 'deg) rotateZ(' + SPIN + 'deg)';
			cards.forEach( function ( c ) { c.style.width = cardW + 'px'; c.style.marginLeft = ( -cardW / 2 ) + 'px'; } );
			cards.forEach( function ( c ) { c.style.marginTop = ( -( c.offsetHeight || cardW ) / 2 ) + 'px'; } );
		}

		function applyFrame() {
			for ( var i = 0; i < N; i++ ) {
				var c = cards[ i ];
				var theta = ( i / N ) * TWO + S * dir;                 // position on the ring (radians)
				var px = Math.cos( theta ) * R;
				var py = Math.sin( theta ) * R;                        // +py = the near arc (front of the orbit)
				var near = ( Math.sin( theta ) + 1 ) / 2;              // 0 far … 1 near
				var k = near * near * ( 3 - 2 * near );                // smoothstep — emphasise the near arc
				var lz = lift * k * cardW * 0.95;                      // lift off the plane at the front …
				var rx = -tilt * lift * k;                             // … and face the viewer
				var rz = -SPIN * lift * k;
				var sc = 1 + lift * k * 0.18;
				c.style.transform = 'translate3d(' + px.toFixed( 1 ) + 'px,' + py.toFixed( 1 ) + 'px,' + lz.toFixed( 1 ) + 'px) rotateZ(' + rz.toFixed( 1 ) + 'deg) rotateX(' + rx.toFixed( 1 ) + 'deg) scale(' + sc.toFixed( 3 ) + ')';
				var bright = ( 1 - dFade * ( 1 - near ) ) * ( 1 + ( glow - 1 ) * k );
				c.style.filter = 'brightness(' + bright.toFixed( 3 ) + ')';
			}
		}

		var S = 0, vel = 0;
		layout();
		applyFrame();
		window.addEventListener( 'resize', function () { layout(); applyFrame(); }, { passive: true } );
		var hoverF = hoverFactor( el );
		var allowDrag = num( el, 'data-tdg-allowdrag', 1 );
		var momentum = num( el, 'data-tdg-momentum', 1 );
		var dragging = false, px0 = 0, scrollTarget = null;
		var advance = function ( dt ) { S += ( TWO / Math.max( 1, speed ) ) * dt * hoverF(); };

		if ( allowDrag ) {
			el.style.cursor = 'grab';
			var down = function ( x, y ) { dragging = true; px0 = x; vel = 0; el.style.cursor = 'grabbing'; };
			var move = function ( x, y ) { if ( ! dragging ) { return; } var dx = x - px0; px0 = x; var dd = dx * 0.006; S += dd; vel = dd; };
			var up = function () { dragging = false; el.style.cursor = 'grab'; };
			attachDrag( el, down, move, up );
		}

		if ( drive === 'scroll' ) {
			var onScroll = function () { scrollTarget = scrollProgress( el, stage ) * TWO * num( el, 'data-tdg-rounds', 1 ); };
			window.addEventListener( 'scroll', onScroll, { passive: true } );
			onScroll();
		}

		var autoRun = ( drive === 'continuous' && ! reduce );
		if ( ! ( autoRun || allowDrag || drive === 'scroll' ) ) { return; }
		var last = 0;
		var loop = function ( tm ) {
			if ( ! last ) { last = tm; }
			var dt = ( tm - last ) / 1000; last = tm;
			if ( ! dragging ) {
				if ( autoRun ) { advance( dt ); }
				if ( momentum && Math.abs( vel ) > 0.00002 ) { S += vel; vel *= 0.94; }
				else if ( drive === 'scroll' && scrollTarget !== null ) { S += ( scrollTarget - S ) * 0.14; if ( Math.abs( scrollTarget - S ) < 0.0004 ) { S = scrollTarget; } }
			}
			applyFrame();
			requestAnimationFrame( loop );
		};
		requestAnimationFrame( loop );
	}

	/* Iso Stack (Isometric) — photo slabs stacked into a tower rising off the isometric ground plane,
	 * streaming upward on a gentle spiral; the slab passing through the focus height lifts to face the
	 * viewer and brightens, then flattens again as it carries on up and recycles. Pure CSS 3D, one rAF
	 * loop. The view emits one slab per image (images cycle). An original UnysonPlus design. */
	function initIsoStack( el ) {
		if ( el.__tdg ) { return; }
		el.__tdg = true;
		var stage = el.querySelector( '.tdg__stage' );
		var plane = el.querySelector( '.tdg__iso' );
		if ( ! stage || ! plane ) { return; }
		var cards = Array.prototype.slice.call( plane.querySelectorAll( '.tdg__card' ) );
		var N = cards.length;
		if ( ! N ) { return; }

		var drive   = el.getAttribute( 'data-tdg-drive' ) || 'continuous';
		var speed   = num( el, 'data-tdg-speed', 14 );
		var dir     = num( el, 'data-tdg-dir', 1 );
		var sgap    = clamp( num( el, 'data-tdg-gap', 40 ), 10, 80 ) / 100;
		var spiral  = clamp( num( el, 'data-tdg-spiral', 40 ), 0, 100 ) / 100;
		var tilt    = clamp( num( el, 'data-tdg-tilt', 58 ), 20, 75 );
		var lift    = clamp( num( el, 'data-tdg-lift', 70 ) / 100, 0, 1 );
		var glow    = clamp( num( el, 'data-tdg-glow', 140 ), 100, 220 ) / 100;
		var dFade   = clamp( num( el, 'data-tdg-dfade', 40 ) / 100, 0, 1 );
		var cardPct = clamp( num( el, 'data-tdg-card', 17 ), 4, 60 ) / 100;
		var SPIN = 45, TWO = Math.PI * 2, BAND = 0.26;

		var cardW = 0, towerH = 0, driftR = 0, W = 1;
		function layout() {
			W = stage.clientWidth || el.clientWidth || 1;
			cardW = Math.max( 20, W * cardPct );
			towerH = cardW * N * sgap;
			driftR = spiral * cardW * 0.6;
			stage.style.perspective = ( W * 1.6 ) + 'px';
			plane.style.transform = 'rotateX(' + tilt + 'deg) rotateZ(' + SPIN + 'deg)';
			cards.forEach( function ( c ) { c.style.width = cardW + 'px'; c.style.marginLeft = ( -cardW / 2 ) + 'px'; } );
			cards.forEach( function ( c ) { c.style.marginTop = ( -( c.offsetHeight || cardW ) / 2 ) + 'px'; } );
		}

		function applyFrame() {
			for ( var i = 0; i < N; i++ ) {
				var c = cards[ i ];
				var pos = ( ( ( i / N + S * dir ) % 1 ) + 1 ) % 1;     // 0 bottom … 1 top (looping)
				var ang = pos * TWO;                                   // one gentle revolution up the tower
				var px = Math.cos( ang ) * driftR;
				var py = Math.sin( ang ) * driftR;
				var z = ( pos - 0.5 ) * towerH;                        // height off the plane
				var k = Math.max( 0, 1 - Math.abs( pos - 0.5 ) / BAND );
				k = k * k * ( 3 - 2 * k );                             // smoothstep focus band at mid height
				var seam = clamp( Math.min( pos, 1 - pos ) / 0.08, 0, 1 ); // fade the top/bottom recycle seam
				var lz = z + lift * k * cardW * 0.6;
				var rx = -tilt * lift * k;
				var rz = -SPIN * lift * k;
				var sc = 1 + lift * k * 0.16;
				c.style.transform = 'translate3d(' + px.toFixed( 1 ) + 'px,' + py.toFixed( 1 ) + 'px,' + lz.toFixed( 1 ) + 'px) rotateZ(' + rz.toFixed( 1 ) + 'deg) rotateX(' + rx.toFixed( 1 ) + 'deg) scale(' + sc.toFixed( 3 ) + ')';
				var bright = ( 1 - dFade * ( 1 - pos ) ) * ( 1 + ( glow - 1 ) * k );
				c.style.filter = 'brightness(' + bright.toFixed( 3 ) + ')';
				c.style.opacity = seam.toFixed( 3 );
			}
		}

		var S = 0, vel = 0;
		layout();
		applyFrame();
		window.addEventListener( 'resize', function () { layout(); applyFrame(); }, { passive: true } );
		var hoverF = hoverFactor( el );
		var allowDrag = num( el, 'data-tdg-allowdrag', 1 );
		var momentum = num( el, 'data-tdg-momentum', 1 );
		var dragging = false, py0 = 0, scrollTarget = null;
		var advance = function ( dt ) { S += ( 1 / Math.max( 1, speed ) ) * dt * hoverF(); };

		if ( allowDrag ) {
			el.style.cursor = 'grab';
			var down = function ( x, y ) { dragging = true; py0 = y; vel = 0; el.style.cursor = 'grabbing'; };
			var move = function ( x, y ) { if ( ! dragging ) { return; } var dy = y - py0; py0 = y; var dd = -dy * 0.0018; S += dd; vel = dd; };
			var up = function () { dragging = false; el.style.cursor = 'grab'; };
			attachDrag( el, down, move, up );
		}

		if ( drive === 'scroll' ) {
			var onScroll = function () { scrollTarget = scrollProgress( el, stage ) * num( el, 'data-tdg-rounds', 1 ); };
			window.addEventListener( 'scroll', onScroll, { passive: true } );
			onScroll();
		}

		var autoRun = ( drive === 'continuous' && ! reduce );
		if ( ! ( autoRun || allowDrag || drive === 'scroll' ) ) { return; }
		var last = 0;
		var loop = function ( tm ) {
			if ( ! last ) { last = tm; }
			var dt = ( tm - last ) / 1000; last = tm;
			if ( ! dragging ) {
				if ( autoRun ) { advance( dt ); }
				if ( momentum && Math.abs( vel ) > 0.00002 ) { S += vel; vel *= 0.94; }
				else if ( drive === 'scroll' && scrollTarget !== null ) { S += ( scrollTarget - S ) * 0.14; if ( Math.abs( scrollTarget - S ) < 0.0004 ) { S = scrollTarget; } }
			}
			applyFrame();
			requestAnimationFrame( loop );
		};
		requestAnimationFrame( loop );
	}

	/* Iso Cascade (Isometric) — photos descend a diagonal staircase across the isometric ground plane:
	 * high and far at the back, stepping down and toward the viewer. The tile reaching the front of the
	 * cascade lifts flat to face you and brightens, then recycles to the back. Pure CSS 3D, one rAF
	 * loop. The view emits one tile per image (images cycle). An original UnysonPlus design. */
	function initIsoCascade( el ) {
		if ( el.__tdg ) { return; }
		el.__tdg = true;
		var stage = el.querySelector( '.tdg__stage' );
		var plane = el.querySelector( '.tdg__iso' );
		if ( ! stage || ! plane ) { return; }
		var cards = Array.prototype.slice.call( plane.querySelectorAll( '.tdg__card' ) );
		var N = cards.length;
		if ( ! N ) { return; }

		var drive   = el.getAttribute( 'data-tdg-drive' ) || 'continuous';
		var speed   = num( el, 'data-tdg-speed', 12 );
		var dir     = num( el, 'data-tdg-dir', 1 );
		var spread  = clamp( num( el, 'data-tdg-spread', 60 ), 20, 100 ) / 100;
		var rise    = clamp( num( el, 'data-tdg-rise', 50 ), 10, 100 ) / 100;
		var tilt    = clamp( num( el, 'data-tdg-tilt', 58 ), 20, 75 );
		var lift    = clamp( num( el, 'data-tdg-lift', 70 ) / 100, 0, 1 );
		var glow    = clamp( num( el, 'data-tdg-glow', 140 ), 100, 220 ) / 100;
		var dFade   = clamp( num( el, 'data-tdg-dfade', 45 ) / 100, 0, 1 );
		var cardPct = clamp( num( el, 'data-tdg-card', 17 ), 4, 60 ) / 100;
		var SPIN = 45, FOCUS = 0.78, BAND = 0.15;

		var cardW = 0, spanX = 0, spanY = 0, riseH = 0, W = 1;
		function layout() {
			W = stage.clientWidth || el.clientWidth || 1;
			cardW = Math.max( 20, W * cardPct );
			spanX = W * 1.10 * spread;
			spanY = W * 0.26 * spread;
			riseH = cardW * ( 0.6 + rise * 2.2 );
			stage.style.perspective = ( W * 1.6 ) + 'px';
			plane.style.transform = 'rotateX(' + tilt + 'deg) rotateZ(' + SPIN + 'deg)';
			cards.forEach( function ( c ) { c.style.width = cardW + 'px'; c.style.marginLeft = ( -cardW / 2 ) + 'px'; } );
			cards.forEach( function ( c ) { c.style.marginTop = ( -( c.offsetHeight || cardW ) / 2 ) + 'px'; } );
		}

		function applyFrame() {
			for ( var i = 0; i < N; i++ ) {
				var c = cards[ i ];
				var t = ( ( ( i / N + S * dir ) % 1 ) + 1 ) % 1;      // 0 back(high/far) … 1 front(low/near)
				var px = ( t - 0.5 ) * spanX;
				var py = ( t - 0.5 ) * spanY;
				var baseZ = ( 1 - t ) * riseH;                        // descends from the back down to the front
				var k = Math.max( 0, 1 - Math.abs( t - FOCUS ) / BAND );
				k = k * k * ( 3 - 2 * k );                            // smoothstep focus near the front of the cascade
				var lz = baseZ + lift * k * cardW * 0.7;
				var rx = -tilt * lift * k;
				var rz = -SPIN * lift * k;
				var sc = 1 + lift * k * 0.16;
				c.style.transform = 'translate3d(' + px.toFixed( 1 ) + 'px,' + py.toFixed( 1 ) + 'px,' + lz.toFixed( 1 ) + 'px) rotateZ(' + rz.toFixed( 1 ) + 'deg) rotateX(' + rx.toFixed( 1 ) + 'deg) scale(' + sc.toFixed( 3 ) + ')';
				var seam = clamp( Math.min( t, 1 - t ) / 0.07, 0, 1 ); // fade the back/front recycle seam
				var bright = ( 1 - dFade * ( 1 - t ) ) * ( 1 + ( glow - 1 ) * k );
				c.style.filter = 'brightness(' + bright.toFixed( 3 ) + ')';
				c.style.opacity = seam.toFixed( 3 );
			}
		}

		var S = 0, vel = 0;
		layout();
		applyFrame();
		window.addEventListener( 'resize', function () { layout(); applyFrame(); }, { passive: true } );
		var hoverF = hoverFactor( el );
		var allowDrag = num( el, 'data-tdg-allowdrag', 1 );
		var momentum = num( el, 'data-tdg-momentum', 1 );
		var dragging = false, py0 = 0, scrollTarget = null;
		var advance = function ( dt ) { S += ( 1 / Math.max( 1, speed ) ) * dt * hoverF(); };

		if ( allowDrag ) {
			el.style.cursor = 'grab';
			var down = function ( x, y ) { dragging = true; py0 = y; vel = 0; el.style.cursor = 'grabbing'; };
			var move = function ( x, y ) { if ( ! dragging ) { return; } var dy = y - py0; py0 = y; var dd = dy * 0.0018; S += dd; vel = dd; };
			var up = function () { dragging = false; el.style.cursor = 'grab'; };
			attachDrag( el, down, move, up );
		}

		if ( drive === 'scroll' ) {
			var onScroll = function () { scrollTarget = scrollProgress( el, stage ) * num( el, 'data-tdg-rounds', 1 ); };
			window.addEventListener( 'scroll', onScroll, { passive: true } );
			onScroll();
		}

		var autoRun = ( drive === 'continuous' && ! reduce );
		if ( ! ( autoRun || allowDrag || drive === 'scroll' ) ) { return; }
		var last = 0;
		var loop = function ( tm ) {
			if ( ! last ) { last = tm; }
			var dt = ( tm - last ) / 1000; last = tm;
			if ( ! dragging ) {
				if ( autoRun ) { advance( dt ); }
				if ( momentum && Math.abs( vel ) > 0.00002 ) { S += vel; vel *= 0.94; }
				else if ( drive === 'scroll' && scrollTarget !== null ) { S += ( scrollTarget - S ) * 0.14; if ( Math.abs( scrollTarget - S ) < 0.0004 ) { S = scrollTarget; } }
			}
			applyFrame();
			requestAnimationFrame( loop );
		};
		requestAnimationFrame( loop );
	}

	/* Iso Fan (Isometric) — tiles spread along a flat arc (a fan) on the isometric ground plane and
	 * sweep across it; the tile passing the centre-front of the fan lifts flat to face the viewer and
	 * brightens, then settles back as it sweeps on and recycles at the far edge. Pure CSS 3D, one rAF
	 * loop. The view emits one tile per image (images cycle). An original UnysonPlus design. */
	function initIsoFan( el ) {
		if ( el.__tdg ) { return; }
		el.__tdg = true;
		var stage = el.querySelector( '.tdg__stage' );
		var plane = el.querySelector( '.tdg__iso' );
		if ( ! stage || ! plane ) { return; }
		var cards = Array.prototype.slice.call( plane.querySelectorAll( '.tdg__card' ) );
		var N = cards.length;
		if ( ! N ) { return; }

		var drive   = el.getAttribute( 'data-tdg-drive' ) || 'continuous';
		var speed   = num( el, 'data-tdg-speed', 16 );
		var dir     = num( el, 'data-tdg-dir', 1 );
		var reach   = clamp( num( el, 'data-tdg-reach', 34 ), 10, 60 ) / 100;
		var arc     = clamp( num( el, 'data-tdg-arc', 130 ), 40, 175 ) * Math.PI / 180;
		var tilt    = clamp( num( el, 'data-tdg-tilt', 58 ), 20, 75 );
		var lift    = clamp( num( el, 'data-tdg-lift', 70 ) / 100, 0, 1 );
		var glow    = clamp( num( el, 'data-tdg-glow', 140 ), 100, 220 ) / 100;
		var dFade   = clamp( num( el, 'data-tdg-dfade', 40 ) / 100, 0, 1 );
		var cardPct = clamp( num( el, 'data-tdg-card', 16 ), 4, 60 ) / 100;
		var SPIN = 45, edgeNear = Math.cos( arc / 2 );

		var cardW = 0, R = 0, W = 1;
		function layout() {
			W = stage.clientWidth || el.clientWidth || 1;
			cardW = Math.max( 20, W * cardPct );
			R = W * reach;
			stage.style.perspective = ( W * 1.6 ) + 'px';
			plane.style.transform = 'rotateX(' + tilt + 'deg) rotateZ(' + SPIN + 'deg)';
			cards.forEach( function ( c ) { c.style.width = cardW + 'px'; c.style.marginLeft = ( -cardW / 2 ) + 'px'; } );
			cards.forEach( function ( c ) { c.style.marginTop = ( -( c.offsetHeight || cardW ) / 2 ) + 'px'; } );
		}

		function applyFrame() {
			for ( var i = 0; i < N; i++ ) {
				var c = cards[ i ];
				var t = ( ( ( i / N + S * dir ) % 1 ) + 1 ) % 1;      // 0 … 1 sweeping across the fan
				var a = ( t - 0.5 ) * arc;                            // angle across the arc
				var px = Math.sin( a ) * R;
				var py = Math.cos( a ) * R - R * 0.62;                 // arc curves in depth — centre near, edges recede
				var near = ( Math.cos( a ) - edgeNear ) / ( 1 - edgeNear + 0.0001 ); // 0 edge … 1 centre
				var k = Math.max( 0, 1 - Math.abs( a ) / ( arc * 0.16 ) );
				k = k * k * ( 3 - 2 * k );                            // smoothstep focus at the centre-front
				var lz = lift * k * cardW * 0.95;
				var rx = -tilt * lift * k;
				var rz = -SPIN * lift * k;
				var sc = 1 + lift * k * 0.18;
				c.style.transform = 'translate3d(' + px.toFixed( 1 ) + 'px,' + py.toFixed( 1 ) + 'px,' + lz.toFixed( 1 ) + 'px) rotateZ(' + rz.toFixed( 1 ) + 'deg) rotateX(' + rx.toFixed( 1 ) + 'deg) scale(' + sc.toFixed( 3 ) + ')';
				var seam = clamp( Math.min( t, 1 - t ) / 0.06, 0, 1 ); // fade the tiles at the fan's edges (recycle)
				var bright = ( 1 - dFade * ( 1 - near ) ) * ( 1 + ( glow - 1 ) * k );
				c.style.filter = 'brightness(' + bright.toFixed( 3 ) + ')';
				c.style.opacity = seam.toFixed( 3 );
			}
		}

		var S = 0, vel = 0;
		layout();
		applyFrame();
		window.addEventListener( 'resize', function () { layout(); applyFrame(); }, { passive: true } );
		var hoverF = hoverFactor( el );
		var allowDrag = num( el, 'data-tdg-allowdrag', 1 );
		var momentum = num( el, 'data-tdg-momentum', 1 );
		var dragging = false, px0 = 0, scrollTarget = null;
		var advance = function ( dt ) { S += ( 1 / Math.max( 1, speed ) ) * dt * hoverF(); };

		if ( allowDrag ) {
			el.style.cursor = 'grab';
			var down = function ( x, y ) { dragging = true; px0 = x; vel = 0; el.style.cursor = 'grabbing'; };
			var move = function ( x, y ) { if ( ! dragging ) { return; } var dx = x - px0; px0 = x; var dd = dx * 0.0016; S += dd; vel = dd; };
			var up = function () { dragging = false; el.style.cursor = 'grab'; };
			attachDrag( el, down, move, up );
		}

		if ( drive === 'scroll' ) {
			var onScroll = function () { scrollTarget = scrollProgress( el, stage ) * num( el, 'data-tdg-rounds', 1 ); };
			window.addEventListener( 'scroll', onScroll, { passive: true } );
			onScroll();
		}

		var autoRun = ( drive === 'continuous' && ! reduce );
		if ( ! ( autoRun || allowDrag || drive === 'scroll' ) ) { return; }
		var last = 0;
		var loop = function ( tm ) {
			if ( ! last ) { last = tm; }
			var dt = ( tm - last ) / 1000; last = tm;
			if ( ! dragging ) {
				if ( autoRun ) { advance( dt ); }
				if ( momentum && Math.abs( vel ) > 0.00002 ) { S += vel; vel *= 0.94; }
				else if ( drive === 'scroll' && scrollTarget !== null ) { S += ( scrollTarget - S ) * 0.14; if ( Math.abs( scrollTarget - S ) < 0.0004 ) { S = scrollTarget; } }
			}
			applyFrame();
			requestAnimationFrame( loop );
		};
		requestAnimationFrame( loop );
	}

	/* Orbit Bloom (Orbit) — a ring of billboarded cards that slowly orbits a tilted disc and BREATHES:
	 * it blooms from a tight central cluster out to a wide ring and back, cards fading + scaling up as
	 * they open. Front cards (nearer the camera) are bigger + brighter; the far arc dims. Pure CSS 3D,
	 * one rAF loop. The view emits one card per image (images cycle). An original UnysonPlus design. */
	function initOrbitBloom( el ) {
		if ( el.__tdg ) { return; }
		el.__tdg = true;
		var stage = el.querySelector( '.tdg__stage' );
		var orbit = el.querySelector( '.tdg__orbit' );
		if ( ! stage || ! orbit ) { return; }
		var cards = Array.prototype.slice.call( orbit.querySelectorAll( '.tdg__card' ) );
		var N = cards.length;
		if ( ! N ) { return; }

		var drive   = el.getAttribute( 'data-tdg-drive' ) || 'continuous';
		var speed   = num( el, 'data-tdg-speed', 22 );
		var dir     = num( el, 'data-tdg-dir', 1 );
		var radPct  = clamp( num( el, 'data-tdg-radius', 32 ), 10, 60 ) / 100;
		var tilt    = clamp( num( el, 'data-tdg-tilt', 58 ), 0, 80 );
		var bloomAmt = clamp( num( el, 'data-tdg-bloom', 70 ) / 100, 0, 1 );
		var glow    = clamp( num( el, 'data-tdg-glow', 130 ), 100, 220 ) / 100;
		var dFade   = clamp( num( el, 'data-tdg-dfade', 45 ) / 100, 0, 1 );
		var cardPct = clamp( num( el, 'data-tdg-card', 16 ), 4, 60 ) / 100;
		var TWO = Math.PI * 2;

		var cardW = 0, R = 0, W = 1;
		function layout() {
			W = stage.clientWidth || el.clientWidth || 1;
			cardW = Math.max( 20, W * cardPct );
			R = W * radPct;
			stage.style.perspective = ( W * 1.7 ) + 'px';
			orbit.style.transform = 'rotateX(' + tilt + 'deg)';
			cards.forEach( function ( c ) { c.style.width = cardW + 'px'; c.style.marginLeft = ( -cardW / 2 ) + 'px'; } );
			cards.forEach( function ( c ) { c.style.marginTop = ( -( c.offsetHeight || cardW ) / 2 ) + 'px'; } );
		}

		function applyFrame() {
			var breath = ( 1 - Math.cos( S * TWO ) ) / 2;                 // 0 closed … 1 fully bloomed
			var Rnow = R * ( 1 - bloomAmt * 0.72 * ( 1 - breath ) );      // tight cluster when closed, wide ring when open
			for ( var i = 0; i < N; i++ ) {
				var c = cards[ i ];
				var theta = ( i / N ) * TWO + S * TWO * dir * 0.5;        // the ring also slowly orbits
				var x = Math.cos( theta ) * Rnow, y = Math.sin( theta ) * Rnow;
				var near = ( Math.sin( theta ) + 1 ) / 2;                 // bottom of the disc = nearer the camera
				var sc = ( 0.74 + 0.26 * near ) * ( 0.5 + 0.5 * breath ); // cards also scale up as they open
				c.style.transform = 'translate3d(' + x.toFixed( 1 ) + 'px,' + y.toFixed( 1 ) + 'px,0) rotateX(' + ( -tilt ) + 'deg) scale(' + sc.toFixed( 3 ) + ')';
				c.style.opacity = ( 0.45 + 0.55 * breath ).toFixed( 3 );  // fade in as they bloom
				var bright = ( 1 - dFade * ( 1 - near ) ) * ( 1 + ( glow - 1 ) * near );
				c.style.filter = 'brightness(' + bright.toFixed( 3 ) + ')';
				c.style.zIndex = String( Math.round( near * 100 ) );
			}
		}

		var S = 0, vel = 0;
		layout();
		applyFrame();
		window.addEventListener( 'resize', function () { layout(); applyFrame(); }, { passive: true } );
		var hoverF = hoverFactor( el );
		var allowDrag = num( el, 'data-tdg-allowdrag', 1 );
		var momentum = num( el, 'data-tdg-momentum', 1 );
		var dragging = false, px0 = 0, scrollTarget = null;
		var advance = function ( dt ) { S += ( 1 / Math.max( 1, speed ) ) * dt * hoverF(); };

		if ( allowDrag ) {
			el.style.cursor = 'grab';
			var down = function ( x, y ) { dragging = true; px0 = x; vel = 0; el.style.cursor = 'grabbing'; };
			var move = function ( x, y ) { if ( ! dragging ) { return; } var dx = x - px0; px0 = x; var dd = dx * 0.004; S += dd; vel = dd; };
			var up = function () { dragging = false; el.style.cursor = 'grab'; };
			attachDrag( el, down, move, up );
		}

		if ( drive === 'scroll' ) {
			var onScroll = function () { scrollTarget = scrollProgress( el, stage ) * num( el, 'data-tdg-rounds', 1 ); };
			window.addEventListener( 'scroll', onScroll, { passive: true } );
			onScroll();
		}

		var autoRun = ( drive === 'continuous' && ! reduce );
		if ( ! ( autoRun || allowDrag || drive === 'scroll' ) ) { return; }
		var last = 0;
		var loop = function ( tm ) {
			if ( ! last ) { last = tm; }
			var dt = ( tm - last ) / 1000; last = tm;
			if ( ! dragging ) {
				if ( autoRun ) { advance( dt ); }
				if ( momentum && Math.abs( vel ) > 0.00002 ) { S += vel; vel *= 0.94; }
				else if ( drive === 'scroll' && scrollTarget !== null ) { S += ( scrollTarget - S ) * 0.14; if ( Math.abs( scrollTarget - S ) < 0.0004 ) { S = scrollTarget; } }
			}
			applyFrame();
			requestAnimationFrame( loop );
		};
		requestAnimationFrame( loop );
	}

	/* Focus Orbit (Orbit) — a ring of billboarded cards orbiting a tilted disc; the card reaching the
	 * front of the orbit pulls INTO the centre, lifts toward you and enlarges into a hero, then returns
	 * to the ring as the next card takes its place — a rolling central feature. Front cards are brighter;
	 * the far arc dims. Pure CSS 3D, one rAF loop. One card per image (images cycle). An original design. */
	function initFocusOrbit( el ) {
		if ( el.__tdg ) { return; }
		el.__tdg = true;
		var stage = el.querySelector( '.tdg__stage' );
		var orbit = el.querySelector( '.tdg__orbit' );
		if ( ! stage || ! orbit ) { return; }
		var cards = Array.prototype.slice.call( orbit.querySelectorAll( '.tdg__card' ) );
		var N = cards.length;
		if ( ! N ) { return; }

		var drive   = el.getAttribute( 'data-tdg-drive' ) || 'continuous';
		var speed   = num( el, 'data-tdg-speed', 20 );
		var dir     = num( el, 'data-tdg-dir', 1 );
		var radPct  = clamp( num( el, 'data-tdg-radius', 30 ), 10, 55 ) / 100;
		var tilt    = clamp( num( el, 'data-tdg-tilt', 55 ), 0, 80 );
		var heroAmt = clamp( num( el, 'data-tdg-hero', 70 ) / 100, 0, 1 );
		var glow    = clamp( num( el, 'data-tdg-glow', 150 ), 100, 240 ) / 100;
		var dFade   = clamp( num( el, 'data-tdg-dfade', 45 ) / 100, 0, 1 );
		var cardPct = clamp( num( el, 'data-tdg-card', 18 ), 4, 60 ) / 100;
		var TWO = Math.PI * 2;

		var cardW = 0, R = 0, W = 1;
		function layout() {
			W = stage.clientWidth || el.clientWidth || 1;
			cardW = Math.max( 20, W * cardPct );
			R = W * radPct;
			stage.style.perspective = ( W * 1.7 ) + 'px';
			orbit.style.transform = 'rotateX(' + tilt + 'deg)';
			cards.forEach( function ( c ) { c.style.width = cardW + 'px'; c.style.marginLeft = ( -cardW / 2 ) + 'px'; } );
			cards.forEach( function ( c ) { c.style.marginTop = ( -( c.offsetHeight || cardW ) / 2 ) + 'px'; } );
		}

		function applyFrame() {
			for ( var i = 0; i < N; i++ ) {
				var c = cards[ i ];
				var theta = ( i / N ) * TWO + S * TWO * dir * 0.5;
				var near = ( Math.sin( theta ) + 1 ) / 2;                 // front (bottom) = near
				var k = Math.pow( near, 5 );                              // ONLY the very front becomes the hero (sharp)
				var x0 = Math.cos( theta ) * R, y0 = Math.sin( theta ) * R;
				var x = x0 * ( 1 - k * heroAmt ), y = y0 * ( 1 - k * heroAmt ); // pull toward centre as it fronts
				var lz = k * heroAmt * cardW * 1.3;                       // lift the hero toward the camera (counter the disc tilt)
				var sc = ( 0.46 + 0.30 * near ) * ( 1 + k * heroAmt * 1.5 ); // satellites small; the hero enlarges strongly
				c.style.transform = 'translate3d(' + x.toFixed( 1 ) + 'px,' + y.toFixed( 1 ) + 'px,' + lz.toFixed( 1 ) + 'px) rotateX(' + ( -tilt ) + 'deg) scale(' + sc.toFixed( 3 ) + ')';
				var bright = ( 1 - dFade * ( 1 - near ) ) * ( 1 + ( glow - 1 ) * k );
				c.style.filter = 'brightness(' + bright.toFixed( 3 ) + ')';
				c.style.zIndex = String( 100 + Math.round( ( near + k ) * 100 ) );
			}
		}

		var S = 0, vel = 0;
		layout();
		applyFrame();
		window.addEventListener( 'resize', function () { layout(); applyFrame(); }, { passive: true } );
		var hoverF = hoverFactor( el );
		var allowDrag = num( el, 'data-tdg-allowdrag', 1 );
		var momentum = num( el, 'data-tdg-momentum', 1 );
		var dragging = false, px0 = 0, scrollTarget = null;
		var advance = function ( dt ) { S += ( 1 / Math.max( 1, speed ) ) * dt * hoverF(); };

		if ( allowDrag ) {
			el.style.cursor = 'grab';
			var down = function ( x, y ) { dragging = true; px0 = x; vel = 0; el.style.cursor = 'grabbing'; };
			var move = function ( x, y ) { if ( ! dragging ) { return; } var dx = x - px0; px0 = x; var dd = dx * 0.004; S += dd; vel = dd; };
			var up = function () { dragging = false; el.style.cursor = 'grab'; };
			attachDrag( el, down, move, up );
		}

		if ( drive === 'scroll' ) {
			var onScroll = function () { scrollTarget = scrollProgress( el, stage ) * num( el, 'data-tdg-rounds', 1 ); };
			window.addEventListener( 'scroll', onScroll, { passive: true } );
			onScroll();
		}

		var autoRun = ( drive === 'continuous' && ! reduce );
		if ( ! ( autoRun || allowDrag || drive === 'scroll' ) ) { return; }
		var last = 0;
		var loop = function ( tm ) {
			if ( ! last ) { last = tm; }
			var dt = ( tm - last ) / 1000; last = tm;
			if ( ! dragging ) {
				if ( autoRun ) { advance( dt ); }
				if ( momentum && Math.abs( vel ) > 0.00002 ) { S += vel; vel *= 0.94; }
				else if ( drive === 'scroll' && scrollTarget !== null ) { S += ( scrollTarget - S ) * 0.14; if ( Math.abs( scrollTarget - S ) < 0.0004 ) { S = scrollTarget; } }
			}
			applyFrame();
			requestAnimationFrame( loop );
		};
		requestAnimationFrame( loop );
	}

	/* Card Reel — a vertical cover-flow carousel. A single column of cards wraps around a horizontal
	 * cylinder: the card at the centre sits flat and forward (the focus), the ones above and below tilt
	 * back and recede along the curve. The reel flows up/down continuously, or "Stop at centre" snaps
	 * each card to the middle with a dwell. The 3D Curve bends the cylinder (flat ↔ tight barrel); Card
	 * Size and Gap set the spacing. Lives in the Carousel & Flow family. */
	function initReel( el ) {
		if ( el.__tdg ) { return; }
		el.__tdg = true;
		var stage = el.querySelector( '.tdg__stage' );
		var reel  = el.querySelector( '.tdg__reel' );
		if ( ! stage || ! reel ) { return; }
		var cards = Array.prototype.slice.call( reel.querySelectorAll( '.tdg__card' ) );
		var N = cards.length;
		if ( ! N ) { return; }

		var drive = el.getAttribute( 'data-tdg-drive' ) || 'continuous';
		var speed = num( el, 'data-tdg-speed', 20 );
		var dir   = num( el, 'data-tdg-dir', 1 );                 // +1 up, -1 down
		var curve = clamp( num( el, 'data-tdg-curve', -100 ), -100, 100 );
		var cardPct = clamp( num( el, 'data-tdg-card', 22 ), 6, 60 ) / 100;
		var gap   = clamp( num( el, 'data-tdg-gap', 1 ), 0, 20 ) / 100;
		var snap  = ( el.getAttribute( 'data-tdg-snap' ) === 'yes' );
		var horiz = ( el.getAttribute( 'data-tdg-axis' ) === 'h' );  // Film Strip = horizontal; Card Reel = vertical
		var dTheta = 0, R = 0, zSign = 1, cardW = 0, cardH = 0, pos = 0, vel = 0, stepPx = 0, flat = false;

		function layout() {
			var W = stage.clientWidth || el.clientWidth || 1;
			cardW = Math.max( 30, W * cardPct );
			cardH = ( cards[ 0 ] && cards[ 0 ].offsetHeight ) ? cards[ 0 ].offsetHeight : cardW;
			var dim = horiz ? cardW : cardH;                    // cards step along the reel's own axis
			var step = dim + dim * gap;
			stepPx = step;
			// 3D Curve exactly 0 → a TRULY flat strip: cards just translate along the axis at z=0 with no
			// rotation. Any curve was previously clamped to a 0.06 minimum, leaving a ~2° tilt that
			// foreshortened each card and made its left/right edges shimmer as it slid.
			flat = ( curve === 0 );
			if ( flat ) {
				dTheta = 0; R = 0; zSign = 1;
			} else {
				var amt = clamp( Math.abs( curve ) / 100, 0.06, 1 );
				dTheta = amt * 34;                                 // degrees between cards on the cylinder
				var half = dTheta / 2 * Math.PI / 180;
				R = step / ( 2 * Math.max( 0.02, Math.sin( half ) ) ); // radius so neighbours sit edge-to-edge
				zSign = curve >= 0 ? -1 : 1;                       // negative curve = edges bend BACK (the default look)
			}
			stage.style.perspective = ( W * 1.4 ) + 'px';
			cards.forEach( function ( c ) { c.style.width = cardW + 'px'; c.style.marginLeft = ( -cardW / 2 ) + 'px'; } );
			cards.forEach( function ( c ) { c.style.marginTop = ( -( c.offsetHeight || cardW ) / 2 ) + 'px'; } );
		}

		function applyReel() {
			reel.style.transform = '';
			for ( var i = 0; i < N; i++ ) {
				var c = cards[ i ];
				var p = ( ( i - pos ) % N + N ) % N;               // 0..N
				if ( p > N / 2 ) { p -= N; }                        // wrap into [-N/2, N/2)
				if ( flat ) {
					// Flat strip — pure translation along the axis (no z, no rotation → no edge wobble).
					var sf = p * stepPx;
					c.style.transform = horiz ? ( 'translate3d(' + sf.toFixed( 1 ) + 'px,0,0)' ) : ( 'translate3d(0,' + sf.toFixed( 1 ) + 'px,0)' );
					c.style.opacity = '1';
					c.style.zIndex = String( 1000 - Math.round( Math.abs( p ) ) );
					continue;
				}
				var th = p * dTheta;                                // degrees from centre
				var thr = th * Math.PI / 180;
				var s = R * Math.sin( thr );                        // position along the reel axis
				var z = zSign * ( R * Math.cos( thr ) - R );
				c.style.transform = horiz
					? ( 'translate3d(' + s.toFixed( 1 ) + 'px,0,' + z.toFixed( 1 ) + 'px) rotateY(' + ( zSign * th ).toFixed( 1 ) + 'deg)' )
					: ( 'translate3d(0,' + s.toFixed( 1 ) + 'px,' + z.toFixed( 1 ) + 'px) rotateX(' + ( zSign * -th ).toFixed( 1 ) + 'deg)' );
				var a = Math.abs( th );
				c.style.opacity = ( a > 90 ? Math.max( 0, ( 120 - a ) / 30 ) : 1 ).toFixed( 3 ); // fade cards rounding to the back
				c.style.zIndex = String( 1000 - Math.round( a ) );
			}
		}

		layout();
		applyReel();
		window.addEventListener( 'resize', function () { layout(); applyReel(); }, { passive: true } );
		var hoverF = hoverFactor( el );
		var allowDrag = num( el, 'data-tdg-allowdrag', 1 );
		var momentum = num( el, 'data-tdg-momentum', 1 );
		var dragging = false, pc = 0, scrollY = null, target = 0, dwellT = 0;
		var perCard = Math.max( 0.5, speed / Math.max( 1, N ) );  // seconds a card holds centre (snap)
		var advance = function ( dt ) {
			if ( snap ) {
				dwellT += dt;
				if ( dwellT >= perCard ) { dwellT = 0; target += dir; }
				pos += ( target - pos ) * Math.min( 1, dt * 6 ); // ease toward the snapped target
			} else {
				pos += dir * ( N / Math.max( 1, speed ) ) * dt * hoverF();
			}
		};

		if ( allowDrag ) {
			el.style.cursor = 'grab';
			var down = function ( x, y ) { dragging = true; pc = horiz ? x : y; vel = 0; el.style.cursor = 'grabbing'; };
			var move = function ( x, y ) { if ( ! dragging ) { return; } var cur = horiz ? x : y; var delta = cur - pc; pc = cur; var d = -delta / Math.max( 1, ( horiz ? cardW : cardH ) * 0.9 ); pos += d; vel = d; };
			var up = function () { dragging = false; el.style.cursor = 'grab'; if ( snap ) { target = Math.round( pos ); } };
			attachDrag( el, down, move, up );
		}

		if ( drive === 'scroll' ) {
			var onScroll = function () { scrollY = dir * scrollProgress( el, stage ) * N * num( el, 'data-tdg-rounds', 1 ); };
			window.addEventListener( 'scroll', onScroll, { passive: true } );
			onScroll();
		}

		var autoRun = ( drive === 'continuous' && ! reduce );
		if ( ! ( autoRun || allowDrag || drive === 'scroll' ) ) { return; }
		var last = 0;
		var loop = function ( tm ) {
			if ( ! last ) { last = tm; }
			var dt = ( tm - last ) / 1000; last = tm;
			if ( ! dragging ) {
				if ( autoRun ) { advance( dt ); }
				if ( momentum && Math.abs( vel ) > 0.0005 ) { pos += vel; vel *= 0.92; }
				else if ( drive === 'scroll' && scrollY !== null ) { pos = snap ? Math.round( scrollY ) + ( scrollY - Math.round( scrollY ) ) : scrollY; }
			}
			applyReel();
			requestAnimationFrame( loop );
		};
		requestAnimationFrame( loop );
	}

	/* Wheel Carousel — cards fanned on a big Ferris-style wheel whose hub sits below the frame, so only
	 * the top arc shows. Each card is rotated tangent to the wheel (upright at 12 o'clock = the focus,
	 * tilting away toward the sides) and the wheel steps around, card by card. The step uses a spring so
	 * Overshoot lets it sail past and settle, Anticipation winds it back before it goes, and Hold pauses
	 * on each card. Wheel Size sets the radius, Card Size the cards. A flat (2D) wheel — no depth. */
	function initWheel( el ) {
		if ( el.__tdg ) { return; }
		el.__tdg = true;
		var stage = el.querySelector( '.tdg__stage' );
		var wheel = el.querySelector( '.tdg__wheel' );
		if ( ! stage || ! wheel ) { return; }
		var cards = Array.prototype.slice.call( wheel.querySelectorAll( '.tdg__card' ) );
		var N = cards.length;
		if ( ! N ) { return; }

		var drive = el.getAttribute( 'data-tdg-drive' ) || 'continuous';
		var speed = num( el, 'data-tdg-speed', 20 );
		var dir   = num( el, 'data-tdg-dir', 1 );                 // +1 clockwise, -1 counter-clockwise
		var cardPct = clamp( num( el, 'data-tdg-card', 40 ), 6, 90 ) / 100;
		var wheelPct = clamp( num( el, 'data-tdg-wheel', 70 ), 20, 160 ) / 100;
		var antic = clamp( num( el, 'data-tdg-antic', 0 ) / 100, 0, 1 );
		var over  = clamp( num( el, 'data-tdg-over', 0 ) / 100, 0, 1 );
		var hold  = clamp( num( el, 'data-tdg-hold', 0 ) / 100, 0, 1 );
		var Rw = 0, cx = 0, cy = 0, dPhi = 0, cardW = 0, cardH = 0;
		var C = 0, vel = 0, target = 0, stepTimer = 0;
		var HALF = 1.45;                                          // visible half-arc (radians) from the top

		function layout() {
			var W = stage.clientWidth || el.clientWidth || 1;
			var H = stage.clientHeight || el.clientHeight || 1;
			Rw = Math.min( W, H ) * wheelPct;
			cardW = Math.max( 30, W * cardPct );
			cardH = ( cards[ 0 ] && cards[ 0 ].offsetHeight ) ? cards[ 0 ].offsetHeight : cardW;
			cx = W / 2;
			cy = H * 0.4 + Rw;                                     // hub below the frame → only the top arc shows
			dPhi = 2 * Math.PI / N;                                // evenly around the wheel (Card Size sets the overlap)
			cards.forEach( function ( c ) { c.style.width = cardW + 'px'; c.style.marginLeft = ( -cardW / 2 ) + 'px'; } );
			cards.forEach( function ( c ) { c.style.marginTop = ( -( c.offsetHeight || cardW ) / 2 ) + 'px'; } );
		}

		function applyWheel() {
			wheel.style.transform = '';
			var TOP = -Math.PI / 2;
			for ( var i = 0; i < N; i++ ) {
				var c = cards[ i ];
				var phi = TOP + ( i - C ) * dPhi;
				phi = ( ( phi - TOP + Math.PI ) % ( 2 * Math.PI ) + 2 * Math.PI ) % ( 2 * Math.PI ) - Math.PI + TOP; // wrap around the hub
				var d = phi - TOP;                                 // signed distance from the top (radians)
				var x = cx + Rw * Math.cos( phi ) - ( stage.clientWidth || 1 ) / 2;
				var y = cy + Rw * Math.sin( phi ) - ( stage.clientHeight || 1 ) / 2;
				var nd = Math.abs( d ) / HALF;
				var sc = Math.max( 0.5, 1 - nd * 0.16 );           // gentle shrink toward the rim
				c.style.transform = 'translate3d(' + x.toFixed( 1 ) + 'px,' + y.toFixed( 1 ) + 'px,0) rotate(' + ( d * 180 / Math.PI ).toFixed( 1 ) + 'deg) scale(' + sc.toFixed( 3 ) + ')';
				c.style.opacity = ( Math.abs( d ) > HALF ? Math.max( 0, ( HALF + 0.25 - Math.abs( d ) ) / 0.25 ) : 1 ).toFixed( 3 );
				c.style.zIndex = String( 1000 - Math.round( Math.abs( d ) * 200 ) );
			}
		}

		layout();
		applyWheel();
		window.addEventListener( 'resize', function () { layout(); applyWheel(); }, { passive: true } );
		var hoverF = hoverFactor( el );
		var allowDrag = num( el, 'data-tdg-allowdrag', 1 );
		var momentum = num( el, 'data-tdg-momentum', 1 );
		var dragging = false, pc = 0, scrollY = null;
		var stepInterval = Math.max( 0.55, speed / 10 ) * ( 1 + hold * 2.2 ); // seconds per card (Hold lengthens the dwell)
		var K = 95, zeta = clamp( 1 - over * 0.78, 0.22, 1 );      // spring: Overshoot lowers the damping
		var damp = 2 * Math.sqrt( K ) * zeta;
		var advance = function ( dt ) {
			stepTimer += dt * hoverF();
			if ( stepTimer >= stepInterval ) { stepTimer = 0; target += dir; if ( antic > 0 ) { vel -= dir * antic * 7; } } // Anticipation: wind back
			var a = K * ( target - C ) - damp * vel;
			vel += a * dt; C += vel * dt;
		};

		if ( allowDrag ) {
			el.style.cursor = 'grab';
			var down = function ( x, y ) { dragging = true; pc = x; };
			var move = function ( x, y ) { if ( ! dragging ) { return; } var dx = x - pc; pc = x; C -= dx / Math.max( 1, Rw * dPhi ); };
			var up = function () { dragging = false; target = Math.round( C ); };
			attachDrag( el, down, move, up );
		}

		if ( drive === 'scroll' ) {
			var onScroll = function () { scrollY = dir * scrollProgress( el, stage ) * N * num( el, 'data-tdg-rounds', 1 ); };
			window.addEventListener( 'scroll', onScroll, { passive: true } );
			onScroll();
		}

		var autoRun = ( drive === 'continuous' && ! reduce );
		if ( ! ( autoRun || allowDrag || drive === 'scroll' ) ) { return; }
		var last = 0;
		var loop = function ( tm ) {
			if ( ! last ) { last = tm; }
			var dt = Math.min( 0.05, ( tm - last ) / 1000 ); last = tm;
			if ( ! dragging ) {
				if ( autoRun ) { advance( dt ); }
				else if ( drive === 'scroll' && scrollY !== null ) { var a2 = K * ( scrollY - C ) - damp * vel; vel += a2 * dt; C += vel * dt; }
			}
			applyWheel();
			requestAnimationFrame( loop );
		};
		requestAnimationFrame( loop );
	}

	/* Flow carousels — one runtime for two center-focus carousels that both slide horizontally OR
	 * vertically (data-tdg-axis):
	 *   • Carousel Flow (mode 'carousel') — flat: the centre card is full size, the side cards scale
	 *     down (Side Card Scale) and fade. No tilt.
	 *   • Cover Flow (mode 'cover') — the classic album flow: the centre card faces you, the immediate
	 *     neighbours tilt to Side Tilt and recede, and further cards stack compressed behind them.
	 * Both flow continuously or, with Stop at Centre, snap each card to the middle with a springy dwell. */
	function initFlow( el ) {
		if ( el.__tdg ) { return; }
		el.__tdg = true;
		var stage = el.querySelector( '.tdg__stage' );
		var flow  = el.querySelector( '.tdg__flow' );
		if ( ! stage || ! flow ) { return; }
		var cards = Array.prototype.slice.call( flow.querySelectorAll( '.tdg__card' ) );
		var N = cards.length;
		if ( ! N ) { return; }

		var mode  = ( el.getAttribute( 'data-tdg-flow' ) === 'cover' ) ? 'cover' : 'carousel';
		var vert  = ( el.getAttribute( 'data-tdg-axis' ) === 'v' );
		var drive = el.getAttribute( 'data-tdg-drive' ) || 'continuous';
		var speed = num( el, 'data-tdg-speed', 20 );
		var dir   = num( el, 'data-tdg-dir', 1 );
		var snap  = ( el.getAttribute( 'data-tdg-snap' ) === 'yes' );
		var cardPct   = clamp( num( el, 'data-tdg-card', mode === 'cover' ? 46 : 50 ), 6, 90 ) / 100;
		var gap       = clamp( num( el, 'data-tdg-gap', mode === 'cover' ? 4 : 5 ), 0, 40 ) / 100;
		var sideScale = clamp( num( el, 'data-tdg-sidescale', 82 ), 20, 100 ) / 100; // carousel
		var sideTilt  = clamp( num( el, 'data-tdg-tilt', 40 ), 0, 90 );              // cover
		var cardW = 0, cardH = 0, pos = 0, vel = 0, target = 0, dwellT = 0;

		function layout() {
			var W = stage.clientWidth || el.clientWidth || 1;
			cardW = Math.max( 30, W * cardPct );
			cardH = ( cards[ 0 ] && cards[ 0 ].offsetHeight ) ? cards[ 0 ].offsetHeight : cardW;
			stage.style.perspective = ( W * 1.4 ) + 'px';
			cards.forEach( function ( c ) { c.style.width = cardW + 'px'; c.style.marginLeft = ( -cardW / 2 ) + 'px'; } );
			cards.forEach( function ( c ) { c.style.marginTop = ( -( c.offsetHeight || cardW ) / 2 ) + 'px'; } );
		}

		function applyFlow() {
			flow.style.transform = '';
			var span = vert ? cardH : cardW;
			for ( var i = 0; i < N; i++ ) {
				var c = cards[ i ];
				var d = ( ( i - pos ) % N + N ) % N; if ( d > N / 2 ) { d -= N; } // wrap into [-N/2, N/2)
				var ad = Math.abs( d );
				var axisPos, rot = 0, z = 0, sc = 1, op = 1;
				if ( mode === 'cover' ) {
					var cl = Math.max( -1, Math.min( 1, d ) ), ext = d - cl;
					axisPos = cl * span * ( 0.6 + gap ) + ext * span * 0.15;
					rot = -cl * sideTilt;                            // immediate neighbours tilt to ±Side Tilt
					z = -( Math.abs( cl ) * span * 0.55 + Math.abs( ext ) * span * 0.16 );
					op = ad > 3 ? Math.max( 0, ( 3.6 - ad ) / 0.6 ) : 1;
				} else {
					axisPos = d * span * ( 0.94 + gap );             // uniform slots; sides slide off-frame
					sc = 1 - ( 1 - sideScale ) * Math.min( ad, 1 );  // centre full, sides scaled
					op = Math.max( 0, 1 - 0.5 * Math.min( ad, 1 ) - ( ad > 1 ? 0.28 * ( ad - 1 ) : 0 ) );
					z = -Math.min( ad, 1 ) * span * 0.04;
				}
				var pre = vert ? ( 'translate3d(0,' + axisPos.toFixed( 1 ) + 'px,' + z.toFixed( 1 ) + 'px)' )
				               : ( 'translate3d(' + axisPos.toFixed( 1 ) + 'px,0,' + z.toFixed( 1 ) + 'px)' );
				var rt = ( mode === 'cover' && rot ) ? ( vert ? ( ' rotateX(' + ( -rot ).toFixed( 1 ) + 'deg)' ) : ( ' rotateY(' + rot.toFixed( 1 ) + 'deg)' ) ) : '';
				c.style.transform = pre + rt + ' scale(' + sc.toFixed( 3 ) + ')';
				c.style.opacity = op.toFixed( 3 );
				c.style.zIndex = String( 1000 - Math.round( ad * 100 ) );
			}
		}

		layout();
		applyFlow();
		window.addEventListener( 'resize', function () { layout(); applyFlow(); }, { passive: true } );
		var hoverF = hoverFactor( el );
		var allowDrag = num( el, 'data-tdg-allowdrag', 1 );
		var momentum = num( el, 'data-tdg-momentum', 1 );
		var dragging = false, pcoord = 0, scrollY = null;
		var stepInterval = Math.max( 0.6, speed / 8 );
		var K = 90, damp = 2 * Math.sqrt( 90 ) * 0.95;
		var advance = function ( dt ) {
			if ( snap ) {
				dwellT += dt * hoverF();
				if ( dwellT >= stepInterval ) { dwellT = 0; target += dir; }
				var a = K * ( target - pos ) - damp * vel; vel += a * dt; pos += vel * dt;
			} else {
				pos += dir * ( N / Math.max( 1, speed ) ) * dt * hoverF();
			}
		};

		if ( allowDrag ) {
			el.style.cursor = 'grab';
			var down = function ( x, y ) { dragging = true; pcoord = vert ? y : x; vel = 0; el.style.cursor = 'grabbing'; };
			var move = function ( x, y ) { if ( ! dragging ) { return; } var cur = vert ? y : x; var delta = cur - pcoord; pcoord = cur; var dd = -delta / Math.max( 1, ( vert ? cardH : cardW ) * 0.9 ); pos += dd; vel = dd; };
			var up = function () { dragging = false; el.style.cursor = 'grab'; if ( snap ) { target = Math.round( pos ); } };
			attachDrag( el, down, move, up );
		}

		if ( drive === 'scroll' ) {
			var onScroll = function () { scrollY = dir * scrollProgress( el, stage ) * N * num( el, 'data-tdg-rounds', 1 ); };
			window.addEventListener( 'scroll', onScroll, { passive: true } );
			onScroll();
		}

		var autoRun = ( drive === 'continuous' && ! reduce );
		if ( ! ( autoRun || allowDrag || drive === 'scroll' ) ) { return; }
		var last = 0;
		var loop = function ( tm ) {
			if ( ! last ) { last = tm; }
			var dt = Math.min( 0.05, ( tm - last ) / 1000 ); last = tm;
			if ( ! dragging ) {
				if ( autoRun ) { advance( dt ); }
				if ( momentum && Math.abs( vel ) > 0.0005 && ! snap ) { pos += vel; vel *= 0.9; }
				else if ( drive === 'scroll' && scrollY !== null ) { pos += ( scrollY - pos ) * 0.14; }
			}
			applyFlow();
			requestAnimationFrame( loop );
		};
		requestAnimationFrame( loop );
	}

	/* Mosaic Marquee — a horizontal marquee of cards packed masonry-style (varied row/column spans) that
	 * scrolls sideways forever. The tiles fill a fixed number of rows (derived from Card Height) via CSS
	 * grid dense packing; two identical copies of the grid ride a track that translates by exactly one
	 * copy's width and wraps, so the scroll is seamless. Layout 1/2/3 are three seeded span patterns. A
	 * flat 2D design (no perspective). */
	function initMosaic( el ) {
		if ( el.__tdg ) { return; }
		el.__tdg = true;
		var stage = el.querySelector( '.tdg__stage' );
		var track = el.querySelector( '.tdg__mosaic-track' );
		if ( ! stage || ! track ) { return; }
		var grids = Array.prototype.slice.call( track.querySelectorAll( '.tdg__mosaic' ) );
		if ( ! grids.length ) { return; }

		var drive = el.getAttribute( 'data-tdg-drive' ) || 'continuous';
		var speed = num( el, 'data-tdg-speed', 20 );
		var dir   = num( el, 'data-tdg-dir', 1 );                 // +1 scroll left, -1 scroll right
		var cardH = clamp( num( el, 'data-tdg-card', 30 ), 10, 90 ) / 100;
		var gap   = clamp( num( el, 'data-tdg-gap', 0.5 ), 0, 8 ) / 100;
		var layout = String( el.getAttribute( 'data-tdg-layout' ) || '1' );
		var ratioW = num( el, 'data-tdg-rw', 1 ), ratioH = num( el, 'data-tdg-rh', 1 );
		var corner = num( el, 'data-tdg-corner', 18 );
		var seed = ( layout === '2' ) ? 3.3 : ( layout === '3' ) ? 7.1 : 0.5;

		function rnd( i, s ) { var x = Math.sin( ( i + 1 ) * 63.7 + s * 17.3 + seed * 41.2 ) * 43758.5453; return x - Math.floor( x ); }
		// Airy BENTO masonry on an R-row square grid (R≈2 at the default card height). Each step drops a
		// group into the column flow: a BIG 2×2 tile, a TALL 1×2 tile, a STACK of two 1×1 squares, or a
		// SINGLE 1×1 square top- OR bottom-aligned with an empty cell (background showing) beside it — the
		// exact floating-card variety of the reference. Deterministic per step ⇒ every copy matches ⇒
		// seamless loop. (R>2 falls back to a tall/short/gap partition per single column.)
		var pool = Array.prototype.slice.call( grids[ 0 ].querySelectorAll( '.tdg__card' ) ).map( function ( c ) { return c.cloneNode( true ); } );
		if ( ! pool.length ) { return; }
		var R = 2;
		var cellH = 0, colW = 0, gapPx = 0, setW = 0;
		// Column KINDS split into two categories: FULL-height (big 2×2, tall 1×2) and PARTIAL (stack of two
		// squares, or a single square + empty cell). Rules: (1) two PARTIAL columns are never adjacent — a
		// full-height column always sits between any two halves, so the grid never reads as "too many
		// halves"; (2) never the same family twice in a row. Deterministic per column ⇒ copies match ⇒
		// seamless loop.
		var CAT = { big: 'full', tall: 'full', stack: 'partial', single: 'partial' };
		var FREE = [ [ 'big', 0.26 ], [ 'tall', 0.24 ], [ 'stack', 0.28 ], [ 'single', 0.22 ] ];
		var FULLS = [ [ 'big', 0.55 ], [ 'tall', 0.45 ] ];
		function pickW( list, ci ) {
			var tot = list.reduce( function ( a, f ) { return a + f[ 1 ]; }, 0 );
			var r = rnd( ci * 11 + 5, 1 ) * tot, acc = 0;
			for ( var i = 0; i < list.length; i++ ) { acc += list[ i ][ 1 ]; if ( r < acc ) { return list[ i ][ 0 ]; } }
			return list[ list.length - 1 ][ 0 ];
		}
		function nextFamily( ci, lastFam, lastCat ) {
			// The FIRST column of a set (lastCat '') and any column after a PARTIAL one MUST be full-height —
			// the former keeps the wrap seam (…partial | full…) clean, the latter guarantees a full-height
			// column between any two halves. Otherwise choose freely. Always exclude the previous family so
			// no style repeats back-to-back.
			var forceFull = ( lastCat === 'partial' || lastCat === '' );
			var list = ( forceFull ? FULLS : FREE ).filter( function ( f ) { return f[ 0 ] !== lastFam; } );
			return pickW( list, ci );
		}
		function buildSet( grid, hidden ) {
			grid.innerHTML = '';
			var idx = 0, ci = 0, lastFam = '', lastCat = '', lastSrc = '', singleAlt = false;
			var srcOf = function ( c ) { var im = c.querySelector( 'img' ); return im ? ( im.getAttribute( 'src' ) || '' ) : ''; };
			var addCard = function ( rs, cs ) {
				// Skip an image identical to the previously placed one (the pool may repeat to pad small sets).
				if ( pool.length > 1 && srcOf( pool[ idx % pool.length ] ) === lastSrc ) { idx++; }
				var src0 = pool[ idx % pool.length ];
				var c = src0.cloneNode( true );
				c.setAttribute( 'aria-hidden', hidden ? 'true' : 'false' );
				c.style.borderRadius = corner + 'px'; c.style.overflow = 'hidden';
				c.style.gridRow = 'span ' + rs; c.style.gridColumn = 'span ' + cs;
				// A wide 2×2 "full square" carries the --wide flag so CSS can halve its % frame (a %-padding
				// resolves against width, so a double-width tile would otherwise get a double-thick frame).
				if ( cs === 2 ) { c.className += ' tdg__card--wide'; }
				lastSrc = srcOf( src0 ); grid.appendChild( c ); idx++;
			};
			var addGap = function ( rs, cs ) {
				var s = document.createElement( 'div' ); s.setAttribute( 'aria-hidden', 'true' );
				s.style.gridRow = 'span ' + rs; s.style.gridColumn = 'span ' + cs; grid.appendChild( s );
			};
			do {
				if ( R === 2 ) {
					var fam = nextFamily( ci, lastFam, lastCat ); lastFam = fam; lastCat = CAT[ fam ];
					if ( fam === 'big' ) { addCard( 2, 2 ); }                              // BIG 2×2
					else if ( fam === 'tall' ) { addCard( 2, 1 ); }                        // TALL 1×2
					else if ( fam === 'stack' ) { addCard( 1, 1 ); addCard( 1, 1 ); }      // STACK two squares
					// SINGLE — alternate top-aligned / bottom-aligned each time so both variants reliably
					// appear (a lone square with space below, and a lone square with space above).
					else { if ( singleAlt ) { addCard( 1, 1 ); addGap( 1, 1 ); } else { addGap( 1, 1 ); addCard( 1, 1 ); } singleAlt = ! singleAlt; }
				} else {
					var sum = 0, k = ci * 13 + 4, has = false, seq = [];
					while ( sum < R ) { var rem = R - sum; var sp = ( rem >= 2 && rnd( k++, 1 ) < 0.45 ) ? 2 : 1; var em = ( sp === 1 && rnd( k++, 4 ) < 0.2 ); seq.push( [ sp, em ] ); if ( ! em ) { has = true; } sum += sp; }
					if ( ! has ) { seq[ 0 ][ 1 ] = false; }
					for ( var j = 0; j < seq.length; j++ ) { if ( seq[ j ][ 1 ] ) { addGap( seq[ j ][ 0 ], 1 ); } else { addCard( seq[ j ][ 0 ], 1 ); } }
				}
				ci++;
			} while ( idx < pool.length );
		}
		function styleGrid( g ) {
			g.style.gridTemplateRows = 'repeat(' + R + ',' + cellH.toFixed( 1 ) + 'px)';
			g.style.gridAutoColumns = colW.toFixed( 1 ) + 'px';
			g.style.gap = gapPx.toFixed( 1 ) + 'px';
		}
		var pad = clamp( num( el, 'data-tdg-pad', 6 ), 0, 20 ) / 100;
		function layoutFn() {
			var H0 = stage.clientHeight || el.clientHeight || 1;
			var W = stage.clientWidth || el.clientWidth || 1;
			var padPx = Math.round( pad * H0 );               // inset — background shows in this margin
			stage.style.padding = padPx + 'px';
			track.style.left = padPx + 'px';
			var H = Math.max( 1, H0 - padPx * 2 );            // grid height inside the inset
			R = Math.max( 2, Math.min( 3, Math.round( 1 / cardH ) ) ); // rows of square cells (2 at the default height)
			var g0 = ( H / R ) * gap;
			cellH = ( H - ( R - 1 ) * g0 ) / R;              // square cell, gaps subtracted so the grid fits the stage
			colW = cellH * ( ratioW / ratioH );              // 1:1 → square cell; a TALL/BIG tile reads accordingly
			gapPx = Math.max( 2, g0 );
			track.style.gap = gapPx.toFixed( 1 ) + 'px';
			track.innerHTML = '';
			// Build one real set, style + measure it, then clone identical copies to cover the viewport (+1)
			// so wrapping by exactly one set width is seamless.
			var first = document.createElement( 'div' ); first.className = 'tdg__mosaic';
			track.appendChild( first ); buildSet( first, false ); styleGrid( first );
			setW = first.getBoundingClientRect().width + gapPx;
			var need = Math.max( 2, Math.ceil( W / Math.max( 1, setW ) ) + 1 );
			for ( var c = 1; c < need; c++ ) { var cl = first.cloneNode( true ); cl.setAttribute( 'aria-hidden', 'true' ); track.appendChild( cl ); }
			grids = Array.prototype.slice.call( track.querySelectorAll( '.tdg__mosaic' ) );
		}

		var pos = 0, vel = 0;
		function apply() { track.style.transform = 'translateY(-50%) translateX(' + ( -pos ).toFixed( 1 ) + 'px)'; }
		layoutFn();
		apply();
		// The cards exist now — release the deferred Entrance sequencing (the wrapper waited for them)
		// and let per-card Hover bind the freshly built tiles.
		if ( el.getAttribute( 'data-sc-anim-defer' ) ) { el.removeAttribute( 'data-sc-anim-defer' ); if ( window.upwScAnimBind ) { window.upwScAnimBind( el ); } }
		if ( window.upwHoverRescan ) { window.upwHoverRescan(); }
		window.addEventListener( 'resize', function () { layoutFn(); apply(); }, { passive: true } );
		var hoverF = hoverFactor( el );
		var allowDrag = num( el, 'data-tdg-allowdrag', 1 );
		var momentum = num( el, 'data-tdg-momentum', 1 );
		var dragging = false, px = 0, scrollX = null;
		var wrap = function () { if ( setW > 0 ) { pos = ( ( pos % setW ) + setW ) % setW; } };
		var advance = function ( dt ) { pos += dir * ( setW / Math.max( 3, speed ) ) * dt * hoverF(); wrap(); }; // one loop = one copy in `speed`s

		if ( allowDrag ) {
			el.style.cursor = 'grab';
			var down = function ( x ) { dragging = true; px = x; vel = 0; el.style.cursor = 'grabbing'; };
			var move = function ( x ) { if ( ! dragging ) { return; } var dx = x - px; px = x; pos -= dx; vel = -dx; wrap(); };
			var up = function () { dragging = false; el.style.cursor = 'grab'; };
			attachDrag( el, down, move, up );
		}

		if ( drive === 'scroll' ) {
			var onScroll = function () { scrollX = dir * scrollProgress( el, stage ) * setW * 2 * num( el, 'data-tdg-rounds', 1 ); };
			window.addEventListener( 'scroll', onScroll, { passive: true } );
			onScroll();
		}

		var autoRun = ( drive === 'continuous' && ! reduce );
		if ( ! ( autoRun || allowDrag || drive === 'scroll' ) ) { return; }
		var last = 0;
		var loop = function ( t ) {
			if ( ! last ) { last = t; }
			var dt = Math.min( 0.05, ( t - last ) / 1000 ); last = t;
			if ( ! dragging ) {
				if ( autoRun ) { advance( dt ); }
				if ( momentum && Math.abs( vel ) > 0.3 ) { pos += vel; vel *= 0.94; wrap(); }
				else if ( drive === 'scroll' && scrollX !== null ) { pos += ( scrollX - pos ) * 0.14; wrap(); }
			}
			apply();
			requestAnimationFrame( loop );
		};
		requestAnimationFrame( loop );
	}

	/* Card Stack — a deck of image cards. The top card is featured; the rest peek behind it (offset up,
	 * shrunk) forming a stack. A continuous "position" (0 = card 0 on top … N-1 = last on top) advances
	 * the deck: as position passes a card it PEELS OFF (translates out the exit edge + fades) while the
	 * next rises to the top. Driven by a parent Scroll Story stage's progress (scrubs with the scene),
	 * else the gallery's own travel; or an auto dwell timer. Content stays live, editable cards. */
	function initCardStack( el ) {
		if ( el.__tdgInit ) { return; } el.__tdgInit = true;
		var cards = el.querySelectorAll( '.tdg__deck > .tdg__card' );
		var N = cards.length;
		if ( ! N ) { return; }
		var mode      = el.getAttribute( 'data-tdg-cycle' ) || 'scroll';
		var dwell     = clamp( num( el, 'data-tdg-dwell', 2.5 ), 1, 12 ) * 1000;
		var exit      = el.getAttribute( 'data-tdg-exit' ) || 'down';
		var behind    = clamp( num( el, 'data-tdg-behind', 3 ), 1, 6 );
		var offset    = clamp( num( el, 'data-tdg-offset', 5 ), 0, 14 );
		var scaleStep = clamp( num( el, 'data-tdg-scale', 6 ), 0, 18 ) / 100;
		var stage     = el.querySelector( '.tdg__stage' );
		var ev = ( exit === 'up' ) ? { x: 0, y: -1, r: 0 } : ( exit === 'left' ) ? { x: -1, y: 0, r: -1 }
			: ( exit === 'right' ) ? { x: 1, y: 0, r: 1 } : { x: 0, y: 1, r: 0 };

		function place( card, d ) {
			var tf, op, z;
			if ( d >= 0 ) {
				// on top (d≈0) or waiting BEHIND: nudge up + shrink per depth; only `behind` peek out.
				var dd = Math.min( d, behind + 1 );
				var sc = Math.max( 0.4, 1 - dd * scaleStep );
				tf = 'translate3d(0,' + ( -dd * offset ).toFixed(2) + '%,0) scale(' + sc.toFixed(3) + ')';
				op = d > behind ? 0 : Math.max( 0, 1 - dd * 0.14 );
				z  = 1000 - Math.round( d * 20 );
			} else {
				// already PASSED — peel off the exit edge, fade, sit above the new top while leaving.
				var e = -d, k = Math.min( 1.25, e );
				tf = 'translate3d(' + ( ev.x * k * 120 ).toFixed(1) + '%,' + ( ev.y * k * 120 ).toFixed(1) + '%,0) rotate(' + ( ev.r * -7 * k ).toFixed(1) + 'deg) scale(' + ( 1 + k * 0.06 ).toFixed(3) + ')';
				op = Math.max( 0, 1 - e * 1.5 );
				z  = 1000 + Math.round( e * 8 );
			}
			card.style.transform = tf; card.style.opacity = op; card.style.zIndex = z;
		}
		function render( pos ) { for ( var i = 0; i < N; i++ ) { place( cards[ i ], i - pos ); } }
		render( 0 );
		if ( reduce || mode === 'off' || N < 2 ) { return; }

		if ( mode === 'scroll' ) {
			// progress from a parent Scroll Story stage (remapped to a ranged-persist slice if present),
			// else the gallery's own travel through the viewport — matches the other scroll designs.
			var storyEl = null, pScene = null;
			var progOf = function () {
				if ( ! storyEl && el.closest ) { storyEl = el.closest( '.upw-story--stage' ); }
				if ( storyEl && typeof storyEl.__storyProgress === 'number' ) {
					var pr = storyEl.__storyProgress;
					if ( pScene === null ) { pScene = ( el.closest && el.closest( '.upw-story-scene' ) ) || false; }
					if ( pScene && storyEl.__storyBeats ) {
						var from, to;
						if ( typeof pScene.__pFrom === 'number' ) { from = pScene.__pFrom; to = pScene.__pTo; }
						else if ( typeof pScene.__beatIndex === 'number' ) { from = pScene.__beatIndex; to = pScene.__beatIndex; }
						if ( from !== undefined ) { var lo = from / storyEl.__storyBeats, hi = ( to + 1 ) / storyEl.__storyBeats; if ( hi > lo ) { pr = Math.max( 0, Math.min( 1, ( pr - lo ) / ( hi - lo ) ) ); } }
					}
					return pr;
				}
				return scrollProgress( el, stage );
			};
			var raf = 0, inView = true;
			var loop = function () { if ( ! inView ) { raf = 0; return; } render( progOf() * ( N - 1 ) ); raf = requestAnimationFrame( loop ); };
			if ( 'IntersectionObserver' in window ) {
				new IntersectionObserver( function ( es ) { inView = es[ 0 ].isIntersecting; if ( inView && ! raf ) { raf = requestAnimationFrame( loop ); } }, { threshold: 0 } ).observe( storyEl || el );
			} else { raf = requestAnimationFrame( loop ); }
			return;
		}

		// auto — ease a continuous position toward an advancing integer target; on wrap, re-stack at 0.
		var pos = 0, target = 0, vis = true, araf = 0;
		var frame = function () { pos += ( target - pos ) * 0.12; render( pos ); araf = requestAnimationFrame( frame ); };
		var timer = setInterval( function () {
			if ( ! vis ) { return; }
			if ( target >= N - 1 ) { target = 0; pos = 0; } else { target += 1; }
		}, dwell );
		if ( 'IntersectionObserver' in window ) {
			new IntersectionObserver( function ( es ) { vis = es[ 0 ].isIntersecting; }, { threshold: 0.2 } ).observe( el );
		}
		araf = requestAnimationFrame( frame );
		void timer;
	}

	/* Hero Reel — a horizontal reel of thumbnail cards over a full-bleed HERO background. The card
	 * stepping through the centre is "active": it scales up + lifts, and its image fills the stage as a
	 * dimmed, slowly-zooming (Ken Burns) hero behind the reel, cross-fading as the reel advances. Flat 2D. */
	function initHeroReel( el ) {
		if ( el.__tdg ) { return; }
		el.__tdg = true;
		var stage = el.querySelector( '.tdg__stage' );
		var reel  = el.querySelector( '.tdg__reel' );
		var hero  = el.querySelector( '.tdg__hero' );
		if ( ! stage || ! reel ) { return; }
		var cards = Array.prototype.slice.call( reel.querySelectorAll( '.tdg__card' ) );
		var N = cards.length;
		if ( ! N ) { return; }
		var layers = hero ? Array.prototype.slice.call( hero.querySelectorAll( '.tdg__hero-layer' ) ) : [];

		var drive  = el.getAttribute( 'data-tdg-drive' ) || 'continuous';
		var speed  = num( el, 'data-tdg-speed', 24 );
		var dir    = num( el, 'data-tdg-dir', 1 );
		var cardPct = clamp( num( el, 'data-tdg-card', 18 ), 8, 40 ) / 100;
		var gap    = clamp( num( el, 'data-tdg-gap', 4 ), 0, 20 ) / 100;
		var ascale = clamp( num( el, 'data-tdg-ascale', 112 ), 100, 160 ) / 100;
		var alift  = clamp( num( el, 'data-tdg-alift', 8 ), 0, 30 ) / 100;
		var hop    = clamp( num( el, 'data-tdg-hop', 55 ), 0, 100 ) / 100;
		var kb     = clamp( num( el, 'data-tdg-kb', 60 ), 0, 100 ) / 100;
		var hold   = clamp( num( el, 'data-tdg-hold', 55 ), 0, 100 ) / 100;

		var srcOf = function ( c ) { var im = c.querySelector( 'img' ); return im ? ( im.getAttribute( 'src' ) || '' ) : ''; };

		var cardW = 0, cardH = 0, step = 0, pos = 0, vel = 0, target = 0, dwellT = 0, lastActive = -1, layerOn = 0;
		function layout() {
			var W = stage.clientWidth || el.clientWidth || 1;
			cardW = Math.max( 40, W * cardPct );
			cards.forEach( function ( c ) { c.style.width = cardW + 'px'; c.style.marginLeft = ( -cardW / 2 ) + 'px'; } );
			cardH = ( cards[ 0 ] && cards[ 0 ].offsetHeight ) ? cards[ 0 ].offsetHeight : cardW;
			cards.forEach( function ( c ) { c.style.marginTop = ( -( c.offsetHeight || cardW ) / 2 ) + 'px'; } );
			step = cardW + cardW * gap;
			if ( hero ) { hero.style.opacity = hop.toFixed( 3 ); }
		}
		function apply() {
			for ( var i = 0; i < N; i++ ) {
				var c = cards[ i ];
				var p = ( ( i - pos ) % N + N ) % N;
				if ( p > N / 2 ) { p -= N; }                    // wrap into [-N/2, N/2)
				var x = p * step;
				var d = Math.abs( p );
				var act = Math.max( 0, 1 - d );                  // 1 at centre → 0 one card away
				var sc = 1 + ( ascale - 1 ) * act;
				var ly = -alift * cardH * act;
				c.style.transform = 'translate3d(' + x.toFixed( 1 ) + 'px,' + ly.toFixed( 1 ) + 'px,0) scale(' + sc.toFixed( 3 ) + ')';
				c.style.zIndex = String( 1000 - Math.round( d * 10 ) );
				c.style.opacity = ( d > N / 2 - 0.6 ? Math.max( 0, ( N / 2 - d ) / 0.6 ) : 1 ).toFixed( 3 );
			}
		}
		function setHero( idx ) {
			if ( ! layers.length ) { return; }
			var src = srcOf( cards[ ( ( idx % N ) + N ) % N ] );
			if ( ! src ) { return; }
			layerOn = 1 - layerOn;
			var on = layers[ layerOn ], off = layers[ 1 - layerOn ];
			on.style.backgroundImage = 'url("' + src + '")';
			on.style.transition = 'none'; on.style.transform = 'scale(1)';
			void on.offsetWidth;                                 // restart the Ken Burns zoom
			on.style.transition = 'opacity .8s ease, transform ' + Math.max( 4, speed ) + 's linear';
			on.style.opacity = '1'; on.style.transform = 'scale(' + ( 1 + kb * 0.16 ).toFixed( 3 ) + ')';
			off.style.transition = 'opacity .8s ease'; off.style.opacity = '0';
		}
		layout();
		apply();
		setHero( 0 ); lastActive = 0;
		window.addEventListener( 'resize', function () { layout(); apply(); }, { passive: true } );
		var hoverF = hoverFactor( el );
		var allowDrag = num( el, 'data-tdg-allowdrag', 1 );
		var momentum = num( el, 'data-tdg-momentum', 1 );
		var dragging = false, px = 0;
		var perCard = Math.max( 0.7, speed / Math.max( 1, N ) ) * ( 0.6 + hold * 0.9 ); // Hold lengthens the dwell

		if ( allowDrag ) {
			el.style.cursor = 'grab';
			var down = function ( x ) { dragging = true; px = x; vel = 0; el.style.cursor = 'grabbing'; };
			var move = function ( x ) { if ( ! dragging ) { return; } var dx = x - px; px = x; pos -= dx / Math.max( 1, step ); vel = -dx / Math.max( 1, step ); };
			var up = function () { dragging = false; el.style.cursor = 'grab'; target = Math.round( pos ); };
			attachDrag( el, down, move, up );
		}

		var autoRun = ( drive === 'continuous' && ! reduce );
		if ( ! ( autoRun || allowDrag ) ) { return; }
		var last = 0;
		var loop = function ( t ) {
			if ( ! last ) { last = t; }
			var dt = Math.min( 0.05, ( t - last ) / 1000 ); last = t;
			if ( ! dragging ) {
				if ( autoRun ) { dwellT += dt * hoverF(); if ( dwellT >= perCard ) { dwellT = 0; target += dir; } }
				if ( momentum && Math.abs( vel ) > 0.002 ) { pos += vel; vel *= 0.9; }
				else { pos += ( target - pos ) * Math.min( 1, dt * 5 ); }
			}
			apply();
			var active = ( ( Math.round( pos ) % N ) + N ) % N;
			if ( active !== lastActive ) { setHero( active ); lastActive = active; }
			requestAnimationFrame( loop );
		};
		requestAnimationFrame( loop );
	}

	// Focus Slider — a horizontal (or vertical) auto-advancing slider where the card passing through
	// the CENTRE is "focused": it scales up (Center Scale, up to ~3×) and sits clean, while its
	// neighbours stay small. Optional Zigzag pushes off-centre cards alternately up/down (or left/right
	// in vertical mode); Slide Portion sets how far apart the cards sit (low = overlapping/cinematic,
	// high = spread). Padding / Corner Radius / Background frame each card. Flat 2D (Carousel & Flow).
	function initFocusSlider( el ) {
		if ( el.__tdg ) { return; }
		el.__tdg = true;
		var stage = el.querySelector( '.tdg__stage' );
		var reel  = el.querySelector( '.tdg__reel' );
		if ( ! stage || ! reel ) { return; }
		var cards = Array.prototype.slice.call( reel.querySelectorAll( '.tdg__card' ) );
		var N = cards.length;
		if ( ! N ) { return; }

		var drive    = el.getAttribute( 'data-tdg-drive' ) || 'continuous';
		var speed    = num( el, 'data-tdg-speed', 24 );
		var dir      = num( el, 'data-tdg-dir', 1 );
		var vertical = ( el.getAttribute( 'data-tdg-axis' ) === 'vertical' );
		var cardPct  = clamp( num( el, 'data-tdg-card', 78 ), 20, 100 ) / 100;
		var gap      = clamp( num( el, 'data-tdg-gap', 6 ), 0, 40 ) / 100;
		var cscale   = clamp( num( el, 'data-tdg-cscale', 200 ), 100, 300 ) / 100;
		var zig      = clamp( num( el, 'data-tdg-zig', 0 ), 0, 100 ) / 100;
		var zigFixed = ( el.getAttribute( 'data-tdg-zigmode' ) === 'fixed' );
		var slide    = clamp( num( el, 'data-tdg-slide', 60 ), 20, 100 ) / 100;
		var hold     = clamp( num( el, 'data-tdg-hold', 50 ), 0, 100 ) / 100;

		var cardW = 0, cardH = 0, step = 0, cross = 0, leadV = 0, gapPx = 0, pos = 0, vel = 0, target = 0, dwellT = 0;
		function layout() {
			var W = stage.clientWidth || el.clientWidth || 1;
			var H = stage.clientHeight || el.clientHeight || 1;
			// Size the card on the CROSS axis (height for horizontal, width for vertical) and let the
			// other side follow from the card's aspect-ratio — so a portrait card stays tall & narrow
			// and its neighbours peek past the enlarged centre card, instead of it filling the stage.
			if ( vertical ) {
				var cw = Math.max( 40, W * cardPct );
				cards.forEach( function ( c ) { c.style.width = cw + 'px'; c.style.height = ''; } );
			} else {
				var ch = Math.max( 40, H * cardPct );
				cards.forEach( function ( c ) { c.style.height = ch + 'px'; c.style.width = ''; } );
			}
			cardW = ( cards[ 0 ] && cards[ 0 ].offsetWidth ) || 100;
			cardH = ( cards[ 0 ] && cards[ 0 ].offsetHeight ) || 100;
			cards.forEach( function ( c ) { c.style.marginLeft = ( -cardW / 2 ) + 'px'; c.style.marginTop = ( -cardH / 2 ) + 'px'; } );
			// Each card occupies its own (scaled) extent plus a UNIFORM gap, so the gaps between cards
			// stay equal even though the centre card is much wider than its shrunk neighbours (apply()
			// positions them cumulatively via that gap). Slide Portion opens the gap up; low values pull
			// the cards into a deliberate overlap.
			leadV = vertical ? cardH : cardW;                // focused extent along the slide axis
			gapPx = leadV * ( slide * 0.4 - 0.12 ) + leadV * gap;   // the uniform gap between neighbours (may go negative = overlap)
			step  = leadV / cscale + gapPx;                  // one shrunk-card step — used for drag/snapping
			cross = vertical ? cardW : cardH;                // focused perpendicular extent (for zigzag)
		}
		function apply() {
			var inv = 1 / cscale;                            // a neighbour's scale relative to the focus
			// Cumulative, width-aware position: sum each card's own scaled extent + the uniform gap, so
			// the gaps stay equal across the much wider centre card. `area` is ∫ scale from centre to p.
			function xpos( q ) {
				var s = q < 0 ? -1 : 1, a = ( q < 0 ? -q : q ), area;
				if ( a <= 1 ) { area = a - ( 1 - inv ) * a * a / 2; }
				else { area = ( 1 + inv ) / 2 + inv * ( a - 1 ); }
				return s * ( leadV * area + gapPx * a );
			}
			for ( var i = 0; i < N; i++ ) {
				var c = cards[ i ];
				var p = ( ( i - pos ) % N + N ) % N;
				if ( p > N / 2 ) { p -= N; }                 // wrap into [-N/2, N/2)
				var main = xpos( p );
				var d = Math.abs( p );
				var act = Math.max( 0, 1 - d );              // 1 at centre → 0 one step away
				var sc = inv + ( 1 - inv ) * act;            // focused (centre) = full size; neighbours shrink to 1/cscale
				// Zigzag: off-centre cards shift perpendicular; the focused card stays clean (fade by 1-act).
				// Fixed ties the up/down to each card; Alternate is a slash (one side up, the other down)
				// that flips each step — so the neighbours sit on opposite sides, as in the reference.
				var sgn = zigFixed ? ( i % 2 ? -1 : 1 )
					: ( p < 0 ? -1 : 1 ) * ( ( ( Math.round( pos ) % 2 ) + 2 ) % 2 ? -1 : 1 );
				var off = sgn * zig * cross * 0.5 * ( 1 - act );
				var tx = vertical ? off : main;
				var ty = vertical ? main : off;
				c.style.transform = 'translate3d(' + tx.toFixed( 1 ) + 'px,' + ty.toFixed( 1 ) + 'px,0) scale(' + sc.toFixed( 3 ) + ')';
				c.style.zIndex = String( 1000 - Math.round( d * 10 ) );
				c.style.opacity = ( d > N / 2 - 0.6 ? Math.max( 0, ( N / 2 - d ) / 0.6 ) : 1 ).toFixed( 3 );
			}
		}
		layout();
		apply();
		window.addEventListener( 'resize', function () { layout(); apply(); }, { passive: true } );

		var hoverF    = hoverFactor( el );
		var allowDrag = num( el, 'data-tdg-allowdrag', 1 );
		var momentum  = num( el, 'data-tdg-momentum', 1 );
		var dragging = false, px = 0;
		var perCard = Math.max( 0.7, speed / Math.max( 1, N ) ) * ( 0.6 + hold * 0.9 );

		if ( allowDrag ) {
			el.style.cursor = 'grab';
			var down = function ( x, y ) { dragging = true; px = vertical ? y : x; vel = 0; el.style.cursor = 'grabbing'; };
			var move = function ( x, y ) { if ( ! dragging ) { return; } var cur = vertical ? y : x; var dx = cur - px; px = cur; pos -= dx / Math.max( 1, step ); vel = -dx / Math.max( 1, step ); };
			var up   = function () { dragging = false; el.style.cursor = 'grab'; target = Math.round( pos ); };
			attachDrag( el, down, move, up );
		}

		var autoRun = ( drive === 'continuous' && ! reduce );
		if ( ! ( autoRun || allowDrag ) ) { return; }
		var last = 0;
		var loop = function ( t ) {
			if ( ! last ) { last = t; }
			var dt = Math.min( 0.05, ( t - last ) / 1000 ); last = t;
			if ( ! dragging ) {
				if ( autoRun ) { dwellT += dt * hoverF(); if ( dwellT >= perCard ) { dwellT = 0; target += dir; } }
				if ( momentum && Math.abs( vel ) > 0.002 ) { pos += vel; vel *= 0.9; }
				else { pos += ( target - pos ) * Math.min( 1, dt * 5 ); }
			}
			apply();
			requestAnimationFrame( loop );
		};
		requestAnimationFrame( loop );
	}

	// ---- Scroll Choreography -----------------------------------------------------------------------
	// One gallery that morphs through an ordered list of FORMATIONS as you scroll a pinned stage: the
	// cards start as a stack, form into one arrangement, reform into another, then exit. Each formation
	// is a per-card pose { x%, y%, z(px depth), ry, rx, rot, s(scale), op }; the runtime lerps every
	// card between the two bounding formations at the current scroll progress. Generalizes
	// photo_scatter's scatter→tidy morph to N formations. Honours reduced motion (static first look).
	var CHOREO_PRESETS = {
		showcase:    [ 'stack', 'grid', 'ring', 'scatter' ],
		fan_wall:    [ 'stack', 'fan', 'wall', 'scatter' ],
		form_reform: [ 'stack', 'ring', 'grid', 'scatter' ]
	};
	var CHOREO_EASE = {
		linear: function ( t ) { return t; },
		smooth: function ( t ) { return t * t * ( 3 - 2 * t ); },
		in:     function ( t ) { return t * t; },
		out:    function ( t ) { return 1 - ( 1 - t ) * ( 1 - t ); },
		back:   function ( t ) { var s = 1.70158; return 1 + ( s + 1 ) * Math.pow( t - 1, 3 ) + s * Math.pow( t - 1, 2 ); }
	};

	// Registry of extra resting poses a design or child theme contributes. Two ways to add one, both
	// landing in the SAME shared object so a form registered either way is honoured:
	//   • before this script loads (e.g. a wp_head inline): window.upwGallery3dForms.myform = fn;
	//   • at runtime: window.upwGallery3d.registerChoreoForm('myform', fn).
	// fn(N) returns a pose array (same shape as the built-ins below). Seeding the global in the head makes
	// the form available the moment galleries first init — the robust path for child themes.
	var CHOREO_FORMS = ( window.upwGallery3dForms && typeof window.upwGallery3dForms === 'object' )
		? window.upwGallery3dForms : ( window.upwGallery3dForms = {} );

	// Build one formation's pose array for N cards. Deterministic (computed once per gallery). A
	// registered form wins, so a design can override or extend the built-in looks.
	function choreoForm( name, N ) {
		if ( CHOREO_FORMS[ name ] ) {
			try { var reg = CHOREO_FORMS[ name ]( N ); if ( reg && reg.length ) { return reg; } } catch ( e ) {}
		}
		var out = [], i, R = Math.min( 260, 70 + N * 15 );
		if ( name === 'stack' ) {
			// A tidy photo pile: the higher the index, the nearer the top — upright, a touch larger.
			for ( i = 0; i < N; i++ ) { var up = i / Math.max( 1, N - 1 ), sgn = ( i % 2 ? 1 : -1 );
				out.push( { x: 50 + sgn * ( 2 + up * 2 ), y: 50 - up * 4 + sgn * 1.5, z: i * 4, ry: 0, rx: 0, rot: sgn * ( 5 - up * 3 ), s: 0.86 + up * 0.06, op: 1 } ); }
		} else if ( name === 'grid' ) {
			var cols = Math.max( 2, Math.round( Math.sqrt( N ) * 1.35 ) ), rows = Math.ceil( N / cols );
			for ( i = 0; i < N; i++ ) { var c = i % cols, r = ( i / cols ) | 0, inRow = Math.min( cols, N - r * cols ), pad = ( cols - inRow ) / 2;
				out.push( { x: ( 0.08 + ( ( c + pad + 0.5 ) / cols ) * 0.84 ) * 100, y: ( 0.12 + ( ( r + 0.5 ) / rows ) * 0.76 ) * 100, z: 0, ry: 0, rx: 0, rot: 0, s: 1, op: 1 } ); }
		} else if ( name === 'ring' ) {
			for ( i = 0; i < N; i++ ) { var a = ( i / N ) * 360, cf = Math.cos( a * Math.PI / 180 );
				out.push( { x: 50, y: 50, z: R, ry: a, rx: -6, rot: 0, s: 1, op: 0.35 + 0.65 * ( ( cf + 1 ) / 2 ) } ); }
		} else if ( name === 'fan' ) {
			for ( i = 0; i < N; i++ ) { var d = i - ( N - 1 ) / 2, ang = d * ( 48 / Math.max( 1, N - 1 ) );
				out.push( { x: 50, y: 52, z: -Math.abs( d ) * 86, ry: ang, rx: 0, rot: 0, s: Math.max( 0.6, 1 - Math.abs( d ) * 0.08 ), op: Math.max( 0.45, 1 - Math.abs( d ) * 0.12 ) } ); }
		} else if ( name === 'wall' ) {
			// A gently concave wall — edge columns angle inward and recede, wrapping toward the viewer.
			var cw = Math.max( 3, Math.round( Math.sqrt( N ) * 1.5 ) ), wr = Math.ceil( N / cw );
			for ( i = 0; i < N; i++ ) { var wc = i % cw, wrr = ( i / cw ) | 0, cfrac = ( wc / ( cw - 1 || 1 ) ) - 0.5;
				out.push( { x: ( 0.06 + ( ( wc + 0.5 ) / cw ) * 0.88 ) * 100, y: ( 0.14 + ( ( wrr + 0.5 ) / wr ) * 0.72 ) * 100, z: -40 - Math.abs( cfrac ) * 70, ry: -cfrac * 32, rx: -8, rot: 0, s: 1, op: 1 } ); }
		} else if ( name === 'spiral' ) { // cards threaded along a vertical helix (two turns)
			for ( i = 0; i < N; i++ ) { var sa = ( i / Math.max( 1, N - 1 ) ) * 720, sr = 60 + ( i / Math.max( 1, N - 1 ) ) * 150;
				out.push( { x: 50, y: 26 + ( i / Math.max( 1, N - 1 ) ) * 48, z: sr, ry: sa, rx: 0, rot: 0, s: Math.max( 0.62, 1 - ( i / N ) * 0.3 ), op: 1 } ); }
		} else if ( name === 'wave' ) { // a tilted grid with a per-column sine ripple
			var ac = Math.max( 3, Math.round( Math.sqrt( N ) * 1.5 ) ), ar = Math.ceil( N / ac );
			for ( i = 0; i < N; i++ ) { var vc = i % ac, vr = ( i / ac ) | 0, wob = Math.sin( ( vc / ac ) * Math.PI * 2 ) * 8;
				out.push( { x: ( 0.06 + ( ( vc + 0.5 ) / ac ) * 0.88 ) * 100, y: ( 0.16 + ( ( vr + 0.5 ) / ar ) * 0.68 ) * 100 + wob, z: -20, ry: 0, rx: -10, rot: 0, s: 1, op: 1 } ); }
		} else if ( name === 'carousel' ) { // a flat focus row — centre card big, sides scaled + turned away
			for ( i = 0; i < N; i++ ) { var cd = N > 1 ? ( i / ( N - 1 ) - 0.5 ) : 0, dist = Math.abs( cd ) * 2, span = Math.min( 78, ( N - 1 ) * 13 );
				out.push( { x: 50 + cd * span, y: 50, z: -dist * 60, ry: -cd * 20, rx: 0, rot: 0, s: Math.max( 0.55, 1 - dist * 0.4 ), op: Math.max( 0.4, 1 - dist * 0.4 ) } ); }
		} else if ( name === 'column' ) { // a vertical column (a feed/list read top → bottom)
			for ( i = 0; i < N; i++ ) { var cy = N > 1 ? i / ( N - 1 ) : 0.5;
				out.push( { x: 50, y: 11 + cy * 78, z: 0, ry: 0, rx: 0, rot: 0, s: 0.62, op: 1 } ); }
		} else if ( name === 'sphere' ) { // cards wrapped over a 3D ball (fibonacci distribution)
			var gr = Math.PI * ( 3 - Math.sqrt( 5 ) ), Rs = Math.min( 240, 80 + N * 12 );
			for ( i = 0; i < N; i++ ) { var ph = Math.acos( 1 - 2 * ( i + 0.5 ) / N ), th = gr * i;
				out.push( { x: 50, y: 50, z: Rs, ry: th * 180 / Math.PI, rx: ph * 180 / Math.PI - 90, rot: 0, s: 0.9, op: 1 } ); }
		} else if ( name === 'tunnel' ) { // cards receding into a depth corridor (near → far)
			for ( i = 0; i < N; i++ ) { var tf = i / Math.max( 1, N - 1 ), ta = ( i * 137.5 ) * Math.PI / 180, trad = 18 + tf * 8;
				out.push( { x: 50 + Math.cos( ta ) * trad, y: 50 + Math.sin( ta ) * trad * 0.7, z: 200 - tf * 620, ry: 0, rx: 0, rot: 0, s: 1, op: ( tf > 0.85 ? 0.2 : 1 ) } ); }
		} else if ( name === 'coverflow' ) { // the Cover Flow design: one flat, large front card; neighbours steeply angled and receding
			var fc = Math.round( ( N - 1 ) / 2 ); // a real centre card (no mid gap on even counts)
			for ( i = 0; i < N; i++ ) { var fd = i - fc, fsgn = fd < 0 ? -1 : ( fd > 0 ? 1 : 0 ), fab = Math.abs( fd );
				out.push( {
					x: 50 + fsgn * Math.min( 46, 8 + ( fab - 1 ) * 7 ) * ( fab > 0 ? 1 : 0 ),
					y: 50, z: fab === 0 ? 60 : -fab * 48,
					ry: -fsgn * ( fab === 0 ? 0 : 62 ), rx: 0, rot: 0,
					s: fab === 0 ? 1.08 : Math.max( 0.74, 0.92 - ( fab - 1 ) * 0.05 ),
					op: fab > 4 ? 0.35 : 1
				} ); }
		} else if ( name === 'filmstrip' ) { // the Film Strip / reel design: one even horizontal row, read left → right
			for ( i = 0; i < N; i++ ) { var mt = N > 1 ? i / ( N - 1 ) : 0.5;
				out.push( { x: 8 + mt * 84, y: 50, z: 0, ry: 0, rx: 0, rot: 0, s: Math.max( 0.42, Math.min( 0.6, 7 / N ) ), op: 1 } ); }
		} else if ( name === 'orbit' ) { // the Orbit Globe design: a tilted elliptical ring (halo) of evenly-placed cards, front ones nearer
			for ( i = 0; i < N; i++ ) { var oa = ( i / N ) * Math.PI * 2, odepth = ( Math.sin( oa ) + 1 ) / 2; // 0 (far) .. 1 (near)
				out.push( { x: 50 + Math.cos( oa ) * 38, y: 50 + Math.sin( oa ) * 19, z: Math.sin( oa ) * 120, ry: 0, rx: 0, rot: 0, s: 0.58 + odepth * 0.22, op: 0.72 + odepth * 0.28 } ); }
		} else if ( name === 'hero' ) { // the Hero Reel design: one large hero card above a row of small thumbnails
			for ( i = 0; i < N; i++ ) {
				if ( i === 0 ) { out.push( { x: 50, y: 38, z: 40, ry: 0, rx: 0, rot: 0, s: 1.5, op: 1 } ); }
				else { var ht = N > 2 ? ( i - 1 ) / ( N - 2 ) : 0.5;
					out.push( { x: 10 + ht * 80, y: 80, z: 0, ry: 0, rx: 0, rot: 0, s: Math.max( 0.34, Math.min( 0.46, 6 / N ) ), op: 1 } ); }
			}
		} else if ( name === 'focus' ) { // the Focus Slider design: one large centre card, its two neighbours peeking at the edges
			var qc = Math.round( ( N - 1 ) / 2 );
			for ( i = 0; i < N; i++ ) { var qd = i - qc, qsg = qd < 0 ? -1 : ( qd > 0 ? 1 : 0 ), qab = Math.abs( qd );
				if ( qab === 0 ) { out.push( { x: 50, y: 50, z: 40, ry: 0, rx: 0, rot: 0, s: 1.25, op: 1 } ); }
				else if ( qab === 1 ) { out.push( { x: 50 + qsg * 46, y: 50, z: -40, ry: -qsg * 18, rx: 0, rot: 0, s: 0.86, op: 0.8 } ); }
				else { out.push( { x: 50 + qsg * 52, y: 50, z: -140, ry: 0, rx: 0, rot: 0, s: 0.7, op: 0 } ); } // the rest hide behind, ready to slide in
			}
		} else if ( name === 'depthstack' ) { // the Depth Stack design: cards receding straight back into depth, front → back
			for ( i = 0; i < N; i++ ) { var pt = N > 1 ? i / ( N - 1 ) : 0, psg = i % 2 ? 1 : -1;
				out.push( { x: 50 + psg * 1.5, y: 50 - pt * 3, z: 50 - pt * 520, ry: 0, rx: 0, rot: psg * ( 2.5 - pt * 1.5 ), s: 1, op: pt > 0.82 ? 0.45 : 1 } ); }
		} else if ( name === 'mosaic' ) { // the Mosaic Marquee design: a packed collage — a grid with alternating tile sizes
			var mc = Math.max( 3, Math.round( Math.sqrt( N ) * 1.4 ) ), mr = Math.ceil( N / mc );
			for ( i = 0; i < N; i++ ) { var mcc = i % mc, mrr = ( i / mc ) | 0, inr = Math.min( mc, N - mrr * mc ), mpad = ( mc - inr ) / 2, msz = ( i % 4 === 0 ) ? 1.18 : ( i % 4 === 2 ? 0.82 : 1 );
				out.push( { x: ( 0.07 + ( ( mcc + mpad + 0.5 ) / mc ) * 0.86 ) * 100, y: ( 0.1 + ( ( mrr + 0.5 ) / mr ) * 0.8 ) * 100, z: ( i % 4 === 0 ) ? 30 : 0, ry: 0, rx: 0, rot: 0, s: msz, op: 1 } ); }
		} else { // scatter (exit) — fling the cards out radially and fade them
			for ( i = 0; i < N; i++ ) { var aa = ( i / N ) * Math.PI * 2 + ( i % 2 ? 0.7 : 0 );
				out.push( { x: 50 + Math.cos( aa ) * 118, y: 50 + Math.sin( aa ) * 118, z: 120, ry: 0, rx: 0, rot: ( ( i * 71 ) % 42 ) - 21, s: 0.6, op: 0 } ); }
		}
		return out;
	}

	// Builds the pose engine for one choreography gallery: sizes its cards, reads its Steps / holds /
	// easing / cascade, and returns poseAt(progress) which lerps every card between formations. Shared
	// by the single-gallery driver (initChoreo) and the chain controller (initChoreoChain).
	function choreoPoser( el ) {
		var cards = el.querySelectorAll( '.tdg__card' );
		var N = cards.length;
		if ( ! N ) { return null; }
		// data-tdg-choreo is a comma-separated formation list (PHP resolves presets + Custom), with a
		// bare preset name as a back-compat fallback.
		var VALID_FORMS = { stack: 1, grid: 1, ring: 1, fan: 1, wall: 1, spiral: 1, wave: 1, tunnel: 1, carousel: 1, column: 1, sphere: 1, coverflow: 1, filmstrip: 1, orbit: 1, hero: 1, focus: 1, depthstack: 1, mosaic: 1, scatter: 1 };
		var raw = el.getAttribute( 'data-tdg-choreo' ) || 'showcase';
		var seq;
		if ( raw.indexOf( ',' ) >= 0 ) {
			seq = raw.split( ',' ).map( function ( s ) { return s.trim(); } ).filter( function ( s ) { return VALID_FORMS[ s ] || CHOREO_FORMS[ s ]; } );
		} else {
			seq = CHOREO_PRESETS[ raw ] || CHOREO_PRESETS.showcase;
		}
		if ( seq.length < 2 ) { seq = CHOREO_PRESETS.showcase; }
		// Per-step holds (how long each formation holds before morphing to the next), 0..1.
		var holds = ( el.getAttribute( 'data-tdg-holds' ) || '' ).split( ',' ).map( function ( s ) { return clamp( parseFloat( s ) || 0, 0, 80 ) / 100; } );
		var stagger = clamp( num( el, 'data-tdg-stagger', 25 ), 0, 60 ) / 100;
		var ease    = CHOREO_EASE[ el.getAttribute( 'data-tdg-easing' ) ] || CHOREO_EASE.smooth;
		var cardPct = clamp( num( el, 'data-tdg-card', 16 ), 8, 40 );
		var i;
		for ( i = 0; i < N; i++ ) {
			var cd = cards[ i ];
			cd.style.position = 'absolute'; cd.style.left = '50%'; cd.style.top = '50%'; cd.style.margin = '0';
			cd.style.width = cardPct + '%'; cd.style.transition = 'none'; cd.style.willChange = 'transform, opacity';
		}
		var forms = [], k;
		for ( i = 0; i < seq.length; i++ ) { forms.push( choreoForm( seq[ i ], N ) ); }
		k = forms.length;

		function applyPose( card, p ) {
			card.style.left = p.x + '%'; card.style.top = p.y + '%';
			card.style.opacity = p.op; card.style.zIndex = String( 1000 + Math.round( p.z ) );
			// Depth cue: cards pushed BEHIND the stage dim a little, so depth reads even where opacity is full.
			var bright = clamp( 1 + Math.min( 0, p.z ) / 900, 0.62, 1 );
			card.style.filter = bright < 0.999 ? 'brightness(' + bright.toFixed( 3 ) + ')' : '';
			// Rotate on both axes BEFORE translating out, so a card ends up oriented on the surface it's
			// placed on (correct for the sphere; a ring/fan/spiral still face outward as before).
			card.style.transform = 'translate(-50%,-50%) rotateY(' + p.ry.toFixed( 2 ) + 'deg) rotateX(' + p.rx.toFixed( 2 ) + 'deg) translateZ(' + p.z.toFixed( 1 ) + 'px) rotate(' + p.rot.toFixed( 2 ) + 'deg) scale(' + p.s.toFixed( 3 ) + ')';
		}
		function poseAt( gp ) {
			var seg = clamp( gp, 0, 1 ) * ( k - 1 ), a = Math.min( k - 2, Math.floor( seg ) ), tr = seg - a;
			// Hold the formation we're leaving (step a's own hold), then morph over the rest of the segment.
			var dw = ( a < holds.length ) ? holds[ a ] : 0.15;
			var local = dw > 0 ? clamp( ( tr - dw ) / ( 1 - dw ), 0, 1 ) : tr;
			var span = 1 - stagger, A = forms[ a ], B = forms[ a + 1 ], j;
			for ( j = 0; j < N; j++ ) {
				// Cascade: each card starts its morph a little later, so they move one after another.
				var start = ( N > 1 ? j / ( N - 1 ) : 0 ) * stagger;
				var tj = ease( clamp( ( local - start ) / span, 0, 1 ) );
				var pop = 1 + 0.10 * Math.sin( tj * Math.PI ); // a subtle lift at the midpoint of the morph
				var pa = A[ j ], pb = B[ j ];
				applyPose( cards[ j ], {
					x: pa.x + ( pb.x - pa.x ) * tj, y: pa.y + ( pb.y - pa.y ) * tj, z: pa.z + ( pb.z - pa.z ) * tj,
					ry: pa.ry + ( pb.ry - pa.ry ) * tj, rx: pa.rx + ( pb.rx - pa.rx ) * tj, rot: pa.rot + ( pb.rot - pa.rot ) * tj,
					s: ( pa.s + ( pb.s - pa.s ) * tj ) * pop, op: pa.op + ( pb.op - pa.op ) * tj
				} );
			}
		}
		return { poseAt: poseAt, N: N, k: k };
	}

	// Authoring sugar: a gallery with the "Chain" switch on carries data-tdg-chain. Walk element siblings
	// and wrap each run of 2+ ADJACENT chained galleries in a `.tdg-choreo-chain` container, so the author
	// just drops several Scroll-Choreography galleries next to each other and ticks Chain — no css_class.
	// The section-like block a chained gallery lives in — what we insert the wrapper before and hide once
	// the gallery is relocated out of it (so galleries stacked in one column AND galleries each in their
	// own section both chain).
	function tdgSectionOf( g ) {
		return ( g.closest && ( g.closest( 'section' ) || g.closest( '.upw-section' ) || g.closest( '.fw-main-row' ) ) ) || g.parentNode;
	}
	// A section is safe to hide once its gallery moved out only if nothing else of substance remains in it.
	function tdgSectionEmpty( sec ) {
		if ( ! sec || sec.classList.contains( 'tdg-choreo-chain' ) ) { return false; }
		if ( sec.querySelector( '.tdg--scroll-choreography' ) ) { return false; } // another gallery still lives here
		if ( ( sec.innerText || '' ).trim().length ) { return false; }            // visible text — keep it
		if ( sec.querySelector( 'img, svg, video, canvas, iframe, .wp-block-image, [style*="background-image"]' ) ) { return false; }
		return true;
	}
	function autoGroupChains() {
		// Runs of CONSECUTIVE chained galleries in document order (a non-chained gallery breaks a run).
		// Members may sit in different sections — they are relocated into one overlay wrapper. Any gallery
		// design can chain (not just Scroll Choreography): every `.tdg` wrapper, chained via `data-tdg-chain`.
		var all = Array.prototype.slice.call( document.querySelectorAll( '.tdg' ) );
		var runs = [], cur = [];
		all.forEach( function ( g ) {
			var chained = g.getAttribute( 'data-tdg-chain' ) && ! ( g.closest && g.closest( '.tdg-choreo-chain' ) );
			if ( chained ) { cur.push( g ); }
			else if ( cur.length ) { runs.push( cur ); cur = []; }
		} );
		if ( cur.length ) { runs.push( cur ); }
		runs.forEach( function ( run ) {
			if ( run.length < 2 ) { return; } // a lone chained gallery → initChoreo drives it on its own
			var anchor = tdgSectionOf( run[ 0 ] );
			var box = document.createElement( 'div' );
			box.className = 'tdg-choreo-chain tdg-choreo-chain--auto';
			anchor.parentNode.insertBefore( box, anchor );
			run.forEach( function ( g ) {
				var sec = tdgSectionOf( g );
				box.appendChild( g ); // relocate the gallery into the shared overlay wrapper
				if ( sec && sec !== box && tdgSectionEmpty( sec ) ) { sec.classList.add( 'tdg-choreo-vacated' ); } // hide the emptied section (non-destructive)
			} );
		} );
	}

	// Builds one chain container: overlays its galleries and drives ONE pinned, scrubbed master timeline
	// that plays each gallery's pose sequence and OVERLAPS each exit with the next entrance — gallery 1
	// flies out AS gallery 2 assembles in.
	function buildChain( box ) {
		if ( box.__tdgChain ) { return; }
		box.__tdgChain = true;
		// Every chained gallery in the box — NOT filtered by `__tdg`: a non-choreography design's own init
		// already ran (set `__tdg`) and started the loop that reads `__tdgChainProgress`, which is exactly
		// what we want; only Scroll Choreography is init-skipped when chained.
		var gals = Array.prototype.slice.call( box.querySelectorAll( '.tdg' ) ).filter( function ( g ) { return g.getAttribute( 'data-tdg-chain' ); } );
		if ( gals.length < 2 ) { return; } // one gallery → let it drive itself normally
		var stageH = '70vh', items = [];
		gals.forEach( function ( g ) {
			g.__tdg = true;
			g.classList.remove( 'tdg--pinned' ); // the master pins the chain; drop the gallery's own CSS sticky pin
			var h = ( getComputedStyle( g ).getPropertyValue( '--tdg-stage-h' ) || '70vh' ).trim();
			stageH = h || stageH;
			g.style.position = 'absolute'; g.style.left = '0'; g.style.right = '0'; g.style.top = '0'; g.style.height = h;
			// Scroll Choreography poses its cards directly (choreoPoser); EVERY OTHER design is driven by its
			// own already-running loop reading `__tdgChainProgress` (scrollProgress returns it) — so pose is
			// null for them. Gate on the design class: choreoPoser returns a (default) poser even without
			// formation data, which would wrongly hijack a real design's own layout.
			items.push( { g: g, pose: g.classList.contains( 'tdg--scroll-choreography' ) ? choreoPoser( g ) : null } );
		} );
		if ( items.length < 2 ) { return; }
		function poseIt( it, p ) { if ( it.pose ) { it.pose.poseAt( p ); } else { it.g.__tdgChainProgress = p; } }
		box.style.position = 'relative';
		box.style.height = stageH;
		var OVERLAP = 0.3, UNIT = 2.4; // step overlap fraction, and screen-heights of scroll per gallery
		var master = window.gsap.timeline();
		var total = 0;
		items.forEach( function ( it, idx ) {
			window.gsap.set( it.g, { opacity: idx === 0 ? 1 : 0 } );
			poseIt( it, 0 );
			var proxy = { p: 0 }, sub = window.gsap.timeline();
			sub.set( it.g, { opacity: 1 }, 0 );
			sub.to( proxy, { p: 1, duration: 1, ease: 'none', onUpdate: function () { poseIt( it, proxy.p ); } }, 0 );
			sub.set( it.g, { opacity: 0 }, 1 ); // after its turn (cards are already scattered/faded)
			var pos = idx * ( 1 - OVERLAP );
			master.add( sub, pos );
			total = pos + 1;
		} );
		window.ScrollTrigger.create( {
			trigger: box, start: 'top top', end: '+=' + Math.round( total * UNIT * window.innerHeight ),
			pin: true, pinSpacing: true, scrub: true, anticipatePin: 1, invalidateOnRefresh: true, animation: master
		} );
	}

	// Chain controller: auto-group adjacent chained galleries, then build every `.tdg-choreo-chain`
	// container (explicit css_class OR auto-grouped). Requires GSAP; without it the galleries fall back
	// to the single-gallery driver (sequential pins), still functional.
	function initChoreoChain() {
		if ( IN_EDITOR || ! window.gsap || ! window.ScrollTrigger ) { return; }
		window.gsap.registerPlugin( window.ScrollTrigger );
		autoGroupChains();
		Array.prototype.forEach.call( document.querySelectorAll( '.tdg-choreo-chain' ), buildChain );
	}

	function initChoreo( el ) {
		if ( el.__tdg ) { return; }
		if ( el.closest && el.closest( '.tdg-choreo-chain' ) ) { return; } // driven by the chain controller
		el.__tdg = true;
		var stage = el.querySelector( '.tdg__stage' ) || el;
		var pp = choreoPoser( el );
		if ( ! pp ) { return; }
		var poseAt = pp.poseAt, k = pp.k;

		if ( reduce || window.upwReduceMotion ) { poseAt( k > 1 ? 1 / ( k - 1 ) : 0 ); return; } // the first formed look, static

		// GSAP path: when gsap + ScrollTrigger are on the page, drive the choreography with a pinned,
		// scrubbed ScrollTrigger (robust pin + scrub) instead of the hand-rolled rAF. poseAt does the
		// posing either way (same formations, holds, cascade, easing). Falls back to rAF below if absent.
		if ( ! IN_EDITOR && window.gsap && window.ScrollTrigger ) {
			window.gsap.registerPlugin( window.ScrollTrigger );
			var len = clamp( num( el, 'data-tdg-len', 3 ), 1, 6 );
			el.classList.remove( 'tdg--pinned' );                       // drop the CSS sticky pin
			el.style.height = ( getComputedStyle( el ).getPropertyValue( '--tdg-stage-h' ) || '70vh' ).trim();
			poseAt( 0 );
			window.ScrollTrigger.create( {
				trigger: el, start: 'top top', end: '+=' + Math.round( len * window.innerHeight ),
				pin: true, pinSpacing: true, scrub: true, anticipatePin: 1, invalidateOnRefresh: true,
				onUpdate: function ( self ) { poseAt( self.progress ); },
				onRefresh: function ( self ) { poseAt( self.progress ); }
			} );
			return;
		}

		// Idle-skip: only re-pose when the scroll progress actually changed (no DOM writes while still).
		var lastGp = -1;
		( function loop() {
			var gp = clamp( scrollProgress( el, stage ), 0, 1 );
			if ( Math.abs( gp - lastGp ) > 0.0008 ) { lastGp = gp; poseAt( gp ); }
			requestAnimationFrame( loop );
		}() );
	}

	// Build the context object handed to a registered design's build(ctx). It exposes the same
	// primitives the built-in drivers use (stage, cards, progress, drag, rAF, resize) so a child-theme
	// design is a first-class driver, not a second-class bolt-on.
	function ctxFor( el ) {
		var stage = el.querySelector( '.tdg__stage' ) || el;
		var cards = Array.prototype.slice.call( el.querySelectorAll( '.tdg__card' ) );
		return {
			el: el,
			stage: stage,
			cards: cards,
			reduce: reduce,
			IN_EDITOR: IN_EDITOR,
			clamp: clamp,
			num: function ( attr, dflt ) { return num( el, attr, dflt ); },
			attr: function ( name, dflt ) { var v = el.getAttribute( name ); return v === null ? dflt : v; },
			progress: function () { return scrollProgress( el, stage ); },
			attachDrag: function ( down, move, up ) { attachDrag( el, down, move, up ); },
			raf: requestAnimationFrame,
			// A self-rescheduling rAF loop stamped with the current generation (freezes in the editor,
			// dies on a preview rebuild) — the pattern every built-in driver uses.
			loop: function ( fn ) {
				function tick( t ) { fn( t ); requestAnimationFrame( tick ); }
				requestAnimationFrame( tick );
			},
			onResize: function ( fn ) { window.addEventListener( 'resize', fn, { passive: true } ); }
		};
	}

	// Init one element whose design was registered from a child theme. Matches .tdg--<dashed key>,
	// respects the __tdg once-guard, and isolates a faulty build() so it can never break the page.
	function initCustom( el ) {
		if ( el.__tdg ) { return; }
		for ( var key in CUSTOM ) {
			if ( ! CUSTOM.hasOwnProperty( key ) ) { continue; }
			if ( el.classList.contains( 'tdg--' + dashed( key ) ) ) {
				el.__tdg = true;
				try { CUSTOM[ key ]( ctxFor( el ) ); }
				catch ( e ) { if ( window.console ) { window.console.error( 'Motion Gallery custom design "' + key + '" failed:', e ); } }
				return;
			}
		}
	}

export function initEl(el) {
  if (el.classList.contains('tdg--carousel-ring')) { initRing(el); }
  else if (el.classList.contains('tdg--panorama-wall')) { initWall(el); }
  else if (el.classList.contains('tdg--card-sphere')) { initGlobe(el); }
  else if (el.classList.contains('tdg--orbit-globe')) { initOrbit(el); }
  else if (el.classList.contains('tdg--totem-wall')) { initTotem(el); }
  else if (el.classList.contains('tdg--parallax-totem')) { initParallax(el); }
  else if (el.classList.contains('tdg--card-tunnel')) { initTunnel(el); }
  else if (el.classList.contains('tdg--spiral-stream')) { initSpiral(el); }
  else if (el.classList.contains('tdg--depth-stack')) { initDepthStack(el); }
  else if (el.classList.contains('tdg--tilt-deck')) { initTiltDeck(el); }
  else if (el.classList.contains('tdg--iso-orbit')) { initIsoOrbit(el); }
  else if (el.classList.contains('tdg--iso-stack')) { initIsoStack(el); }
  else if (el.classList.contains('tdg--iso-cascade')) { initIsoCascade(el); }
  else if (el.classList.contains('tdg--iso-fan')) { initIsoFan(el); }
  else if (el.classList.contains('tdg--orbit-bloom')) { initOrbitBloom(el); }
  else if (el.classList.contains('tdg--focus-orbit')) { initFocusOrbit(el); }
  else if (el.classList.contains('tdg--card-reel')) { initReel(el); }
  else if (el.classList.contains('tdg--film-strip')) { initReel(el); }
  else if (el.classList.contains('tdg--wheel-carousel')) { initWheel(el); }
  else if (el.classList.contains('tdg--cover-flow') || el.classList.contains('tdg--carousel-flow')) { initFlow(el); }
  else if (el.classList.contains('tdg--hero-reel')) { initHeroReel(el); }
  else if (el.classList.contains('tdg--focus-slider')) { initFocusSlider(el); }
  else if (el.classList.contains('tdg--mosaic-marquee')) { initMosaic(el); }
}
