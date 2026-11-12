---
sidebar_position: 2
title: "Combining and delivering CSS"
sidebar_label: "CSS"
description: "Combine stylesheets into one cached file, choose a site-wide or per-page bundle, decide between a linked file and inline CSS, and clear the render-blocking requests that hold up the first paint."
---

# CSS

Six of the General tab's options and the whole **CSS** tab deal with stylesheets: how they are merged,
how they reach the browser, and how to clear the ones that hold up the first paint.

## Combine CSS

<img src="/img/extensions/asset-optimizer/combining.png" alt="Combine CSS, Combine JavaScript, CSS combining scope and CSS delivery" width="1658" />

The master switch. On by default. Every stylesheet you have ticked on the **CSS** tab is merged into
one cached file, so the browser makes one request instead of dozens.

Turning it off serves every stylesheet separately **without touching your per-file selections** — so
it is a safe way to check whether combining is behind something odd. Flip it off, reload, and if the
problem persists, combining was not the cause. Your ticks are still there when you turn it back on.

Several other options build on this one: **Remove unused CSS** and **Inline the first screen's CSS**
both need it on.

## CSS combining scope

Two ways to build that combined file, and the choice is about **which visitor you are optimising
for**.

**Site-wide (the default)** builds *one* bundle from every stylesheet found across the site and serves
the same file on every page. The first page a visitor opens pays to download it; every page after that
is a cache hit and costs nothing. The trade is that a given page carries some CSS it does not
personally use.

**Per-page** builds a separate file for each page, containing only the stylesheets that page actually
uses. Any single page is smaller — but a visitor who reads four pages downloads four stylesheets that
are mostly the same bytes over again, and none of them warms the cache for the next.

:::note[Why the default changed]
Per-page used to be the default, and it is the one that scores better in PageSpeed. That is a
measurement artefact rather than a real advantage: an audit loads **one** page, so it can never
observe the saving that a shared bundle exists to produce, while it always sees the unused bytes that
bundle carries. Optimising for the audit therefore makes the second and third page of a real visit
slower. Site-wide became the default in Asset Optimizer **1.1.76**.

Changing the default only affects sites that have never saved this setting. If you have already chosen
a scope, your choice is kept.
:::

**Choose per-page when** most visitors land on one page and leave — a single landing page, a campaign
page, a one-page site. There is no second page for the cache to pay off on, so the smaller file wins.
**Choose site-wide when** people browse: a blog, a shop, a brochure site with a real menu.

JavaScript is always combined per-page, whichever scope you pick.

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
the default for that reason.

:::caution[Inline gets expensive fast on a real site]
On a measured live site with *Inline* switched on, **168.6 KB of CSS was being printed into every
page** — 342 KB of HTML in total, with no external stylesheet at all. The browser had to parse all of
it before it could paint anything, and it was re-sent on every navigation because inlined CSS cannot
be cached. The hero image on that page downloaded in 132 ms and then waited **two seconds** to appear.

