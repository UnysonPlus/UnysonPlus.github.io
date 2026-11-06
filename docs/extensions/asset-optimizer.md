---
sidebar_position: 7
title: "Free WordPress Asset Optimizer — Combine CSS and JS"
sidebar_label: "Asset Optimizer"
description: "Free WordPress performance plugin — combine and minify CSS and JavaScript to cut HTTP requests and speed up page loads. The asset optimization premium performance plugins charge for."
---

# Asset Optimizer

<div class="ext-hero">
  <span class="ext-hero__badge">FREE!</span>
  <p class="ext-hero__title">Premium performance — faster pages in minutes.</p>
  <p class="ext-hero__sub">Combine and minify enqueued CSS and JavaScript to cut HTTP requests and speed up load times — the asset optimization premium performance plugins charge for, free.</p>
</div>

**Asset Optimizer** combines your front-end **CSS** and **JavaScript** into single cached files,
cutting the number of HTTP requests a visitor's browser has to make. It detects every enqueued asset
on your site and lets you pick exactly which ones to merge, so you stay in control.

Activate it from **Unyson+ → Extensions**, then open its settings, which has a **CSS** tab and a
**JavaScript** tab.

:::tip[💡 Web dev tip: fewer, smaller requests — but measure]
Combining and minifying CSS/JS cuts the number and size of downloads, which speeds up loading — but always **measure** before and after with real tools, because aggressive combining can occasionally backfire. Pair it with browser caching and right-sized images for the biggest wins. See [Performance](/performance).
:::

## How it discovers assets

To know what to combine, Asset Optimizer needs to see your front end render. It does a one-time
internal request to your homepage and remembers the stylesheets and scripts that load. To re-scan
later (after activating a new plugin or theme, or if your site is behind a full-page cache like WP
Engine), visit any page with **`?fw_asset_optimizer_discover=1`** appended to the URL, then return to
the settings and refresh.

## CSS

Every stylesheet detected on the front end is listed and **checked by default**. Uncheck any you
*don't* want merged, those keep loading as separate requests; the rest are combined into one cached
file.

The list is shown in the order the combined file uses, with the **theme stylesheets floated to the
end** (parent then child) so the cascade is preserved, your child theme's CSS still has the authority
to override the framework and shortcode styles.

### Finding things in a long list

A real site registers a couple of hundred stylesheets, so the list is folded into **collapsible
groups** — WordPress core, the framework, shortcodes, each extension, animation effects, the parent
and child themes, generated CSS, and other plugins. Groups come from each asset's *path*, which is
what actually identifies its owner, rather than its handle name, which a plugin can choose freely.

Each group header carries a **tri-state checkbox** (checked, partially checked, unchecked) that
toggles the whole group, and a count of how many of its stylesheets are being combined. Above the
list are **Check all** / **Uncheck all**, a **filter box** that matches on handle or path, and an
**Only unchecked** toggle for reviewing just the exclusions. A group with nothing selected is greyed
out, so a glance down the collapsed list shows what is being left out without opening anything.

Groups are ordered by where their first stylesheet falls in the cascade, and handles keep their
cascade order *inside* each group — the list is grouped, never re-sorted, so it still reads
top-to-bottom the way the combined file is assembled.

:::note Animation effects
The Animation Engine's effect partials get their own group. Their classes are applied by JavaScript
after the page loads, which makes them the easiest thing on the page to break by excluding the wrong
handle — so they are kept visible as one set rather than scattered through the list.
:::

## Removing unused CSS

Combining solves the number of requests; it does not make the CSS smaller. A typical page uses
under 15% of the stylesheet it downloads — the framework and every shortcode ship all the variants
they *can* render, and a page uses one of them.

Switch on **Remove unused CSS** and each page gets its own copy of the bundle with the rules nothing
on it can match taken out. WordPress's own inline block styles are trimmed at the same time — on a
page built with the page builder rather than blocks those are typically **70% unused**. On a measured site the homepage went from **39.3 KiB to 16.3 KiB
gzipped** with no rendering change at all. The purged copy is generated the first time a page is
viewed and cached from then on, so visitors never wait for it.

