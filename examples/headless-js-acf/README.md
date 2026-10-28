# Headless Books — plain HTML and JavaScript, with ACF

The same front end as the Next.js + ACF example, with no framework and nothing to install: two HTML pages,
a few JavaScript modules and one stylesheet. The browser fetches the books from the WordPress REST
API and builds the page itself.

## WordPress side

Two plugins: **Custom Post Type UI** and **Advanced Custom Fields (ACF)**.

- CPT UI → Add/Edit Post Types: a `book` post type with **Show in REST API** set to True.
  CPT UI → Add/Edit Taxonomies: a `genre` taxonomy attached to Books, **Show in REST API** True.
- ACF → Field Groups: a "Book Details" group shown on Book, with **Show in REST API** on (Group
  Settings → Settings), and these fields: `subtitle` (Text), `book_author` (Text), `pages` (Number),
  `cover_image` (Image, Return Format: Image Array), `buy_url` (URL).

## Run it

1. Set your site's address in `js/config.js`.
2. Serve the folder with any static web server, for example `npx serve .` or
   `python -m http.server`. (Opening `index.html` straight from the disk does not work: browsers
   only load JavaScript modules from a web address.)

WordPress allows other sites to read its public REST API, so the pages can live on any address.

## Next.js or plain JavaScript?

Here the visitor's browser builds each page, so search engines see the "Loading…" text first and
the content only after the script runs. The Next.js example builds the pages ahead of time, which is
better for search engines and first load. Plain JavaScript suits small sites, widgets inside another
site, and learning how the API works.
