---
sidebar_position: 9
title: "Importing from another SEO plugin"
sidebar_label: "Importing"
description: "Bring titles, descriptions, canonical URLs and indexing switches across from another SEO plugin, with its template tags translated rather than copied."
---
# Importing from another plugin

If the site already runs **Yoast SEO**, **Rank Math**, **SEOPress** or **All in One SEO**,
bring its data across from **Unyson+ → SEO → Import**. The other plugin does not need to be
active — only its data still present in the database.

What comes across, per page: SEO title, meta description, canonical URL, the no-index and
no-follow switches, and the sharing card title, description and image.

## Template tags are translated, not copied

This is the part worth understanding, because it is where a careless import does damage that
takes weeks to notice.

Each plugin writes template tags in its own syntax:

| Plugin | Its syntax |
| --- | --- |
| Yoast SEO | `%%title%% %%sep%% %%sitename%%` |
| Rank Math | `%title% %sep% %sitename%` |
| SEOPress | `%%post_title%% %%sep%% %%sitetitle%%` |
| All in One SEO | `#post_title #separator_sa #site_title` |

Yoast's is almost identical to ours, which is exactly the trap — it makes the whole job look
like copying strings. Copy a Rank Math title across unchanged and `%title%` is an
unrecognised tag, so it renders as **nothing**. The page quietly loses its title, and nobody
finds out until Search Console says so.

So tags are translated as they are read.

:::note
A tag with no equivalent here is **left in the text and reported**, never removed. You get a
list of what could not be translated and how often it appeared. Silently deleting it would
leave a title that reads perfectly well and is missing a word — the kind of error you cannot
see by looking.
:::

## It will not overwrite your work

By default the import **skips any field you have already filled in here**. Running it twice
is safe, and if you have started editing in this extension, what you wrote is newer than what
you are leaving behind.

Tick **Overwrite values already set here** to replace them instead. It asks for confirmation.

Two things it deliberately does not do:

- **Another plugin's "use the default" does not become a switch here.** Yoast stores a value
  meaning *index* on pages that were simply never configured; importing that as an explicit
  no-index decision would turn a site's defaults into hundreds of hard-coded overrides.
- **An empty value is not imported as an empty override.** All four plugins write blank rows
  freely; here, empty means "follow the template", and that difference matters.

## Large sites

The import runs in batches of 100 with a progress bar. One long request would race the
server's time limit, and a timeout halfway through is the worst possible result — partly
imported, with nothing to say how far it got. If a batch does fail, nothing already imported
is lost: run it again.
