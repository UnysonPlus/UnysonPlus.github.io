import React, {useEffect, useRef, useState} from 'react';
import styles from './styles.module.css';
import './animate.css';

/**
 * Interactive playground for the Entrance Animation (Animate.css v4.1.1) feature.
 *
 * Entrance Animation is a CORE feature (the shortcodes extension), not an Animation
 * Engine module — every element's Animations tab has it, engine on or off. This
 * ports the real runtime: the element sits `.sc-anim-pending` (hidden) until it
 * enters view, then gets `animate__animated animate__<effect>` (+ speed / infinite /
 * repeat) and the `--animate-*` custom properties — exactly as
 * shortcode-animation-helper.php emits. The (once, on-view) animation is looped here
 * so you can watch it; hit ↻ Replay to run it again.
 */

const GROUPS = [
  ['Attention Seekers', [['animate__bounce', 'Bounce'], ['animate__flash', 'Flash'], ['animate__pulse', 'Pulse'], ['animate__rubberBand', 'Rubber Band'], ['animate__shakeX', 'Shake X'], ['animate__shakeY', 'Shake Y'], ['animate__headShake', 'Head Shake'], ['animate__swing', 'Swing'], ['animate__tada', 'Tada'], ['animate__wobble', 'Wobble'], ['animate__jello', 'Jello'], ['animate__heartBeat', 'Heart Beat']]],
  ['Back Entrances', [['animate__backInDown', 'Back In Down'], ['animate__backInLeft', 'Back In Left'], ['animate__backInRight', 'Back In Right'], ['animate__backInUp', 'Back In Up']]],
  ['Bouncing', [['animate__bounceIn', 'Bounce In'], ['animate__bounceInDown', 'Bounce In Down'], ['animate__bounceInLeft', 'Bounce In Left'], ['animate__bounceInRight', 'Bounce In Right'], ['animate__bounceInUp', 'Bounce In Up']]],
  ['Fading', [['animate__fadeIn', 'Fade In'], ['animate__fadeInDown', 'Fade In Down'], ['animate__fadeInDownBig', 'Fade In Down Big'], ['animate__fadeInLeft', 'Fade In Left'], ['animate__fadeInLeftBig', 'Fade In Left Big'], ['animate__fadeInRight', 'Fade In Right'], ['animate__fadeInRightBig', 'Fade In Right Big'], ['animate__fadeInUp', 'Fade In Up'], ['animate__fadeInUpBig', 'Fade In Up Big'], ['animate__fadeInTopLeft', 'Fade In Top Left'], ['animate__fadeInTopRight', 'Fade In Top Right'], ['animate__fadeInBottomLeft', 'Fade In Bottom Left'], ['animate__fadeInBottomRight', 'Fade In Bottom Right']]],
  ['Flippers', [['animate__flip', 'Flip'], ['animate__flipInX', 'Flip In X'], ['animate__flipInY', 'Flip In Y']]],
  ['Lightspeed', [['animate__lightSpeedInRight', 'Light Speed In Right'], ['animate__lightSpeedInLeft', 'Light Speed In Left']]],
  ['Rotating', [['animate__rotateIn', 'Rotate In'], ['animate__rotateInDownLeft', 'Rotate In Down Left'], ['animate__rotateInDownRight', 'Rotate In Down Right'], ['animate__rotateInUpLeft', 'Rotate In Up Left'], ['animate__rotateInUpRight', 'Rotate In Up Right']]],
  ['Sliding', [['animate__slideInDown', 'Slide In Down'], ['animate__slideInLeft', 'Slide In Left'], ['animate__slideInRight', 'Slide In Right'], ['animate__slideInUp', 'Slide In Up']]],
  ['Zooming', [['animate__zoomIn', 'Zoom In'], ['animate__zoomInDown', 'Zoom In Down'], ['animate__zoomInLeft', 'Zoom In Left'], ['animate__zoomInRight', 'Zoom In Right'], ['animate__zoomInUp', 'Zoom In Up']]],
  ['Specials', [['animate__hinge', 'Hinge'], ['animate__jackInTheBox', 'Jack In The Box'], ['animate__rollIn', 'Roll In']]],
];
const LABELS = Object.fromEntries(GROUPS.flatMap(([, ks]) => ks));
const SPEED_FACTOR = {'': 1, animate__slow: 2, animate__slower: 3, animate__fast: 0.8, animate__faster: 0.5};

