---
title: "Learn Astro: A Guide for WordPress Developers"
sidebar_label: "Learn Astro"
sidebar_position: 2
description: "Learn Astro from a WordPress background: what it is, how themes, templates, custom post types and plugins map to Astro, a first component, and a step-by-step learning path."
keywords: [learn astro, astro for wordpress developers, astro tutorial, astro vs wordpress, astro vs react]
---

# Learn Astro as a WordPress developer

Astro is a framework that builds websites into plain HTML and CSS. It runs on Node.js instead of PHP, and by
default it sends no JavaScript to the visitor. If you can read a WordPress template, you can read an Astro
component.

## How Astro differs from WordPress

WordPress builds a page each time someone asks for it. Astro normally builds every page **once**, ahead of
time, and uploads the finished files. That is why these sites are fast and need no PHP or database on the
server. Astro can also render on each request when a site needs it.

Astro has no admin, no database and no users. Content comes from files in the project or from a CMS such as
[Sanity](./learn-sanity.md).

## Your WordPress knowledge, mapped

| WordPress | Astro |
|---|---|
| Template files (`page.php`, `single.php`) | Files in `src/pages/`; the file name is the URL |
| `get_header()` and `get_footer()` | A **layout** component that wraps the page |
| `get_template_part()` | A **component**, such as `<Card />` |
| Echoing a PHP variable | `{variable}` inside the HTML |
| Custom post types and posts | **Content collections** (Markdown or JSON files), or a CMS |
| `WP_Query` | `getCollection('blog')`, or a fetch from an API |
| `style.css` | A `<style>` block scoped to each component |
| `wp_enqueue_script()` | A `<script>` tag in a component, which Astro bundles |
| Plugins | **Integrations**, added with `npx astro add` |

## Your first component

Save this as `src/components/Card.astro`:

```astro
---
// Runs at build time, like the PHP at the top of a template
const { title, url } = Astro.props;
---
<a class="card" href={url}>
  <h3>{title}</h3>
</a>

<style>
  /* Applies to this component only */
  .card { padding: 1rem; border-radius: 8px; }
</style>
```

The part between the `---` lines is the logic, and the rest is the HTML. Use it from a page like this:

```astro
---
import Card from '../components/Card.astro';
---
<Card title="Hello" url="/hello" />
```

## Where React fits: islands

Most of a page stays static. When one part needs to be interactive, such as a filter or a cart, you add a
component from React, Vue or Svelte and tell Astro when to load it:

```astro
<PriceFilter client:visible />
```

This loads the component only when it scrolls into view. The idea is called **islands**: static HTML with small
interactive areas.

## A learning path

1. **Install Node.js**, then run `npm create astro@latest` and `npm run dev`.
2. **Follow the official blog tutorial** at [docs.astro.build](https://docs.astro.build/).
3. **Learn the JavaScript you will use most:** `import` and `export`, arrow functions, `async` and `await`, and
   `.map()` for loops.
4. **Rebuild one simple WordPress page in Astro:** a layout with header and footer, a home page, and a blog
   list from Markdown files.
5. **Move the content to a CMS.** Continue with [Learn Sanity](./learn-sanity.md), or read content from your own
   site through [Headless WordPress](/headless).
6. **Learn React last,** and only when you need an island.

## Limits to expect

- **Forms, logins and carts need a service or server code.** There is no PHP behind a static site.
- **Editors need a CMS.** Astro alone suits developers, not clients.
- **Publishing means rebuilding.** Content changes reach a static site after a rebuild, usually started
  automatically by a webhook.