It needs **Combine CSS** on. It works with either **CSS delivery** setting: with *Inline* the trimmed
stylesheet is what gets written into the page, not the full one.

:::note The Live Editor is never affected
Editing a page with the Live Editor switches the whole optimizer off for that one request, so the
editor always gets the complete stylesheet. It has to: the editor builds its interface after the page
loads, so none of it is visible to the scan that decides which rules are in use, and without this it
would come up unstyled. Your visitors still get the optimized page as normal.
:::

:::caution Test it before you rely on it
This is the one setting here whose mistakes are quiet. A rule removed in error does not raise an
error: it shows up as a button with no hover, or a mobile menu that opens wrong, on a page nobody
re-tested. After switching it on, click through a few pages — open the menu, expand an accordion,
hover the buttons, tab through the links.

If something looks wrong, add `?fw_ao_nopurge=1` to the URL. That serves the full stylesheet for
that one request, so you can tell immediately whether this feature is the cause.
:::

### The safelist

A page is scanned as it arrives, and a lot of CSS exists for moments that scan never sees — a menu
opened, a row hovered, a slider started, an element scrolled into view. Those are protected
automatically: state classes (`is-`, `has-`, `active`, `open`…), every hover and focus rule,
animation and slider classes, the Animation Engine's effects, and anything driven by an attribute
such as `aria-expanded`.

Add to **Never remove (safelist)** only for class names your own JavaScript adds. One per line; a
plain entry keeps any selector containing that text, and slashes make it a regular expression:

```
promo-banner
/^\.seasonal-/
```

If an entry is not a usable pattern — an unclosed bracket, a stray slash — it cannot protect
anything. That used to pass unnoticed, because the only symptom was CSS still going missing. Such
entries are now ignored and reported in a notice in the WordPress admin, naming the line at fault.

### Elements that build themselves with JavaScript

Some elements create their own markup after the page has loaded — a table of contents builds its
list from the headings it finds, for instance. None of that markup exists in the page that was
scanned, so every rule written for it looks unused and is removed. What you see is an element that
loads with no styling at all: a list of plain links where there should be a laid-out table of
contents.

The elements that ship with Unyson+ protect themselves, so this is already handled for them. If you
have written your own element or script that generates markup, protect its class names by adding
the prefix to **Never remove (safelist)** — one entry such as `my-widget` covers
`my-widget__item`, `my-widget__link` and the rest of the family.

Developers can register the same protection from code so it needs no setting at all; see the
Asset Optimizer reference in the AI Dev Kit for the filter.

## Inline small leftover stylesheets

Combining cannot reach every stylesheet, and some of them it is deliberately left out of.

Elements that load their styling only on the pages that use it are the common case — an animation
effect, for instance, ships its CSS on the pages where that effect appears and nowhere else. That is
the right thing to do: the alternative is every page carrying every effect's styling. But it leaves
those files outside the bundle, and each one is then its own request the browser waits for before it
draws anything.

At a kilobyte apiece, the waiting is the entire cost — the downloading is nothing. On a measured page
four such files, about a kilobyte each, were holding up the first paint by an estimated 380&nbsp;ms
between them.

Switching this on puts their contents into the page where the link was, so they cost nothing to
fetch. Note this is the *opposite* trade from inlining a whole stylesheet: there, the bytes are the
problem and the saved request does not pay for them. Here there are almost no bytes, and the request
is the problem.

It only moves small files, with a limit on the total for any one page, and it leaves alone anything
scoped to a particular medium such as print — that is not holding up the first paint, and the
condition would be lost if its rules were poured into the page.

Inlining per page does not undo what keeping those files separate was protecting: a page inlines only
the files that page actually linked, so nothing becomes site-wide.

This works independently of **CSS delivery** — it tidies up whatever is left over once the rest has
been bundled, so it is just as useful alongside a linked bundle as an inlined one.

## Drop admin-only stylesheets

