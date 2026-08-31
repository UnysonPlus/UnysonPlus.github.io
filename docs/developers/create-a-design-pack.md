---
title: Create a shortcode design (design pack)
sidebar_position: 3
---

# Create a shortcode design (design pack)

A **design** is a layout variant an element offers in its **Design** option — the same picker
where `[testimonials]` lets you choose Classic, Split, Bento, Masonry, and so on. A **design pack**
is a small, installable bundle (a `.zip`) that adds a *new* design to an existing element **without
editing the plugin, a child theme, or any core file**. An admin uploads it on the Shortcodes admin
page; it then appears as a tile in that element's Design picker, exactly like a built-in design.

This is how free and paid designs are distributed. A design pack is **executable PHP**, so it is
admin-installed and trusted at the same level as installing a plugin.

:::note[Design pack vs. full shortcode vs. preset]
- **Design pack** (this page) — a new *layout* for an **existing** element. A render partial + its
  styles + an icon (+ optional extra options). Shows up in that element's Design picker.
- **[Full shortcode](/developers/add-a-shortcode)** — a brand-new element. Use that guide when
  you're adding a new page-builder block, not restyling an existing one.
- **Preset** — a saved *set of option values* applied to one element instance (content, colors,
  spacing). No code, no new layout. That's a different feature.
:::

## What's in a pack

A design pack is a folder with a `manifest.json` and a `view.php`; everything else is optional:

```
quote-cards/
├── manifest.json          REQUIRED — what/where this design is (JSON, no code)
├── view.php               REQUIRED — the render partial (the layout's HTML)
├── options.php            optional — extra, design-scoped options for the edit modal
├── img/
│   └── icon.svg           the tile shown in the element's Design picker
└── static/
    ├── css/styles.css     the design's styles (scoped to .design-<key>)
    └── js/script.js       optional front-end behaviour
```

Zip that folder and it's installable. The folder name doesn't matter — the **`design_key`** in the
manifest is the pack's real identity.

## `manifest.json` — the required descriptor

Pure JSON, no PHP. It tells the installer what the pack is and which element it targets:

```json
{
  "pack": 1,
  "type": "design",
  "id": "testimonials-quote-cards",
  "design_key": "quote_cards",
  "name": "Quote Cards",
  "shortcode": "testimonials",
  "version": "1.0.0",
  "author": "UnysonPlus",
  "license": "free",
  "vendor_deps": []
}
```

| Field | Required | Meaning |
|---|---|---|
| `pack` | ✓ | Format marker — set to `1`. |
| `type` | ✓ | Must be `"design"` (this is what the auto-detecting installer routes on). |
| `shortcode` | ✓ | The **tag** of the element this design is for (`testimonials`, `gallery`, `image_box`, …). The element must exist and be design-capable. |
| `design_key` | ✓ | The design's stable id. It becomes the saved value, the CSS scope (`.design-<key>`), and the on-disk folder. **Never change it after release** (see the gotcha below). Lowercase, `[a-z0-9_]`. |
| `name` | ✓ | Human label shown on the picker tile and in the manager. |
| `id` | – | A globally-unique pack id (e.g. `<shortcode>-<key>`). Handy for catalogs. |
| `version` | – | Semver. Shown in the manager and used by the **replace confirmation** when re-uploading. |
| `author` | – | Shown in the manager. |
| `license` | – | `"free"` or `"paid"` (informational for now). |
| `vendor_deps` | – | Array of script handles your `script.js` needs enqueued first, e.g. `["splide"]`. |

## `view.php` — the render partial

This is the layout. It is **not** a standalone template — the host element's dispatcher `include`s
it, so it inherits the same variables the built-in partials get. Write the element's markup using
those variables and the shared helpers.

The cleanest way to learn a shortcode's partial contract is to read one of its built-in partials —
e.g. `shortcodes/testimonials/views/designs/bento.php`. For `[testimonials]` the inherited scope is:

- `$testimonials` — the array of testimonial rows.
- `$attr` — the outer wrapper attributes (already includes the `design-<key>` class).
- `$container_cls`, `$show_rating`, `$box_style`, `$avatar_shape`, and the per-field class extras
  (`$quote_class_extra`, `$author_name_class_extra`, `$author_job_class_extra`).
- Helpers: `sc_testimonial_fields()`, `sc_render_rating()`, `sc_testimonial_quote_html()`.

