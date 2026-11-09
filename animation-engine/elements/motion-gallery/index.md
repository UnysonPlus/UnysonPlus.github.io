---
sidebar_position: 12
title: Motion Gallery
slug: /motion-gallery
---

# Motion Gallery

:::tip[Try it live]
Preview every design in the **[Motion Gallery playground](./playground.mdx)** — pick a design, tweak its
geometry, and watch it render with sample images. It runs the **real** module (the same CSS and 3D
driver the element ships), then copies the generated sample option.
:::

Your images, wrapped onto a moving 3D scene — a ring of cards revolving around the viewer, a curved
wall scrolling past, or a slowly spinning globe of photos. One element, a **Design** picker, and a
pure-CSS 3D scene driven by a single rAF loop (no library).

## Where to find it

Add **Motion Gallery** from the builder palette → **Media Elements**. Drop your images into the
**Content** tab, then pick a **Design** on the **Design** tab — each design reveals its own geometry
controls. The shared card controls (Box Style, shadow, captions, click action) live on the **Style**
tab.

The element ships with the **Animation Engine** extension — activate it in **Extensions** if you
don't see it.

## The designs

**3D & Perspective**

- **Carousel Ring** — a ring of cards revolving around you. Tilt it back (**Ring Tilt**), open the
  loop up (**Ring Opening**), or roll the whole ring to a diagonal (**Diagonal Tilt**).
- **Panorama Wall** — a curved wall of cards scrolling sideways. **Curvature** is signed: negative
  wraps the wall *toward* you (concave), positive bulges it *away* (convex).
- **Card Sphere** — a spinning disco-ball of images. **Globe Size** zooms the sphere; **Card Size**
  sets how finely it tiles (the bands and card counts are derived to cover it).
- **Totem Wall** — a flat row of *independent* vertical totems: each column wraps its cards around
  its own axis into a rounded pillar and cascades vertically (up / down / alternate). **Curvature**
  is signed — negative curls each column away (concave), positive bulges it toward you into a full
  pill; **Zoom** sets the totem size (fewer, larger totems as it rises), and a steep **Tilt** gives
  the diagonal, diamond-lattice look.
- **Parallax Totem** — the depth-scatter sibling of Totem Wall. The same vertical totems, but each
  card floats at a *seeded* depth and size and drifts at a depth-varied speed — near cards faster
  than far ones (the parallax). Leave **Scatter**, **Size Variance** and **Parallax Depth** at 0 for
  a clean grid; raise them for a loose, floating depth field.
- **Card Tunnel** — an infinite perspective corridor. Four walls (ceiling, floor, left, right) of
  cards recede to a central vanishing point and fly **Forward** or **Backward**, recycling
  seamlessly. **Tunnel Size** widens the corridor (100%+ opens the walls past the frame for an
  immersive fly-through), **Card Length** streaks the panels, and **Depth Fade** dissolves the far
  end into the dark.
- **Spiral Stream** — cards threaded along a 3D helix that streams past the camera, each rotating
  around its own vertical axis so you see fronts, edge-on slivers and mirrored backs. **Spiral Turns**
  sets the revolutions, **Taper** narrows the coil into a vortex or flares it out, **Card Count** fills
  it, and **Scale Pulse** breathes the sizes for a living stream.
- **Depth Stack** — a deck of cards receding straight into depth (the front card the hero) that
  streams toward the camera: the front flies out and fades while the next comes forward and a new one
  fades in at the back. **Spread** (Fan, along **Spread Angle**) or **Scatter** fans the deck out,
  **Wobble** jitters the tilt, and **Depth Fade** + **Depth Blur** give a depth-of-field falloff.
  Pair it with **Motion → Scroll-scrub** so the visitor's scroll advances the stack.

**Carousel & Flow**

- **Card Reel** — a vertical cover-flow carousel. A single column of cards wraps around a horizontal
  cylinder: the centre card sits flat and forward (the focus) while the ones above and below tilt back
  along the curve. It flows up/down, or **Stop at Centre** snaps each card to the middle. **3D Curve**
  bends the cylinder from a flat vertical strip to a tight barrel.
- **Film Strip** — the horizontal sibling of Card Reel. A single row of cards wraps around a vertical
  cylinder: the centre card sits flat and forward (the focus) while the ones to the left and right
  tilt back. It flows left/right, or **Stop at Centre** snaps each card to the middle; **3D Curve**
  bends the cylinder from a flat horizontal row to a tight barrel.
