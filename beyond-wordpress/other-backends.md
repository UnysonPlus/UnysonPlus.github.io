---
title: "Alternatives to Sanity: Headless CMS Options for Astro"
sidebar_label: "Other backends"
sidebar_position: 4
description: "The main alternatives to Sanity for an Astro site: open-source, hosted and Git-based headless CMSs, and which of them suit a Unyson+ port."
keywords: [sanity alternatives, headless cms for astro, payload cms, strapi, storyblok, tinacms]
---

# Other backends

Sanity is one of many headless CMSs. They fall into three groups, and each could host Unyson+ through a thin
adapter once the [shared core](./roadmap.md#phase-1) exists.

## Open source, self-hosted

You can run these yourself, ship a plugin for them, and your users own everything.

| CMS | What it is | Fit for Unyson+ |
|---|---|---|
| **Payload** | Node.js and TypeScript with a React admin | **The strongest open-source target.** Block fields and custom admin components suit a builder |
| **Strapi** | A well-known open-source CMS with a plugin marketplace | Good. Its dynamic zones work like page sections |
| **Directus** | An admin and API on top of any SQL database | Weak. It is built for data more than pages |
| **KeystoneJS** | A developer-focused CMS | Weak. Its audience is smaller |

## Hosted services

These work like Sanity: someone else runs the service.

| CMS | What it is | Fit for Unyson+ |
|---|---|---|
| **Sanity** | Structured content with a customisable React Studio | **The first target,** and popular with Astro |
| **Storyblok** | Nested components with its own visual editor | Possible through its app marketplace, but it already does part of the job |
| **Prismic** | Section-based pages using "Slices" | Possible |
| **Contentful** | Aimed at larger companies, with an app framework | Possible, for a smaller and more expensive market |
| **Hygraph** | GraphQL-first | Weak. It is less visual |

## Git-based

Content is stored as files in the project's repository.

| CMS | What it is | Fit for Unyson+ |
|---|---|---|
| **TinaCMS** | Visual editing over Markdown and JSON files; pairs well with Astro | Good for a file-based editor |
| **Decap CMS** | A simple editor, formerly Netlify CMS | Weak. It is simple and dated |

## Headless WordPress

WordPress itself can be the backend, and it needs the least new work: editors keep the Unyson+ builder they
know. See [Headless WordPress](/headless).
