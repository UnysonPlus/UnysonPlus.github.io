---
sidebar_position: 1
title: Overview
---

# Gutenberg Blocks

UnysonPlus elements normally live in the **Page Builder**. This extension makes a selected few
available as native **Gutenberg blocks** as well, so they can be used on sites — or by editors —
that work in the block editor.

It is deliberately additive. Activating it changes nothing about the page builder, the shortcodes
or any existing page.

## The blocks

| Block | Element | What it is |
| --- | --- | --- |
| [**Global Section**](./global-section.md) | `global_section` | A saved section placed by reference |
| [**Snippet**](./snippet.md) | `snippet` | A saved snippet, output by name |
| [**Scroll Indicator**](./scroll-indicator.md) | `scroll_indicator` | A scroll-down cue for a hero |
| [**Site Search**](./site-search.md) | `site_search` | A site search field |
| [**Lottie**](./lottie.md) | `lottie` | A Lottie JSON animation with playback triggers |
| [**SVG Draw**](./svg-draw.md) | `svg_draw` | An SVG whose strokes draw themselves |
| [**3D Model**](./model-viewer.md) | `model_viewer` | An interactive glTF / GLB model with AR |
| [**Avatar**](./avatar.md) | `avatar` | A user avatar — photo, initials or icon |
| [**Image**](./media-image.md) | `media_image` | A single image with a style treatment and priority hint |
| [**Video**](./media-video.md) | `media_video` | A video — self-hosted or embedded |
| [**Text Block**](./text-block.md) | `text_block` | Rich text with columns, drop caps and measure |
| [**Featured Image**](./featured-image.md) | `featured_image` | The current post's featured image |
| [**Audio Player**](./audio-player.md) | `audio_player` | An audio player with a playlist |
| [**Author Box**](./author-box.md) | `author_box` | An author card with avatar, bio and links |
| [**Calendar**](./calendar.md) | `calendar` | A month calendar with events |
| [**Image Hotspots**](./image-hotspots.md) | `image_hotspots` | An image with pins that reveal text |
| [**Map**](./map.md) | `map` | An embedded map with markers |
| [**Image Box**](./image-box.md) | `image_box` | An image with a heading, text and a button |
| [**Gallery**](./gallery.md) | `gallery` | An image gallery with captions and a lightbox |
| [**Team Member**](./team-member.md) | `team_member` | A person card — photo, name, role and links |
| [**Progress**](./progress.md) | `progress` | Progress bars or circular meters |
| [**Business Info**](./business-info.md) | `business_info` | Opening hours, contact details and a live open/closed status |
| [**Carousel**](./carousel.md) | `carousel` | A slider of image or content slides |
| [**Feature List**](./feature-list.md) | `feature_list` | A list of features with icons or markers |
| [**Comparison Table**](./comparison-table.md) | `comparison_table` | A feature-comparison table with a highlighted column |
| [**Icon**](./icon.md) | `icon` | A single icon with an optional title and badge |
| [**Accordion**](./accordion.md) | `accordion` | Collapsible panels with icons, numbering and FAQ schema |
| [**Testimonials**](./testimonials.md) | `testimonials` | Customer quotes with avatars, ratings and an optional carousel |
| [**Social Icons**](./social-icons.md) | `social_icons` | A row of social profile links |
| [**Divider**](./divider.md) | `divider` | A separator — a line, an icon, text or a shape |
| [**Tabs**](./tabs.md) | `tabs` | Tabbed panels with optional media, autoplay and deep links |
| [**Steps**](./steps.md) | `steps` | A numbered sequence with markers and connectors |
| [**Timeline**](./timeline.md) | `timeline` | A vertical timeline of dated entries |
| [**Logo Grid**](./logo-grid.md) | `logo_grid` | A grid or scrolling row of client logos |
| [**Notification**](./notification.md) | `notification` | A notice, announcement bar or floating toast |
| [**Highlight Text**](./highlight-text.md) | `highlight_text` | Text with an animated marker, underline or circle highlight |
| [**Tooltip**](./tooltip.md) | `tooltip` | Text or an icon that reveals a tooltip on hover, focus or click |
| [**Social Share**](./social-share.md) | `social_share` | Share buttons for the current page |
| [**Modal Popup**](./modal-popup.md) | `modal_popup` | A button, link, icon or image that opens content in a modal dialog |
| [**Animated Heading**](./animated-heading.md) | `animated_heading` | A heading whose last words rotate through a list — typewriter, slide, flip |
| [**Newsletter**](./newsletter.md) | `newsletter` | An email signup form — heading, fields, consent line and a subscribe button |
| [**Blockquote**](./blockquote.md) | `blockquote` | A pull quote with author, role and source link |
| [**Badge**](./badge.md) | `badge` | A small pill of text — label, announcement or status marker |
| [**Tag List**](./tag-list.md) | `tag_list` | A row of small tags from a list of lines |
| [**Text Expander**](./text-expander.md) | `text_expander` | A short excerpt with a Read more toggle that reveals the rest |
| [**Special Heading**](./special-heading.md) | `special_heading` | An overline, title and subtitle — the standard way to open a section |
| [**Icon Box**](./icon-box.md) | `icon_box` | An icon above a heading and text — the standard feature or service card |
| [**Video Popup**](./video-popup.md) | `video_popup` | A poster image with a play button that opens the video in a lightbox |
| [**Star Rating**](./star-rating.md) | `star_rating` | A star rating with optional score, label and review count |
| [**Counter**](./counter.md) | `counter` | An animated number that counts up when scrolled into view |
| [**Before / After**](./before-after.md) | `before_after` | An image comparison slider — drag, hover or click to reveal |