If your stylesheet is anything but small, *Linked file* plus
**[Inline the first screen's CSS](#inline-the-first-screens-css)** is the combination you want, not
*Inline*.
:::

### How big is too big to inline?

*Inline* is refused outright once the stylesheet passes **50 KB compressed**, and it is worth being
clear that this is a **ceiling, not a recommendation**. It is the point past which inlining is
obviously wrong, not the point up to which it is a good idea.

As a working figure, inline up to about **15 KB compressed** on a site people browse through, and
treat the rest of the range as suitable only for a genuine single-page visit where there is no second
navigation to pay for the repeated bytes. The number that actually matters is not the file size on its
own but the file size multiplied by how many pages a visitor opens.

## Inline the first screen's CSS

<img src="/img/extensions/asset-optimizer/inlining.png" alt="Inline the first screen's CSS, and Inline small leftover stylesheets" width="1658" />

This is the option for the common case the two choices above cannot solve: a stylesheet too large to
inline, which still blocks the first paint.

It splits the stylesheet in two. The rules the first screen needs go straight into the page, so there
is nothing to wait for before the browser can draw. The rest is fetched immediately afterwards without
holding anything up, and because it stays a file, it is still cached and reused on the next page.

On a measured site the stylesheet was 338 KB (91 KB compressed) — far beyond the inlining limit, and
inlining it whole would have added those 91 KB to every single navigation. The part the first screen
actually needed was a fraction of it.

:::warning[Check this one before relying on it]
Which rules the first screen needs is worked out from **the order of your page's own markup** — the
things near the top of the HTML — because deciding it properly would mean actually drawing the page,
which cannot be done while the page is being built.

That approximation is right on the great majority of layouts and wrong on a particular kind: one whose
main content sits late in the HTML and is moved to the top visually by CSS. There, the top of the
screen can appear unstyled for an instant before the rest of the stylesheet lands.

So after switching it on, load a few different pages — a post, an archive, the home page — and watch
the top of the screen as each one appears. If anything flashes, switch it back off.
:::

Requires **CSS delivery** set to *Linked file*, and works best with
**[Remove unused CSS](./unused-css)** on, since it splits whatever stylesheet the page is already
serving.

It does nothing at all on a short page — if the whole document is about as big as the first screen,
there is no split worth making, and it leaves the page alone rather than adding a second request's
worth of complexity for no gain.

## Inline small leftover stylesheets

Combining cannot reach every stylesheet, and some of them it is deliberately left out of.

Elements that load their styling only on the pages that use it are the common case — an animation
effect, for instance, ships its CSS on the pages where that effect appears and nowhere else. That is
the right thing to do: the alternative is every page carrying every effect's styling. But it leaves
those files outside the bundle, and each one is then its own request the browser waits for before it
draws anything.

At a kilobyte apiece, the waiting is the entire cost — the downloading is nothing. On a measured page
four such files, about a kilobyte each, were holding up the first paint by an estimated **380 ms**
between them.

Switching this on puts their contents into the page where the link was, so they cost nothing to fetch.
Note this is the *opposite* trade from inlining a whole stylesheet: there, the bytes are the problem
and the saved request does not pay for them. Here there are almost no bytes, and the request is the
problem.

It only moves small files, with a limit on the total for any one page, and it leaves alone anything
scoped to a particular medium such as print — that is not holding up the first paint, and the
condition would be lost if its rules were poured into the page.

Inlining per page does not undo what keeping those files separate was protecting: a page inlines only
the files that page actually linked, so nothing becomes site-wide.

This works independently of **CSS delivery** — it tidies up whatever is left over once the rest has
been bundled, so it is just as useful alongside a linked bundle as an inlined one.

## Drop admin-only stylesheets

<img src="/img/extensions/asset-optimizer/housekeeping.png" alt="Drop admin-only stylesheets, and Move late CSS into the head" width="1658" />

WordPress loads the icon font it uses for its own dashboard — `dashicons`, around 36 KB — on your
public site as well, where not one of its icons is ever drawn. It is a render-blocking request: every
visitor waits for a file none of them benefits from. The editor and page-builder panel styles are the
same, built for screens that only exist inside the admin.

Switching this on stops those files being requested on the front end.

It leaves them alone while the admin toolbar is on screen, because the toolbar draws its own icons
from that font. So the page looks unchanged while you are logged in — log out, or open the site in a
private window, to see the difference.

This is independent of **Combine CSS**. Those files were already kept out of the combined stylesheet,
but keeping them out of the bundle still left the browser fetching them separately, which is the
request this removes.

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

:::tip[If a tool blames your fonts]
Page-speed tools often attribute this kind of shift to a web font, because fonts are the usual
culprit. A quick way to tell them apart: a font swap moves things **downwards**, as text re-wraps. If
your content is jumping **sideways**, it is late CSS, not the font.
:::

## Choosing which stylesheets to merge

<img src="/img/extensions/asset-optimizer/css-tab.png" alt="The CSS tab, with stylesheets folded into collapsible groups" width="1658" />

On the **CSS** tab, every stylesheet detected on the front end is listed and **checked by default**.
Uncheck any you *don't* want merged — those keep loading as separate requests; the rest are combined.

The list is shown in the order the combined file uses, with the **theme stylesheets floated to the
end** (parent then child) so the cascade is preserved: your child theme's CSS still has the authority
to override the framework and shortcode styles.

### Finding things in a long list

A real site registers a couple of hundred stylesheets, so the list is folded into **collapsible
groups** — WordPress core, the framework, shortcodes, each extension, animation effects, the parent
and child themes, generated CSS, and other plugins. Groups come from each asset's *path*, which is
what actually identifies its owner, rather than its handle name, which a plugin can choose freely.

Each group header carries a **tri-state checkbox** (checked, partially checked, unchecked) that
toggles the whole group, and a count of how many of its stylesheets are being combined. Above the list
are **Check all** / **Uncheck all**, a **filter box** that matches on handle or path, and an **Only
unchecked** toggle for reviewing just the exclusions. A group with nothing selected is greyed out, so
a glance down the collapsed list shows what is being left out without opening anything.

Groups are ordered by where their first stylesheet falls in the cascade, and handles keep their
cascade order *inside* each group — the list is grouped, never re-sorted, so it still reads
top-to-bottom the way the combined file is assembled.

:::note[Animation effects]
The Animation Engine's effect partials get their own group. Their classes are applied by JavaScript
after the page loads, which makes them the easiest thing on the page to break by excluding the wrong
handle — so they are kept visible as one set rather than scattered through the list.
:::

## Stylesheets that arrive late

Some stylesheets are not requested until the page is already being built — an element registers its
own CSS at the moment it renders, which is after the bundle has been assembled. Those used to stay
outside the bundle permanently, loading as separate requests on every single view. On one measured
site that was **seven stylesheets, about 35 KB**, every time.

Asset Optimizer now remembers what each page actually used and folds those stylesheets into the bundle
from the next view onwards. **Nothing to switch on.** The only thing to know is that **the very first
view of a page after a change still shows them separately** — that view is what teaches it. Load the
page twice before judging the result.

The memory is per URL, lasts a week, and is cleared automatically whenever the bundles are — when you
switch theme, activate or deactivate a plugin, run an update, or save these settings.
