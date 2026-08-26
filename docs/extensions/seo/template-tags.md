---
title: "Template tags"
sidebar_position: 2
---

# Template tags

Template tags are written `%%tag%%` and can be used in any title or description field —
the site-wide templates in **Settings → Titles &amp; Meta**, and a single page's own SEO title
or description.

In the editor they appear as **chips** rather than raw text. Use the buttons above each
field to insert the common ones, or **View all tags** to browse everything with example
values for the page you are editing.

A tag that resolves to nothing disappears along with the separator holding its place, so
`%%title%% %%sep%% %%primary_category%% %%sep%% %%sitename%%` on an uncategorised post
renders *My Post | My Site* — not *My Post |  | My Site*.

An unrecognised tag renders as nothing rather than printing itself, so a typo never leaks
`%%titel%%` into a search result.

---

## Site

| Tag | What it renders |
| --- | --- |
| `%%sitename%%` | The site title from Settings → General |
| `%%sitedesc%%` | The site tagline |
| `%%sep%%` | The separator chosen in the SEO settings |
| `%%permalink%%` | The URL of the current page |
| `%%currentdate%%` | Today, in the site date format |
| `%%currenttime%%` | The current time |
| `%%currentday%%` | The day of the month |
| `%%currentmonth%%` | The month name, translated |
| `%%currentyear%%` | The current year — useful for keeping a title evergreen |

## The current page

| Tag | What it renders |
| --- | --- |
| `%%title%%` | Title of the post, page or term |
| `%%excerpt%%` | The excerpt, generated from the content when none is set |
| `%%excerpt_only%%` | The hand-written excerpt only, empty if there is none |
| `%%post_content%%` | The body text, as plain prose |
| `%%date%%` | Publish date |
| `%%modified%%` | Last modified date |
| `%%id%%` | Numeric post ID |
| `%%parent_title%%` | Title of the parent page |
| `%%post_type_singular%%` | Singular label, e.g. *Project* |
| `%%post_type_plural%%` | Plural label, e.g. *Projects* |
| `%%primary_category%%` | The primary category, or the first one |
| `%%post_categories%%` | All categories, comma separated |
| `%%post_tags%%` | All tags, comma separated |

## Terms and archives

| Tag | What it renders |
| --- | --- |
| `%%term_title%%` | Name of the current category, tag or term |
| `%%term_description%%` | Its description |
| `%%taxonomy_title%%` | Label of the taxonomy, e.g. *Categories* |
| `%%archive_title%%` | The title of whatever archive is being viewed |
| `%%archive_date%%` | The period a date archive covers, e.g. *March 2026* |

## Author

| Tag | What it renders |
| --- | --- |
| `%%author_name%%` | Display name |
| `%%author_bio%%` | Biographical info |
| `%%author_id%%` | Numeric user ID |

## Search and paging

| Tag | What it renders |
| --- | --- |
| `%%searchphrase%%` | What the visitor searched for |
| `%%page%%` | *Page 2 of 7* — and **nothing on page one**, so it collapses away |
| `%%pagenumber%%` | The current page number |
| `%%pagetotal%%` | How many pages there are |

---

## Dynamic tags

These read data the framework has never heard of, so you are not limited to the list above.

| Pattern | What it reads | Example |
| --- | --- | --- |
| `%%cf_<key>%%` | Any custom field on the current post | `%%cf_subtitle%%` |
| `%%term_cf_<key>%%` | Any custom field on the current term | `%%term_cf_colour%%` |
| `%%tax_<taxonomy>%%` | The post's terms in any taxonomy | `%%tax_product_cat%%` |
| `%%user_<key>%%` | Any field on the author's profile | `%%user_twitter%%` |

---

## Modifiers

Modifiers post-process a tag's value. Chain them with `|`, applied left to right.

| Modifier | What it does |
| --- | --- |
| `truncate:<n>` | Trim to *n* characters, always on a word boundary |
| `words:<n>` | Keep the first *n* words |
| `upper` | UPPERCASE |
| `lower` | lowercase |
| `capitalize` | Title Case |

```
%%excerpt|words:20%%
%%title|truncate:40%%
%%excerpt|words:25|capitalize%%
```

---

## Adding your own

Register a tag from a theme or another extension:

```php
add_action( 'fw_seo_register_tags', function () {
    FW_SEO_Tags::register( 'reading_time', [
        'label'    => __( 'Reading time', 'fw' ),
        'group'    => 'post',
        'contexts' => [ FW_SEO_Context::SINGULAR ],
        'resolve'  => function ( FW_SEO_Context $ctx ) {
            if ( ! $ctx->has_post() ) {
                return '';
            }

            $words = str_word_count( FW_SEO_Content::text( $ctx ) );

            return sprintf( '%d min read', max( 1, (int) ceil( $words / 200 ) ) );
        },
    ] );
} );
```

Resolvers are **lazy** — yours only runs if a template actually uses the tag — and receive the
resolved page context rather than having to work it out from globals. Returning an empty
string is fine and expected: the tag and its separator simply collapse away.
