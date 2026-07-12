/*
 * Verbatim Custom Cursor CSS (base + every shape), scoped to the playground stage `.mpcur`.
 * The only changes from the plugin CSS: selectors are prefixed with `.mpcur`, the `html.upw-cursor-*`
 * state classes become `.mpcur.upw-cursor-*` (the stage carries them, not <html>), and the few
 * `position: fixed` rules become `position: absolute` so the cursor lives inside the stage box.
 */
export const CURSOR_CSS = `
.mpcur { position: relative; cursor: none; }
.mpcur .upw-cursor {
  --c: var(--upw-cursor-color, #2f74e6);
  --s: var(--upw-cursor-size, 8px);
  position: absolute; top: 0; left: 0; pointer-events: none; z-index: 40;
  opacity: 0; transition: opacity .25s ease; will-change: transform; box-sizing: border-box;
}
.mpcur.upw-cursor-active .upw-cursor { opacity: 1; }
.mpcur .upw-cursor-primary, .mpcur .upw-cursor-secondary {
  transition: width .2s ease, height .2s ease, border-color .2s ease, background-color .2s ease, opacity .2s ease;
}
@keyframes upw-cursor-blob {
  0%, 100% { border-radius: 42% 58% 63% 37% / 41% 44% 56% 59%; }
  50%      { border-radius: 62% 38% 45% 55% / 55% 62% 38% 45%; }
}
@keyframes upw-cursor-radar {
  0%   { transform: translate(-50%, -50%) scale(.1); opacity: .7; }
  100% { transform: translate(-50%, -50%) scale(1);  opacity: 0; }
}
@keyframes upw-cursor-twinkle { 0%, 100% { opacity: 1; } 50% { opacity: .45; } }
@keyframes upw-cursor-rot { to { transform: rotate(360deg); } }
@keyframes upw-cursor-rot-rev { to { transform: rotate(-360deg); } }
.mpcur .upw-cursor-click-ripple, .mpcur .upw-cursor-click-spark { position: absolute; pointer-events: none; z-index: 60; }
.mpcur .upw-cursor-click-ripple {
  width: calc(var(--upw-cursor-size, 8px) * 2); height: calc(var(--upw-cursor-size, 8px) * 2);
  border: 2px solid var(--upw-cursor-color, #2f74e6); border-radius: 50%;
  animation: upw-click-ripple .5s ease-out forwards;
}
@keyframes upw-click-ripple {
  from { opacity: .7; transform: translate(-50%, -50%) scale(.3); }
  to   { opacity: 0;  transform: translate(-50%, -50%) scale(4); }
}
.mpcur .upw-cursor-click-spark {
  width: calc(var(--upw-cursor-size, 8px) * 0.7); height: calc(var(--upw-cursor-size, 8px) * 0.7);
  background: var(--upw-cursor-color, #2f74e6); border-radius: 50%;
  animation: upw-click-spark .5s ease-out forwards;
}
@keyframes upw-click-spark {
  from { opacity: 1; transform: translate(-50%, -50%); }
  to   { opacity: 0; transform: translate(-50%, -50%) translate(var(--dx, 0), var(--dy, 0)); }
}
.mpcur.upw-cursor-hover .upw-cursor--dot,
.mpcur.upw-cursor-hover .upw-cursor--dot-ring,
.mpcur.upw-cursor-hover .upw-cursor--gradient,
.mpcur.upw-cursor-hover .upw-cursor--glow { width: calc(var(--s) * 2.4); height: calc(var(--s) * 2.4); }
.mpcur.upw-cursor-hover .upw-cursor--ring,
.mpcur.upw-cursor-hover .upw-cursor-ring,
.mpcur.upw-cursor-hover .upw-cursor--square,
.mpcur.upw-cursor-hover .upw-cursor--dashed,
.mpcur.upw-cursor-hover .upw-cursor--crosshair,
.mpcur.upw-cursor-hover .upw-cursor--brackets,
.mpcur.upw-cursor-hover .upw-cursor--elastic,
.mpcur.upw-cursor-hover .upw-cursor--arrow,
.mpcur.upw-cursor-hover .upw-cursor--radar,
.mpcur.upw-cursor-hover .upw-cursor--plus,
.mpcur.upw-cursor-hover .upw-cursor--star,
.mpcur.upw-cursor-hover .upw-cursor--diamond,
.mpcur.upw-cursor-hover .upw-cursor--dual-ring,
.mpcur.upw-cursor-hover .upw-cursor--bullseye,
.mpcur.upw-cursor-hover .upw-cursor--reticle,
.mpcur.upw-cursor-hover .upw-cursor--blob { width: calc(var(--s) * 6); height: calc(var(--s) * 6); }
.mpcur.upw-cursor-hover .upw-cursor--invert,
.mpcur.upw-cursor-hover .upw-cursor--streak { width: calc(var(--s) * 4.5); height: calc(var(--s) * 4.5); }
.mpcur.upw-cursor-hover .upw-cursor--dot-ring { opacity: .6; }
.mpcur.upw-cursor-blend .upw-cursor { mix-blend-mode: difference; }
.mpcur.upw-cursor-blend .upw-cursor--dot,
.mpcur.upw-cursor-blend .upw-cursor--dot-ring,
.mpcur.upw-cursor-blend .upw-cursor--gradient,
.mpcur.upw-cursor-blend .upw-cursor--glow,
.mpcur.upw-cursor-blend .upw-cursor--blob,
.mpcur.upw-cursor-blend .upw-cursor--arrow,
.mpcur.upw-cursor-blend .upw-cursor-particle,
.mpcur.upw-cursor-blend .upw-cursor-comet-seg { background: #fff; }
.mpcur.upw-cursor-blend .upw-cursor--ring,
.mpcur.upw-cursor-blend .upw-cursor-ring,
.mpcur.upw-cursor-blend .upw-cursor--square,
.mpcur.upw-cursor-blend .upw-cursor--elastic,
.mpcur.upw-cursor-blend .upw-cursor--radar,
.mpcur.upw-cursor-blend .upw-cursor--radar::before,
.mpcur.upw-cursor-blend .upw-cursor--radar::after,
.mpcur.upw-cursor-blend .upw-cursor--dashed::before { border-color: #fff; }
.mpcur.upw-cursor-blend .upw-cursor--crosshair::before,
.mpcur.upw-cursor-blend .upw-cursor--crosshair::after,
.mpcur.upw-cursor-blend .upw-cursor--brackets::before,
.mpcur.upw-cursor-blend .upw-cursor--brackets::after { background: #fff; border-color: #fff; }

/* --- per-shape --- */
.mpcur .upw-cursor--dot, .mpcur .upw-cursor--dot-ring { width: var(--s); height: var(--s); background: var(--c); border-radius: 50%; }
.mpcur .upw-cursor--ring, .mpcur .upw-cursor-ring { width: calc(var(--s) * 4); height: calc(var(--s) * 4); border: 1.5px solid var(--c); border-radius: 50%; }
.mpcur .upw-cursor--crosshair { width: calc(var(--s) * 3); height: calc(var(--s) * 3); }
.mpcur .upw-cursor--crosshair::before, .mpcur .upw-cursor--crosshair::after { content: ""; position: absolute; background: var(--c); }
.mpcur .upw-cursor--crosshair::before { left: 50%; top: 0; width: 1.5px; height: 100%; transform: translateX(-50%); }
.mpcur .upw-cursor--crosshair::after { top: 50%; left: 0; height: 1.5px; width: 100%; transform: translateY(-50%); }
.mpcur .upw-cursor--brackets { width: calc(var(--s) * 3.5); height: calc(var(--s) * 3.5); }
.mpcur .upw-cursor--brackets::before, .mpcur .upw-cursor--brackets::after { content: ""; position: absolute; width: 32%; height: 32%; }
.mpcur .upw-cursor--brackets::before { top: 0; left: 0; border-top: 1.5px solid var(--c); border-left: 1.5px solid var(--c); }
.mpcur .upw-cursor--brackets::after { bottom: 0; right: 0; border-bottom: 1.5px solid var(--c); border-right: 1.5px solid var(--c); }
.mpcur .upw-cursor--square { width: calc(var(--s) * 3); height: calc(var(--s) * 3); border: 1.5px solid var(--c); border-radius: 4px; }
.mpcur .upw-cursor--dashed { width: calc(var(--s) * 4); height: calc(var(--s) * 4); }
.mpcur .upw-cursor--dashed::before { content: ""; position: absolute; inset: 0; border: 1.5px dashed var(--c); border-radius: 50%; animation: upw-cursor-rot 4s linear infinite; }
.mpcur .upw-cursor--glow { width: calc(var(--s) * 1.6); height: calc(var(--s) * 1.6); border-radius: 50%; background: var(--c); box-shadow: 0 0 10px 4px var(--c), 0 0 20px 8px color-mix(in srgb, var(--c) 45%, transparent); }
.mpcur .upw-cursor--gradient { width: calc(var(--s) * 1.6); height: calc(var(--s) * 1.6); border-radius: 50%; background: linear-gradient(135deg, var(--c), color-mix(in srgb, var(--c) 30%, #fff)); }
.mpcur .upw-cursor--blob { width: calc(var(--s) * 3); height: calc(var(--s) * 3); background: var(--c); border-radius: 42% 58% 63% 37% / 41% 44% 56% 59%; animation: upw-cursor-blob 6s ease-in-out infinite; }
.mpcur .upw-cursor--plus { width: calc(var(--s) * 2.6); height: calc(var(--s) * 2.6); }
.mpcur .upw-cursor--plus::before, .mpcur .upw-cursor--plus::after { content: ""; position: absolute; background: var(--c); border-radius: 2px; }
.mpcur .upw-cursor--plus::before { left: 50%; top: 15%; width: 2.5px; height: 70%; transform: translateX(-50%); }
.mpcur .upw-cursor--plus::after { top: 50%; left: 15%; height: 2.5px; width: 70%; transform: translateY(-50%); }
.mpcur .upw-cursor--star { width: calc(var(--s) * 3); height: calc(var(--s) * 3); background: var(--c); clip-path: polygon(50% 0, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0 50%, 39% 39%); animation: upw-cursor-twinkle 1.6s ease-in-out infinite; }
.mpcur .upw-cursor--diamond { width: calc(var(--s) * 2.6); height: calc(var(--s) * 2.6); background: var(--c); clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%); }
.mpcur .upw-cursor--dual-ring { width: calc(var(--s) * 4); height: calc(var(--s) * 4); }
.mpcur .upw-cursor--dual-ring::before, .mpcur .upw-cursor--dual-ring::after { content: ""; position: absolute; inset: 0; border-radius: 50%; border: 1.5px solid transparent; }
.mpcur .upw-cursor--dual-ring::before { border-top-color: var(--c); border-bottom-color: var(--c); animation: upw-cursor-rot 2.4s linear infinite; }
.mpcur .upw-cursor--dual-ring::after  { border-left-color: var(--c); border-right-color: var(--c); animation: upw-cursor-rot-rev 3.2s linear infinite; }
.mpcur .upw-cursor--bullseye { width: calc(var(--s) * 4); height: calc(var(--s) * 4); border: 1.5px solid var(--c); border-radius: 50%; }
.mpcur .upw-cursor--bullseye::before { content: ""; position: absolute; left: 50%; top: 50%; width: 55%; height: 55%; border: 1.5px solid var(--c); border-radius: 50%; transform: translate(-50%, -50%); }
.mpcur .upw-cursor--bullseye::after { content: ""; position: absolute; left: 50%; top: 50%; width: calc(var(--s) * 0.9); height: calc(var(--s) * 0.9); background: var(--c); border-radius: 50%; transform: translate(-50%, -50%); }
.mpcur .upw-cursor--reticle {
  width: calc(var(--s) * 4); height: calc(var(--s) * 4);
  --rt: linear-gradient(var(--c), var(--c));
  background:
    var(--rt) left top / 30% 2px no-repeat, var(--rt) left top / 2px 30% no-repeat,
    var(--rt) right top / 30% 2px no-repeat, var(--rt) right top / 2px 30% no-repeat,
    var(--rt) left bottom / 30% 2px no-repeat, var(--rt) left bottom / 2px 30% no-repeat,
    var(--rt) right bottom / 30% 2px no-repeat, var(--rt) right bottom / 2px 30% no-repeat;
}
.mpcur .upw-cursor--reticle::after { content: ""; position: absolute; left: 50%; top: 50%; width: 3px; height: 3px; background: var(--c); border-radius: 50%; transform: translate(-50%, -50%); }
.mpcur .upw-cursor--invert { width: calc(var(--s) * 3); height: calc(var(--s) * 3); background: #fff; border-radius: 50%; mix-blend-mode: difference; }
.mpcur .upw-cursor--radar { width: var(--s); height: var(--s); background: var(--c); border-radius: 50%; }
.mpcur .upw-cursor--radar::before, .mpcur .upw-cursor--radar::after { content: ""; position: absolute; left: 50%; top: 50%; width: calc(var(--s) * 6); height: calc(var(--s) * 6); border: 1.5px solid var(--c); border-radius: 50%; transform: translate(-50%, -50%) scale(.1); animation: upw-cursor-radar var(--upw-radar-speed, 1.6s) ease-out infinite; }
.mpcur .upw-cursor--radar::after { animation-delay: calc(var(--upw-radar-speed, 1.6s) / -2); }
.mpcur .upw-cursor--lens {
  width: calc(var(--upw-lens-r, 70px) * 2); height: calc(var(--upw-lens-r, 70px) * 2); border-radius: 50%;
  -webkit-backdrop-filter: blur(var(--upw-lens-blur, 4px)); backdrop-filter: blur(var(--upw-lens-blur, 4px));
  background: rgba(255, 255, 255, .04); border: 1px solid rgba(255, 255, 255, .4);
  box-shadow: inset 0 0 24px rgba(255, 255, 255, .28), inset 0 2px 6px rgba(255, 255, 255, .5), 0 6px 26px rgba(0, 0, 0, .18);
}
.mpcur .upw-cursor--arrow { width: calc(var(--s) * 3.4); height: calc(var(--s) * 3.4); background: var(--c); clip-path: polygon(0 0, 100% 50%, 0 100%, 28% 50%); }
.mpcur .upw-cursor--elastic { width: calc(var(--s) * 4); height: calc(var(--s) * 4); border: 1.5px solid var(--c); border-radius: 50%; }
.mpcur .upw-cursor--streak { width: calc(var(--s) * 1.6); height: calc(var(--s) * 1.6); background: var(--c); border-radius: 50%; }
.mpcur .upw-cursor--sticky { width: calc(var(--s) * 4); height: calc(var(--s) * 4); border: 1.5px solid var(--c); border-radius: 50%; transition: width .2s ease, height .2s ease, border-radius .2s ease, background-color .2s ease; }
.mpcur .upw-cursor--sticky.is-stuck { background: color-mix(in srgb, var(--c) 12%, transparent); }
.mpcur .upw-cursor--glyph { font-size: calc(var(--s) * 2.5); line-height: 1; color: var(--c); font-family: -apple-system, "Segoe UI", Roboto, sans-serif; font-weight: 700; }
.mpcur .upw-cursor-comet-seg { width: calc(var(--s) * 0.8); height: calc(var(--s) * 0.8); background: var(--c); border-radius: 50%; }
.mpcur .upw-cursor-particle { width: calc(var(--s) * 0.75); height: calc(var(--s) * 0.75); background: var(--c); border-radius: 50%; transition: none; opacity: 0; }
.mpcur .upw-cursor--rope { position: absolute; top: 0; left: 0; height: 2px; border-radius: 2px; background: var(--c); transform-origin: left center; pointer-events: none; z-index: 40; opacity: 0; transition: opacity .25s ease; }
.mpcur.upw-cursor-active .upw-cursor--rope { opacity: 1; }
.mpcur .upw-cursor-spotlight { position: absolute; inset: 0; pointer-events: none; z-index: 38; opacity: 0; transition: opacity .3s ease; background: radial-gradient(circle var(--spot-r, 160px) at var(--spot-x, 50%) var(--spot-y, 50%), transparent 0, transparent 60%, rgba(0, 0, 0, var(--spot-dim, .6)) 100%); }
.mpcur.upw-cursor-active .upw-cursor-spotlight { opacity: 1; }
.mpcur .upw-cursor-p { transition: none; opacity: 0; }
.mpcur .upw-cursor-p-echo { width: calc(var(--s) * 3); height: calc(var(--s) * 3); border: 1.5px solid var(--c); border-radius: 50%; }
.mpcur .upw-cursor-p-firefly { width: calc(var(--s) * 0.8); height: calc(var(--s) * 0.8); background: var(--c); border-radius: 50%; box-shadow: 0 0 6px 2px var(--c), 0 0 12px 4px color-mix(in srgb, var(--c) 45%, transparent); }
.mpcur .upw-cursor-p-confetti { width: calc(var(--s) * 0.9); height: calc(var(--s) * 0.5); background: var(--c); border-radius: 1px; }
.mpcur .upw-cursor-p-bubble { width: calc(var(--s) * 1.4); height: calc(var(--s) * 1.4); border-radius: 50%; background: color-mix(in srgb, var(--c) 12%, transparent); border: 1px solid color-mix(in srgb, var(--c) 55%, transparent); }
`;
