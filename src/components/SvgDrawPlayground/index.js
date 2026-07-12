/*
 * SVG Draw — interactive playground.
 *
 * Ports the real shortcode runtime (shortcodes/svg-draw/static/js/svg-draw.js): measure every
 * drawable element in the inline SVG, set a stroke-dash so it starts hidden, then animate
 * stroke-dashoffset → 0 (staggered) with optional reverse / loop / fill-after. The preset artwork is
 * the exact markup from the shortcode's view.php. Options map 1:1 to the shortcode atts and the
 * Theme-Settings sample updates as you tweak.
 */
import React, {useEffect, useMemo, useRef, useState} from 'react';
import styles from './styles.module.css';

// Preset line-art — verbatim from views/view.php `sc_svg_draw_preset()`.
const PRESETS = {
  signature: {label: 'Signature', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 90" fill="none"><path d="M12 62 C34 20 44 20 40 54 C38 74 60 40 66 34 C58 62 78 60 92 44 C86 58 100 58 108 46 M120 30 C110 60 128 66 132 46 C134 34 122 34 124 52 C126 70 150 56 158 44 C176 22 176 60 168 62 C186 54 196 40 210 46 C200 66 224 62 236 46 C252 26 250 60 244 60 C262 58 276 46 288 40"/></svg>'},
  underline: {label: 'Underline', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 40" fill="none"><path d="M8 24 C60 8 120 8 180 20 C220 28 260 30 292 18 C270 26 240 30 210 28"/></svg>'},
  arrow: {label: 'Arrow', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80" fill="none"><path d="M10 40 H180 M150 14 L184 40 L150 66"/></svg>'},
  check: {label: 'Checkmark', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="42"/><path d="M30 52 L45 68 L72 34"/></svg>'},
  wave: {label: 'Wave', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 40" fill="none"><path d="M4 20 Q24 2 44 20 T84 20 T124 20 T164 20 T204 20 T244 20 T284 20 T316 20"/></svg>'},
  star: {label: 'Star', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><path d="M50 6 L61 38 L96 38 L68 59 L79 92 L50 71 L21 92 L32 59 L4 38 L39 38 Z"/></svg>'},
  heart: {label: 'Heart', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 90" fill="none"><path d="M50 82 C10 54 6 26 26 16 C40 9 50 20 50 30 C50 20 60 9 74 16 C94 26 90 54 50 82 Z"/></svg>'},
  circle: {label: 'Circle', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><path d="M50 8 C74 8 92 28 92 50 C92 74 72 92 50 92 C26 92 8 72 8 50 C8 27 27 9 50 9"/></svg>'},
};
const PRESET_KEYS = Object.keys(PRESETS);
const SEL = 'path, line, polyline, polygon, circle, rect, ellipse';

// light sanitize for the custom-code textarea (the plugin does a hardened strip server-side)
function sanitize(svg) {
  svg = String(svg || '');
  const m = svg.match(/<svg[\s\S]*<\/svg>/i);
  svg = m ? m[0] : '';
  svg = svg.replace(/<\s*script[\s\S]*?<\s*\/\s*script\s*>/gi, '');
  svg = svg.replace(/[\s/]on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, ' ');
  return svg;
}

const DEFAULTS = {
  source: 'preset', preset: 'signature', code: '',
  trigger: 'load', duration: 1.6, stagger: 0.15, direction: 'normal', loop: 'no',
  stroke_width: 2, stroke_color: '#2f74e6', fill_after: 'no', fill_color: '#2f74e6',
  max_width: 320, align: 'center',
};

const phpColor = (hex) => `[ 'predefined' => '', 'custom' => '${hex}' ]`;
function buildPhp(s) {
  const src = s.source === 'code'
    ? `'svg' => [ 'source' => 'code', 'code' => [ 'code' => '…' ] ],`
    : `'svg' => [ 'source' => 'preset', 'preset' => [ 'preset' => '${s.preset}' ] ],`;
  return `'${'sc_svg_draw'}' => [\n    ${src}
    'trigger'      => '${s.trigger}',
    'duration'     => ${s.duration},
    'stagger'      => ${s.stagger},
    'direction'    => '${s.direction}',
    'loop'         => '${s.loop}',
    'stroke_width' => ${s.stroke_width},
    'stroke_color' => ${phpColor(s.stroke_color)},
    'fill_after'   => '${s.fill_after}',
    'fill_color'   => ${phpColor(s.fill_color)},
    'max_width'    => ${s.max_width},
    'align'        => '${s.align}',
],`;
}

export default function SvgDrawPlayground() {
  const [s, setS] = useState(DEFAULTS);
  const [token, setToken] = useState(0); // Replay
  const hostRef = useRef(null);
  const timersRef = useRef([]);
  const set = (k, v) => setS((st) => ({...st, [k]: v}));
  const svgMarkup = s.source === 'code' ? (sanitize(s.code) || PRESETS.signature.svg) : PRESETS[s.preset].svg;

  const clearTimers = () => { timersRef.current.forEach(clearTimeout); timersRef.current = []; };

  // Build + draw. Re-runs on any option that affects geometry/animation, or Replay.
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    host.innerHTML = svgMarkup;
    host.style.setProperty('--draw-stroke', s.stroke_color);
    host.style.setProperty('--draw-width', s.stroke_width + 'px');
    host.style.setProperty('--draw-fill', s.fill_color);

    const svg = host.querySelector('svg');
    if (!svg) return undefined;
    const els = svg.querySelectorAll(SEL), items = [];
    for (let i = 0; i < els.length; i++) {
      const el = els[i];
      let len = 0;
      try { if (typeof el.getTotalLength === 'function') len = el.getTotalLength() || 0; } catch (e) { /* */ }
      if (len <= 0) { try { const b = el.getBBox(); len = (b.width + b.height) * 2.4; } catch (e2) { len = 0; } }
      if (len <= 0) continue;
      el.style.stroke = s.stroke_color;
      el.style.strokeWidth = s.stroke_width + 'px';
      el.style.fill = 'none';
      el.style.strokeDasharray = len;
      el.style.strokeDashoffset = len;
      el.style.strokeLinecap = 'round';
      el.style.strokeLinejoin = 'round';
      items.push({el, len});
    }
    if (!items.length) return undefined;

    const reverse = s.direction === 'reverse';
    const fill = s.fill_after === 'yes';
    const loop = s.loop === 'yes';

    function drawItems() {
      const n = items.length, total = s.duration + (n - 1) * s.stagger;
      for (let i = 0; i < n; i++) {
        const it = items[reverse ? (n - 1 - i) : i];
        it.el.style.transition = 'stroke-dashoffset ' + s.duration + 's ease';
        it.el.style.transitionDelay = (i * s.stagger) + 's';
        it.el.style.strokeDashoffset = '0';
      }
      if (fill) {
        timersRef.current.push(setTimeout(() => {
          for (let k = 0; k < n; k++) { items[k].el.style.transition += ', fill .5s ease'; items[k].el.style.fill = 'var(--draw-fill)'; }
        }, total * 1000));
      }
      return total;
    }
    function resetItems() {
      for (let i = 0; i < items.length; i++) { const el = items[i].el; el.style.transition = 'none'; el.style.strokeDashoffset = items[i].len; el.style.fill = 'none'; }
      void host.offsetWidth;
    }
    function play() {
      const total = drawItems();
      if (loop) {
        timersRef.current.push(setTimeout(() => { resetItems(); timersRef.current.push(setTimeout(play, 400)); }, (total + 0.8) * 1000));
      }
    }

    let hoverHandler = null;
    if (s.trigger === 'hover') {
      hoverHandler = () => { clearTimers(); resetItems(); requestAnimationFrame(play); };
      host.addEventListener('pointerenter', hoverHandler);
      // seed hidden; draw once so it's visible initially too
      requestAnimationFrame(play);
    } else {
      // view + load → play immediately (stage is always in view)
      requestAnimationFrame(play);
    }

    return () => { clearTimers(); if (hoverHandler) host.removeEventListener('pointerenter', hoverHandler); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [svgMarkup, s.trigger, s.duration, s.stagger, s.direction, s.loop, s.fill_after, s.fill_color, s.stroke_color, s.stroke_width, token]);

  // Layout-only options — no redraw.
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    host.style.maxWidth = s.max_width > 0 ? s.max_width + 'px' : '';
  }, [s.max_width]);

  const php = useMemo(() => buildPhp(s), [s]);
  const alignClass = s.align === 'left' ? styles.alignLeft : s.align === 'right' ? styles.alignRight : styles.alignCenter;

  return (
    <div className={styles.playground}>
      <div className={styles.layout}>
        <div className={styles.main}>
          <div className={styles.stage}>
            <div className={`${styles.stageInner} ${alignClass}`}>
              <div ref={hostRef} className={styles.host} aria-hidden="true" />
            </div>
            <button type="button" className={styles.replay} onClick={() => setToken((t) => t + 1)}>↻ Replay</button>
            <div className={styles.hint}>{s.trigger === 'hover' ? 'hover the artwork to redraw' : 'drawn on ' + (s.trigger === 'load' ? 'load' : 'view') + ' · hit Replay'}</div>
          </div>

          <div className={styles.controls}>
            <h5>Draw — options</h5>

            <div className={styles.control}>
              <label>Trigger</label>
              <select className={styles.select} value={s.trigger} onChange={(e) => set('trigger', e.target.value)}>
                <option value="view">When scrolled into view</option>
                <option value="load">On load</option>
                <option value="hover">On hover</option>
              </select>
            </div>
            <div className={styles.control}>
              <label>Draw duration (s) <span>{s.duration}</span></label>
              <input type="range" min="0.3" max="6" step="0.1" value={s.duration} onChange={(e) => set('duration', Number(e.target.value))} />
            </div>
            <div className={styles.control}>
              <label>Stagger (s) <span>{s.stagger}</span></label>
              <input type="range" min="0" max="1" step="0.05" value={s.stagger} onChange={(e) => set('stagger', Number(e.target.value))} />
            </div>
            <div className={styles.control}>
              <label>Direction</label>
              <select className={styles.select} value={s.direction} onChange={(e) => set('direction', e.target.value)}>
                <option value="normal">Normal</option>
                <option value="reverse">Reverse</option>
              </select>
            </div>
            <div className={styles.control}>
              <label>Loop</label>
              <div className={styles.toggle}>
                <button type="button" className={s.loop === 'no' ? styles.on : ''} onClick={() => set('loop', 'no')}>Off</button>
                <button type="button" className={s.loop === 'yes' ? styles.on : ''} onClick={() => set('loop', 'yes')}>On</button>
              </div>
            </div>

            <div className={styles.subhead}>Stroke &amp; fill</div>
            <div className={styles.control}>
              <label>Stroke width (px) <span>{s.stroke_width}</span></label>
              <input type="range" min="1" max="12" step="0.5" value={s.stroke_width} onChange={(e) => set('stroke_width', Number(e.target.value))} />
            </div>
            <div className={styles.control}>
              <label>Stroke color <span>{s.stroke_color}</span></label>
              <input type="color" className={styles.color} value={s.stroke_color} onChange={(e) => set('stroke_color', e.target.value)} />
            </div>
            <div className={styles.control}>
              <label>Fill after drawing</label>
              <div className={styles.toggle}>
                <button type="button" className={s.fill_after === 'no' ? styles.on : ''} onClick={() => set('fill_after', 'no')}>Off</button>
                <button type="button" className={s.fill_after === 'yes' ? styles.on : ''} onClick={() => set('fill_after', 'yes')}>On</button>
              </div>
            </div>
            {s.fill_after === 'yes' && (
              <div className={styles.control}>
                <label>Fill color <span>{s.fill_color}</span></label>
                <input type="color" className={styles.color} value={s.fill_color} onChange={(e) => set('fill_color', e.target.value)} />
              </div>
            )}

            <div className={styles.subhead}>Layout</div>
            <div className={styles.control}>
              <label>Max width (px) <span>{s.max_width || 'auto'}</span></label>
              <input type="range" min="0" max="1200" step="10" value={s.max_width} onChange={(e) => set('max_width', Number(e.target.value))} />
            </div>
            <div className={styles.control}>
              <label>Alignment</label>
              <select className={styles.select} value={s.align} onChange={(e) => set('align', e.target.value)}>
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>

            {s.source === 'code' && (
              <div className={styles.control} style={{gridColumn: '1 / -1'}}>
                <label>SVG code</label>
                <textarea className={styles.textarea} value={s.code} spellCheck={false}
                  placeholder="<svg …>…</svg>" onChange={(e) => set('code', e.target.value)} />
              </div>
            )}
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.sidebarInner}>
            <div className={styles.sidebarTitle}>Source</div>
            <div className={styles.tabGroup}>
              <span className={styles.tabGroupLabel}>Built-in presets</span>
              <div className={styles.tileGrid}>
                {PRESET_KEYS.map((k) => (
                  <button key={k} type="button" title={PRESETS[k].label}
                    className={(s.source === 'preset' && s.preset === k) ? styles.tileActive : styles.tile}
                    onClick={() => setS((st) => ({...st, source: 'preset', preset: k}))}>
                    <span className={styles.tileArt} dangerouslySetInnerHTML={{__html: PRESETS[k].svg}} />
                    <span className={styles.tileLbl}>{PRESETS[k].label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.tabGroup}>
              <span className={styles.tabGroupLabel}>Custom</span>
              <div className={styles.tabPills}>
                <button type="button" className={s.source === 'code' ? styles.tabActive : styles.tab} onClick={() => set('source', 'code')}>Paste SVG code</button>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div className={styles.code}>
        <div>Sample option — updates as you tweak</div>
        <pre><code>{php}</code></pre>
        <p className={styles.note}>
          SVG Draw is a <strong>shortcode / element</strong> — add it in the page builder, pick a
          preset (or paste/upload SVG), and it self-draws on the front end. Outline (stroke) SVGs draw
          cleanest; colors use the theme color-preset picker. It honours reduced motion (shown fully
          drawn).
        </p>
      </div>
    </div>
  );
}
