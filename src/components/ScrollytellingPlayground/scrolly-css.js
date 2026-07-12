/*
 * Verbatim Scrollytelling CSS (base pin/layer stacking + the 23 CSS transition styles), scoped to
 * the playground stage `.storystage`. Only changes from the plugin CSS: every selector is prefixed
 * with `.storystage`, and the progress rail is moved to the left edge (the vertical scroll slider
 * lives on the right). The scrub/canvas styles (parallax, pixelate, color_shift, frame_sequence,
 * horizontal_track, liquid) are not included — they need real media / a canvas / WebGL.
 */
export const SCROLLY_CSS = `
.storystage .upw-story { position: relative; }
.storystage .upw-story .fw-row { display: flex; align-items: flex-start; }
.storystage .upw-story-media { position: sticky; top: var(--story-top, 0px); height: var(--story-h, 440px); align-self: flex-start; overflow: hidden; }
.storystage .upw-story-layer { position: absolute; inset: 0; margin: 0; opacity: 0; transition: opacity var(--story-trans, 0.6s) ease; }
.storystage .upw-story-layer.is-active { opacity: 1; }
.storystage .upw-story-layer > * { width: 100%; height: 100%; }
.storystage .upw-story-step { min-height: var(--story-step-min, 440px); display: flex; flex-direction: column; justify-content: center; }

.storystage .upw-story[data-story-dir="up"]    .upw-story-layer { --story-tx: 0; --story-ty: var(--story-dist, 100%); }
.storystage .upw-story[data-story-dir="down"]  .upw-story-layer { --story-tx: 0; --story-ty: calc(-1 * var(--story-dist, 100%)); }
.storystage .upw-story[data-story-dir="left"]  .upw-story-layer { --story-tx: var(--story-dist, 100%); --story-ty: 0; }
.storystage .upw-story[data-story-dir="right"] .upw-story-layer { --story-tx: calc(-1 * var(--story-dist, 100%)); --story-ty: 0; }

/* progress rail (moved to the LEFT edge here) */
.storystage .upw-story-progress { position: absolute; z-index: 3; pointer-events: auto; }
.storystage .upw-story-progress--dots { top: 50%; left: 16px; right: auto; transform: translateY(-50%); display: flex; flex-direction: column; gap: 10px; }
.storystage .upw-story-dot { width: 10px; height: 10px; padding: 0; border: 0; border-radius: 50%; background: currentColor; opacity: 0.3; cursor: pointer; transition: opacity .25s ease, transform .25s ease; }
.storystage .upw-story-dot.is-active { opacity: 1; transform: scale(1.35); }
.storystage .upw-story-progress--bar { top: 0; left: 0; right: auto; width: 3px; height: 100%; background: rgba(128,128,128,0.25); }
.storystage .upw-story-progress__fill { display: block; width: 100%; height: 100%; background: currentColor; transform: scaleY(0); transform-origin: top; transition: transform .2s linear; }

/* --- the 23 CSS transition styles (verbatim) --- */
.storystage .upw-story[data-story-style="slide"] .upw-story-layer { --story-dist: 30%; opacity: 0; transform: translate(var(--story-tx, 0), var(--story-ty, 30%)); transition: opacity var(--story-trans, 0.6s) ease, transform var(--story-trans, 0.6s) cubic-bezier(0.22, 1, 0.36, 1); }
.storystage .upw-story[data-story-style="slide"] .upw-story-layer.is-active { opacity: 1; transform: translate(0, 0); }
.storystage .upw-story[data-story-style="cover"] .upw-story-layer { --story-dist: 100%; opacity: 1; transform: translate(var(--story-tx, 100%), var(--story-ty, 0)); transition: transform var(--story-trans, 0.6s) cubic-bezier(0.7, 0, 0.3, 1); }
.storystage .upw-story[data-story-style="cover"] .upw-story-layer.is-active { transform: translate(0, 0); }
.storystage .upw-story[data-story-style="push"] .upw-story-layer { --story-dist: 100%; opacity: 1; transform: translate(var(--story-tx, 0), var(--story-ty, 100%)); transition: transform var(--story-trans, 0.6s) cubic-bezier(0.7, 0, 0.3, 1); }
.storystage .upw-story[data-story-style="push"] .upw-story-layer.is-active { transform: translate(0, 0); }
.storystage .upw-story[data-story-style="zoom"] .upw-story-layer { opacity: 0; transform: scale(calc(1 + var(--story-intensity, 0.5) * 0.18)); transition: opacity var(--story-trans, 0.6s) ease, transform var(--story-trans, 0.6s) cubic-bezier(0.22, 1, 0.36, 1); }
.storystage .upw-story[data-story-style="zoom"] .upw-story-layer.is-active { opacity: 1; transform: scale(1); }
.storystage .upw-story[data-story-style="zoom_blur"] .upw-story-layer { opacity: 0; transform: scale(calc(1.15 + var(--story-intensity, 0.5) * 0.2)); filter: blur(calc(6px + var(--story-intensity, 0.5) * 14px)); transition: opacity var(--story-trans, 0.6s) ease, transform var(--story-trans, 0.6s) cubic-bezier(0.22, 1, 0.36, 1), filter var(--story-trans, 0.6s) ease; }
.storystage .upw-story[data-story-style="zoom_blur"] .upw-story-layer.is-active { opacity: 1; transform: scale(1); filter: blur(0); }
.storystage .upw-story[data-story-style="blur"] .upw-story-layer { opacity: 0; filter: blur(calc(var(--story-intensity, 0.5) * 24px)); transition: opacity var(--story-trans, 0.6s) ease, filter var(--story-trans, 0.6s) ease; }
.storystage .upw-story[data-story-style="blur"] .upw-story-layer.is-active { opacity: 1; filter: blur(0); }
.storystage .upw-story[data-story-style="cube"] .upw-story-media { perspective: 1200px; }
.storystage .upw-story[data-story-style="cube"] .upw-story-layer { opacity: 1; backface-visibility: hidden; transform: rotateX(90deg); transform-origin: center bottom; transition: transform var(--story-trans, 0.6s) cubic-bezier(0.7, 0, 0.3, 1); }
.storystage .upw-story[data-story-style="cube"] .upw-story-layer.is-active { transform: rotateX(0deg); transform-origin: center center; }
.storystage .upw-story[data-story-style="flip"] .upw-story-media { perspective: 1400px; }
.storystage .upw-story[data-story-style="flip"] .upw-story-layer { opacity: 1; backface-visibility: hidden; transform: rotateY(90deg); transition: transform var(--story-trans, 0.6s) ease; }
.storystage .upw-story[data-story-style="flip"] .upw-story-layer.is-active { transform: rotateY(0deg); }
.storystage .upw-story[data-story-style="page_turn"] .upw-story-media { perspective: 1600px; }
.storystage .upw-story[data-story-style="page_turn"] .upw-story-layer { opacity: 1; transform-origin: left center; transform: rotateY(-118deg); backface-visibility: hidden; transition: transform var(--story-trans, 0.6s) cubic-bezier(0.6, 0, 0.4, 1); }
.storystage .upw-story[data-story-style="page_turn"] .upw-story-layer.is-active { transform: rotateY(0deg); }
.storystage .upw-story[data-story-style="tilt"] .upw-story-media { perspective: 1000px; }
.storystage .upw-story[data-story-style="tilt"] .upw-story-layer { opacity: 0; transform: rotateX(calc(8deg + var(--story-intensity, 0.5) * 10deg)) scale(1.05) translateY(6%); transition: opacity var(--story-trans, 0.6s) ease, transform var(--story-trans, 0.6s) cubic-bezier(0.22, 1, 0.36, 1); }
.storystage .upw-story[data-story-style="tilt"] .upw-story-layer.is-active { opacity: 1; transform: none; }
.storystage .upw-story[data-story-style="curtain"] .upw-story-layer { opacity: 1; clip-path: inset(100% 0 0 0); transition: clip-path var(--story-trans, 0.6s) ease; }
.storystage .upw-story[data-story-style="curtain"] .upw-story-layer.is-active { clip-path: inset(0 0 0 0); }
.storystage .upw-story[data-story-style="curtain"][data-story-dir="down"] .upw-story-layer { clip-path: inset(0 0 100% 0); }
.storystage .upw-story[data-story-style="curtain"][data-story-dir="left"] .upw-story-layer { clip-path: inset(0 100% 0 0); }
.storystage .upw-story[data-story-style="curtain"][data-story-dir="right"] .upw-story-layer { clip-path: inset(0 0 0 100%); }
.storystage .upw-story[data-story-style="clip_wipe"] .upw-story-layer { opacity: 1; clip-path: inset(0 100% 0 0); transition: clip-path var(--story-trans, 0.6s) cubic-bezier(0.22, 1, 0.36, 1); }
.storystage .upw-story[data-story-style="clip_wipe"] .upw-story-layer.is-active { clip-path: inset(0 0 0 0); }
.storystage .upw-story[data-story-style="clip_wipe"][data-story-dir="right"] .upw-story-layer { clip-path: inset(0 0 0 100%); }
.storystage .upw-story[data-story-style="clip_wipe"][data-story-dir="up"] .upw-story-layer { clip-path: inset(100% 0 0 0); }
.storystage .upw-story[data-story-style="clip_wipe"][data-story-dir="down"] .upw-story-layer { clip-path: inset(0 0 100% 0); }
.storystage .upw-story[data-story-style="iris"] .upw-story-layer { opacity: 1; clip-path: circle(0% at 50% 50%); transition: clip-path var(--story-trans, 0.6s) ease; }
.storystage .upw-story[data-story-style="iris"] .upw-story-layer.is-active { clip-path: circle(75% at 50% 50%); }
.storystage .upw-story[data-story-style="dissolve"] .upw-story-layer { opacity: 0; -webkit-mask-image: radial-gradient(circle, #000 55%, transparent 60%); mask-image: radial-gradient(circle, #000 55%, transparent 60%); -webkit-mask-size: 16px 16px; mask-size: 16px 16px; -webkit-mask-repeat: repeat; mask-repeat: repeat; transition: opacity var(--story-trans, 0.6s) ease; }
.storystage .upw-story[data-story-style="dissolve"] .upw-story-layer.is-active { opacity: 1; }
.storystage .upw-story[data-story-style="glitch"] .upw-story-layer { opacity: 0; transition: opacity calc(var(--story-trans, 0.6s) * 0.4) ease; }
.storystage .upw-story[data-story-style="glitch"] .upw-story-layer.is-active { opacity: 1; animation: upw-story-glitch var(--story-trans, 0.6s) steps(2, end); }
@keyframes upw-story-glitch { 0% { clip-path: inset(0 0 60% 0); transform: translateX(-8px); filter: hue-rotate(0deg) saturate(1.8); } 25% { clip-path: inset(40% 0 20% 0); transform: translateX(9px); } 50% { clip-path: inset(70% 0 5% 0); transform: translateX(-5px); filter: hue-rotate(90deg); } 75% { clip-path: inset(15% 0 45% 0); transform: translateX(4px); } 100% { clip-path: inset(0 0 0 0); transform: none; filter: none; } }
@property --upw-blind { syntax: '<percentage>'; inherits: false; initial-value: 0%; }
.storystage .upw-story[data-story-style="blinds"] .upw-story-layer { opacity: 1; --upw-blind: 0%; -webkit-mask-image: repeating-linear-gradient(to bottom, #000 0, #000 var(--upw-blind), transparent var(--upw-blind), transparent 10%); mask-image: repeating-linear-gradient(to bottom, #000 0, #000 var(--upw-blind), transparent var(--upw-blind), transparent 10%); transition: --upw-blind var(--story-trans, 0.6s) ease, opacity var(--story-trans, 0.6s) ease; }
.storystage .upw-story[data-story-style="blinds"] .upw-story-layer.is-active { --upw-blind: 10%; }
.storystage .upw-story[data-story-style="scan"] .upw-story-layer { opacity: 0; -webkit-mask-image: repeating-linear-gradient(to bottom, #000 0 2px, rgba(0,0,0,0.55) 2px 4px); mask-image: repeating-linear-gradient(to bottom, #000 0 2px, rgba(0,0,0,0.55) 2px 4px); transition: opacity var(--story-trans, 0.6s) ease; }
.storystage .upw-story[data-story-style="scan"] .upw-story-layer.is-active { opacity: 1; animation: upw-story-scan var(--story-trans, 0.6s) linear; }
@keyframes upw-story-scan { 0% { filter: brightness(2.2) contrast(1.4); } 100% { filter: brightness(1) contrast(1); } }
.storystage .upw-story[data-story-style="ken_burns"] .upw-story-layer { opacity: 0; transition: opacity var(--story-trans, 0.6s) ease; }
.storystage .upw-story[data-story-style="ken_burns"] .upw-story-layer.is-active { opacity: 1; }
.storystage .upw-story[data-story-style="ken_burns"] .upw-story-layer.is-active > * { transform-origin: 50% 50%; animation: upw-story-kb calc(9s + var(--story-intensity, 0.5) * 8s) ease-out both; }
@keyframes upw-story-kb { from { transform: scale(1); } to { transform: scale(calc(1.08 + var(--story-intensity, 0.5) * 0.12)) translate3d(-2%, -2%, 0); } }
.storystage .upw-story[data-story-style="split"] .upw-story-layer { opacity: 1; clip-path: inset(50% 0 50% 0); transition: clip-path var(--story-trans, 0.6s) cubic-bezier(0.7, 0, 0.3, 1); }
.storystage .upw-story[data-story-style="split"] .upw-story-layer.is-active { clip-path: inset(0 0 0 0); }
.storystage .upw-story[data-story-style="barn"] .upw-story-layer { opacity: 1; clip-path: inset(0 50% 0 50%); transition: clip-path var(--story-trans, 0.6s) cubic-bezier(0.7, 0, 0.3, 1); }
.storystage .upw-story[data-story-style="barn"] .upw-story-layer.is-active { clip-path: inset(0 0 0 0); }
.storystage .upw-story[data-story-style="flash"] .upw-story-layer { opacity: 0; transition: opacity calc(var(--story-trans, 0.6s) * 0.5) ease; }
.storystage .upw-story[data-story-style="flash"] .upw-story-layer.is-active { opacity: 1; animation: upw-story-flash var(--story-trans, 0.6s) ease; }
@keyframes upw-story-flash { 0% { filter: brightness(5) contrast(0.4); } 35% { filter: brightness(1.5); } 100% { filter: brightness(1); } }
.storystage .upw-story[data-story-style="duotone"] .upw-story-layer { opacity: 0; filter: grayscale(1) contrast(1.15); transition: opacity var(--story-trans, 0.6s) ease, filter var(--story-trans, 0.6s) ease; }
.storystage .upw-story[data-story-style="duotone"] .upw-story-layer.is-active { opacity: 1; filter: grayscale(0) contrast(1); }
`;
