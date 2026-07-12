import React, {useEffect, useMemo, useRef, useState} from 'react';
import styles from './styles.module.css';

/**
 * Interactive playground for the Image Sequence media element.
 *
 * Faithful to the runtime: it PRELOADS a frame set into offscreen canvases, then
 * a scroll fraction picks frame[i] and blits it to a visible <canvas> (honouring
 * fit + background), exactly like the plugin decodes uploaded/URL frames to a
 * canvas and scrubs them. Here the "frames" are procedurally rendered (a rotating
 * 3D subject over 360°) so the demo is self-contained — no hosted image set.
 */

/* ---- tiny flat-shaded polyhedron renderer (painter's algorithm) ------------ */
// Each subject = { v: vertices [x,y,z], f: faces [vertex-index...] }. Unit-ish scale.
const SUBJECTS = {
  cube: {
    label: 'Cube',
    v: [[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]],
    f: [[0,1,2,3],[5,4,7,6],[4,0,3,7],[1,5,6,2],[4,5,1,0],[3,2,6,7]],
  },
  diamond: { // octahedron
    label: 'Diamond',
    v: [[0,-1.35,0],[0,1.35,0],[-1,0,-1],[1,0,-1],[1,0,1],[-1,0,1]],
    f: [[0,3,2],[0,4,3],[0,5,4],[0,2,5],[1,2,3],[1,3,4],[1,4,5],[1,5,2]],
  },
  prism: { // triangular prism
    label: 'Prism',
    v: [[-1,-1,-0.9],[1,-1,-0.9],[0,1,-0.9],[-1,-1,0.9],[1,-1,0.9],[0,1,0.9]],
    f: [[0,1,2],[5,4,3],[0,3,4,1],[1,4,5,2],[2,5,3,0]],
  },
};

const rotY = (p, a) => { const c = Math.cos(a), s = Math.sin(a); return [c*p[0]+s*p[2], p[1], -s*p[0]+c*p[2]]; };
const rotX = (p, a) => { const c = Math.cos(a), s = Math.sin(a); return [p[0], c*p[1]-s*p[2], s*p[1]+c*p[2]]; };
const sub = (a, b) => [a[0]-b[0], a[1]-b[1], a[2]-b[2]];
const cross = (a, b) => [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]];
const norm = (a) => { const l = Math.hypot(a[0],a[1],a[2]) || 1; return [a[0]/l, a[1]/l, a[2]/l]; };

