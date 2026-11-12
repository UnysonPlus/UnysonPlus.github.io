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

Add **Motion Gallery** from the builder palette → **Animation Engine**. Choose the cards' **Source** on the
**Content** tab, then pick a **Design** on the **Design** tab — each design reveals its own geometry
controls. The shared card controls (Entrance, Box Style, shadow, captions, click action) live on the
**Style** tab.

**Source** decides where the cards come from:

- **Media Library** (default) — the images you pick and order yourself.
- **Post Type** — the featured images of a post type's posts build the cards automatically and stay fresh
  as you publish. Pick the **Post Type** (any public type with featured images, e.g. Portfolio when that
  extension is active), the **Number of Cards** (1–200; only posts *with* a featured image become cards)
  and the **Order** (Newest first, Oldest first, Title A–Z or Menu order). Set **On Card Click** to
  **Open Link** to link each card to its post.

The element ships with the **Animation Engine** extension — activate it in **Extensions** if you
don't see it.

## The designs

**3D & Perspective**

- **Carousel Ring** — a ring of cards revolving around you. Tilt it back (**Ring Tilt**), open the
  loop up (**Ring Opening**), roll the whole ring to a diagonal (**Diagonal Tilt**), or rock it up and
  down as it spins (**Vertical Sway**, 0–45°), so you orbit it from shifting heights.
- **Panorama Wall** — a curved wall of cards scrolling sideways. **Curvature** is signed: negative
  wraps the wall *toward* you (concave), positive bulges it *away* (convex).
- **Card Sphere** — a spinning disco-ball of images. **Globe Size** zooms the sphere; **Card Size**
  sets how finely it tiles (the bands and card counts are derived to cover it).
