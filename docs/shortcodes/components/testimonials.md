---
title: Testimonials
sidebar_position: 17
sidebar_custom_props: { icon: '/img/shortcode-icons/testimonials.svg' }
---

# Testimonials

Display testimonials in a carousel, grid, or single layout. Tabs: **Content**, **Layout**,
**Style**, **Carousel**, **Animations**, **Advanced**.

:::tip[💡 Web dev tip: only mark up real reviews]
Genuine testimonials can use Review or AggregateRating structured data to show star ratings in search — but only when they are real and visible on the page. Present each quote in a `<blockquote>` with a `<cite>` for the author. Inventing reviews or ratings for schema breaks Google's rules and can get a site penalised. [Google: review snippet](https://developers.google.com/search/docs/appearance/structured-data/review-snippet)
:::

## Live demo

**▶ [See the Testimonials live on the demos site](https://demos.unysonplus.com/shortcodes/testimonials/)** — an interactive example you can click through.

## Content

<img src="/img/shortcodes/testimonials-content.png" alt="Testimonials options panel — Content tab" width="1200" />

- **Title** — optional section title.
- **Testimonials** — a repeatable list; each has: **Quote**, **Image** (avatar), **Name**,
  **Position**, **Website Name**, **Website Link**, **Rating**.

## Layout

<img src="/img/shortcodes/testimonials-design.png" alt="Testimonials options panel — Design tab" width="1200" />

| Option | Choices |
| --- | --- |
| **Layout Type** | Carousel, Grid, Single |
| **Grid Columns (Desktop)** | Column count for Grid |
| **Gutter Size** | Gap between items |
| **Text Align** | Left, Center, Right |
| **Container** | Container, Fluid |
| **Items per Slide (Carousel)** | Slides shown at once |

:::note[Screenshots — layout types]
Capture each layout: `testimonials-carousel`, `testimonials-grid`, `testimonials-single`.
:::

## Style

<img src="/img/shortcodes/testimonials-style.png" alt="Testimonials options panel — Style tab" width="1200" />

| Option | Choices |
| --- | --- |
| **Card Style** | Visual card variants |
| **Avatar Position** | Top (above content), Left, Right, Hide Avatar |
| **Avatar Shape** | Circle, Rounded, Square |
| **Avatar Size** | Small, Medium, Large |
| **Show Rating Stars** | On/Off |

## Read More

**Card tab → Read More.** Long reviews make cards uneven and push the names out of view. Read More
cuts every quote to the same number of lines, with a soft fade, and adds a **Read more** link only
to the quotes that are actually cut off. Short quotes that already fit get no link. It works with
every design, including the carousels and the marquee.

| Option | What it does |
| --- | --- |
| **Read More** | **Off** (default, full quotes), **Expand in card**, or **Reviews popup**. |
| **Visible Lines** | How many lines of each quote show before it is cut (3 to 12, default 6). |
| **Link Text** | The link's words (default "Read more"). |
| **Collapse Text** | *Expand in card only:* the link's words once the quote is open (default "Show less"). |
| **Popup Title** | *Popup only:* the heading of the panel, e.g. "Guest reviews" or "Airbnb reviews". |
| **Popup Logo** | *Popup only:* an optional small image beside the title, e.g. the review site's logo. |
| **Average Rating** | *Popup only:* the average of the ratings and the number of reviews under the title. |
| **Footer Link Text / URL** | *Popup only:* an optional link at the bottom of the panel, e.g. "See all reviews on Airbnb". Shown only when both are filled in. |

### Expand in card

The link opens the full quote inside its card; **Show less** closes it again. The other cards
stay as they are.

<img src="/img/shortcodes/testimonials-read-more.png" alt="Testimonials in the Masonry design: the first card is open with a Show less link, two others are cut off with a fade and a Read more link, and the short quotes have no link" width="1210" />

### Reviews popup

The link opens one panel with **every** review in full: name, position, avatar, star rating
(half stars included) and the quote. It opens scrolled to the review that was clicked and
highlights it for a moment, so visitors can carry on reading the others. Above the list sit the
title, the logo and the average rating; below it, the footer link.

<img src="/img/shortcodes/testimonials-reviews-popup.png" alt="The reviews popup: title What our users say, 4.8 average from 6 reviews, the clicked review highlighted at the top, and a See all reviews link at the bottom" width="640" />

- **On phones** the panel slides up from the bottom of the screen and fills most of it.
- **Closing:** the × button, the **Esc** key, or a click outside the panel. Focus stays inside the
  panel while it is open and returns to the link afterwards, so it works with a keyboard and
  screen readers.
- The page behind it does not scroll while the panel is open (smooth scrolling is paused too).

**Limits.** The quote is cut with CSS from the first paint, so the cards never jump when the page
loads. The fade is measured in lines of the quote's own font, so a design with a very large quote
(Pull-quote) shows fewer words in the same number of lines. Quotes are matched to the popup by their
first words, so two reviews that start with exactly the same 40 characters open at the first of them.

## Carousel

Autoplay, Autoplay Interval (ms), Pause on Hover, Show Prev/Next, Show Indicators, Indicator
Style, Wrap Around (loop).

## Styling

Colors for Section Title, Quote, Author Name, Author Job, Site Link, plus Background and
Margin & Padding.
