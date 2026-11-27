---
title: Languages
description: Run a WordPress site in several languages with Unyson+ — a language for every page and post, linked translations, /fr/-style addresses, hreflang, translated menus, a Language Switcher element, and AI translation that links itself.
---

# Languages

The **Languages** extension runs the site in several languages without a separate translation plugin. Every page,
post and custom post type item has a language and is linked to its translations; each language other than the default
lives under its own address prefix (`example.com/fr/…`); and a **Language Switcher** element lets visitors move between
the versions of the page they are on.

It is built for the way Unyson+ already translates: the AI Assistant's **translate this page** makes a translated copy,
and with Languages active that copy is linked as the page's translation by itself.

## Set it up

1. **Unyson+ → Extensions → Languages → Activate.**
2. Open its **Settings** and list the site languages. The **first language is the default**: its pages keep the
   addresses they have now. Each other language gets an **address prefix** (`fr` gives `/fr/`).

| Field | What it is |
| --- | --- |
| **Name** | As visitors see it in the switcher, usually in its own language: Français, Deutsch. |
| **Language code** | For search engines and the page's `lang`: `fr`, `de`, `pt-BR`, `en-GB`. |
| **WordPress locale** | Optional: `fr_FR`, `de_DE` … so WordPress's own words (dates, "Read more") follow, when that language pack is installed. |
| **Address prefix** | The folder in the address; empty = the language code. Not used for the default language. |

Two switches below the list (both on by default):

- **Translate menus**: on a page in another language, menu links to pages and posts go to their translation (with
  the translation's title), and a menu link to the home page goes to that language's home.
- **Lists show one language**: the blog, archives and search results show only the current language's posts.

## Translate a page

Every edit screen (pages, posts and every public custom post type) has a **Language** box:

<img src="/img/extensions/languages/language-box.png" alt="The Language box: This is in English, and under Translations the French version, Test des classes, with links to edit it and open it in the Live Editor" width="320" />

- **This is in**: the page's language (new content is in the default language).
- **Translations**: for each other language, its linked version (edit it, or open it in the Live Editor), or:
  - **Make a copy to translate**: a draft copy (same layout, settings, images and SEO fields) already linked as that
    language's version. Change its words, its title and its **slug** (the address), then publish.
  - **…or link an existing one**: link a page you already have as that language's version.
- Or ask the **AI Assistant**: "translate this page into French". It makes the translated draft and links it here.

The pages list gets a **Language** column showing each page's set (`en · fr`), each linked to its edit screen.

### Addresses

| Page | Address |
| --- | --- |
| An English (default) page | `example.com/about/` (as before) |
| Its French version, slug `a-propos` | `example.com/fr/a-propos/` |
| The French version of the front page | `example.com/fr/` |

A page asked for under the wrong language (`/fr/about/`, or `/a-propos/` without the prefix) is redirected to its
real address, so there is one address per version.

## What visitors and search engines get

- `<html lang="…">` set to the page's language, and the WordPress locale switched for it when one is set.
- **hreflang** links in the head for every published version of the page, plus `x-default` (the default language's
  version). The SEO extension's own hand-entered language links step aside while Languages is in charge.
- Menus and lists in the current language (the two switches above).

## The Language Switcher element

Add **Language Switcher** (Content Elements) to the header, the footer or any page. On each page it links to that
page's versions in the other languages.

<img src="/img/extensions/languages/switcher-inline.png" alt="The Language Switcher as a row of links: EN · English (the current one, in bold) and FR · Français" width="600" />

| Option | Choices |
| --- | --- |
| **Show as** | A row of links, or a drop-down (the current language, then the others). |
| **Label** | Language name, code (FR), or both. |
| **Hide the current language** | Show only the others. |
| **When this page has no translation** | Link to that language's home page, or leave the language out. |

Each link carries `hreflang` and `lang`, and the current language is marked `aria-current`.

## Limits

- **Only content is translated.** Theme Settings, the header and footer, widgets and snippets are shared by every
  language; put language-specific text in pages, or use a Language Switcher where visitors need to change.
- The site logo links to the default language's home page. Menu links to the home page are translated.
- A translation copy starts with the original's slug; set its own slug before publishing.
- Categories and tags are not translated (a copy keeps the original's terms).
- Not for use together with another multilingual plugin.

## For developers

Post meta `_upw_lang` (a language code; none = the default) and `_upw_tr` (the translation group: the original's ID).
Helpers: `fw_languages()`, `fw_language_current()`, `fw_language_of( $id )`, `fw_language_translations( $id )`
(code => post ID), `fw_language_url( $code, $id = null )`, `fw_languages_link( $src_id, $new_id, $code )`. Filter
`fw_languages_post_types` changes which post types have languages. The settings are the
`fw_ext_settings_options:languages` option (`languages`, `translate_menus`, `filter_lists`).