const CONTROLS = [
  {id: 'speed_preset', label: 'Speed preset', type: 'select', default: '', choices: [['', 'Default (1s)'], ['animate__slow', 'Slow (2s)'], ['animate__slower', 'Slower (3s)'], ['animate__fast', 'Fast (0.8s)'], ['animate__faster', 'Faster (0.5s)']]},
  {id: 'custom_duration', label: 'Custom duration (s)', type: 'slider', min: 0, max: 4, step: 0.1, default: 0, note: '0 = use preset'},
  {id: 'delay', label: 'Delay (s)', type: 'slider', min: 0, max: 3, step: 0.1, default: 0},
  {id: 'repeat_count', label: 'Repeat count', type: 'slider', min: 1, max: 5, step: 1, default: 1, note: 'ignored when looping'},
  {id: 'loop_forever', label: 'Loop forever', type: 'switch', on: 'yes', off: 'no', default: 'no'},
  {id: 'replay_on_scroll', label: 'Replay on scroll', type: 'switch', on: 'yes', off: 'no', default: 'no'},
  {id: 'easing', label: 'Easing', type: 'select', default: '', choices: [['', 'Default'], ['ease', 'Ease'], ['ease-in', 'Ease In'], ['ease-out', 'Ease Out'], ['ease-in-out', 'Ease In Out'], ['linear', 'Linear'], ['cubic-bezier(0.25, 0.1, 0.25, 1)', 'Smooth'], ['cubic-bezier(0.68, -0.55, 0.27, 1.55)', 'Overshoot']]},
];
const isNum = (id) => (CONTROLS.find((c) => c.id === id) || {}).type === 'slider';
const defaults = () => ({effect: 'animate__fadeInUp', ...Object.fromEntries(CONTROLS.map((c) => [c.id, c.default]))});

/* Loop the once-on-view entrance so it's watchable (mirrors the JS applyAnimation). */
function runEntrance(el, s, base) {
  const loop = s.loop_forever === 'yes';
  const repeat = Math.max(1, Number(s.repeat_count) || 1);
  const dur = Number(s.custom_duration) || 0;
  const delay = Number(s.delay) || 0;
  const cls = ['animate__animated'];
  if (s.speed_preset) cls.push(s.speed_preset);
  cls.push(s.effect);
  if (loop) cls.push('animate__infinite');
  else if (repeat > 1) cls.push('animate__repeat-1');

  const setVars = () => {
    if (dur > 0) el.style.setProperty('--animate-duration', `${dur}s`);
    if (delay > 0) el.style.animationDelay = `${delay}s`;
    if (!loop && repeat > 1) el.style.setProperty('--animate-repeat', repeat);
    if (s.easing) el.style.animationTimingFunction = s.easing;
  };
  const removeAnim = () => Array.from(el.classList).forEach((c) => { if (c.indexOf('animate__') === 0) el.classList.remove(c); });
  const reset = () => { removeAnim(); el.className = `${base} sc-anim-pending`; el.style.cssText = ''; setVars(); };
  const play = () => cls.forEach((c) => el.classList.add(c));

  let cancelled = false;
  const timers = [];
  const effDur = (dur > 0 ? dur : 1) * (SPEED_FACTOR[s.speed_preset] || 1);
  const cycle = () => {
    if (cancelled) return;
    reset();
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (cancelled) return;
      play();
      if (!loop) { const total = (delay + effDur * repeat) * 1000 + 1100; timers.push(setTimeout(cycle, total)); }
    }));
  };
  cycle();
  return () => { cancelled = true; timers.forEach(clearTimeout); };
}

