import React, {useEffect, useMemo, useRef, useState} from 'react';
import styles from './styles.module.css';

/**
 * Interactive playground for the Hover Interaction module.
 *
 * The EFFECTS registry describes every hover effect exactly as the plugin ships
 * it — the real `.sc-hover--*` CSS (scoped here to `.upw-pg-fx`, the demo
 * element), the controls from hover-settings.php, how the tweaked state maps
 * onto the element (CSS vars / data-attrs, mirroring hover-render.php), and the
 * pointer/text JavaScript drivers (ports of the module's static/js/effects/*.js).
 *
 * Usage in MDX:
 *   <HoverPlayground />               // full module switcher (all effects)
 *   <HoverPlayground only="lift" />   // a single effect, no switcher
 */

// Scope a source effect stylesheet to the playground's demo element.
const scope = (css) => css.replace(/\.sc-hover--/g, '.upw-pg-fx.sc-hover--');

// A small, self-contained colourful "photo" for the image-based effects.
const SAMPLE_IMG =
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='320' height='220'>
<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
<stop offset='0' stop-color='#ff6b6b'/><stop offset='.5' stop-color='#f7b733'/><stop offset='1' stop-color='#4a90e2'/></linearGradient></defs>
<rect width='320' height='220' fill='url(#g)'/>
<circle cx='80' cy='70' r='46' fill='#ffffff' opacity='.35'/>
<circle cx='240' cy='150' r='60' fill='#2d2f7a' opacity='.45'/>
<rect x='118' y='120' width='120' height='72' rx='12' fill='#00d4a0' opacity='.55'/>
</svg>`,
  );

const EFFECTS = {
  // ---------------- Pointer (JS driven) ----------------
  magnetic: {
    label: 'Magnetic', target: 'card',
    css: scope(`.sc-hover--magnetic{transition:transform .25s cubic-bezier(.22,.61,.36,1);will-change:transform}
