/*
 * Motion Gallery — interactive playground.
 *
 * Pick a design on the right: the scene is built exactly as the plugin's PHP emits it (scene.js) and
 * driven by the REAL runtime (gallery-engine.js — vendored verbatim from the plugin, see vendor.mjs).
 * Nothing here is simulated.
 *
 * Each design registers its OWN geometry controls below; the options every design shares (motion,
 * card, frame) are declared once in SHARED and appended — the same way the builder's Design picker
 * reveals per-design options while the Style tab stays common.
 */
import React, {useEffect, useMemo, useRef, useState} from 'react';
import styles from './styles.module.css';
import {GALLERY_CSS, initEl, bumpGen} from './gallery-engine';
import {buildScene, sphereInfo} from './scene';

// control helpers
const sl = (id, label, def, min, max, step = 1) => ({id, label, t: 'slider', def, min, max, step});
const se = (id, label, def, choices) => ({id, label, t: 'select', def, choices});

const RATIO_CHOICES = [['1-1', 'Square (1:1)'], ['4-3', 'Landscape (4:3)'], ['3-4', 'Portrait (3:4)'], ['4-5', 'Portrait (4:5)'], ['16-9', 'Wide (16:9)'], ['9-16', 'Tall (9:16)']];
const HOVER_CHOICES = [['none', 'Keep rotating'], ['pause', 'Pause'], ['slow', 'Slow down']];
const DIR_CHOICES = [['left', 'Left'], ['right', 'Right']];
const YES_NO = [['yes', 'Yes'], ['no', 'No']];
const ORBIT_DRIVES = [['continuous', 'Continuous'], ['static', 'Static']];
const ORBIT_DIRS = [['cw', 'Clockwise'], ['ccw', 'Counter-clockwise']];

// Shared across every design (motion + card + frame), mirroring the element's common options.
const SHARED = (opts = {}) => [
  se('drive', 'Motion', opts.drive || 'auto', opts.driveChoices || [['auto', 'Auto-rotate'], ['static', 'Static']]),
  sl('speed', 'Loop Duration (s)', opts.speed || 16, opts.speedMin ?? 3, opts.speedMax ?? 60, 1),
  se('direction', 'Direction', opts.dir || 'left', opts.dirChoices || DIR_CHOICES),
  se('hover_behavior', 'On Hover', 'slow', HOVER_CHOICES),
  se('card_ratio', 'Card Ratio', opts.ratio || '1-1', RATIO_CHOICES),
  sl('corner_radius', 'Corner Radius (px)', opts.corner ?? 6, 0, 40, 1),
  sl('padding', 'Card Padding (%)', 0, 0, 20, 0.5),
];

