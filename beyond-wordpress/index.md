---
title: "Beyond WordPress: Astro, Sanity and Where Unyson+ Could Go Next"
sidebar_label: "Overview"
slug: /
sidebar_position: 1
description: "An introduction for WordPress developers to Astro, Sanity and headless CMSs: what each one does, how they fit together, and how Unyson+ could reach them."
keywords: [astro for wordpress developers, sanity cms, headless cms, astro and sanity, wordpress alternative stack]
---

# Beyond WordPress

Unyson+ is a WordPress product today. This section looks at what lies past it: how a modern fast site is
put together with tools like Astro and Sanity, how a WordPress developer can learn them, and how Unyson+
could reach those platforms.

:::caution Exploratory
Nothing in the [roadmap](./roadmap.md) is built yet, and none of it is a promise. The learning guides work
today. For what already works, see [Headless WordPress](/headless).
:::

## In this section

| Page | What it covers |
|---|---|
| [Learn Astro](./learn-astro.md) | Astro for WordPress developers, with each WordPress idea mapped to its Astro equivalent |
| [Learn Sanity](./learn-sanity.md) | What Sanity is, how its parts work, and how to connect it to Astro |
| [Other backends](./other-backends.md) | The alternatives to Sanity, and which suit Unyson+ |
| [Roadmap](./roadmap.md) | The phased plan for taking Unyson+ beyond WordPress |

## The pieces of a modern stack

WordPress does everything in one package: admin, database, templates and page output. A modern stack splits
those jobs between separate tools.

| Piece | Its job | Needed? |
|---|---|---|
| **Astro** | Builds the website that visitors see | Yes, or another front-end framework |
| **Sanity** | Stores the content and gives editors an admin | Yes, or another backend, including headless WordPress |
| **Unyson+** (ported) | The visual page builder, design system, presets and animations | This is what the stack lacks today |
| **React** | Interactive parts of a site, and the Sanity admin | Optional on the website; Sanity Studio is built with it |

You do not need React, Astro and Sanity as three equal parts. The stack is **Astro, a content backend and
Unyson+**. React appears mainly in the editor.

```text
Editor (Sanity Studio with a Unyson+ builder plugin)
        |  saves the page as JSON
Content backend (Sanity, Payload, headless WordPress...)
        |  read at build time
Astro with Unyson+ components
        |
Fast static site: HTML and CSS, with little JavaScript
```

## Is Astro the same as React?

No. **React** is a library for interactive interfaces that run in the browser. **Astro** is a framework for
whole websites that sends no JavaScript to the browser by default. Astro can include React components where a
page needs interactivity, but you do not need React to start. For a WordPress developer, Astro is the gentler
of the two, because it works much like PHP templates.

## Why this matters for Unyson+

Sites built on Astro and a headless CMS are fast, but page building there usually means choosing from a fixed
list of sections that a developer defined. There is rarely a full visual builder with design controls, presets
and motion. That gap is what Unyson+ already fills on WordPress.
