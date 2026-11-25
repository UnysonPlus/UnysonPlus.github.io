---
sidebar_position: 1
title: Interactions
slug: /interactions
description: Hover, click, page-load, page-start, in-view, scrolled-past, mouse-move and component-event triggers that animate an element and other elements on the page, in up to three steps.
---

# Interactions

**One trigger, many targets.** An Interaction starts on one element, when it is hovered, clicked, loaded or scrolled to, and plays a short list of steps. Each step can animate **a different element**: the element itself, elements inside it, or any element on the page.

That covers the patterns a single effect cannot:

- **Hover a card:** the card lifts, its picture zooms and its arrow slides.
- **Click a button:** a panel elsewhere on the page slides in, and a second click slides it away.
- **Scroll past the hero:** the header shrinks, or a badge further down reacts.

## Live demo

**→ [See it in the Animation Engine demos](https://demos.unysonplus.com/animation-engine/interactions/)**. Every example there is live: hover cards, a click-to-open panel, a staggered in-view row, a page-load heading and a scrolled-past badge.

<img src="/img/animation-engine/interactions/interactions-hover-demo.png" alt="The hover demo: the middle card lifted, its picture zoomed and its arrow nudged, while the other two cards rest" width="1250" />

## Where to find it

Open any element's **Animations** tab, click **Add Animation**, and choose **Interactions** (under *Interaction*). Pick a trigger, then set up the steps.

<img src="/img/animation-engine/interactions/interactions-card.png" alt="The Interactions card: the trigger tiles with On hover chosen, then Runs on, Amount on tablet and phone, Runs for, Matches and Use on every page" width="1240" />

An element can have **two** Interactions, for example a hover *and* a click. It needs the **Animation Engine** extension.

## Triggers

| Trigger | When it plays | Playing it back |
| --- | --- | --- |
| **On hover** | The pointer moves onto the element, or keyboard focus moves into it. | Plays backwards when the pointer leaves. |
| **On click** | The element is clicked. | **Clicking again:** plays it backwards (a toggle), plays it again from the start, or does nothing (plays once). |
| **On page load** | As soon as the page has loaded (images and fonts included). | Plays once. |
| **Page starts loading** | The instant the page *begins* to load — before images and fonts — for an intro that must start at once. | Plays once. |
| **In view** | A fifth of the element has scrolled into view. | **When it leaves the screen:** play it backwards (so it plays again next time), or keep the end state. |
| **Scrolled past** | The element's bottom has scrolled above a line *N* px from the top of the screen (80 by default). | Plays backwards when you scroll back above the line. |
| **A saved Interaction** | Plays an Interaction saved from the Live Editor, with its own trigger: see [Saved Interactions](#saved-interactions). | As that Interaction's trigger. |
| **Mouse move** | The pointer moves over the element, or anywhere on the page. The steps follow the pointer instead of playing once: see [Mouse move](#mouse-move). | Glides back to its own look when the pointer leaves, or stays. |
| **Component event** | Another component on the page fires its own event: a menu, dropdown or panel opens or closes, a **tab** changes, or a **slider** changes slide. See [Component event](#component-event). | **Opens** plays forwards and reverses when it closes; a tab or slide change replays. |

## Repeat and back and forth

On **On hover**, **On click**, **On page load**, **Page starts loading**, **In view** and **Component event**, two more options shape how the steps play:

| Option | Default | What it does |
| --- | --- | --- |
| **Repeat** | Play once | **2 times**, **3 times**, **5 times**, or **Forever (while it is on)**: while hovered, until the second click, while in view. |
| **Back and forth** | No | Each time plays forwards and then back, so it ends where it started (a heartbeat, a bell's swing). Without it, each time starts again from the beginning. |

Hovering out, clicking again or scrolling away stops the repeats and plays it back as usual.

**→ [See it on the Interactions demo page](https://demos.unysonplus.com/animation-engine/interactions/)** (scroll to
*Repeat · Back and forth*): a heart that beats while hovered, a bell that swings five times when clicked.

## Saved Interactions

Make an Interaction once and use it on any element, kept in step everywhere:

1. **Save it:** in the [Live Editor](/extensions/live-editor), select an element with the Interaction, open its
   **Interaction timeline** and click **Save as preset**, then give it a name.
2. **Use it:** on any element, **Animations → Add Animation → Interactions → A saved Interaction**, and pick it from
   **Saved Interaction**.
3. **Change it:** edit the Interaction on any element and save it again **under the same name**: every element
   that uses it changes too.

**Theme Settings → Site-wide UX → Interactions → Saved Interactions** lists them (name, trigger, date) with a
**Delete** link. An element whose saved Interaction was deleted stops playing it.

### Import / Export

Move saved Interactions between sites from the same box:

- **Export (JSON, every setting):** the whole library in one file.
- **Export (CSV spreadsheet):** one row per saved Interaction: its name, trigger and number of steps, and its full
  settings as JSON in the last column.
- **Import:** choose either file and click **Import**. Both import back unchanged; a saved Interaction with the same
  name is replaced.

## Mouse move

**Mouse move** scrubs the steps with the pointer, the way scroll scrubs Scroll Motion: a card tilts towards the
pointer, its picture drifts the other way, a badge follows the pointer around the page.

**→ [See it on the Interactions demo page](https://demos.unysonplus.com/animation-engine/interactions/)** (scroll to *Mouse move*).

| Option | Default | What it does |
| --- | --- | --- |
| **Follows the pointer** | Over this element | **Over this element** (its centre is the rest position, its edges the full values) or **Anywhere on the page** (the centre of the window is the rest). |
| **Smoothing** | 85 % | 0 = follows the pointer exactly; higher = glides after it. |
| **When the pointer leaves it** | Glide back | **Glide back to its own look**, or **Stay where it is**. |

Each step's values are its look with the pointer at the **right or bottom edge**, mirrored at the left or top:

- **Left and right** drive **Move X**, **Rotate**, **Tilt Y** and **Skew X**.
- **Up and down** drive **Move Y**, **Tilt X** and **Skew Y**.
- **How far the pointer is from the centre** drives **Scale**, **Opacity**, **Blur** and the filters.

A 3D tilt card: on the card, **More properties → Tilt X −10°, Tilt Y 14°**; on its picture, **Move X −18, Move Y −14**
(the picture moves the other way, so it seems to sit deeper).

Duration, delay, easing, stagger and the instant steps (Set, Lottie, Rive, Burst, states) are not used by Mouse
move. It needs a mouse or pen: on phones and tablets the elements keep still. *Amount on tablet / phone* and *Runs on*
apply as for the other triggers. Reduced motion: nothing moves.

## Page starts loading

**Page starts loading** plays the instant the page *begins* to load — while the HTML is still parsing, before
images and fonts arrive — so an intro starts at once rather than after everything has downloaded. **On page load**
is the other half of the pair: it waits until the whole page (images and fonts included) has finished.

Use **Page starts loading** for a hero headline or an overlay that should animate the moment the visitor arrives;
use **On page load** when the steps depend on the final layout (a measured position, a loaded image's size). Both
honour reduced motion (they jump to the end), and both take *Repeat*, *Back and forth*, *Runs on*, *Amount* and
*Runs for*.

## Component event

**Component event** doesn't wait for a hover, click or scroll — it listens for **another component's own event**
and plays the steps then: slide a note in when the mobile menu opens, pulse a badge when a tab changes, fade a
caption when a slider moves.

| Option | What it does |
| --- | --- |
| **Fires when** | **A menu, dropdown or panel opens** (and reverses when it closes), **…closes**, **A tab changes**, or **A slider changes slide**. |
| **Watch** | A CSS selector for the component to watch — a mega-menu item (`.menu-item-has-mega-menu`), the mobile menu drawer (`#primary-navigation-drawer`), the tabs (`.wpc-tabs`) or the slider (`.splide`). Leave it empty to watch **this element**. In the Live Editor, click **Pick on the page**. |

It reads the component's **own** signals — the open/close state (`aria-expanded`, `aria-hidden` or an `is-open`
class), the selected tab (`aria-selected` or the active tab) and the active slide — so it works with the Tabs,
Carousel and Mega Menu elements and the theme's mobile menu out of the box, and with any third-party component
that follows the same accessibility conventions. Nothing is added to the component itself.

**A menu … opens** plays the steps forwards when the component opens and reverses them when it closes (a toggle,
like hover). **A tab changes** and **A slider changes slide** replay the steps on every change. *Repeat*, *Back and
forth*, *Runs on*, *Amount* and *Runs for* all apply.

## Devices and reuse

These options sit above the steps of every trigger:

| Option | What it does |
| --- | --- |
| **Runs on** | **Desktop**, **Tablet**, **Phone** (all ticked by default). The breakpoints are the builder's own *Hide on* ones: phone under 768 px, tablet 768–991 px, desktop 992 px and up. On an unticked device the Interaction does nothing, and its targets keep their own look (no *From* start values either). It switches on and off as the window crosses a breakpoint. |
| **Amount on tablet / Amount on phone** | How far the steps go on that device, as a percentage of desktop (100 = the same, 50 = half as far, 0 = no change). It scales movement, rotation and blur, and how much the scale and opacity change: at 40%, a desktop lift of −10 px is −4 px and a zoom to 1.12 is 1.048. A gentler version for small screens without a second Interaction. |
| **Runs for** | **This element**, or **Every element on the page that matches…** a selector (`.card`). With the second, every matching element gets its own copy of the Interaction. *This element* and *Elements inside it* in the steps then mean **that** element, so one Interaction set up on one card makes every card lift and zoom its own picture. |

To use *Runs for*, give the cards a shared CSS class in their **Advanced** tab (for example `card`), put one Interaction on any one of them, and set **Runs for** to *Every element on the page that matches…* `.card`.

### Use on every page

With **Runs for: Every element on the page that matches…**, there is a third option: **Use on every page**. Switch it on, and once the page is **published** the Interaction also runs on the matching elements of **every page of the site**. It works like a class-based interaction in Webflow: make the hover for `.card` once, and every card on the site gets it.

<img src="/img/animation-engine/interactions/interactions-sitewide-settings.png" alt="Theme Settings → Site-wide UX → Interactions: a table of the site-wide Interactions with what they run for, their trigger, the page they were made on and links to edit them" width="1474" />

- **Editing:** it stays where you made it, so you edit it there, and the change reaches every page when you save. To stop it, switch the option off (or delete the element or the page).
- **What counts:** only published pages. A draft source doesn't run anywhere else, and its own page shows it as usual.
- **Theme Settings → Site-wide UX → Interactions** lists every site-wide Interaction, with its selector, its trigger, the page it was made on, and links to open that page in the Live Editor or the builder.
- **Weight:** a page loads the Interactions script only when it has interactions of its own or the site has site-wide ones.

In the [Live Editor](/extensions/live-editor), switch the device toggle to tablet or phone and click **Play** to check how it behaves at that width.

## Steps

Each trigger plays up to **three steps** (Step 1, Step 2, Step 3). Set a later step's **Animate** to *Not used* to leave it out.

<img src="/img/animation-engine/interactions/interactions-steps.png" alt="Step 1 of a hover Interaction: Animate This element, That match with the Pick on the page button, Do, State, Direction and the Move, Scale and Rotate sliders" width="1240" />

| Option | What it does |
| --- | --- |
| **Animate** | The step's target: **This element**, **Elements inside it that match…**, or **Elements on the page that match…** |
| **Do** | **Animate it with the values below** (the default), or switch the target's [state](./states.md): **Put it in a state**, **Take it out of a state** or **Toggle a state**, with the state's name in **State**. Or act instantly: **Set something instantly**, **Control its Lottie animation**, **Control its Rive animation** (see [Set, Lottie and Rive steps](#set-lottie-and-rive-steps)), or **Burst from it** (see [Burst steps](#burst-steps)). |
| **That match** | The CSS selector for the target: a CSS ID (`#promo`), a class (`.card-arrow`) or a tag (`img`). With *Inside* and nothing typed, the element's direct children are animated. |
| **Direction** | **To these values** moves the target from how it looks now to the values. **From these values** starts it at the values and brings it back to how it looks now, which makes a reveal. Before the trigger, a *From* target waits at its start values. |
| **Move X / Move Y** | Moves it, in pixels. |
| **Scale** | 1 = its own size. |
| **Rotate** | In degrees. |
| **Opacity** | 0 = invisible, 1 = fully visible. |
| **Blur** | In pixels. |
| **More properties** | Size, corner radius, skew, 3D tilt, colours, filters and a clip reveal. See [More properties](#more-properties). |
| **Duration**, **Delay** | In seconds. |
| **Easing** | The speed curve, from the shared curve picker: springs, the Motion design curves, the usual families, or a custom cubic-bezier. See [Easing and springs](#easing-and-springs). |
| **Stagger** | When the selector matches several elements, the gap between each one starting (in seconds). |
| **Starts** | **After the previous step**, or **With the previous step** (they play together). |

The whole sequence plays backwards in reverse order, and a hover that ends halfway reverses from wherever it had got to.

## Set, Lottie and Rive steps

Three more choices under **Do** act at their moment in the sequence, with no animation of their own. Played
backwards (a hover that ends, a second click with *Clicking again: Plays it backwards*, scrolling back past
the element), each one is **undone**.

**Set something instantly**

| Set | What it does | Played backwards |
| --- | --- | --- |
| **Show it** / **Hide it** | Shows or hides the target (`display`). *Show it* also shows an element hidden by its own CSS. | Hides / shows it again |
| **Add / Remove / Toggle a CSS class** | The class name(s) in **Class or value** (`is-open`, or several separated by spaces). Pair it with Custom CSS for any change: a colour scheme, a different layout, an open menu. | Removes / adds it back (toggle toggles) |
| **Bring it forward (z-index)** | Sets z-index to the number in **Class or value**, so the target sits above its neighbours. A target with no position gets `position: relative`, which z-index needs. | Back to its own z-index |
| **Stop it reacting to the mouse** / **Let it react again** | `pointer-events` off or on, for an overlay that must not catch clicks while it is hidden. | Back to what it was |

**Control its Lottie animation**: the target is a [Lottie Animation](/shortcodes/media-elements/lottie) element, or
contains one. **Play**, **Play backwards**, **Pause**, **Stop** (back to the start), **Go to a frame and stop**
(**Frame**), or **Play from one frame to another** (**Frame** → **To frame**). Played backwards, *Play* plays
backwards, *Pause* resumes, *Go to a frame* returns to where it was, and a segment plays back the other way. Set the
Lottie's own **Trigger** to **Controlled by Interactions** so it waits on its first frame until a step plays it.

**Control its Rive animation**: the target is a [Rive](/animation-engine/rive) element, or contains one.
**Play**, **Pause**, **Fire a state-machine trigger** or **Set a state-machine input** (a number, or `true` /
`false`), by its name in the Rive file (**Trigger or input**). Played backwards, *Play* pauses, *Pause* plays, an
input goes back to the value it had, and a trigger does nothing (a trigger has nothing to undo).

Lottie and Rive files load after the page, so a step that fires before its file is ready waits for it (up to about
five seconds). In the [Interaction timeline](/extensions/live-editor), these steps show as markers, like state steps.

## Burst steps

**Do → Burst from it** pops a short burst from the centre of the target at its moment in the sequence: **Ring,
sparks and lines**, **Ring**, **Sparks**, **Lines** or a **Confetti pop**, with **Burst rays / sparks**, **Burst size**
and an optional **Burst colour** (empty = a mix of brand colours). It plays for about 0.6 s. Played backwards there is
nothing to undo, so a hover burst fires on the way in only.

Pair it with other steps: Step 1 scales a button to 0.92 for 0.12 s, Step 2 (after it) bursts a confetti pop, and the
button feels pressed and rewarded. The same bursts exist as a stand-alone button effect in the
[Confetti](/animation-engine/confetti#bursts) card. The Confetti module draws them, so if Confetti is switched off in
Theme Settings → Site-wide UX, Burst steps do nothing.

## Easing and springs

**Easing** opens the shared curve picker, the same one Entrance Animations use. Click the curve to open it,
search by name, and click a tile. The groups:

- **Motion design**: the curves [Kinetic Scenes](/kinetic-scenes) uses, measured from professional motion design.
  **Soft land** (the workhorse for text and panels), **Snap and settle**, **Glide**, **Whip**, **Pop over** (passes
  its mark by about 8 % and settles back), **Crash in** (about 18 %), **Bounce hard** (about 48 %), **Cruise**
  (steady speed), **Soft in-out**, **Gentle in**, **Leave** and **Crash out** (for exits).
- **Spring**: Spring Default, Snappy, Bouncy and Strong.
- **Bezier**, **Power**, **Sine**, **Expo**, **Circ**, **Back**, **Elastic**, **Bounce**, **Irregular** and **Steps**:
  the usual families, each as *In*, *Out*, *In-Out* and *Out-In*.
- **Classic**: the five curves Interactions had before (Smooth stop, Smooth start and stop, Speed up, Overshoot,
  Linear). Interactions saved earlier keep exactly the curve they had, shown under this group.
- **Custom curve**: type a CSS cubic-bezier as four numbers (`0.2, 1.4, 0.4, 1`) and click **Use**. The two x values
  are kept between 0 and 1; the y values can go past 0..1 for an overshoot. The thumbnail draws the curve as you
  type.

<img src="/img/animation-engine/interactions/easing-palette.png" alt="The curve picker scrolled to its end: the Irregular, Steps and Classic groups, with Smooth stop selected, and the Custom curve field with a Use button below" width="522" />

The springs and Motion design curves are real overshoots, so a card on *Pop over* lifts past its mark and settles
back, the way it would in a scene. They play as CSS `linear()` curves (Chrome 113, Firefox 112, Safari 17.2 and
later); an older browser gets the nearest ordinary curve instead (an overshoot for the bouncy ones).

## More properties

Under Blur, **More properties** adds a second set of values to a step. Set it to **Size, colour, tilt, filters,
clip…** to show them; set it back to **None** to switch them off (what you typed is kept, in case you turn it on
again).

<img src="/img/animation-engine/interactions/more-properties.png" alt="Step 1 with More properties switched on: Width, Height, Corner radius, Skew X, Skew Y, Tilt X and Tilt Y sliders" width="1200" />

| Option | What it does |
| --- | --- |
| **Width**, **Height** | In pixels. **0 leaves it as it is.** A size change moves the content around the element (like an accordion opening), so use it on purpose. |
| **Corner radius** | In pixels. 0 leaves it as it is. |
| **Skew X**, **Skew Y** | Slants it, in degrees. |
| **Tilt X**, **Tilt Y** | A 3D tilt, in degrees: Tilt X tips the top edge away (positive) or towards you; Tilt Y turns the right edge away or towards you. |
| **Background colour**, **Text colour**, **Border colour** | The colour it changes to. The swatches are your Theme Settings colours. Empty leaves it as it is. |
| **Brightness**, **Contrast**, **Saturation** | In %; 100 leaves it as it is. |
| **Greyscale** | In %; 0 leaves it as it is, 100 is black and white. |
| **Clip** + **Clip amount** | Hides part of it behind an edge (**From the left / right / top / bottom edge**) or a **Circle, to the centre**. *Clip amount* is how much is hidden (100 = all). With Direction **From**, it is a reveal: the element wipes into view. |

Skew and tilt are added on top of the element's own transform, like Move, Scale and Rotate. The per-device
**Amount on tablet / phone** scales skew, tilt, the filters and the clip as well; sizes, corner radius and colours
are exact values and do not scale.

## States

For menus, drawers, tabs and accordions, give the element that changes named **[States](./states.md)** (Open, Active, Hidden…) and switch them from Interactions on any element. Several buttons can then drive one panel, and a group keeps one tab active at a time.

## Naming the element to animate

A step finds its target by CSS selector, so the target needs a name:

- **In the Live Editor**, click **Pick on the page** under *That match*, then click the element on the canvas. If it has a CSS ID, that is used. Otherwise a short class such as `ix-b03cd5` is added to its CSS classes. *Animate* switches to match: *This element*, *Inside it* or *On the page*. **Esc** or **Cancel** stops picking, and the added class can be undone like any other edit.
- **Anywhere else**, give the target a **CSS ID** or **CSS class** in its **Advanced** tab and type it into *That match* (`#ix-panel`, `.card-arrow`).
- Tags work too: `img` for every picture inside a card, `h2` for a heading's title.

## Works with other effects

Interactions move elements with the separate `translate`, `scale` and `rotate` properties, which **add to** any transform the element already has. A card can still have its Entrance Animation, Hover effect or Scroll Motion, and the Interaction plays on top. Skew and 3D tilt (More properties) are added on top in the same way. Opacity, the filters, colours, size, corner radius and the clip replace the element's own values while the step holds.

## Previewing

In the [Live Editor](/extensions/live-editor), the **Interaction timeline** (top right of the canvas, when the selected element has Interactions) draws the steps as bars you can drag to change their delay and duration, and scrubs or plays the sequence on the canvas.


In the [Live Editor](/extensions/live-editor), **Edit** holds Interactions still so elements are easy to select. To watch one, select the element and click **Play**: it replays in place, so hover over it or click it there. *Scrolled past* needs scrolling, so use **Full preview** for that one.

## Limits

- The targets are found when the page loads. Elements added to the page later (for example by a filter or an infinite scroll) are not included.
- **On click** does not make an element focusable. To start a click Interaction from the keyboard, put it on a button or link.
- *From* reveals hide their targets until the trigger fires. Use them on content that is fine to wait for, not on the only copy of important text.
- **Reduce motion** and Lottie: a step that would play a Lottie jumps to the frame it would end on instead.
- **Reduce motion:** when a visitor asks for less motion (and *Respect "reduce motion"* is on in Theme Settings → Site-wide UX → Animation Engine), every step jumps straight to its end state.
- It runs on the browser's own Web Animations, with no library. Every current browser supports it. Springs and the Motion design curves need a 2023 browser or later; older ones get the nearest ordinary curve.
- **Width** and **Height** change the layout around the element, and colours and corner radius are exact values, so they don't follow *Amount on tablet / phone*.
- The filters (Blur, Brightness, Contrast, Saturation, Greyscale) **replace** a filter the element already has from its CSS. When the two lists don't hold the same filters, the browser can't ease between them and switches halfway, so animate filters on elements without a CSS filter of their own.
- An *In view* step that clips the element itself is watched through its parent, since a fully clipped element never counts as on the screen.
- A **Clip** cuts what reaches past the element's box only while it is clipping. At rest it reaches 30 % past each edge, so ordinary shadows are not cut.

## Example: a hover card

One Interaction on the card's text block, trigger **On hover**:

| Step | Animate | That match | Values | Starts |
| --- | --- | --- | --- | --- |
| 1 | This element | | Move Y −10, 0.35 s | |
| 2 | Elements inside it | `.ix-img` | Scale 1.12, 0.6 s | With the previous step |
| 3 | Elements inside it | `.ix-arrow` | Move X 10, Overshoot, 0.3 s | With the previous step |