const DESIGNS = {
  carousel_ring: {
    group: '3D & Perspective',
    label: 'Carousel Ring',
    blurb: 'A ring of cards revolving around you — tilt it back, roll it diagonal, open it up.',
    controls: [
      sl('tilt', 'Ring Tilt (°)', -28, -60, 60),
      sl('ring_opening', 'Ring Opening (%)', 55, 0, 100),
      sl('roll', 'Diagonal Tilt (°)', 0, -45, 45),
      sl('ring_size', 'Ring Size (%)', 80, 40, 140),
      sl('spacing', 'Card Spacing (%)', 100, 60, 180),
      sl('perspective', 'Perspective', 18, 8, 100),
      sl('back_fade', 'Back Fade (%)', 70, 0, 100),
      sl('card_size', 'Card Size (%)', 21, 6, 60),
      ...SHARED({drive: 'auto', speed: 16, ratio: '1-1', corner: 6}),
    ],
  },
  panorama_wall: {
    group: '3D & Perspective',
    label: 'Panorama Wall',
    blurb: 'A curved wall of cards wrapping around you and scrolling sideways. Curvature goes convex too.',
    controls: [
      sl('curvature', 'Curvature (%)', -100, -150, 150),
      sl('rows', 'Rows', 5, 1, 9),
      sl('columns', 'Columns', 11, 3, 24),
      sl('tilt', 'Tilt (°)', 0, -45, 45),
      sl('gap', 'Gap (%)', 5, 0, 20, 0.5),
      sl('edge_fade', 'Edge Fade (%)', 0, 0, 100),
      sl('perspective', 'Perspective', 68, 8, 100),
      sl('card_size', 'Card Size (%)', 20, 6, 40),
      ...SHARED({drive: 'continuous', speed: 20, ratio: '16-9', corner: 2,
        driveChoices: [['continuous', 'Continuous'], ['static', 'Static']],
        dirChoices: [...DIR_CHOICES, ['alternate', 'Alternate rows']]}),
    ],
  },
  card_sphere: {
    group: '3D & Perspective',
    label: 'Card Sphere',
    blurb: 'A spinning disco-ball of images. Globe Size zooms; Card Size sets how finely it tiles.',
    controls: [
      sl('globe_size', 'Globe Size (%)', 70, 40, 95),
      sl('card_size', 'Card Size (%)', 20, 8, 30),
      sl('gap', 'Gap (%)', 2.5, 0, 8, 0.5),
      sl('back_fade', 'Back Fade (%)', 55, 0, 90),
      sl('tilt', 'Tilt (°)', 0, -45, 45),
      sl('perspective', 'Perspective', 55, 8, 100),
      ...SHARED({drive: 'continuous', speed: 20, ratio: '16-9', corner: 2,
        driveChoices: [['continuous', 'Continuous'], ['static', 'Static']]}),
    ],
  },
  orbit_globe: {
    group: '3D & Perspective',
    label: 'Orbit Globe',
    blurb: 'Cards float through a sphere VOLUME, each facing you, near ones big and far ones dim — a depth-of-field orbit (vs Card Sphere’s surface bands). Card Size is the density control.',
    controls: [
      sl('globe_size', 'Globe Size (%)', 50, 40, 95),
      sl('card_size', 'Card Size (%)', 28, 8, 30),
      sl('gap', 'Gap (%)', 2.5, 0.5, 8, 0.5),
      sl('back_fade', 'Back Fade (%)', 55, 0, 90),
      sl('tilt', 'Tilt (°)', 27, -45, 45),
      ...SHARED({drive: 'continuous', speed: 20, ratio: '1-1', corner: 2,
        driveChoices: [['continuous', 'Continuous'], ['static', 'Static']]}),
    ],
  },
  totem_wall: {
    group: '3D & Perspective',
    label: 'Totem Wall',
    blurb: 'A flat row of INDEPENDENT vertical totems — each column wraps its cards around its own axis into a rounded pillar and cascades vertically. Curvature curls concave↔convex; Zoom sets totem size (fewer, larger totems as it rises).',
    controls: [
      sl('zoom', 'Zoom (%)', 10, 0, 100),
      sl('curvature', 'Curvature (%)', -150, -150, 150),
      sl('tilt', 'Tilt (°)', -45, -45, 45),
      sl('gap', 'Gap (%)', 0.5, 0, 20, 0.5),
      sl('edge_fade', 'Edge Fade (%)', 0, 0, 100),
      ...SHARED({drive: 'continuous', speed: 20, ratio: '16-9', corner: 0, dir: 'up',
        driveChoices: [['continuous', 'Continuous'], ['static', 'Static']],
        dirChoices: [['up', 'Up'], ['down', 'Down'], ['alternate', 'Alternate columns']]}),
    ],
  },
  parallax_totem: {
    group: '3D & Perspective',
    label: 'Parallax Totem',
    blurb: 'The depth-scatter sibling of Totem Wall — cards float at seeded depths & sizes and drift at depth-varied speeds (near ones faster: the parallax). All-variance-0 is a clean grid; raise Scatter / Size Variance / Parallax Depth for a floating depth field.',
    controls: [
      sl('zoom', 'Zoom (%)', 10, 0, 100),
      sl('scatter', 'Scatter (%)', 0, 0, 100),
      sl('size_variance', 'Size Variance (%)', 0, 0, 100),
      sl('parallax_depth', 'Parallax Depth (%)', 0, 0, 100),
      sl('curvature', 'Curvature (%)', -150, -150, 150),
      sl('gap', 'Gap (%)', 0.5, 0, 20, 0.5),
      sl('edge_fade', 'Edge Fade (%)', 0, 0, 100),
      ...SHARED({drive: 'continuous', speed: 20, ratio: '16-9', corner: 0, dir: 'up',
        driveChoices: [['continuous', 'Continuous'], ['static', 'Static']],
        dirChoices: [['up', 'Up'], ['down', 'Down']]}),
    ],
  },
  card_tunnel: {
    group: '3D & Perspective',
    label: 'Card Tunnel',
    blurb: 'An infinite perspective corridor — four walls of cards recede to a vanishing point and fly forward or backward. Tunnel Size widens the corridor; Card Length streaks the panels; Depth Fade dissolves the far end.',
    // Own control set (no card_ratio / card_size / padding — cards are sized to their wall).
    controls: [
      sl('tunnel_size', 'Tunnel Size (%)', 60, 20, 120),
      sl('card_length', 'Card Length (%)', 30, 5, 120),
      sl('gap', 'Gap (%)', 2, 0, 20, 0.5),
      sl('depth_fade', 'Depth Fade (%)', 0, 0, 100),
      sl('corner_radius', 'Corner Radius (px)', 0, 0, 60),
      se('drive', 'Motion', 'continuous', [['continuous', 'Continuous'], ['static', 'Static']]),
      sl('speed', 'Loop Duration (s)', 20, 3, 60),
      se('direction', 'Direction', 'forward', [['forward', 'Forward'], ['backward', 'Backward']]),
      se('hover_behavior', 'On Hover', 'slow', HOVER_CHOICES),
    ],
  },
  spiral_stream: {
    group: '3D & Perspective',
    label: 'Spiral Stream',
    blurb: 'Cards threaded along a 3D helix that streams past the camera — each rotates around its own vertical axis (fronts, edge-on slivers, mirrored backs). Taper narrows the coil into a vortex or flares it out; Card Count fills it.',
    controls: [
      sl('card_count', 'Card Count', 8, 3, 48, 1),
      sl('spiral_turns', 'Spiral Turns', 1, 0.25, 6, 0.25),
      sl('spiral_size', 'Spiral Size (%)', 35, 0, 100),
      sl('taper', 'Taper (%)', -90, -100, 100),
      sl('card_gap', 'Card Gap (%)', 0, 0, 100),
      sl('ring_tilt', 'Ring Tilt (°)', -45, -45, 45),
      sl('perspective', 'Perspective (%)', 0, 0, 100),
      sl('back_fade', 'Back Fade (%)', 10, 0, 100),
      sl('scale_pulse', 'Scale Pulse (%)', 0, 0, 100),
      sl('card_size', 'Card Size (%)', 12, 4, 60),
      ...SHARED({drive: 'continuous', speed: 20, ratio: '3-4', corner: 0, dir: 'forward',
        driveChoices: [['continuous', 'Continuous'], ['static', 'Static']],
        dirChoices: [['forward', 'Forward'], ['backward', 'Backward']]}),
    ],
  },
  depth_stack: {
    group: '3D & Perspective',
    label: 'Depth Stack',
    blurb: 'A deck of cards receding into depth (front card the hero) that streams toward the camera — the front flies out and fades as the next comes forward. Spread/Scatter fans the deck out; Depth Fade + Depth Blur give a depth-of-field falloff. Best on Scroll-scrub.',
    controls: [
      sl('card_count', 'Card Count', 4, 3, 50, 1),
      sl('depth_gap', 'Depth Gap (%)', 18, 0, 80),
      sl('spread', 'Spread (%)', 0, 0, 120),
      sl('spread_angle', 'Spread Angle (°)', -180, -180, 180),
      sl('wobble', 'Wobble (%)', 0, 0, 100),
      sl('depth_fade', 'Depth Fade (%)', 0, 0, 100),
      sl('depth_blur', 'Depth Blur (%)', 0, 0, 100, 0.5),
      se('layout', 'Layout', 'fan', [['fan', 'Fan (angle)'], ['scatter', 'Scatter (random)']]),
      sl('card_size', 'Card Size (%)', 20, 4, 80),
      ...SHARED({drive: 'continuous', speed: 20, ratio: '4-5', corner: 0, dir: 'forward',
        driveChoices: [['continuous', 'Continuous'], ['static', 'Static']],
        dirChoices: [['forward', 'Forward'], ['backward', 'Backward']]}),
    ],
  },
  card_reel: {
    group: 'Carousel & Flow',
    label: 'Card Reel',
    blurb: 'A vertical cover-flow carousel — a single column of cards wraps around a horizontal cylinder, the centre card flat and forward (the focus) while the neighbours tilt back. Flows up/down, or Stop at Centre snaps each card to the middle. 3D Curve bends the cylinder.',
    controls: [
      sl('curve_3d', '3D Curve (%)', -100, -100, 100),
      sl('card_size', 'Card Size (%)', 22, 6, 60),
      sl('gap', 'Gap (%)', 1, 0, 20, 0.5),
      se('snap', 'Stop at Centre', 'no', [['no', 'No'], ['yes', 'Yes']]),
      ...SHARED({drive: 'continuous', speed: 20, ratio: '1-1', corner: 0, dir: 'up',
        driveChoices: [['continuous', 'Continuous'], ['static', 'Static']],
        dirChoices: [['up', 'Up'], ['down', 'Down']]}),
    ],
  },
  film_strip: {
    group: 'Carousel & Flow',
    label: 'Film Strip',
    blurb: 'The horizontal sibling of Card Reel — a horizontal cover-flow carousel. A row of cards wraps around a vertical cylinder, the centre card flat and forward (the focus) while the sides tilt back. Flows left/right, or Stop at Centre snaps each card to the middle. 3D Curve bends the cylinder.',
    controls: [
      sl('curve_3d', '3D Curve (%)', -100, -100, 100),
      sl('card_size', 'Card Size (%)', 22, 6, 60),
      sl('gap', 'Gap (%)', 1, 0, 20, 0.5),
      se('snap', 'Stop at Centre', 'no', [['no', 'No'], ['yes', 'Yes']]),
      ...SHARED({drive: 'continuous', speed: 20, ratio: '1-1', corner: 0, dir: 'left',
        driveChoices: [['continuous', 'Continuous'], ['static', 'Static']],
        dirChoices: [['left', 'Left'], ['right', 'Right']]}),
    ],
  },
  wheel_carousel: {
    group: 'Carousel & Flow',
    label: 'Wheel Carousel',
    blurb: 'Cards fanned on a big Ferris-style wheel whose hub sits below the frame — only the top arc shows. Each card rotates tangent to the wheel (upright at the top = the focus) and the wheel steps around card by card. Overshoot sails past and settles, Anticipation winds back first, Hold pauses on each card.',
    controls: [
      sl('wheel_size', 'Wheel Size (%)', 70, 20, 160),
      sl('card_size', 'Card Size (%)', 40, 6, 90),
      sl('anticipation', 'Anticipation (%)', 0, 0, 40),
      sl('overshoot', 'Overshoot (%)', 0, 0, 30),
      sl('hold', 'Hold (%)', 0, 0, 60),
      ...SHARED({drive: 'continuous', speed: 20, ratio: '1-1', corner: 0, dir: 'cw',
        driveChoices: [['continuous', 'Continuous'], ['static', 'Static']],
        dirChoices: [['cw', 'Clockwise'], ['ccw', 'Counter-clockwise']]}),
    ],
  },
  cover_flow: {
    group: 'Carousel & Flow',
    label: 'Cover Flow',
    blurb: 'The classic album cover flow — the centre card faces you, the immediate neighbours tilt to Side Tilt and recede, further cards stack behind. One design for both orientations: Horizontal and Vertical.',
    controls: [
      se('orientation', 'Orientation', 'horizontal', [['horizontal', 'Horizontal'], ['vertical', 'Vertical']]),
      sl('side_tilt', 'Side Tilt (°)', 40, 0, 90),
      sl('card_size', 'Card Size (%)', 46, 6, 90),
      sl('gap', 'Gap (%)', 4, 0, 40, 0.5),
      se('snap', 'Stop at Centre', 'yes', [['yes', 'Yes'], ['no', 'No']]),
      ...SHARED({drive: 'continuous', speed: 20, ratio: '1-1', corner: 0, dir: 'forward',
        driveChoices: [['continuous', 'Continuous'], ['static', 'Static']],
        dirChoices: [['forward', 'Forward'], ['backward', 'Backward']]}),
    ],
  },
  carousel_flow: {
    group: 'Carousel & Flow',
    label: 'Carousel Flow',
    blurb: 'A flat focus carousel — the centre card is full size, the side cards scale down (Side Card Scale) and fade as they slide past. No tilt. Horizontal or Vertical.',
    controls: [
      se('orientation', 'Orientation', 'horizontal', [['horizontal', 'Horizontal'], ['vertical', 'Vertical']]),
      sl('side_scale', 'Side Card Scale (%)', 82, 20, 100),
      sl('card_size', 'Card Size (%)', 50, 6, 90),
      sl('gap', 'Gap (%)', 5, 0, 40, 0.5),
      se('snap', 'Stop at Centre', 'yes', [['yes', 'Yes'], ['no', 'No']]),
      ...SHARED({drive: 'continuous', speed: 20, ratio: '1-1', corner: 0, dir: 'forward',
        driveChoices: [['continuous', 'Continuous'], ['static', 'Static']],
        dirChoices: [['forward', 'Forward'], ['backward', 'Backward']]}),
    ],
  },
  mosaic_marquee: {
    group: 'Carousel & Flow',
    label: 'Mosaic Marquee',
    blurb: 'An airy bento marquee — cards of mixed sizes (big 2×2, tall 1×2, single squares, stacked pairs, some cells left empty so the background shows through) scrolling sideways forever. Card Height sets the tile scale; Padding insets the whole mosaic. Copies wrap seamlessly.',
    controls: [
      se('layout', 'Layout', '1', [['1', 'Layout 1'], ['2', 'Layout 2'], ['3', 'Layout 3']]),
      sl('card_height', 'Card Height (%)', 55, 10, 90),
      sl('gap', 'Gap (%)', 3, 0, 8, 0.5),
      se('drive', 'Motion', 'continuous', [['continuous', 'Continuous'], ['static', 'Static']]),
      sl('speed', 'Loop Duration (s)', 24, 3, 60, 1),
      se('direction', 'Direction', 'left', DIR_CHOICES),
      se('hover_behavior', 'On Hover', 'slow', HOVER_CHOICES),
      se('card_ratio', 'Card Ratio', '1-1', RATIO_CHOICES),
      sl('corner_radius', 'Corner Radius (px)', 18, 0, 40, 1),
      sl('padding', 'Padding (%)', 6, 0, 20, 0.5),
    ],
  },
  hero_reel: {
    group: 'Carousel & Flow',
    label: 'Hero Reel',
    blurb: 'A reel of thumbnail cards over a full-bleed hero background. The card stepping through the centre is the active one — it scales up and lifts, and its image fills the whole stage as a dimmed, slowly-zooming (Ken Burns) hero behind the reel, cross-fading as the reel advances.',
    controls: [
      sl('card_size', 'Card Size (%)', 18, 8, 40),
      sl('card_spacing', 'Card Spacing (%)', 4, 0, 20, 0.5),
      sl('active_scale', 'Active Scale (%)', 112, 100, 160),
      sl('active_lift', 'Active Lift (%)', 8, 0, 30),
      sl('hero_opacity', 'Hero Opacity (%)', 55, 0, 100),
      sl('ken_burns', 'Ken Burns (%)', 60, 0, 100),
      sl('hold', 'Hold (%)', 55, 0, 100),
      ...SHARED({drive: 'continuous', speed: 24, ratio: '4-3', corner: 8, dir: 'left',
        driveChoices: [['continuous', 'Continuous'], ['static', 'Static']],
        dirChoices: [['left', 'Left'], ['right', 'Right']]}),
    ],
  },
  focus_slider: {
    group: 'Carousel & Flow',
    label: 'Focus Slider',
    blurb: 'A centred-focus slider — the card passing through the centre scales up (Center Scale) and sits clean while its neighbours peek past on either side. Slide Portion sets the spacing (low = a cinematic overlap, high = spread apart); Zigzag pushes off-centre cards alternately up/down (left/right when vertical). Horizontal or vertical.',
    controls: [
      se('axis', 'Orientation', 'horizontal', [['horizontal', 'Horizontal'], ['vertical', 'Vertical']]),
      sl('card_size', 'Card Size (%)', 78, 20, 100),
      sl('center_scale', 'Center Scale (%)', 200, 100, 300),
      sl('slide_portion', 'Slide Portion (%)', 60, 20, 100),
      sl('card_spacing', 'Gap (%)', 6, 0, 40, 0.5),
      sl('hold', 'Hold (%)', 50, 0, 100),
      sl('zigzag', 'Zigzag Offset (%)', 0, 0, 100),
      se('zigzag_mode', 'Zigzag Mode', 'alternate', [['alternate', 'Alternate'], ['fixed', 'Fixed']]),
      ...SHARED({drive: 'continuous', speed: 24, ratio: '1-1', corner: 8, dir: 'left',
        driveChoices: [['continuous', 'Continuous'], ['static', 'Static']],
        dirChoices: [['left', 'Left / Up'], ['right', 'Right / Down']]}),
    ],
  },
  tilt_deck: {
    group: 'Isometric',
    label: 'Tilt Deck',
    blurb: 'Photos lie flat on an isometric ground plane in a grid and march diagonally across it; the tile passing the focus point lifts off the plane, rotates flat to face you and brightens, then settles back. Focus Lift 0 = a pure flat isometric grid.',
    controls: [
      sl('columns', 'Columns', 4, 2, 7),
      sl('depth_rows', 'Depth (rows)', 5, 3, 8),
      sl('gap', 'Tile Gap (%)', 12, 0, 60),
      sl('iso_tilt', 'Iso Tilt (°)', 58, 20, 75),
      sl('lift', 'Focus Lift (%)', 60, 0, 100),
      sl('focus_glow', 'Focus Brightness (%)', 135, 100, 220),
      sl('depth_fade', 'Depth Fade (%)', 30, 0, 100),
      sl('card_size', 'Tile Size (%)', 16, 4, 60),
      ...SHARED({drive: 'continuous', speed: 12, ratio: '1-1', corner: 6, dir: 'forward',
        driveChoices: [['continuous', 'Continuous'], ['static', 'Static']],
        dirChoices: [['forward', 'Forward'], ['backward', 'Backward']]}),
    ],
  },
  iso_orbit: {
    group: 'Isometric',
    label: 'Iso Orbit',
    blurb: 'Photos ride a ring lying flat on an isometric floor and revolve around its centre; the tile at the near point lifts to face you and brightens, then settles back as it carries on round. The far side dims.',
    controls: [
      sl('radius', 'Orbit Size (%)', 30, 8, 60),
      sl('iso_tilt', 'Iso Tilt (°)', 58, 20, 75),
      sl('lift', 'Focus Lift (%)', 70, 0, 100),
      sl('focus_glow', 'Focus Brightness (%)', 140, 100, 220),
      sl('depth_fade', 'Depth Fade (%)', 35, 0, 100),
      sl('card_size', 'Tile Size (%)', 16, 4, 60),
      ...SHARED({drive: 'continuous', speed: 18, ratio: '1-1', corner: 6, dir: 'cw',
        driveChoices: [['continuous', 'Continuous'], ['static', 'Static']],
        dirChoices: [['cw', 'Clockwise'], ['ccw', 'Counter-clockwise']]}),
    ],
  },
  iso_stack: {
    group: 'Isometric',
    label: 'Iso Stack',
    blurb: 'Photo slabs stacked into a tower rising off the isometric plane, streaming upward on a gentle spiral; the slab at the focus height lifts to face you and brightens, then flattens again as it carries on up. Spiral 0 = a straight vertical stack.',
    controls: [
      sl('gap', 'Stack Gap (%)', 40, 10, 80),
      sl('spiral', 'Spiral (%)', 40, 0, 100),
      sl('iso_tilt', 'Iso Tilt (°)', 58, 20, 75),
      sl('lift', 'Focus Lift (%)', 70, 0, 100),
      sl('focus_glow', 'Focus Brightness (%)', 140, 100, 220),
      sl('depth_fade', 'Depth Fade (%)', 40, 0, 100),
      sl('card_size', 'Slab Size (%)', 17, 4, 60),
      ...SHARED({drive: 'continuous', speed: 14, ratio: '1-1', corner: 6, dir: 'up',
        driveChoices: [['continuous', 'Continuous'], ['static', 'Static']],
        dirChoices: [['up', 'Up'], ['down', 'Down']]}),
    ],
  },
  iso_cascade: {
    group: 'Isometric',
    label: 'Iso Cascade',
    blurb: 'Photos descend a diagonal staircase across the isometric plane — high and far at the back, stepping down and toward you; the tile reaching the front lifts flat to face you and brightens, then recycles to the back. The back of the run dims.',
    controls: [
      sl('spread', 'Spread (%)', 60, 20, 100),
      sl('rise', 'Rise (%)', 50, 10, 100),
      sl('iso_tilt', 'Iso Tilt (°)', 58, 20, 75),
      sl('lift', 'Focus Lift (%)', 70, 0, 100),
      sl('focus_glow', 'Focus Brightness (%)', 140, 100, 220),
      sl('depth_fade', 'Depth Fade (%)', 45, 0, 100),
      sl('card_size', 'Tile Size (%)', 17, 4, 60),
      ...SHARED({drive: 'continuous', speed: 12, ratio: '1-1', corner: 6, dir: 'down',
        driveChoices: [['continuous', 'Continuous'], ['static', 'Static']],
        dirChoices: [['down', 'Down'], ['up', 'Up']]}),
    ],
  },
  iso_fan: {
    group: 'Isometric',
    label: 'Iso Fan',
    blurb: 'Photos spread along a flat arc (a fan) on the isometric plane and sweep across it; the tile passing the centre-front lifts flat to face you and brightens, then settles back as it sweeps on. Fan Spread opens the arc; Fan Reach sets how far it sweeps out.',
    controls: [
      sl('reach', 'Fan Reach (%)', 34, 10, 60),
      sl('arc', 'Fan Spread (°)', 130, 40, 175),
      sl('iso_tilt', 'Iso Tilt (°)', 58, 20, 75),
      sl('lift', 'Focus Lift (%)', 70, 0, 100),
      sl('focus_glow', 'Focus Brightness (%)', 140, 100, 220),
      sl('depth_fade', 'Depth Fade (%)', 40, 0, 100),
      sl('card_size', 'Tile Size (%)', 16, 4, 60),
      ...SHARED({drive: 'continuous', speed: 16, ratio: '1-1', corner: 6, dir: 'left',
        driveChoices: [['continuous', 'Continuous'], ['static', 'Static']],
        dirChoices: [['left', 'Left'], ['right', 'Right']]}),
    ],
  },
  orbit_bloom: {
    group: 'Orbit',
    label: 'Orbit Bloom',
    blurb: 'A ring of billboarded photos that orbits a tilted disc and breathes — blooming from a tight central cluster out to a wide ring and back, cards fading and growing as they open. Bloom 0 = a steady ring.',
    controls: [
      sl('radius', 'Ring Size (%)', 32, 10, 60),
      sl('tilt', 'Ring Tilt (°)', 58, 0, 80),
      sl('bloom', 'Bloom (%)', 70, 0, 100),
      sl('focus_glow', 'Focus Brightness (%)', 130, 100, 220),
      sl('depth_fade', 'Depth Fade (%)', 45, 0, 100),
      sl('card_size', 'Card Size (%)', 16, 4, 60),
      ...SHARED({drive: 'continuous', speed: 22, ratio: '1-1', corner: 6, dir: 'cw',
        driveChoices: [['continuous', 'Continuous'], ['static', 'Static']],
        dirChoices: [['cw', 'Clockwise'], ['ccw', 'Counter-clockwise']]}),
    ],
  },
  focus_orbit: {
    group: 'Orbit',
    label: 'Focus Orbit',
    blurb: 'Photos orbit a tilted disc; the card reaching the front pulls into the centre, lifts toward you and enlarges into a hero, then returns to the ring as the next takes its place. Hero Pull 0 = an even revolve.',
    controls: [
      sl('radius', 'Ring Size (%)', 36, 10, 55),
      sl('tilt', 'Ring Tilt (°)', 30, 0, 80),
      sl('hero', 'Hero Pull (%)', 70, 0, 100),
      sl('focus_glow', 'Focus Brightness (%)', 150, 100, 240),
      sl('depth_fade', 'Depth Fade (%)', 45, 0, 100),
      sl('card_size', 'Card Size (%)', 15, 4, 60),
      ...SHARED({drive: 'continuous', speed: 20, ratio: '1-1', corner: 6, dir: 'cw',
        driveChoices: [['continuous', 'Continuous'], ['static', 'Static']],
        dirChoices: [['cw', 'Clockwise'], ['ccw', 'Counter-clockwise']]}),
    ],
  },
  dual_orbit: {
    group: 'Orbit',
    label: 'Dual Orbit',
    blurb: 'Two concentric rings of photos on one tilted disc, a thin path under each; the inner ring turns the other way at its own pace, so the rings gear past each other.',
    controls: [
      sl('radius', 'Outer Ring Size (%)', 33, 15, 55),
      sl('inner', 'Inner Ring Size (%)', 50, 25, 85),
      sl('tilt', 'Ring Tilt (°)', 62, 0, 80),
      se('counter', 'Counter-rotate', 'yes', YES_NO),
      sl('inner_speed', 'Inner Ring Speed (%)', 150, 50, 300, 5),
      se('show_paths', 'Show Orbit Paths', 'yes', YES_NO),
      sl('focus_glow', 'Focus Brightness (%)', 130, 100, 220),
      sl('depth_fade', 'Depth Fade (%)', 45, 0, 100),
      sl('card_size', 'Card Size (%)', 11, 4, 60),
      ...SHARED({drive: 'continuous', speed: 20, ratio: '1-1', corner: 6, dir: 'cw', driveChoices: ORBIT_DRIVES, dirChoices: ORBIT_DIRS}),
    ],
  },
  comet_orbit: {
    group: 'Orbit',
    label: 'Comet Orbit',
    blurb: 'Photos travel one elliptical orbit around a glowing focus with real orbital timing — drifting slowly at the far end, then whipping past the focus and flaring. Eccentricity 0 = an even circle.',
    controls: [
      sl('radius', 'Orbit Size (%)', 33, 15, 55),
      sl('eccentricity', 'Eccentricity (%)', 62, 0, 85),
      sl('tilt', 'Orbit Tilt (°)', 45, 0, 80),
      se('show_focus', 'Show Focus Glow', 'yes', YES_NO),
      se('show_paths', 'Show Orbit Path', 'yes', YES_NO),
      sl('flare', 'Flare (%)', 70, 0, 100),
      sl('depth_fade', 'Depth Fade (%)', 40, 0, 100),
      sl('card_size', 'Card Size (%)', 12, 4, 60),
      ...SHARED({drive: 'continuous', speed: 24, ratio: '1-1', corner: 6, dir: 'cw', driveChoices: ORBIT_DRIVES, dirChoices: ORBIT_DIRS}),
    ],
  },
  orbit_swarm: {
    group: 'Orbit',
    label: 'Orbit Swarm',
    blurb: 'A cloud of photos, each on its own orbit and pace — inner ones overtake outer ones, the cloud rises and sinks, and now and then it gathers in and scatters back out.',
    controls: [
      sl('radius', 'Swarm Size (%)', 31, 15, 55),
      sl('spread', 'Spread (%)', 55, 0, 90),
      sl('swirl', 'Swirl (%)', 60, 0, 100),
      sl('height', 'Height Drift (%)', 30, 0, 100),
      sl('cohesion', 'Gather (%)', 45, 0, 100),
      sl('tilt', 'Orbit Tilt (°)', 55, 0, 80),
      sl('focus_glow', 'Focus Brightness (%)', 130, 100, 220),
      sl('depth_fade', 'Depth Fade (%)', 45, 0, 100),
      sl('card_size', 'Card Size (%)', 9, 4, 60),
      ...SHARED({drive: 'continuous', speed: 26, ratio: '1-1', corner: 6, dir: 'cw', driveChoices: ORBIT_DRIVES, dirChoices: ORBIT_DIRS}),
    ],
  },
  ring_tilt: {
    group: 'Orbit',
    label: 'Ring Tilt',
    blurb: "A planet's ring: photos lie flat in a steeply tilted ring around a shaded planet, stand up by Card Lift, and the whole ring rocks gently as it turns.",
    controls: [
      sl('radius', 'Ring Size (%)', 40, 15, 55),
      sl('tilt', 'Ring Tilt (°)', 70, 30, 85),
      sl('lift', 'Card Lift (°)', 20, 0, 90),
      sl('wobble', 'Wobble (°)', 8, 0, 25),
      se('show_core', 'Show Planet', 'yes', YES_NO),
      sl('core_size', 'Planet Size (%)', 34, 10, 70),
      se('core_color', 'Planet Colour', '#2f74e6', [['#2f74e6', 'Blue'], ['#e8892f', 'Amber'], ['#00b295', 'Green'], ['#8e44ad', 'Violet']]),
      sl('focus_glow', 'Focus Brightness (%)', 125, 100, 220),
      sl('depth_fade', 'Depth Fade (%)', 50, 0, 100),
      sl('card_size', 'Card Size (%)', 12, 4, 60),
      ...SHARED({drive: 'continuous', speed: 30, ratio: '4-3', corner: 6, dir: 'cw', driveChoices: ORBIT_DRIVES, dirChoices: ORBIT_DIRS}),
    ],
  },
  gyro_orbit: {
    group: 'Orbit',
    label: 'Gyro Orbit',
    blurb: 'An atom of photos: 2–4 rings, each on its own leaning plane, neighbours running opposite ways around a glowing core while the whole gyro slowly turns.',
    controls: [
      sl('radius', 'Gyro Size (%)', 24, 15, 50),
      sl('rings', 'Rings', 3, 2, 4),
      sl('lean', 'Ring Lean (°)', 62, 0, 85),
      sl('spin', 'Gyro Spin (%)', 35, 0, 100),
      se('show_paths', 'Show Ring Paths', 'yes', YES_NO),
      se('show_core', 'Show Core Glow', 'yes', YES_NO),
      sl('focus_glow', 'Focus Brightness (%)', 130, 100, 220),
      sl('depth_fade', 'Depth Fade (%)', 50, 0, 100),
      sl('card_size', 'Card Size (%)', 9, 4, 60),
      ...SHARED({drive: 'continuous', speed: 22, ratio: '1-1', corner: 6, dir: 'cw', driveChoices: ORBIT_DRIVES, dirChoices: ORBIT_DIRS}),
    ],
  },
  infinity_orbit: {
    group: 'Orbit',
    label: 'Infinity Orbit',
    blurb: 'Photos loop a figure-eight on a tilted plane; where the loops cross, one pass rises over the other.',
    controls: [
      sl('radius', 'Loop Width (%)', 38, 15, 50),
      sl('loop', 'Loop Height (%)', 100, 40, 160),
      sl('cross', 'Cross Height (%)', 40, 0, 100),
      sl('tilt', 'Plane Tilt (°)', 50, 0, 80),
      se('show_paths', 'Show Path', 'yes', YES_NO),
      sl('focus_glow', 'Focus Brightness (%)', 130, 100, 220),
      sl('depth_fade', 'Depth Fade (%)', 45, 0, 100),
      sl('card_size', 'Card Size (%)', 11, 4, 60),
      ...SHARED({drive: 'continuous', speed: 26, ratio: '1-1', corner: 6, dir: 'cw', driveChoices: ORBIT_DRIVES, dirChoices: [['cw', 'Forward'], ['ccw', 'Reverse']]}),
    ],
  },
  vortex: {
    group: 'Orbit',
    label: 'Vortex',
    blurb: 'A whirlpool: photos flow along spiral arms into a glowing eye, sinking and shrinking on the way, then come back in at the rim. Outward makes a fountain.',
    controls: [
      sl('radius', 'Vortex Size (%)', 42, 15, 55),
      sl('arms', 'Arms', 3, 1, 6),
      sl('twist', 'Twist (turns)', 0.8, -3, 3, 0.1),
      sl('depth', 'Depth (%)', 60, 0, 100),
      sl('tilt', 'Tilt (°)', 52, 0, 80),
      se('show_core', 'Show Eye Glow', 'yes', YES_NO),
      sl('depth_fade', 'Fade to Eye (%)', 55, 0, 100),
      sl('card_size', 'Card Size (%)', 8, 4, 60),
      ...SHARED({drive: 'continuous', speed: 30, ratio: '1-1', corner: 6, dir: 'in', driveChoices: ORBIT_DRIVES, dirChoices: [['in', 'Inward'], ['out', 'Outward']]}),
    ],
  },
  pendulum_orbit: {
    group: 'Orbit',
    label: 'Pendulum Orbit',
    blurb: 'An arc of photos that swings back and forth like a pendulum, easing at each end, instead of going round. One swing per Loop Duration.',
    controls: [
      sl('radius', 'Arc Size (%)', 36, 15, 55),
      sl('arc', 'Arc Span (°)', 130, 40, 300),
      sl('swing', 'Swing (°)', 45, 0, 180),
      sl('tilt', 'Orbit Tilt (°)', 58, 0, 80),
      sl('focus_glow', 'Focus Brightness (%)', 140, 100, 220),
      sl('depth_fade', 'Depth Fade (%)', 45, 0, 100),
      sl('card_size', 'Card Size (%)', 8, 4, 60),
      ...SHARED({drive: 'continuous', speed: 8, ratio: '1-1', corner: 6, dir: 'cw', driveChoices: ORBIT_DRIVES, dirChoices: [['cw', 'Right first'], ['ccw', 'Left first']]}),
    ],
  },
  moon_orbit: {
    group: 'Orbit',
    label: 'Moon Orbit',
    blurb: 'Big planet photos orbit the ring, each circled by smaller, faster moon photos — orbits within orbits.',
    controls: [
      sl('radius', 'Orbit Size (%)', 33, 15, 50),
      sl('planets', 'Planets', 4, 2, 6),
      sl('moon_radius', 'Moon Orbit (%)', 8, 3, 20),
      sl('moon_speed', 'Moon Speed (%)', 300, 100, 600, 10),
      sl('moon_size', 'Moon Size (%)', 50, 25, 90),
      sl('tilt', 'Orbit Tilt (°)', 55, 0, 80),
      sl('focus_glow', 'Focus Brightness (%)', 130, 100, 220),
      sl('depth_fade', 'Depth Fade (%)', 45, 0, 100),
      sl('card_size', 'Planet Size (%)', 11, 4, 60),
      ...SHARED({drive: 'continuous', speed: 30, ratio: '1-1', corner: 6, dir: 'cw', driveChoices: ORBIT_DRIVES, dirChoices: ORBIT_DIRS}),
    ],
  },
  tiered_orbit: {
    group: 'Orbit',
    label: 'Tiered Orbit',
    blurb: 'Stacked rings of photos at different heights, neighbouring tiers turning opposite ways; Taper makes a tree or a tornado.',
    controls: [
      sl('radius', 'Ring Size (%)', 28, 15, 50),
      sl('tiers', 'Tiers', 3, 2, 5),
      sl('gap', 'Tier Spacing (%)', 16, 5, 40),
      sl('taper', 'Taper (%)', 35, -70, 70),
      sl('elevation', 'View Height (°)', 22, 0, 45),
      se('alternate', 'Alternate Directions', 'yes', YES_NO),
      se('show_paths', 'Show Ring Paths', 'yes', YES_NO),
      sl('focus_glow', 'Focus Brightness (%)', 130, 100, 220),
      sl('depth_fade', 'Depth Fade (%)', 50, 0, 100),
      sl('card_size', 'Card Size (%)', 8, 4, 60),
      ...SHARED({drive: 'continuous', speed: 26, ratio: '1-1', corner: 6, dir: 'cw', driveChoices: ORBIT_DRIVES, dirChoices: ORBIT_DIRS}),
    ],
  },
  wave_grid: {
    group: 'Grid',
    label: 'Wave Grid',
    blurb: 'A grid of photos on a tilted floor with a ripple running across it — each photo rises on the crest and tips with the wave.',
    controls: [
      sl('columns', 'Columns', 6, 2, 12),
      sl('rows', 'Rows', 4, 1, 8),
      sl('gap', 'Gap (%)', 14, 0, 80),
      sl('tilt', 'Floor Tilt (°)', 55, 0, 80),
      sl('amplitude', 'Wave Height (%)', 35, 0, 120),
      sl('wavelength', 'Wavelength (photos)', 3.5, 1.5, 10, 0.5),
      se('origin', 'Wave Starts From', 'center', [['center', 'The centre (rings)'], ['left', 'The left edge'], ['corner', 'The top-left corner']]),
      sl('focus_glow', 'Crest Brightness (%)', 130, 100, 220),
      sl('card_size', 'Card Size (%)', 11, 4, 40),
      ...SHARED({drive: 'continuous', speed: 5, ratio: '1-1', corner: 6, dir: 'out', driveChoices: ORBIT_DRIVES, dirChoices: [['out', 'Outward'], ['in', 'Inward']]}),
    ],
  },
  flip_grid: {
    group: 'Grid',
    label: 'Flip Grid',
    blurb: 'A grid of two-sided cards: every few seconds a wave of 3D flips turns each one over to the next photo, cycling through the whole gallery.',
    controls: [
      sl('columns', 'Columns', 4, 1, 10),
      sl('rows', 'Rows', 3, 1, 8),
      sl('gap', 'Gap (%)', 8, 0, 60),
      se('flip_axis', 'Flip', 'y', [['y', 'Sideways'], ['x', 'Head over heels']]),
      se('order', 'Flip Order', 'wave', [['wave', 'A diagonal wave'], ['random', 'Random'], ['rows', 'Row by row']]),
      sl('tilt', 'Tilt (°)', 8, 0, 40),
      sl('card_size', 'Card Size (%)', 15, 4, 40),
      ...SHARED({drive: 'continuous', speed: 4, ratio: '1-1', corner: 6, dir: 'fwd', driveChoices: ORBIT_DRIVES, dirChoices: [['fwd', 'Forward'], ['back', 'Backward']]}),
    ],
  },
  magnet_grid: {
    group: 'Grid',
    label: 'Magnet Grid',
    blurb: 'Move your pointer over it: the nearest cards lift, grow and turn toward it while the grid leans its way. Idle, an invisible pointer drifts across.',
    controls: [
      sl('columns', 'Columns', 5, 2, 12),
      sl('rows', 'Rows', 3, 1, 8),
      sl('gap', 'Gap (%)', 14, 0, 80),
      sl('reach', 'Reach (%)', 22, 5, 60),
      sl('lift', 'Lift (%)', 90, 0, 150),
      sl('lean', 'Grid Lean (°)', 10, 0, 30),
      sl('focus_glow', 'Focus Brightness (%)', 130, 100, 220),
      sl('card_size', 'Card Size (%)', 12, 4, 40),
      ...SHARED({drive: 'continuous', speed: 10, ratio: '1-1', corner: 6, dir: 'roam', driveChoices: [['continuous', 'Drift when idle'], ['static', 'Static']], dirChoices: [['roam', 'Roam the whole grid'], ['center', 'Stay near the centre']]}),
    ],
  },
  blind_reveal: {
    group: 'Reveal & Wipe',
    label: 'Blind Reveal',
    blurb: 'One big photo cut into slats that turn over one after another, like Venetian blinds, to show the next photo.',
    controls: [
      sl('slats', 'Slats', 10, 2, 40),
      se('orientation', 'Slats', 'v', [['v', 'Vertical'], ['h', 'Horizontal']]),
      sl('stagger', 'Stagger (%)', 50, 0, 100),
      sl('gap', 'Gap (px)', 2, 0, 20),
      sl('frame_size', 'Photo Size (%)', 70, 20, 100),
      ...SHARED({drive: 'continuous', speed: 4, ratio: '16-9', corner: 10, dir: 'fwd', driveChoices: [['continuous', 'Autoplay'], ['static', 'Static']], dirChoices: [['fwd', 'Forward'], ['back', 'Backward']]}),
    ],
  },
  iris_wipe: {
    group: 'Reveal & Wipe',
    label: 'Iris Wipe',
    blurb: 'The next photo opens up over the current one through a growing circle, diamond, diagonal sweep or barn doors.',
    controls: [
      se('shape', 'Shape', 'circle', [['circle', 'Circle'], ['diamond', 'Diamond'], ['diagonal', 'Diagonal sweep'], ['doors', 'Barn doors']]),
      sl('zoom', 'Zoom (%)', 12, 0, 40),
      sl('transition', 'Wipe Length (%)', 45, 15, 90),
      sl('frame_size', 'Photo Size (%)', 70, 20, 100),
      ...SHARED({drive: 'continuous', speed: 4, ratio: '16-9', corner: 10, dir: 'fwd', driveChoices: [['continuous', 'Autoplay'], ['static', 'Static']], dirChoices: [['fwd', 'Forward'], ['back', 'Backward']]}),
    ],
  },
  tile_dissolve: {
    group: 'Reveal & Wipe',
    label: 'Tile Dissolve',
    blurb: 'One big photo breaks into tiles that fly toward you, spin and fade in a wave, uncovering the next photo.',
    controls: [
      sl('columns', 'Columns', 8, 2, 20),
      sl('rows', 'Rows', 5, 2, 14),
      se('pattern', 'Order', 'corner', [['corner', 'From the corner'], ['random', 'Random'], ['center', 'From the centre out']]),
      sl('fly', 'Fly Distance (%)', 60, 0, 100),
      sl('frame_size', 'Photo Size (%)', 70, 20, 100),
      ...SHARED({drive: 'continuous', speed: 4, ratio: '16-9', corner: 10, dir: 'fwd', driveChoices: [['continuous', 'Autoplay'], ['static', 'Static']], dirChoices: [['fwd', 'Forward'], ['back', 'Backward']]}),
    ],
  },
  spotlight_wall: {
    group: 'Spotlight & Focus',
    label: 'Spotlight Wall',
    blurb: 'A wall of photos in shadow; a spotlight glides from one to the next, bringing it into full colour. Hover to steer it.',
    controls: [
      sl('columns', 'Columns', 5, 1, 12),
      sl('rows', 'Rows', 3, 1, 8),
      sl('gap', 'Gap (%)', 10, 0, 80),
      sl('spot_size', 'Spotlight Size (%)', 80, 30, 300, 5),
      sl('shadow', 'Shadow Brightness (%)', 35, 0, 100),
      sl('greyscale', 'Shadow Greyscale (%)', 100, 0, 100),
      sl('lift', 'Lift (%)', 8, 0, 30),
      sl('move_time', 'Move Time (%)', 35, 10, 90),
      se('order', 'Order', 'random', [['random', 'Random'], ['reading', 'Reading order']]),
      se('follow_pointer', 'Follow Pointer', 'yes', YES_NO),
      sl('card_size', 'Card Size (%)', 13, 3, 40),
      ...SHARED({drive: 'continuous', speed: 3, ratio: '1-1', corner: 6, dir: 'fwd', driveChoices: [['continuous', 'Autoplay'], ['static', 'Static']], dirChoices: [['fwd', 'Forward'], ['back', 'Backward']]}),
    ],
  },
  focus_pull: {
    group: 'Spotlight & Focus',
    label: 'Focus Pull',
    blurb: 'Photos float at several depths and the focus racks between them: one layer sharp, the others blurred and dimmed.',
    controls: [
      sl('layers', 'Layers', 3, 2, 5),
      sl('photos', 'Photos', 15, 4, 40),
      sl('depth', 'Depth (%)', 45, 10, 120),
      sl('blur', 'Blur (px)', 7, 0, 20),
      sl('dim', 'Dim (%)', 30, 0, 80),
      sl('drift', 'Drift (%)', 30, 0, 100),
      sl('move_time', 'Rack Time (%)', 40, 10, 90),
      sl('card_size', 'Card Size (%)', 15, 3, 40),
      ...SHARED({drive: 'continuous', speed: 3, ratio: '1-1', corner: 6, dir: 'front', driveChoices: [['continuous', 'Autoplay'], ['static', 'Static']], dirChoices: [['front', 'Start at the front'], ['back', 'Start at the back']]}),
    ],
  },
  loupe: {
    group: 'Spotlight & Focus',
    label: 'Loupe',
    blurb: 'A mosaic of small photos with a magnifying lens gliding over it. Hover to move the lens yourself.',
    controls: [
      sl('columns', 'Columns', 6, 2, 14),
      sl('rows', 'Rows', 4, 1, 10),
      sl('gap', 'Gap (%)', 8, 0, 60),
      sl('lens_size', 'Lens Size (%)', 24, 8, 60),
      sl('zoom', 'Zoom (%)', 220, 120, 500, 10),
      se('follow_pointer', 'Follow Pointer', 'yes', YES_NO),
      sl('card_size', 'Card Size (%)', 10, 3, 30),
      ...SHARED({drive: 'continuous', speed: 12, ratio: '1-1', corner: 6, dir: 'roam', driveChoices: [['continuous', 'Drift when idle'], ['static', 'Static']], dirChoices: [['roam', 'Roam the whole mosaic'], ['center', 'Stay near the centre']]}),
    ],
  },
  card_fan: {
    group: 'Stack & Scatter',
    label: 'Card Fan',
    blurb: 'Photos held like a hand of cards; the card the highlight reaches rises out of the fan. Point at a card to raise it.',
    controls: [
      sl('cards', 'Cards in Hand', 7, 3, 15),
      sl('spread', 'Fan Spread (°)', 70, 10, 200),
      sl('pivot', 'Pivot Depth (%)', 120, 30, 400, 5),
      sl('lift', 'Lift (%)', 35, 0, 90),
      sl('straighten', 'Straighten (%)', 60, 0, 100),
      sl('dim', 'Dim (%)', 25, 0, 90),
      sl('sway', 'Sway (°)', 3, 0, 20),
      sl('move_time', 'Move Time (%)', 45, 10, 90),
      se('follow_pointer', 'Follow Pointer', 'yes', YES_NO),
      sl('card_size', 'Card Size (%)', 20, 4, 50),
      ...SHARED({drive: 'continuous', speed: 2, speedMin: 1, speedMax: 10, ratio: '3-4', corner: 12, dir: 'ltr', driveChoices: [['continuous', 'Autoplay'], ['static', 'Static']], dirChoices: [['ltr', 'Start on the left'], ['rtl', 'Start on the right']]}),
    ],
  },
  shuffle_deck: {
    group: 'Stack & Scatter',
    label: 'Shuffle Deck',
    blurb: 'A loose deck of photos; the top one slides out to the side and tucks back in at the bottom.',
    controls: [
      sl('behind', 'Cards Behind', 4, 1, 8),
      sl('offset', 'Deck Offset (%)', 4, 0, 20, 0.5),
      sl('jitter', 'Jitter (°)', 4, 0, 20),
      sl('slide', 'Slide Distance (%)', 75, 30, 160),
      sl('slide_tilt', 'Slide Tilt (°)', 10, 0, 45),
      sl('move_time', 'Shuffle Time (%)', 55, 15, 95),
      sl('card_size', 'Card Size (%)', 34, 6, 70),
      ...SHARED({drive: 'continuous', speed: 3, speedMin: 1, speedMax: 12, ratio: '4-3', corner: 12, dir: 'alternate', driveChoices: [['continuous', 'Autoplay'], ['static', 'Static']], dirChoices: [['alternate', 'Alternate sides'], ['right', 'Always to the right'], ['left', 'Always to the left']]}),
    ],
  },
  polaroid_drop: {
    group: 'Stack & Scatter',
    label: 'Polaroid Drop',
    blurb: 'Instant prints drop one by one onto a growing pile, each landing at its own angle.',
    controls: [
      sl('pile', 'Pile Size', 6, 1, 20),
      se('when_full', 'When Full', 'oldest', [['oldest', 'The oldest slides away'], ['sweep', 'Sweep the pile away']]),
      sl('scatter', 'Scatter (%)', 45, 0, 200),
      sl('max_tilt', 'Max Tilt (°)', 14, 0, 45),
      sl('move_time', 'Drop Time (%)', 45, 15, 95),
      sl('card_size', 'Card Size (%)', 24, 6, 60),
      ...SHARED({drive: 'continuous', speed: 2, speedMin: 1, speedMax: 10, ratio: '4-5', corner: 3, dir: 'above', driveChoices: [['continuous', 'Autoplay'], ['static', 'Static']], dirChoices: [['above', 'Drop from above'], ['camera', 'Toss in from the camera']]}).filter((c) => c.id !== 'padding'),
    ],
  },
  phone_lineup: {
    group: 'Devices & Screens',
    label: 'Phone Lineup',
    blurb: 'Every photo on a phone; the phones stand in a shallow V and the lineup turns like a carousel. Drag it to turn it.',
    controls: [
      sl('phones', 'Phones', 7, 3, 15),
      sl('spacing', 'Spacing (%)', 70, 20, 200),
      sl('depth', 'Depth (%)', 50, 0, 150),
      sl('turn', 'Turn (°)', 25, 0, 80),
      sl('float', 'Float (%)', 3, 0, 12, 0.5),
      se('snap', 'Stop at Centre', 'yes', YES_NO),
      sl('move_time', 'Move Time (%)', 45, 10, 95),
      sl('card_size', 'Phone Size (%)', 16, 4, 40),
      ...SHARED({drive: 'continuous', speed: 3, speedMin: 1, speedMax: 12, ratio: '9-16', dir: 'left', driveChoices: [['continuous', 'Continuous'], ['static', 'Static']], dirChoices: [['left', 'Left'], ['right', 'Right']]}).filter((c) => c.id !== 'corner_radius' && c.id !== 'padding'),
    ],
  },
  window_stack: {
    group: 'Devices & Screens',
    label: 'Window Stack',
    blurb: 'Every photo in a browser window, stacked in a tilted 3D pile; the front window leaves and the rest move up.',
    controls: [
      sl('behind', 'Windows Behind', 4, 1, 8),
      sl('gap', 'Depth Gap (%)', 30, 5, 100),
      sl('offset', 'Offset (%)', 8, 0, 30, 0.5),
      sl('tilt', 'Tilt (°)', 16, 0, 50),
      sl('yaw', 'Turn (°)', 22, -45, 45),
      sl('dim', 'Dim (%)', 30, 0, 80),
      sl('move_time', 'Move Time (%)', 55, 15, 95),
      sl('card_size', 'Window Size (%)', 44, 10, 80),
      ...SHARED({drive: 'continuous', speed: 3, speedMin: 1, speedMax: 12, ratio: '16-9', dir: 'toward', driveChoices: [['continuous', 'Autoplay'], ['static', 'Static']], dirChoices: [['toward', 'Front window comes toward you'], ['down', 'Front window drops away']]}).filter((c) => c.id !== 'corner_radius' && c.id !== 'padding'),
    ],
  },
  device_trio: {
    group: 'Devices & Screens',
    label: 'Device Trio',
    blurb: 'A laptop with a tablet and a phone floating in front of it; the screens change one device at a time. Hover to turn it.',
    controls: [
      sl('card_size', 'Size (%)', 48, 15, 90),
      sl('depth', 'Depth (%)', 30, 0, 100),
      sl('float', 'Float (%)', 2, 0, 8, 0.5),
      sl('tilt', 'Tilt (°)', 10, 0, 30),
      se('follow_pointer', 'Follow Pointer', 'yes', YES_NO),
      ...SHARED({drive: 'continuous', speed: 3, speedMin: 1, speedMax: 12, dir: 'sway', driveChoices: [['continuous', 'Autoplay'], ['static', 'Static']], dirChoices: [['sway', 'Gentle sway'], ['still', 'Hold still']]}).filter((c) => c.id !== 'card_ratio' && c.id !== 'corner_radius' && c.id !== 'padding'),
    ],
  },
};

