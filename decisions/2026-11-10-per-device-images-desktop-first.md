---
slug: per-device-images-desktop-first
title: "Per-device images: automatic crops or uploads, and why they override the main image instead of wrapping it"
authors: [jon]
tags: [performance, option-types, shortcodes, architecture]
date: 2026-11-10
description: Slider photos looked soft on phones. Decision — one shared renderer (fw_image_tag's 'art' → <picture>) and one shared set of fields; automatic focal-point crops per device by default, an optional Tablet & Phone Image as the override, desktop-first, reusing the responsive option type with a device subset instead of wrapping the main Image field.
---

**The question:** Slider photos looked soft on phones and the mobile PageSpeed score sat in the 80s. Should images get automatic crops for tablets and phones, should users be able to upload their own tablet and phone images, and does that need a new per-device option type like the spacing control's device switcher?

<!-- truncate -->

## Context

A landscape slide photo filling a tall phone hero is shown about 1.5× wider than its box, because `object-fit: cover` crops it on screen. The browser, though, picks the file by the box's **width**, so it downloads a 768px file and stretches it to roughly 1,200px. The same mistake had already shown up three times that week: an Instagram feed, villa cards on a client site, and the slider.

The framework already had the parts. `fw_image_crop_renditions()` cuts a ratio around a focal point and saves it at several widths, and `fw_image_tag()` uses it. But only the Image element called `fw_image_tag()`; about 25 other image elements wrote their own `<img>`, and nothing produced a `<picture>`.

The `responsive` option type (the device switcher of spacing and alignment) already wraps any control per device. It is **mobile-first**: the Phone value applies everywhere and larger devices inherit from it.

## Options considered

1. **Uploads only.** Add tablet and phone image fields. Gives full control, but every slider needs extra work, and most people would not do it, so most sites stay soft.
2. **Automatic crops only.** A crop shape per device and a focal point. No extra work, but some photos cannot be cropped well (a wide panorama, a subject at the edge, text in the image).
3. **Wrap the existing Image field in `responsive`.** One field, the familiar switcher. But the type is mobile-first, so every image already saved would become the *phone* image, desktop would be empty, and every existing slider would need migrating.
4. **A new "responsive image" option type.** Clean in isolation, but a near-duplicate of `responsive` with the opposite cascade, another control to maintain in the builder, the Gutenberg bridge and the AI tools.
5. **Automatic crops by default, uploads as an override, desktop-first, reusing `responsive` with a device subset.** Keep the main Image as the desktop picture; add a Focal Point, a per-device crop shape, and an optional Tablet & Phone Image.

## Decision

**Option 5**, built once and shared:

- **Renderer:** `fw_image_tag( $id, array( 'art' => … ) )` writes a `<picture>` with one `<source>` per breakpoint, each a `srcset` of real pre-cropped files, plus per-device preload hints for the main image.
- **Fields:** `sc_responsive_image_fields()` adds Focal Point, Crop on Smaller Screens and Tablet & Phone Image to any element; `sc_responsive_image_art()` reads them back.
- **Option type:** `responsive` gains `'devices'` (edit only some devices) and `'off_note'`, rather than a new type.
- **Cascade:** desktop-first for images. The main picture owns large desktop; each smaller screen inherits the next larger one unless set.
- **Roll-out:** Slider and Image first, then Before/After (one shared crop for the pair), Image Box, Image + Content, Team, Gallery, and finally CSS section backgrounds.

## Why

- **Most sites get sharp phone images without doing anything new.** A crop shape set once on the slider applies to every slide, and the focal point covers most photos. The upload is there for the cases a crop cannot fix.
- **No saved data changes.** Wrapping the main Image field would have turned every existing photo into the phone image. Adding override fields beside it leaves every page as it was until someone opts in.
- **One control, not two.** Reusing `responsive` keeps the familiar switcher, the builder's device sync and the Gutenberg bridge. The only new behaviour, a device subset, is small and useful elsewhere. The cascade direction stays a property of the consumer, documented in each field's description.
- **One renderer means the fix lands everywhere.** Each element that moves to `fw_image_tag()` gets sharp per-device files, deferred loading and correct preloads, instead of every element repeating the stretched-file mistake in its own `<img>`.

Reference: [Responsive images](/developers/responsive-images).

*Status: Accepted. Phase 1 (Slider, Image) shipped in shortcodes 1.16.3.*
