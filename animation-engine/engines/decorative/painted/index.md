---
sidebar_position: 4.9
title: Painted
slug: /painted
description: Paint any WordPress element with real brushes as it scrolls into view, a watercolour wash, a sketched pencil frame, a marker highlight, a brush underline, an ink circle or hatching, drawn on in front of the visitor.
keywords: [watercolour effect wordpress, hand drawn underline, marker highlight text, pencil sketch frame, brush stroke animation, hand painted website, scroll animation]
---

# Painted

**Painted** decorates an element with real brush marks: a watercolour wash behind a card, a sketched pencil frame, a
marker highlight on a heading, a brush underline, an ink circle round a word, or hatching. It paints the element once as
it scrolls into view, then draws it on in front of the visitor: the line goes round first and the colour blooms in
behind it.

<img src="/img/animation-engine/painted.png" alt="Six painted styles on a demo page: a blue watercolour wash behind a card, a pencil frame sketched round a second card, teal hatching behind a third, then a yellow marker highlight, a red crayon underline and a red ink circle round three short headings" width="1280" />

The marks are made by the same paint engine as the [Painted look in Kinetic Scenes](https://docs.unysonplus.com/kinetic-scenes/painted): pencil,
ink, marker, charcoal, crayon and pastel brushes, and watercolour with an uneven, bleeding edge and paper grain. Each
element keeps its own marks: a visitor sees the same painting every time they come back.

## Live demo

**→ [See it in the Animation Engine demos](https://demos.unysonplus.com/animation-engine/painted/)**: all six styles,
the brushes side by side, and a painted callout.

## Where to find it

Open any element → **Animations** tab → **Add Animation** → **Painted** (under *Ambient*). Pick a style; its options
appear below the tiles.

## Styles

| Style | What it paints | Fits to |
| --- | --- | --- |
| **Watercolour Wash** | A watercolour wash behind the element, bleeding a little past its edges. Turn **Outline** on for a pencil or ink line round it. | The whole element |
| **Sketched Frame** | A quick pencil frame, four strokes that run past each other at the corners. | The whole element |
| **Marker Highlight** | A streaky highlighter band behind the words. | The words |
| **Brush Underline** | A crayon stroke under the words, drawn left to right. | The words |
| **Ink Circle** | A hand-drawn ink loop round the words, overshooting where it closes. | The words |
| **Hatched** | Diagonal hatching behind the element. | The whole element |

"The words" means the text, buttons and pictures inside the element, not its full width: a heading in a wide column is
underlined under its words, not across the column. **Fit to** changes this.

## Options

| Option | What it does | Default |
| --- | --- | --- |
| **Brush** | Pencil, Ink pen, Fineliner, Marker, Charcoal, Crayon, Pastel or Coloured pencil. For the wash, highlight and hatching it is the brush of the outline and the hatching lines. | Per style |
| **Paint colour** / **Line colour** | The colour of the paint (wash, highlight, hatching) or of the line (frame, underline, circle). A theme colour or your own. | Per style |
| **Outline**, **Outline colour** | Wash, highlight and hatching only: also draw a brush line round the paint. | Off, near-black |
| **Brush size** | How thick the line and the hatching are. | Per style |
| **Watercolour bleed** | Wash only: how far the wash spreads past its edge, 0 to 1. | 0.2 |
| **Paper texture** | Wash only: how much the pigment settles into the paper grain, 0 to 1. | 0.5 |
| **Hatching gap**, **Hatching angle** | Hatched only: the spacing and direction of the lines. | 7 px, -35° |
| **Paint strength** | Lower is paler and more see-through. | 1 (hatching 0.45) |
| **Spread (px)** | How far the painting reaches past the element (or the words). | Per style |
| **Fit to** | **Content** paints round the words, buttons and pictures; **Whole element** round the element's full box. **Automatic** picks Content for the highlight, underline and circle. | Automatic |
| **Paint-on time (s)** | How long it takes to paint once the element is in view. **0** shows it already painted. | 1.2 |
| **Delay (s)** | Wait before painting starts. | 0 |
| **Layer** | **Behind the content** keeps the text on top. **In front (blended)** lays the paint over the element, blended in like ink on paper. | Behind |
| **Variation** | A number that gives the element a different set of brush marks. 0 picks one for it. | 0 |

## Tips

- **A painted callout:** put a Watercolour Wash on a Special Heading, set **Fit to: Whole element**, raise the bleed
  and turn **Outline** on.
- **Hatching shows through a see-through element.** On a card without its own background, keep **Paint strength** low
  (the default is 0.45) or use it behind a card that has a background.
- **Stagger a row:** give the elements of a row increasing **Delay** values (0, 0.3, 0.6) and they are painted one
  after another.

## Performance and accessibility

- **The paint engine loads only on pages that use Painted**, and only when a painted element comes near the screen. It
  is about 113 KB (about 40 KB compressed), the same file the Kinetic Scene element uses, so a page with both loads it
  once.
- **Each element is painted once.** The paint-on is a CSS mask, so nothing is repainted while it draws; a painting is
  redrawn only when the element changes size (a window resize, a phone turning).
- **It never makes the page scroll sideways:** a painting that would reach past the edge of the page is cut at the edge.
- **Reduced motion:** visitors who ask their system to reduce motion see the painting already finished.
- **Decoration only:** the painting is hidden from screen readers and never catches clicks.

## Limits

- **WebGL2 is needed** to paint, which every current browser has. Without it the element is simply shown unpainted.
- **One painting per element.** For two (a wash and a circle), wrap the element in a column and paint each.
- **A multi-line heading gets one highlight or circle round all its lines**, not one per line.
- The paint engine is [p5.brush](https://github.com/acamposuribe/p5.brush) by Alejandro Campos Uribe (MIT licence).