- **Wheel Carousel** — cards fanned on a big Ferris-style wheel whose hub sits below the frame, so
  only the top arc shows. Each card rotates tangent to the wheel (upright at the top = the focus,
  tilting away at the sides) and the wheel steps around card by card. **Overshoot** lets a step sail
  past and settle, **Anticipation** winds it back first, and **Hold** pauses on each card; **Wheel
  Size** sets the radius.
- **Cover Flow** — the classic album cover flow: the centre card faces you, the immediate neighbours
  tilt to **Side Tilt** and recede, and further cards stack compressed behind. **One design covers
  both orientations** — set **Orientation** to Horizontal or Vertical (no need for two separate
  designs). **Stop at Centre** gives the snappy album-flick step.
- **Carousel Flow** — a flat focus carousel: the centre card is full size while the side cards scale
  down (**Side Card Scale**) and fade as they slide past. No tilt; Horizontal or Vertical.
- **Mosaic Marquee** — a horizontal marquee of cards packed masonry-style (varied sizes) that scrolls
  sideways forever. **Card Height** sets the tile scale (fewer, bigger rows as it rises) and **Layout
  1/2/3** pick three different mosaic patterns. Two identical grid copies wrap seamlessly.
- **Hero Reel** — a reel of thumbnail cards over a full-bleed hero background. The card stepping through
  the centre is the active one: it scales up (**Active Scale**) and lifts (**Active Lift**), and its
  image fills the whole stage as a dimmed (**Hero Opacity**), slowly-zooming (**Ken Burns**) hero behind
  the reel, cross-fading as the reel advances (**Hold** sets the dwell per card).
- **Focus Slider** — a centred-focus slider, horizontal or vertical. The card passing through the centre
  is focused: it scales up (**Center Scale**) and sits clean while its neighbours peek past on either
  side. **Slide Portion** sets the card spacing — low pulls them into a cinematic overlap, high spreads
  them apart — and **Zigzag Offset** pushes the off-centre cards alternately up and down (left/right when
  vertical), in an **Alternate** or **Fixed** pattern.

**Isometric**

- **Tilt Deck** — your photos lie flat on an isometric ground plane in a grid (**Columns × Depth**) and
  march diagonally across it. The tile passing through the focus point **lifts off the plane, rotates flat
  to face you and brightens** (**Focus Lift** / **Focus Brightness**), then settles back as the next one
  rises; tiles toward the back dim (**Depth Fade**). **Iso Tilt** sets how steeply the plane leans away —
  lower reads flatter, higher is a steeper top-down isometric. Set **Focus Lift** to 0 for a pure flat
  isometric grid with no pop. Runs on Continuous, Scroll-scrub or Static.
- **Iso Orbit** — your photos ride a ring lying flat on an isometric floor and **revolve** around its
  centre. The tile at the near point of the orbit **lifts off the plane, rotates flat to face you and
  brightens** (**Focus Lift** / **Focus Brightness**), then settles back as it carries on round; the far
  side dims (**Depth Fade**). **Orbit Size** sets the radius and **Iso Tilt** how steeply the floor leans.
  Spins Clockwise or Counter-clockwise, scrubs on scroll, or holds Static.
- **Iso Stack** — your photos are stacked into a **tower rising off the isometric floor** on a gentle
  spiral. As the slabs stream upward, the one passing through the focus height **lifts to face you and
  brightens** (**Focus Lift** / **Focus Brightness**), then flattens again as it carries on up and
  recycles; slabs toward the bottom dim (**Depth Fade**). **Stack Gap** sets how tall and airy the tower
  is and **Spiral** how much it twists (0 is a straight vertical stack). Streams Up or Down, scrubs on
  scroll, or holds Static.
- **Iso Cascade** — your photos **descend a diagonal staircase** across the isometric floor: high and
  far at the back, stepping down and toward you. The tile reaching the front of the cascade **lifts flat
  to face you and brightens** (**Focus Lift** / **Focus Brightness**), then recycles to the back; tiles
  toward the back dim (**Depth Fade**). **Spread** sets how far the staircase reaches across the floor
  and **Rise** how tall it is. Cascades Down or Up, scrubs on scroll, or holds Static.
- **Iso Fan** — your photos spread along a **flat arc** (a fan) on the isometric floor and **sweep**
  across it. The tile passing the centre-front **lifts flat to face you and brightens** (**Focus Lift** /
  **Focus Brightness**), then settles back as it sweeps on; tiles toward the edges dim (**Depth Fade**).
  **Fan Spread** opens the arc wider and **Fan Reach** sets how far the tiles sweep out from the centre.
  Sweeps Left or Right, scrubs on scroll, or holds Static.