function hexToRgb(h) { const m = /^#?([\da-f]{6})$/i.exec(h || '') ; if (!m) return [80,120,220]; const n = parseInt(m[1],16); return [(n>>16)&255,(n>>8)&255,n&255]; }

/* Render one frame (angle) of a subject to a square offscreen canvas. */
function renderFrame(size, subjectKey, angle, rgb) {
  const cv = (typeof document !== 'undefined') ? document.createElement('canvas') : null;
  if (!cv) return null;
  cv.width = size; cv.height = size;
  const ctx = cv.getContext('2d');
  const S = SUBJECTS[subjectKey] || SUBJECTS.cube;
  const focal = 4.2, scale = size * 0.30, cx = size/2, cy = size/2, tilt = 0.5;
  const light = norm([0.4, -0.7, 0.9]);
  // transform vertices → camera space + projected screen points
  const cam = S.v.map((p) => rotX(rotY(p, angle), tilt));
  const proj = cam.map((p) => { const z = p[2] + 5; const k = focal / z; return [cx + p[0]*scale*k, cy + p[1]*scale*k]; });
  // faces: keep back-face-culled, sort by average camera z (far → near)
  const faces = S.f.map((idx) => {
    const zc = idx.reduce((s,i) => s + cam[i][2], 0) / idx.length;
    const n = norm(cross(sub(cam[idx[1]], cam[idx[0]]), sub(cam[idx[2]], cam[idx[0]])));
    return {idx, zc, n};
  }).filter((fa) => fa.n[2] < 0.02).sort((a,b) => a.zc - b.zc);
  ctx.lineJoin = 'round';
  for (const fa of faces) {
    const lit = Math.max(0, -(fa.n[0]*light[0] + fa.n[1]*light[1] + fa.n[2]*light[2]));
    const sh = 0.28 + 0.72 * lit; // ambient + diffuse
    ctx.beginPath();
    fa.idx.forEach((i, k) => { const p = proj[i]; k ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); });
    ctx.closePath();
    ctx.fillStyle = `rgb(${Math.round(rgb[0]*sh)},${Math.round(rgb[1]*sh)},${Math.round(rgb[2]*sh)})`;
    ctx.fill();
    ctx.strokeStyle = `rgba(255,255,255,${0.10 + 0.14*lit})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  return cv;
}

/* ---- options -------------------------------------------------------------- */
const CTRL = [
  {id: 'frames', label: 'Frames', type: 'slider', min: 12, max: 96, step: 4, default: 48},
  {id: 'mode', label: 'Mode', type: 'select', default: 'pin', choices: [['pin', 'Pin & scrub'], ['inview', 'Scrub while in view']]},
  {id: 'scroll_length', label: 'Scroll length (screens)', type: 'slider', min: 1, max: 5, step: 0.5, default: 2},
  {id: 'direction', label: 'Direction', type: 'select', default: 'forward', choices: [['forward', 'Forward'], ['reverse', 'Reverse']]},
  {id: 'fit', label: 'Fit', type: 'select', default: 'cover', choices: [['cover', 'Cover (fill, crop)'], ['contain', 'Contain (letterbox)']]},
  {id: 'background', label: 'Background', type: 'color', default: '#0e1524'},
];
const DEFAULTS = Object.fromEntries(CTRL.map((c) => [c.id, c.default]));
const FRAME_SIZE = 460;

function buildPhp(subjectKey, o) {
  return `// Builder → Media Elements → Image Sequence
'frames_from'  => 'urls',                 // 'uploads' | 'urls'
'url_pattern'  => 'https://site.com/${subjectKey}/frame_%d.jpg',
'frame_count'  => ${o.frames},
'start_number' => 1,
'zero_pad'     => 4,
'mode'         => '${o.mode}',            // pin & scrub | scrub while in view
'scroll_length'=> ${o.scroll_length},                 // screens (pinned)
'direction'    => '${o.direction}',
'fit'          => '${o.fit}',
'background'   => [ 'predefined' => '', 'custom' => '${o.background}' ],`;
}

export default function ImageSequencePlayground() {
  const [subject, setSubject] = useState('cube');
  const [o, setO] = useState(() => ({...DEFAULTS}));
  const [pos, setPos] = useState(0);          // 0..100 scrub
  const [playing, setPlaying] = useState(false);
  const canvasRef = useRef(null);
  const framesRef = useRef([]);
  const posRef = useRef(0);
  const set = (id, v) => setO((p) => ({...p, [id]: v}));

  const rgb = useMemo(() => hexToRgb('#5b8cff'), []);

  // Preload the frame set whenever the subject or frame count changes.
  useEffect(() => {
    const n = Number(o.frames);
    const arr = new Array(n);
    for (let i = 0; i < n; i++) arr[i] = renderFrame(FRAME_SIZE, subject, (i / n) * Math.PI * 2, rgb);
    framesRef.current = arr;
    draw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subject, o.frames]);

  // Blit the current frame to the visible canvas (honouring fit + background).
  function draw() {
    const cv = canvasRef.current, frames = framesRef.current;
    if (!cv || !frames.length) return;
    const ctx = cv.getContext('2d');
    const dpr = (typeof window !== 'undefined' ? window.devicePixelRatio : 1) || 1;
    const w = cv.clientWidth, h = cv.clientHeight;
    if (cv.width !== Math.round(w*dpr) || cv.height !== Math.round(h*dpr)) { cv.width = Math.round(w*dpr); cv.height = Math.round(h*dpr); }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = o.background; ctx.fillRect(0, 0, w, h);
    let p = posRef.current;                    // 0..1 progress
    if (o.direction === 'reverse') p = 1 - p;
    const idx = Math.max(0, Math.min(frames.length - 1, Math.round(p * (frames.length - 1))));
    const img = frames[idx]; if (!img) return;
    const s = FRAME_SIZE;
    const scale = o.fit === 'cover' ? Math.max(w/s, h/s) : Math.min(w/s, h/s);
    const dw = s*scale, dh = s*scale;
    ctx.drawImage(img, (w-dw)/2, (h-dh)/2, dw, dh);
  }

  useEffect(() => { draw(); /* redraw on style change */ // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [o.fit, o.background, o.direction, pos]);

  useEffect(() => {
    const onResize = () => draw();
    if (typeof window !== 'undefined') window.addEventListener('resize', onResize);
    return () => { if (typeof window !== 'undefined') window.removeEventListener('resize', onResize); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-play ramp — scroll_length scales the duration (higher = slower scrub).
  useEffect(() => {
    if (!playing) return undefined;
    let raf = 0, last = 0, cancelled = false;
    const durMs = 2200 * Number(o.scroll_length);
    const tick = (t) => {
      if (cancelled) return;
      if (!last) last = t;
      let np = posRef.current + (t - last) / durMs; last = t;
      if (np >= 1) { np = 1; setPlaying(false); }
      posRef.current = np; setPos(Math.round(np * 100)); draw();
      if (np < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelled = true; cancelAnimationFrame(raf); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, o.scroll_length]);

  const onScrub = (v) => { setPlaying(false); posRef.current = v / 100; setPos(v); draw(); };
  const togglePlay = () => { if (posRef.current >= 1) { posRef.current = 0; setPos(0); } setPlaying((p) => !p); };

  const frameCount = Number(o.frames);
  const curFrame = Math.max(0, Math.min(frameCount - 1, Math.round((o.direction === 'reverse' ? 1 - pos/100 : pos/100) * (frameCount - 1))));

  return (
    <div className={styles.playground}>
      <div className={styles.layout}>
        <div className={styles.main}>
          <div className={styles.stage} style={{background: o.background}}>
            <canvas ref={canvasRef} className={styles.canvas} />
            <div className={styles.badge}>frame {curFrame + 1} / {frameCount} · {Math.round(pos)}%</div>
            <input type="range" className={styles.vscroll} min={0} max={100} step={1}
              value={pos} onChange={(e) => onScrub(Number(e.target.value))} aria-label="Scroll position" />
            <button type="button" className={styles.play} onClick={togglePlay}>{playing ? '❚❚ Pause' : '▶ Play'}</button>
            <div className={styles.hint}>{o.mode === 'pin' ? 'pinned full-screen · drag the scroll to scrub' : 'scrubs while in view · drag the scroll'}</div>
          </div>

          <div className={styles.controls}>
            <h5>Image Sequence — options</h5>
            {CTRL.map((c) => (
              <div className={styles.control} key={c.id}>
                {c.type === 'slider' && (<><label>{c.label} <span>{o[c.id]}</span></label>
                  <input type="range" min={c.min} max={c.max} step={c.step} value={o[c.id]} onChange={(e) => set(c.id, Number(e.target.value))} /></>)}
                {c.type === 'select' && (<><label>{c.label}</label>
                  <select className={styles.select} value={o[c.id]} onChange={(e) => set(c.id, e.target.value)}>{c.choices.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></>)}
                {c.type === 'color' && (<><label>{c.label} <span>{o[c.id]}</span></label>
                  <input type="color" className={styles.color} value={o[c.id]} onChange={(e) => set(c.id, e.target.value)} /></>)}
              </div>
            ))}
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.sidebarInner}>
            <div className={styles.sidebarTitle}>Subject</div>
            <div className={styles.tabPills}>
              {Object.entries(SUBJECTS).map(([k, s]) => (
                <button key={k} type="button" className={k === subject ? styles.tabActive : styles.tab} onClick={() => setSubject(k)}>{s.label}</button>
              ))}
            </div>
            <p className={styles.aside}>The frames here are procedurally rendered so the demo needs no
              hosted images — but the mechanic is the real one: a <strong>preloaded frame set</strong>
              blitted to a <code>&lt;canvas&gt;</code>, scrubbed by the scroll fraction.</p>
          </div>
        </aside>
      </div>

      <div className={styles.code}>
        <div>Sample options — update as you tweak</div>
        <pre><code>{buildPhp(subject, o)}</code></pre>
        <p className={styles.note}>On a real site, point <strong>Frames from</strong> at uploaded
          frames or a numbered <code>%d</code> URL pattern. The <strong>background</strong> uses the
          theme <strong>color-preset picker</strong> (stored <code>{`[ 'predefined' => '', 'custom' => '#hex' ]`}</code>).</p>
      </div>
    </div>
  );
}