WordPress loads the icon font it uses for its own dashboard — `dashicons`, around 36&nbsp;KB — on
your public site as well, where not one of its icons is ever drawn. It is a render-blocking request:
every visitor waits for a file none of them benefits from. The editor and page-builder panel styles
are the same, built for screens that only exist inside the admin.

Switching this on stops those files being requested on the front end.

It leaves them alone while the admin toolbar is on screen, because the toolbar draws its own icons
from that font. So the page looks unchanged while you are logged in — log out, or open the site in a
private window, to see the difference.

This is independent of **Combine CSS**. Those files were already kept out of the combined
stylesheet, but keeping them out of the bundle still left the browser fetching them separately,
which is the request this removes.

It is off by default because "admin-only" is a judgement about intent: a theme is free to use a
dashicon somewhere on the public site, and if yours does, those glyphs would disappear. Switching it
on is how you confirm it does not — so after you do, glance at the front end logged out.

## Move late CSS into the head

Some elements write their own CSS while the page is being built, and it ends up at the bottom of the
page — after the browser has already drawn them. Rules that decide how wide an element is, or whether
it is centred, then arrive too late, and the element visibly jumps into place.

On a measured page the hero was drawn against the left edge and then jumped **360 pixels across** when
its CSS finally loaded. That single jump accounted for the page's entire layout-shift score:

| | Layout shift score |
| --- | --- |
| Off | 0.1468 |
| **On** | **0.0000** |

Switching this on collects those blocks and puts them in the page head, where they belong, so
everything is drawn in its final position the first time. The page looks exactly the same once
loaded — it just stops moving while it gets there.

:::tip If a tool blames your fonts
Page-speed tools often attribute this kind of shift to a web font, because fonts are the usual
culprit. A quick way to tell them apart: a font swap moves things **downwards**, as text re-wraps.
If your content is jumping **sideways**, it is late CSS, not the font.
:::

## Preloading the hero image

A slow "largest contentful paint" usually is not about file size — it is about *when* the browser
finds out the image exists. Normally it cannot know until it has downloaded the stylesheet, built
the layout and reached that element.

**Preload the hero image** tells it straight away. It also removes the `loading="lazy"` attribute
from that one image, which matters more than it sounds: the page builder marks every image lazy,
including the one in your hero — so the browser was being told to *delay* the very element the
score is measured on.

On a test page over a typical mobile connection this took the largest contentful paint from
**3.2 seconds to 2.3** — nearly a second, with no change to the page itself.

The hero is the first reasonably-sized image after your header, ignoring logos and icons. If a page
has no such image, nothing is added.

:::tip Measure it on a real connection
On a local site this setting appears to do nothing — there is no network latency to hide, so the
order things are fetched barely matters. Test it with throttling on, or on the live site.
:::

## Inline or linked? (the render-blocking question)

A linked stylesheet is a *render-blocking request*: the browser will not paint until it has it. Tools
flag this, and switching **CSS delivery** to *Inline* makes the warning go away, because the CSS
travels inside the page.

Whether that is actually an improvement depends on how people use your site. Measured on a real page
over a throttled connection:

| | First view | Every later page view |
| --- | --- | --- |
| **Linked file** | 30.2 KB | 12.0 KB (CSS already cached) |
| **Inline** | 30.2 KB | 30.2 KB (CSS re-sent every time) |

The first view costs the same either way, and inline painted about **50–85 ms sooner** because it
saves a round trip. But the stylesheet can no longer be cached, so **every subsequent page costs an
extra 18 KB**.

So: *Inline* suits a site where most visits are a single page — a landing page or a campaign page.
*Linked file* suits a site people browse, where the stylesheet is fetched once and reused, and it is
the default for that reason. Either way the difference is small; this is a refinement, not a rescue.

### How big is too big to inline?

*Inline* is refused outright once the stylesheet passes **50&nbsp;KB compressed**, and it is worth
being clear that this is a **ceiling, not a recommendation**. It is the point past which inlining is
obviously wrong, not the point up to which it is a good idea.