They appear under a **UnysonPlus** category in the block inserter.

## How a block relates to the element

Each block is a **dynamic block** that delegates its rendering to the existing shortcode:

```
Block editor          →  React inspector, generated from the option schema
Front end             →  PHP renders the shortcode, exactly as the page builder does
```

That split is the point. React handles *editing*; PHP still handles *rendering*, so a block can
never drift away from what the element actually outputs. There is no second implementation to keep
in sync — fix the shortcode and the block is fixed too.

:::note[The inspector is generated, not hand-built]
A block's sidebar is produced from the same option schema an `options.php` file declares, rendered
by the [React control layer](/docs/options/option-types/text#in-gutenberg-blocks-the-react-control).
Adding a block is therefore mostly a matter of choosing *which* options to expose — not writing a
settings UI.
:::

## What the sidebar shows

Each block exposes a **curated subset** of its element's options, not the whole schema. A page
builder panel is a wide, tabbed surface; a block sidebar is a narrow column, and every element also
carries shared Advanced and Animations tabs that would swamp it.

Anything not shown still **round-trips untouched**. The block only ever writes the values you
change, so an element styled in the page builder and then opened as a block keeps every setting the
sidebar does not display.

:::caution[Some options are page-builder only]
An option type with no React control shows a short "no React control yet" notice rather than a
broken field, and stays fully editable in the page builder. That is a coverage gap, not an error.

The composite types — repeaters (`addable-popup`), `multi-picker`, `wp-editor`, `code-editor` — are
the main ones, which is why blocks exist for elements whose interesting options are simple.
:::

## Previews are inert on purpose

A block's canvas preview is a **picture** of the element, not a working copy:

- **Before / After** would otherwise swallow the click that selects the block, and a drag on its
  handle would become a Gutenberg *block* drag.
- **Counter** would re-run its count-up every time the editor scrolls it into view, which reads as
  the preview flickering while you work.

Visitors get the fully interactive element on the front end.

## Requirements

Core 2.16.29 or later, with the **Shortcodes** extension active — the blocks render through it.

## Every block has a page

Each block above links to its own page listing **exactly which options its sidebar exposes**, and
anything block-specific worth knowing — an inert preview, an empty state, a setting that stays
page-builder-only.

That is a rule rather than a nicety: a block exposes a *curated subset* of its element's options, so
without a page there is no way to know what you get in the sidebar short of inserting one and
looking. Any new block ships with its page in the same change.
