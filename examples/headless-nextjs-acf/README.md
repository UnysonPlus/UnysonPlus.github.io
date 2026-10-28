# Headless Books — Next.js front end, with ACF

A minimal Next.js (App Router) site that reads a **Book** post type and its ACF fields from a
WordPress site.

## WordPress side

Two plugins: **Custom Post Type UI** and **Advanced Custom Fields (ACF)**.

- CPT UI → Add/Edit Post Types: a `book` post type with **Show in REST API** set to True.
  CPT UI → Add/Edit Taxonomies: a `genre` taxonomy attached to Books, **Show in REST API** True.
- ACF → Field Groups: a "Book Details" group shown on Book, with **Show in REST API** on (Group
  Settings → Settings), and these fields: `subtitle` (Text), `book_author` (Text), `pages` (Number),
  `cover_image` (Image, Return Format: Image Array), `buy_url` (URL).

## Run it

```bash
cp .env.example .env.local   # then set WP_URL
npm install
npm run dev                  # http://localhost:3000/books
```

`npm run build` generates every book page ahead of time; pages refresh from WordPress at most every
five minutes.