**Orbit**

- **Orbit Bloom** — your photos form a ring that orbits a **tilted disc** and **breathes**: it blooms from
  a tight central cluster out to a wide ring and back, the cards fading and growing as they open. **Bloom**
  sets how far it contracts between breaths (0 = a steady ring), **Ring Tilt** how far the disc leans, and
  **Ring Size** the radius. Cards nearest you are brighter; the far arc dims (**Depth Fade**). Spins
  Clockwise/Counter-clockwise, scrubs on scroll, or holds Static.
- **Focus Orbit** — your photos orbit a tilted disc, and the card reaching the front **pulls into the
  centre, lifts toward you and enlarges into a hero**, then returns to the ring as the next takes its place
  — a rolling central feature. **Hero Pull** sets how strongly the front card leaps to the centre (0 = an
  even revolve, no hero); **Focus Brightness** highlights it. Spins Clockwise/Counter-clockwise, scrubs on
  scroll, or holds Static.
- **Dual Orbit** — two **concentric rings** of photos on one tilted disc, with a thin path drawn under
  each. Every third card rides the inner ring; the inner ring turns **the other way** (**Counter-rotate**)
  at its own pace (**Inner Ring Speed**, 100 = the same speed), so the two rings gear past each other.
  **Outer Ring Size** and **Inner Ring Size** set the radii, **Ring Tilt** the lean, and **Show Orbit
  Paths** turns the lines off. Galleries with fewer than 15 photos repeat them so both rings stay full.
- **Comet Orbit** — your photos travel **one elliptical orbit around a glowing focus**, with real orbital
  timing: they bunch up and **drift slowly along the far end**, then **whip past the focus**, flaring
  larger and brighter as they pass. **Eccentricity** stretches the ellipse (0 = an even circle), **Flare**
  sets how much the cards grow and brighten by the focus, **Orbit Tilt** the lean, and **Show Focus Glow**
  / **Show Orbit Path** turn the "sun" and the line on or off.
- **Orbit Swarm** — a cloud of photos, **each on its own orbit**: its own radius (**Spread**), its own
  pace (**Swirl** — inner orbits run faster, so cards overtake each other and the cloud shears into
  drifting arms) and its own **rise and sink** above the plane (**Height Drift**). Now and then the swarm
  **gathers** toward the centre and scatters back out (**Gather**, 0 = never). Galleries with fewer than
  16 photos repeat them so the swarm stays full.
- **Ring Tilt** — a steeply tilted **flat ring, like a planet's rings**. Unlike the other Orbit designs
  the photos are **not** turned to face you: they **lie in the ring plane** (the front of the ring reads
  upright) and stand up by **Card Lift** (0 = flat, 90 = upright, facing outward like standing stones).
  The ring turns around an optional shaded **planet** (**Show Planet**, **Planet Size**, **Planet
  Colour**) and slowly **rocks and precesses** (**Wobble**, 0 = steady). Landscape 4:3 tiles by default.
- **Gyro Orbit** — an **atom or gyroscope**: your photos are dealt round **2–4 rings** (**Rings**), each
  on its **own plane**, leaning by **Ring Lean** and fanned evenly round the vertical axis. Neighbouring
  rings run **opposite ways** around a glowing core (**Show Core Glow**), and the whole gyro slowly turns
  (**Gyro Spin**, 0 = the rings stay put). **Show Ring Paths** draws each ring as a real 3D circle. The
  photos repeat until each ring has at least five.
- **Infinity Orbit** — your photos loop a **figure-eight (∞)** on a tilted plane. Where the loops cross,
  **one pass rises over the other** (**Cross Height**, 0 = they meet flat). **Loop Width** and **Loop
  Height** shape the eight, **Plane Tilt** leans it, and **Show Path** draws the ∞ line. Direction is
  Forward or Reverse.
- **Vortex** — a **whirlpool**: your photos flow along a few **spiral arms** (**Arms**, 1–6) from the rim
  into a **glowing eye**, **sinking** (**Depth**), shrinking and darkening (**Fade to Eye**) on the way,
  then fade out and come back in at the rim. **Twist** sets how many turns an arm makes (negative turns
  it the other way), and **Tilt** how far you look into it (0 = straight down). Its Motion direction is
  **Inward** or **Outward** (a fountain). The photos repeat up to 24 so the arms read as spirals.