- **Orbit Globe** — cards spread through the *inside* of a sphere rather than on its surface, each one
  facing you at its own depth, so the globe reads as a slowly orbiting cloud. **Globe Size** (40–95% of
  the stage's shorter side) zooms it; **Card Size** (8–30% of the globe) is also the density control —
  smaller cards pack the cloud with more of them; **Gap** thins it out; **Back Fade** dims the cards on
  the far side; **Tilt** (−45…45°, 27° by default) tips the orbit axis. Turns Left or Right.
- **Sphere Cascade** — the vertical sibling of Panorama Wall: **Columns** (2–5) of cards cascade up or
  down a curved surface. **Curvature** (−150…150) is signed: negative curves the grid into a concave
  bowl you look into, 0 is flat, and toward +150 it wraps into a full sphere. **Tilt** tips the surface,
  **Gap** spaces the cards, **Edge Fade** fades them toward the rim, and Direction runs **Up**, **Down**
  or **Alternate columns**.
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

**Spotlight & Focus**

These draw the eye to one photo, or one part of the gallery, at a time.

- **Spotlight Wall** — a **Columns × Rows** wall of photos in shadow (**Shadow Brightness**, **Shadow
  Greyscale**); a **spotlight glides from photo to photo**, holds, and moves on — in a random order that
  never repeats a photo twice in a row, or in reading order — bringing the photos in its pool up to full
  colour and growing them slightly (**Lift**). **Spotlight Size** sets the pool of light (bigger lights the
  neighbours too), **Move Time** how much of each stop is spent gliding, and **Autoplay**'s Loop Duration how
  long each stop lasts (3 s by default; Direction runs the order forward or backward). With **Follow
  Pointer** on (the default), the spotlight follows the visitor's pointer while they hover.
- **Focus Pull** — your photos float at several depths (**Layers**, 2–5; **Depth** between them), like a
  scene through a camera; the **focus racks** from the front layer to the back and back again (or starts
  at the back). The layer in focus is sharp and bright; the others **blur** (**Blur**, more the further
  away) and dim (**Dim**), and the photos in front of the focus turn partly see-through, like foreground
  blur, so the sharp layer always shows. **Drift** adds a gentle sideways parallax; **Photos** sets how
  many float in the scene (the gallery repeats to fill it); **Rack Time** how much of each stop the focus
  spends moving.
- **Loupe** — a **Columns × Rows mosaic** of small photos with a round **magnifying lens** gliding over
  it; inside the lens the photos show enlarged (**Zoom**, 220% by default). **Lens Size** and **Lens Ring
  Colour** style the lens. With **Follow Pointer** on, the lens follows the visitor's pointer while they
  hover; when idle it drifts (Direction: **Roam the whole mosaic** or **Stay near the centre**). With
  Motion **Static** the lens waits in the middle until someone hovers.

All three show the photos as cards, so captions, **click to open** (lightbox / link) and the per-card
**Entrance** work as on the other designs. On Loupe, clicks go to the photo beneath the lens. Scroll-scrub
moves the spotlight, the focus, or the lens with the visitor's scroll.

**Stack & Scatter**

Photos as physical prints and cards: piled, stacked, fanned and shuffled.

- **Photo Scatter** — a tabletop scatter of photos. Its **Motion** setting picks how they move:
  **Scatter in & out on scroll** (each set flies in, holds, and flies back out as the visitor scrolls),
  **Organize on scroll** (one pile untangles into a tidy grid), **Cycle automatically** (with **Dwell** and
  **Pause on Hover**), **Cycle on click**, or **Hold still**. The cycling modes add **Photos enter from**
  (all edges, top, bottom, left & right, random), **Photos exit toward** (nearest edge, up, down, left &
  right, gather into a pile, or fade in place), **End on an organized grid** and **Leave a few in the
  corners**. **Cards per Set** sets how many photos rest on the table at once; **Rotation Range**, **Size
  Variance**, **Spread** and **Keep center clear** shape the scatter.
- **Card Stack** — a deck with the top card featured and the rest peeking behind (**Cards Behind**,
  **Stack Offset**, **Stack Shrink**). The top card peels away (**Top card leaves**: down, up, left or
  right) and the next comes forward. **Advance** sets the pace: **On scroll** (one card per scroll),
  **Automatically** (with a **Dwell** time) or **Off** (the top card only).
- **Card Fan** — your photos are held like a **hand of playing cards**, fanned (**Fan Spread**) around a
  pivot below them (**Pivot Depth**: deeper makes a flatter, wider arc). A highlight sweeps along the hand
  and back: the card it reaches **rises** (**Lift**), turns upright (**Straighten**) and comes forward while
  the others darken (**Dim**). **Cards in Hand** sets how many cards the hand holds (the gallery repeats to
  fill it), **Sway** gently rocks the whole hand, and **Move Time** sets how much of each step the
  highlight spends moving. **Direction** sets where the highlight starts: **Start on the left** or **Start
  on the right**. With **Follow Pointer** on (the default), the card the visitor points at rises;
  with Motion **Static** the first card stays raised until someone points.
- **Shuffle Deck** — a loose deck of photos, the ones behind (**Cards Behind**) peeking out up and to the
  side (**Deck Offset**), each leaning its own way (**Jitter**; 0 makes a neat deck). The top photo
  **slides out** to the side (**Slide Distance**, turning by **Slide Tilt**), then **tucks back in at the
  bottom** while the others move up one place. Direction: **Alternate sides**, **Always to the right** or
  **Always to the left**; **Shuffle Time** sets how much of each step the shuffle takes (the deck rests for
  the rest).
- **Polaroid Drop** — your photos become **instant prints** (a white frame with a deeper bottom margin;
  **Frame Colour** changes it) that **drop one by one onto a pile**, each landing at its own spot
  (**Scatter**) and angle (**Max Tilt**) with a small bounce. Direction: **Drop from above**, or **Toss in
  from the camera** (the print starts big, close to you, and falls onto the table). **Pile Size** sets how
  many prints lie on the pile; **When Full** either slides the oldest print away as each new one lands,
  or **sweeps the whole pile off** and starts a new one. **Drop Time** sets how much of each step the drop
  takes.

Card Fan, Shuffle Deck and Polaroid Drop show the photos as cards, so captions, **click to open**
(lightbox / link) and the per-card **Entrance** work as on the other designs. Scroll-scrub moves the
highlight, the shuffle, or the drops with the visitor's scroll. If the cards are too big for the **Stage
Height**, they shrink to fit it. Polaroid Drop draws its own frame, so it has no Card Padding.

**Devices & Screens**

Your photos shown on device screens, for app, product and website showcases.

- **Device Cycler** — one device frame (laptop, tablet, phone, browser or none) whose **screen changes**
  through your photos, one at a time (**Cycle Screens**: on scroll, automatically with a **Dwell**, or off),
  with a **Transition** of **Cross-fade**, **Slide up** or **Cut**.
- **Phone Lineup** — every photo on the screen of a **3D phone**: a thin black bezel round the screen, a
  metal frame (**Frame Colour**, graphite by default) whose sides show as the phones turn (**Thickness**; 0
  makes flat screens), the side buttons, and a back with a camera block. The phones (**Phones**)
  stand in a shallow V: the centre one nearest, the others stepping back (**Depth**) and turning toward it
  (**Turn**), spaced by **Spacing** (under 100 they overlap). The lineup **turns like a carousel** (Left or
  Right), phones shrinking away at one end and growing back at the other; **Stop at Centre** (on by default) holds each
  phone in the middle for the Loop Duration (**Move Time** sets how much of each step it spends moving),
  and **Float** adds a gentle bob. Visitors can **drag** the
  lineup (**Drag to spin**, with **Drag Momentum**). Use 5 or more phones so the ends fade smoothly.
- **Window Stack** — every photo in a **browser window** (title bar with the three buttons; **Title Bar
  Colour**). The windows are stacked in a tilted 3D pile (**Tilt**, **Turn**), each set back (**Depth Gap**)
  and up to the side (**Offset**) from the one in front, the deeper ones darker (**Dim**). The front window
  leaves (Direction: **comes toward you** or **drops away**) while the others move forward and it reappears
  at the back. **Windows Behind** sets how many show behind the front one, and **Move Time** how much of
  each step the change takes.
- **Device Trio** — a **laptop** with a **tablet** and a **phone** floating in front of it (**Depth**). The
  photos are dealt round the three devices (laptop, tablet, phone, laptop, …) and the **screens change one
  device at a time**; the Loop Duration is the time between changes. The devices float gently (**Float**)
  and the group sways (Direction: **Gentle sway** or **Hold still**) and, with **Follow Pointer**, turns
  toward the visitor's pointer, up to **Tilt**. **Size** is the laptop's width; the tablet and phone scale
  with it. Give it at least three photos (fewer are repeated so every screen has one).

On all three, each screen is a real photo card: captions and **click to open** (lightbox / link) work, and on
Phone Lineup and Window Stack the per-card **Entrance** works too. Device Trio shows one photo per screen at
a time, so use the element's Animations tab for its entrance. If the devices are too big for the **Stage
Height**, they shrink to fit it.

**WebGL (real 3D)**

These eighteen are drawn with real 3D graphics (WebGL), so they can do what CSS 3D can't: real lights, shadows and
reflections, shader effects, thousands of particles, breaking glass, water, jelly, soap bubbles, holographic foil,
and cloth, film and paper that bend. The other designs are built from CSS 3D, which is lighter. Mirror Ring, Depth
Field, Wave Wall, Cloth Banners, Fold Strip, Water Pool, Jelly Grid, Gallery Walk, Holo Cards, Domino Row, Photo
Bubbles and Film Ribbon show many photos at once; Liquid Slider, Particle Morph, Flip Book, Shatter and Stage
Curtain and Photo Cube show **one photo at a time**.

<img src="/img/animation-engine/motion-gallery/webgl-mirror-ring.png" alt="Mirror Ring: photos on a ring above a glossy floor that mirrors them, the ones facing away in shadow" width="1920" />

- **Mirror Ring** — your photos stand on a turning ring above a glossy floor that reflects them, lit by a key
  light and a rim light, so the photos facing away fall into shadow. **Ring Size** (40–160 %) widens the ring,
  **Camera Height** (0–45°) looks down on it, **Floor Reflection** (0–100 %) sets how strongly the floor mirrors
  the photos, and **Floor Glow** tints a soft disc of colour under the ring. Grab it and drag to spin it
  (**Drag to spin**, **Drag Momentum**). Up to 40 photos.

<img src="/img/animation-engine/motion-gallery/webgl-depth-field.png" alt="Depth Field: photos floating at different depths, near ones large and sharp, far ones fading into the background" width="1920" />

- **Depth Field** — photos float at real depth and drift toward you (or **Away from the viewer**), fading out of
  the fog far away and past you up close. Move the pointer and the camera follows it (**Pointer Parallax**,
  0–100 %), so near photos shift more than far ones. **Photos in the Field** (4–60, the gallery repeats to fill
  it), **Depth**, **Spread** and **Fog** set the scene. **Fog Colour** is what distant photos fade into; left
  empty, it is the Stage Background or, failing that, the colour behind the gallery on the page.

<img src="/img/animation-engine/motion-gallery/webgl-wave-wall.png" alt="Wave Wall: a grid of photos on a rippling surface, each tilted with the wave and lit differently" width="1920" />

- **Wave Wall** — a grid of photos (**Columns** 2–12, **Rows** 1–8) on a rippling surface; each photo tilts with
  the wave and catches the light, so highlights roll across the wall. **Wave Height**, **Wave Length**, **View
  Angle** (look up at the wall), **Light Angle** (where the key light comes from), **Gloss** and **Gap** shape it.
  Point at a photo and it lifts out of the wall.

Those three share **Lighting** (Soft, Studio or Dramatic), **Card Size**, **Card Ratio**, **Corner Radius**,
**Stage Height** and **Stage Background**, the usual **Motion** (an automatic loop, **Scroll-scrub** with an
optional pin, or **Static**) and **On Hover** (keep going, slow down or pause). Clicking a photo opens the
lightbox or its link, exactly as on the other designs.

*One photo at a time.* These three fill the stage with one photo and change to the next with an effect. Their
**Motion** is **Autoplay** (**Loop Duration** is the seconds each photo stays, 2–20, **Forward** or
**Backward**), **Scroll-scrub** (the scroll walks through the photos; with **Pin** on it holds the gallery while
it does) or **Static** (the first photo). **Move Time** is how much of each photo's time the change takes; the
photo holds still for the rest. With **Swipe to change** on (the default), visitors swipe or drag left and right
for the next and previous photo, and moving keyboard focus to a photo in the hidden list changes to it. They load
each photo at full size, so the picture stays sharp across the stage.

[WebGL Object](/animation-engine/webgl-object)'s **Image Transitions** and **Image Particles** presets draw
similar effects as a decoration or a background. Use these Motion Gallery designs when the photos are a gallery:
they come from the gallery's own list, open the lightbox or their links, can be swiped and scrubbed on scroll,
and stay readable to screen readers and search engines.

<img src="/img/animation-engine/motion-gallery/webgl-liquid-slider.png" alt="Liquid Slider mid-change: the next photo flowing into the current one along a soft, wavy front" width="1920" />

- **Liquid Slider** — the photo fills the stage, cropped to fit, never stretched, and the next one arrives through a
  **Transition**: **Liquid** (it flows in along a soft, moving front), **Ripple** (a ring of waves opens from
  the centre and carries it in), **Slices** (strips slide in one after another), **Swirl** (the photo twists
  into the next), **Pixelate** (the photo breaks into growing blocks, swaps, then sharpens), **Glitch** (bands
  of the picture jump sideways while it swaps), **Kaleidoscope** (the photo folds into turning mirrored segments
  and opens out on the next), **Torn Paper** (the photo is torn away from the right, with a white paper edge),
  **Burn** (the photo burns away along a glowing, charred edge), **Zoom Blur** (it rushes toward you in a blur and
  settles on the next), **Mosaic** (it changes square by square, in a random order) or **Ink** (the next photo
  spreads out from the middle like ink in water, with a dark edge). **Strength** (0–100 %) sets how much the change distorts the photos, **Pointer Ripple**
  (0–100 %) sends soft ripples out from the pointer, and **Slow Zoom** (0–20 %) zooms gently in and out on each
  photo. **Corner Radius** rounds the stage's corners. Clicking opens the photo on screen.

<img src="/img/animation-engine/motion-gallery/webgl-particle-morph.png" alt="Particle Morph: a photo of a yellow house drawn as coloured dots, the dots starting to burst apart" width="1920" />

- **Particle Morph** — each photo is drawn as thousands of coloured particles, and they leave the picture and
  gather into the next one. **Transition**: **Explode** (burst outward and gather), **Swirl** (spin round the
  centre), **Drift** (blown sideways) or **Rain** (fall and rise again). **Particles Across** (40–240) is how
  many particles make one row of the picture: more shows finer detail and costs more. **Particle Size**
  (40–160 %) is their size against the space between them: under 100 shows a dotted picture, over 100 a solid
  one. **Scatter** (0–100 %) is how far they fly, and **Pointer Push** (0–100 %) moves them out of the
  pointer's way. Photos from another site need that site to allow it (CORS); without it they show as grey
  particles.

<img src="/img/animation-engine/motion-gallery/webgl-flip-book.png" alt="Flip Book: an open book lying back, its right-hand page bending as it turns over" width="1920" />

- **Flip Book** — an open book with two photos to a spread; each page bends and catches the light as it turns.
  **Book Size** (20–95 % of the stage width), **Tilt** (0–60°, how far it lies back as if on a table), **Page
  Curl** (0–100 %; 0 = stiff card pages), **Cover Colour** (the board round the pages), **Lighting**, **Page
  Ratio** and **Corner Radius**. **Loop Duration** here is the seconds per spread. Swiping turns the pages back
  and forth; clicking a page opens its photo.

<img src="/img/animation-engine/motion-gallery/webgl-shatter.png" alt="Shatter: the photo of a cliff breaking into shards from the centre, the next photo showing through the gap" width="1920" />

- **Shatter** — the photo breaks into pieces that turn, catch the light and fly off, revealing the next photo
  behind. **Pieces**: **Shards** (broken glass) or **Tiles** (square pieces); **Break**: **Toward you**, **Fall
  away** or **Burst outward**; **Breaks From**: the centre, the left edge, the top edge, or everywhere at once.
  **Pieces Across** (4–30) sets their size, **Spin** how much they turn and **Force** how far and fast they fly.

<img src="/img/animation-engine/motion-gallery/webgl-stage-curtain.png" alt="Stage Curtain: a photo framed by red velvet curtains drawing in from both sides, a pleated valance across the top" width="1920" />

- **Stage Curtain** — the photo stands on a stage between two pleated velvet curtains. For each change the
  curtain draws closed, the photo changes behind it, and the curtain opens again on the next one; open, the
  halves stay gathered at the sides. **Curtain Colour**, **Pleats** (4–20 folds per half), **Opening** (how much
  of the stage it leaves clear), **Swag** (how far the inner lower corners lift as it opens; 0 = it slides
  straight) and **Valance** (a pleated band across the top). The curtain is lit from the side, so the pleats
  shade like cloth.

<img src="/img/animation-engine/motion-gallery/webgl-photo-cube.png" alt="Photo Cube: a lit cube mid-turn, one photo on its front and the next turning in on its side, with a shadow beneath" width="1920" />

- **Photo Cube** — the photo is on the front of a lit cube, which turns a quarter-turn to bring the next photo
  round, casting a soft shadow on the floor. **Turn**: **Sideways** (it turns round) or **Roll forward** (it
  tips over its top edge). **Cube Size** (20–90 % of the stage height), **Camera Height**, **Float** (a gentle
  bob), **Cube Colour** (the two faces that never come to the front), **Shadow**, **Lighting** and **Corner
  Radius**. The photos are cropped square to fit the faces.

*Many photos at once, in motion.*

<img src="/img/animation-engine/motion-gallery/webgl-cloth-banners.png" alt="Cloth Banners: photos printed on fabric banners hanging from a dark rod, each rippling in the wind" width="1920" />

- **Cloth Banners** — your photos printed on fabric banners hanging from a rod. The wind sends waves down the
  cloth, stronger toward the free bottom edge, and the folds catch the light; point at a banner and it catches
  a gust. **Motion → Drift along the rod** slides the row along (Loop Duration is the time for every photo to pass;
  **Static** holds it still, the cloth still moving), and Scroll-scrub moves it with the scroll. **Banners in
  View** (2–8), **Wind**, **Ripples** (waves per banner), **Gap**, **View Angle**, **Rod Colour**, **Lighting**,
  **Banner Ratio** and **Corner Radius**.

<img src="/img/animation-engine/motion-gallery/webgl-fold-strip.png" alt="Fold Strip: photos on a paper strip folded like an accordion, alternate panels in light and shade" width="1920" />

- **Fold Strip** — your photos on a paper strip folded like an accordion, flowing sideways; alternate folds face
  toward and away from the light. With **Unfold on Hover** on, the strip flattens out while the pointer is over
  it, so the photos are easy to see; point at a panel and it lifts. **Panels in View** (3–12), **Fold** (0–70°),
  **View Angle**, **Lighting**, **Panel Ratio** and **Corner Radius**; **Drag to slide** (with **Drag
  Momentum**) lets visitors move it by hand.

<img src="/img/animation-engine/motion-gallery/webgl-water-pool.png" alt="Water Pool: a grid of photos seen through blue water, their edges bent by ripples" width="1920" />

- **Water Pool** — your photos lie at the bottom of a pool, on a floor of the water's colour. Move the pointer
  over the water and ripples spread out from it, bending the photos underneath and catching the light; with
  **Rain** above 0, drops also land on their own now and then. **Motion → Drift under the water** slowly moves
  the photos along the floor, wrapping round (Loop Duration is one full pass); Scroll-scrub moves them with the
  scroll. **Columns** (2–8), **Rows** (1–5), **Gap**, **Ripple Strength** (how much they bend the photos),
  **Rain**, **Shine** (how brightly they catch the light), **Water Colour**, **Card Ratio** and **Corner Radius**.
  Clicking opens the photo under the pointer.

<img src="/img/animation-engine/motion-gallery/webgl-jelly-grid.png" alt="Jelly Grid: a lit grid of photos, the ones under the pointer bulging toward the viewer" width="1920" />

- **Jelly Grid** — a lit grid of photos that behave like jelly: the photos near the pointer bulge toward you and
  wobble as it passes, overshooting and settling, and the light rolls over their curves. A click makes a photo
  jiggle before its lightbox or link opens. **Columns** (2–10), **Rows** (1–6), **Gap**, **Jelly** (how far they
  bulge), **Wobble** (how springy they are), **Wave** (a gentle swell that rolls across the grid on its own;
  Scroll-scrub rolls it with the scroll), **View Angle**, **Gloss**, **Lighting**, **Card Ratio** and **Corner
  Radius**.

<img src="/img/animation-engine/motion-gallery/webgl-gallery-walk.png" alt="Gallery Walk: a corridor with framed photos on both walls, receding into haze" width="1920" />

- **Gallery Walk** — a slow walk down an art-gallery corridor with your photos framed on both walls, two to a
  step, each in a soft pool of light, the far end fading into haze. **Motion → Walk** moves you along (Loop
  Duration is one pass past every photo; **Backward** walks back); Scroll-scrub walks with the scroll. Move the
  pointer and the view turns toward it (**Look Around**, 0 = straight ahead). **Wall Colour**, **Floor Colour**
  (a glossy floor), **Frame Colour**, **Mat** (a white mount inside each frame), **Light Pools**, **Spacing** and
  **Picture Ratio**. Clicking a picture opens it.

<img src="/img/animation-engine/motion-gallery/webgl-holo-cards.png" alt="Holo Cards: four photo cards, the one under the pointer tilted and tinted by a rainbow foil" width="1920" />

- **Holo Cards** — your photos as collectible cards with a holographic foil. Point at a card and it tilts toward
  the pointer and lifts; the foil shifts colour as it turns and a spot of glare follows the pointer. With the
  pointer away, the cards sway gently (**Motion → Shimmer**, or with the scroll) so the foil keeps catching the
  light. **Columns** (1–8), **Rows** (1–4), **Gap**, **Foil** (strength), **Foil Pattern** (**Rainbow** bands,
  **Sparkle** glittering flecks or fine etched **Lines**), **Tilt** (0–35°), **Glare**, **Card Ratio** and
  **Corner Radius**.

<img src="/img/animation-engine/motion-gallery/webgl-domino-row.png" alt="Domino Row: photos standing as dominoes, the first few toppled onto the next, with shadows on the floor" width="1920" />

- **Domino Row** — your photos stand in a row like dominoes, casting real shadows on the floor. They topple one
  after another, each coming to rest on the next and the last falling flat, then stand back up from the far
  end (**Motion → Topple and reset**; Loop Duration is the whole cycle). With Scroll-scrub the scroll knocks
  them down and scrolling back stands them up. **Dominoes** (4–16; the gallery repeats to fill the row),
  **Spacing** (wider gaps let each lean further), **View Angle**, **Camera Height**, **Domino Colour** (the
  edges), **Shadows** (off is lighter for slow devices), **Domino Ratio** and **Corner Radius**. The camera fits
  the whole row, standing and fallen, at any angle.

<img src="/img/animation-engine/motion-gallery/webgl-photo-bubbles.png" alt="Photo Bubbles: photos inside soap bubbles of different sizes, their rims shimmering with rainbow colours" width="1920" />

- **Photo Bubbles** — your photos inside soap bubbles that float up (or sink: **Motion → Float**, **Rise** or
  **Sink**), wobbling as they go, their rims shimmering with thin-film colours and a window highlight on each. Move
  the pointer among them and they drift out of its way; pointing at one swells it a little. **Bubbles** (4–30;
  the gallery repeats to fill them), **Bubble Size**, **Iridescence**, **Depth** (how far they spread toward and
  away from you), **Wobble** and **Pointer Push**. The photos are cropped round to fit the bubbles.

<img src="/img/animation-engine/motion-gallery/webgl-film-ribbon.png" alt="Film Ribbon: a strip of dark film with sprocket holes curving across the stage, a photo in each frame" width="1920" />

- **Film Ribbon** — your photos on a strip of film with sprocket holes, flowing along a curving path through
  space and twisting about its length, so the light runs across it. **Motion → Flow** moves the film along (Loop
  Duration is one pass of every photo); Scroll-scrub winds it with the scroll. **Frames in View** (3–10),
  **Wave** (how far it curves; 0 = straight), **Twist**, **Film Colour**, **Sprocket Holes**, **Lighting** and
  **Frame Ratio**. Clicking a frame opens its photo.

How they behave on the page:

- **Weight:** Three.js and the WebGL script load only on pages that use a WebGL design. The 3D renderer is
  created when the gallery comes near the screen and released when it scrolls far away, so a page can hold
  several of them, and nothing renders while the gallery is off screen or the tab is hidden.
- **Accessibility:** the photos also stay in the page as the usual list of images and links, so screen readers
  and search engines read them as before. Moving keyboard focus to a photo brings it to the front of the scene
  (or, on the one-photo designs, changes to it) and outlines the gallery.
- **No WebGL** (a very old browser, or WebGL switched off): the photos show as a plain grid instead.
- **Reduce motion**, and the Live Editor's Edit canvas: one still frame, no movement.
- **Entrance:** the photos fade and rise in one after another the first time the gallery comes into view. The
  element's Animations-tab Entrance and Exit play on the gallery as a whole (the photos are drawn on the canvas,
  so they can't cascade photo by photo).
- The builder's in-modal preview draws these designs for real, with placeholder cards.

More designs are on the way — the picker groups them by family, so the list grows without the
element changing.

## Shared options

Every design shares the same surrounding controls, so switching design keeps your setup:

- **Motion** — three modes, each showing only its own settings:
  - the design's **own motion** (Continuous, Auto-rotate, Autoplay…), with **Loop Duration**, **Direction**
    and **On Hover**;
  - **Scroll-scrub** — the visitor's scroll drives the motion. **Pin while scrubbing** (on by default) holds
    the gallery on screen for the **Scroll Length** (1–5 screen-heights, 2.5 by default), and **Rounds per
    scroll** sets how far the scroll drives it: on a *rotating* design (Ring, Sphere, Orbit) it's **full
    turns**; on a *flowing* design (walls, tunnels, reels, strips) it reads as **passes** — the deck travels
    its whole length that many times;
  - **Static** — no motion.

  Separately, most designs have **Drag to spin** (visitors grab and spin it by hand, on top of any mode)
  and **Drag Momentum** (it keeps spinning after they let go).
- **Entrance** (Style tab) — reveal the cards one-by-one as the gallery scrolls in: **Fade + Rise**,
  **Fade + Scale**, **Fade + Blur**, **Slide In** or **Flip In**. **Sequence spread** (0–90) sets how
  staggered the cascade is (0 = all together), **Rise / slide distance** (0–120 px) how far each card
  travels, and **Animate out on leave** fades and sinks them back out as the gallery scrolls off the top. Combine it with a pinned
  **Scroll-scrub** for a full **scroll choreography** — the images fade in one by one at the start, the
  design scrubs (spins its Rounds / sweeps its passes) through the middle, then they dissolve one by one
  on the way out, all driven by the visitor's scroll.
- **Entrance and Exit animations** (Animations tab) — the [Entrance Animation](/animation-engine/entrance-animation)
  and [Exit Animation](/animation-engine/exit-animation) cards play **photo by photo** while the design keeps moving: a
  ring's photos zoom in one by one as it turns, then leave one by one (last in, first out) as the gallery
  scrolls off the screen, and come back when it returns. Any of the 56 entrances and 43 exits works, with
  Sequence Items, Stagger, delay and duration. A **new** Motion Gallery starts with a *Zoom In, one by
  one* entrance already added. Use this **or** the Style-tab Entrance, not both. The one-photo designs
  (Reveal & Wipe, Device Cycler, Device Trio), Photo Scatter and a gallery on pinned Scroll-scrub
  animate as one block.
- **Loop Duration (s)** — seconds for one full loop; *lower is faster*.
- **On Hover** — **Slow down** (default), **Pause**, or **Keep rotating**. It reacts to the gallery
  itself, not the empty stage around it.
- **Card Ratio / Corner Radius / Card Padding**, **Box Style** + **Card Shadow** — see
  [Card Ratio](#card-ratio) below for the shapes.
- **Captions** (Style tab) — **None**, **Overlay on Hover** or **Below the Image**, read from the **Caption
  Source**: the image's Caption, Title, Alt Text or Description.
- **On Card Click** — **Do Nothing** (the default; the cards are moving), **Open Lightbox** (the full image
  in the shared gallery lightbox), or **Open Link**: each card's own link — its post's page with the Post
  Type source, or the image's **Link URL** field in the Media Library. Links to other sites open in a new
  tab.
- **Stage Height** (730 px by default; px or vh), **Stage Overflow** and **Stage Background** — on each
  design's options. **Stage Overflow** is **Clip to stage** (the default) or **Spill**, which shows fanned or
  oversized cards in full beyond the stage (it only changes what's visible, so leave room around the
  gallery). Leave **Stage Background** empty for a transparent stage.
- **Use as Section Background** — fill the parent Section behind its content; the gallery then
  auto-runs and stays non-interactive.

## Card Ratio

**Card Ratio** sets the shape of every card, so the same design can show wide landscape photos,
square album covers or tall phone-shaped shots. It sits on the **Design** tab with the chosen design's
own controls. Some designs name it after what they show: **Tile Ratio** (Tilt Deck, Iso Orbit, Iso
Cascade, Iso Fan), **Slab Ratio** (Iso Stack), **Photo Ratio** (Blind Reveal, Iris Wipe, Tile
Dissolve), **Screen Ratio** (Phone Lineup, Device Cycler) and **Window Ratio** (Window Stack). Card
Tunnel and Device Trio have no ratio control: their cards are sized to the wall or the device.

| Choice | Shape |
|---|---|
| **Square (1:1)** | Album covers; the default on most designs. |
| **Landscape (4:3)** | Wider than tall. |
| **Wide (16:9)** | Cinematic, letterbox-shaped cards. |
| **Portrait (3:4)** | Taller than wide, like a magazine cover or a poster. |
| **Portrait (4:5)** | The Instagram-portrait shape: tall, but not as narrow as 3:4. |
| **Tall (9:16)** | Full-height, story / Reel-shaped cards. |
| **Original — mixed** | Every card keeps its **own** image's shape (see below). |

With a fixed ratio, each photo **fills** its card and the overflow is cropped, so pick the ratio
closest to your photos (portrait photos in a Portrait gallery lose nothing).

### Original — mixed

**Original — mixed (keep each image's shape)** stops forcing one shape: each card takes its own
image's real proportions from the Media Library, so a gallery of mixed portrait, landscape and square
photos shows them all at their natural sizes, with nothing cropped. The cards keep the same width and
their heights follow the photos.

- **Supported on** the flat-card designs: Cover Flow, Carousel Flow, Card Reel, Film Strip, Focus
  Slider, Hero Reel, Card Stack, Shuffle Deck, Card Fan, Photo Scatter, Polaroid Drop, Carousel Ring,
  Spiral Stream and Depth Stack.
- **Other designs** build their geometry from one shared card shape (the sphere's tiling, the grids,
  the device frames), so on them *Original* falls back to **Square**.
- An image added by URL (not from the Media Library) has no known size, so its card uses Square.

### Tall shapes and Card Size

**Card Size** (or Tile / Slab / Planet / Phone / Window Size) is a **width**, as a % of the stage, and
the height follows the ratio. Switching a gallery from Square to Portrait or Tall therefore makes every
card *taller* at the same width, and on a short stage the tops and bottoms can be cut off by the frame,
which makes portrait cards look square. Lower **Card Size** when you pick a taller shape (or raise the
gallery **Height**). A simple rule: multiply the size by the old height ÷ new height. For example
Square at 46% becomes about 34% for Portrait (3:4) and 26% for Tall (9:16).

**See it live:** the [Cover Flow demo](https://demos.unysonplus.com/motion-gallery/cover-flow/) shows
the same gallery once per ratio, one section each (all landscape, all wide, all square, all portrait,
4:5, all tall and Original — mixed), and every design's demo page has the same set of ratio sections.

## Set it up

1. Add a **Motion Gallery** (builder palette → **Animation Engine**) and add your **images**.
2. **Design** tab → pick a design, then tune its geometry, including its **Card Ratio** (lower the
   **Card Size** for the tall shapes).
3. Set **Loop Duration** and **On Hover** to taste.
4. **Save** — the scene renders and loops on the front end.

### Chain several galleries into one scroll sequence

Drop a few Motion Galleries down the page and **connect them into a single pinned scroll sequence** —
gallery 1 flies out *as* gallery 2 assembles in, and so on. **Any design can chain** — a Carousel Ring can
hand off to a Panorama Wall to a Card Sphere, each running its own motion across its slice of the scroll.

Set it up:

1. Put each gallery on **Motion → Scroll-scrub** with **Pin while scrubbing** on.
2. Turn on **Chain with adjacent galleries** (Style tab, under Entrance) for every gallery you
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