const GROUP_ORDER = ['3D & Perspective', 'Carousel & Flow', 'Isometric', 'Orbit', 'Grid', 'Reveal & Wipe', 'Spotlight & Focus', 'Stack & Scatter', 'Devices & Screens'];
const GROUPS = GROUP_ORDER.map((g) => [g, Object.keys(DESIGNS).filter((k) => DESIGNS[k].group === g)]);

const defaultsFor = (d) => Object.fromEntries(DESIGNS[d].controls.map((c) => [c.id, c.def]));

function buildPhp(design, vals) {
  // Motion is a NESTED multi-picker in the plugin (mode + that mode's own settings); everything else
  // stays flat under the design. Mirror that shape here so the sample is copy-paste accurate.
  const motionKeys = ['speed', 'direction', 'hover_behavior'];
  const line = (c, ind) => `${ind}'${c.id}' => ${c.t === 'select' ? `'${vals[c.id]}'` : vals[c.id]},`;
  const mode = vals.drive;
  const msub = DESIGNS[design].controls.filter((c) => motionKeys.includes(c.id))
    .map((c) => line(c, '                    ')).join('\n');
  const motion = mode === 'static'
    ? `            'motion' => [ 'mode' => 'static' ],`
    : `            'motion' => [
                'mode' => '${mode}',
                '${mode}' => [
${msub}
                ],
            ],`;
  const geo = DESIGNS[design].controls.filter((c) => c.id !== 'drive' && !motionKeys.includes(c.id))
    .map((c) => line(c, '            ')).join('\n');
  return `'design_settings' => [
    'design' => '${design}',
    '${design}' => [
${motion}
${geo}
    ],
],`;
}

