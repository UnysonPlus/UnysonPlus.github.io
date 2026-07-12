/*
 * Motion Path — interactive playground.
 *
 * Ports the real Animation Engine Motion Path runtime (modules/motion-path/static/js/motion-path.js):
 * each shape is an SVG `d` in a normalized 0..100 box; we host it in a hidden <svg>, sample it with
 * getPointAtLength, and translate a demo badge RELATIVE to the path's start point — exactly as the
 * plugin does. The path is drawn faintly so you can see the shape the badge travels.
 *
 * Drive modes are reproduced faithfully: Scroll (scrubbed) is driven by a "Scroll position" slider
 * (the plugin ties it to the scrollbar), Loop travels forever over Duration seconds, On-view plays
 * once (eased) on a Replay press. Reverse + Align-to-path + Start offset + Path size all match.
 */
import React, {useEffect, useMemo, useRef, useState} from 'react';
import styles from './styles.module.css';

// --- Preset path library — verbatim from includes/motion-path-helpers.php (0..100 box). ---
const PRESETS = {
  wave:        {label: 'Wave',        d: 'M0,50 C15,8 35,8 50,50 S85,92 100,50'},
  arc:         {label: 'Arc',         d: 'M0,85 Q50,-10 100,85'},
  loop:        {label: 'Loop',        d: 'M2,62 C22,62 30,14 50,14 C70,14 72,60 52,60 C34,60 40,90 62,90 C82,90 98,62 98,62'},
  s_curve:     {label: 'S-Curve',     d: 'M22,2 C82,26 18,74 78,98'},
  zigzag:      {label: 'Zigzag',      d: 'M0,20 L25,80 L50,20 L75,80 L100,20'},
  spiral:      {label: 'Spiral',      d: 'M92,50 A42,42 0 1,1 50,8 A34,34 0 1,1 84,50 A26,26 0 1,1 50,24 A18,18 0 1,1 68,50 A10,10 0 1,1 50,40'},
  circle:      {label: 'Circle',      d: 'M50,5 A45,45 0 1,1 49.9,5'},
  incline:     {label: 'Incline',     d: 'M0,95 C30,92 40,55 60,45 C78,36 88,14 100,5'},
  figure8:     {label: 'Figure 8',    d: 'M50,50 C68,28 92,28 92,50 C92,72 68,72 50,50 C32,28 8,28 8,50 C8,72 32,72 50,50 Z'},
  double_loop: {label: 'Double Loop', d: 'M6,62 C6,32 28,32 28,52 C28,68 14,68 18,52 C22,30 48,28 56,50 C61,68 80,68 80,50 C80,34 68,34 68,48'},
  knot:        {label: 'Knot',        d: 'M50,14 C24,14 24,50 50,50 C76,50 76,86 50,86 C24,86 24,50 50,50 C76,50 76,14 50,14'},
  triangle:    {label: 'Triangle',    d: 'M50,8 L92,86 L8,86 Z'},
  square:      {label: 'Square',      d: 'M14,14 H86 V86 H14 Z'},
  diamond:     {label: 'Diamond',     d: 'M50,6 L94,50 L50,94 L6,50 Z'},
  pentagon:    {label: 'Pentagon',    d: 'M50,8 L91,38 L75,88 L25,88 L9,38 Z'},
  hexagon:     {label: 'Hexagon',     d: 'M50,6 L88,28 L88,72 L50,94 L12,72 L12,28 Z'},
  octagon:     {label: 'Octagon',     d: 'M32,8 H68 L92,32 V68 L68,92 H32 L8,68 V32 Z'},
  star:        {label: 'Star',        d: 'M50,6 L61,39 L96,39 L68,60 L79,94 L50,73 L21,94 L32,60 L4,39 L39,39 Z'},
  stairs:      {label: 'Stairs',      d: 'M6,92 H30 V68 H54 V44 H78 V20 H96'},
  steps_down:  {label: 'Steps Down',  d: 'M6,12 H30 V36 H54 V60 H78 V84 H96'},
  l_corner:    {label: 'L-Corner',    d: 'M12,10 V88 H92'},
  chevron:     {label: 'Chevron',     d: 'M8,80 L50,20 L92,80'},
  lightning:   {label: 'Lightning',   d: 'M62,6 L30,46 L52,50 L40,94'},
  u_turn:      {label: 'U-Turn',      d: 'M22,10 V64 A28,28 0 0 0 78,64 V10'},
  bounce:      {label: 'Bounce',      d: 'M4,90 Q16,18 28,90 Q37,44 46,90 Q53,60 60,90 Q65,74 70,90 T96,90'},
  pendulum:    {label: 'Pendulum',    d: 'M16,24 Q50,96 84,24'},
  helix:       {label: 'Helix',       d: 'M6,50 C14,24 24,24 30,50 C36,76 46,76 52,50 C58,24 68,24 74,50 C80,76 90,76 94,50'},
  corkscrew:   {label: 'Corkscrew',   d: 'M4,50 C9,26 17,26 22,50 C27,74 35,74 40,50 C45,26 53,26 58,50 C63,74 71,74 76,50 C81,26 89,26 94,50'},
  swoosh:      {label: 'Swoosh',      d: 'M8,52 L38,82 L94,14'},
  comet:       {label: 'Comet',       d: 'M8,8 C30,12 46,40 50,60 C54,80 70,86 94,86'},
  ricochet:    {label: 'Ricochet',    d: 'M6,72 L38,14 L58,72 L84,20 L94,80'},
  heart:       {label: 'Heart',       d: 'M50,86 C12,58 10,28 31,20 C43,15 50,26 50,33 C50,26 57,15 69,20 C90,28 88,58 50,86 Z'},
  teardrop:    {label: 'Teardrop',    d: 'M50,6 C50,6 82,44 82,62 A32,32 0 1 1 18,62 C18,44 50,6 50,6 Z'},
  petal:       {label: 'Petal',       d: 'M50,90 C22,62 30,22 50,10 C70,22 78,62 50,90 Z'},
  ribbon:      {label: 'Ribbon',      d: 'M2,42 C14,22 26,58 40,44 C54,30 66,66 80,48 C88,38 94,46 98,50'},
  line:        {label: 'Line',        d: 'M6,50 H94'},
  drift:       {label: 'Drift',       d: 'M6,54 Q50,38 94,50'},
};

