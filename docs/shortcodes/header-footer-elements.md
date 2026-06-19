---
sidebar_position: 5
title: Header / Footer Elements
---

# Header / Footer Elements

Site-chrome elements used mainly inside the [Header & Footer Builder](/docs/extensions/header-footer-builder),
though they work anywhere on the page canvas. They pull live data from WordPress — menus,
Site Identity, Theme Settings social profiles — so a header you build stays in sync with the
site's own settings.

> Most elements also expose an **Advanced** tab (visibility, custom class/ID, spacing); those
> are omitted below for brevity.

## Navigation Menu

Display a WordPress menu — for headers, footers, or anywhere.

**Key options:** Menu Source (Theme Menu Location **or** a Specific Menu), Orientation
(Horizontal / Vertical), Submenu Style (Dropdown · Mega full-width · Accordion), Maximum Depth
(All levels · Top level only · 2 · 3), Alignment (Default · Start · Center · End · Justified).

## Site Logo

The site logo or title — pulled from **Site Identity** (Customizer logo/title) or a custom
image.

**Key options:** Logo Source (Site Identity / Custom Image), Custom Logo Image, Link to Home,
Max Height, Alignment.

## Site Search

A site search form.

**Key options:** Style (Inline Form, always visible · Icon, expands on click), Placeholder
Text.

## Social Icons

A row of social-profile links.

**Key options:** Source (Theme Settings → Social Profiles **or** a Manual list), per-profile
Icon + URL + accessible Label (manual mode), Icon Size (Small · Medium · Large).

## Menu Toggle

A hamburger button that opens an off-canvas drawer (for mobile navigation).

**Key options:** Target Drawer ID (default `primary-navigation-drawer`), Accessible Label
(default `Menu`), Icon Style (Bars `≡` · Dots `⋮`).

## Cart

A cart icon with a live item-count badge (and optional total), linking to the cart — for shop
headers. The count and total update **without a page reload** when items are added via AJAX.
Part of the **[WooCommerce extension](/docs/extensions/woocommerce)**; appears only when
WooCommerce is active.

**Key options:** Icon (Shopping Bag · Shopping Cart · Basket · No Icon), Label (optional text
beside the icon), Item Count (on/off), Cart Total (on/off), Hide When Empty.
