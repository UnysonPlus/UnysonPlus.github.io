# Headless Books — plain HTML and JavaScript

The same front end as the Next.js example, with no framework and nothing to install: two HTML pages,
a few JavaScript modules and one stylesheet. The browser fetches the books from the WordPress REST
API and builds the page itself.

## WordPress side

- A `book` post type and a `genre` taxonomy, both with **Show in REST** on (Unyson+ → Post Types).
- A "Book Details" field group on Book with **Show in REST API** on (Unyson+ → Custom Fields):
  `subtitle`, `book_author`, `pages`, `cover_image`, `buy_url`.

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
