---
slug: built-in-languages-prefix-routing
title: Why the built-in languages use one page per language under a /prefix/, linked by a group id
authors: [jon]
tags: [architecture, seo, extensions, page-builder]
date: 2026-11-27
description: Roadmap 8h adds a built-in way to run a site in several languages. Each translation is its own post (made by the AI translation or a copy), linked to its original by a translation-group id, and served under its language's address prefix by rewriting the request before WordPress parses it; the default language keeps its addresses.
---

**The question:** Roadmap 8h: "Locales per site, each page's translation linked to its original (translated text,
slugs and SEO), a language switcher element, and translated custom post types; built on the AI page translation that
exists today." What is a translation, how is it found, and what address does it live at?

<!-- truncate -->

## Context

The AI Assistant's `translate_page` already makes a translated **copy** of a page (layout, settings, images, the
words translated). It could link that copy only through a third-party multilingual plugin. The SEO extension printed
hreflang only from addresses typed in by hand.

## Options considered

**What a translation is:**

1. **One post per language** (a copy), linked to the original.
2. **One post holding every language** (per-field translations). Fewer posts, but every option type, the builder,
   SEO fields and the AI translation would need a language dimension.

**Addresses:**

1. **A prefix per language** (`/fr/a-propos/`), the default language unprefixed.
2. **A query string** (`?lang=fr`). Easy, but weak for search engines and ugly to share.
3. **A domain per language.** Needs DNS and hosting work per language; out of reach for most sites.

**Routing a prefix:** add rewrite rules for every post type and archive in every language, or read the prefix and
remove it before WordPress parses the address.

## Decision

One post per language, linked by a **translation group** (`_upw_tr`, the original's ID) and a language code
(`_upw_lang`). Each non-default language lives under its **prefix**; the default keeps today's addresses. The prefix
is read from the request and removed before WordPress parses it, so every existing rewrite rule (pages, posts, custom
types, pagination) works unchanged; permalinks of translated posts get the prefix added, and a post asked for under the
wrong language is redirected to its own address.

## Why

- **It is what the AI translation already makes.** A copy per language is a normal page: the builder, the Live
  Editor, SEO fields, slugs and custom post types all work on it as they are, so "translated slugs and SEO" come free.
- **No migration for existing sites.** Turning it on changes nothing until a second language is added; the default
  language's addresses never move.
- **One routing trick instead of hundreds of rules.** Removing the prefix up front means no rewrite rules to keep in
  step with new post types, and nothing to flush.
- **Search engines get the standard signals:** a distinct address per version, `lang`, and hreflang with
  `x-default`.

**Trade-offs accepted:** Theme Settings, the header and footer, widgets and snippets are shared by all languages;
terms are not translated; the logo links to the default home. Each can be added later without changing the model.

**Status:** Accepted. See [Languages](/extensions/languages).