const GROUPS = [
  ['Curves & organic', ['wave', 'arc', 'loop', 's_curve', 'zigzag', 'spiral', 'circle', 'incline']],
  ['Loops & knots', ['figure8', 'double_loop', 'knot']],
  ['Geometric', ['triangle', 'square', 'diamond', 'pentagon', 'hexagon', 'octagon', 'star']],
  ['Angular / mechanical', ['stairs', 'steps_down', 'l_corner', 'chevron', 'lightning', 'u_turn']],
  ['Organic / physics', ['bounce', 'pendulum', 'helix', 'corkscrew', 'swoosh', 'comet', 'ricochet']],
  ['Decorative', ['heart', 'teardrop', 'petal', 'ribbon']],
  ['Straight', ['line', 'drift']],
];

// Easing — verbatim from the runtime.
const EASE = {
  'linear': (p) => p,
  'ease-in': (p) => p * p,
  'ease-out': (p) => 1 - (1 - p) * (1 - p),
  'ease-in-out': (p) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2),
};

const DEFAULTS = {
  drive: 'loop',        // playground default = loop so it moves immediately
  duration: 4,
  path_size: 300,
  start_offset: 0,
  direction: 'no',
  align: 'no',
  easing: 'ease-in-out',
  custom_d: 'M0,50 C25,0 75,100 100,50',
};

const phpScalar = (v) => (typeof v === 'number' ? String(v) : `'${v}'`);

function buildPhp(shape, o) {
  const inner = shape === 'custom'
    ? {custom_d: o.custom_d, drive: o.drive, duration: o.duration, path_size: o.path_size, start_offset: o.start_offset, direction: o.direction, align: o.align, easing: o.easing}
    : {drive: o.drive, duration: o.duration, path_size: o.path_size, start_offset: o.start_offset, direction: o.direction, align: o.align, easing: o.easing};
  const lines = Object.entries(inner).map(([k, v]) => `            '${k}' => ${phpScalar(v)},`).join('\n');
  return `'motion_path' => [
    'mode'  => '${shape}',
    '${shape}' => [
${lines}
    ],
],`;
}