- **Pendulum Orbit** — your photos spread along an **arc** of a tilted orbit (**Arc Span**) that **swings
  back and forth like a pendulum** (**Swing**), easing to a stop at each end, instead of going round. One
  full swing takes one **Loop Duration** (8 s by default). The card passing the front is the brightest and
  largest. Direction picks which way it swings first; 0 Swing holds it still for **Drag to swing**.
- **Moon Orbit** — a **solar system of photos**: the first few photos (**Planets**, 2–6) are large cards
  orbiting the main ring, and every other photo is dealt to them as a smaller **moon** (**Moon Size**)
  circling its planet faster (**Moon Speed**) at **Moon Orbit** distance — orbits within orbits. The photos
  repeat until every planet has three moons.
- **Tiered Orbit** — **stacked rings** of photos at different heights (**Tiers**, 2–5; **Tier Spacing**,
  a % of the stage height), seen from slightly above (**View Height**). Neighbouring tiers turn **opposite
  ways** (**Alternate Directions**). **Taper** narrows the top like a **tree** (positive) or the bottom like a
  **tornado** (negative); 0 is a straight column. **Show Ring Paths** draws each tier. Unlike Panorama Wall,
  which wraps around you, you look at it from outside.

Every Orbit design runs Continuous, scrubs on scroll (with Pin), or holds Static, and can be grabbed and
spun by hand (**Drag to spin**, with **Drag Momentum**). The orbit-path lines, the glows and the planet
are decorative and hidden from screen readers. The path colour can be changed in Custom CSS
with `--tdg-track`.

**Grid**

- **Wave Grid** — your photos in a **Columns × Rows** grid lying on a tilted floor (**Floor Tilt**), with a
  **ripple running across it**: each photo rises on the crest (**Wave Height**), tips with the slope of the
  wave and catches the light (**Crest Brightness**). **Wave Starts From** the centre (rings), the left edge
  (straight swells) or the top-left corner (diagonal); **Wavelength** sets how many photos lie between two
  crests (small = choppy, large = long swells). Motion direction is **Outward** or **Inward**. At Floor Tilt
  0 the grid faces you and the wave pushes the photos straight out toward you.
- **Flip Grid** — a face-on grid of **two-sided cards**. Every **Loop Duration** (4 s by default) a wave of
  **3D flips** sweeps across it (**Flip Order**: a diagonal wave, random, or row by row) and each card turns
  over (**Flip**: sideways or head over heels) to show **the next photo** — so a small grid works through
  the **whole gallery**, set after set. Each card pops slightly toward you as it turns. Clicking a card
  opens the lightbox on that photo, and the lightbox steps through **every** photo in the gallery, not only
  the ones on show. **Drag to flip** (off by default) lets visitors flip through by dragging sideways; on
  Scroll-scrub the visitor's scroll does the flipping.
- **Magnet Grid** — a face-on grid that **follows the pointer**: the cards within **Reach** lift toward you
  (**Lift**), grow, brighten and turn to face the pointer, and the whole grid leans its way (**Grid Lean**).
  When no pointer is over it — or between touches on a phone — an invisible pointer **drifts** across the
  grid (**Drift when idle**; Direction: **Roam the whole grid** or **Stay near the centre**), so it is never
  still. On Scroll-scrub the visitor's scroll moves that drifting pointer; moving the real pointer over the
  grid always takes over.

On every Grid design the photos repeat to fill the grid when it has more cells than the gallery has
photos (Flip Grid instead cycles through all of them). **Gap** sets the space between cells as a % of a
card's width.

**Reveal & Wipe**

These show **one large photo at a time** and move to the next with a transition, so they work like a
hero slider. **Photo Size** sets the photo's width as a % of the stage (it shrinks to fit the Stage
Height), **Photo Ratio** its shape (16:9 by default) and **Corner Radius** its corners. **Autoplay** moves
to the next photo every **Loop Duration** (4 s by default) — the transition takes part of that time and
the photo holds still for the rest; **On Hover → Pause** stops it while the visitor looks. On
**Scroll-scrub** the visitor's scroll moves through the photos, and scrolling back runs it in reverse.
**Drag to change** (off by default) lets visitors drag sideways through the photos.

- **Blind Reveal** — the photo is cut into **Slats** (2–40) that **turn over in 3D one after another**,
  like Venetian blinds, each showing the next photo on its other side. Vertical slats turn sideways,
  horizontal ones head over heels. **Stagger** sets how far apart they start (0 = all at once, 100 = a
  slow ripple across); **Gap** leaves a thin seam between slats (0 = the photo looks whole at rest).
