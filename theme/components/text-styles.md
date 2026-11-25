---
title: Text Styles
sidebar_position: 3
slug: /components/text-styles
description: The Unyson+ Text Styles library (font_sizes) — named typographic presets that emit .font-{slug} + --font-size-{slug}, every property opt-in.
---

# Text Styles

**Theme Settings → Components → Text Styles** is a library of named **typographic tokens**. A Text
Style is a **size plus optional weight, line-height, letter-spacing and transform**, and the finer
[typography controls](#typography-controls) (variable-font axes, OpenType features, decoration, truncation) — every field is
opt-in, so a style only emits the properties you fill in and any blank one **inherits** from the
element's own tag. (A blank weight keeps the heading's weight; it does *not* thin it.)

They're offered by the **Text Style** dropdown in a shortcode's Styling tab (and by controls like a
Special Heading's *Subtitle Text Style*).


<img src="/img/theme/components/text-styles.png" alt="Theme Settings → Components → Text Styles" width="1108" />

## How it's coded

An [`addable-box`](/options/option-types/addable-box) stored under the (legacy) key
**`font_sizes`**, defined in `components-typography.php`. Each row:

```php
'box-options' => array(
	'name'           => array( 'type' => 'text' ),   // → .font-{slug}
	'size'           => array( 'type' => 'text' ),   // px, no unit; optional
	'weight'         => array( 'type' => 'select' ), // 300–900, or Inherit
	'line_height'    => array( 'type' => 'text' ),   // unitless or a length
	'letter_spacing' => array( 'type' => 'text' ),   // bare number = em
	'transform'      => array( 'type' => 'select' ), // none/uppercase/lowercase/capitalize
	'class'          => array( 'type' => 'text' ),   // optional literal class override
),
```

The **Class** field is the escape hatch: fill it (e.g. `display-1`) and the style targets that literal
class — handy to override a Bootstrap class. Blank → the class is auto-derived as `.font-{slug}` from
the name.

## The output CSS

`unysonplus_build_presets_css_string()` (`framework/includes/css-tokens.php`) emits **only the filled
properties**, scoped to the style's own selector:

```css
:root { --font-size-{slug}: {size}px; }
:root .font-{slug} {
  font-size: var(--font-size-{slug}) !important; /* only if Size is set */
  font-weight: 700;          /* only if Weight is set */
  line-height: 1.1;          /* only if set */
  letter-spacing: -0.02em;   /* a bare number is read as em */
  text-transform: uppercase; /* whitelisted keyword */
}
```

Why the mixed use of `!important`:

- **Size** keeps a `--font-size-{slug}` token **+ `!important`** so it also feeds mobile auto-scaling
  and beats Bootstrap / component utilities.
- **Weight / line-height / letter-spacing / transform** carry **no `!important`** — the `:root .font-…`
  selector (specificity 0,2,0) already outranks Bootstrap's `.display-N` (0,1,0) and the tag-token
  weight rule, while an element's own Custom CSS can still win.
- **Blank field ⇒ not emitted ⇒ inherits** the element's tag token.

`letter_spacing` normalizes a bare number to `em` (so `-0.02` → `-0.02em`); a value with its own unit
passes through.

## Typography controls {#typography-controls}

Each Text Style also has the finer controls a design tool offers. Like every other field they are optional: leave one
blank and the element keeps its own value.

<img src="/img/theme/text-style-typography.png" alt="Three paragraphs: plain text; a Price Tag style with weight 450, 85% width, an 8 degree slant, small caps, tabular numbers and a green wavy underline, clamped to two lines with an ellipsis; a One Liner style in all small caps, cut to one line with an ellipsis" width="450" />

### Variable fonts

| Field | What it does |
| --- | --- |
| **Weight** | Now from 100 (Thin) to 900 (Black). |
| **Exact weight** | Any weight from 1 to 1000, such as 450, for a variable font. Overrides Weight. A font that is not variable snaps to its nearest weight. |
| **Width (%)** | 50 to 200: below 100 is condensed, above 100 expanded (`font-stretch`). Needs a font with a width axis or condensed / expanded faces. |
| **Style** | Normal or Italic (the font's italic face). |
| **Slant (degrees)** | A lean of -90 to 90 degrees (`font-style: oblique 8deg`) for a font with a slant axis; other fonts lean the regular face. Overrides Style. |
| **Optical size** | Auto lets a font with an optical-size axis draw small text sturdier and large text finer; Off turns that off. |

### OpenType features

Tick the features you want; a font that does not have one simply ignores it.

| Feature | Use it for |
| --- | --- |
| Tabular numbers | Equal-width digits, so prices and table columns line up |
| Proportional, Old-style, Lining numbers | The other number shapes |
| Slashed zero | Telling 0 from O in codes and IDs |
| Fractions, Ordinals | 1/2 drawn as ½, 1st with a raised "st" |
| Small caps, All small caps | Small capital letters (all small caps also shrinks the capitals) |
| No ligatures, Discretionary ligatures | Turn off "fi"-style joins, or turn on the decorative ones |
| Stylistic sets 1 to 5, Swashes, Stylistic alternates | The alternate letter shapes a font ships with |

Numbers, capitals and ligatures use the browser's `font-variant-*` properties; stylistic sets, swashes and alternates
use `font-feature-settings`.

### Text decoration

**Decoration** (underline, overline, strike-through or none), **Decoration style** (solid, double, dotted, dashed,
wavy), **Decoration colour**, **Decoration thickness** and **Underline offset** (how far the underline sits below the
text). A styled underline on links is the common use: a Text Style on a menu or a text block with a 2px offset
underline in the accent colour.

### Truncate

**One line, with …** keeps the text on one line and ends it with an ellipsis where it runs out of room. **Clamp to 2-6
lines** shows that many lines and ends the last with an ellipsis. It is useful for card excerpts and titles of uneven
length. The full text stays in the page, so search engines and screen readers still get all of it.

Limits: truncation needs the element to have a width (it does inside a column or card), and a clamped element shows its
text as one block, so a clamp on an element holding several paragraphs counts their lines together.

## Where the output lives

Same as every Components library: compiled into the single cached
`wp-content/uploads/unysonplus/css/presets-{hash}.css` and enqueued as `unysonplus-presets`
(front end + wp-admin), with an inline `<style>` fallback. See the
[shared pipeline](./index.md#how-the-whole-system-works-shared-pipeline).

## How it's picked on an element

The Styling tab's **Text Style** control (`sc_font_size_field`, stored as `font_size_preset`) holds the
style's slug; the element renders the matching `.font-{slug}` class on the text. Because only the
class name is stored, editing the preset reflows everywhere it's used.

## Related

- [Typography (Theme Settings tab)](/theme/theme-settings/typography) — fonts + the base scale.
- [Components overview](./index.md) — the shared pipeline.
