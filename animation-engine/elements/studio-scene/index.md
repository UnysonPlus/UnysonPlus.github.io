---
sidebar_position: 11.8
title: Studio Scene
slug: /studio-scene
description: Play a timeline motion-graphics scene made in the Unyson+ Animation Studio inside any Unyson+ page, as live HTML, and edit it in the Studio straight from the element.
---

# Studio Scene

Put a scene made in the [Animation Studio](/animation-studio) on any page: kinetic type, shapes and images animated on a
timeline, playing as **live HTML**. The words stay real text (sharp at any size, readable by search engines and screen
readers), the whole scene weighs a few kilobytes, and it has its own layout for desktop, tablet and mobile.

[See the live demo](https://demos.unysonplus.com/animation-engine/studio-scene/) on the demos site.

## Add it

Builder palette → **Animation Engine** → **Studio Scene**. Then either:

- **Paste a scene.** In the Studio, use **Export → Embed code** (or **Save** for the scene file) and paste it into the
  element's **Scene** field. Both work; the element reads the scene out of the embed code.
- **Open it in the Studio.** Click **Open in Animation Studio**. The Studio opens in a new window with this element's
  scene loaded (or your current Studio work, if the element is empty). Edit it, then click **Save to page** in the Studio's
  green bar: the scene comes straight back into the field. Update the page to keep it.

Under the field, a summary shows what is pasted ("Make it move": 7 layers, 7 s), or what is wrong with it.

## Layout tab

Each option starts at **Scene default**, which keeps what was set in the Studio.

| Option | What it does |
|---|---|
| **Height** | How tall the scene may grow: **keep the shape** (the page scrolls if it is taller than the window), **keep the shape, never taller than the window**, or **fill the window**. |
| **Header height** | Pixels left for a sticky site header when the scene is capped to, or fills, the window. A scene that plays as the page scrolls is held in place just below this height. |
| **Starts** | When the scene plays: when scrolled into view, when the page loads, or **as the page scrolls** (the scroll position plays it forwards and back, with the stage held in place while it plays). |
| **Scroll length** | For a scene that plays as the page scrolls: how many screens of scrolling it takes while held in place. 0 keeps the scene's own setting. |
| **Loop** | Loop or play once. |

**Custom code clips** in a scene run only when the page's author is allowed to publish unfiltered HTML (administrators
and editors on a single site), the same rule as Motion Snippet. For any other author they are skipped and the rest of the
scene plays.

Visitors who have turned off animation in their system settings always see the scene's still frame instead.

## Search tab

An animation shows its words a few at a time, scrambled, masked or mid-effect, so a search engine looking at the moving
scene would read fragments. The element therefore also writes the scene's words into the page once, as plain text, in
the order they appear: the headline as a heading, each act's headline one level below, the rest as paragraphs. Search
engines index that text and screen readers read it; visitors see the animation, which screen readers skip so nothing is
read twice.

| Option | What it does |
|---|---|
| **Headline as** | The heading level the scene's headline gets: Heading 1 (only when the scene is the page's main title; a page has one), Heading 2 (the default, a section) or Heading 3, or a plain paragraph. |
| **Text for search engines** | Include the scene's words, or mark the scene **decorative**: no text at all, and hidden from screen readers. Use that for animation that only decorates. |

**Scene default** uses what the scene says (set in the Studio under **Search engines and screen readers**, where you
also see exactly what gets written).

## Good to know

- **Layouts follow the element's width, not the screen's.** In a half-width column, a scene uses the layout that fits
  that width (often its mobile one).
- **Nothing loads from outside your site.** The scene player ships with the plugin and loads only on pages that use the
  element. Web fonts named in the scene still load from their font service.
- **It plays alongside the rest of the Animation Engine**, including Scroll Motion, without interfering.
- **Scenes made in the Studio are versioned.** If the Studio's scene format changes, the element's player is updated with
  the plugin, and older scenes keep playing.
