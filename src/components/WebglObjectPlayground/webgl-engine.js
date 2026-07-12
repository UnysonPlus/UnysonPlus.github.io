/*
 * WebGL Object engine — a faithful port of the shortcode runtime
 * (shortcodes/webgl-object/static/js/webgl-object.js), with THREE injected so three.js only loads on
 * this route. Covers the procedural presets that need no external asset: the full-screen shader
 * presets (gradient_mesh / plasma / aurora / fluid / dots — same GLSL) and the 3D presets
 * (glass / metal / sphere / particles — MeshPhysicalMaterial + a generated env map + GPU noise
 * displacement). The image presets (image_distort / image_particles) need an uploaded image and are
 * left to a live page. `mountWebGL` returns { dispose, setScroll } — the playground's vertical scroll
 * slider feeds setScroll for the scroll-link uniform / rotation.
 */

const SIMPLEX = [
  'vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}',
  'vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}',
  'float snoise(vec3 v){',
  '  const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);',
  '  vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);',
  '  vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);',
  '  vec3 x1=x0-i1+1.0*C.xxx; vec3 x2=x0-i2+2.0*C.xxx; vec3 x3=x0-1.0+3.0*C.xxx;',
  '  i=mod(i,289.0);',
  '  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));',
  '  float n_=1.0/7.0; vec3 ns=n_*D.wyz-D.xzx;',
  '  vec4 j=p-49.0*floor(p*ns.z*ns.z);',
  '  vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);',
  '  vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);',
  '  vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);',
  '  vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));',
  '  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;',
  '  vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);',
  '  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));',
  '  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;',
  '  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;',
  '  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));',
  '}',
].join('\n');

const QUAD_VS = 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }';
const FRAG_HEAD = [
  'precision highp float;',
  'varying vec2 vUv;',
  'uniform float uTime; uniform vec2 uResolution; uniform vec2 uMouse;',
  'uniform float uScroll; uniform vec3 uColorA; uniform vec3 uColorB;',
  'uniform float uP1; uniform float uP2; uniform float uP3;',
].join('\n');
const FBM = 'float fbm(vec3 q){float f=0.0,a=0.5;for(int i=0;i<5;i++){f+=a*snoise(q);q*=2.0;a*=0.5;}return f;}';

const FRAG = {
  gradient_mesh:
    'void main(){vec2 p=vUv;float t=uTime*(0.1+uP1*0.5);vec2 m=uMouse*0.15;' +
    'float a=0.5+0.5*sin(t+p.x*3.0+m.x);float b=0.5+0.5*sin(t*1.3+p.y*3.0+m.y);' +
    'float c=0.5+0.5*sin(t*0.7+(p.x+p.y)*2.5);vec3 col=mix(uColorA,uColorB,a);' +
    'col=mix(col,uColorB,b*0.5);col=mix(col,uColorA,c*0.35);' +
    'float g=fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);col+=(g-0.5)*uP2;' +
    'gl_FragColor=vec4(col,1.0);}',
  plasma: SIMPLEX + FBM +
    'void main(){vec2 p=(vUv-0.5);p.x*=uResolution.x/uResolution.y;float s=uP1;' +
    'float t=uTime*(0.1+uP2*0.4);float n=fbm(vec3(p*s,t));' +
    'n=pow(0.5+0.5*n,mix(1.0,3.0,uP3));gl_FragColor=vec4(mix(uColorA,uColorB,n),1.0);}',
  aurora: SIMPLEX + FBM +
    'void main(){vec2 p=vUv;float t=uTime*(0.1+uP2*0.3);float warp=fbm(vec3(p*2.0,t));' +
    'float v=sin((p.y*uP1+warp)*3.1415);v=smoothstep(1.0-uP3,1.0,abs(v));' +
    'gl_FragColor=vec4(mix(uColorA,uColorB,p.y)*v,1.0);}',
  fluid: SIMPLEX +
    'void main(){vec2 p=vUv;vec2 m=uMouse*0.5;float t=uTime*0.2;' +
    'vec2 q=p+0.1*vec2(snoise(vec3(p*3.0+m,t)),snoise(vec3(p*3.0-m,t+5.0)));' +
    'float n=snoise(vec3(q*4.0,t))*(0.5+uP2);n=mix(n,n*0.5,uP1);' +
    'gl_FragColor=vec4(mix(uColorA,uColorB,0.5+0.5*n),1.0);}',
  dots: SIMPLEX +
    'void main(){float density=uP1;vec2 g=vUv*density;vec2 cell=fract(g)-0.5;' +
    'float field=0.5+0.5*snoise(vec3(floor(g)/max(density,1.0)*3.0,uTime*0.2));' +
    'float radius=mix(field,0.5,uP3)*uP2*0.5;float d=length(cell);' +
    'float dt=smoothstep(radius,radius-0.05,d);gl_FragColor=vec4(mix(uColorA,uColorB,dt),1.0);}',
};