As a working figure, inline up to about **15&nbsp;KB compressed** on a site people browse through,
and treat the rest of the range as suitable only for a genuine single-page visit where there is no
second navigation to pay for the repeated bytes. The number that actually matters is not the file
size on its own but the file size multiplied by how many pages a visitor opens.

If your stylesheet is larger than that and you still want the blocking request gone — which is the
usual situation on a real site — **Inline the first screen's CSS** below is the option that
addresses it, rather than raising the ceiling.

## Inline the first screen's CSS

This is the option for the common case the two choices above cannot solve: a stylesheet too large to
inline, which still blocks the first paint.

It splits the stylesheet in two. The rules the first screen needs go straight into the page, so there
is nothing to wait for before the browser can draw. The rest is fetched immediately afterwards
without holding anything up, and because it stays a file, it is still cached and reused on the next
page.

On a measured site the stylesheet was 338&nbsp;KB (91&nbsp;KB compressed) — far beyond the inlining
limit, and inlining it whole would have added those 91&nbsp;KB to every single navigation. The part
the first screen actually needed was a fraction of it.

:::warning Check this one before relying on it
Which rules the first screen needs is worked out from **the order of your page's own markup** — the
things near the top of the HTML — because deciding it properly would mean actually drawing the page,
which cannot be done while the page is being built.

That approximation is right on the great majority of layouts and wrong on a particular kind: one
whose main content sits late in the HTML and is moved to the top visually by CSS. There, the top of
the screen can appear unstyled for an instant before the rest of the stylesheet lands.

So after switching it on, load a few different pages — a post, an archive, the home page — and watch
the top of the screen as each one appears. If anything flashes, switch it back off.
:::

Requires **CSS delivery** set to *Linked file*, and works best with **Remove unused CSS** on, since
it splits whatever stylesheet the page is already serving.

It does nothing at all on a short page — if the whole document is about as big as the first screen,
there is no split worth making, and it leaves the page alone rather than adding a second request's
worth of complexity for no gain.

## Browser cache for static files

The combined and purged files are already cached for a year (below). Everything *else* your site
serves — your uploaded images, your fonts, the stylesheets and scripts that belong to plugins and
themes — is left to whatever your host decides, and hosts are usually conservative. On one measured
site that was seven days for images and fonts, and **no caching instruction at all** for some plugin
scripts, so returning visitors re-downloaded them every time.

**Browser cache for static files** extends the same one-year policy to all of it, by adding a block
to `wp-content/.htaccess`. Anything already in that file is left untouched, and switching the option
off removes only the block it added.

Be clear about what this is worth: it only helps people who come back. A first-time visitor downloads
everything either way, so this will not rescue a slow page — it is a small, free improvement for
repeat visits.

:::note When could this serve someone a stale file?
Almost never, by design. Plugin and theme files carry a version in their URL that changes when they
update, and WordPress never reuses an upload filename — it adds `-1` instead. Both cases produce a
new address, so the old cached copy is simply never asked for again.

The exception is replacing a file *in place* — over FTP, or with a "replace media" plugin. Someone
who already has the old one keeps it until they hard-refresh. This is also why the rule deliberately
stops short of marking files `immutable`: that would tell browsers to ignore even a hard refresh.
:::

This needs Apache or LiteSpeed. On nginx the setting shows you the equivalent configuration to paste
into your server config instead, since an `.htaccess` there would do nothing at all.

## Caching of generated files

The combined and purged files are cached by the browser for a year. This is safe because their
filenames contain a hash of their contents — change anything and the filename changes, so a visitor
can never be served a stale file. Nothing to configure; an `.htaccess` is written alongside them.

If your server is nginx rather than Apache, that file is ignored and the same rule belongs in your
server config:

```nginx
location ~* /uploads/unysonplus/asset-optimizer/.*\.(css|js)$ {
    add_header Cache-Control "public, max-age=31536000, immutable";
}
```

## Stylesheets that arrive late

Some stylesheets are not requested until the page is already being built — an element registers its
own CSS at the moment it renders, which is after the bundle has been assembled. Those used to stay
outside the bundle permanently, loading as separate requests on every single view. On one measured
site that was **seven stylesheets, about 35 KB**, every time.

