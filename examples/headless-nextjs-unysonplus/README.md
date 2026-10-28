# Headless Books — Next.js front end

A minimal Next.js (App Router) site that reads a **Book** post type and its custom fields from a
WordPress site running Unyson+.

## WordPress side

- A `book` post type and a `genre` taxonomy, both with **Show in REST** on
  (Unyson+ → Post Types).
- A "Book Details" field group on Book with **Show in REST API** on (Unyson+ → Custom Fields):
  `subtitle` (Text), `book_author` (Text), `pages` (Number), `cover_image` (Image), `buy_url` (URL).

## Run it

```bash
cp .env.example .env.local   # then set WP_URL
npm install
npm run dev                  # http://localhost:3000/books
```

`npm run build` generates every book page ahead of time; pages refresh from WordPress at most every
five minutes.
