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

<img src="/img/extensions/asset-optimizer/serve-webp.png" alt="The Serve WebP images switch" width="1658" />

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

<img src="/img/extensions/asset-optimizer/webp-quality.png" alt="The WebP quality slider, set to 80" width="1658" />

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

## Serve AVIF images

<img src="/img/extensions/asset-optimizer/serve-avif.png" alt="The Serve AVIF images switch" width="1658" />

AVIF is the newer of the two modern photo formats, and it beats WebP by a useful margin. On the
same photograph measured above:

| Format | File size |
| --- | --- |
| JPEG, quality 82 | 100.8 KB |
| WebP, quality 80 | 61.0 KB |
| **AVIF, quality 60** | **43.9 KB** |

That is 56% under the JPEG and **28% under the WebP** — so it is worth having even on a site that
already serves WebP.

It is switched on separately from WebP, and the two work together: where an AVIF copy exists the
browser takes it, where it does not the WebP is used, and where neither exists the original is.
Nothing is destroyed, so turning this off goes straight back to what you had.

### Why it converts in the background instead of as pages are viewed

This is the one place where AVIF is genuinely different from WebP, and it is worth understanding
before you switch it on.

**AVIF is slow to encode.** Measured on that same photograph, WebP took 65 ms and AVIF took
**1,787 ms** — about 27 times longer. [Serve WebP images](#serve-webp-images) can afford to convert
a few images while a page is being rendered because 65 ms each is small. Doing the same with AVIF
would add roughly seven seconds to one visitor's page load, which is the opposite of what this
extension is for.

So AVIF never encodes during a page view, and never during an upload either. Instead:

- **New uploads are queued**, not converted, so uploading stays as fast as it was.
- **A background job runs every five minutes** and converts for about twenty seconds, then stops.
  It takes the queue first, then walks the rest of your library from the oldest image onwards,
  remembering where it got to.
- **The front end only ever serves a copy that already exists.** Until one does, visitors get the
  WebP or the original exactly as before.

A site therefore catches up by itself over hours rather than all at once, and nobody waits for it.

:::tip[Converting a large library now]
If you would rather not wait, do it from the command line — no time budget, no page to keep
responsive:

```
wp fw-ao avif --status      # how many attachments are left to check
wp fw-ao avif               # convert everything
wp fw-ao avif --limit=50    # just the next 50
wp fw-ao avif --restart     # start again from the beginning of the library
```

Budget roughly two seconds per file, and remember an attachment is several files — the original
plus each generated size.
:::

### How it is served

Each image is wrapped in a `<picture>` element offering the AVIF first, with the ordinary `<img>`
left inside it as the fallback:

```html
<picture>
  <source type="image/avif" srcset="photo-1024x683.avif 1024w, photo-768x512.avif 768w" sizes="…">
  <img src="photo-1024x683.jpg" srcset="…" sizes="…" alt="…">
</picture>
```

The browser chooses. That matters because AVIF support is not universal the way WebP's is — Safari
only gained it in version 16.4, long after WebP — so simply swapping the URL, which is what the WebP
option does, would hand an AVIF to a browser that cannot display it.

It also means **the HTML is the same for every visitor**, so the page stays safe to put behind a
page cache or a CDN. (The alternative — deciding from the request's `Accept` header — produces
different HTML for different browsers, and a cache that does not know that will serve the wrong one.)

An image that already sits inside a `<picture>` you wrote yourself is left alone, and an image whose
srcset is only partly converted is left alone too, rather than being offered an incomplete set of
widths.

### AVIF quality

<img src="/img/extensions/asset-optimizer/avif-quality.png" alt="The AVIF quality slider, set to 60" width="1658" />

**60 is the default.** AVIF numbers are not JPEG or WebP numbers — 60 here is roughly comparable to
WebP at 80 to look at, which is why the default sits lower than the WebP one rather than matching it.

As with WebP, changing this marks the existing copies out of date, and the background job re-makes
them over its next few runs.

### When nothing happens

AVIF encoding needs **PHP 8.1 or newer with GD built against libavif**, or ImageMagick with AVIF
support. A good deal of hosting does not have it. The setting says so on the settings screen when
your server cannot do it, rather than silently doing nothing.

As with WebP, a copy that does not come out smaller than the file it would replace is thrown away and
not retried — and the comparison is against whichever file would otherwise have been served, so on a
site with WebP on it has to beat the WebP, not the original.

## Image quality

<img src="/img/extensions/asset-optimizer/image-quality.png" alt="The Image quality slider, set to 82" width="1658" />

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

<img src="/img/extensions/asset-optimizer/image-sizes.png" alt="The Generate missing image sizes switch" width="1658" />

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
