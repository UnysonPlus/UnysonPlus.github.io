---
sidebar_position: 5
title: "Images — WebP, quality, sizes and the hero"
sidebar_label: "Images"
description: "Serve WebP copies, set JPEG and WebP quality properly, generate the sizes WordPress never made, preload the hero image, and warm lazy images before the reader scrolls to them."
---

# Images

On most real sites images are the largest thing on the page and the biggest single opportunity. Five
settings here deal with them, plus one that decides when the most important image is discovered.

## Why an image's file size is sometimes not the problem

Before reaching for quality, check whether the image is simply **bigger than the space it is shown
in**. A photo served at 768 px wide into a card that is 420 px wide wastes more than any compression
setting can win back, and no amount of lowering quality fixes it — it only makes the oversized image
look worse.

The sign is in the report itself. When a tool says *"larger than it needs to be … use responsive
images"*, that is a sizing problem. When it says *"increasing the image compression factor could
improve this image"*, that is a quality problem. They have different fixes and the first one is
usually worth more.

The elements that ship with Unyson+ hand the browser a set of widths to choose from, so each visitor
downloads the size that suits their screen. If you have built your own element or template that writes
its own `<img>` tag, it will serve one fixed file to everyone unless you give it the same treatment —
see the Dev Kit reference for the helper that does it in one line.

A note on how low to go: compression quality does not reward being pushed. On a detailed photograph —
stone, foliage, water — dropping from 80 to 40 measured only **14% smaller** while being plainly
visible. Most photographs have a point past which you lose a lot of appearance for very little weight,
and 40 is well past it.

## Serve WebP images

<img src="/img/extensions/asset-optimizer/images.png" alt="WebP quality, Image quality, Generate missing image sizes and Serve WebP images" width="1658" />

Makes a WebP copy of every uploaded JPG and PNG — and of each of its sizes and crops — and shows
visitors the WebP instead. WebP is usually **25–80% smaller for the same apparent quality**, which on
an image-heavy page is the largest saving available anywhere in this extension.

The originals are kept untouched, so turning this off simply goes back to them. Nothing is destroyed
and nothing needs re-uploading.

Existing images are converted **gradually, as pages are viewed**, a few per page view, so switching it
on does not lock up your site working through a large library. A busy site catches up over its next
few hundred page views.

A WebP copy is only used when it actually comes out smaller than the original. If it does not, the
original is kept and nothing is lost.

## WebP quality

Sets how hard those WebP copies are compressed. **80 is the default and a safe place to stay.**

This is a separate control from **Image quality** below, and deliberately so: WebP and JPEG are not
comparable at the same number. WebP holds detail better, so it can sit lower for the same apparent
result — which is the whole reason to serve it.

Around 70 is noticeably smaller and still hard to fault on a photograph. Below about 65 the difference
begins to show on skies and smooth gradients, where WebP's banding is easiest to see, so look at an
image you care about before keeping it. On a real photograph from a live site, at 768×512:

| Quality | File size |
| --- | --- |
| 80 (default) | 59 KB |
| 70 | 46 KB |
| 60 | 41 KB |

:::note[If your images changed size after an update]
Before this setting existed, the quality this extension asked for was never actually reaching the
encoder — every WebP copy was written at WordPress's own default of 86 instead. That is why the copies
were often only a little smaller than the originals rather than appreciably smaller. They are now
written at the quality you ask for, so expect existing images to get smaller the next time they are
shown.
:::

The saving appears gradually. Copies are re-made the next time each image is shown after you change
the setting — including copies made before the change, which are treated as out of date — so a busy
site spreads the work over its next few page views rather than doing it all at once.

## Image quality

The theme generates its own cropped versions of your images. Until this setting existed those were
written at whatever quality the server happened to default to — on a real site that came out around
88, which is higher than WordPress's own default and roughly twice the file size a good WebP needs.

**Image quality** sets it explicitly. 82 is WordPress's default and the recommended choice; 80 is a
little smaller again and hard to tell apart; 75 is noticeably smaller and worth checking on a photo
you care about first. On a real image from a live site, 75 produced a crop **17% smaller** than 82
with no visible difference at normal viewing size.

The saving appears gradually. Each crop is re-made the first time it is shown after you change the
setting, not all at once.

PNG images are unaffected — PNG is lossless, so there is no quality to trade.

:::note[Above 80 is wasted]
Each crop is also saved as WebP, and visitors get whichever file is smaller. The WebP stops getting
bigger above about 80, so raising the setting past that only inflates a JPEG nobody downloads. Below
about 70 the JPEG becomes the smaller of the two and is served instead — still correct, still the
smallest file, but you are looking at JPEG compression at that point, which is where visible artefacts
start.
:::

## Generate missing image sizes

WordPress normally saves several versions of every image you upload, so a browser can fetch one that
suits the space it has to fill. If those in-between versions were never made, there is nothing to
choose from and **every visitor downloads the full-size original**, however small it appears on the
page.

This is the usual state of images brought in by the Site Converter, which makes only two sizes on
purpose because resizing is the slowest part of a conversion.

**Generate missing image sizes** fills in what is absent. On a measured page a slot 1024 pixels wide
was downloading the 1440-wide original at **91.9 KB**; with the missing sizes in place the browser
took the 1024-wide file at **67.7 KB** instead — 26% less, for exactly the same picture on screen.

The work happens gradually as pages are viewed, one image per view, so no page stalls waiting for it;
a page with several unfinished images catches up over its next few visits. An image that cannot be
processed is noted and quietly skipped rather than retried forever.

:::tip[Already have a lot of images?]
This fixes them as they are viewed, which is fine for a normal site. To do the whole library at once
instead, regenerate your thumbnails — `wp media regenerate` on the command line, or any of the
regenerate-thumbnails plugins.
:::

