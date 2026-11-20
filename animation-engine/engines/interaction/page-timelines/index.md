---
sidebar_position: 6
title: Page Timelines
slug: /page-timelines
description: Keyframe the real elements of a page on a timeline in the Live Editor's Animate workspace, and play it for visitors on page load, in view, on hover, on click or as they scroll (pinned or not). One element or every element with a class, on chosen devices; Import / Export as JSON or CSV.
keywords: [page timeline, keyframe animation, wordpress animation timeline, animate elements, hover animation, scroll into view animation, spring animation]
---

# Page Timelines <span className="badge badge--warning">Beta</span>

**Keyframe the real elements of your page.** A page timeline moves elements of the page you are editing: a row of cards
rising in one after another, a card that lifts and tilts while the pointer is over it, a panel that drops in when a
heading is clicked. You make it in the **Live Editor's Animate workspace**: select an element, key its moves on a
timeline under the page, pick the curve into each keyframe (springs included), and the page plays it as you work.
**Save** and visitors get it at once.

It is part of the **Animation Creator** ([its plan](/animation-engine/3d-motion-roadmap/animation-creator)). It needs
the **Animation Engine** and **Live Editor** extensions.

## Live demo

**→ [See it in the Animation Engine demos](https://demos.unysonplus.com/animation-engine/page-timelines/)**: an
in-view cascade of three cards, a hover that moves two elements, four tiles moved by one class track from the
centre out, a section pinned while you scroll, and a click that plays forward, then back.

<img src="/img/animation-engine/page-timelines/cascade-demo.png" alt="Three image cards in the middle of the cascade: the first in place, the second rising, the third still faint and low" width="1440" />

## Make one

1. Open the page in the **Live Editor** and switch the toolbar from **Design** to **Animate**. The page stays in the
   middle, the timeline docks under it, and a panel on the right shows the timeline's settings.
2. **Select an element** on the page (or in the Structure list on the left) and click **Animate this element**. It
   gets a track with a first move to change: it rises 30% of its height and fades in, over 0.6 seconds.
3. **Move the playhead** (click or drag on the timeline's ruler) and change a value in the panel: Move X / Y, Scale,
   Rotate, Opacity or Blur. It is keyed there, at the playhead. A property keyed for the first time also gets its
   resting value at 0 s, so it moves from rest.
4. **Click a diamond** on the timeline to change that keyframe: its time, its values and the **curve** into it (the
   shared curve list: Soft land, Pop over and the other springs, Power, Back, Elastic…). Drag a diamond to retime it.
5. **Play** (or press Space). The element on the page moves with the playhead.
6. With nothing selected, choose what plays it (**Plays on**) and where (**Runs on**), then click **Save**: the page
   and its timelines are saved together.

<img src="/img/animation-engine/page-timelines/keyframe-panel.png" alt="Animate with a keyframe selected: its diamond highlighted on the heading's row in the timeline, and on the right its time, Move X set to 12, the other values empty, and the Pop over curve with a picture of it" width="1600" />

## The workspace

The panel on the right shows only what the selection needs:

| Selected | The panel shows |
| --- | --- |
| **Nothing** | The timeline's settings (below) |
| **An element not in the timeline** | **Animate this element**; for hover, click and in view, **Starts the timeline**; tracks *not on this page* to move to it; the other timelines that already move it |
| **An element in the timeline** | Its values at the playhead (a change keys them there), its keyframes, *Starts the timeline*, *Remove from this timeline* |
| **A keyframe** | Its time, its values (empty = not set by this keyframe), the curve into it with a picture, *Delete this keyframe* |

The toolbar has the timeline picker (**+** for a new one), back to the start, Play, the time and **Preview**, which
plays it on the page as a visitor gets it: it shows the first moment and waits for its trigger, so hover the element,
click it or scroll it into view. The timeline under the canvas zooms (**−** / **+**) and folds away (the arrow).

**Keys:** Space plays or pauses; Delete removes the selected keyframe (in Animate, Delete never deletes an element);
Ctrl+Z / Ctrl+Y undo and redo timeline changes like any other edit.

## Every element with a class

One track can move **every element with a class**: four tiles, all the cards of a grid, each item of a list.

1. Give the elements a class: each element's options, **Advanced › CSS class** (for example `pt-tile`).
2. In Animate, select one of them. The panel offers **Animate every “.pt-tile” (4)**, with how many there are on the
   page. It adds one track, named *Every .pt-tile (4)*.
3. Select any of them to change the track: the values at the playhead are the first element's, and two more settings
   appear: **Stagger (s)**, how long each element waits after the one before, and **Order**: *First to last* (the page
   order), *Last to first*, *From the centre out* or *Random* (always the same random order, in the editor and for
   visitors).

<img src="/img/animation-engine/page-timelines/class-track.png" alt="Animate with one of the four tiles selected: the panel shows the track Every .pt-tile (4) with its values, Stagger 0.3 and Order From the centre out; the timeline has one row, Every .pt-tile (4)" width="1600" />

On the timeline the track shows one bar for the first element and a faint bar for each of the others, so you see where
the last one ends. When a stagger asks for more time than the timeline has, it is lengthened to fit. Add another
element with the same class later and it joins in, with nothing to change.

## Scroll: the scroll position is the playhead

With **Plays on: Scroll**, scrolling plays the timeline: down plays it forward, up plays it back.

- **Not pinned:** it runs while its element crosses the screen, from the moment the element comes in at the bottom
  until it leaves at the top.
- **Pin it:** the element (usually a whole section) holds at the top of the screen while the visitor scrolls the
  distance you set in **Pinned for (screen heights)**, and the timeline runs from start to end over that distance.
  Then the page carries on. On the editor's canvas the page keeps its own layout (no pinning), so scrub with the
  playhead; **Preview** pins it as a visitor sees it.

The **Length** of a scroll timeline sets the spacing of its keyframes (a keyframe at half the length happens half
way through the scroll), not a time.

## The timeline's settings

| Setting | What it does |
| --- | --- |
| **Name** | For you, in the picker and in exported files |
| **Plays on** | **Page load**, **In view** (when its element scrolls into view), **Hover** (while the pointer is over its element, or keyboard focus is inside it), **Click**, or **Scroll** (the scroll position is the playhead; see above) |
| **The element that starts it** | Hover, click and in view: by default the first track's element; pick another, or select any element and use *Starts the timeline*, so hovering one card can move another |
| **Play back on leaving** | Hover: when the pointer leaves, it plays back to the start (on), or stays where it got to (off) |
| **Clicks go forward, then back** | Click: each click plays it the other way, like a toggle |
| **Every time it comes into view** | In view: plays again each time (off: once) |
| **Loop** / **Back and forth** | Page load and click: repeat for ever, optionally going back and forth |
| **Pin it** / **Pinned for (screen heights)** | Scroll: hold the element in place while the timeline plays, over this many screen heights of scrolling |
| **Length (s)** | How long the timeline is |
| **Runs on** | **Desktop** (992 px and wider), **Tablet** (768 to 991 px), **Phone** (narrower than 768 px), the same breakpoints as [Interactions](/animation-engine/interactions). On the others, the elements stay as they are |
| **Delete this timeline** | Removes it (Undo brings it back) |

## What visitors get

- **Only pages with a timeline load anything:** the runtime is about **3 KB** gzipped, with no library. Every other
  page is untouched.
- **No flash:** each element's first moment (faded out, moved down) is set in the page's head, so an element that rises
  in is never seen at rest first. If the runtime is blocked, the elements show normally after 4 seconds.
- **No layout shift:** motion uses the CSS `translate`, `rotate` and `scale` properties, `opacity` and `filter`. An
  element keeps its own transform, and nothing around it moves.
- **Reduced motion:** visitors who ask their system for less motion see each timeline's last moment and no motion
  (unless the engine's *Respect reduced motion* setting is off).
- **Scroll:** a pinned timeline holds its element in place with CSS `position: sticky` inside a wrapper as tall as the
  pin; nothing else on the page moves. Reduced motion shows the end state and pins nothing.
- **Devices:** a timeline limited with **Runs on** plays only there, and starts or stops if the window is resized across
  a breakpoint.
- **In the Live Editor**, Design holds timelines still (everything visible, like every other effect), Animate plays
  them at the playhead, and Preview plays them as a visitor gets them.

## Import / Export

With nothing selected in Animate, open **Import / Export** in the panel:

| Button | Gives you |
| --- | --- |
| **This timeline (JSON)** | The timeline you are editing, with every setting. |
| **All (JSON)** | Every timeline of the page. |
| **All (CSV)** | A spreadsheet: one row per keyframe, the timeline's settings repeated on each row. Read, sort or edit it in any spreadsheet. |
| **Import a file…** | A JSON or CSV file from either export. The timelines are **added** (a timeline whose id is taken gets a new one); the first one opens. |

What you export imports back unchanged. Imported timelines are not saved until you click **Save** (and Undo takes an import back).

**Moving timelines to another page or site.** A track points at an element by its builder key, which is different on
another page. After an import, such tracks show in orange on the timeline. Select an element on the page: the panel lists
them under **Not on this page**, and **Use this element** gives that track's moves to it.

The CSV columns: `timeline_id, timeline, plays_on, length, started_by, once, leave, toggle, threshold, delay, pin,
screens, repeat, yoyo, runs_on, element, element_name, track_curve, stagger, order, t, x, y, scale, rotate, opacity,
blur, curve`. `element` and `started_by` are builder keys (or a class such as `.pt-tile`), `t` is seconds, `curve` is a key from the shared curve list such as `soft_land` or `pop_over` (empty: the track's curve, or none).

## Good to know

- **Move X / Y are a share of the element's own size** (Move Y 30 = down 30% of its height), so a move fits the element
  at every screen size. **Blur** is 10 pixels a step.
- **Where it is stored:** on the page (post meta `_upw_page_timelines`), beside the builder content, never inside it.
  So editing the page in the builder, or re-importing it, leaves the timelines alone. Each save replaces the last one:
  export a copy first to keep a version.
- **Duplicating an element** in the Live Editor gives the copy a new key, so the copy is not in the timeline. Deleting a
  tracked element leaves its track waiting (it shows under *Not on this page* next time).
- Two timelines can move the same element; the one that plays last sets where it ends up.

## For developers

The runtime is `animation-engine/modules/page-timelines/static/js/upw-timeline.js` (`window.upwTimeline`: `load`,
`seek`, `play`, `arm`, `clear`), and the server side is `page-timelines.php`, where `upw_page_timelines_get( $post_id )`,
`upw_page_timelines_save( $post_id, $list )` and `upw_page_timelines_clean( $list )` read, store and check the data.
**REST API:** the timelines are the page's `meta._upw_page_timelines` field on `/wp-json/wp/v2/pages/<id>` (and
posts), as a JSON string. Anyone can read it (the same data is printed on the page); writing needs a user who can edit
the page (an application password works), and every write is checked like the Live Editor’s Save: unknown fields are dropped
and values kept in range. An empty string or `[]` removes them. The Live Editor's own Save sends them the same way.

```bash
curl -X POST https://example.com/wp-json/wp/v2/pages/123   -u 'editor:APPLICATION PASSWORD' -H 'Content-Type: application/json'   -d '{"meta":{"_upw_page_timelines":"[{\"id\":\"tl-1\",\"name\":\"Intro\",\"duration\":1,\"trigger\":{\"type\":\"load\"},\"tracks\":[{\"target\":\"<item key>\",\"frames\":[{\"t\":0,\"y\":30,\"opacity\":0},{\"t\":0.6,\"y\":0,\"opacity\":1,\"e\":\"cubic-bezier(.22,1,.36,1)\"}]}]}]"}}'
```

The data shape and the messages between Kinetic Scenes and the Live Editor are on the
[Live Editor page](/extensions/live-editor#page-timelines-beta).
