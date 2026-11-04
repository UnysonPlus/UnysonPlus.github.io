---
title: "Learn Sanity: A Headless CMS Guide for WordPress Developers"
sidebar_label: "Learn Sanity"
sidebar_position: 3
description: "What Sanity is, explained for WordPress developers: the Content Lake, Sanity Studio, schemas and GROQ queries, how it compares with WordPress, and how to connect it to Astro."
keywords: [what is sanity, sanity cms, sanity and astro, sanity studio, groq, headless cms for wordpress developers]
---

# Learn Sanity as a WordPress developer

Sanity is a **headless CMS**: a hosted content database with an editing screen, but no website of its own. It
stores and serves content, and you build the site with a framework such as Astro. Astro has no admin and Sanity
has no front end, which is why the two are often used together.

## The parts of Sanity

| Part | What it is | Closest WordPress idea |
|---|---|---|
| **Content Lake** | Sanity's cloud store, holding content as JSON documents | The MySQL database |
| **Sanity Studio** | The editing admin, an open-source React app you configure in code | `wp-admin` |
| **Schemas** | Code that defines your content types and fields | Custom post types and custom fields |
| **GROQ** | The language for querying content | `WP_Query` |

Sanity also provides revision history, real-time collaboration, drafts and an image CDN.

## How it compares with WordPress

| | WordPress | Sanity with Astro |
|---|---|---|
| Admin | Built in | Sanity Studio |
| Database | MySQL on your host | Sanity's cloud |
| Front end | PHP themes | Astro, or any other framework |
| Page building | Visual builders such as Unyson+ | Usually a fixed list of sections defined by a developer |
| Plugin directory | Yes | No; you build features or connect services |

## A first schema

A schema describes a content type. This one is roughly a custom post type with two fields:

```js
import {defineField, defineType} from 'sanity';

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string'}),
    defineField({name: 'slug', type: 'slug', options: {source: 'title'}}),
  ],
});
```

Studio turns that into an editing form with no further work.

## A first query

This GROQ query gets all posts, newest first, with only the two fields it needs:

```text
*[_type == "post"] | order(_createdAt desc) { title, "slug": slug.current }
```

## Connecting Sanity to Astro

1. Run `npm create sanity@latest` to create a project and a Studio.
2. In your Astro project, add Sanity's integration with `npx astro add @sanity/astro`, and give it your project
   ID and dataset in `astro.config.mjs`.
3. Query from any page, as in the example below.
4. Add a webhook in Sanity that starts a new build at your host, so publishing updates the site.

```astro
---
import {sanityClient} from 'sanity:client';

const posts = await sanityClient.fetch(`*[_type == "post"]{ title, "slug": slug.current }`);
---
<ul>
  {posts.map((post) => <li><a href={`/blog/${post.slug}/`}>{post.title}</a></li>)}
</ul>
```

Exact steps change between versions, so check [Sanity's documentation](https://www.sanity.io/docs) as you go.

## A learning path

1. Finish [Learn Astro](./learn-astro.md) first.
2. Create a free Sanity project and open Studio.
3. Define a `post` schema and add a few posts.
4. Show them in Astro with a GROQ query.
5. Add an image field, and a `sections` array holding two or three section types. That is how page building
   usually works on Sanity.

## Limits to expect

- **Your content lives on Sanity's service,** and larger teams and heavier use need paid plans. Check its current
  pricing.
- **Every field is defined in code,** so a developer has to set up the site.
- **Studio customisation means React.**
- **There is no theme or plugin directory** like WordPress has.