```php
<?php if ( ! defined( 'FW' ) ) { die( 'Forbidden' ); }
/**
 * Design pack: Quote Cards — a render partial for [testimonials].
 * Inherits the testimonials dispatcher's scope by include (same contract the
 * built-in partials use). Output lean, semantic HTML — clean-DOM philosophy.
 */
if ( empty( $testimonials ) ) {
	echo '<div ' . fw_attr_to_html( $attr ) . '><div class="' . esc_attr( $container_cls ) . '">'
	   . '<div class="text-muted small">' . esc_html__( 'No testimonials found.', 'fw' ) . '</div></div></div>';
	return;
}
?>
<div <?php echo fw_attr_to_html( $attr ); ?>>
	<div class="<?php echo esc_attr( $container_cls ); ?>">
		<div class="ts-qcards">
			<?php foreach ( $testimonials as $t ) :
				$f      = sc_testimonial_fields( $t );
				$rating = ( $show_rating && function_exists( 'sc_render_rating' ) ) ? sc_render_rating( $f['rating'] ) : '';
				?>
				<figure class="fw-tst-item <?php echo esc_attr( $box_style ); ?> ts-qcard">
					<span class="ts-qcard__mark" aria-hidden="true">&ldquo;</span>
					<blockquote class="testimonial-quote <?php echo esc_attr( $quote_class_extra ); ?>"><?php echo sc_testimonial_quote_html( $f['content'] ); ?></blockquote>
					<?php if ( $rating ) { echo '<div class="ts-qcard__rating">' . $rating . '</div>'; } ?>
					<figcaption class="ts-qcard__author">
						<?php if ( $f['avatar'] ) : ?>
							<img class="ts-qcard__avatar <?php echo esc_attr( $avatar_shape ); ?>" src="<?php echo esc_url( $f['avatar'] ); ?>" alt="<?php echo esc_attr( $f['author_name'] ); ?>" loading="lazy" />
						<?php endif; ?>
						<span class="ts-qcard__byline">
							<?php if ( $f['author_name'] ) { echo '<span class="testimonial-author ' . esc_attr( $author_name_class_extra ) . '">' . esc_html( $f['author_name'] ) . '</span>'; } ?>
							<?php if ( $f['author_job'] ) { echo '<span class="testimonial-job ' . esc_attr( $author_job_class_extra ) . '">' . esc_html( $f['author_job'] ) . '</span>'; } ?>
						</span>
					</figcaption>
				</figure>
			<?php endforeach; ?>
		</div>
	</div>
</div>
```

:::caution[Escape everything and keep the DOM clean]
`view.php` is trusted code, but still escape all output (`esc_html`, `esc_attr`, `esc_url`) and emit
lean, semantic markup — no wrapper-div soup. See the [clean-DOM philosophy](/page-builder/clean-dom).
:::

## `static/css/styles.css` — scoped styles

The dispatcher adds a `design-<design_key>` class to the element's wrapper, so **scope every rule to
`.design-<key>`**. This keeps your design's CSS from leaking into other designs or the rest of the
page, and it's why `design_key` must stay stable.

```css
/* Quote Cards — scoped to the dispatcher's design-<key> class. */
.design-quote_cards .ts-qcards {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
	gap: 22px;
}
.design-quote_cards .ts-qcard {
	position: relative;
	padding: 28px 22px 22px;
	border-radius: 14px;
	background: #fff;
	box-shadow: 0 10px 30px rgba(2, 6, 23, .08);
}
```

The framework enqueues `static/css/styles.css` automatically **only when the design is active** on the
page, with the element's base stylesheet as a dependency. You don't enqueue it yourself.

## `static/js/script.js` — behaviour (optional)

If your layout needs JS (a slider, a filter), ship `static/js/script.js`. It's enqueued only when the
design is active, after the element's base script and after any handles you list in `vendor_deps`
(e.g. `"splide"` for the Splide carousel the plugin already bundles).

## `options.php` — extra design-scoped options (optional)

A design can add its own fields to the element's edit modal. Return an `$options` array of standard
[option types](/options/option-types); they appear (design-scoped) only when your design is
selected, and their saved values live under `design_settings/<design_key>/<field_id>`.

```php
<?php if ( ! defined( 'FW' ) ) { die( 'Forbidden' ); }

$options = array(
	'columns' => array(
		'type'    => 'select',
		'label'   => __( 'Columns', 'fw' ),
		'choices' => array( '2' => '2', '3' => '3', '4' => '4' ),
		'value'   => '3',
	),
);
return $options;
```

Read them back in `view.php` from that same path, e.g.:

```php
$columns = (int) fw_akg( 'design_settings/quote_cards/columns', $atts, 3 );
```

## `img/icon.svg` — the picker tile

Ship `img/icon.svg` (≈100×60) — it's the thumbnail on the Design picker tile and in the manager. Make
it read as a small preview of the layout:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="60" viewBox="0 0 100 60" fill="none">
  <rect width="100" height="60" rx="4" fill="#f5f7fa"/>
  <g fill="#fff" stroke="#d7dee7">
    <rect x="10" y="12" width="36" height="36" rx="4"/>
    <rect x="54" y="12" width="36" height="36" rx="4"/>
  </g>
  <!-- decorative quote marks / lines that hint at the layout -->