Asset Optimizer now remembers what each page actually used and folds those stylesheets into the
bundle from the next view onwards. Nothing to switch on. The only thing to know is that **the very
first view of a page after a change still shows them separately** — that view is what teaches it.
Load the page twice before judging the result.

The memory is per URL, lasts a week, and is cleared automatically whenever the bundles are — when you
switch theme, activate or deactivate a plugin, run an update, or save these settings.

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

:::tip Already have a lot of images?
This fixes them as they are viewed, which is fine for a normal site. To do the whole library at once
instead, regenerate your thumbnails — `wp media regenerate` on the command line, or any of the
regenerate-thumbnails plugins.
:::

## Why an image's file size is sometimes not the problem

Before reaching for quality, check whether the image is simply **bigger than the space it is shown
in**. A photo served at 768&nbsp;px wide into a card that is 420&nbsp;px wide wastes more than any
compression setting can win back, and no amount of lowering quality fixes it — it only makes the
oversized image look worse.

The sign is in the report itself. When a tool says *"larger than it needs to be … use responsive
images"*, that is a sizing problem. When it says *"increasing the image compression factor could
improve this image"*, that is a quality problem. They have different fixes and the first one is
usually worth more.

The elements that ship with Unyson+ hand the browser a set of widths to choose from, so each visitor
downloads the size that suits their screen. If you have built your own element or template that
writes its own `<img>` tag, it will serve one fixed file to everyone unless you give it the same
treatment — see the Dev Kit reference for the helper that does it in one line.

A note on how low to go: compression quality does not reward being pushed. On a detailed photograph —
stone, foliage, water — dropping from 80 to 40 measured only **14% smaller** while being plainly
visible. Most photographs have a point past which you lose a lot of appearance for very little
weight, and 40 is well past it.

## WebP quality

Sets how hard the WebP copies are compressed. **80 is the default and a safe place to stay.**

This is a separate control from **Image quality** below, and deliberately so: WebP and JPEG are not
comparable at the same number. WebP holds detail better, so it can sit lower for the same apparent
result — which is the whole reason to serve it.

Around 70 is noticeably smaller and still hard to fault on a photograph. Below about 65 the
difference begins to show on skies and smooth gradients, where WebP's banding is easiest to see, so
look at an image you care about before keeping it. On a real photograph from a live site, at
768×512:

| Quality | File size |
| --- | --- |
| 80 (default) | 59 KB |
| 70 | 46 KB |
| 60 | 41 KB |

:::note If your images changed size after an update
Before this setting existed, the quality this extension asked for was never actually reaching the
encoder — every WebP copy was written at WordPress's own default of 86 instead. That is why the
copies were often only a little smaller than the originals rather than appreciably smaller. They are
now written at the quality you ask for, so expect existing images to get smaller the next time they
are shown.
:::

The saving appears gradually. Copies are re-made the next time each image is shown after you change
the setting — including copies made before the change, which are treated as out of date — so a busy
site spreads the work over its next few page views rather than doing it all at once.

A WebP copy is only used when it actually comes out smaller than the original. If it does not, the
original is kept and nothing is lost.

## Image quality

The theme generates its own cropped versions of your images. Until now those were written at
whatever quality the server happened to default to — on a real site that came out around 88, which
is higher than WordPress's own default and roughly twice the file size a good WebP needs.

**Image quality** sets it explicitly. 82 is WordPress's default and the recommended choice; 80 is a
little smaller again and hard to tell apart; 75 is noticeably smaller and worth checking on a photo
you care about first. On a real image from a live site, 75 produced a crop **17% smaller** than 82
with no visible difference at normal viewing size.

The saving appears gradually. Each crop is re-made the first time it is shown after you change the
setting, not all at once, so a busy site spreads the work over its next few page views rather than
doing it in one go.

PNG images are unaffected — PNG is lossless, so there is no quality to trade.