## Preload the hero image

<img src="/img/extensions/asset-optimizer/preload-hero.png" alt="Preload the hero image" width="1658" />

A slow "largest contentful paint" usually is not about file size — it is about *when* the browser
finds out the image exists. Normally it cannot know until it has downloaded the stylesheet, built the
layout and reached that element.

**Preload the hero image** tells it straight away. It also removes the `loading="lazy"` attribute from
that one image, which matters more than it sounds: the page builder marks every image lazy, including
the one in your hero — so the browser was being told to *delay* the very element the score is measured
on.

On a test page over a typical mobile connection this took the largest contentful paint from **3.2
seconds to 2.3** — nearly a second, with no change to the page itself.

The hero is the first reasonably-sized image after your header, ignoring logos and icons. If a page
has no such image, nothing is added.

:::tip[Measure it on a real connection]
On a local site this setting appears to do nothing — there is no network latency to hide, so the order
things are fetched barely matters. Test it with throttling on, or on the live site.
:::

:::note[If the hero still paints late]
Preloading fixes *discovery*. If a report shows the image downloading quickly and then a long
**element render delay** before it appears, the problem is not discovery — the browser has the image
and is too busy to paint it. Look at how much CSS the page has to parse first; see
[Inline or linked?](./css#inline-or-linked-the-render-blocking-question).
:::

## Load below-the-fold images early

<img src="/img/extensions/asset-optimizer/warm-images.png" alt="Load below-the-fold images early" width="1658" />

Lazy loading is the right default, but it has a visible cost on a long page: an image is not requested
until the reader scrolls near it, so the picture drops into an empty slot a beat *after* the text
around it. People read that as a slow site, and they are not wrong to — it looks broken for a moment.

The surprise is that this usually has nothing to do with how big the images are. Measured on a real
page, scrolled at a normal reading pace on a throttled connection:

```
 13.9s     9 KB   first content image REQUESTED      ← 175 ms to arrive
 14.2s     9 KB   second
 15.1s    12 KB   third
 18.9s    36 KB   fourth
```

Every one of those took under 200 ms to download. The reader waited nearly fourteen seconds for the
first of them, not because it was slow but **because nothing had asked for it yet**.

This setting fills that gap. Once the page has finished loading, during an idle moment, the remaining
images are fetched quietly in the background. By the time anyone scrolls down, the browser already has
them and the picture is simply there.

### How cautious it is

This spends a visitor's bandwidth on images they may never scroll to, so it holds back wherever that
would be rude:

- Every warm request is marked **low priority**, so the browser schedules it behind anything the
  reader is actually waiting for. It cannot slow down the page it is running on.
- It starts at the page's `load` event, or after about 1.2 seconds, **whichever comes first**. The
  timeout matters more than it sounds: on a page where something holds `load` open — a hero carousel
  that keeps fetching slides will do it — waiting for `load` alone means warming begins long after the
  reader has already scrolled. Measured on a real site, `load` did not fire until **12.6 seconds**.
- **Save-Data and 2G visitors are skipped entirely.** Someone on a metered connection who has asked
  the browser to economise does not get speculative downloads.
- **A few at a time** (four), not the whole page at once.
- It stops after **24 images**, which covers a long page without turning a 200-image archive into a
  download.
- Images the browser has already loaded are skipped.

### It will not improve your PageSpeed score — and can lower it

Worth being plain about, and this page used to get it wrong. It is true that **Lighthouse never
scrolls the page**, so you might expect the warmed images to fall outside the audit entirely. They do
not: warming starts from the page's `load` event **whether or not anyone scrolls**, so an audit does
download them, inside its own measurement window. On a measured site that turned a 0.7 MB phone page
load into roughly 2 MB.

So the honest expectation is that this makes the number slightly *worse*, not better — it adds bytes
and network contention to the measured window and returns nothing a one-page audit can see. The field
data will not move either way, because LCP, INP and CLS are all about the first screen and
interaction.

**Leave it off on a page whose images are large**, where that extra traffic is most of the page
weight. Turn it on for readers on a long page of small images. Do not turn it on to chase a score;
they are different jobs.

### There is a floor

Warming cannot start before the first screen is done, so a reader who scrolls within the first second
is still ahead of it. Measured on a real eleven-image page (median of three runs, counting images the
scroll had to fetch on demand): scrolling at **3 seconds** went from 10 to **0**, and at **2 seconds**
from 11 to **3**. At **1 second** it makes little difference — nothing has had time to warm yet, and
starting earlier would compete with the content on screen.

### Why it does not simply make the images eager

The obvious implementation would be to flip the remaining images from `loading="lazy"` to `eager` and
let the browser get on with it. That would be a bug.

WordPress emits `sizes="auto"` on lazy images, and `auto` is **only valid together with
`loading="lazy"`**. The moment such an image stopped being lazy, its `sizes` would become invalid and
the browser would fall back to `100vw` — fetching the *largest* candidate in the srcset for what might
be a 240px card. Strictly worse than doing nothing at all.

So this leaves every attribute exactly as it is and warms a separate request instead, choosing the
same srcset candidate the browser would have chosen (the smallest one at least as wide as the slot,
allowing for device pixel ratio). The image element is untouched; when the reader finally reaches it,
the browser makes its own choice and finds it already in cache.

:::tip[Advanced]
`fw:ext:asset-optimizer:warm_images_max` changes the 24-image cap,
`fw:ext:asset-optimizer:warm_images_delay` the 1200 ms fallback start, and
`fw:ext:asset-optimizer:warm_images_concurrency` how many warm at once (4).
:::