</svg>
```

## Package and install

1. Zip the pack folder (the folder can sit at the zip root or one level down — the installer finds it
   by its `manifest.json`).
2. Go to **Unyson+ → Shortcodes → "Add a shortcode or design pack" → Upload a .zip**, or the
   **From GitHub** field. The installer **auto-detects** `type: "design"` and routes it to the design
   library — you don't pick a different button.
3. It installs to `wp-content/uploads/unysonplus/designs/<shortcode>/<design_key>/` (update-safe,
   outside the plugin).
4. Open the target element in the builder → **Design** tab → your tile is there. Select it to render.

## Manage installed packs

On the Shortcodes page, the **Design packs** tab lists every design-capable element as a postbox with
its designs:

- **Enable / disable** any design (built-ins too, except each element's `default`). Disabling hides it
  from the element's Design picker without deleting anything.
- **Delete** an installed pack (removes its files).
- **Replace / update** — just re-upload the pack's `.zip`. A `.zip` whose `design_key` matches an
  installed pack triggers a **replace confirmation** that compares the installed version with the
  uploaded one; confirm to overwrite in place. (There's no separate "update" button — the uploader is
  the one way in.)

A shortcode's card on the **Shortcodes** tab shows a **"Designs (N)"** shortcut when it carries
installed packs, linking straight to its group.

## Make your own shortcode design-capable

If you're building a shortcode and want it to accept design packs, wire the **pluggable-designs**
layer into its three seams (reference implementation: `shortcodes/testimonials/`):

- **`options.php`** — build the Design option's `image-picker` choices from the merged registry, and
  merge in any installed packs' option fragments:

  ```php
  $design_choices = fw_sc_design_picker_choices( 'your_tag' );
  // …use $design_choices as the picker's 'choices'…
  // then merge pack option fragments into design_settings/<key>:
  foreach ( fw_sc_design_pack_option_fragments( 'your_tag' ) as $key => $frag ) {
      $options['tab_design']['options']['group']['options']['design_settings']['choices'][ $key ] = $frag;
  }
  ```

- **`views/view.php`** — resolve the active design, add the scope class, include the partial:

  ```php
  $design      = fw_sc_design_resolve( 'your_tag', $atts, 'default' );
  $design_file = fw_sc_design_partial( 'your_tag', $design );
  $attr['class'] = trim( $attr['class'] . ' design-' . $design ); // CSS scope hook
  if ( $design_file && file_exists( $design_file ) ) { include $design_file; }
  ```

- **`static.php`** — enqueue the active design's assets (built-in or pack), origin-agnostic:

  ```php
  $design = fw_sc_design_resolve( 'your_tag', $atts, 'default' );
  fw_sc_design_enqueue( 'your_tag', $design );
  ```

Your built-in designs live in `shortcodes/your_tag/views/designs/` with a `registry.php` mapping
`key => [label, thumb, css, js]`. Installed packs are merged on top automatically, so both kinds
appear in the same picker and are managed together. Full API: `fw_sc_designs()`,
`fw_sc_design_picker_choices()`, `fw_sc_design_resolve()`, `fw_sc_design_partial()`,
`fw_sc_design_enqueue()`, `fw_sc_design_pack_option_fragments()`.

## Verify

1. Upload the `.zip` on the Shortcodes page → you get "Design *Name* installed for [shortcode]".
2. It appears (enabled) under that element in the **Design packs** tab.
3. In the builder, the element's **Design** picker shows your tile; selecting it renders `view.php`.
4. On the front end, the wrapper carries `design-<key>` and `static/css/styles.css` is loaded.
5. Re-upload the same `.zip` → you're asked to confirm the replace (with versions); confirm updates it.

## Gotchas

- **`design_key` is forever.** It's the CSS scope (`.design-<key>`), the saved builder value, and the
  install folder. Renaming it in a later version breaks existing pages that selected the old key and
  orphans the styles. Pick it once; bump `version` instead.
- **Scope all CSS to `.design-<key>`.** Unscoped rules leak into other designs and the page.
- **Match the host's partial contract.** Your `view.php` gets its variables from the element's
  dispatcher — read a built-in partial for that element to see exactly what's in scope before writing
  your own. A design pack for `[gallery]` has a different contract than one for `[testimonials]`.
- **Packs are code = admin-trusted.** Only install packs from sources you trust — same as installing a
  plugin. This is why anyone-can-upload sharing is not offered for packs (that's what value-only
  presets are for).