function buildPhp(s) {
  const q = (v) => (isNum(v[0]) ? Number(s[v[0]]) : `'${s[v[0]]}'`);
  const basic = `'group_animation_basic' => [ 'speed_preset' => '${s.speed_preset}' ]`;
  const adv = `'group_animation_advanced' => [ 'delay' => ${Number(s.delay)}, 'custom_duration' => ${Number(s.custom_duration)}, 'repeat_count' => ${Number(s.repeat_count)}, 'loop_forever' => '${s.loop_forever}', 'replay_on_scroll' => '${s.replay_on_scroll}', 'easing' => '${s.easing}' ]`;
  return `'animation' => [
    'effect' => '${s.effect}',
    '${s.effect}' => [
        ${basic},
        ${adv},
    ],
],`;
}

export default function EntrancePlayground() {
  const [s, setS] = useState(defaults);
  const [nonce, setNonce] = useState(0);
  const ref = useRef(null);
  const set = (id, v) => setS((p) => ({...p, [id]: v}));
  const pick = (effect) => { setS((p) => ({...p, effect})); setNonce((n) => n + 1); };

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let cleanup;
    try { cleanup = runEntrance(el, s, styles.card); } catch (e) { /* never break the page */ }
    return () => { if (typeof cleanup === 'function') cleanup(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nonce, JSON.stringify(s)]);

  return (
    <div className={styles.playground}>
      <style>{'.sc-anim-pending{visibility:hidden}.sc-anim-pending.animate__animated{visibility:visible}'}</style>

      <div className={styles.layout}>
        <div className={styles.main}>
          <div className={styles.stage}>
            <button type="button" className={styles.replay} onClick={() => setNonce((n) => n + 1)}>↻ Replay</button>
            <div className={`${styles.card} sc-anim-pending`} ref={ref}>
              <div className={styles.icon}>✦</div>
              <h4>{LABELS[s.effect] || 'Entrance'}</h4>
              <p>Animate.css entrance</p>
            </div>
            <div className={styles.hint}>plays on load — hit ↻ Replay, or tweak the options</div>
          </div>

          <div className={styles.controls}>
            {CONTROLS.map((c) => (
              <div className={styles.control} key={c.id}>
                {c.type === 'slider' && (<><label>{c.label} <span>{s[c.id]}</span></label>
                  <input type="range" min={c.min} max={c.max} step={c.step} value={s[c.id]} onChange={(e) => set(c.id, e.target.value)} /></>)}
                {c.type === 'select' && (<><label>{c.label}</label>
                  <select className={styles.select} value={s[c.id]} onChange={(e) => set(c.id, e.target.value)}>{c.choices.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></>)}
                {c.type === 'switch' && (<><label>{c.label}</label><div className={styles.toggle}>
                  <button type="button" className={s[c.id] === c.off ? styles.on : ''} onClick={() => set(c.id, c.off)}>Off</button>
                  <button type="button" className={s[c.id] === c.on ? styles.on : ''} onClick={() => set(c.id, c.on)}>On</button></div></>)}
                {c.note && <div style={{fontSize: '0.72rem', color: 'var(--ifm-color-emphasis-500)', marginTop: '0.25rem'}}>{c.note}</div>}
              </div>
            ))}
          </div>

          <div className={styles.code}>
            <div>Sample option — updates as you tweak</div>
            <pre><code>{buildPhp(s)}</code></pre>
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.sidebarTitle}>Effect</div>
          {GROUPS.map(([label, ks]) => (
            <div className={styles.tabGroup} key={label}>
              <span className={styles.tabGroupLabel}>{label}</span>
              <div className={styles.tabPills}>
                {ks.map(([k, l]) => (
                  <button key={k} type="button" className={k === s.effect ? styles.tabActive : styles.tab} onClick={() => pick(k)}>{l}</button>
                ))}
              </div>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