export const SHADER_PRESETS = Object.keys(FRAG);
const num = (v, d) => (v === undefined || v === null || v === '' ? d : parseFloat(v));

function paramFor(cfg, n) {
  const o = cfg.presetOpts || {};
  let t;
  switch (cfg.preset) {
    case 'gradient_mesh': t = [num(o.blend_speed, 0.4), num(o.grain, 0.15), 0]; break;
    case 'plasma': t = [num(o.scale, 3), num(o.flow_speed, 0.5), num(o.contrast, 0.6)]; break;
    case 'aurora': t = [num(o.band_count, 3), num(o.drift_speed, 0.4), num(o.softness, 0.5)]; break;
    case 'fluid': t = [num(o.viscosity, 0.5), num(o.splat_strength, 0.6), 0]; break;
    case 'dots': t = [num(o.grid_density, 40), num(o.dot_size, 0.5), (o.dot_style === 'halftone' ? 1 : 0)]; break;
    default: t = [0, 0, 0];
  }
  return t[n - 1];
}
const detailFor = (q) => (q === 'high' ? 6 : q === 'low' ? 3 : 4);

export function mountWebGL(THREE, host, cfg) {
  const api = {scroll: 0};
  let disposed = false;

  const shaderMode = FRAG.hasOwnProperty(cfg.preset);
  const transparent = cfg.background === 'transparent';

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({alpha: transparent, antialias: cfg.quality !== 'low', powerPreference: 'high-performance'});
  } catch (e) { return {dispose() {}, setScroll() {}}; }
  const dprCap = cfg.quality === 'low' ? 1.5 : 2;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, dprCap));
  if ('outputColorSpace' in renderer) renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  if (!transparent) renderer.setClearColor(new THREE.Color(cfg.background === 'solid' ? (cfg.bgColor || '#0b0f1a') : '#05070d'), 1);
  host.appendChild(renderer.domElement);
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  renderer.domElement.style.display = 'block';

  const scene = new THREE.Scene();
  let camera, env = null, built, obj;
  const s = cfg.scale || 1;

  function makeEnv(a, b) {
    const size = 256;
    const c = document.createElement('canvas'); c.width = size; c.height = size;
    const ctx = c.getContext('2d');
    const g = ctx.createLinearGradient(0, 0, 0, size);
    g.addColorStop(0, b); g.addColorStop(0.5, a); g.addColorStop(1, '#05070d');
    ctx.fillStyle = g; ctx.fillRect(0, 0, size, size);
    const rg = ctx.createRadialGradient(size * 0.72, size * 0.28, 0, size * 0.72, size * 0.28, size * 0.55);
    rg.addColorStop(0, 'rgba(255,255,255,0.95)'); rg.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = rg; ctx.fillRect(0, 0, size, size);
    const rg2 = ctx.createRadialGradient(size * 0.24, size * 0.7, 0, size * 0.24, size * 0.7, size * 0.42);
    rg2.addColorStop(0, 'rgba(255,255,255,0.55)'); rg2.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = rg2; ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(c);
    tex.mapping = THREE.EquirectangularReflectionMapping;
    const pmrem = new THREE.PMREMGenerator(renderer);
    const e = pmrem.fromEquirectangular(tex).texture;
    tex.dispose(); pmrem.dispose();
    return e;
  }

  function buildShader() {
    const uniforms = {
      uTime: {value: 0}, uResolution: {value: new THREE.Vector2(1, 1)}, uMouse: {value: new THREE.Vector2(0, 0)},
      uScroll: {value: 0}, uColorA: {value: new THREE.Color(cfg.colorA || '#6aa6ff')}, uColorB: {value: new THREE.Color(cfg.colorB || '#b388ff')},
      uP1: {value: paramFor(cfg, 1)}, uP2: {value: paramFor(cfg, 2)}, uP3: {value: paramFor(cfg, 3)},
    };
    const mat = new THREE.ShaderMaterial({vertexShader: QUAD_VS, fragmentShader: FRAG_HEAD + '\n' + FRAG[cfg.preset], uniforms});
    return {object: new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat), uniforms, material: mat, geometry: mat};
  }

  function buildMesh() {
    const preset = cfg.preset || 'glass';
    const opts = cfg.presetOpts || {};
    const colA = new THREE.Color(cfg.colorA || '#6aa6ff');
    if (preset === 'particles') {
      const count = Math.max(500, Math.min(12000, opts.particle_count || 4000));
      const pos = new Float32Array(count * 3); const off = 2 / count, inc = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < count; i++) { const y = i * off - 1 + off / 2; const r = Math.sqrt(Math.max(0, 1 - y * y)); const phi = i * inc; pos[i * 3] = Math.cos(phi) * r; pos[i * 3 + 1] = y; pos[i * 3 + 2] = Math.sin(phi) * r; }
      const pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const pm = new THREE.PointsMaterial({color: colA, size: opts.particle_size || 0.02, transparent: true, opacity: 0.9, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true});
      return {object: new THREE.Points(pg, pm), uniforms: null, geometry: pg, material: pm};
    }
    const geo = new THREE.IcosahedronGeometry(1, detailFor(cfg.quality));
    let mat;
    if (preset === 'metal') {
      mat = new THREE.MeshPhysicalMaterial({color: colA, metalness: opts.metalness != null ? opts.metalness : 1, roughness: opts.roughness != null ? opts.roughness : 0.15, envMap: env, envMapIntensity: 1.2});
    } else if (preset === 'sphere') {
      mat = new THREE.MeshPhysicalMaterial({color: colA, metalness: 0, roughness: opts.roughness != null ? opts.roughness : 0.6, envMap: env, envMapIntensity: 0.6});
    } else {
      mat = new THREE.MeshPhysicalMaterial({color: new THREE.Color('#ffffff'), metalness: 0, roughness: 0.04, transmission: 1, thickness: 1.2, ior: opts.ior != null ? opts.ior : 1.45, iridescence: opts.iridescence != null ? opts.iridescence : 0.3, iridescenceIOR: 1.3, clearcoat: 1, clearcoatRoughness: 0.12, specularIntensity: 1, envMap: env, envMapIntensity: 2, attenuationColor: colA, attenuationDistance: 1.6});
    }
    const uniforms = {uTime: {value: 0}, uAmp: {value: (cfg.noiseAmount || 0) * 0.45}, uFreq: {value: 1.1}};
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = uniforms.uTime; shader.uniforms.uAmp = uniforms.uAmp; shader.uniforms.uFreq = uniforms.uFreq;
      shader.vertexShader = 'uniform float uTime;uniform float uAmp;uniform float uFreq;\n' + SIMPLEX + '\n' + shader.vertexShader;
      shader.vertexShader = shader.vertexShader.replace('#include <beginnormal_vertex>', ['#include <beginnormal_vertex>', 'vec3 _p = position*uFreq + uTime;', 'float _n = snoise(_p);', 'float _e = 0.35;', 'vec3 _grad = vec3(snoise(_p+vec3(_e,0.0,0.0))-_n, snoise(_p+vec3(0.0,_e,0.0))-_n, snoise(_p+vec3(0.0,0.0,_e))-_n);', 'objectNormal = normalize(objectNormal - uAmp*(_grad - dot(_grad,objectNormal)*objectNormal));'].join('\n'));
      shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\ntransformed += normal * (_n * uAmp);');
    };
    return {object: new THREE.Mesh(geo, mat), uniforms, geometry: geo, material: mat};
  }

  if (shaderMode) {
    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    built = buildShader(); obj = built.object; scene.add(obj);
  } else {
    camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 2.5);
    env = makeEnv(cfg.colorA || '#6aa6ff', cfg.colorB || '#b388ff');
    scene.environment = env;
    const key = new THREE.DirectionalLight(0xffffff, 2.0); key.position.set(2, 3, 2); scene.add(key);
    const rim = new THREE.DirectionalLight(new THREE.Color(cfg.colorB || '#b388ff'), 1.5); rim.position.set(-3, -1, -2); scene.add(rim);
    const fill = new THREE.DirectionalLight(new THREE.Color(cfg.colorA || '#6aa6ff'), 0.8); fill.position.set(0, -2, 3); scene.add(fill);
    scene.add(new THREE.AmbientLight(0xffffff, 0.3));
    built = buildMesh(); obj = built.object; obj.scale.setScalar(s); scene.add(obj);
  }

  const size = () => {
    const w = host.clientWidth || 1, h = host.clientHeight || 1;
    renderer.setSize(w, h, false);
    if (shaderMode) built.uniforms.uResolution.value.set(w, h);
    else { camera.aspect = w / h; camera.updateProjectionMatrix(); }
  };
  size();

  let tx = 0, ty = 0, px = 0, py = 0;
  const onMove = (e) => {
    if (!cfg.pointerFollow && !shaderMode) return;
    const r = host.getBoundingClientRect();
    tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
  };
  const onLeave = () => { tx = 0; ty = 0; };
  host.addEventListener('pointermove', onMove);
  host.addEventListener('pointerleave', onLeave);

  const clock = new THREE.Clock();
  let raf = 0;
  function frame() {
    const t = clock.getElapsedTime();
    px += (tx - px) * 0.06; py += (ty - py) * 0.06;
    if (shaderMode) {
      const u = built.uniforms;
      u.uTime.value = t;
      u.uMouse.value.set(px, py);
      if (cfg.scrollLink) u.uScroll.value = api.scroll;
      renderer.render(scene, camera);
    } else {
      if (built.uniforms) built.uniforms.uTime.value = t * (0.15 + (cfg.noiseSpeed || 0) * 0.6);
      const ps = cfg.pointerFollow ? (cfg.pointerStrength || 0) : 0;
      obj.rotation.y += (cfg.autoRotate || 0) * 0.005 + px * 0.01 * ps;
      obj.rotation.x = py * 0.5 * ps;
      const pr = cfg.parallax || 0;
      camera.position.x += ((px * 0.4 * pr) - camera.position.x) * 0.05;
      camera.position.y += ((-py * 0.3 * pr) - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);
      if (cfg.scrollLink) { const prog = api.scroll; obj.rotation.z = (prog - 0.5) * 0.6; obj.scale.setScalar(s * (1 + (prog - 0.5) * 0.12)); }
      renderer.render(scene, camera);
    }
  }
  const loop = () => { if (disposed) return; raf = requestAnimationFrame(loop); frame(); };
  raf = requestAnimationFrame(loop);

  let ro = null;
  if (window.ResizeObserver) { ro = new ResizeObserver(size); ro.observe(host); }

  api.dispose = () => {
    disposed = true; cancelAnimationFrame(raf);
    host.removeEventListener('pointermove', onMove); host.removeEventListener('pointerleave', onLeave);
    if (ro) ro.disconnect();
    try { if (built.geometry && built.geometry.dispose) built.geometry.dispose(); if (built.material) built.material.dispose(); if (env) env.dispose(); renderer.dispose(); } catch (e) { /* */ }
    if (renderer.domElement && renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
  };
  api.setScroll = (v) => { api.scroll = v; };
  return api;
}
