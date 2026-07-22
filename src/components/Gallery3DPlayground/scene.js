/*
 * Builds the 3D Gallery's DOM exactly as the plugin's PHP views do, so the vendored driver
 * (gallery-engine.js) can lay it out for real.
 *
 * ⚠ KEEP IN SYNC with the plugin's views/designs/*.php. The card COUNTS are not cosmetic — the driver
 * derives its angular step from how many cards each row/band actually contains, so the tiling maths
 * below must match:
 *   - carousel-ring.php  → one ring, one card per image
 *   - panorama-wall.php  → Rows × Columns, images cycled (offset per row)
 *   - card-sphere.php    → bands + per-band counts DERIVED from Globe/Card/Gap (see the ratio note)
 */

const RATIOS = {'1-1': [1, 1], '4-3': [4, 3], '3-4': [3, 4], '16-9': [16, 9], '9-16': [9, 16]};
const MAXLAT = 80; // must match card-sphere.php
const rad = (d) => (d * Math.PI) / 180;

/** Sample "photos": inline SVG data URIs — self-contained, no network (same trick as FlipCardPlayground). */
export const SAMPLES = Array.from({length: 12}, (_, i) => {
  const h = Math.round((i * 360) / 12);
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='480' height='480'>` +
    `<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>` +
    `<stop offset='0' stop-color='hsl(${h},70%,62%)'/><stop offset='1' stop-color='hsl(${(h + 40) % 360},65%,42%)'/>` +
    `</linearGradient></defs><rect width='480' height='480' fill='url(#g)'/>` +
    `<circle cx='${120 + (i % 3) * 90}' cy='${150 + (i % 4) * 60}' r='70' fill='rgba(255,255,255,.18)'/>` +
    `<circle cx='${330 - (i % 4) * 50}' cy='${360 - (i % 3) * 70}' r='110' fill='rgba(0,0,0,.10)'/></svg>`;
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
});

const cardHtml = (src) =>
  `<div class="tdg__card"><div class="tdg__inner"><span class="tdg__link">` +
  `<img class="tdg__img" src="${src}" alt=""></span></div></div>`;

/** Cards-per-band for the sphere — mirrors card-sphere.php (pixel-free ratios). */
function sphereBands(o) {
  const [rw, rh] = RATIOS[o.card_ratio] || RATIOS['16-9'];
  const cardAspect = rh / rw;
  const rOverCard = 50 / o.card_size; // R / cardW = 1 / (2·card%) — Card Size is a % of the GLOBE
  const gapFrac = o.gap / 100;
  const rows = Math.max(3, Math.min(24, Math.round((rOverCard * 2 * rad(MAXLAT)) / (cardAspect + gapFrac))));
  const bands = [];
  for (let b = 0; b < rows; b++) {
    const lat = ((b + 0.5) / rows) * 2 * MAXLAT - MAXLAT;
    const cnt = Math.max(3, Math.round((2 * Math.PI * rOverCard * Math.cos(rad(lat))) / (1 + gapFrac)));
    bands.push(cnt);
  }
  return {rows, bands};
}

/** The wrapper's shared style vars — mirrors views/view.php. */
function wrapStyle(o) {
  const [rw, rh] = RATIOS[o.card_ratio] || RATIOS['1-1'];
  return (
    `height:100%;--tdg-radius:${o.corner_radius}px;--tdg-pad:${o.padding}%;` +
    `--tdg-ratio:${rw} / ${rh};--tdg-bg:transparent;` +
    `--tdg-shadow:0 14px 40px -8px rgba(0,0,0,.45);`
  );
}

const attr = (o) => Object.entries(o).map(([k, v]) => `${k}="${v}"`).join(' ');

export function buildScene(design, o) {
  const style = wrapStyle(o);
  const shared = {
    'data-tdg-drive': o.drive,
    'data-tdg-speed': o.speed,
    'data-tdg-dir': o.direction === 'right' ? -1 : 1,
    'data-tdg-hover': o.hover_behavior,
    'data-tdg-count': SAMPLES.length,
  };

  if (design === 'carousel_ring') {
    const a = attr({
      ...shared,
      'data-tdg-tilt': o.tilt, 'data-tdg-roll': o.roll, 'data-tdg-opening': o.ring_opening,
      'data-tdg-ring': o.ring_size, 'data-tdg-spacing': o.spacing, 'data-tdg-persp': o.perspective,
      'data-tdg-backfade': o.back_fade, 'data-tdg-card': o.card_size, 'data-tdg-momentum': 1,
    });
    const cards = SAMPLES.map((s) => cardHtml(s)).join('');
    return `<div class="tdg tdg--carousel-ring" style="${style}" ${a}><div class="tdg__stage"><div class="tdg__ring">${cards}</div></div></div>`;
  }

  if (design === 'panorama_wall') {
    const a = attr({
      ...shared,
      'data-tdg-alt': o.direction === 'alternate' ? 1 : 0,
      'data-tdg-rows': o.rows, 'data-tdg-curv': o.curvature, 'data-tdg-tilt': o.tilt,
      'data-tdg-gap': o.gap, 'data-tdg-edge': o.edge_fade, 'data-tdg-persp': o.perspective,
      'data-tdg-card': o.card_size,
    });
    let rows = '';
    for (let r = 0; r < o.rows; r++) {
      let cells = '';
      for (let c = 0; c < o.columns; c++) cells += cardHtml(SAMPLES[(c + r) % SAMPLES.length]);
      rows += `<div class="tdg__row">${cells}</div>`;
    }
    return `<div class="tdg tdg--panorama-wall" style="${style}" ${a}><div class="tdg__stage"><div class="tdg__wall">${rows}</div></div></div>`;
  }

  if (design === 'orbit_globe') {
    // count mirrors orbit-globe.php: denser cloud when cards are smaller / gap tighter
    const nCards = Math.max(14, Math.min(90, Math.round(5 / (o.card_size / 100) / (1 + o.gap / 100))));
    const a = attr({
      ...shared,
      'data-tdg-globe': o.globe_size, 'data-tdg-backfade': o.back_fade, 'data-tdg-tilt': o.tilt,
      'data-tdg-card': o.card_size, 'data-tdg-momentum': 1,
    });
    let cells = '';
    for (let k = 0; k < nCards; k++) cells += cardHtml(SAMPLES[k % SAMPLES.length]);
    return `<div class="tdg tdg--orbit-globe" style="${style}" ${a}><div class="tdg__stage"><div class="tdg__orbit">${cells}</div></div></div>`;
  }

  // card_sphere
  const {rows, bands} = sphereBands(o);
  const a = attr({
    ...shared,
    'data-tdg-globe': o.globe_size, 'data-tdg-maxlat': MAXLAT, 'data-tdg-rows': rows,
    'data-tdg-backfade': o.back_fade, 'data-tdg-tilt': o.tilt, 'data-tdg-persp': o.perspective,
    'data-tdg-card': o.card_size, 'data-tdg-momentum': 1,
  });
  let html = '';
  bands.forEach((cnt, b) => {
    let cells = '';
    for (let k = 0; k < cnt; k++) cells += cardHtml(SAMPLES[(k + b) % SAMPLES.length]);
    html += `<div class="tdg__band">${cells}</div>`;
  });
  return `<div class="tdg tdg--card-sphere" style="${style}" ${a}><div class="tdg__stage"><div class="tdg__globe">${html}</div></div></div>`;
}

export const sphereInfo = sphereBands;