@media (prefers-reduced-motion:reduce){.sc-hover--magnetic{transition:none}}`),
    controls: [{id: 'strength', label: 'Strength', type: 'slider', min: 0.05, max: 0.6, step: 0.05, default: 0.3}],
    demo: () => ({cls: 'sc-hover--magnetic', style: {}, attrs: {}}),
    js: (el, s) => {
      const str = Number(s.strength);
      const move = (e) => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${((e.clientX - (r.left + r.width / 2)) * str).toFixed(1)}px,${((e.clientY - (r.top + r.height / 2)) * str).toFixed(1)}px)`;
      };
      const leave = () => (el.style.transform = '');
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerleave', leave);
      return () => {el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); el.style.transform = '';};
    },
    sample: (s) => ({effect: 'magnetic', strength: Number(s.strength)}),
  },
  tilt: {
    label: '3D Tilt', target: 'card',
    css: scope(`.sc-hover--tilt{transition:transform .25s cubic-bezier(.22,.61,.36,1);will-change:transform}
.sc-hover-glare{position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity .3s ease;mix-blend-mode:overlay;border-radius:inherit;z-index:2}
@media (prefers-reduced-motion:reduce){.sc-hover--tilt{transition:none}}`),
    controls: [
      {id: 'max_tilt', label: 'Max tilt (°)', type: 'slider', min: 2, max: 25, step: 1, default: 12},
      {id: 'hover_scale', label: 'Hover scale', type: 'slider', min: 1, max: 1.15, step: 0.01, default: 1},
      {id: 'glare', label: 'Glare', type: 'switch', on: 'yes', off: 'no', default: 'no'},
    ],
    demo: (s) => ({cls: 'sc-hover--tilt', style: {}, attrs: {}}),
    js: (el, s) => {
      const max = Number(s.max_tilt), scale = Number(s.hover_scale), glare = s.glare === 'yes';
      let gl = null;
      if (glare) {
        el.style.overflow = 'hidden';
        gl = document.createElement('span');
        gl.className = 'sc-hover-glare';
        el.appendChild(gl);
      }
      const move = (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(800px) rotateY(${(px * max).toFixed(2)}deg) rotateX(${(-py * max).toFixed(2)}deg)${scale !== 1 ? ` scale(${scale})` : ''}`;
        if (gl) {gl.style.opacity = '1'; gl.style.background = `radial-gradient(circle at ${((px + 0.5) * 100).toFixed(0)}% ${((py + 0.5) * 100).toFixed(0)}%, rgba(255,255,255,.35), transparent 55%)`;}
      };
      const leave = () => {el.style.transform = ''; if (gl) gl.style.opacity = '0';};
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerleave', leave);
      return () => {el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); el.style.transform = ''; if (gl && gl.parentNode) gl.parentNode.removeChild(gl);};
    },
    sample: (s) => ({effect: 'tilt', max_tilt: Number(s.max_tilt), hover_scale: Number(s.hover_scale), glare: s.glare}),
  },
  spotlight: {
    label: 'Spotlight', target: 'card',
    css: scope(`.sc-hover--spotlight{position:relative}
.sc-hover--spotlight::before{content:"";position:absolute;inset:0;pointer-events:none;border-radius:inherit;background:radial-gradient(var(--hover-glow-size,40%) var(--hover-glow-size,40%) at var(--mx,50%) var(--my,50%),var(--hover-glow,#6aa6ff),transparent 75%);opacity:0;transition:opacity .3s ease;mix-blend-mode:screen;z-index:0}
.sc-hover--spotlight:hover::before{opacity:.55}
.sc-hover--spotlight > *{position:relative;z-index:1}`),
    controls: [
      {id: 'glow_color', label: 'Glow color', type: 'color', default: '#6aa6ff'},
      {id: 'glow_size', label: 'Glow size (%)', type: 'slider', min: 10, max: 90, step: 5, default: 40},
    ],
    // The glow uses mix-blend-mode:screen — invisible over a light surface, so the
    // demo card is dark (and isolated) to contain the blend. This is presentation
    // only; the effect CSS is unchanged.
    demoStyle: {background: '#1b2233', color: '#eaf0ff', isolation: 'isolate'},
    demo: (s) => ({cls: 'sc-hover--spotlight', style: {'--hover-glow': s.glow_color, '--hover-glow-size': `${s.glow_size}%`}, attrs: {}}),
    js: (el) => {
      const move = (e) => {const r = el.getBoundingClientRect(); el.style.setProperty('--mx', `${e.clientX - r.left}px`); el.style.setProperty('--my', `${e.clientY - r.top}px`);};
      el.addEventListener('pointermove', move);
      return () => el.removeEventListener('pointermove', move);
    },
    sample: (s) => ({effect: 'spotlight', glow_color: s.glow_color, glow_size: Number(s.glow_size)}),
  },
  ripple: {
    label: 'Ripple', target: 'card',
    css: scope(`.sc-hover--ripple{position:relative;overflow:hidden}`) + `
.sc-hover-ripple{position:absolute;border-radius:50%;pointer-events:none;background:var(--hover-ripple,#6aa6ff);opacity:.45;transform:translate(-50%,-50%) scale(0);animation:sc-hover-ripple .6s ease-out forwards}
@keyframes sc-hover-ripple{to{transform:translate(-50%,-50%) scale(1);opacity:0}}`,
    controls: [{id: 'ripple_color', label: 'Ripple color', type: 'color', default: '#6aa6ff'}],
    demo: (s) => ({cls: 'sc-hover--ripple', style: {'--hover-ripple': s.ripple_color}, attrs: {}}),
    js: (el) => {
      const enter = (e) => {
        const r = el.getBoundingClientRect(), size = Math.max(r.width, r.height) * 2;
        const span = document.createElement('span');
        span.className = 'sc-hover-ripple';
        span.style.width = span.style.height = `${size}px`;
        span.style.left = `${e.clientX - r.left}px`;
        span.style.top = `${e.clientY - r.top}px`;
        el.appendChild(span);
        setTimeout(() => span.parentNode && span.parentNode.removeChild(span), 650);
      };
      el.addEventListener('pointerenter', enter);
      return () => el.removeEventListener('pointerenter', enter);
    },
    sample: (s) => ({effect: 'ripple', ripple_color: s.ripple_color}),
  },

  // ---------------- Motion ----------------
  lift: {
    label: 'Lift', target: 'card',
    css: scope(`.sc-hover--lift{transition:transform .25s ease,box-shadow .25s ease}
.sc-hover--lift:hover{transform:translateY(calc(var(--hover-lift,6px)*-1))}
.sc-hover--lift:not([data-hover-noshadow]):hover{box-shadow:0 12px 28px rgba(0,0,0,.18)}
@media (prefers-reduced-motion:reduce){.sc-hover--lift{transition:none}.sc-hover--lift:hover{transform:none}}`),
    controls: [
      {id: 'distance', label: 'Lift distance (px)', type: 'slider', min: 2, max: 20, step: 1, default: 6},
      {id: 'shadow', label: 'Shadow', type: 'switch', on: 'yes', off: 'no', default: 'yes'},
    ],
    demo: (s) => ({cls: 'sc-hover--lift', style: {'--hover-lift': `${s.distance}px`}, attrs: s.shadow === 'yes' ? {} : {'data-hover-noshadow': '1'}}),
    sample: (s) => ({effect: 'lift', distance: Number(s.distance), shadow: s.shadow}),
  },
  scale: {
    label: 'Scale / Zoom', target: 'card',
    css: scope(`.sc-hover--scale{transition:transform .3s cubic-bezier(.22,.61,.36,1)}
.sc-hover--scale:hover{transform:scale(var(--hover-scale-to,1.04))}
@media (prefers-reduced-motion:reduce){.sc-hover--scale:hover{transform:none}}`),
    controls: [{id: 'scale_to', label: 'Scale to', type: 'slider', min: 1, max: 1.2, step: 0.01, default: 1.04}],
    demo: (s) => ({cls: 'sc-hover--scale', style: {'--hover-scale-to': s.scale_to}, attrs: {}}),
    sample: (s) => ({effect: 'scale', scale_to: Number(s.scale_to)}),
  },
  push: {
    label: 'Push', target: 'card',
    css: scope(`.sc-hover--push{transition:transform .18s ease}
.sc-hover--push:hover{transform:translateY(var(--hover-push,5px))}
.sc-hover--push:active{transform:translateY(calc(var(--hover-push,5px)*1.4))}
@media (prefers-reduced-motion:reduce){.sc-hover--push:hover{transform:none}}`),
    controls: [{id: 'depth', label: 'Press depth (px)', type: 'slider', min: 1, max: 12, step: 1, default: 5}],
    demo: (s) => ({cls: 'sc-hover--push', style: {'--hover-push': `${s.depth}px`}, attrs: {}}),
    sample: (s) => ({effect: 'push', depth: Number(s.depth)}),
  },
  pulse: {
    label: 'Pulse', target: 'card',
    css: scope(`.sc-hover--pulse:hover{animation:sc-hover-pulse 1s ease-in-out infinite}`) + `
@keyframes sc-hover-pulse{0%,100%{transform:scale(1)}50%{transform:scale(calc(1 + .06 * var(--hover-pulse,1)))}}`,
    controls: [{id: 'strength', label: 'Pulse size', type: 'slider', min: 0.3, max: 2, step: 0.1, default: 1}],
    demo: (s) => ({cls: 'sc-hover--pulse', style: {'--hover-pulse': s.strength}, attrs: {}}),
    sample: (s) => ({effect: 'pulse', strength: Number(s.strength)}),
  },
  bounce: {
    label: 'Bounce', target: 'card',
    css: scope(`.sc-hover--bounce:hover{animation:sc-hover-bounce .6s cubic-bezier(.28,.84,.42,1)}`) + `
@keyframes sc-hover-bounce{0%,100%{transform:translateY(0)}40%{transform:translateY(calc(var(--hover-bounce,10px)*-1))}60%{transform:translateY(calc(var(--hover-bounce,10px)*-0.4))}80%{transform:translateY(calc(var(--hover-bounce,10px)*-0.15))}}`,
    controls: [{id: 'height', label: 'Bounce height (px)', type: 'slider', min: 4, max: 30, step: 1, default: 10}],
    demo: (s) => ({cls: 'sc-hover--bounce', style: {'--hover-bounce': `${s.height}px`}, attrs: {}}),
    sample: (s) => ({effect: 'bounce', height: Number(s.height)}),
  },
  jelly: {
    label: 'Pop / Jelly', target: 'card',
    css: scope(`.sc-hover--jelly:hover{animation:sc-hover-jelly calc(.5s / var(--hover-jelly,1)) both}`) + `
@keyframes sc-hover-jelly{0%{transform:scale(1,1)}30%{transform:scale(calc(1 + .18 * var(--hover-jelly,1)),calc(1 - .14 * var(--hover-jelly,1)))}50%{transform:scale(calc(1 - .12 * var(--hover-jelly,1)),calc(1 + .12 * var(--hover-jelly,1)))}70%{transform:scale(calc(1 + .06 * var(--hover-jelly,1)),calc(1 - .05 * var(--hover-jelly,1)))}100%{transform:scale(1,1)}}`,
    controls: [{id: 'strength', label: 'Bounciness', type: 'slider', min: 0.3, max: 2, step: 0.1, default: 1}],
    demo: (s) => ({cls: 'sc-hover--jelly', style: {'--hover-jelly': s.strength}, attrs: {}}),
    sample: (s) => ({effect: 'jelly', strength: Number(s.strength)}),
  },
  skew: {
    label: 'Skew', target: 'card',
    css: scope(`.sc-hover--skew{transition:transform .3s cubic-bezier(.22,.61,.36,1)}
.sc-hover--skew:hover{transform:skewX(var(--hover-skew,-6deg))}
@media (prefers-reduced-motion:reduce){.sc-hover--skew:hover{transform:none}}`),
    controls: [{id: 'angle', label: 'Skew angle', type: 'slider', min: -14, max: 14, step: 1, default: -6}],
    demo: (s) => ({cls: 'sc-hover--skew', style: {'--hover-skew': `${s.angle}deg`}, attrs: {}}),
    sample: (s) => ({effect: 'skew', angle: Number(s.angle)}),
  },
  rotate: {
    label: 'Rotate', target: 'card',
    css: scope(`.sc-hover--rotate{transition:transform .3s cubic-bezier(.22,.61,.36,1)}
.sc-hover--rotate:hover{transform:rotate(var(--hover-rotate,6deg))}
@media (prefers-reduced-motion:reduce){.sc-hover--rotate:hover{transform:none}}`),
    controls: [{id: 'angle', label: 'Rotation', type: 'slider', min: -45, max: 45, step: 1, default: 6}],
    demo: (s) => ({cls: 'sc-hover--rotate', style: {'--hover-rotate': `${s.angle}deg`}, attrs: {}}),
    sample: (s) => ({effect: 'rotate', angle: Number(s.angle)}),
  },
  shake: {
    label: 'Shake / Buzz', target: 'card',
    css: scope(`.sc-hover--shake:hover{animation:sc-hover-shake .4s cubic-bezier(.36,.07,.19,.97) both}`) + `
@keyframes sc-hover-shake{10%,90%{transform:translateX(calc(-1px * var(--hover-shake,1)))}20%,80%{transform:translateX(calc(2px * var(--hover-shake,1)))}30%,50%,70%{transform:translateX(calc(-4px * var(--hover-shake,1)))}40%,60%{transform:translateX(calc(4px * var(--hover-shake,1)))}}`,
    controls: [{id: 'strength', label: 'Intensity', type: 'slider', min: 0.3, max: 2, step: 0.1, default: 1}],
    demo: (s) => ({cls: 'sc-hover--shake', style: {'--hover-shake': s.strength}, attrs: {}}),
    sample: (s) => ({effect: 'shake', strength: Number(s.strength)}),
  },

  // ---------------- Decoration ----------------
  glow_border: {
    label: 'Glow Border', target: 'card',
    css: scope(`.sc-hover--glow_border{transition:box-shadow .3s ease;border-radius:inherit}
.sc-hover--glow_border:hover{box-shadow:0 0 0 1px var(--hover-glow,#6aa6ff),0 0 18px 2px var(--hover-glow,#6aa6ff)}`),
    controls: [{id: 'glow_color', label: 'Glow color', type: 'color', default: '#6aa6ff'}],
    demo: (s) => ({cls: 'sc-hover--glow_border', style: {'--hover-glow': s.glow_color}, attrs: {}}),
    sample: (s) => ({effect: 'glow_border', glow_color: s.glow_color}),
  },
  gradient_border: {
    label: 'Gradient Border', target: 'card',
    css: scope(`.sc-hover--gradient_border{position:relative;border-radius:inherit;isolation:isolate}
.sc-hover--gradient_border::after{content:"";position:absolute;inset:0;border-radius:inherit;padding:2px;background:conic-gradient(from 0deg,var(--hover-grad-a,#6aa6ff),var(--hover-grad-b,#a06bff),var(--hover-grad-a,#6aa6ff));-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;opacity:0;transition:opacity .3s ease;pointer-events:none}
.sc-hover--gradient_border:hover::after{opacity:1;animation:sc-hover-grad var(--hover-grad-speed,3s) linear infinite}`) + `
@keyframes sc-hover-grad{to{transform:rotate(1turn)}}`,
    controls: [
      {id: 'color_a', label: 'Gradient color A', type: 'color', default: '#6aa6ff'},
      {id: 'color_b', label: 'Gradient color B', type: 'color', default: '#a06bff'},
      {id: 'speed', label: 'Flow speed (s)', type: 'slider', min: 1, max: 8, step: 0.5, default: 3},
    ],
    demo: (s) => ({cls: 'sc-hover--gradient_border', style: {'--hover-grad-a': s.color_a, '--hover-grad-b': s.color_b, '--hover-grad-speed': `${s.speed}s`}, attrs: {}}),
    sample: (s) => ({effect: 'gradient_border', color_a: s.color_a, color_b: s.color_b, speed: Number(s.speed)}),
  },
  corner_brackets: {
    label: 'Corner Brackets', target: 'card',
    css: scope(`.sc-hover--corner_brackets{position:relative}
.sc-hover--corner_brackets::before,.sc-hover--corner_brackets::after{content:"";position:absolute;width:var(--hover-bracket-size,18px);height:var(--hover-bracket-size,18px);border:2px solid var(--hover-bracket,#6aa6ff);pointer-events:none;opacity:0;transition:opacity .3s ease,transform .3s ease}
.sc-hover--corner_brackets::before{top:4px;left:4px;border-right:0;border-bottom:0;transform:translate(-4px,-4px)}
.sc-hover--corner_brackets::after{bottom:4px;right:4px;border-left:0;border-top:0;transform:translate(4px,4px)}
.sc-hover--corner_brackets:hover::before,.sc-hover--corner_brackets:hover::after{opacity:1;transform:translate(0,0)}`),
    controls: [
      {id: 'bracket_color', label: 'Bracket color', type: 'color', default: '#6aa6ff'},
      {id: 'bracket_size', label: 'Bracket size (px)', type: 'slider', min: 8, max: 40, step: 2, default: 18},
    ],
    demo: (s) => ({cls: 'sc-hover--corner_brackets', style: {'--hover-bracket': s.bracket_color, '--hover-bracket-size': `${s.bracket_size}px`}, attrs: {}}),
    sample: (s) => ({effect: 'corner_brackets', bracket_color: s.bracket_color, bracket_size: Number(s.bracket_size)}),
  },
  fill_sweep: {
    label: 'Fill Sweep', target: 'card',
    css: scope(`.sc-hover--fill_sweep{position:relative;z-index:0;overflow:hidden}
.sc-hover--fill_sweep::before{content:"";position:absolute;inset:0;z-index:-1;background:var(--hover-fill,#2f74e6);transform:scaleX(0);transform-origin:left center;transition:transform .35s cubic-bezier(.22,.61,.36,1);pointer-events:none}
.sc-hover--fill_sweep[data-hover-fill="right"]::before{transform-origin:right center}
.sc-hover--fill_sweep[data-hover-fill="up"]::before{transform:scaleY(0);transform-origin:bottom center}
.sc-hover--fill_sweep[data-hover-fill="center"]::before{transform:scale(0);transform-origin:center}
.sc-hover--fill_sweep:hover::before{transform:scale(1)}`),
    controls: [
      {id: 'fill_color', label: 'Fill color', type: 'color', default: '#2f74e6'},
      {id: 'direction', label: 'Fill from', type: 'select', default: 'left', choices: [['left', 'Left'], ['right', 'Right'], ['up', 'Bottom'], ['center', 'Center']]},
    ],
    demo: (s) => ({cls: 'sc-hover--fill_sweep', style: {'--hover-fill': s.fill_color}, attrs: {'data-hover-fill': s.direction}}),
    sample: (s) => ({effect: 'fill_sweep', fill_color: s.fill_color, direction: s.direction}),
  },
  border_draw: {
    label: 'Border Draw', target: 'card',
    css: scope(`.sc-hover--border_draw{position:relative}
.sc-hover--border_draw::before,.sc-hover--border_draw::after{content:"";position:absolute;inset:0;pointer-events:none;transition:transform .22s ease;transition-delay:0s}
.sc-hover--border_draw::before{border-top:var(--hover-line-w,2px) solid var(--hover-line,#6aa6ff);border-right:var(--hover-line-w,2px) solid var(--hover-line,#6aa6ff);transform:scale(0,1);transform-origin:left top}
.sc-hover--border_draw::after{border-bottom:var(--hover-line-w,2px) solid var(--hover-line,#6aa6ff);border-left:var(--hover-line-w,2px) solid var(--hover-line,#6aa6ff);transform:scale(1,0);transform-origin:left bottom}
.sc-hover--border_draw:hover::before{transform:scale(1,1)}
.sc-hover--border_draw:hover::after{transform:scale(1,1);transition-delay:.2s}`),
    controls: [
      {id: 'line_color', label: 'Line color', type: 'color', default: '#6aa6ff'},
      {id: 'thickness', label: 'Thickness (px)', type: 'slider', min: 1, max: 6, step: 1, default: 2},
    ],
    demo: (s) => ({cls: 'sc-hover--border_draw', style: {'--hover-line': s.line_color, '--hover-line-w': `${s.thickness}px`}, attrs: {}}),
    sample: (s) => ({effect: 'border_draw', line_color: s.line_color, thickness: Number(s.thickness)}),
  },
  outline: {
    label: 'Outline Expand', target: 'card',
    css: scope(`.sc-hover--outline{outline:var(--hover-outline-w,2px) solid var(--hover-outline,#6aa6ff);outline-offset:0;outline-color:transparent;transition:outline-offset .25s ease,outline-color .25s ease}
.sc-hover--outline:hover{outline-offset:var(--hover-outline-off,6px);outline-color:var(--hover-outline,#6aa6ff)}`),
    controls: [
      {id: 'line_color', label: 'Outline color', type: 'color', default: '#6aa6ff'},
      {id: 'offset', label: 'Offset (px)', type: 'slider', min: 2, max: 20, step: 1, default: 6},
      {id: 'thickness', label: 'Thickness (px)', type: 'slider', min: 1, max: 6, step: 1, default: 2},
    ],
    demo: (s) => ({cls: 'sc-hover--outline', style: {'--hover-outline': s.line_color, '--hover-outline-off': `${s.offset}px`, '--hover-outline-w': `${s.thickness}px`}, attrs: {}}),
    sample: (s) => ({effect: 'outline', line_color: s.line_color, offset: Number(s.offset), thickness: Number(s.thickness)}),
  },
  shine: {
    label: 'Shine Sweep', target: 'card',
    css: scope(`.sc-hover--shine{position:relative;overflow:hidden}
.sc-hover--shine::before{content:"";position:absolute;top:0;left:-150%;width:60%;height:100%;background:linear-gradient(115deg,transparent 0%,var(--hover-shine,rgba(255,255,255,.55)) 50%,transparent 100%);transform:skewX(-18deg);pointer-events:none;transition:none}
.sc-hover--shine:hover::before{animation:sc-hover-shine .85s ease}`) + `
@keyframes sc-hover-shine{from{left:-150%}to{left:150%}}`,
    controls: [{id: 'shine_color', label: 'Shine color', type: 'color', default: '#ffffff'}],
    demo: (s) => ({cls: 'sc-hover--shine', style: {'--hover-shine': s.shine_color}, attrs: {}}),
    sample: (s) => ({effect: 'shine', shine_color: s.shine_color}),
  },
  bg_pan: {
    label: 'Background Pan', target: 'card',
    css: scope(`.sc-hover--bg_pan{background-image:linear-gradient(120deg,var(--hover-pan-a,#2f74e6),var(--hover-pan-b,#a06bff),var(--hover-pan-a,#2f74e6));background-size:200% 100%;background-position:0% 0%;transition:background-position .1s linear}
.sc-hover--bg_pan:hover{animation:sc-hover-pan var(--hover-pan-speed,3s) linear infinite}`) + `
@keyframes sc-hover-pan{to{background-position:-200% 0%}}`,
    controls: [
      {id: 'color_a', label: 'Gradient color A', type: 'color', default: '#2f74e6'},
      {id: 'color_b', label: 'Gradient color B', type: 'color', default: '#a06bff'},
      {id: 'speed', label: 'Pan speed (s)', type: 'slider', min: 1, max: 8, step: 0.5, default: 3},
    ],
    demo: (s) => ({cls: 'sc-hover--bg_pan', style: {'--hover-pan-a': s.color_a, '--hover-pan-b': s.color_b, '--hover-pan-speed': `${s.speed}s`}, attrs: {}}),
    sample: (s) => ({effect: 'bg_pan', color_a: s.color_a, color_b: s.color_b, speed: Number(s.speed)}),
  },
  color_shift: {
    label: 'Color Shift', target: 'card',
    css: scope(`.sc-hover--color_shift{transition:background-color .3s ease,color .3s ease}
.sc-hover--color_shift:hover{background-color:var(--hover-shift,#6aa6ff)}`),
    controls: [{id: 'shift_color', label: 'Hover background', type: 'color', default: '#6aa6ff'}],
    demo: (s) => ({cls: 'sc-hover--color_shift', style: {'--hover-shift': s.shift_color}, attrs: {}}),
    sample: (s) => ({effect: 'color_shift', shift_color: s.shift_color}),
  },

  // ---------------- Text ----------------
  underline_grow: {
    label: 'Underline Grow', target: 'text',
    css: scope(`.sc-hover--underline_grow{position:relative}
.sc-hover--underline_grow::after{content:"";position:absolute;left:0;bottom:-2px;width:100%;height:2px;background:var(--hover-line,currentColor);transform:scaleX(0);transform-origin:left center;transition:transform .3s ease;pointer-events:none}
.sc-hover--underline_grow[data-hover-style="center"]::after{transform-origin:center}
.sc-hover--underline_grow:hover::after{transform:scaleX(1)}`),
    controls: [
      {id: 'line_color', label: 'Line color', type: 'color', default: '#2f74e6'},
      {id: 'origin', label: 'Grow from', type: 'select', default: 'left', choices: [['left', 'Left'], ['center', 'Center']]},
    ],
    demo: (s) => ({cls: 'sc-hover--underline_grow', style: {'--hover-line': s.line_color}, attrs: {'data-hover-style': s.origin}}),
    sample: (s) => ({effect: 'underline_grow', line_color: s.line_color, origin: s.origin}),
  },
  glitch: {
    label: 'Glitch', target: 'text',
    css: scope(`.sc-hover--glitch:hover{animation:sc-hover-glitch calc(.4s / var(--hover-glitch,1)) steps(2,end) infinite}`) + `
@keyframes sc-hover-glitch{0%{transform:translate(0);text-shadow:none}25%{transform:translate(calc(-1px * var(--hover-glitch,1)),0);text-shadow:calc(-2px * var(--hover-glitch,1)) 0 rgba(255,0,80,.6),calc(2px * var(--hover-glitch,1)) 0 rgba(0,200,255,.6)}50%{transform:translate(calc(1px * var(--hover-glitch,1)),0);text-shadow:calc(2px * var(--hover-glitch,1)) 0 rgba(255,0,80,.6),calc(-2px * var(--hover-glitch,1)) 0 rgba(0,200,255,.6)}100%{transform:translate(0);text-shadow:none}}`,
    controls: [{id: 'strength', label: 'Intensity', type: 'slider', min: 0.3, max: 2, step: 0.1, default: 1}],
    demo: (s) => ({cls: 'sc-hover--glitch', style: {'--hover-glitch': s.strength}, attrs: {}}),
    sample: (s) => ({effect: 'glitch', strength: Number(s.strength)}),
  },
  letter_spacing: {
    label: 'Letter Spacing', target: 'text',
    css: scope(`.sc-hover--letter_spacing{transition:letter-spacing .3s ease}
.sc-hover--letter_spacing:hover{letter-spacing:var(--hover-letter,3px)}`),
    controls: [{id: 'amount', label: 'Extra spacing (px)', type: 'slider', min: 1, max: 12, step: 1, default: 3}],
    demo: (s) => ({cls: 'sc-hover--letter_spacing', style: {'--hover-letter': `${s.amount}px`}, attrs: {}}),
    sample: (s) => ({effect: 'letter_spacing', amount: Number(s.amount)}),
  },
  text_scramble: {
    label: 'Text Scramble', target: 'text',
    css: '',
    controls: [{id: 'duration', label: 'Duration (s)', type: 'slider', min: 0.2, max: 2, step: 0.1, default: 0.8}],
    demo: () => ({cls: 'sc-hover--text_scramble', style: {}, attrs: {}}),
    js: (el, s) => {
      const dur = (Number(s.duration) || 0.8) * 1000;
      const chars = '!<>-_\\/[]{}=+*^?#abcdef0123456789';
      const orig = el.getAttribute('data-orig') || el.textContent;
      el.setAttribute('data-orig', orig);
      let running = false;
      const enter = () => {
        if (running) return;
        running = true;
        const text = orig, len = text.length; let start = 0;
        const th = []; for (let i = 0; i < len; i++) th[i] = (i / len) * 0.6 + Math.random() * 0.4;
        const frame = (ts) => {
          if (!start) start = ts;
          const p = Math.min(1, (ts - start) / dur);
          let out = '';
          for (let i = 0; i < len; i++) {const c = text.charAt(i); out += c === ' ' || p >= th[i] ? c : chars.charAt(Math.floor(Math.random() * chars.length));}
          el.textContent = out;
          if (p < 1) requestAnimationFrame(frame); else {el.textContent = text; running = false;}
        };
        requestAnimationFrame(frame);
      };
      el.addEventListener('pointerenter', enter);
      return () => {el.removeEventListener('pointerenter', enter); el.textContent = orig;};
    },
    sample: (s) => ({effect: 'text_scramble', duration: Number(s.duration)}),
  },
  text_swap: {
    label: 'Text Swap', target: 'text_swap',
    css: scope(`.sc-hover--text_swap{position:relative;display:inline-block;overflow:hidden;vertical-align:bottom}
.sc-hover--text_swap .sc-hover-swap-a,.sc-hover--text_swap .sc-hover-swap-b{display:block;transition:transform .3s cubic-bezier(.22,.61,.36,1)}
.sc-hover--text_swap .sc-hover-swap-b{position:absolute;top:0;left:0;width:100%;transform:translateY(100%)}
.sc-hover--text_swap[data-hover-swap-dir="down"] .sc-hover-swap-b{transform:translateY(-100%)}
.sc-hover--text_swap:hover .sc-hover-swap-a{transform:translateY(-100%)}
.sc-hover--text_swap[data-hover-swap-dir="down"]:hover .sc-hover-swap-a{transform:translateY(100%)}
.sc-hover--text_swap:hover .sc-hover-swap-b{transform:translateY(0)}`),
    controls: [
      {id: 'swap_text', label: 'Swap-to text', type: 'text', default: 'Swapped!'},
      {id: 'direction', label: 'Slide', type: 'select', default: 'up', choices: [['up', 'Up'], ['down', 'Down']]},
    ],
    demo: (s) => ({cls: 'sc-hover--text_swap', style: {}, attrs: {'data-hover-swap-dir': s.direction}}),
    sample: (s) => ({effect: 'text_swap', swap_text: s.swap_text, direction: s.direction}),
  },

  // ---------------- Image ----------------
  image_reveal: {
    label: 'Image Reveal', target: 'image',
    css: scope(`.sc-hover--image_reveal{overflow:hidden}
.sc-hover--image_reveal img{display:block;transition:transform .5s cubic-bezier(.22,.61,.36,1),filter .5s ease}
.sc-hover--image_reveal[data-hover-style="grayscale"] img,.sc-hover--image_reveal[data-hover-style="zoom_gray"] img{filter:grayscale(1)}
.sc-hover--image_reveal[data-hover-style="zoom"]:hover img,.sc-hover--image_reveal[data-hover-style="zoom_gray"]:hover img{transform:scale(var(--hover-zoom,1.06))}
.sc-hover--image_reveal[data-hover-style="grayscale"]:hover img,.sc-hover--image_reveal[data-hover-style="zoom_gray"]:hover img{filter:grayscale(0)}
.sc-hover--image_reveal[data-hover-style="shine"]{position:relative}
.sc-hover--image_reveal[data-hover-style="shine"]::after{content:"";position:absolute;top:0;left:-75%;width:50%;height:100%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.4),transparent);transform:skewX(-20deg);pointer-events:none;z-index:2}
.sc-hover--image_reveal[data-hover-style="shine"]:hover::after{animation:sc-hover-img-shine .8s ease}`) + `
@keyframes sc-hover-img-shine{to{left:125%}}`,
    controls: [
      {id: 'reveal_style', label: 'Style', type: 'select', default: 'zoom_gray', choices: [['zoom', 'Zoom'], ['grayscale', 'Grayscale → color'], ['zoom_gray', 'Zoom + color'], ['shine', 'Shine sweep']]},
      {id: 'zoom', label: 'Zoom', type: 'slider', min: 1, max: 1.2, step: 0.01, default: 1.06},
    ],
    demo: (s) => ({cls: 'sc-hover--image_reveal', style: {'--hover-zoom': s.zoom}, attrs: {'data-hover-style': s.reveal_style}}),
    sample: (s) => ({effect: 'image_reveal', reveal_style: s.reveal_style, zoom: Number(s.zoom)}),
  },
  grayscale: {
    label: 'Grayscale', target: 'image',
    css: scope(`.sc-hover--grayscale{filter:grayscale(var(--hover-gray,100%));transition:filter .35s ease}
.sc-hover--grayscale:hover{filter:grayscale(0)}`),
    controls: [{id: 'amount', label: 'Grayscale at rest (%)', type: 'slider', min: 20, max: 100, step: 5, default: 100}],
    demo: (s) => ({cls: 'sc-hover--grayscale', style: {'--hover-gray': `${s.amount}%`}, attrs: {}}),
    sample: (s) => ({effect: 'grayscale', amount: Number(s.amount)}),
  },
  blur: {
    label: 'Blur Focus', target: 'image',
    css: scope(`.sc-hover--blur{transition:filter .35s ease}
.sc-hover--blur[data-hover-blur="rest"]{filter:blur(var(--hover-blur,4px))}
.sc-hover--blur[data-hover-blur="rest"]:hover{filter:blur(0)}
.sc-hover--blur[data-hover-blur="hover"]:hover{filter:blur(var(--hover-blur,4px))}`),
    controls: [
      {id: 'amount', label: 'Blur amount (px)', type: 'slider', min: 1, max: 12, step: 1, default: 4},
      {id: 'direction', label: 'Blur', type: 'select', default: 'rest', choices: [['rest', 'Blurred → sharp on hover'], ['hover', 'Sharp → blurred on hover']]},
    ],
    demo: (s) => ({cls: 'sc-hover--blur', style: {'--hover-blur': `${s.amount}px`}, attrs: {'data-hover-blur': s.direction}}),
    sample: (s) => ({effect: 'blur', amount: Number(s.amount), direction: s.direction}),
  },
  brightness: {
    label: 'Brightness', target: 'image',
    css: scope(`.sc-hover--brightness{transition:filter .3s ease}
.sc-hover--brightness:hover{filter:brightness(var(--hover-bright,1.2))}`),
    controls: [
      {id: 'mode', label: 'On hover', type: 'select', default: 'brighten', choices: [['brighten', 'Brighten'], ['dim', 'Dim']]},
      {id: 'amount', label: 'Amount (%)', type: 'slider', min: 5, max: 60, step: 5, default: 20},
    ],
    demo: (s) => ({cls: 'sc-hover--brightness', style: {'--hover-bright': s.mode === 'dim' ? 1 - s.amount / 100 : 1 + s.amount / 100}, attrs: {'data-hover-bright': s.mode}}),
    sample: (s) => ({effect: 'brightness', mode: s.mode, amount: Number(s.amount)}),
  },
};

const GROUPS = [
  ['Pointer', ['magnetic', 'tilt', 'spotlight', 'ripple']],
  ['Motion', ['lift', 'scale', 'push', 'pulse', 'bounce', 'jelly', 'skew', 'rotate', 'shake']],
  ['Decoration', ['glow_border', 'gradient_border', 'corner_brackets', 'fill_sweep', 'border_draw', 'outline', 'shine', 'bg_pan', 'color_shift']],
  ['Text', ['underline_grow', 'glitch', 'letter_spacing', 'text_scramble', 'text_swap']],
  ['Image', ['image_reveal', 'grayscale', 'blur', 'brightness']],
];
const ALL_KEYS = GROUPS.flatMap(([, ks]) => ks);

const phpScalar = (v) => (typeof v === 'number' ? String(v) : `'${v}'`);
function buildPhp(sample) {
  const inst = Object.entries(sample).map(([k, v]) => `'${k}' => ${phpScalar(v)}`).join(', ');
  return `'demo_hover' => [\n    'type'  => 'hover',\n    'value' => [\n        [ ${inst} ],\n    ],\n],`;
}
const defaultsFor = (key) => Object.fromEntries(EFFECTS[key].controls.map((c) => [c.id, c.default]));

export default function HoverPlayground({only}) {
  const keys = only ? [only] : ALL_KEYS;
  const [effect, setEffect] = useState(keys[0]);
  const [state, setState] = useState(() => defaultsFor(keys[0]));
  const fxRef = useRef(null);

  const cfg = EFFECTS[effect];
  const set = (id, v) => setState((s) => ({...s, [id]: v}));
  const pick = (key) => {setEffect(key); setState(defaultsFor(key));};

  const demo = cfg.demo(state);
  const php = buildPhp(cfg.sample(state));
  const allCss = useMemo(() => keys.map((k) => EFFECTS[k].css).join('\n'), [only]);
  const usesColor = cfg.controls.some((c) => c.type === 'color');

  // Run the pointer/text JS driver for the current effect (mirrors hover-core.js).
  useEffect(() => {
    if (!cfg.js || !fxRef.current) return undefined;
    return cfg.js(fxRef.current, state);
  }, [effect, state]);

  const fxClass = `upw-pg-fx ${demo.cls}`;
  const fxStyle = {...demo.style, ...(cfg.demoStyle || {})};

  const renderTarget = () => {
    if (cfg.target === 'text') {
      return (
        <span ref={fxRef} className={`${styles.textel} ${fxClass}`} style={fxStyle} {...demo.attrs}>
          Hover me
        </span>
      );
    }
    if (cfg.target === 'text_swap') {
      return (
        <span ref={fxRef} className={`${styles.textel} ${fxClass}`} style={fxStyle} {...demo.attrs}>
          <span className="sc-hover-swap-a">Hover me</span>
          <span className="sc-hover-swap-b" aria-hidden="true">{state.swap_text || 'Hover me'}</span>
        </span>
      );
    }
    if (cfg.target === 'image') {
      return (
        <div ref={fxRef} className={`${styles.imgwrap} ${fxClass}`} style={fxStyle} {...demo.attrs}>
          <img className={styles.img} src={SAMPLE_IMG} alt="Sample" />
        </div>
      );
    }
    return (
      <div ref={fxRef} className={`${styles.card} ${fxClass}`} style={fxStyle} {...demo.attrs}>
        <div className={styles.icon}>✦</div>
        <h4>{cfg.label}</h4>
        <p>Hover me to preview</p>
      </div>
    );
  };

  return (
    <div className={styles.playground}>
      <style>{allCss}</style>

      {!only && (
        <div className={styles.tabs}>
          {GROUPS.map(([label, ks]) => (
            <div className={styles.tabGroup} key={label}>
              <span className={styles.tabGroupLabel}>{label}</span>
              <div className={styles.tabPills}>
                {ks.map((k) => (
                  <button key={k} type="button"
                    className={k === effect ? styles.tabActive : styles.tab}
                    onClick={() => pick(k)}>
                    {EFFECTS[k].label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.grid}>
        <div className={styles.stage}>
          <div className={styles.stageInner}>{renderTarget()}</div>
          <div className={styles.hint}>👆 hover — tweak the options on the right</div>
        </div>

        <div className={styles.controls}>
          <h5>{cfg.label} — options</h5>
          {cfg.controls.map((c) => (
            <div className={styles.control} key={c.id}>
              {c.type === 'slider' && (
                <>
                  <label>{c.label} <span>{state[c.id]}</span></label>
                  <input type="range" min={c.min} max={c.max} step={c.step}
                    value={state[c.id]} onChange={(e) => set(c.id, e.target.value)} />
                </>
              )}
              {c.type === 'switch' && (
                <>
                  <label>{c.label}</label>
                  <div className={styles.toggle}>
                    <button type="button" className={state[c.id] === c.off ? styles.on : ''} onClick={() => set(c.id, c.off)}>Off</button>
                    <button type="button" className={state[c.id] === c.on ? styles.on : ''} onClick={() => set(c.id, c.on)}>On</button>
                  </div>
                </>
              )}
              {c.type === 'select' && (
                <>
                  <label>{c.label}</label>
                  <select className={styles.select} value={state[c.id]} onChange={(e) => set(c.id, e.target.value)}>
                    {c.choices.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                </>
              )}
              {c.type === 'color' && (
                <>
                  <label>{c.label} <span>{state[c.id]}</span></label>
                  <input type="color" className={styles.color} value={state[c.id]} onChange={(e) => set(c.id, e.target.value)} />
                </>
              )}
              {c.type === 'text' && (
                <>
                  <label>{c.label}</label>
                  <input type="text" className={styles.text} value={state[c.id]} onChange={(e) => set(c.id, e.target.value)} />
                </>
              )}
            </div>
          ))}
          <button type="button" className={styles.reset} onClick={() => setState(defaultsFor(effect))}>Reset</button>
        </div>
      </div>

      <div className={styles.code}>
        <div>Sample option — updates as you tweak</div>
        <pre><code>{php}</code></pre>
        {usesColor && (
          <p className={styles.note}>
            Color fields use the theme <strong>color-preset picker</strong>, so they actually
            store <code>{`[ 'predefined' => '', 'custom' => '#hex' ]`}</code> — the resolved
            color is shown here for clarity.
          </p>
        )}
      </div>
    </div>
  );
}
