---
title: "Roadmap: Unyson+ Beyond WordPress"
sidebar_label: "Roadmap"
sidebar_position: 5
description: "The phased plan for taking Unyson+ beyond WordPress: a shared renderer, Astro components, headless WordPress, a Sanity builder, other backends, and ports to ecommerce platforms."
keywords: [unyson+ roadmap, astro page builder, sanity page builder, shopify page builder, opencart page builder]
---

# Roadmap: Unyson+ beyond WordPress

:::caution Exploratory
Everything here is under consideration. There are no dates: the order is a rough intent, and any item may change
or be dropped. For work already under way, see the [Headless WordPress extension](/extensions/headless-wordpress).
:::

## The approach

Unyson+ cannot simply be copied to another platform, because its PHP code depends on WordPress throughout:
hooks, options, post meta, the media library and the shortcode parser. What does carry over is everything that
is not tied to WordPress:

- **The data:** builder JSON, Theme Settings values and presets.
- **The output:** element HTML and CSS, the Animation Engine and Kinetic Scenes.
- **The tools outside WordPress:** the capture service and the AI Dev Kit approach.

So the plan is to build one **shared core** that turns builder JSON and presets into a page, then write a thin
**adapter** per platform for storage, media, routing and the admin screen.

## Phases

### Phase 1

**Shared renderer and Astro components** (Exploring)

- A JavaScript renderer that takes builder JSON and presets and outputs HTML and CSS.
- An npm package, `@unysonplus/astro`, with a component per element (section, column, heading, button, slider
  and so on) and a `<UnysonPage />` component that renders a whole page.
- Theme Settings and presets as generated CSS variables.
- The Animation Engine and GSAP motion loaded only where an element uses them.

### Phase 2

**Headless WordPress to Astro** (Exploring; depends on the [Headless WordPress extension](/extensions/headless-wordpress))

- Editors keep using the Unyson+ builder in WordPress.
- Astro reads the structured page layout over the REST API and renders it with the Phase 1 components.
- This is the shortest way to a usable product, because no new admin has to be built.

### Phase 3

**Sanity Studio builder** (Exploring)

- Unyson+ elements as Sanity schema types, with Theme Settings and presets as a Sanity document.
- A Studio plugin, written in React, that adds visual building and preview.

### Phase 4

**More backends** (Exploring)

- **Payload** next, as the strongest open-source fit.
- **Strapi or Storyblok** if there is demand. See [Other backends](./other-backends.md).
- Possibly a standalone editor, hosted like Kinetic Scenes, that saves to Astro content collections in Git.

### Phase 5

**Ecommerce platforms** (Exploring)

See the [platform notes](#platform-notes) below.

### Converter outputs

**Alongside any phase** (Exploring)

The Site Converter's capture pipeline could write to new targets as well as WordPress: an Astro project, or a
Shopify theme. This reuses existing work and is a cheap way to test demand.

## Platform notes

From easiest to hardest:

| Platform | Effort | Notes |
|---|---|---|
| **ClassicPress** | Very low | A WordPress fork, so mostly compatibility fixes. No ecommerce focus and a small audience |
| **PrestaShop** | Medium | PHP, with a hook system close to WordPress actions, self-contained modules and an existing market for page builders. **The first PHP port to try** |
| **OpenCart** | Medium | PHP and simple MVC, with events and OCMOD in place of hooks. Versions 3 and 4 are incompatible, so target 4. A smaller market |
| **Joomla** | Medium to high | PHP, but its components, modules and plugins differ most from WordPress. Ecommerce needs an add-on |
| **Magento / Adobe Commerce** | High | PHP, but heavy, and it has its own page builder |
| **Drupal** | High | Its entity and field system is very unlike WordPress, and it has Layout Builder |
| **Shopify** | Highest | A hosted platform, so a rebuild rather than a port. See below |

The PHP platforms would need a PHP version of the renderer, or a way to call the JavaScript one. That decision
belongs to the first PHP port.

### Shopify

Shopify cannot run our PHP, so Unyson+ would reach it in one of three ways:

1. **Converter output:** capture a site and emit a Shopify theme. The cheapest start.
2. **A Shopify theme:** the design system rebuilt as an Online Store 2.0 theme, with Shopify's own theme editor
   in place of the builder.
3. **A Shopify app:** the builder hosted by us and embedded in the Shopify admin, with pages delivered through
   theme app extensions or generated Liquid sections. This needs hosting, support, app review and subscription
   billing, but Shopify is the largest market here.

## What stays WordPress-only

Full parity is not the goal. Each port starts with the builder, core elements, Theme Settings and motion. Features
that depend on WordPress or on a server, such as forms, CRM, mailer and membership, would need services of
their own and are not planned for the first versions.

## Learning first

This work calls for Astro, then Sanity, then enough React for the Studio plugin. The guides are
[Learn Astro](./learn-astro.md) and [Learn Sanity](./learn-sanity.md).
