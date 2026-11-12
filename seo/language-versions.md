---
sidebar_position: 2.3
title: "Language versions: hreflang links for pages in other languages"
sidebar_label: "Language versions (hreflang)"
description: "Tell search engines which pages are the same content in another language with Unyson+ SEO: list each page's language versions in its SEO box and the hreflang links are written for you, including the page itself and x-default."
keywords: [hreflang wordpress, hreflang without plugin, multilingual seo wordpress, x-default hreflang, language versions seo]
---

# Language versions (hreflang)

If a page exists in other languages, as separate pages on this site or on other sites (`example.com/about/` and
`example.de/ueber-uns/`), search engines should show each person the version in their language. `hreflang` links
in the page's head tell them which pages belong together.

Add them in the page's **SEO box → Advanced → Language versions**.

<img src="/img/seo/seo-language-versions.png" alt="The Language versions field in the SEO box's Advanced tab, listing three versions: de with a German address, fr with a French address, and x-default with a language-chooser address, an Add a language version button, and the explanation underneath" width="1358" />

## How to use it

1. Open the page in the editor and go to the **Advanced** tab of its SEO box.
2. Press **Add a language version** and enter the **language code** and the **full address** of that version.
3. Repeat for each language. Save the page.

Language codes:

| You type | Written as | Means |
|---|---|---|
| `de` | `de` | German, any country |
| `fr-CA`, `fr_ca` | `fr-CA` | French, for Canada |
| `zh-hant-tw` | `zh-Hant-TW` | Chinese in traditional script, for Taiwan |
| `x-default` | `x-default` | The page for everyone else, usually a language chooser |

The page itself is added to the list automatically, with the language set under **Settings → General → Site
Language**: search engines expect every set to include the page it is on. A code that is not a language, or an
address that is not `http(s)`, is dropped when you save, and each language is kept once.

## What it writes

For the example above, the page's head gets:

```html
<link rel="alternate" hreflang="en-US" href="https://example.com/about/" />
<link rel="alternate" hreflang="de" href="https://example.de/ueber-uns/" />
<link rel="alternate" hreflang="fr" href="https://example.fr/a-propos/" />
<link rel="alternate" hreflang="x-default" href="https://example.com/choose-language/" />
```

## Every version must list the others back

Search engines only trust a set when it is **returned**: the German page must list the English one too. On sites
you run with Unyson+, add the same versions on each. The [rendered-page checks](./reports/served-pages.md) fetch
your pages and report a language link that the other page does not return.

## With a translation plugin

Translation plugins write these links themselves. When one is active, the field says so and nothing is written, so
your pages never carry two conflicting sets. Use the plugin's own language settings instead.

## Limits

- Posts and pages only; categories and other archives do not have the field.
- It writes the links in the page's head, not in the sitemap. Both are accepted by search engines.
