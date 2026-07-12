/*
 * Model Viewer — interactive playground.
 *
 * Wraps Google's <model-viewer> web component exactly as the shortcode does — the runtime is the
 * element itself (render loop, camera, IBL lighting, poster, off-screen pause). @google/model-viewer
 * is dynamic-imported so it (and its bundled three) only load on this route. Every option maps to a
 * <model-viewer> attribute, applied imperatively so toggling one never reloads the model. Uses a
 * bundled sample model (soda cans) so it works offline.
 */
import React, {useEffect, useMemo, useRef, useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const ORBIT = {three_quarter: '-30deg 78deg auto', front: '0deg 90deg auto', side: '-90deg 85deg auto', top: '0deg 20deg auto'};
const FOV = {narrow: '20deg', normal: '30deg', wide: '45deg'};
const ANGLES = [['three_quarter', 'Three-quarter'], ['front', 'Front'], ['side', 'Side'], ['top', 'Top-down']];
const FOVS = [['auto', 'Auto'], ['narrow', 'Narrow'], ['normal', 'Normal'], ['wide', 'Wide']];
const ENVS = [['neutral', 'Neutral'], ['legacy', 'Legacy'], ['none', 'Default rig']];
const TONES = [['auto', 'Auto'], ['neutral', 'Neutral'], ['commerce', 'Commerce'], ['aces', 'ACES'], ['agx', 'AgX']];

const DEFAULTS = {
  camera_controls: 'yes', auto_rotate: 'yes', rotation_speed: 30, camera_orbit: 'three_quarter',
  field_of_view: 'auto', disable_zoom: 'no', disable_pan: 'yes',
  environment: 'neutral', tone_mapping: 'auto', exposure: 1, shadow_intensity: 0.6, shadow_softness: 1,
};

function buildPhp(o) {
  return `'model_viewer' => [
    'model_url'       => 'https://…/soda_cans.glb',
    'camera_controls' => '${o.camera_controls}',
    'auto_rotate'     => '${o.auto_rotate}',
    'rotation_speed'  => ${o.rotation_speed},
    'camera_orbit'    => '${o.camera_orbit}',
    'field_of_view'   => '${o.field_of_view}',
    'disable_zoom'    => '${o.disable_zoom}',
    'disable_pan'     => '${o.disable_pan}',
    'environment'     => '${o.environment}',
    'tone_mapping'    => '${o.tone_mapping}',
    'exposure'        => ${o.exposure},
    'shadow_intensity'=> ${o.shadow_intensity},
    'shadow_softness' => ${o.shadow_softness},
],`;
}

export default function ModelViewerPlayground() {
  const src = useBaseUrl('/models/soda_cans.glb');
  const [o, setO] = useState(DEFAULTS);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const mvRef = useRef(null);
  const set = (k, v) => setO((s) => ({...s, [k]: v}));

  // register the custom element (client-only)
  useEffect(() => {
    let alive = true;
    import('@google/model-viewer').then(() => { if (alive) setReady(true); }).catch(() => {});
    return () => { alive = false; };
  }, []);

  // load-progress bar
  useEffect(() => {
    const mv = mvRef.current;
    if (!mv) return undefined;
    const onProg = (e) => { const p = (e.detail && typeof e.detail.totalProgress === 'number') ? e.detail.totalProgress : 1; setProgress(p); };
    mv.addEventListener('progress', onProg);
    return () => mv.removeEventListener('progress', onProg);
  }, [ready]);

  // apply every option as a <model-viewer> attribute (imperative → no model reload)
  useEffect(() => {
    const mv = mvRef.current;
    if (!mv) return;
    const setA = (k, v) => { if (v === false || v == null || v === undefined) mv.removeAttribute(k); else mv.setAttribute(k, v === true ? '' : String(v)); };
    setA('camera-controls', o.camera_controls === 'yes');
    setA('touch-action', o.camera_controls === 'yes' ? 'pan-y' : false);
    setA('disable-zoom', o.disable_zoom === 'yes');
    setA('disable-pan', o.disable_pan === 'yes');
    if (o.auto_rotate === 'yes') { setA('auto-rotate', true); setA('rotation-per-second', o.rotation_speed + 'deg'); setA('auto-rotate-delay', 3000); }
    else { setA('auto-rotate', false); }
    setA('camera-orbit', ORBIT[o.camera_orbit]);
    setA('field-of-view', FOV[o.field_of_view] || false);
    setA('environment-image', o.environment === 'none' ? false : o.environment);
    setA('tone-mapping', ['neutral', 'commerce', 'aces', 'agx'].includes(o.tone_mapping) ? o.tone_mapping : false);
    setA('exposure', o.exposure);
    setA('shadow-intensity', o.shadow_intensity);
    setA('shadow-softness', o.shadow_softness);
  }, [o, ready]);

  const php = useMemo(() => buildPhp(o), [o]);
  const loaded = progress >= 1;

  return (
    <div className={styles.playground}>
      <div className={styles.layout}>
        <div className={styles.main}>
          <div className={styles.stage}>
            {React.createElement('model-viewer', {
              ref: mvRef, src, alt: 'Soda cans 3D model', loading: 'eager', reveal: 'auto',
              'interaction-prompt': 'auto', class: styles.mv, style: {width: '100%', height: '100%'},
            })}
            <div className={`${styles.bar} ${loaded ? styles.barDone : ''}`}><i style={{width: Math.round(progress * 100) + '%'}} /></div>
            <div className={styles.hint}>drag to orbit{o.disable_zoom === 'no' ? ' · scroll to zoom' : ''} · sample model: “Soda Cans”</div>
          </div>

          <div className={styles.controls}>
            <h5>Model — options</h5>
            <div className={styles.control}>
              <label>Orbit / drag</label>
              <div className={styles.toggle}>
                <button type="button" className={o.camera_controls === 'no' ? styles.on : ''} onClick={() => set('camera_controls', 'no')}>Off</button>
                <button type="button" className={o.camera_controls === 'yes' ? styles.on : ''} onClick={() => set('camera_controls', 'yes')}>On</button>
              </div>
            </div>
            <div className={styles.control}>
              <label>Auto-rotate</label>
              <div className={styles.toggle}>
                <button type="button" className={o.auto_rotate === 'no' ? styles.on : ''} onClick={() => set('auto_rotate', 'no')}>Off</button>
                <button type="button" className={o.auto_rotate === 'yes' ? styles.on : ''} onClick={() => set('auto_rotate', 'yes')}>On</button>
              </div>
            </div>
            {o.auto_rotate === 'yes' && (
              <div className={styles.control}>
                <label>Rotate speed (°/s) <span>{o.rotation_speed}</span></label>
                <input type="range" min="5" max="120" step="5" value={o.rotation_speed} onChange={(e) => set('rotation_speed', Number(e.target.value))} />
              </div>
            )}
            <div className={styles.control}>
              <label>Disable zoom</label>
              <div className={styles.toggle}>
                <button type="button" className={o.disable_zoom === 'no' ? styles.on : ''} onClick={() => set('disable_zoom', 'no')}>Off</button>
                <button type="button" className={o.disable_zoom === 'yes' ? styles.on : ''} onClick={() => set('disable_zoom', 'yes')}>On</button>
              </div>
            </div>

            <div className={styles.subhead}>Lighting</div>
            <div className={styles.control}>
              <label>Environment</label>
              <select className={styles.select} value={o.environment} onChange={(e) => set('environment', e.target.value)}>
                {ENVS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
            <div className={styles.control}>
              <label>Tone mapping</label>
              <select className={styles.select} value={o.tone_mapping} onChange={(e) => set('tone_mapping', e.target.value)}>
                {TONES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
            <div className={styles.control}>
              <label>Exposure <span>{o.exposure}</span></label>
              <input type="range" min="0" max="2" step="0.05" value={o.exposure} onChange={(e) => set('exposure', Number(e.target.value))} />
            </div>
            <div className={styles.control}>
              <label>Shadow intensity <span>{o.shadow_intensity}</span></label>
              <input type="range" min="0" max="1" step="0.05" value={o.shadow_intensity} onChange={(e) => set('shadow_intensity', Number(e.target.value))} />
            </div>
            <div className={styles.control}>
              <label>Shadow softness <span>{o.shadow_softness}</span></label>
              <input type="range" min="0" max="1" step="0.05" value={o.shadow_softness} onChange={(e) => set('shadow_softness', Number(e.target.value))} />
            </div>
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.sidebarInner}>
            <div className={styles.sidebarTitle}>View</div>
            <div className={styles.tabGroup}>
              <span className={styles.tabGroupLabel}>Starting angle</span>
              <div className={styles.tabPills}>
                {ANGLES.map(([k, l]) => (
                  <button key={k} type="button" className={k === o.camera_orbit ? styles.tabActive : styles.tab} onClick={() => set('camera_orbit', k)}>{l}</button>
                ))}
              </div>
            </div>
            <div className={styles.tabGroup}>
              <span className={styles.tabGroupLabel}>Field of view</span>
              <div className={styles.tabPills}>
                {FOVS.map(([k, l]) => (
                  <button key={k} type="button" className={k === o.field_of_view ? styles.tabActive : styles.tab} onClick={() => set('field_of_view', k)}>{l}</button>
                ))}
              </div>
            </div>
            <p className={styles.tip}>Drag to orbit; the angle buttons re-frame the camera. This is a real <code>&lt;model-viewer&gt;</code> — pinch/scroll to zoom too.</p>
          </div>
        </aside>
      </div>

      <div className={styles.code}>
        <div>Sample option — updates as you tweak</div>
        <pre><code>{php}</code></pre>
        <p className={styles.note}>
          Model Viewer is a <strong>page-builder element</strong> (Media Elements) — paste a
          <strong> .glb / .gltf</strong> URL and it renders with Google's <code>&lt;model-viewer&gt;</code>
          (orbit, IBL lighting, shadows, poster, and <strong>AR</strong> on supported devices). The
          web component is vendored and loads only on pages that use it; it honours reduced motion
          (no auto-spin). Models with baked <code>KHR_materials_variants</code> also get a colour-swatch row.
        </p>
      </div>
    </div>
  );
}