export default function Gallery3DPlayground() {
  const [design, setDesign] = useState('carousel_ring');
  const [vals, setVals] = useState(() => defaultsFor('carousel_ring'));
  const hostRef = useRef(null);
  const set = (id, v) => setVals((s) => ({...s, [id]: v}));
  const pick = (k) => { setDesign(k); setVals(defaultsFor(k)); };

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    bumpGen();                       // let the previous design's rAF loops die
    host.innerHTML = buildScene(design, vals);
    const el = host.firstElementChild;
    if (el) initEl(el);
    return () => { bumpGen(); };
  }, [design, vals]);

  const php = useMemo(() => buildPhp(design, vals), [design, vals]);
  const cfg = DESIGNS[design];
  const tiling = design === 'card_sphere' ? sphereInfo(vals) : null;

  return (
    <div className={styles.playground}>
      <style>{GALLERY_CSS}</style>

      <div className={styles.layout}>
        <div className={styles.main}>
          <div className={styles.stage}><div ref={hostRef} className={styles.host} /></div>

          <div className={styles.controls}>
            <h5>
              {cfg.label} — options
              {tiling && <em className={styles.derived}>derived: {tiling.rows} bands · {Math.max(...tiling.bands)} around the equator</em>}
            </h5>
            {cfg.controls.map((c) => (
              <div className={styles.control} key={c.id}>
                {c.t === 'slider' && (<>
                  <label>{c.label} <span>{vals[c.id]}</span></label>
                  <input type="range" min={c.min} max={c.max} step={c.step} value={vals[c.id]}
                    onChange={(e) => set(c.id, Number(e.target.value))} />
                </>)}
                {c.t === 'select' && (<>
                  <label>{c.label}</label>
                  <select className={styles.select} value={vals[c.id]} onChange={(e) => set(c.id, e.target.value)}>
                    {c.choices.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                </>)}
              </div>
            ))}
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.sidebarInner}>
            <div className={styles.sidebarTitle}>Design</div>
            {GROUPS.map(([label, keys]) => (
              <div className={styles.tabGroup} key={label}>
                <span className={styles.tabGroupLabel}>{label}</span>
                <div className={styles.tabPills}>
                  {keys.map((k) => (
                    <button key={k} type="button" className={k === design ? styles.tabActive : styles.tab}
                      onClick={() => pick(k)}>{DESIGNS[k].label}</button>
                  ))}
                </div>
              </div>
            ))}
            <p className={styles.blurb}>{cfg.blurb}</p>
          </div>
        </aside>
      </div>

      <div className={styles.code}>
        <div>Sample option — updates as you tweak</div>
        <pre><code>{php}</code></pre>
        <p className={styles.note}>
          The Motion Gallery is a <strong>page-builder element</strong> (builder palette → <strong>Media
          Elements</strong>). <code>design_settings</code> is a multi-picker — the chosen design plus its
          own geometry options — while the shared card controls (Box Style, shadow, captions, lightbox,
          Use as Section Background) live on the <strong>Style</strong> tab. Only this element's small
          CSS/JS ships, and it honours <strong>reduce motion</strong> (a static scene, no spin).
        </p>
      </div>
    </div>
  );
}