- **Iris Wipe** — the next photo **opens up over the current one through a growing shape**: a **circle**
  (an iris), a **diamond**, a **diagonal sweep** or **barn doors** parting from the middle. The incoming
  photo settles from a slight **Zoom** while the outgoing one pushes gently in (0 = a flat wipe); **Wipe
  Length** sets how much of each photo's time the wipe takes.
- **Tile Dissolve** — the photo **breaks into a grid of tiles** (**Columns × Rows**) that **fly toward
  you, spin and fade in a wave** — from the top-left corner, at random, or from the centre out — uncovering
  the next photo underneath. **Fly Distance** at 0 makes the tiles simply shrink and fade in place.

**Clicking the photo** opens the one on show — in the lightbox (On Card Click → Lightbox; the lightbox
steps through **every** photo in the gallery) or its link (Open Link). The photo is keyboard-focusable
when it has a click action (Enter opens it), and screen readers hear the current photo's alt text. Two
limits: these designs show the photo itself, so **captions are not shown on the photo**, and the per-card
**Entrance** (Style tab) has no effect — use the element's own Animations tab instead.

More designs are on the way — the picker groups them by family, so the list grows without the
element changing.

## Shared options

Every design shares the same surrounding controls, so switching design keeps your setup:

- **Motion** — Auto-rotate / Continuous, plus **Drag**, **Scroll-scrub** and **Static**. Under
  **Scroll-scrub** a **Rounds per scroll** control sets how far your scroll drives the deck across the
  pin: on a *rotating* design (Ring, Sphere, Orbit) it's **full turns**; on a *flowing* design (walls,
  tunnels, reels, strips) it reads as **passes** — the deck travels its whole length that many times.
- **Entrance** (Style tab) — reveal the cards one-by-one as the gallery scrolls in: **Fade + Rise**,
  **Scale**, **Blur**, **Slide** or **Flip**, with a stagger and distance. Combine it with a pinned
  **Scroll-scrub** for a full **scroll choreography** — the images fade in one by one at the start, the
  design scrubs (spins its Rounds / sweeps its passes) through the middle, then they dissolve one by one
  on the way out, all driven by the visitor's scroll.
- **Loop Duration (s)** — seconds for one full loop; *lower is faster*.
- **On Hover** — **Slow down** (default), **Pause**, or **Keep rotating**. It reacts to the gallery
  itself, not the empty stage around it.
- **Card Ratio / Corner Radius / Card Padding**, **Box Style** + **shadow**, and **captions**.
- **On Card Click** — opens the shared gallery **lightbox**. Off by default (the cards are moving).
- **Use as Section Background** — fill the parent Section behind its content; the gallery then
  auto-runs and stays non-interactive.

## Set it up

1. Add a **Motion Gallery** (builder palette → **Media Elements**) and add your **images**.
2. **Design** tab → pick a design, then tune its geometry.
3. Set **Loop Duration** and **On Hover** to taste.
4. **Save** — the scene renders and loops on the front end.

### Chain several galleries into one scroll sequence

Drop a few Motion Galleries down the page and **connect them into a single pinned scroll sequence** —
gallery 1 flies out *as* gallery 2 assembles in, and so on. **Any design can chain** — a Carousel Ring can
hand off to a Panorama Wall to a Card Sphere, each running its own motion across its slice of the scroll.

Set it up:

1. Put each gallery on **Motion → Scroll-scrub** with **Pin while scrubbing** on.
2. Turn on **Chain with adjacent galleries** (a switch in the gallery's settings) for every gallery you
   want linked. They can sit **stacked in one column or each in its own section** — the runtime auto-groups
   the adjacent chained galleries into one overlapping, pinned master timeline and overlaps each gallery's
   exit with the next one's entrance.

Each gallery keeps its own design and runs its own motion across its slice of the scroll; at the seams, one
fades out as the next fades in. It's fully reversible — untick **Chain** on any gallery to free it. (The
builder's right-click **Create choreography** helper is a one-click way to switch a set of galleries into a
chained sequence.)

## Performance & accessibility

- **Loads only when used** — the CSS + driver are enqueued only on pages with the element, and the
  **lightbox** ships only if you turn the click action on.
- **Reduced motion** renders a **static** scene — no spin, no scroll.
- **One rAF loop** per gallery drives every card; there's no per-card timer and no library.
