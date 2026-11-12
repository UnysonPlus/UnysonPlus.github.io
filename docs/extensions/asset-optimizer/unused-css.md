---
sidebar_position: 3
title: "Removing unused CSS"
sidebar_label: "Removing unused CSS"
description: "A typical WordPress page uses under 15% of the CSS it downloads. Strip the rules nothing on the page can match, keep the ones your JavaScript needs, and test it properly before you rely on it."
---

# Removing unused CSS

<img src="/img/extensions/asset-optimizer/unused-css.png" alt="Remove unused CSS, and the Never remove safelist" width="1658" />

Combining solves the *number* of requests; it does not make the CSS smaller. A typical page uses under
15% of the stylesheet it downloads — the framework and every shortcode ship all the variants they
*can* render, and a page uses one of them.

Switch on **Remove unused CSS** and each page gets its own copy of the bundle with the rules nothing
on it can match taken out. WordPress's own inline block styles are trimmed at the same time — on a
page built with the page builder rather than blocks those are typically **70% unused**. On a measured
site the homepage went from **39.3 KiB to 16.3 KiB gzipped** with no rendering change at all. The
purged copy is generated the first time a page is viewed and cached from then on, so visitors never
wait for it.

This is usually the largest single improvement available here, which is why it is step two of the
[quick setup](./#start-here).

It needs **[Combine CSS](./css#combine-css)** on. It works with either **CSS delivery** setting: with
*Inline* the trimmed stylesheet is what gets written into the page, not the full one.

:::caution[Test it before you rely on it]
This is the one setting here whose mistakes are quiet. A rule removed in error does not raise an
error: it shows up as a button with no hover, or a mobile menu that opens wrong, on a page nobody
re-tested. After switching it on, click through a few pages — open the menu, expand an accordion,
hover the buttons, tab through the links.

If something looks wrong, add `?fw_ao_nopurge=1` to the URL. That serves the full stylesheet for that
one request, so you can tell immediately whether this feature is the cause.
:::

:::note[The Live Editor is never affected]
Editing a page with the Live Editor switches the whole optimizer off for that one request, so the
editor always gets the complete stylesheet. It has to: the editor builds its interface after the page
loads, so none of it is visible to the scan that decides which rules are in use, and without this it
would come up unstyled. Your visitors still get the optimized page as normal.
:::

## Unused keyframes

A purge also drops `@keyframes` blocks that nothing left in the stylesheet can start. This matters
more than it sounds for icon fonts: a full animation set ships whether or not a single icon spins, and
it used to survive a purge that had just deleted every rule naming it.

A name is kept if **any** of these hold, so animations started from JavaScript stay safe:

- a surviving declaration names it (`animation`, `animation-name`, or the shorthand);
- the name appears anywhere in the page as a class, id or tag — so `fa-beat` survives the moment a
  `.fa-beat` element exists, which is exactly how a script animates one;
- the safelist matches it.

What gets dropped is a name that appears in neither the stylesheet nor the page. Starting one would
mean a script inventing the string at runtime; if your site does that, add the name to the safelist.
On a measured page this removed 16 of 40 keyframes blocks, about 1.9 KB.

## The safelist

A page is scanned as it arrives, and a lot of CSS exists for moments that scan never sees — a menu
opened, a row hovered, a slider started, an element scrolled into view. Those are protected
automatically: state classes (`is-`, `has-`, `active`, `open`…), every hover and focus rule, animation
and slider classes, the Animation Engine's effects, and anything driven by an attribute such as
`aria-expanded`.

Add to **Never remove (safelist)** only for class names your own JavaScript adds. One per line; a
plain entry keeps any selector containing that text, and slashes make it a regular expression:

```
promo-banner
/^\.seasonal-/
```

If an entry is not a usable pattern — an unclosed bracket, a stray slash — it cannot protect anything.
That used to pass unnoticed, because the only symptom was CSS still going missing. Such entries are
now ignored and reported in a notice in the WordPress admin, naming the line at fault.

## Elements that build themselves with JavaScript

Some elements create their own markup after the page has loaded — a table of contents builds its list
from the headings it finds, for instance. None of that markup exists in the page that was scanned, so
every rule written for it looks unused and is removed. What you see is an element that loads with no
styling at all: a list of plain links where there should be a laid-out table of contents.

The elements that ship with Unyson+ protect themselves, so this is already handled for them. If you
have written your own element or script that generates markup, protect its class names by adding the
prefix to **Never remove (safelist)** — one entry such as `my-widget` covers `my-widget__item`,
`my-widget__link` and the rest of the family.

Developers can register the same protection from code so it needs no setting at all; see the Asset
Optimizer reference in the AI Dev Kit for the filter.
