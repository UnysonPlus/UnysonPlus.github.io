# Headless Books — child theme

The WordPress side of a headless site, written as code instead of set up in the admin. It is a child
theme of `unysonplus-theme` and needs the Unyson+ plugin active. The parent theme loads every file in
`inc/includes/` automatically, so `functions.php` has nothing to require.

| File | What it does |
|---|---|
| `inc/includes/headless-books-types.php` | Registers the `book` post type and `genre` taxonomy, both in the REST API. |
| `framework-customizations/theme/options/posts/book.php` | The "Book Details" fields on the Book edit screen. |
| `inc/includes/headless-books-rest.php` | Adds those values to the REST API as `book_fields`, with the cover's size and alt text. |

Install it like any theme (zip this folder, then Appearance → Themes → Add New → Upload) and activate it.

```bash
curl "https://your-site.com/wp-json/wp/v2/book?_fields=id,slug,title,book_fields"
```

Use this route when the definitions should live in version control or ship with a theme. For a
no-code setup, the Post Types and Custom Fields extensions create the same thing from the admin.