export default function MotionPathPlayground() {
  const [shape, setShape] = useState('wave');
  const [o, setO] = useState(DEFAULTS);
  const [scrub, setScrub] = useState(35);   // scroll-position % for the scrub driver
  const [geo, setGeo] = useState({d: '', left: 0, top: 0, size: 300, ok: true});

  const pathRef = useRef(null);
  const chipRef = useRef(null);
  const itemRef = useRef(null);
  const rafRef = useRef(0);
  const t0Ref = useRef(0);
  const scrubRef = useRef(35);
  const playViewRef = useRef(false); // for on-view: whether the one-shot is running

  const d = shape === 'custom' ? o.custom_d : (PRESETS[shape] ? PRESETS[shape].d : '');
  const set = (k, v) => setO((s) => ({...s, [k]: v}));

  // --- measure the path + place the badge at its start point (mirrors build()) ---
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    path.setAttribute('d', d || 'M0,0');
    let total = 0;
    try { total = path.getTotalLength(); } catch (e) { total = 0; }
    if (!total || !isFinite(total)) {
      itemRef.current = null;
      setGeo((g) => ({...g, ok: false}));
      if (chipRef.current) chipRef.current.style.transform = 'none';
      return;
    }
    const size = Math.max(40, Math.min(1200, Number(o.path_size) || 300));
    const scale = size / 100;
    const dir = o.direction === 'yes' ? -1 : 1;
    const align = o.align === 'yes';
    const startLen = (Math.max(0, Math.min(100, Number(o.start_offset) || 0)) / 100) * total;
    const ptAt = (len) => {
      len = ((len % total) + total) % total;
      return path.getPointAtLength(len);
    };
    const base = ptAt(startLen);
    itemRef.current = {total, scale, dir, align, startLen, base, ptAt,
      ease: EASE[o.easing] || EASE['ease-in-out'], dur: Math.max(0.5, Number(o.duration) || 4) * 1000};
    // Position the drawn path so its start point sits at the stage centre (= badge origin).
    setGeo({d, left: -base.x * scale, top: -base.y * scale, size, ok: true});
    apply(currentProgress());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [d, o.path_size, o.start_offset, o.direction, o.align, o.easing, o.duration]);

  // Place the badge at path-progress p (0..1) — verbatim from the runtime's apply().
  function apply(p) {
    const it = itemRef.current, el = chipRef.current;
    if (!it || !el) return;
    const travel = it.dir * (p * it.total);
    const cur = it.ptAt(it.startLen + travel);
    const dx = (cur.x - it.base.x) * it.scale;
    const dy = (cur.y - it.base.y) * it.scale;
    let t = `translate(${dx.toFixed(2)}px,${dy.toFixed(2)}px)`;
    if (it.align) {
      const step = Math.max(1, it.total * 0.01);
      const ahead = it.ptAt(it.startLen + travel + it.dir * step);
      const ang = Math.atan2(ahead.y - cur.y, ahead.x - cur.x) * 180 / Math.PI;
      t += ` rotate(${ang.toFixed(1)}deg)`;
    }
    el.style.transform = t;
  }

  const currentProgress = () => (o.drive === 'scrub' ? scrubRef.current / 100 : 0);

  // --- drive loop: loop = forever; view = one eased pass on Replay; scrub = slider ---
  useEffect(() => {
    scrubRef.current = scrub;
    cancelAnimationFrame(rafRef.current);
    if (o.drive === 'scrub') { apply(scrub / 100); return undefined; }

    const it = () => itemRef.current;
    t0Ref.current = 0;
    playViewRef.current = o.drive === 'loop'; // loop always runs; view waits for Replay
    const tick = (now) => {
      if (!t0Ref.current) t0Ref.current = now;
      const cur = it();
      if (cur) {
        if (o.drive === 'loop') {
          apply(((now - t0Ref.current) / cur.dur) % 1);
        } else if (o.drive === 'view' && playViewRef.current) {
          let e = (now - t0Ref.current) / cur.dur;
          if (e >= 1) { e = 1; playViewRef.current = false; }
          apply(cur.ease(e));
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [o.drive, o.duration, o.easing, o.direction, shape]);

  const onScrub = (v) => { setScrub(v); scrubRef.current = v; if (o.drive === 'scrub') apply(v / 100); };
  const replayView = () => { t0Ref.current = 0; playViewRef.current = true; };

  const php = useMemo(() => buildPhp(shape, o), [shape, o]);
  const isCustom = shape === 'custom';

  return (
    <div className={styles.playground}>
      {/* hidden measuring host — the runtime samples getPointAtLength off this path */}
      <svg width="0" height="0" aria-hidden="true" style={{position: 'absolute', width: 0, height: 0, overflow: 'hidden'}}>
        <path ref={pathRef} d="M0,0" />
      </svg>

      <div className={styles.layout}>
        <div className={styles.main}>
          <div className={styles.stage}>
            {/* the drawn path, aligned so its start point = badge origin (stage centre) */}
            {geo.ok && geo.d && (
              <svg className={styles.pathSvg} viewBox="0 0 100 100" preserveAspectRatio="none"
                style={{left: `calc(50% + ${geo.left}px)`, top: `calc(50% + ${geo.top}px)`, width: geo.size, height: geo.size}}>
                <path d={geo.d} className={styles.pathLine} />
              </svg>
            )}
            <div ref={chipRef} className={styles.badge}>🚀</div>
            {!geo.ok && <div className={styles.err}>Invalid SVG path — check the <code>d</code> value.</div>}
            <div className={styles.hint}>
              {o.drive === 'scrub' ? 'drag Scroll position →' : o.drive === 'view' ? 'hit Replay →' : 'looping — pick a shape on the right'}
            </div>
          </div>

          {/* driver row: scrub slider / loop status / view replay */}
          <div className={styles.demoBar}>
            {o.drive === 'scrub' && (
              <>
                <span className={styles.lbl}>Scroll position</span>
                <input type="range" min="0" max="100" step="1" value={scrub} onChange={(e) => onScrub(Number(e.target.value))} />
                <span className={styles.pct}>{scrub}%</span>
              </>
            )}
            {o.drive === 'loop' && <span className={styles.lbl}>▶ Looping every {o.duration}s — travels the path forever.</span>}
            {o.drive === 'view' && (
              <>
                <span className={styles.lbl}>Plays once when the element scrolls into view.</span>
                <button type="button" className={styles.replay} onClick={replayView}>↻ Replay</button>
              </>
            )}
          </div>

          <div className={styles.controls}>
            <h5>{isCustom ? 'Custom path' : PRESETS[shape].label} — options</h5>

            <div className={styles.control}>
              <label>Drive</label>
              <select className={styles.select} value={o.drive} onChange={(e) => set('drive', e.target.value)}>
                <option value="scrub">Scroll (scrubbed)</option>
                <option value="loop">Loop (forever)</option>
                <option value="view">On view (once)</option>
              </select>
            </div>

            <div className={styles.control}>
              <label>Path size (px) <span>{o.path_size}</span></label>
              <input type="range" min="40" max="1200" step="10" value={o.path_size} onChange={(e) => set('path_size', Number(e.target.value))} />
            </div>

            <div className={styles.control}>
              <label>Start offset (%) <span>{o.start_offset}</span></label>
              <input type="range" min="0" max="100" step="1" value={o.start_offset} onChange={(e) => set('start_offset', Number(e.target.value))} />
            </div>

            {o.drive !== 'scrub' && (
              <div className={styles.control}>
                <label>Duration (s) <span>{o.duration}</span></label>
                <input type="range" min="0.5" max="20" step="0.5" value={o.duration} onChange={(e) => set('duration', Number(e.target.value))} />
              </div>
            )}

            {o.drive !== 'scrub' && (
              <div className={styles.control}>
                <label>Easing</label>
                <select className={styles.select} value={o.easing} onChange={(e) => set('easing', e.target.value)}>
                  <option value="linear">Linear</option>
                  <option value="ease-in">Ease In</option>
                  <option value="ease-out">Ease Out</option>
                  <option value="ease-in-out">Ease In Out</option>
                </select>
              </div>
            )}

            <div className={styles.control}>
              <label>Reverse</label>
              <div className={styles.toggle}>
                <button type="button" className={o.direction === 'no' ? styles.on : ''} onClick={() => set('direction', 'no')}>Forward</button>
                <button type="button" className={o.direction === 'yes' ? styles.on : ''} onClick={() => set('direction', 'yes')}>Reverse</button>
              </div>
            </div>

            <div className={styles.control}>
              <label>Align to path</label>
              <div className={styles.toggle}>
                <button type="button" className={o.align === 'no' ? styles.on : ''} onClick={() => set('align', 'no')}>Off</button>
                <button type="button" className={o.align === 'yes' ? styles.on : ''} onClick={() => set('align', 'yes')}>On</button>
              </div>
            </div>

            {isCustom && (
              <div className={styles.control} style={{gridColumn: '1 / -1'}}>
                <label>SVG path data (d) — 0–100 box</label>
                <textarea className={styles.textarea} value={o.custom_d} spellCheck={false}
                  onChange={(e) => set('custom_d', e.target.value)} />
              </div>
            )}
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.sidebarInner}>
            <div className={styles.sidebarTitle}>Shape</div>
            {GROUPS.map(([label, keys]) => (
              <div className={styles.tabGroup} key={label}>
                <span className={styles.tabGroupLabel}>{label}</span>
                <div className={styles.tileGrid}>
                  {keys.map((k) => (
                    <button key={k} type="button" title={PRESETS[k].label}
                      className={k === shape ? styles.tileActive : styles.tile} onClick={() => setShape(k)}>
                      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet"><path d={PRESETS[k].d} /></svg>
                      <span>{PRESETS[k].label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <div className={styles.tabGroup}>
              <span className={styles.tabGroupLabel}>Custom</span>
              <div className={styles.tileGrid}>
                <button type="button" title="Custom path"
                  className={shape === 'custom' ? styles.tileActive : styles.tile} onClick={() => setShape('custom')}>
                  <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet"><path d={o.custom_d || 'M0,50 L100,50'} /></svg>
                  <span>Custom</span>
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div className={styles.code}>
        <div>Sample option — updates as you tweak</div>
        <pre><code>{php}</code></pre>
        <p className={styles.note}>
          Motion Path is a <strong>per-element</strong> control on the <strong>Animations</strong> tab.
          Each shape is an SVG path in a 0–100 box; the element travels it relative to its own layout
          position. Here the badge shows the path drawn faintly — on a real page only the element moves.
        </p>
      </div>
    </div>
  );
}
