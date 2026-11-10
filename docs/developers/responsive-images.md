---
title: Responsive images (fw_image_tag)
sidebar_position: 4
description: How Unyson+ renders images - fw_image_tag(), pre-cropped renditions, per-device crops and images (<picture>), the shared image fields and the roll-out roadmap.
keywords: [fw_image_tag, responsive images, picture element, art direction, srcset, sizes, crop, focal point, LCP, Unyson+]
---

# Responsive images

Every image an element shows should reach each visitor as **one file made for that screen**: the right shape, the right width, and nothing larger. Unyson+ does this through one shared renderer, **`fw_image_tag()`**, and a set of image fields any element can add.

This page covers:

1. [What problem it solves](#why)
2. [What site owners see](#for-site-owners): the Focal Point, Crop on Smaller Screens and Tablet & Phone Image fields
3. [`fw_image_tag()`](#fw_image_tag), its arguments and the HTML it writes
4. [Per-device images (`art`)](#art) and the `<picture>` output
5. [Pre-cropped renditions](#renditions): widths, quality, storage, clean-up
6. [Adding the fields to your own element](#your-element)
7. [Deferred loading and preloads](#loading)
8. [Limits](#limits) and the [roll-out roadmap](#roadmap)

## Why {#why}

A photo shown with CSS `object-fit: cover` is cropped by the browser, but the browser still picks the file by the box's **width**. A landscape 3:2 photo filling a tall phone hero (about 412×800) is shown 1.5× wider than its box, so the 768px file the browser picks is stretched to roughly 1,200px. The photo looks soft, and the sides it downloads are thrown away.

Two things fix that:

- **Crop the file to the shape it is shown in**, around a focal point, on the server. A phone downloads a portrait file and a desktop a landscape one.
- **Let the shape change per device**, with a `<picture>` that has one `<source>` per breakpoint. Optionally use a **different photo** on small screens, for pictures that do not crop well.

## For site owners {#for-site-owners}

Supported so far: **Carousel / Slider**, **Image**, **Before / After**, **Image Box**, **Image + Content**, **Team Member** and **Bleed Section**. They show up to three fields. They are optional; leave them empty and the element behaves exactly as before.

| Field | Where | What it does |
|---|---|---|
| **Focal Point** | Per image (per slide on the Slider) | The part of the photo that must stay in view when it is cropped: Top Left … Center … Bottom Right. |
| **Crop on Smaller Screens** | Element (Slider: Layout tab; Image: Content tab) | A shape per device, set with the device switcher: Desktop, Tablet, Phone. *Same as the larger screen* inherits; *Original shape* means no crop. Large desktops always show the main picture. |
| **Tablet & Phone Image** | Per image | Optional: a different photo for tablets and/or phones. Empty = crop the larger screen's photo automatically. |

The model is **desktop-first**: the element's main Image (and its Aspect Ratio, where it has one) is the desktop picture. Each smaller screen inherits the next larger one unless you set it.

Example, a tall hero slider: Phone **Portrait 3:4**, Tablet **Landscape 4:3**, desktop unchanged. Phones now download a sharp 1100×1467 portrait crop instead of a stretched 768×512 landscape file.

**Which shape to pick:** match the box the image fills on that device. A full-height phone hero is close to **9:16** (or **3:4** if it is shorter); a card that is square on phones is **1:1**.

## fw_image_tag() {#fw_image_tag}

```php
echo fw_image_tag( $attachment_id_or_url, array(
    'class'         => 'my-element__img',
    'alt'           => '',
    'sizes'         => '100vw',
    'fetchpriority' => '',          // 'high' for the page's main (LCP) image
    'aspect_ratio'  => '16/9',      // optional crop for the main picture
    'object_position' => 'center top',
    'art'           => $art,        // optional per-device crops / images
) );
```

Defined in `framework/helpers/general.php`. It returns escaped HTML: an `<img>`, or a `<picture>` when the image changes per device. Use it in element views instead of hand-built `<img>` tags.

### Arguments

| Argument | Default | Meaning |
|---|---|---|
| `width`, `height` | `''` | A unit-input value (`array( 'value' => 300, 'unit' => 'px' )`), a px number or `''`. Px values become `width`/`height` attributes; other units go in inline CSS. Both in px (and no ratio) = an exact server crop with a 2x density `srcset`. |
| `class` | `img-fluid` | Class attribute. |
| `alt` | `''` | Alt text; falls back to the Media Library alt. |
| `fetchpriority` | `''` | `high` = `loading="eager"` + `fetchpriority="high"` (the page's main image). Otherwise `loading="lazy"`. |
| `sizes` | `''` | The `sizes` attribute. With a ratio crop and lazy loading it defaults to `auto, 100vw`; eager, `100vw`. |
| `fallback_size` | `large` | WordPress size for the plain (uncropped) path. |
| `extra_attr` | `array()` | Extra attributes merged onto the `<img>`. |
| `aspect_ratio` | `''` | `16/9`, `1/1`, `3:2` … Crops the **main** picture into pre-cropped renditions (see [renditions](#renditions)) and sets an inline `aspect-ratio`. |
| `object_fit` | `''` | `cover` (crop) or `contain` (whole image, may letterbox). Only with `aspect_ratio`. |
| `object_position` | `''` | Focal point for the crop: keywords (`left top`) or percentages (`30% 60%`). |
| `inline_style` | `true` | `false` = no inline width / aspect-ratio / object-fit, for elements whose own CSS sizes the image (a cover background, for example). |
| `art` | `array()` | Per-device crops / images, see [below](#art). |
| `lazy_attrs` | `false` | `true` = write `src`/`srcset` as `data-fw-lazy-src` / `data-fw-lazy-srcset` (on the `<img>` and every `<source>`), for a script that loads the image just before it is shown. See [loading](#loading). |
| `preload` | `false` | With `fetchpriority => 'high'`: also print one `<link rel="preload" as="image">` per device range. See [loading](#loading). |

### What it writes

| Input | Output |
|---|---|
| Attachment ID, both px dimensions, no ratio | `<img>` with an exact crop (`fw_resize`) and a 1x/2x `srcset` when the original is large enough. |
| Attachment ID + `aspect_ratio` (cover) | `<img>` whose `srcset` lists pre-cropped renditions at several widths. |
| Attachment ID, no ratio | `wp_get_attachment_image()` with WordPress's own `srcset`. |
| Image URL | A plain `<img>`; no `srcset` is possible. `data:image/` URLs are sanitised, not dropped. |
| Attachment ID + `art` where a device differs | `<picture class="fw-picture">` with one `<source>` per breakpoint, then the `<img>` above as the large-desktop picture and fallback. |

`fw_image_tag_basic()` is the single-`<img>` builder underneath; call `fw_image_tag()`.

## Per-device images (art) {#art}

`art` describes what each smaller screen shows:

```php
array(
    'base' => array( 'source' => 123, 'ratio' => '3/4', 'focal' => 'center top' ), // phone, < 768px
    'md'   => array( 'source' => 123, 'ratio' => '4/3', 'focal' => 'center top' ), // tablet, < 992px
    'lg'   => array( 'source' => 123, 'ratio' => '',    'focal' => 'center top' ), // desktop, < 1200px
)
```

- `source`: an attachment ID (a different photo, or the main one).
- `ratio`: `3/4`, `1/1` …; `''` or `original` = no crop.
- `focal`: an `object-position` value.
- `sizes` (optional): the `sizes` for that device's `<source>`.

You rarely build it by hand. **`fw_image_art_resolve( $main_id, $main_ratio, $focal, $crops, $images )`** (in `framework/includes/image-crops.php`) resolves the desktop-first cascade from a `responsive` crops value and a `responsive` images value. **`sc_responsive_image_art()`** reads the shared fields; see [your element](#your-element).

### The `<picture>` it writes

```html
<picture class="fw-picture">
  <source media="(max-width: 767.98px)" srcset="…-320x427.jpg 320w, … , …-1100x1467.jpg 1100w" sizes="100vw" width="1100" height="1467">
  <source media="(max-width: 991.98px)" srcset="…-320x240.jpg 320w, … , …-1956x1467.jpg 1956w" sizes="100vw" width="1956" height="1467">
  <img src="…-1536x1024.jpg" srcset="…" sizes="100vw" alt="" loading="eager" fetchpriority="high" decoding="async" class="…">
</picture>
```

- Breakpoints match the device switcher and Bootstrap: phone < 768, tablet < 992, desktop < 1200, large desktop ≥ 1200.
- Sources are written for every layer from phone up to the largest one that differs, so the ranges stay contiguous and the `<img>` owns everything above them.
- Each `<source>` carries the `width`/`height` of its crop, and the inline `aspect-ratio` is removed from the `<img>`. The chosen file then sets the box's shape, so a 16:9 desktop image becomes a 3:4 box on phones without extra CSS. Keep `height: auto` on the image.
- A `<picture>` is an inline box. Inside a positioned or flex layout, give it `display: contents` (the Slider and Image elements do) so the `<img>` behaves exactly as before.

## Pre-cropped renditions {#renditions}

`fw_image_crop_renditions( $attachment_id, $ratio, $focal )` (in `framework/includes/image-crops.php`) cuts the largest box of `$ratio` around the focal point and saves it at several widths.

| | |
|---|---|
| **Formats** | JPG, PNG, WebP. Other files (SVG, GIF) return nothing, and the caller falls back to the uncropped image. |
| **Widths** | 320, 400, 480, 560, 640, 736, 768, 900, 1024, 1280, 1600, plus the crop's own full width; never upscaled. 736 covers a 412px phone at 1.75x (needs ~721px), which would otherwise get the crop's full-width file. Filter: `fw_image_crop_widths`. |
| **Quality** | 82 by default (`fw_image_crop_quality`); the Asset Optimizer sets its own WebP quality. |
| **Storage** | `uploads/unysonplus/image-crops/<id>-<name>-<w>x<h>-<sig>.<ext>`. The signature covers ratio, crop box, file size, modification time and quality, so changing any of them makes new files. |
| **Made** | On first request, then reused. A WebP copy is made through the `fw_image_rendition_saved` action when the Asset Optimizer is on. |
| **Removed** | With the attachment. Crops from an older signature are not yet cleaned up (see [roadmap](#roadmap)). |

`fw_image_srcset_data( $attachment_id, $ratio, $focal )` returns `srcset`, a default `src`, and the largest `width`/`height` for one picture: renditions when it can crop, the attachment's own sizes otherwise.

## Adding the fields to your own element {#your-element}

In `options.php`:

```php
$options = array(
    'image' => array( 'type' => 'upload', 'label' => __( 'Image', 'fw' ) ),
) + sc_responsive_image_fields( array( 'prefix' => 'img_' ) );
// adds img_focal (select), img_crops (responsive select: Desktop/Tablet/Phone),
// img_images (responsive upload: Tablet/Phone).
// 'fields' => array( 'focal', 'crops', 'images' ) picks a subset; *_label overrides the labels.
```

In the view:

```php
$id  = (int) $atts['image']['attachment_id'];
$art = sc_responsive_image_art( $atts, 'img_', $id, $main_ratio );
echo fw_image_tag( $id, array( 'class' => 'my-el__img', 'art' => $art, 'sizes' => '(max-width: 767.98px) 100vw, 50vw' ) );
```

**Boxes shaped by a CSS ratio class** (Before/After, Image Box): the image fills a box whose `aspect-ratio` comes from a class, so the box must change shape per device too. `sc_responsive_image_box_vars( $atts, 'img_', $id, $main_ratio, '--my-ar' )` returns `--my-ar-lg / -md / -base` variables (only when a device differs); apply them in your stylesheet:

```css
@media (max-width: 1199.98px) { .my-el[style*="--my-ar-lg"] .my-el__box { aspect-ratio: var(--my-ar-lg); } }
@media (max-width: 991.98px)  { .my-el[style*="--my-ar-md"] .my-el__box { aspect-ratio: var(--my-ar-md); } }
@media (max-width: 767.98px)  { .my-el[style*="--my-ar-base"] .my-el__box { aspect-ratio: var(--my-ar-base); } }
```

`sc_ratio_from_class( 'ratio-16-9' )` turns such a class into `16/9`.

When the fields live in different places, as on the Slider (crops are slider-wide, images per slide), pass the values that win:

```php
sc_responsive_image_art( $slide, 'img_', $id, '', array( 'crops' => $atts['img_crops'] ) );
```

The **`responsive`** option type takes two keys for this:

- **`'devices' => array( 'md', 'base' )`**: the option edits only those devices. The other device tabs stay, so the switcher keeps following the builder's device toggle, but they show a note instead of a control and always save `''`.
- **`'off_note'`**: the text of that note, for example "Desktop uses the main image above."

The saved value keeps the usual `{ base, md, lg, xl }` shape; see [responsive option type](../options/option-types/responsive.md).

Both helpers live in `framework/extensions/shortcodes/includes/responsive-image-fields.php` and are loaded on every request.

## Deferred loading and preloads {#loading}

**Later slides** (or any image a script reveals) use `'lazy_attrs' => true`. Nothing loads until the script restores the attributes: the `<source>` elements **first**, then the `<img>`. A browser picks a `<picture>`'s source when the `<img>` starts loading, so the order matters. The Slider's script does this for the visible slides at once, the next slide once the page has loaded and the browser is idle, both neighbours as soon as someone touches or focuses the slider, and the slide it moves to (plus its neighbours) on every move, clones included. Neighbours are not fetched at start-up, so they never compete with the first screen for bandwidth.

**The page's main image** uses `'fetchpriority' => 'high', 'preload' => true`. `fw_image_tag()` then prints one preload link per device range, each with its own `media`:

```html
<link rel="preload" as="image" imagesrcset="…phone crops…" imagesizes="100vw" media="(max-width: 767.98px)" fetchpriority="high" data-fw-hoist>
<link rel="preload" as="image" imagesrcset="…tablet crops…" media="(min-width: 768px) and (max-width: 991.98px)" … data-fw-hoist>
<link rel="preload" as="image" imagesrcset="…desktop…" media="(min-width: 992px)" … data-fw-hoist>
```

The **Asset Optimizer** (1.1.75+) moves every `data-fw-hoist` link into `<head>`, so the browser starts the right file before it reads the body. A phone preloads only the phone crop. Because the page then already preloads an image, the optimizer's own guess, which cannot see a `<picture>`'s sources, stands aside. Without the optimizer the links stay next to the image, which is harmless.

## Limits {#limits}

- **Attachments only.** Per-device output needs Media Library images. A plain URL renders a single `<img>`.
- **Cover only.** With Fit = Contain nothing is cropped, so the Image element ignores per-device crops there.
- **Exact pixel crops** (both Width and Height in px on the Image element) keep their single fixed-size file.
- **CSS backgrounds** (Section and Column background images) are not covered yet; see the roadmap.
- **The shape you pick should match the box.** The crop is chosen on the server, but the box size is set by the page's CSS. A phone crop far from the box's real shape is cropped again by `object-fit` and can look soft.

## Roadmap {#roadmap}

| Phase | Scope | Status |
|---|---|---|
| **1** | Shared renderer (`art`, `<picture>`, deferred loading, per-device preloads); `responsive` device subsets; shared fields + reader; **Carousel / Slider** (focal point, crop per device, tablet & phone image, first slide eager, later slides deferred); **Image** element (crop per device, tablet & phone image). | **Done**, shortcodes 1.16.3, Asset Optimizer 1.1.75 |
| **2** | **Before / After**: one shared crop for the pair, so both photos always match (no per-device photos). **Image Box**, **Image + Content**, **Team Member**, **Bleed Section** move to `fw_image_tag()` and the shared fields; ratio-class boxes get their per-device shape from `sc_responsive_image_box_vars()`. | **Done**, shortcodes 1.16.6 |
| **3** | **Gallery**, **Tabs**, **Testimonials** avatars; the Animation Engine image elements. | Planned |
| **4** | **Section / Column / Flexbox background images**: the same per-device crops as CSS (`image-set()` per media query). | Planned |
| **Ongoing** | Clean up crops left by an older signature; a click-to-set focal point on the image itself; editor preview per device. | Planned |

The decision behind the desktop-first model is recorded in [Design Decisions: Why per-device images override the main image instead of wrapping it](/decisions/per-device-images-desktop-first).