:::note Above 80 is wasted
Each crop is also saved as WebP, and visitors get whichever file is smaller. The WebP stops getting
bigger above about 80, so raising the setting past that only inflates a JPEG nobody downloads. Below
about 70 the JPEG becomes the smaller of the two and is served instead — still correct, still the
smallest file, but you are looking at JPEG compression at that point, which is where visible
artefacts start.
:::

## JavaScript

Scripts detected on the front end are listed too, but combining JS is more delicate than CSS, so the
defaults are conservative:

- **Only first-party scripts** (the UnysonPlus plugin and your active theme) are checked by default.
  Tick a third-party script to include it as well.
- **Unsafe scripts are skipped automatically, even if checked.** Only local footer scripts with no
  `async`/`defer` strategy and no inline or localized data are ever merged. WordPress core, external /
  CDN scripts, and anything carrying per-request data are always left alone.

Two switches tune the combined bundle:

| Option | What it does |
| --- | --- |
| **Defer combined script** | Adds `defer` to the bundle so it loads without blocking render. Safe because the bundle is self-contained and dependency-ordered. |
| **Minify combined script** | Strips comments and redundant whitespace (conservative, string/template/regex-aware). Most scripts are already minified, so the saving is usually small, experimental. |

### Finding out which script a performance report is blaming

Combining scripts has one real cost that is easy to miss until you need it: performance reports stop
being actionable.

When a browser flags a slow function — a long task, or a layout recalculation forced from
JavaScript — it tells you the file and line. Once everything is one bundle, that line number belongs
to the combined file, which nobody wrote and which changes every time the bundle is rebuilt. There is
no way to tell whose script is at fault, which is exactly when you most need to know.

**Record which script each line came from** writes a small companion file next to the bundle listing
which script occupies which lines:

```json
{
  "bundle": "combined-dcc54a45f7df.js",
  "sources": [
    { "handle": "theme", "source": "wp-content/themes/…/theme.js", "first_line": 1, "last_line": 94 },
    { "handle": "unysonplus-navigation", "source": "wp-content/themes/…/navigation.js",
      "first_line": 95, "last_line": 583 }
  ]
}
```

A report blaming line 354 of the bundle is then plainly `navigation.js`. The bundle itself also keeps
a comment above each script, so you can read it directly if you prefer.

This is **for diagnosis, not for everyday use.** Switching it on changes how the bundle is put
together — each script is shrunk on its own rather than all of them together — so the file is
slightly larger, and you should turn it off again when you are done. The companion file is publicly
readable and names script paths relative to your WordPress folder.

## Load below-the-fold images early

Lazy loading is the right default, but it has a visible cost on a long page: an image is not
requested until the reader scrolls near it, so the picture drops into an empty slot a beat
*after* the text around it. People read that as a slow site, and they are not wrong to — it
looks broken for a moment.

The surprise is that this usually has nothing to do with how big the images are. Measured on a
real page, scrolled at a normal reading pace on a throttled connection:

```
 13.9s     9 KB   first content image REQUESTED      ← 175 ms to arrive
 14.2s     9 KB   second
 15.1s    12 KB   third
 18.9s    36 KB   fourth
```

Every one of those took under 200 ms to download. The reader waited nearly fourteen seconds for
the first of them, not because it was slow but **because nothing had asked for it yet**.

This setting fills that gap. Once the page has finished loading, during an idle moment, the
remaining images are fetched quietly in the background. By the time anyone scrolls down, the
browser already has them and the picture is simply there.

### How cautious it is

This spends a visitor's bandwidth on images they may never scroll to, so it holds back wherever
that would be rude:

- It waits for the page's `load` event, then for an idle moment — it never competes with the
  content someone is already waiting for.
- **Save-Data and 2G visitors are skipped entirely.** Someone on a metered connection who has
  asked the browser to economise does not get speculative downloads.
- **One image at a time.** Not a burst — each finishes before the next starts, so the connection
  stays available.
- It stops after **24 images**, which covers a long page without turning a 200-image archive
  into a download.
- Images the browser has already loaded are skipped.

### It will not change your PageSpeed score

