# Custom shortcode — Highlight Box (`[my_element]`)

A complete, runnable page-builder element you can drop into Unyson+. It adds a
**Highlight Box** to the builder's *Content Elements* tab — a titled callout with
a short message and an alignment choice. Use it as a scaffold for your own
elements: rename the folder, edit the five files, done. No core edits, no PHP
class required.

## What each file does

| File | Role |
| --- | --- |
| `config.php` | Title, description, palette tab and modal size — where it shows in the builder. |
| `options.php` | The fields in the edit modal. Each option id becomes a key in `$atts`. |
| `views/view.php` | The front-end HTML. `$atts` holds the resolved option values. |
| `static.php` | Enqueues the CSS (only when the element is on the page). |
| `static/css/my_element.css` | Front-end styles. |
| `static/img/page_builder.svg` | The palette icon (**required**) — a crisp 16×16 glyph. |

The tag is the **folder name**: `[my_element]`. Rename the folder (underscores)
and the shortcode tag changes with it.

## Install it

Copy the `my_element/` folder (everything beside this README, not the README
itself) into one of these — the framework auto-discovers any folder with a
`config.php` + `views/view.php`:

- **In the Shortcodes extension** (what `static.php` is written for):
  `wp-content/plugins/unysonplus/framework/extensions/shortcodes/shortcodes/my_element/`
- **In a child theme** (survives plugin updates — recommended for site-specific
  elements): `wp-content/themes/<your-child-theme>/framework-customizations/extensions/shortcodes/shortcodes/my_element/`
  — if you use this location, enqueue the CSS from the theme URI instead (see the
  note in `static.php`).

## Verify

1. Hard-refresh a post/page edit screen. **Highlight Box** appears in the
   *Content Elements* palette tab with its icon.
2. Drag it onto the canvas — the modal opens with Heading / Message / Alignment.
3. Set values, save, view the front end: `view.php` renders with your `$atts`.

Full walkthrough: https://docs.unysonplus.com/developers/add-a-shortcode
