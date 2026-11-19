---
sidebar_position: 6
title: Page Timelines
slug: /page-timelines
description: Keyframe the real elements of a page on a timeline in Kinetic Scenes, save it to the page, and play it for visitors on page load, in view, on hover or on click. Runs on chosen devices; Import / Export as JSON or CSV.
keywords: [page timeline, keyframe animation, wordpress animation timeline, animate elements, hover animation, scroll into view animation, spring animation]
---

# Page Timelines <span className="badge badge--warning">Beta</span>

**Keyframe the real elements of your page.** A page timeline moves elements of the page you are editing: a row of cards
rising in one after another, a card that lifts and tilts while the pointer is over it, a panel that drops in when a
heading is clicked. You make it in **Kinetic Scenes**, with its timeline, keyframe editor and curve editor (springs
included), while the Live Editor's canvas plays it as you work. **Save to page** and visitors get it at once.

It is part of the **Animation Creator** ([its plan](/animation-engine/3d-motion-roadmap/animation-creator)). It needs
the **Animation Engine** and **Live Editor** extensions.

## Live demo

**→ [See it in the Animation Engine demos](https://demos.unysonplus.com/animation-engine/page-timelines/)**: an
in-view cascade of three cards, a hover that moves two elements, and a click that plays forward, then back.

<img src="/img/animation-engine/page-timelines/cascade-demo.png" alt="Three image cards in the middle of the cascade: the first in place, the second rising, the third still faint and low" width="1440" />

## Make one

1. Open the page in the **Live Editor** and click **Animate** in its toolbar. Kinetic Scenes opens beside it in
   **page mode**, with the **Page panel** on its left: the page's elements, and the **Timeline** box.
2. **Pick an element**: click it on the page, or in the Page panel's list.
3. Click **Add *element* to the timeline** (or double-click its row). It becomes a **track** with a Keyframes clip and a
   first move to change: it rises 30% of its height and fades in, over 0.6 seconds.
4. Select the Keyframes clip and change the moves in the Inspector: **Move X / Y**, **Scale**, **Rotate**, **Opacity**
   and **Blur**, and the curve into each keyframe.
5. **Play or scrub** the timeline. The element on the page moves with the playhead.
6. Choose what plays it (**Plays on**) and where (**Runs on**), then click **Save to page**.

<img src="/img/animation-engine/page-timelines/page-mode.png" alt="Kinetic Scenes in page mode: the Page panel with the Cards cascade timeline on the left, a map of the three cards on the stage, and their three Keyframes tracks on the timeline" width="1920" />

The stage shows a **map** of the tracked elements (a box where each sits on the page), so you can see what moves
where. The real result is the page itself.

## The Timeline box

<img src="/img/animation-engine/page-timelines/timeline-box.png" alt="The Timeline box: the timeline picker, Name, Plays on, Length, the element that starts it, Runs on, Preview on the page, Save to page and Import / Export" width="299" />

| Setting | What it does |
| --- | --- |
| **Timeline** / **New** / **Delete** | A page can have any number of timelines (one for the hero on load, another for a card on hover). Pick one to edit it. |
| **Name** | For you, in the list and in exported files. |
| **Plays on** | **Page load**, **In view** (when its element scrolls into view), **Hover** (while the pointer is over its element, or keyboard focus is inside it) or **Click**. |
| **Length (s)** | How long the timeline is. Shortening it cuts every track to the new length. |
| **The element that starts it** | Hover, click and in view: by default the first track's element. Any track's element, or the picked one, can start it, so hovering one card can move another. |
| **Play back on leaving** | Hover: when the pointer leaves, it plays back to the start (on), or stays where it got to (off). |
| **Clicks go forward, then back** | Click: each click plays it the other way, like a toggle. Off: each click plays it from the start. |
| **Every time it comes into view** | In view: plays again each time it comes back into view (off: once). |
| **Loop** / **Back and forth** | Page load and click: repeat for ever, optionally going back and forth. |
| **Runs on** | **Desktop** (992 px and wider), **Tablet** (768 to 991 px), **Phone** (narrower than 768 px), the same breakpoints as [Interactions](/animation-engine/interactions). On the others, the elements stay as they are. |
| **Preview on the page** | Plays it on the canvas as a visitor gets it: it shows the first moment and waits for its trigger. |
| **Save to page** | Stores every timeline that has a track. Next to it: *Unsaved changes* or *Saved on the page*. Closing Kinetic Scenes with unsaved changes asks first. |

## What visitors get

- **Only pages with a timeline load anything:** the runtime is about **3 KB** gzipped, with no library. Every other
  page is untouched.
- **No flash:** each element's first moment (faded out, moved down) is set in the page's head, so an element that rises
  in is never seen at rest first. If the runtime is blocked, the elements show normally after 4 seconds.
- **No layout shift:** motion uses the CSS `translate`, `rotate` and `scale` properties, `opacity` and `filter`. An
  element keeps its own transform, and nothing around it moves.
- **Reduced motion:** visitors who ask their system for less motion see each timeline's last moment and no motion
  (unless the engine's *Respect reduced motion* setting is off).
- **Devices:** a timeline limited with **Runs on** plays only there, and starts or stops if the window is resized across
  a breakpoint.
- **In the Live Editor**, Edit mode holds timelines still (everything visible, like every other effect). Preview mode
  plays them as a visitor gets them.

## Import / Export

Open **Import / Export** in the Timeline box:

| Button | Gives you |
| --- | --- |
| **This timeline (JSON)** | The timeline you are editing, with every setting. |
| **All (JSON)** | Every timeline of the page. |
| **All (CSV)** | A spreadsheet: one row per keyframe, the timeline's settings repeated on each row. Read, sort or edit it in any spreadsheet. |
| **Import a file…** | A JSON or CSV file from either export. The timelines are **added** (a timeline whose id is taken gets a new one); the first one opens. |

What you export imports back unchanged. Imported timelines are not saved until you click **Save to page**.

**Moving timelines to another page or site.** A track points at an element by its builder key, which is different on
another page. After an import, the Timeline box lists the tracks under **Not on this page**: pick an element and click
**Use *element*** on each, and its moves go to that element.

The CSV columns: `timeline_id, timeline, plays_on, length, started_by, once, leave, toggle, threshold, delay, repeat,
yoyo, runs_on, element, element_name, track_curve, t, x, y, scale, rotate, opacity, blur, curve`. `element` and
`started_by` are builder keys, `t` is seconds, `curve` is a Kinetic Scenes curve name (empty: the track's curve).

## Good to know

- **Move X / Y are a share of the element's own size** (Move Y 30 = down 30% of its height), so a move fits the element
  at every screen size. **Blur** is 10 pixels a step.
- Only **Keyframes clips** on a track count. Kinetic Scenes' other presets do not play on the page.
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
The data shape and the messages between Kinetic Scenes and the Live Editor are on the
[Live Editor page](/extensions/live-editor#page-timelines-beta).