Worth being plain about: **Lighthouse never scrolls the page.** Your below-the-fold images
therefore never load during an audit whether this is on or off, so the number will not move —
and the bytes now land inside the measurement window, which if anything counts very slightly
against you. The field data in PageSpeed will not move either, because LCP, INP and CLS are all
about the first screen and interaction.

Turn this on for readers on a long, image-heavy page. Do not turn it on to chase a score; they
are different jobs.

### Why it does not simply make the images eager

The obvious implementation would be to flip the remaining images from `loading="lazy"` to
`eager` and let the browser get on with it. That would be a bug.

WordPress emits `sizes="auto"` on lazy images, and `auto` is **only valid together with
`loading="lazy"`**. The moment such an image stopped being lazy, its `sizes` would become
invalid and the browser would fall back to `100vw` — fetching the *largest* candidate in the
srcset for what might be a 240px card. Strictly worse than doing nothing at all.

So this leaves every attribute exactly as it is and warms a separate request instead, choosing
the same srcset candidate the browser would have chosen (the smallest one at least as wide as
the slot, allowing for device pixel ratio). The image element is untouched; when the reader
finally reaches it, the browser makes its own choice and finds it already in cache.

:::tip[Advanced]
`fw:ext:asset-optimizer:warm_images_max` changes the 24-image cap.
:::

## Instant navigation

Click an internal link on most WordPress sites and you wait. The browser asks the server for the
page, the server renders it (unless a page cache answers first), and then the browser throws away
everything it had and parses every stylesheet and script over again. A single-page app built with
something like React feels immediate on the same click for two reasons: it never tears the document
down, and its router quietly fetched the next page before you clicked.

The second half of that is available to any ordinary WordPress site, and it is what **Instant
navigation** switches on. The browser fetches — or, if you ask it to, fully renders — a page you look
likely to visit, so by the time you click, it is already there. Done well, an internal link stops
feeling like a page load and starts feeling like a tab.

This rides on the browser's Speculation Rules API, which WordPress supports in core from 6.8. Core
does the careful parts, and this extension deliberately does not duplicate them:

- It switches the whole feature **off for logged-in users**, and for any site not using pretty
  permalinks. (So you will not see it while you are working — check it in a logged-out window.)
- It excludes `wp-admin`, `wp-*.php`, your uploads and theme folders, and **every URL carrying a
  query string**, which covers action links such as `?add-to-cart=` or a logout link.
- It honours `rel="nofollow"`, and a `no-prefetch` or `no-prerender` class on a link or any of its
  parents, so a single link can opt out on its own.

What this extension adds is the part core leaves to plugins: choosing the behaviour from a settings
screen instead of a code snippet, and keeping speculation away from pages where it causes harm.

### Prefetch or prerender

**Prefetch** fetches the page's HTML and nothing more. No scripts run, nothing on the page executes.
It removes the download from the click, which is most of the wait on a cached site, and it is safe
anywhere. Start here.

**Prerender** goes further and renders the page completely in a hidden tab, so clicking it can feel
genuinely instantaneous — the page is already laid out and painted. The cost is that the page *really
runs*:

- Its JavaScript executes. Scroll-triggered animations may start, and in some cases play out
  entirely, before anyone sees the page. If your pages use the Animation Engine's scroll motion,
  test this properly before relying on it.
- Analytics can record a visit nobody made. Well-behaved scripts wait for the
  [`prerenderingchange`](https://developer.chrome.com/docs/web-platform/prerender-pages) event;
  many do not.
- It costs real work on the server and in the visitor's browser for a page that may never be opened.

**Auto** — the default — leaves the decision to WordPress, which currently prefetches
conservatively. An existing site therefore behaves exactly as it did until you change this.

### How early to start

Eagerness decides how keen the browser is:

| Setting | When it starts | Waste |
|---|---|---|
| **Conservative** | On mouse-down over a link | Almost none — the click is already happening |
| **Moderate** | After the pointer rests on a link for ~200ms | Low; usually ready before the click lands |
| **Eager** | As soon as a link looks like a candidate | Highest — pages fetched and never visited |

Conservative sounds too late to help, but it is not: the gap between pressing and releasing a mouse
button is enough to cover a good part of a fast page's load, and it wastes essentially nothing.
Moderate is the sweet spot for most sites. Keep **Eager** for small sites with few outgoing links,
and remember that every speculated page you do not visit is bandwidth your host paid for — doubly so
with prerender, which also spends a full render on it. The browser caps how many speculations it runs
at once whatever you ask for.

### Keeping it away from the wrong pages

Two controls, and the first is more important than it looks.

**Never speculate cart, checkout or account pages** (on by default). Core already excludes every link
with a query string, which handles add-to-cart and logout links. It does not handle a cart or
checkout page on a normal permalink — `/cart/`, `/my-account/orders/` — and **WooCommerce does not
exclude them either.** Fetching one starts a shopping session for a visitor who never went there;
prerendering one also runs its scripts, which can fire a begin-checkout event or log a stray page
view. These pages are found by asking WooCommerce and Easy Digital Downloads directly rather than
guessing from slugs, so a renamed or translated checkout is still covered. If neither is installed,
the conventional slugs are covered instead.

**Never speculate these paths** takes one path per line, each starting with a slash, with `*` as a
wildcard; a full URL pasted from the address bar is reduced to its path for you, and a line starting
with `#` is a comment.

```
/members/*
/downloads/*
/unsubscribe/*
```

Use it for anything that *does something* when it is merely loaded — a download link, a one-click
unsubscribe, a link that marks something as read. You do not need entries for wp-admin, your uploads,
or anything with a query string; those are already excluded.

### What to expect, honestly

**Only Chromium browsers act on this today** — Chrome and Edge. Safari and Firefox ignore the rules
and navigate exactly as they always have. Nothing breaks there; those visitors simply do not get the
speed-up. That also means this is safe to leave on.

**It is not a fix for a slow server.** Speculative loading removes the *wait* from a click by moving
it earlier; it does not make the page cheaper to produce. If a page takes three seconds to render,
prefetching it three seconds early hides that, but only when the visitor hovers for long enough, and
you have simply moved the cost rather than removed it. A page cache, right-sized images and a lean
asset payload are still the work. This is the layer on top.

**To check that it is on**, open the site in a logged-out Chrome window, then **DevTools → Application
→ Speculative loads**. It lists every candidate link and what happened to it — prefetched, not
eligible, or excluded — which is also the quickest way to confirm one of your exclusions is doing
what you meant.

**It pairs well with per-page CSS.** With *CSS combining scope* set to per-page, each page's combined
stylesheet is generated on its first view. A prefetch is a real request, so it warms that cache
ahead of the visit too.

:::tip[Advanced: removing a built-in exclusion]
Core's `wp_speculation_rules_href_exclude_paths` filter can only *add* paths. To drop one of the
commerce exclusions above — say you have made your cart page safe to prefetch — use
`fw:ext:asset-optimizer:speculation_sensitive_paths`, which receives this extension's list before it
is merged.
:::

## Typical workflow

1. Activate **Asset Optimizer** and open its settings (the asset lists populate from a homepage scan).
2. On the **CSS** tab, leave the stylesheets you want merged checked; uncheck any to keep separate.
3. On the **JavaScript** tab, the first-party scripts are pre-selected; tick any safe third-party
   scripts you also want combined, and optionally enable **Defer**.
4. Save. The combined, cached files are served on the front end; re-scan with
   `?fw_asset_optimizer_discover=1` whenever your asset set changes.
5. Once the page itself is fast, consider **Instant navigation** on the General tab to take the wait
   out of the next click. Prefetch first; try prerender only after testing it.

:::tip[It pairs with the clean output]
Because the theme already compiles its design into [one generated stylesheet](/theme/settings-to-css)
and the page builder emits [clean markup](/page-builder/clean-dom), Asset Optimizer has little to
clean up, it mostly folds the remaining plugin/element stylesheets and scripts into one request each.
:::
