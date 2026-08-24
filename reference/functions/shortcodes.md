---
title: Shortcodes — functions
sidebar_label: Shortcodes
slug: /functions/shortcodes
description: Public PHP helper functions in the UnysonPlus Shortcodes subsystem — signatures, parameters, and return values.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED — do not edit by hand. Edit the framework docblocks, then run: php scripts/extract-php-api.php … && node scripts/gen-php-api.mjs -->

# Shortcodes — functions

**345 public functions.** 316 are 🔌 pluggable (`function_exists()`-guarded, so a theme/child can override them).

| Function | Summary |
| --- | --- |
| [`fw_carousel_color`](#fw_carousel_color) | A preset/custom colour value → [ class, style-decls ] for text. |
| [`fw_countdown_color`](#fw_countdown_color) | A preset/custom colour value → [ class, style-decls ] for a given CSS property. |
| [`fw_countdown_enqueue_font`](#fw_countdown_enqueue_font) | Enqueue a typography-v2 value's Google font, if one was chosen. |
| [`fw_countdown_typography_css`](#fw_countdown_typography_css) | A typography-v2 value → inline CSS declarations (only the keys that are set). |
| [`fw_counter_default_font`](#fw_counter_default_font) | Repair an "unconfigured" per-part typography value. |
| [`fw_counter_enqueue_font`](#fw_counter_enqueue_font) | Enqueue a typography-v2 value's Google font, if one was chosen. |
| [`fw_counter_part`](#fw_counter_part) | Render one counter part (prefix / num / suffix) as a &lt;span&gt; carrying its typography (inline style) + colour (preset class or custom inline style). |
| [`fw_counter_typography_css`](#fw_counter_typography_css) | A typography-v2 value → inline CSS declarations (only the keys that are set). |
| [`fw_design_lib__decode_thumb`](#fw_design_lib__decode_thumb) | Decode a `data:image/&lt;type&gt;;base64,…` thumbnail into $dir. Raster types only (webp/png/jpg/gif) — no SVG (defence in depth). Returns the written filename (e.g. 'thumb.webp') or '' when absent/invalid. |
| [`fw_design_lib__fetch_json`](#fw_design_lib__fetch_json) | GET a URL and json_decode it. Returns array\|WP_Error. |
| [`fw_design_lib__rrmdir`](#fw_design_lib__rrmdir) | Recursively delete a directory (temp + uninstall). |
| [`fw_design_lib__slugify`](#fw_design_lib__slugify) | name → url-safe slug (lowercase, non-alnum → '-'). |
| [`fw_design_lib__unique_slug`](#fw_design_lib__unique_slug) | Ensure the slug is free under &lt;root&gt;/&lt;shortcode&gt;/; append -2, -3… on clash. |
| [`fw_design_lib_catalog`](#fw_design_lib_catalog) | Remote catalog, transient-cached (12h ok / 5min fail). Normalized to &#123; version, base_url, designs:&#123; "&lt;shortcode&gt;/&lt;slug&gt;" =&gt; &#123;shortcode,slug,name,category,thumb,description&#125; &#125; &#125;. |
| [`fw_design_lib_catalog_url`](#fw_design_lib_catalog_url) | Returns the filterable remote URL of the design library's catalog.json in UnysonPlus-Library. |
| [`fw_design_lib_dir`](#fw_design_lib_dir) | Absolute uploads path of a shortcode's designs folder: unysonplus/designs/&lt;shortcode&gt;. |
| [`fw_design_lib_enabled`](#fw_design_lib_enabled) | Shortcodes allowed to carry designs (mirrors the modal enabled-list). |
| [`fw_design_lib_install`](#fw_design_lib_install) | Download + install one catalog design ( &lt;base&gt;/&lt;shortcode&gt;/&lt;slug&gt;/design.json ). |
| [`fw_design_lib_install_from_json`](#fw_design_lib_install_from_json) | Import a user-supplied design JSON (string or decoded array) into the catalog. |
| [`fw_design_lib_installed_items`](#fw_design_lib_installed_items) | Flat list of installed designs (optionally for one shortcode), each: &#123; id, shortcode, name, thumb(url), source, atts &#125; `atts` is loaded from design.json so the builder can apply offline. |
| [`fw_design_lib_store_envelope`](#fw_design_lib_store_envelope) | Persist a validated envelope into the catalog. Atomic (temp dir → rename). Decodes the data-URI thumb to a file and strips it from the stored design.json. |
| [`fw_design_lib_uninstall`](#fw_design_lib_uninstall) | Remove an installed design. @return true\|WP_Error |
| [`fw_design_lib_update_meta`](#fw_design_lib_update_meta) | Edit an installed design's name and/or scoped CSS (atts.custom_css). Values-only; used by the Theme Settings manager. @return true\|WP_Error |
| [`fw_design_lib_url`](#fw_design_lib_url) | Public URL of a shortcode's designs folder (for thumbnails). |
| [`fw_design_lib_validate_envelope`](#fw_design_lib_validate_envelope) | Validate a design envelope: correct marker, an enabled shortcode, a name, and an atts object. Values-only — no markup/JS is ever accepted here. |
| [`fw_ext_shortcodes_decode_attr`](#fw_ext_shortcodes_decode_attr) | Decodes a shortcode's encoded attributes using the first matching registered attribute coder. |
| [`fw_ext_shortcodes_enqueue_shortcodes_admin_scripts`](#fw_ext_shortcodes_enqueue_shortcodes_admin_scripts) | Enqueue admin scripts for each shortcode |
| [`fw_ext_shortcodes_enqueue_shortcodes_static`](#fw_ext_shortcodes_enqueue_shortcodes_static) | Parse string, extract shortcodes and enqueue their static files |
| [`fw_flexbox_alias_for_depth`](#fw_flexbox_alias_for_depth) | Pick the inner-flexbox alias for a given nesting depth (depth 1 = first flexbox nested inside another flexbox). Cycles through fw_flexbox_inner_alias_pool(). |
| [`fw_flexbox_inner_alias_pool`](#fw_flexbox_inner_alias_pool) | Returns the pool of distinct shortcode-tag aliases used for nested flexbox containers. |
| [`fw_progress_color`](#fw_progress_color) | A preset/custom colour value → [ class, style-decls ] for a CSS property ('text' or 'bg'). |
| [`fw_progress_icon_html`](#fw_progress_icon_html) | Render an icon-v2 value to an &lt;i&gt;/&lt;img&gt;, enqueuing the icon CSS once. |
| [`fw_progress_raw_color`](#fw_progress_raw_color) | Resolve a compact/legacy colour value to a RAW css colour string (e.g. "#2563eb"). Needed for SVG strokes & gradients where a preset CSS class can't be used. Presets are mapped back to their hex via the live palette, so circular / gauge styles support presets too. |
| [`fw_sc_accordion_format_number`](#fw_sc_accordion_format_number) | Render the numbering label for one accordion item. |
| [`fw_sc_accordion_int_to_alpha`](#fw_sc_accordion_int_to_alpha) | Excel-style alpha index: 1=a/A, 26=z/Z, 27=aa/AA, 28=ab/AB, ... Clamps n&lt;1 to 1 so non-positive inputs still produce a letter. |
| [`fw_sc_accordion_int_to_roman`](#fw_sc_accordion_int_to_roman) | Returns the Roman numeral form of a positive integer. Clamps n&lt;1 to 1. |
| [`fw_sc_design_capable_tags`](#fw_sc_design_capable_tags) | Discovered shortcodes that have designs to manage — a built-in views/designs/registry.php OR one or more installed design packs. |
| [`fw_sc_design_enqueue`](#fw_sc_design_enqueue) | Enqueue a design's CSS/JS (origin-agnostic), with the shortcode's base handle as a dependency + any declared vendor deps (e.g. 'splide'). Safe to call for built-in designs too. Call from the `fw_ext_shortcodes_enqueue_static:&lt;tag&gt;` handler after resolving the active design. |
| [`fw_sc_design_pack_count`](#fw_sc_design_pack_count) | Number of INSTALLED design packs (origin=uploads) for a shortcode. |
| [`fw_sc_design_pack_enabled`](#fw_sc_design_pack_enabled) | Whether an installed design pack is enabled. Default true; a disabled map is stored per shortcode (mirrors icon-v3's per-pack toggle). Filterable. |
| [`fw_sc_design_pack_option_fragments`](#fw_sc_design_pack_option_fragments) | Collect installed design PACKS' option fragments for a shortcode: key =&gt; options-array (the pack's options.php returns $options). The host shortcode merges these into its `design_settings` multi-picker `choices[&lt;key&gt;]` so a pack's controls appear (design-scoped) when selected. |
| [`fw_sc_design_partial`](#fw_sc_design_partial) | Absolute path of the design's render partial (built-in or pack), or '' if the key is unknown / has no partial. Callers keep their own file_exists guard. |
| [`fw_sc_design_picker_choices`](#fw_sc_design_picker_choices) | image-picker `choices` for a shortcode's Design option (built-in + packs). Each: key =&gt; [ 'small' =&gt; ['src'=&gt;thumb, 'alt'=&gt;label, 'height'=&gt;60], 'label'=&gt;label ]. |
| [`fw_sc_design_resolve`](#fw_sc_design_resolve) | Resolve the selected design key from an element's atts, whitelisted to the merged registry, falling back to 'default'. Mirrors the testimonials view: new multi-picker path `design_settings/design` → legacy scalar `design` → 'default'. |
| [`fw_sc_design_set_enabled`](#fw_sc_design_set_enabled) | Enable/disable a design (built-in or pack) for a shortcode by updating the shared `fw_sc_design_packs_disabled` option map (tag =&gt; [disabled keys]). 'default' can never be disabled. Returns true on success. |
| [`fw_sc_designs`](#fw_sc_designs) | The merged design registry for a shortcode: built-in + installed packs. |
| [`fw_sc_designs_manage`](#fw_sc_designs_manage) | Every design for a shortcode INCLUDING disabled ones (each with an `enabled` flag), for the management UI. Thin wrapper over fw_sc_designs( $tag, true ). |
| [`fw_text_expander_add_class`](#fw_text_expander_add_class) | Append CSS classes to a paragraph token's opening tag. If the token already has a `class="..."` attribute, merge into it; otherwise add a fresh class attribute. Used by the per-element color picks to color visible / hidden paragraphs independently. |
| [`fw_text_expander_append_html_simple`](#fw_text_expander_append_html_simple) | Append HTML to a paragraph token's inner (immutable return). Used to inject buttons / bridge spans into specific paragraphs. |
| [`fw_text_expander_inline_text`](#fw_text_expander_inline_text) | Reduce HTML to a clean inline string by stripping every &lt;p&gt; wrapper. Used only for the native &lt;details&gt; summary. |
| [`fw_text_expander_mark_hidden`](#fw_text_expander_mark_hidden) | Inject `data-expander-hidden="true"` into a paragraph token's opening tag, preserving every attribute that was already there. |
| [`fw_text_expander_parse_paragraphs`](#fw_text_expander_parse_paragraphs) | Tokenise an HTML string into an ordered list of paragraph tokens. Each token preserves the original opening &lt;p&gt; tag (with all its attributes), inner HTML, and closing tag separately so we can mutate each independently without losing author-supplied classes/ids. |
| [`sc_ab_render`](#sc_ab_render) | Renders the author-box shortcode markup for the resolved design and source. |
| [`sc_accordion_style_choice`](#sc_accordion_style_choice) | One image-picker choice (small + large thumbnail + label) for a Style preset. |
| [`sc_accordion_style_thumb`](#sc_accordion_style_thumb) | A schematic SVG thumbnail (data URI) for one accordion Style preset — a tiny line diagram of how the style looks, for the image-picker tiles. Kept flat/neutral (slate lines, one indigo accent) so it reads in both light and dark admin skins. |
| [`sc_ah_render`](#sc_ah_render) | Renders the animated-heading shortcode with the resolved animation and word list. |
| [`sc_alignment_class`](#sc_alignment_class) | Map a stored alignment value to its Bootstrap text-* utility class. `''` (inherit / unset) returns `''` so the caller can fall back to a master value. Unknown values also return `''`. |
| [`sc_alignment_field`](#sc_alignment_field) | Build a horizontal-alignment image-picker field (Left / Center / Right), reusable across shortcodes. The swatches are the shared SVGs under `static/img/alignment/`; the stored value is `left` / `center` / `right` (or `''` when `inherit` is on — meaning "follow the parent/master"). |
| [`sc_anim_collection_items`](#sc_anim_collection_items) | Per-collection item selector registry — "what are this element's cards?", keyed by the element's `base_class` (each collection sets one before calling sc_build_wrapper_attr). Drives the per-child ENTRANCE STAGGER below (and the Card Stack skip-guard: these grid collections aren't valid Card-Stack targets). Any multi-item element with a single stable item selector belongs here. |
| [`sc_animation_flag`](#sc_animation_flag) | Marks/queries a per-request flag that says "at least one animated shortcode has rendered on this page". Used to gate the wp_footer enqueue. |
| [`sc_animation_use`](#sc_animation_use) | On-demand asset registry for entrance animations — records which Animate.css effect classes actually rendered this request, so wp_footer enqueues ONLY those effects' CSS partials (+ the shared base) instead of the whole 72 KB bundle. Pass an 'animate__&lt;name&gt;' class to record it; call with no arg to read the set. |
| [`sc_announce_color`](#sc_announce_color) | Resolve a compact color-field value to a CSS color string: a Color Preset slug → var(--color-slug), or a custom hex / rgb(a). Returns '' when unset. |
| [`sc_announce_render`](#sc_announce_render) | Renders the announcement/badge shortcode from its tag text and message atts. |
| [`sc_ap_render`](#sc_ap_render) | Renders the audio-player shortcode for the resolved design and track list. |
| [`sc_apply_styling_classes`](#sc_apply_styling_classes) | Append Styling-tab picks to a wrapper's class list. |
| [`sc_attr_to_html`](#sc_attr_to_html) | Converts an attribute array to an HTML attribute string via fw_attr_to_html(), or returns the default. |
| [`sc_avatar_auto_color`](#sc_avatar_auto_color) | Returns a stable background/foreground color pair for a seed name via a crc32-indexed palette. |
| [`sc_avatar_css_color`](#sc_avatar_css_color) | Resolves a compact color-picker value (custom hex or preset slug) to a concrete CSS color string. |
| [`sc_avatar_face`](#sc_avatar_face) | Builds one avatar face element (image or initials, optional status dot and link). |
| [`sc_avatar_initials`](#sc_avatar_initials) | Derives 1-2 uppercase initials from a name, or from an explicit override. |
| [`sc_bac_color_var`](#sc_bac_color_var) | Read a compact-color att and, if a CUSTOM hex was picked, return a CSS var declaration "&lt;name&gt;:&lt;hex&gt;;". Preset (class) picks fall back to the stylesheet default (return ''). Mirrors image-box's accent/overlay vars. |
| [`sc_bac_image`](#sc_bac_image) | Resolve an upload att to [ url, alt ] (full-size url, alt from the library). |
| [`sc_bac_registry`](#sc_bac_registry) | Returns the cached before-after design registry array. |
| [`sc_bac_render`](#sc_bac_render) | Renders the before-after shortcode, dispatching to the comparison or spotlight type. |
| [`sc_bac_render_comparison`](#sc_bac_render_comparison) | Renders the before-after comparison (slider) variant markup for the given images and design. |
| [`sc_bac_render_spotlight`](#sc_bac_render_spotlight) | Renders the before-after spotlight (reveal) variant markup for the given images and design. |
| [`sc_bg_pro_style`](#sc_bg_pro_style) | Compile a `background-pro` value into an inline CSS style string. |
| [`sc_bg_pro_video_attr`](#sc_bg_pro_video_attr) | Compile a `background-pro` value's video layer into the Formstone `data-background-options` attribute (the existing section video player). Returns an empty array when video is disabled / has no source — the caller then knows not to add the `background-video` class. |
| [`sc_bi_fmt`](#sc_bi_fmt) | Format "HH:MM" per 12/24-hour. |
| [`sc_bi_mins`](#sc_bi_mins) | "HH:MM" -&gt; minutes since midnight, or null if invalid. |
| [`sc_bi_render`](#sc_bi_render) | Renders the business-info shortcode markup for the resolved design. |
| [`sc_bq_render`](#sc_bq_render) | Renders the blockquote shortcode markup for the resolved design. |
| [`sc_build_wrapper_attr`](#sc_build_wrapper_attr) | Builds the outer wrapper attributes (base class, unique id, extra attrs) for a shortcode. |
| [`sc_button_kses_label`](#sc_button_kses_label) | Sanitize a button label that may contain an inline &lt;svg&gt; icon (or basic inline formatting) without flattening it to escaped source text. |
| [`sc_button_style_atts`](#sc_button_style_atts) | Turn saved sc_button_style_field() values into button classes + inline width + alignment. Mirrors the [button] shortcode's class assembly so both look identical. |
| [`sc_button_style_field`](#sc_button_style_field) | The shared Button STYLE option group — Button Style preset, Size, Shape, Width, Alignment and Hover Animation — sourced from the same Theme Settings → Buttons presets as the [button] shortcode. Any element that renders a themed button (e.g. the WooCommerce Add to Cart element) can drop this into a Style tab and read the values back with sc_button_style_atts(), so the button look never drifts. |
| [`sc_cal_color`](#sc_cal_color) | Returns a validated calendar accent color, defaulting to 'blue' for unknown values. |
| [`sc_cal_events`](#sc_cal_events) | Read + normalise events. Falls back to the legacy data_provider shape. |
| [`sc_cal_render`](#sc_cal_render) | Renders the calendar shortcode markup for the resolved design. |
| [`sc_cal_render_grid`](#sc_cal_render_grid) | Render one month grid (server side). Mirrors the JS renderer in scripts.js. |
| [`sc_cal_to_ymd`](#sc_cal_to_ymd) | Normalise a date-picker / timestamp value to Y-m-d (or '' if unparseable). |
| [`sc_card_box_style_class`](#sc_card_box_style_class) | Read + validate a card element's saved Box Style value into a safe `boxp-&#123;slug&#125;` class (or '' when unset / malformed). The shared reader for every element that consumes sc_card_box_style_field(), so the validation lives in one place. |
| [`sc_card_box_style_field`](#sc_card_box_style_field) | The shared "Box Style" card control — a `border-style-picker` of the saved Box Presets (Theme Settings → Components → Box Presets), each previewed inline. The saved value is a `boxp-&#123;slug&#125;` class the card element stamps on its card wrapper (so the preset's border / radius / shadow / fill AND its new structured hover effects apply). Axis 1 of the unified card system — engine-independent. |
| [`sc_card_preview_mount_html`](#sc_card_preview_mount_html) | Markup for the live-preview mount (use as an `html-full` option's `html`). |
| [`sc_card_rows_field`](#sc_card_rows_field) | The shared "Card Rows" slot designer — an addable, drag-sortable list of ROWS, each row a set of SLOTS with a flex direction (inline/stacked) + distribute (justify) + align. This is the ONE composable card model, used by wc_products and testimonials (and any element whose card is a stack of rows). Parameterise the SLOT choices + the seeded default per element; presence of a slot = "it's in a row" (a slot renders only when placed in a row and it has content). |
| [`sc_card_rows_render`](#sc_card_rows_render) | Assemble Card Rows → HTML. $slot_map = [ slug =&gt; html ]; empty slots (and empty rows) collapse. CSS classes: "&#123;prefix&#125;__row &#123;prefix&#125;-row--&#123;dir&#125; &#123;prefix&#125;-j-&#123;justify&#125; &#123;prefix&#125;-a-&#123;align&#125;". |
| [`sc_card_rows_value`](#sc_card_rows_value) | Normalise a saved Card Rows value → a clean list of &#123; slots[], dir, justify, align &#125;. '' rows drop. |
| [`sc_code_block_beautify_html`](#sc_code_block_beautify_html) | Normalize + re-indent arbitrary (possibly minified or messily-formatted) HTML into clean, tab-indented markup. &lt;pre&gt;/&lt;textarea&gt;/&lt;script&gt;/&lt;style&gt;/&lt;svg&gt; bodies are protected from reflow so their internal formatting is preserved verbatim. |
| [`sc_code_block_detect_language`](#sc_code_block_detect_language) | Cheap heuristic language sniffer for the "Auto-detect" choice. Good enough to pick the right Prism `language-*` class for the common cases (markup / php / css / js / json). |
| [`sc_code_block_indent_html`](#sc_code_block_indent_html) | Tab-indent a (normalized, single-line) HTML string with a simple element STACK. Structural containers (div, section, ul, table, tr, …) each own an indented line and indent their children; text-level "leaf" elements (p, li, h1–6, td, th, span, strong, …) sit on their own line at block context but keep their inline content + closing tag on the SAME line; any element nested inside a leaf renders fully inline. Each open frame is closed in the same mode it was opened, so inline/leaf nesting can't unbalance the indentation (the failure mode of tags that are both inline and leaf, e.g. &lt;span&gt;). &lt;svg&gt;/&lt;pre&gt;/… are protected upstream. |
| [`sc_color_field`](#sc_color_field) | Build a single color-picker select field for the Styling tab. |
| [`sc_color_field_compact`](#sc_color_field_compact) | Builds a compact preset+custom color-picker option field for a shortcode Styling tab. |
| [`sc_color_is_light`](#sc_color_is_light) | Returns true if a hex color is essentially white — luminance so high its text would be invisible against the admin dropdown's white surface. Used by the admin &lt;option&gt; stylers to pick a contrasting backdrop only for `#fff` and near-whites (e.g. Bootstrap's `Light` #f8f9fa). Yellow (#ffeb3b ≈ 0.87), Lime, Light Gray etc. stay bare so their actual hue is visible. |
| [`sc_color_to_css`](#sc_color_to_css) | Resolves a color-field value (preset var, custom hex, or legacy string) to a CSS color token. |
| [`sc_ct_cell`](#sc_ct_cell) | Render one cell from its raw token. |
| [`sc_ct_render`](#sc_ct_render) | Renders the comparison-table shortcode from its columns and rows atts. |
| [`sc_design_enabled_shortcodes`](#sc_design_enabled_shortcodes) | Which shortcodes get the Presets tab. Filterable so more can opt in (and so a Design-Pack plugin could enable its own) without touching this file. |
| [`sc_design_presets_panel_html`](#sc_design_presets_panel_html) | The Presets-tab panel markup (server-rendered, safe). JS wires the buttons. |
| [`sc_design_presets_tab`](#sc_design_presets_tab) | The "Presets" tab (a single full-width html panel). |
| [`sc_divider_shape_path`](#sc_divider_shape_path) | Filled SVG path (viewBox 0 0 1200 120) for each shape style. |
| [`sc_easing_css`](#sc_easing_css) | Resolve an easing key to a CSS animation-timing-function value ('' = no override / Default). |
| [`sc_easing_defs`](#sc_easing_defs) | All easing definitions, keyed by easing key. [ 'label', 'group', 'css', 'gsap' ]. |
| [`sc_easing_field`](#sc_easing_field) | Build a POPOVER easing picker option (scalar passthrough value = the easing key). $args: label, desc, value (default key, defaults to 'default'). |
| [`sc_easing_gsap`](#sc_easing_gsap) | Resolve an easing key to the nearest GSAP ease name ('' = default). |
| [`sc_easing_image_choices`](#sc_easing_image_choices) | Build the image-picker tiles (key =&gt; &#123;small,large,label&#125;) pointing at the curve SVGs. |
| [`sc_editor_notice`](#sc_editor_notice) | Returns an italic editor-only placeholder notice div wrapping the escaped text. |
| [`sc_element_scope_class`](#sc_element_scope_class) | Derive a prefix-independent scope class for per-element Custom CSS — e.g. `u1a2b3c4d`. Derived from `unique_id` ALONE (fixed 8-char slug, leading `u` so it's a valid class start) so the front-end wrapper and the per-page CSS aggregator (framework/includes/dynamic-css.php) compute the SAME class without needing to know each shortcode's type-specific unique_id_prefix. |
| [`sc_element_unique_class`](#sc_element_unique_class) | Derive the element's prefixed unique class — e.g. `bt-1a2b3c4d`. |
| [`sc_emit_button_admin_preview_css`](#sc_emit_button_admin_preview_css) | Theme Settings → Buttons → Color Presets renders each row's preview as `&lt;span class="btn btn-preview-&#123;id&#125;"&gt;Name&lt;/span&gt;` inside the postbox header. fw-settings.css supplies the base `.btn` shape, but its color/bg come from an inline `&lt;style&gt;` block that postbox-header CSS can steamroll. This emitter adds a more-specific rule that forces a visible button look in that exact context. |
| [`sc_emit_button_hover_animation_preview_css`](#sc_emit_button_hover_animation_preview_css) | Theme Settings → Buttons → Hover Animations row previews. Each row's template renders `&lt;span class="btn btn-primary btnfx-preview-&#123;id&#125;"&gt;`; this admin_head emitter replays the saved CSS for that row with &#123;&#123;BTN&#125;&#125; -&gt; .btnfx-preview-&#123;id&#125; and &#123;&#123;ANIM&#125;&#125; -&gt; a per-id keyframes name, so hovering the row's button plays the effect. Mirrors the front-end generation in css-tokens.php (same scrub), but keyed by the box id (the template has the id, not the name-derived slug). |
| [`sc_emit_button_preview_saved_css`](#sc_emit_button_preview_saved_css) | Saved-state colour rules for Theme Settings → Buttons preview spans. The addable-box template's inline `&lt;style&gt;` provides live-edit updates, but it gets re-rendered (and briefly cleared for siblings) when postbox toggles fire. This admin_head emitter gives every `.btn-preview-&#123;id&#125;` a stable baseline so toggling one row doesn't blank another row's preview. No `!important` — the inline rule still wins (DOM-late source order, same specificity) when present. |
| [`sc_emit_button_size_preview_saved_css`](#sc_emit_button_size_preview_saved_css) | Saved-state rules for Theme Settings → Buttons → Sizes preview spans. The addable-box template's inline `&lt;style&gt;` provides live-edit updates, but it gets re-rendered (and briefly cleared for siblings) when postbox toggles fire. This admin_head emitter gives every `.btn-size-preview-&#123;id&#125;` a stable baseline so toggling one row doesn't blank another row's preview. No `!important` — the inline rule still wins (DOM-late source order) when present, so live-edit isn't blocked. |
| [`sc_emit_button_size_select_admin_css`](#sc_emit_button_size_select_admin_css) | Size each &lt;option&gt; in the Button shortcode's Size dropdown by the corresponding Button Size Preset's font_size. Mirrors sc_emit_font_size_select_admin_css's approach but uses raw px values directly (typical button sizes are 12px–22px, all readable in the dropdown without normalisation). |
| [`sc_emit_button_style_select_admin_css`](#sc_emit_button_style_select_admin_css) | Color each &lt;option&gt; in the Button shortcode's Style dropdown by the corresponding Button Preset's DEFAULT-state text/background colors, so the dropdown previews each preset. Same pattern as sc_emit_color_select_admin_css. Scoped by `select.sc-button-style`. |
| [`sc_emit_color_preset_select_admin_css`](#sc_emit_color_preset_select_admin_css) | Colour each &lt;option&gt; in dropdowns whose value is a raw Color Preset slug (vs. utility-class values handled by sc_emit_color_select_admin_css). Two flavours: select.sc-color-preset-text → options get colored TEXT select.sc-color-preset-bg → options get a colored BACKGROUND |
| [`sc_emit_color_select_admin_css`](#sc_emit_color_select_admin_css) | Color each &lt;option&gt; in any Styling-tab color dropdown according to its palette color. Scoped by `select.sc-color-text` and `select.sc-color-bg`, which sc_color_field() adds automatically — so adding a new custom color field (via sc_color_field) gets the visual preview for free, with no change needed to this emitter. |
| [`sc_emit_font_size_select_admin_css`](#sc_emit_font_size_select_admin_css) | Size each &lt;option&gt; in any Styling-tab font-size dropdown proportionally to its preset value. Linear-mapped to [12, 32]px so the dropdown stays usable while preserving relative ordering. Scoped by `select.sc-font-size`, which sc_font_size_field() adds automatically. |
| [`sc_emit_styling_admin_css`](#sc_emit_styling_admin_css) | Admin-CSS for the Styling tab — flexes the nested per-side group (`.fw-backend-options-group.sc-spacing-row`) so the 4 Top/Right/Bottom/Left dropdowns share a single row, and overrides short-select's fixed 100px width so they fill the available cell. |
| [`sc_eval_display_conditions`](#sc_eval_display_conditions) | Display Conditions — per-element visibility gate (the Theme Builder "show this element when…" feature). Mirrors Divi's render-then-strip model: the element renders normally, then its output is discarded if its conditions don't pass. |
| [`sc_expand_multi_animation_fields`](#sc_expand_multi_animation_fields) | Expand `anim_meta['multi']` module fields into up to $max instance slots (base + `&lt;key&gt;__2..__N`). Each field (base and slot) is tagged `anim_meta['multi_base']` (the base key) and `anim_meta['multi_index']` (1..N) so the container can group slots under one inserter tile and reveal the next empty one on "Add". Single-instance fields pass through untouched, order kept. |
| [`sc_ext_page_builder_is_builder_post`](#sc_ext_page_builder_is_builder_post) | Adds 'unyson page-builder' body classes when the current post uses the page builder. |
| [`sc_extract_spacing_classes`](#sc_extract_spacing_classes) | Removes the spacing atts and returns their flattened, sanitized margin/padding class names. |
| [`sc_extract_styling_atts`](#sc_extract_styling_atts) | Extracts the given styling keys from atts, returning their collected classes and inline styles. |
| [`sc_extract_styling_classes`](#sc_extract_styling_classes) | Pull styling atts out of $atts, sanitize their values, return them as a class array, and unset them from $atts so the wrapper-class filter won't apply them to the wrapper. |
| [`sc_fb_icon`](#sc_fb_icon) | Renders a flip-box picked icon via the central icon renderer, falling back to inline font/upload markup. |
| [`sc_fb_render`](#sc_fb_render) | Renders the flip-box shortcode, resolving its design skin and front/back title and text content. |
| [`sc_filter_styling_options`](#sc_filter_styling_options) | Filters shortcode options, stripping the styling layer when styling presets are disabled. |
| [`sc_fl_icon`](#sc_fl_icon) | Renders a feature-list picked icon via the central icon renderer, falling back to inline font/upload markup. |
| [`sc_fl_render`](#sc_fl_render) | Renders the feature-list shortcode, resolving its design and folding legacy icon/badge designs into the new model. |
| [`sc_flatten_spacing_value`](#sc_flatten_spacing_value) | Flatten the nested value of a `spacing` option (margin + padding subtrees, each with all/top/right/bottom/left slots holding Bootstrap utility class names) into a flat list of class-safe strings. |
| [`sc_font_size_field`](#sc_font_size_field) | Build a single font-size-preset select field for the Styling tab. |
| [`sc_gallery_caption_text`](#sc_gallery_caption_text) | Resolve the caption string for one item from the chosen source field. Returns '' when the source field is empty. |
| [`sc_gallery_gap_css`](#sc_gallery_gap_css) | Resolve a Gap-Scale slug (e.g. "3") to a CSS length for the layout `gap`. Returns `var(--gap-&lt;slug&gt;, &lt;fallback&gt;)` so it stays live with the site's Spacing → Gap Scale presets (css-tokens.php emits the `--gap-*` tokens). Empty slug (the "None" choice) → 0. |
| [`sc_gallery_gap_size`](#sc_gallery_gap_size) | Like sc_gallery_gap_css() but returns the CONCRETE size string (e.g. "1rem") from the live Gap Scale — for places that need a real length, not a CSS var (e.g. Splide's JS `gap` option in the Carousel design). |
| [`sc_gallery_get_items`](#sc_gallery_get_items) | Normalize the multi-upload `images` value into a flat list of render-ready items. Each saved entry is `&#123; attachment_id, url &#125;`; we resolve real URLs, dimensions, alt/caption/title/description and the full-size source (for the lightbox) from the Media Library so output never depends on the stored url. |
| [`sc_gallery_img_html`](#sc_gallery_img_html) | Build the responsive &lt;img&gt; for one item. Alt falls back to the caption / title only for accessibility (never the URL). Always lazy + async. |
| [`sc_gallery_item_link`](#sc_gallery_item_link) | Resolve an item's "Open Link" URL + anchor attrs. Returns array( url, attrs ) — url is '' when the item has no link. Order: the item's own link (the Post Type source stamps each entry with its post's permalink) → the image's Media-Library "Link URL" meta. External hosts get target=_blank automatically (the tag_list convention); $force_new_tab forces it for internal links too. |
| [`sc_gallery_ratio_css`](#sc_gallery_ratio_css) | Map a saved ratio key (e.g. '4-3') to a CSS aspect-ratio value ('4 / 3'). 'original' (or unknown) returns '' so the caller can skip the property. |
| [`sc_gallery_render_tile`](#sc_gallery_render_tile) | Renders a single gallery tile, wiring click action, captions, hover zoom, and box/image styling. |
| [`sc_get_advanced_tab`](#sc_get_advanced_tab) | Returns a reusable "Advanced" tab for shortcodes. Includes Unique ID, CSS ID, and CSS Class. |
| [`sc_get_animation_fields`](#sc_get_animation_fields) | Returns the inner fields for the Animations tab. |
| [`sc_get_border_preset_choices`](#sc_get_border_preset_choices) | Dropdown choices for a column's Border Preset picker, sourced from the saved Border Presets (Theme Settings → General → Borders). Each preset's name-based slug becomes the option value `boxp-&#123;slug&#125;` (matching the generated CSS class in css-tokens.php). A blank "None" is prepended. Adding a preset in Theme Settings instantly shows up in every Column's Border Preset dropdown. |
| [`sc_get_button_size_choices`](#sc_get_button_size_choices) | Returns dropdown choices for a button's size picker, sourced from the user's saved button size presets (Theme Settings → Buttons → Sizes). Each preset's `slug` becomes the option value `btn-&#123;slug&#125;`. Adding a row in Theme Settings instantly shows up in every Button shortcode's Size dropdown. |
| [`sc_get_button_style_choices`](#sc_get_button_style_choices) | Returns dropdown choices for a button's style / outline picker, sourced from the user's saved button color presets (Theme Settings → Buttons). Each preset's `id` becomes the option value `btn-&#123;id&#125;` (filled) or `btn-outline-&#123;id&#125;` (outline). Adding a row in Theme Settings instantly shows up in every Button shortcode's dropdown. |
| [`sc_get_button_style_default`](#sc_get_button_style_default) | The default Button Style for a freshly-added button: the first REAL preset (Primary, in the default order) — NOT the bare `.btn` base. `sc_get_button_style_choices()` prepends a `'' =&gt; Default` row, so the naive `key()` of the first choice is `''` (an unstyled button); this skips that leading blank and returns the first non-empty `btn-&#123;slug&#125;` key so a dropped-in CTA looks intentional out of the box. The blank "Default" row stays selectable (and the Site Converter still sets it explicitly). Returns '' only when no presets exist. |
| [`sc_get_color_preset_slug_choices`](#sc_get_color_preset_slug_choices) | Slug-keyed choices for any select that picks a Color Preset by slug (e.g. Theme Settings → Buttons color fields). Returns `[ '' =&gt; 'Default', slug =&gt; display_name, … ]`. Pairs with `sc_emit_color_preset_select_admin_css` for option-level colouring. |
| [`sc_get_color_select_choices`](#sc_get_color_select_choices) | Builds select choices from the color presets, keyed by kind-slug, for a color-picker field. |
| [`sc_get_font_size_preset_choices`](#sc_get_font_size_preset_choices) | Builds select choices from font-size/text-style presets that set any typographic property. |
| [`sc_get_gap_select_choices`](#sc_get_gap_select_choices) | Returns dropdown choices for a column-gap picker, sourced from the live Gap Scale (Theme Settings → General → Spacing → Gaps, or plugin defaults). |
| [`sc_get_hover_animation_choices`](#sc_get_hover_animation_choices) | Choices for a button's Hover Animation picker. The built-in values are CSS classes shipped in button/static/css/hover-fx.css — MOTION-ONLY effects (transform / shadow / radius / text) that layer over any button preset (solid, outline, gradient) without touching its colors. The user's Custom Hover Animations (Theme Settings → Buttons) are appended as `btnfx-c-&#123;slug&#125;` entries, generated into the preset stylesheet by css-tokens.php. (Flat map: no optgroups.) |
| [`sc_get_icon_badge_preset_choices`](#sc_get_icon_badge_preset_choices) | Dropdown choices for an element's Icon Badge Preset picker, sourced from the saved Icon Badge presets (Theme Settings → Components → Icon Badges). Each preset's name-based slug becomes the option value `iconb-&#123;slug&#125;` (matching the generated CSS class in css-tokens.php). A blank "None" is prepended. Adding a preset in Theme Settings instantly shows up in every Icon Badge Preset dropdown. |
| [`sc_get_image_style_choices`](#sc_get_image_style_choices) | Image Style choices for the `image_style` select: `imgs-&#123;slug&#125; =&gt; Name`, with a blank "None" prepended. The slug matches the generated `.imgs-&#123;slug&#125;` class in css-tokens.php. Adding a style in Theme Settings → Components → Image Styles instantly shows up here. |
| [`sc_get_option`](#sc_get_option) | Get options value if framework is missing , load defaults |
| [`sc_get_options_box_border`](#sc_get_options_box_border) | Get Border Options |
| [`sc_get_post_option`](#sc_get_post_option) | Converts an attribute array to an HTML attribute string via fw_attr_to_html(), or returns the default. |
| [`sc_get_shortcode_attr`](#sc_get_shortcode_attr) | Get Shortcode Attributes |
| [`sc_get_spacing_select_choices`](#sc_get_spacing_select_choices) | Returns the spacing-utility choices for a select field with the given prefix. Reads the live spacing scale (Theme Settings override or plugin defaults) so adding entries in Shortcode Settings → General → Spacing immediately appears in every Styling-tab Margin/Padding dropdown across all shortcodes. |
| [`sc_get_table_preset_choices`](#sc_get_table_preset_choices) | Table Preset choices for the Table shortcode's `table-style-picker` field: `tbl-&#123;slug&#125; =&gt; Name`, with a blank "None" prepended. The slug matches the generated CSS class in css-tokens.php. Adding a preset in Shortcode Settings → Components → Tables instantly shows up here. |
| [`sc_hl_render`](#sc_hl_render) | Renders the highlight-text shortcode, resolving its effect, tag, alignment, and text content. |
| [`sc_hover_collection_items`](#sc_hover_collection_items) | The narrow registry of collections whose VIEW stamps the per-card HOVER attrs on each item (via upw_hover_collection_item_attr, applied in the view). The engine Hover module skips the wrapper ONLY for these, so hover isn't lost on collections that aren't wired yet. Gallery is wired; add an element here only once its view stamps the item hover. |
| [`sc_hover_item_markup`](#sc_hover_item_markup) | Per-item hover markup pieces for a collection view. Returns array( 'class' =&gt; ' sc-hover ...', 'attr' =&gt; ' data-hover="..." ...' ) to splice onto each item element — honouring the "Hover Target" scope (empty strings when scope is "Whole element", no hover, or the engine is inactive). Keeps every collection view's stamping identical to the Gallery reference. |
| [`sc_hs_icon`](#sc_hs_icon) | Renders an image-hotspots picked icon via the central icon renderer, falling back to inline font/upload markup. |
| [`sc_hs_render`](#sc_hs_render) | Renders the image-hotspots shortcode, resolving its design and the background image and hotspot markers. |
| [`sc_html_tag`](#sc_html_tag) | Wraps fw_html_tag with guards, returning a default when the framework, tag, or content is missing. |
| [`sc_icon_badge_preset_class`](#sc_icon_badge_preset_class) | Read + validate an element's saved Icon Badge Preset value into a safe `iconb-&#123;slug&#125;` class (or '' when unset / malformed). The shared reader for every element that consumes sc_icon_badge_preset_field(), so validation lives in one place. |
| [`sc_icon_badge_preset_field`](#sc_icon_badge_preset_field) | The shared "Icon Badge Preset" control — a `border-style-picker` of the saved Icon Badge presets (Theme Settings → Components → Icon Badges), each previewed inline. The saved value is an `iconb-&#123;slug&#125;` class the element stamps on its icon WRAPPER (so the preset's shaped tile — fill / border / corners / shadow — plus its icon colour, size and hover effects apply). The single source used by every icon-bearing shortcode (icon-box, icon, feature-list, steps, timeline, flip-box, image-box, special-heading, pricing-table) so the field is identical everywhere. |
| [`sc_icon_badge_preset_previews`](#sc_icon_badge_preset_previews) | Ready-to-use inline preview styles for each Icon Badge preset, keyed by its `iconb-&#123;slug&#125;` class: iconb-&#123;slug&#125; =&gt; array( 'tile_style' =&gt; '…', 'icon_style' =&gt; '…' ). Derived from each preset's DEFAULT state (shape + tile fill + border + icon colour, colours resolved against the Color Presets). Fed to the `border-style-picker` in badge mode so it draws a REAL mini tile per choice with inline styles — the preview is correct without depending on the generated front-end `.iconb-` CSS being present (and cached) in wp-admin. Preview tile SIZE is fixed by CSS (uniform rows), so the preset's own badge/icon size is intentionally not applied here. |
| [`sc_icon_custom_markup`](#sc_icon_custom_markup) | Render a free-form "Custom Icon (emoji / SVG)" value: inline SVG is sanitised, anything else (an emoji or short text) is HTML-escaped. |
| [`sc_icon_enqueue_lottie`](#sc_icon_enqueue_lottie) | Enqueue the bundled lottie-web player + the UnysonPlus hydrator, once. Called from sc_icon_render() only when a Lottie icon is actually output, so pages without animated icons never load the ~168 KB player. |
| [`sc_icon_enqueue_pack`](#sc_icon_enqueue_pack) | Enqueue only the icon pack CSS a single icon-v2 value needs. Safe to call repeatedly (WP dedupes by handle). No-op for uploads / none / unknown. |
| [`sc_icon_enqueue_rive`](#sc_icon_enqueue_rive) | Enqueue the bundled Rive canvas runtime (rive.js + rive.wasm) + the UnysonPlus hydrator, once. Called from sc_icon_render() only when a Rive icon is actually output, so pages without a Rive icon never load the heavy (~2 MB) WASM runtime. The hydrator pins the WASM URL to our bundled copy via the localized upwRiveWasm, so the runtime never reaches out to a CDN. |
| [`sc_icon_flatten_svg_css`](#sc_icon_flatten_svg_css) | Flatten an SVG's internal CSS into presentation attributes so the markup survives sanitisation intact. Adobe Illustrator exports style everything through a &lt;style&gt; block of `.stN&#123;...&#125;` classes (plus inline style="...") - wp_kses strips both, which used to turn AI exports black. This inlines: 1. every simple single-class rule (`.st0&#123;fill:#123&#125;`) onto the elements carrying that class, and 2. every inline style="prop:val" list, as plain attributes (fill="#123"), then drops the &lt;style&gt; block. Only a safe property allowlist is inlined - anything else is discarded. |
| [`sc_icon_join_classes`](#sc_icon_join_classes) | Join class fragments, dropping empties and collapsing internal gaps. |
| [`sc_icon_render`](#sc_icon_render) | Renders an icon value (font, SVG, emoji, or upload) into markup, the central single-source icon renderer. |
| [`sc_icon_sanitize_svg`](#sc_icon_sanitize_svg) | Sanitise inline SVG markup against the shared allowlist. Returns '' if not SVG. |
| [`sc_icon_svg_allowed`](#sc_icon_svg_allowed) | wp_kses allowlist for inline icon SVG (scripts / handlers / external refs stripped). |
| [`sc_icon_svg_library_fallback`](#sc_icon_svg_library_fallback) | Returns equivalent icon-pack SVG markup for an unavailable icon id, hopping brand glyphs across packs. |
| [`sc_icon_svg_library_markup`](#sc_icon_svg_library_markup) | Resolve a library SVG id ('&lt;pack&gt;/&lt;name&gt;', e.g. 'lucide/star', 'tabler/home') to its raw inline-&lt;svg&gt; markup via the multi-pack engine. Filterable so extra libraries can be provided. Returns '' if unknown. |
| [`sc_iconbox_render_icon_container`](#sc_iconbox_render_icon_container) | leading space (e.g. ` style="background-color:#000"`). The caller is responsible for escaping; we append it verbatim into the opening tag. |
| [`sc_iconbox_render_icon_markup`](#sc_iconbox_render_icon_markup) | Render the inner markup for the icon container. Priority: the picked icon (the unified picker now covers font / SVG / emoji / Lucide) wins when set; a legacy Custom Icon value is the fallback for content saved before the picker gained those kinds. The caller is responsible for the surrounding container (with aria-hidden). |
| [`sc_image_mask_choices`](#sc_image_mask_choices) | [ key =&gt; label ] for a select (or image-picker). Includes None + Custom. |
| [`sc_image_mask_imagepicker_choices`](#sc_image_mask_imagepicker_choices) | image-picker choices for the mask control — each shape as a thumbnail tile (the shared mask SVGs). Same shape as the Image Box mask picker, so both render an identical visual grid. |
| [`sc_image_mask_library`](#sc_image_mask_library) | Returns the shared, memoized image-mask library keyed by slug, matching the Image Box mask shapes. |
| [`sc_image_mask_svg_uri`](#sc_image_mask_svg_uri) | The picker-thumbnail SVG URI for a shape (shared Image Box asset dir). |
| [`sc_image_style_class`](#sc_image_style_class) | Read + validate a saved Image Style value into a safe `imgs-&#123;slug&#125;` class (or '' when unset / malformed). The shared reader for every element that consumes sc_image_style_field(), so validation lives in one place. The class goes on the image WRAPPER (the `.imgs-wrap` base rule consumes the preset's token vars). |
| [`sc_image_style_field`](#sc_image_style_field) | The shared "Image Style" preset picker any element with an image drops into its options (crop, corners, mask, filter, scrim). Consumes the Theme Settings → Components → Image Styles library. Saved value is a flat `imgs-&#123;slug&#125;` string. |
| [`sc_imgbox_family_to_key`](#sc_imgbox_family_to_key) | Map a family + its variation values to an existing flat design key. |
| [`sc_imgbox_icon_markup`](#sc_imgbox_icon_markup) | Renders an image-box icon, preferring the picked icon then a legacy custom emoji/SVG icon. |
| [`sc_imgbox_locate_part`](#sc_imgbox_locate_part) | Returns the file path to an image-box design part template for a sanitized part slug. |
| [`sc_imgbox_registry`](#sc_imgbox_registry) | Returns the memoized image-box design registry loaded from the parts registry file. |
| [`sc_imgbox_render`](#sc_imgbox_render) | Renders the image-box shortcode, resolving its design family and variations to a part template and content. |
| [`sc_imgbox_resolve_design`](#sc_imgbox_resolve_design) | Resolve an instance's atts to its flat design. |
| [`sc_imgbox_sanitize_clip`](#sc_imgbox_sanitize_clip) | Sanitizes an image-box custom clip-path value, rejecting url()/expression/js and disallowed characters. |
| [`sc_imgbox_sanitize_svg`](#sc_imgbox_sanitize_svg) | Sanitizes a custom mask SVG, keeping only the svg fragment and stripping scripts and event handlers. |
| [`sc_kses_svg`](#sc_kses_svg) | wp_kses_post PLUS a safe inline-SVG element set. Headings / rich text can legitimately carry a decorative inline `&lt;svg&gt;` (a hand-drawn underline squiggle, a highlight stroke); wp_kses_post strips it, so the graphic vanishes. Allow the SHAPE + PRESENTATION element/attribute set only — never `&lt;script&gt;` / `&lt;foreignObject&gt;` / `on*` handlers, so no script surface is introduced. wp_kses also LOWERCASES attribute names, but a handful of SVG attrs are case-SENSITIVE (`viewBox`, `preserveAspectRatio`, gradient units) and break when lowercased — restore them. |
| [`sc_lg_item`](#sc_lg_item) | Renders a single logo-grid item with its SVG/image mark, optional label, and optional link wrapper. |
| [`sc_lg_render`](#sc_lg_render) | Renders the logo-grid shortcode, resolving its design and emitting the grid of logo items. |
| [`sc_lottie_render`](#sc_lottie_render) | Renders the lottie shortcode, resolving the animation source from an uploaded file or URL. |
| [`sc_migrate_atts`](#sc_migrate_atts) | Migrates shortcode atts in place by running per-att callbacks according to each spec's condition. |
| [`sc_mp_icon`](#sc_mp_icon) | Renders a modal-popup picked icon via the central icon renderer, falling back to inline font/upload markup. |
| [`sc_mp_render`](#sc_mp_render) | Renders the modal-popup shortcode, resolving its design and the trigger button/image and modal content. |
| [`sc_needs_wrapper`](#sc_needs_wrapper) | Decide whether a shortcode view.php should render its wrapper element. Returns true if any of the wrapper-affecting atts are set. Filter `sc_needs_wrapper` lets future tabs opt in without per-shortcode edits. |
| [`sc_nl_render`](#sc_nl_render) | Renders the newsletter shortcode, resolving its design and the title, fields, button, and consent text. |
| [`sc_normalize_color_value`](#sc_normalize_color_value) | Normalizes a color option value into class/style parts, with the preset winning when both are set. |
| [`sc_notification_render_icon`](#sc_notification_render_icon) | Renders a notification icon, preferring the picked icon, then a legacy custom icon, then the per-type default. |
| [`sc_option_alignment`](#sc_option_alignment) | Returns an image-picker option group for choosing image alignment (none, float-left, and others). |
| [`sc_option_animate`](#sc_option_animate) | Animate Options |
| [`sc_option_bg_atts`](#sc_option_bg_atts) | Option attributes for background |
| [`sc_option_box`](#sc_option_box) | Margin & Padding Options |
| [`sc_option_box_border`](#sc_option_box_border) | Border Options |
| [`sc_option_box_border_radius`](#sc_option_box_border_radius) | Border Radius Options |
| [`sc_option_bs_margin`](#sc_option_bs_margin) | Margin & Padding Options |
| [`sc_option_bs_margin_choices`](#sc_option_bs_margin_choices) | Margin & Padding Options |
| [`sc_option_bs_spacing`](#sc_option_bs_spacing) | Margin & Padding Options |
| [`sc_option_bs_spacing_choices`](#sc_option_bs_spacing_choices) | Margin & Padding Options |
| [`sc_option_bs_spacing_size_choices`](#sc_option_bs_spacing_size_choices) | Margin & Padding Options |
| [`sc_option_button_color_defaults`](#sc_option_button_color_defaults) | Button color default values |
| [`sc_option_button_colors`](#sc_option_button_colors) | Color palette default values |
| [`sc_option_button_size_defaults`](#sc_option_button_size_defaults) | Button size default values |
| [`sc_option_button_sizes`](#sc_option_button_sizes) | Color palette default values |
| [`sc_option_class`](#sc_option_class) | Class |
| [`sc_option_color_palette`](#sc_option_color_palette) | Get predefined colors |
| [`sc_option_color_palette_defaults`](#sc_option_color_palette_defaults) | Color palette default values |
| [`sc_option_color_picker`](#sc_option_color_picker) | Color Picker |
| [`sc_option_color_select`](#sc_option_color_select) | Color Swatch Options |
| [`sc_option_css_tag`](#sc_option_css_tag) | CSS Tag |
| [`sc_option_custom_id`](#sc_option_custom_id) | Custom ID |
| [`sc_option_float`](#sc_option_float) | Link Options |
| [`sc_option_font_sizes`](#sc_option_font_sizes) | Color palette default values |
| [`sc_option_hover_2d`](#sc_option_hover_2d) | 2D Hover Option |
| [`sc_option_hover_background`](#sc_option_hover_background) | Background Hover Option |
| [`sc_option_hover_border`](#sc_option_hover_border) | Border Hover Option |
| [`sc_option_hover_curls`](#sc_option_hover_curls) | Curls Hover Option |
| [`sc_option_hover_shadow`](#sc_option_hover_shadow) | Shadow and Glow Hover Option |
| [`sc_option_hover_speech_bubbles`](#sc_option_hover_speech_bubbles) | Speech Bubbles Hover Option |
| [`sc_option_link`](#sc_option_link) | Link Options |
| [`sc_option_margin`](#sc_option_margin) | Margin & Padding Options |
| [`sc_option_spacing`](#sc_option_spacing) | Spacing Options |
| [`sc_option_text_alignment`](#sc_option_text_alignment) | Options for Text Alignment |
| [`sc_option_text_transform`](#sc_option_text_transform) | Text Transformation |
| [`sc_option_visibility`](#sc_option_visibility) | Visibility Options |
| [`sc_options_add_scss`](#sc_options_add_scss) | Get the ID |
| [`sc_options_get_id`](#sc_options_get_id) | Get the ID |
| [`sc_options_get_user_visibility`](#sc_options_get_user_visibility) | Get Visibility Options |
| [`sc_options_vertical_center_container`](#sc_options_vertical_center_container) | Get the image from options |
| [`sc_plugin_provides_settings_ui`](#sc_plugin_provides_settings_ui) | The plugin always provides the preset editor now — the Shortcodes extension Settings form (settings-options.php), stored theme-independently. So a Settings UI is always reachable regardless of the active theme. (Formerly defined in the now-removed shortcode-options/loader.php.) |
| [`sc_position_style`](#sc_position_style) | Build the inline CSS for the shared "Position" control (Advanced tab → element_position, a multi-picker). Emits position + offsets + z-index ONLY for a positioned value; offsets and z-index are omitted for static (they do nothing there). Offset values are whitelisted to safe CSS lengths (px/%/em/rem/vh/vw/vmin/vmax, auto, 0, negatives) so nothing arbitrary reaches style. |
| [`sc_posts_build_query_args`](#sc_posts_build_query_args) | Builds the WP_Query args for the posts shortcode from its atts and the current page number. |
| [`sc_posts_card_registry`](#sc_posts_card_registry) | Returns the memoized posts card-design registry loaded from the parts registry file. |
| [`sc_posts_dp`](#sc_posts_dp) | Reads a posts att by new nested path, falling back to the legacy flat key then a default. |
| [`sc_posts_gap_size`](#sc_posts_gap_size) | Resolves a posts gap value to a CSS size from a Gap Scale preset slug or a legacy px value. |
| [`sc_posts_get_ordered_slugs`](#sc_posts_get_ordered_slugs) | Returns the ordered, enabled card-block slugs (from the Card Rows designer, else element_order, else defaults), minus any excluded ones. |
| [`sc_posts_locate_part`](#sc_posts_locate_part) | Resolves a card template part by slug, preferring child theme then parent theme then the bundled view. |
| [`sc_posts_normalize_atts`](#sc_posts_normalize_atts) | Resolves picker-moved options (design/card/pagination/readmore groups) back to flat att keys and derives responsive column counts. |
| [`sc_posts_render`](#sc_posts_render) | Renders the full Posts shortcode markup from its atts (query, layout, cards, pagination, filters, slider). |
| [`sc_posts_render_block`](#sc_posts_render_block) | Renders a single card block by slug (image, cats, title, meta, excerpt, readmore). |
| [`sc_posts_render_body_rows`](#sc_posts_render_body_rows) | Renders a card's body blocks grouped into the designed Card Rows, excluding the image, with a flat-stack fallback. |
| [`sc_posts_render_card`](#sc_posts_render_card) | Renders one post card by including the template part mapped to the given card style. |
| [`sc_posts_render_cards`](#sc_posts_render_cards) | Renders the inner card markup for a list of posts, applying first-post, alternate, and featured treatments. |
| [`sc_posts_render_cats`](#sc_posts_render_cats) | Renders category/taxonomy chip links for a post, honoring the block toggle, taxonomy, and max-count options. |
| [`sc_posts_render_excerpt`](#sc_posts_render_excerpt) | Renders a post's excerpt from the chosen source, trimmed to the configured word length and suffix. |
| [`sc_posts_render_filter_bar`](#sc_posts_render_filter_bar) | Renders the AJAX category filter bar of buttons for the chosen taxonomy's terms. |
| [`sc_posts_render_image`](#sc_posts_render_image) | Renders a post's featured image (or fallback) as a permalink anchor with ratio, image-style preset, and optional category overlay. |
| [`sc_posts_render_meta`](#sc_posts_render_meta) | Renders a post's meta bar (date, author, comments, reading time) in the chosen layout and separator style. |
| [`sc_posts_render_pagination`](#sc_posts_render_pagination) | Renders numbered pagination links for the query within an aligned nav wrapper. |
| [`sc_posts_render_readmore`](#sc_posts_render_readmore) | Renders a post's read-more link in the chosen style with a visually-hidden title for accessible, crawlable link text. |
| [`sc_posts_render_title`](#sc_posts_render_title) | Renders a post's title as a permalink-linked heading using the configured tag. |
| [`sc_posts_slug_enabled`](#sc_posts_slug_enabled) | Is a card block explicitly enabled in the Elements → block list? Checks the raw `element_order` (independent of the self-heal in sc_posts_get_ordered_slugs) so a single block can be toggled off. Returns true when the list is empty (defaults = all on) or the slug is absent (forward-compatible with blocks added after a saved order). |
| [`sc_pt_icon`](#sc_pt_icon) | Renders a picked icon (via the central icon renderer, or icon-font/upload fallback) for the pricing table. |
| [`sc_pt_render`](#sc_pt_render) | Renders the Pricing Table shortcode from its atts, resolving the design skin, plans, columns, and featured emphasis. |
| [`sc_rating_star_paths`](#sc_rating_star_paths) | Symbol key =&gt; &#123; vb: viewBox, d: filled path &#125;. Filterable to add shapes. |
| [`sc_rating_stars`](#sc_rating_stars) | Render a two-tone rating (gray base row + filled row overlaid and clipped to the value, so fractional ratings show a partial last symbol). Self-contained: the symbol &lt;symbol&gt; sprite and the base CSS are printed once per request. |
| [`sc_rating_style_field`](#sc_rating_style_field) | Reusable "Rating style" options (Symbol + Filled/Empty color + Size) for any star-showing element. Returns an option-id =&gt; option-def array to merge into a group. Read the saved values back with sc_rating_style_from_atts(). |
| [`sc_rating_style_from_atts`](#sc_rating_style_from_atts) | Pull the sc_rating_style_field values from an element's atts → sc_rating_stars() args. |
| [`sc_remove_styling_options`](#sc_remove_styling_options) | Recursively drop the `tab_styling` tab and any preset-picker option (button-style-picker / border-style-picker / table-style-picker), and prune containers (tab/box/group) that become empty as a result. |
| [`sc_render_card`](#sc_render_card) | Renders a single testimonial card with the configured style, alignment, avatar, rating, and per-element color options. |
| [`sc_render_rating`](#sc_render_rating) | Renders a star rating for a value 0-5 via the shared rating engine, falling back to inline SVG stars. |
| [`sc_render_rating_set_style`](#sc_render_rating_set_style) | Stores and returns the request-scoped testimonial rating style so every design partial reuses it. |
| [`sc_sanitize_class`](#sc_sanitize_class) | Sanitize a string for safe use as a CSS class name. Allowed: a-z A-Z 0-9 _ -. Everything else is stripped. |
| [`sc_section_align_fields`](#sc_section_align_fields) | Returns the column horizontal/vertical align and reverse-columns option definitions, with SVG thumbnails, worded for the given host noun. |
| [`sc_section_background_effects`](#sc_section_background_effects) | Returns the filterable registry of custom Section-Background effects, cached per request. |
| [`sc_section_background_enqueue_runtime`](#sc_section_background_enqueue_runtime) | On-demand enqueue of the shared runtime — only when a section background actually rendered on this page (mirrors the Animation helper's wp_footer/priority-5 model). |
| [`sc_section_background_field`](#sc_section_background_field) | The reusable "Use as Section Background" switch. Drop it straight into an options array. Override label / desc / help / value via $args as needed. |
| [`sc_section_background_flag`](#sc_section_background_flag) | Returns whether any Section background fill was used on the current page. |
| [`sc_section_background_is_on`](#sc_section_background_is_on) | Tolerant truthiness for a switch value ('yes' / true / '1' / 1). |
| [`sc_section_background_render`](#sc_section_background_render) | Render a registered custom effect as a Section backdrop. Output it INSIDE a `&lt;section&gt;` (e.g. from a template, a Theme Builder block, or a custom shortcode's view) — the shared runtime lifts it to fill the Section, behind the content. |
| [`sc_section_background_use`](#sc_section_background_use) | Flag the current page as using the section-background feature, so the shared runtime (JS + CSS) is enqueued in wp_footer. Call once per element that renders with the toggle ON. |
| [`sc_section_background_used_effects`](#sc_section_background_used_effects) | The named custom effects that rendered on this page (keys passed to sc_section_background_use()). |
| [`sc_section_dynamic_css`](#sc_section_dynamic_css) | Builds per-page CSS for a section's custom min-height and container-width values (named presets use utility classes instead). |
| [`sc_smooth_scroll_enqueue`](#sc_smooth_scroll_enqueue) | Conditionally enqueue Lenis + the initializer when the current singular page has Smooth Scroll switched on. |
| [`sc_smooth_scroll_post_option`](#sc_smooth_scroll_post_option) | Per-page toggle in the post editor. Defaults to a side metabox on Pages and Posts; the post-type list is filterable. |
| [`sc_spacing_field`](#sc_spacing_field) | Build a single Bootstrap-spacing select field for the Styling tab. |
| [`sc_spacing_has_value`](#sc_spacing_has_value) | True iff a `spacing` att has at least one non-empty leaf — i.e. the user actually picked a margin or padding value. The full default value tree (every slot empty) is the same as "no value", so a naive `! empty()` on the att would falsely say "has value" and force the wrapper to render. |
| [`sc_sr_render`](#sc_sr_render) | Renders the Star Rating shortcode from its atts, resolving the design, max, rating value, label, and size. |
| [`sc_sr_symbol`](#sc_sr_symbol) | Returns the inline SVG symbol markup (star, heart, or circle) for the given rating design. |
| [`sc_ss_render`](#sc_ss_render) | Renders the Social Share shortcode from its atts, resolving the design, selected networks, and share URL/title. |
| [`sc_steps_icon`](#sc_steps_icon) | Renders a picked icon (via the central icon renderer, or icon-font/upload fallback) for a step. |
| [`sc_steps_render`](#sc_steps_render) | Renders the Steps shortcode from its atts, resolving the design and the list of steps. |
| [`sc_stt_render`](#sc_stt_render) | Renders the Scroll-to-Top shortcode (button and/or progress bar) from its position, shape, size, and color atts. |
| [`sc_styling_att_keys`](#sc_styling_att_keys) | Single source of truth for the att keys that the Styling tab produces. Used by sc_needs_wrapper() and sc_apply_styling_classes() so adding a new field only requires updating one place. |
| [`sc_styling_help_text`](#sc_styling_help_text) | Returns the localised `help` tooltip string for a Styling-tab preset picker. Switches between two wordings: - A (theme provides Settings UI) → "Add more in Shortcode Settings → …" - B (theme does not) → "Install the Unyson+ Theme to manage … visually." |
| [`sc_svg_attachment_metadata`](#sc_svg_attachment_metadata) | WordPress generates NO metadata for SVG attachments, which breaks the admin: the grid shows no thumbnail, Edit Media says "Image data does not exist", and image functions return no dimensions. Provide metadata from the SVG's own width/height/viewBox so SVGs behave like normal images. |
| [`sc_svg_check_filetype`](#sc_svg_check_filetype) | Filters WordPress filetype detection to accept .svg as image/svg+xml when SVG uploads are allowed. |
| [`sc_svg_file_dimensions`](#sc_svg_file_dimensions) | Read an SVG file's intrinsic dimensions: width/height attributes first, else the viewBox, else the SVG default 300x150. |
| [`sc_svg_image_downsize`](#sc_svg_image_downsize) | wp_get_attachment_image()/image_downsize(): serve the SVG itself at its intrinsic size. |
| [`sc_svg_mime_type_icon`](#sc_svg_mime_type_icon) | The Edit-Media screen (and any other surface that falls back to a mime icon) gates its real preview on wp_attachment_is_image(), whose extension whitelist excludes svg. Serve the SVG itself as its own "icon" so those surfaces preview the actual artwork instead of a generic document glyph. |
| [`sc_svg_prepare_attachment_js`](#sc_svg_prepare_attachment_js) | Media-modal / grid JS payload: give SVGs a usable preview + dimensions. |
| [`sc_svg_sanitize_upload`](#sc_svg_sanitize_upload) | Prefilters SVG uploads to enforce admin permission and sanitize the file, rejecting anything that fails. |
| [`sc_svg_upload_allowed`](#sc_svg_upload_allowed) | Returns whether the current context may upload SVGs (manage_options capability or the filter override). |
| [`sc_svg_upload_mimes`](#sc_svg_upload_mimes) | Adds the SVG MIME type to the allowed upload types when SVG uploads are permitted for the current context. |
| [`sc_testimonial_fields`](#sc_testimonial_fields) | Extracts a testimonial item's fields (content, author, job, site, rating, avatar) with safe defaults for the design templates. |
| [`sc_testimonial_quote_html`](#sc_testimonial_quote_html) | Sanitizes a testimonial quote to a safe inline subset (bold/italic/link/break) and converts newlines to &lt;br&gt;. |
| [`sc_text_block_dropcap_wrap`](#sc_text_block_dropcap_wrap) | Wraps the first N letters of the HTML in a drop-cap span, honoring leading tags and entities, with no JavaScript. |
| [`sc_theme_provides_settings_ui`](#sc_theme_provides_settings_ui) | True if the active theme (parent or directly active) ships the Unyson+-style Theme Settings UI (Color Presets / Typography / Spacing / Buttons tabs). Default: only `unysonplus-theme` matches. Third-party themes that re-implement those tabs should hook the `sc_theme_provides_settings_ui` filter and return true — they should also hook `sc_theme_settings_url` to point at their own URL. |
| [`sc_theme_settings_url`](#sc_theme_settings_url) | Returns a URL to the Theme Settings page, optionally scrolled to a tab. Used in field help-text links so users can jump from a shortcode picker directly to where they can ADD MORE presets. |
| [`sc_tl_icon`](#sc_tl_icon) | Renders a timeline item's picked icon via the central icon renderer, with a minimal font/upload fallback. |
| [`sc_tl_render`](#sc_tl_render) | Renders the tag-list shortcode, parsing one item per line (with optional "Label \| URL" links) into linked tags. |
| [`sc_tt_icon`](#sc_tt_icon) | Renders a tooltip trigger's picked icon via the central icon renderer, with a minimal font/upload fallback. |
| [`sc_tt_render`](#sc_tt_render) | Renders the tooltip shortcode, resolving the design and building the trigger and tip content markup. |
| [`sc_vp_parse`](#sc_vp_parse) | Resolve a video URL to [ type, src ] where type is youtube\|vimeo\|file. |
| [`sc_vp_render`](#sc_vp_render) | Renders the video-popup shortcode, resolving the design, poster image, and parsed video source. |
| [`unysonplus_components_color_choices`](#unysonplus_components_color_choices) | Compact-color-picker choices from the current Color Presets: slug =&gt; array( 'label' =&gt; Name, 'color' =&gt; #hex ) Wired into every preset's color fields; css-tokens.php resolves the saved slug back to a hex when emitting CSS. |
| [`unysonplus_components_settings_options`](#unysonplus_components_settings_options) | Builds the Components theme-settings options tree (color and gap defaults) for the settings page. |
| [`upw_sc_lib_ajax_manage`](#upw_sc_lib_ajax_manage) | AJAX handler to install, uninstall, or refresh shortcode-library items, returning the updated item/installed lists. |
| [`upw_sc_lib_bundled_catalog`](#upw_sc_lib_bundled_catalog) | Bundled fallback catalog shipped beside this installer, so the gallery works offline. |
| [`upw_sc_lib_catalog`](#upw_sc_lib_catalog) | The gallery catalog: remote fetch (12h transient) with the bundled catalog as fallback. Adds `_catalog_ok` = whether the remote (not just the fallback) was reachable. |
| [`upw_sc_lib_catalog_url`](#upw_sc_lib_catalog_url) | Remote catalog URL (filterable so a dev can point at a local copy for testing). |
| [`upw_sc_lib_install`](#upw_sc_lib_install) | Download + install ONE shortcode by slug: fetch its zip, verify sha256, extract into the theme's shortcodes customization tree (atomic). Returns true or WP_Error. |
| [`upw_sc_lib_install_dir`](#upw_sc_lib_install_dir) | Install target: the ACTIVE theme's shortcodes customization tree (loader auto-registers here). |
| [`upw_sc_lib_installed_slugs`](#upw_sc_lib_installed_slugs) | Slugs currently installed in the theme's shortcodes customization tree (folder + config.php). |
| [`upw_sc_lib_installer_payload`](#upw_sc_lib_installer_payload) | Data localized to the gallery JS. |
| [`upw_sc_lib_items`](#upw_sc_lib_items) | Merged gallery items, each tagged with state: installed \| available. |
| [`upw_sc_lib_normalize_catalog`](#upw_sc_lib_normalize_catalog) | Normalize a raw catalog into &#123; version, base_url, shortcodes:&#123; slug =&gt; &#123;...&#125; &#125; &#125;. |
| [`upw_sc_lib_resolve_url`](#upw_sc_lib_resolve_url) | Resolve a catalog-relative path (thumb / payload) against the catalog base_url. |
| [`upw_sc_lib_uninstall`](#upw_sc_lib_uninstall) | Remove ONE installed shortcode's folder (guarded to the install dir + a catalog slug). |

---

### `fw_carousel_color` {#fw_carousel_color}
*🔌 pluggable*

```php
fw_carousel_color( $value )
```

A preset/custom colour value → [ class, style-decls ] for text.

<small>Source: `framework/extensions/shortcodes/shortcodes/carousel/views/view.php:11`</small>

### `fw_countdown_color` {#fw_countdown_color}
*🔌 pluggable*

```php
fw_countdown_color( $value, $kind = 'text' )
```

A preset/custom colour value → [ class, style-decls ] for a given CSS property.

<small>Source: `framework/extensions/shortcodes/shortcodes/countdown/views/view.php:62`</small>

### `fw_countdown_enqueue_font` {#fw_countdown_enqueue_font}
*🔌 pluggable*

```php
fw_countdown_enqueue_font( $t )
```

Enqueue a typography-v2 value's Google font, if one was chosen.

<small>Source: `framework/extensions/shortcodes/shortcodes/countdown/views/view.php:45`</small>

### `fw_countdown_typography_css` {#fw_countdown_typography_css}
*🔌 pluggable*

```php
fw_countdown_typography_css( $t )
```

A typography-v2 value → inline CSS declarations (only the keys that are set).

<small>Source: `framework/extensions/shortcodes/shortcodes/countdown/views/view.php:11`</small>

### `fw_counter_default_font` {#fw_counter_default_font}
*🔌 pluggable*

```php
fw_counter_default_font( $font, $size, $line_height )
```

Repair an "unconfigured" per-part typography value.

When a counter is imported / generated with only a STUB font (e.g. `number_font`
saved as just `&#123; family: '' &#125;`), the page-builder's typography encoder fills the
missing keys from the option TYPE's generic default — a tiny 12px / weight-400 —
NOT from the counter's own intended size (the option's field default of 42/24 is
never consulted at encode time). That exact signature (family '', weight 400,
size 12px, line-height 15) is not something anyone picks for an animated stat
number, so treat it as "unset" and substitute the counter's real default size,
weight and line-height. A value the user actually customised (any other size, or a
bold weight) is left untouched.

<small>Source: `framework/extensions/shortcodes/shortcodes/counter/views/view.php:55`</small>

### `fw_counter_enqueue_font` {#fw_counter_enqueue_font}
*🔌 pluggable*

```php
fw_counter_enqueue_font( $t )
```

Enqueue a typography-v2 value's Google font, if one was chosen.

<small>Source: `framework/extensions/shortcodes/shortcodes/counter/views/view.php:80`</small>

### `fw_counter_part` {#fw_counter_part}
*🔌 pluggable*

```php
fw_counter_part( $tag, $inner, $font, $color )
```

Render one counter part (prefix / num / suffix) as a &lt;span&gt; carrying its typography (inline style) + colour (preset class or custom inline style).

<small>Source: `framework/extensions/shortcodes/shortcodes/counter/views/view.php:100`</small>

### `fw_counter_typography_css` {#fw_counter_typography_css}
*🔌 pluggable*

```php
fw_counter_typography_css( $t )
```

A typography-v2 value → inline CSS declarations (only the keys that are set).

<small>Source: `framework/extensions/shortcodes/shortcodes/counter/views/view.php:11`</small>

### `fw_design_lib__decode_thumb` {#fw_design_lib__decode_thumb}
*🔌 pluggable*

```php
fw_design_lib__decode_thumb( $data_uri, $dir )
```

Decode a `data:image/&lt;type&gt;;base64,…` thumbnail into $dir. Raster types only (webp/png/jpg/gif) — no SVG (defence in depth). Returns the written filename (e.g. 'thumb.webp') or '' when absent/invalid.

<small>Source: `framework/extensions/shortcodes/includes/design-presets/design-library.php:109`</small>

### `fw_design_lib__fetch_json` {#fw_design_lib__fetch_json}
*🔌 pluggable*

```php
fw_design_lib__fetch_json( $url )
```

GET a URL and json_decode it. Returns array|WP_Error.

<small>Source: `framework/extensions/shortcodes/includes/design-presets/design-library.php:144`</small>

### `fw_design_lib__rrmdir` {#fw_design_lib__rrmdir}
*🔌 pluggable*

```php
fw_design_lib__rrmdir( $dir )
```

Recursively delete a directory (temp + uninstall).

<small>Source: `framework/extensions/shortcodes/includes/design-presets/design-library.php:94`</small>

### `fw_design_lib__slugify` {#fw_design_lib__slugify}
*🔌 pluggable*

```php
fw_design_lib__slugify( $name )
```

name → url-safe slug (lowercase, non-alnum → '-').

<small>Source: `framework/extensions/shortcodes/includes/design-presets/design-library.php:76`</small>

### `fw_design_lib__unique_slug` {#fw_design_lib__unique_slug}
*🔌 pluggable*

```php
fw_design_lib__unique_slug( $shortcode, $slug )
```

Ensure the slug is free under &lt;root&gt;/&lt;shortcode&gt;/; append -2, -3… on clash.

<small>Source: `framework/extensions/shortcodes/includes/design-presets/design-library.php:84`</small>

### `fw_design_lib_catalog` {#fw_design_lib_catalog}
*🔌 pluggable*

```php
fw_design_lib_catalog( $force = false )
```

Remote catalog, transient-cached (12h ok / 5min fail). Normalized to &#123; version, base_url, designs:&#123; "&lt;shortcode&gt;/&lt;slug&gt;" =&gt; &#123;shortcode,slug,name,category,thumb,description&#125; &#125; &#125;.

<small>Source: `framework/extensions/shortcodes/includes/design-presets/design-library.php:347`</small>

### `fw_design_lib_catalog_url` {#fw_design_lib_catalog_url}
*🔌 pluggable*

```php
fw_design_lib_catalog_url()
```

Returns the filterable remote URL of the design library's catalog.json in UnysonPlus-Library.

<small>Source: `framework/extensions/shortcodes/includes/design-presets/design-library.php:333`</small>

### `fw_design_lib_dir` {#fw_design_lib_dir}
*🔌 pluggable*

```php
fw_design_lib_dir( $shortcode )
```

Absolute uploads path of a shortcode's designs folder: unysonplus/designs/&lt;shortcode&gt;.

NOTE: designs live under the dedicated `designs/` root, NOT under `shortcodes/`.
The shortcodes install root (uploads/unysonplus/shortcodes/) is scanned one level
deep by the shortcode loader, so per-shortcode design containers nested there were
mis-detected as bogus config-less "shortcodes" ([undefined] cards). A separate
`designs/` root avoids that collision entirely.

<small>Source: `framework/extensions/shortcodes/includes/design-presets/design-library.php:41`</small>

### `fw_design_lib_enabled` {#fw_design_lib_enabled}
*🔌 pluggable*

```php
fw_design_lib_enabled()
```

Shortcodes allowed to carry designs (mirrors the modal enabled-list).

<small>Source: `framework/extensions/shortcodes/includes/design-presets/design-library.php:61`</small>

### `fw_design_lib_install` {#fw_design_lib_install}
*🔌 pluggable*

```php
fw_design_lib_install( $shortcode, $slug )
```

Download + install one catalog design ( &lt;base&gt;/&lt;shortcode&gt;/&lt;slug&gt;/design.json ).

**Returns** `array\|WP_Error` &#123; shortcode, slug &#125;

<small>Source: `framework/extensions/shortcodes/includes/design-presets/design-library.php:392`</small>

### `fw_design_lib_install_from_json` {#fw_design_lib_install_from_json}
*🔌 pluggable*

```php
fw_design_lib_install_from_json( $json )
```

Import a user-supplied design JSON (string or decoded array) into the catalog.

| Parameter | Type | Description |
| --- | --- | --- |
| `$json` | `string\|array` | — |

**Returns** `array\|WP_Error` &#123; shortcode, slug &#125;

<small>Source: `framework/extensions/shortcodes/includes/design-presets/design-library.php:229`</small>

### `fw_design_lib_installed_items` {#fw_design_lib_installed_items}
*🔌 pluggable*

```php
fw_design_lib_installed_items( $shortcode = null )
```

Flat list of installed designs (optionally for one shortcode), each: &#123; id, shortcode, name, thumb(url), source, atts &#125; `atts` is loaded from design.json so the builder can apply offline.

| Parameter | Type | Description |
| --- | --- | --- |
| `$shortcode` | `string\|null` | Filter to one shortcode, or null for all. |

**Returns** `array`

<small>Source: `framework/extensions/shortcodes/includes/design-presets/design-library.php:251`</small>

### `fw_design_lib_store_envelope` {#fw_design_lib_store_envelope}
*🔌 pluggable*

```php
fw_design_lib_store_envelope( $env, $source = 'upload' )
```

Persist a validated envelope into the catalog. Atomic (temp dir → rename). Decodes the data-URI thumb to a file and strips it from the stored design.json.

| Parameter | Type | Description |
| --- | --- | --- |
| `$env` | `array` | Design envelope (already validated). |
| `$source` | `string` | 'upload' \| 'library' (provenance in meta). |

**Returns** `array\|WP_Error` &#123; shortcode, slug &#125; on success.

<small>Source: `framework/extensions/shortcodes/includes/design-presets/design-library.php:169`</small>

### `fw_design_lib_uninstall` {#fw_design_lib_uninstall}
*🔌 pluggable*

```php
fw_design_lib_uninstall( $shortcode, $slug )
```

Remove an installed design. @return true|WP_Error

<small>Source: `framework/extensions/shortcodes/includes/design-presets/design-library.php:283`</small>

### `fw_design_lib_update_meta` {#fw_design_lib_update_meta}
*🔌 pluggable*

```php
fw_design_lib_update_meta( $shortcode, $slug, $fields )
```

Edit an installed design's name and/or scoped CSS (atts.custom_css). Values-only; used by the Theme Settings manager. @return true|WP_Error

<small>Source: `framework/extensions/shortcodes/includes/design-presets/design-library.php:300`</small>

### `fw_design_lib_url` {#fw_design_lib_url}
*🔌 pluggable*

```php
fw_design_lib_url( $shortcode )
```

Public URL of a shortcode's designs folder (for thumbnails).

<small>Source: `framework/extensions/shortcodes/includes/design-presets/design-library.php:51`</small>

### `fw_design_lib_validate_envelope` {#fw_design_lib_validate_envelope}
*🔌 pluggable*

```php
fw_design_lib_validate_envelope( $env )
```

Validate a design envelope: correct marker, an enabled shortcode, a name, and an atts object. Values-only — no markup/JS is ever accepted here.

**Returns** `true\|WP_Error`

<small>Source: `framework/extensions/shortcodes/includes/design-presets/design-library.php:127`</small>

### `fw_ext_shortcodes_decode_attr` {#fw_ext_shortcodes_decode_attr}

```php
fw_ext_shortcodes_decode_attr(array $attributes, $shortcode_tag, $post_id)
```

Decodes a shortcode's encoded attributes using the first matching registered attribute coder.

<small>Source: `framework/extensions/shortcodes/helpers.php:13`</small>

### `fw_ext_shortcodes_enqueue_shortcodes_admin_scripts` {#fw_ext_shortcodes_enqueue_shortcodes_admin_scripts}
*since 1.3.18*

```php
fw_ext_shortcodes_enqueue_shortcodes_admin_scripts()
```

Enqueue admin scripts for each shortcode

<small>Source: `framework/extensions/shortcodes/helpers.php:46`</small>

### `fw_ext_shortcodes_enqueue_shortcodes_static` {#fw_ext_shortcodes_enqueue_shortcodes_static}
*since 1.3.17*

```php
fw_ext_shortcodes_enqueue_shortcodes_static($content)
```

Parse string, extract shortcodes and enqueue their static files

| Parameter | Type | Description |
| --- | --- | --- |
| `$content` | `string` | 'Hello [shortcode1 attr1="..."] World' |

<small>Source: `framework/extensions/shortcodes/helpers.php:33`</small>

### `fw_flexbox_alias_for_depth` {#fw_flexbox_alias_for_depth}
*since 2.10.x*

```php
fw_flexbox_alias_for_depth( $depth )
```

Pick the inner-flexbox alias for a given nesting depth (depth 1 = first flexbox nested inside another flexbox). Cycles through fw_flexbox_inner_alias_pool().

| Parameter | Type | Description |
| --- | --- | --- |
| `$depth` | `int` | 1-based nesting depth (0 = top-level, never aliased). |

**Returns** `string`

<small>Source: `framework/extensions/shortcodes/helpers.php:105`</small>

### `fw_flexbox_inner_alias_pool` {#fw_flexbox_inner_alias_pool}
*since 2.10.x*

```php
fw_flexbox_inner_alias_pool()
```

Returns the pool of distinct shortcode-tag aliases used for nested flexbox containers.

Pool of distinct shortcode-tag aliases for NESTED flexbox containers.

WordPress' shortcode parser is non-recursive PER TAG: a [flexbox] inside a
[flexbox] (or the same alias inside itself) mis-pairs — the outer open binds
to the first inner close — self-closing the inner box and leaking the trailing
close tag as literal text. A single alias only fixes ONE nested level; deeper
trees re-collide. Cycling through this pool by nesting depth guarantees no
ancestor chain ever repeats a tag (good for trees up to count(pool)+1 levels;
the cycle then repeats, but only between NON-adjacent, non-self-nesting levels,
which the parser tolerates). All aliases render through the one flexbox
instance (FW_Shortcode::render keys off $this, not the passed $tag).

**Returns** `string[]`

<small>Source: `framework/extensions/shortcodes/helpers.php:86`</small>

### `fw_progress_color` {#fw_progress_color}
*🔌 pluggable*

```php
fw_progress_color( $value, $kind = 'bg' )
```

A preset/custom colour value → [ class, style-decls ] for a CSS property ('text' or 'bg').

<small>Source: `framework/extensions/shortcodes/shortcodes/progress/views/view.php:11`</small>

### `fw_progress_icon_html` {#fw_progress_icon_html}
*🔌 pluggable*

```php
fw_progress_icon_html( $icon )
```

Render an icon-v2 value to an &lt;i&gt;/&lt;img&gt;, enqueuing the icon CSS once.

<small>Source: `framework/extensions/shortcodes/shortcodes/progress/views/view.php:55`</small>

### `fw_progress_raw_color` {#fw_progress_raw_color}
*🔌 pluggable*

```php
fw_progress_raw_color( $value )
```

Resolve a compact/legacy colour value to a RAW css colour string (e.g. "#2563eb"). Needed for SVG strokes & gradients where a preset CSS class can't be used. Presets are mapped back to their hex via the live palette, so circular / gauge styles support presets too.

<small>Source: `framework/extensions/shortcodes/shortcodes/progress/views/view.php:29`</small>

### `fw_sc_accordion_format_number` {#fw_sc_accordion_format_number}
*🔌 pluggable*

```php
fw_sc_accordion_format_number( $style, $template, $index, $start )
```

Render the numbering label for one accordion item.

| Parameter | Type | Description |
| --- | --- | --- |
| `$style` | `string` | Numbering style key from options. |
| `$template` | `string` | Custom template string (only used when $style is 'custom'). |
| `$index` | `int` | Zero-based item index. |
| `$start` | `int` | The number assigned to the first item (default 1). |

**Returns** `string` Empty string when $style is 'none'.

<small>Source: `framework/extensions/shortcodes/shortcodes/accordion/views/view.php:102`</small>

### `fw_sc_accordion_int_to_alpha` {#fw_sc_accordion_int_to_alpha}
*🔌 pluggable*

```php
fw_sc_accordion_int_to_alpha( $n, $upper = false )
```

Excel-style alpha index: 1=a/A, 26=z/Z, 27=aa/AA, 28=ab/AB, ... Clamps n&lt;1 to 1 so non-positive inputs still produce a letter.

<small>Source: `framework/extensions/shortcodes/shortcodes/accordion/views/view.php:57`</small>

### `fw_sc_accordion_int_to_roman` {#fw_sc_accordion_int_to_roman}
*🔌 pluggable*

```php
fw_sc_accordion_int_to_roman( $n )
```

Returns the Roman numeral form of a positive integer. Clamps n&lt;1 to 1.

<small>Source: `framework/extensions/shortcodes/shortcodes/accordion/views/view.php:73`</small>

### `fw_sc_design_capable_tags` {#fw_sc_design_capable_tags}
*🔌 pluggable*

```php
fw_sc_design_capable_tags()
```

Discovered shortcodes that have designs to manage — a built-in views/designs/registry.php OR one or more installed design packs.

**Returns** `array` tag =&gt; title (sorted by title).

<small>Source: `framework/extensions/shortcodes/includes/pluggable-designs.php:310`</small>

### `fw_sc_design_enqueue` {#fw_sc_design_enqueue}
*🔌 pluggable*

```php
fw_sc_design_enqueue( $tag, $key )
```

Enqueue a design's CSS/JS (origin-agnostic), with the shortcode's base handle as a dependency + any declared vendor deps (e.g. 'splide'). Safe to call for built-in designs too. Call from the `fw_ext_shortcodes_enqueue_static:&lt;tag&gt;` handler after resolving the active design.

<small>Source: `framework/extensions/shortcodes/includes/pluggable-designs.php:236`</small>

### `fw_sc_design_pack_count` {#fw_sc_design_pack_count}
*🔌 pluggable*

```php
fw_sc_design_pack_count( $tag )
```

Number of INSTALLED design packs (origin=uploads) for a shortcode.

<small>Source: `framework/extensions/shortcodes/includes/pluggable-designs.php:294`</small>

### `fw_sc_design_pack_enabled` {#fw_sc_design_pack_enabled}
*🔌 pluggable*

```php
fw_sc_design_pack_enabled( $tag, $key )
```

Whether an installed design pack is enabled. Default true; a disabled map is stored per shortcode (mirrors icon-v3's per-pack toggle). Filterable.

<small>Source: `framework/extensions/shortcodes/includes/pluggable-designs.php:171`</small>

### `fw_sc_design_pack_option_fragments` {#fw_sc_design_pack_option_fragments}
*🔌 pluggable*

```php
fw_sc_design_pack_option_fragments( $tag )
```

Collect installed design PACKS' option fragments for a shortcode: key =&gt; options-array (the pack's options.php returns $options). The host shortcode merges these into its `design_settings` multi-picker `choices[&lt;key&gt;]` so a pack's controls appear (design-scoped) when selected.

<small>Source: `framework/extensions/shortcodes/includes/pluggable-designs.php:262`</small>

### `fw_sc_design_partial` {#fw_sc_design_partial}
*🔌 pluggable*

```php
fw_sc_design_partial( $tag, $key )
```

Absolute path of the design's render partial (built-in or pack), or '' if the key is unknown / has no partial. Callers keep their own file_exists guard.

<small>Source: `framework/extensions/shortcodes/includes/pluggable-designs.php:220`</small>

### `fw_sc_design_picker_choices` {#fw_sc_design_picker_choices}
*🔌 pluggable*

```php
fw_sc_design_picker_choices( $tag )
```

image-picker `choices` for a shortcode's Design option (built-in + packs). Each: key =&gt; [ 'small' =&gt; ['src'=&gt;thumb, 'alt'=&gt;label, 'height'=&gt;60], 'label'=&gt;label ].

<small>Source: `framework/extensions/shortcodes/includes/pluggable-designs.php:202`</small>

### `fw_sc_design_resolve` {#fw_sc_design_resolve}
*🔌 pluggable*

```php
fw_sc_design_resolve( $tag, $atts, $default = 'default' )
```

Resolve the selected design key from an element's atts, whitelisted to the merged registry, falling back to 'default'. Mirrors the testimonials view: new multi-picker path `design_settings/design` → legacy scalar `design` → 'default'.

<small>Source: `framework/extensions/shortcodes/includes/pluggable-designs.php:186`</small>

### `fw_sc_design_set_enabled` {#fw_sc_design_set_enabled}
*🔌 pluggable*

```php
fw_sc_design_set_enabled( $tag, $key, $enabled )
```

Enable/disable a design (built-in or pack) for a shortcode by updating the shared `fw_sc_design_packs_disabled` option map (tag =&gt; [disabled keys]). 'default' can never be disabled. Returns true on success.

<small>Source: `framework/extensions/shortcodes/includes/pluggable-designs.php:340`</small>

### `fw_sc_designs` {#fw_sc_designs}
*🔌 pluggable*

```php
fw_sc_designs( $tag, $include_disabled = false )
```

The merged design registry for a shortcode: built-in + installed packs.

disabled (each carries an `enabled` flag) — used by the manager
              UI. Default false hides disabled designs (picker/dispatch/enqueue).
              version, author, thumb_uri, css_uri, js_uri, partial(path),
              options(path|null), vendor_deps[], base_uri, base_path &#125;.

| Parameter | Type | Description |
| --- | --- | --- |
| `$tag` | `string` | shortcode tag (e.g. 'testimonials'). |
| `$include_disabled` | `bool` | When true, also return designs an admin has |

**Returns** `array` key =&gt; meta&#123; key, label, origin, enabled, deletable, lockable,

<small>Source: `framework/extensions/shortcodes/includes/pluggable-designs.php:40`</small>

### `fw_sc_designs_manage` {#fw_sc_designs_manage}
*🔌 pluggable*

```php
fw_sc_designs_manage( $tag )
```

Every design for a shortcode INCLUDING disabled ones (each with an `enabled` flag), for the management UI. Thin wrapper over fw_sc_designs( $tag, true ).

<small>Source: `framework/extensions/shortcodes/includes/pluggable-designs.php:287`</small>

### `fw_text_expander_add_class` {#fw_text_expander_add_class}
*🔌 pluggable*

```php
fw_text_expander_add_class( $tok, $extra )
```

Append CSS classes to a paragraph token's opening tag. If the token already has a `class="..."` attribute, merge into it; otherwise add a fresh class attribute. Used by the per-element color picks to color visible / hidden paragraphs independently.

<small>Source: `framework/extensions/shortcodes/shortcodes/text-expander/views/view.php:89`</small>

### `fw_text_expander_append_html_simple` {#fw_text_expander_append_html_simple}
*🔌 pluggable*

```php
fw_text_expander_append_html_simple( $tok, $html )
```

Append HTML to a paragraph token's inner (immutable return). Used to inject buttons / bridge spans into specific paragraphs.

<small>Source: `framework/extensions/shortcodes/shortcodes/text-expander/views/view.php:120`</small>

### `fw_text_expander_inline_text` {#fw_text_expander_inline_text}
*🔌 pluggable*

```php
fw_text_expander_inline_text( $html )
```

Reduce HTML to a clean inline string by stripping every &lt;p&gt; wrapper. Used only for the native &lt;details&gt; summary.

<small>Source: `framework/extensions/shortcodes/shortcodes/text-expander/views/view.php:131`</small>

### `fw_text_expander_mark_hidden` {#fw_text_expander_mark_hidden}
*🔌 pluggable*

```php
fw_text_expander_mark_hidden( $tok )
```

Inject `data-expander-hidden="true"` into a paragraph token's opening tag, preserving every attribute that was already there.

<small>Source: `framework/extensions/shortcodes/shortcodes/text-expander/views/view.php:71`</small>

### `fw_text_expander_parse_paragraphs` {#fw_text_expander_parse_paragraphs}
*🔌 pluggable*

```php
fw_text_expander_parse_paragraphs( $html )
```

Tokenise an HTML string into an ordered list of paragraph tokens. Each token preserves the original opening &lt;p&gt; tag (with all its attributes), inner HTML, and closing tag separately so we can mutate each independently without losing author-supplied classes/ids.

Plain-text input (no &lt;p&gt; at all) becomes a single implicit paragraph
so the flat-DOM model still applies.

<small>Source: `framework/extensions/shortcodes/shortcodes/text-expander/views/view.php:43`</small>

### `sc_ab_render` {#sc_ab_render}
*🔌 pluggable*

```php
sc_ab_render( $atts )
```

Renders the author-box shortcode markup for the resolved design and source.

<small>Source: `framework/extensions/shortcodes/shortcodes/author-box/views/view.php:19`</small>

### `sc_accordion_style_choice` {#sc_accordion_style_choice}
*🔌 pluggable*

```php
sc_accordion_style_choice( $type, $label )
```

One image-picker choice (small + large thumbnail + label) for a Style preset.

<small>Source: `framework/extensions/shortcodes/shortcodes/accordion/options.php:54`</small>

### `sc_accordion_style_thumb` {#sc_accordion_style_thumb}
*🔌 pluggable*

```php
sc_accordion_style_thumb( $type )
```

A schematic SVG thumbnail (data URI) for one accordion Style preset — a tiny line diagram of how the style looks, for the image-picker tiles. Kept flat/neutral (slate lines, one indigo accent) so it reads in both light and dark admin skins.

<small>Source: `framework/extensions/shortcodes/shortcodes/accordion/options.php:12`</small>

### `sc_ah_render` {#sc_ah_render}
*🔌 pluggable*

```php
sc_ah_render( $atts )
```

Renders the animated-heading shortcode with the resolved animation and word list.

<small>Source: `framework/extensions/shortcodes/shortcodes/animated-heading/views/view.php:19`</small>

### `sc_alignment_class` {#sc_alignment_class}
*🔌 pluggable*

```php
sc_alignment_class( $value )
```

Map a stored alignment value to its Bootstrap text-* utility class. `''` (inherit / unset) returns `''` so the caller can fall back to a master value. Unknown values also return `''`.

| Parameter | Type | Description |
| --- | --- | --- |
| `$value` | `string` | left \| center \| right \| '' |

**Returns** `string` text-start \| text-center \| text-end \| ''

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:822`</small>

### `sc_alignment_field` {#sc_alignment_field}
*🔌 pluggable*

```php
sc_alignment_field( $args = array() )
```

Build a horizontal-alignment image-picker field (Left / Center / Right), reusable across shortcodes. The swatches are the shared SVGs under `static/img/alignment/`; the stored value is `left` / `center` / `right` (or `''` when `inherit` is on — meaning "follow the parent/master").

'alignment'   =&gt; sc_alignment_field( array( 'label' =&gt; __( 'Alignment', 'fw' ) ) ),
  'title_align' =&gt; sc_alignment_field( array( 'label' =&gt; __( 'Title Alignment', 'fw' ), 'inherit' =&gt; true ) ),

Map the value to a CSS utility with sc_alignment_class() so callers don't
duplicate the left→text-start / center→text-center / right→text-end mapping.

                   true, prepend an "Inherit" choice and default to '').

| Parameter | Type | Description |
| --- | --- | --- |
| `$args` | `array` | label, value (default 'left'), desc, inherit (bool — when |

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:771`</small>

### `sc_anim_collection_items` {#sc_anim_collection_items}
*🔌 pluggable*

```php
sc_anim_collection_items()
```

Per-collection item selector registry — "what are this element's cards?", keyed by the element's `base_class` (each collection sets one before calling sc_build_wrapper_attr). Drives the per-child ENTRANCE STAGGER below (and the Card Stack skip-guard: these grid collections aren't valid Card-Stack targets). Any multi-item element with a single stable item selector belongs here.

NB this is the BROAD registry. Per-card HOVER uses the narrower sc_hover_collection_items()
(only elements whose VIEW is wired to stamp hover per item) — adding an element here does
NOT change its hover behavior.

**Returns** `array&lt;string,string&gt;` base_class =&gt; descendant CSS selector for its items.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-animation-helper.php:681`</small>

### `sc_animation_flag` {#sc_animation_flag}
*🔌 pluggable*

```php
sc_animation_flag( $set = false )
```

Marks/queries a per-request flag that says "at least one animated shortcode has rendered on this page". Used to gate the wp_footer enqueue.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-animation-helper.php:528`</small>

### `sc_animation_use` {#sc_animation_use}
*🔌 pluggable*

```php
sc_animation_use( $effect = null )
```

On-demand asset registry for entrance animations — records which Animate.css effect classes actually rendered this request, so wp_footer enqueues ONLY those effects' CSS partials (+ the shared base) instead of the whole 72 KB bundle. Pass an 'animate__&lt;name&gt;' class to record it; call with no arg to read the set.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-animation-helper.php:542`</small>

### `sc_announce_color` {#sc_announce_color}
*🔌 pluggable*

```php
sc_announce_color( $val )
```

Resolve a compact color-field value to a CSS color string: a Color Preset slug → var(--color-slug), or a custom hex / rgb(a). Returns '' when unset.

<small>Source: `framework/extensions/shortcodes/shortcodes/badge/views/view.php:10`</small>

### `sc_announce_render` {#sc_announce_render}
*🔌 pluggable*

```php
sc_announce_render( $atts )
```

Renders the announcement/badge shortcode from its tag text and message atts.

<small>Source: `framework/extensions/shortcodes/shortcodes/badge/views/view.php:26`</small>

### `sc_ap_render` {#sc_ap_render}
*🔌 pluggable*

```php
sc_ap_render( $atts )
```

Renders the audio-player shortcode for the resolved design and track list.

<small>Source: `framework/extensions/shortcodes/shortcodes/audio-player/views/view.php:19`</small>

### `sc_apply_styling_classes` {#sc_apply_styling_classes}
*🔌 pluggable*

```php
sc_apply_styling_classes( $attr, $atts )
```

Append Styling-tab picks to a wrapper's class list.

Reads two shapes for back-compat:
 - Legacy flat keys (margin, margin_top, padding_bottom, …) — produced by
   pre-spacing-composite saves and by the still-supported sc_spacing_field()
   helper (used by section.padding_top/bottom and accordion.item_spacing).
 - The new nested `spacing` att — produced by the composite spacing option
   type each shortcode now declares inline in its Styling tab.

Both flow through the same sc_sanitize_class() filter and end up in the
same flat class list. Existing posts saved before the composite migration
keep rendering correctly.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:1927`</small>

### `sc_attr_to_html` {#sc_attr_to_html}
*🔌 pluggable*

```php
sc_attr_to_html(array $attr, $default = NULL)
```

Converts an attribute array to an HTML attribute string via fw_attr_to_html(), or returns the default.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-helpers.php:69`</small>

### `sc_avatar_auto_color` {#sc_avatar_auto_color}
*🔌 pluggable*

```php
sc_avatar_auto_color( $seed )
```

Returns a stable background/foreground color pair for a seed name via a crc32-indexed palette.

<small>Source: `framework/extensions/shortcodes/shortcodes/avatar/views/view.php:46`</small>

### `sc_avatar_css_color` {#sc_avatar_css_color}
*🔌 pluggable*

```php
sc_avatar_css_color( $raw )
```

Resolves a compact color-picker value (custom hex or preset slug) to a concrete CSS color string.

<small>Source: `framework/extensions/shortcodes/shortcodes/avatar/views/view.php:64`</small>

### `sc_avatar_face` {#sc_avatar_face}
*🔌 pluggable*

```php
sc_avatar_face( $person, $args )
```

Builds one avatar face element (image or initials, optional status dot and link).

<small>Source: `framework/extensions/shortcodes/shortcodes/avatar/views/view.php:88`</small>

### `sc_avatar_initials` {#sc_avatar_initials}
*🔌 pluggable*

```php
sc_avatar_initials( $name, $override = '' )
```

Derives 1-2 uppercase initials from a name, or from an explicit override.

<small>Source: `framework/extensions/shortcodes/shortcodes/avatar/views/view.php:26`</small>

### `sc_bac_color_var` {#sc_bac_color_var}
*🔌 pluggable*

```php
sc_bac_color_var( $raw, $name )
```

Read a compact-color att and, if a CUSTOM hex was picked, return a CSS var declaration "&lt;name&gt;:&lt;hex&gt;;". Preset (class) picks fall back to the stylesheet default (return ''). Mirrors image-box's accent/overlay vars.

<small>Source: `framework/extensions/shortcodes/shortcodes/before-after/views/view.php:78`</small>

### `sc_bac_image` {#sc_bac_image}
*🔌 pluggable*

```php
sc_bac_image( $raw )
```

Resolve an upload att to [ url, alt ] (full-size url, alt from the library).

<small>Source: `framework/extensions/shortcodes/shortcodes/before-after/views/view.php:53`</small>

### `sc_bac_registry` {#sc_bac_registry}
*🔌 pluggable*

```php
sc_bac_registry()
```

Returns the cached before-after design registry array.

<small>Source: `framework/extensions/shortcodes/shortcodes/before-after/views/view.php:37`</small>

### `sc_bac_render` {#sc_bac_render}
*🔌 pluggable*

```php
sc_bac_render( $atts )
```

Renders the before-after shortcode, dispatching to the comparison or spotlight type.

<small>Source: `framework/extensions/shortcodes/shortcodes/before-after/views/view.php:91`</small>

### `sc_bac_render_comparison` {#sc_bac_render_comparison}
*🔌 pluggable*

```php
sc_bac_render_comparison( $atts, $before, $after, $b_alt, $a_alt, $ratio, $rounded, $max_width, $as_bg = false )
```

Renders the before-after comparison (slider) variant markup for the given images and design.

<small>Source: `framework/extensions/shortcodes/shortcodes/before-after/views/view.php:132`</small>

### `sc_bac_render_spotlight` {#sc_bac_render_spotlight}
*🔌 pluggable*

```php
sc_bac_render_spotlight( $atts, $before, $after, $b_alt, $a_alt, $ratio, $rounded, $max_width, $as_bg = false )
```

Renders the before-after spotlight (reveal) variant markup for the given images and design.

<small>Source: `framework/extensions/shortcodes/shortcodes/before-after/views/view.php:257`</small>

### `sc_bg_pro_style` {#sc_bg_pro_style}
*🔌 pluggable*

```php
sc_bg_pro_style( $bgv )
```

Compile a `background-pro` value into an inline CSS style string.

Stacks the CSS-able layers exactly like the theme site-background and the
Section view: solid color, then `background-image: url(image), gradient`
(image over gradient), plus position / repeat / attachment (Fixed = parallax)
/ size when there's a raster image. The video layer is NOT emitted here —
use sc_bg_pro_video_attr() for that (it needs the Formstone data-attr + class).

Shared by the Section, Masonry Section and Bleed Section shortcodes.

| Parameter | Type | Description |
| --- | --- | --- |
| `$bgv` | `array` | A background-pro value (or null/array). |

**Returns** `string` Inline style declarations (may be '').

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:2510`</small>

### `sc_bg_pro_video_attr` {#sc_bg_pro_video_attr}
*🔌 pluggable*

```php
sc_bg_pro_video_attr( $bgv )
```

Compile a `background-pro` value's video layer into the Formstone `data-background-options` attribute (the existing section video player). Returns an empty array when video is disabled / has no source — the caller then knows not to add the `background-video` class.

| Parameter | Type | Description |
| --- | --- | --- |
| `$bgv` | `array` | A background-pro value. |

**Returns** `array` data-attr name =&gt; JSON string (or empty array).

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:2587`</small>

### `sc_bi_fmt` {#sc_bi_fmt}
*🔌 pluggable*

```php
sc_bi_fmt( $t, $fmt )
```

Format "HH:MM" per 12/24-hour.

<small>Source: `framework/extensions/shortcodes/shortcodes/business-info/views/view.php:30`</small>

### `sc_bi_mins` {#sc_bi_mins}
*🔌 pluggable*

```php
sc_bi_mins( $t )
```

"HH:MM" -&gt; minutes since midnight, or null if invalid.

<small>Source: `framework/extensions/shortcodes/shortcodes/business-info/views/view.php:19`</small>

### `sc_bi_render` {#sc_bi_render}
*🔌 pluggable*

```php
sc_bi_render( $atts )
```

Renders the business-info shortcode markup for the resolved design.

<small>Source: `framework/extensions/shortcodes/shortcodes/business-info/views/view.php:43`</small>

### `sc_bq_render` {#sc_bq_render}
*🔌 pluggable*

```php
sc_bq_render( $atts )
```

Renders the blockquote shortcode markup for the resolved design.

<small>Source: `framework/extensions/shortcodes/shortcodes/blockquote/views/view.php:19`</small>

### `sc_build_wrapper_attr` {#sc_build_wrapper_attr}

```php
sc_build_wrapper_attr( $atts )
```

Builds the outer wrapper attributes (base class, unique id, extra attrs) for a shortcode.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-build-helper.php:192`</small>

### `sc_button_kses_label` {#sc_button_kses_label}
*🔌 pluggable*

```php
sc_button_kses_label( $label )
```

Sanitize a button label that may contain an inline &lt;svg&gt; icon (or basic inline formatting) without flattening it to escaped source text.

Extends post-context kses with the SVG element + presentation attributes
needed for a typical pasted icon (Feather / Lucide / Heroicons style),
so the icon renders on the front end while scripts / event handlers /
disallowed tags are still stripped. A label with no markup is returned
effectively unchanged.

| Parameter | Type | Description |
| --- | --- | --- |
| `$label` | `string` | Raw label string from the option value. |

**Returns** `string` Sanitized HTML safe to echo.

<small>Source: `framework/extensions/shortcodes/shortcodes/button/views/view.php:23`</small>

### `sc_button_style_atts` {#sc_button_style_atts}
*🔌 pluggable*

```php
sc_button_style_atts( $atts )
```

Turn saved sc_button_style_field() values into button classes + inline width + alignment. Mirrors the [button] shortcode's class assembly so both look identical.

| Parameter | Type | Description |
| --- | --- | --- |
| `$atts` | `array` | Element atts (style / size / shape / width / alignment / hover_animation). |

**Returns** `array` &#123; classes: string[], style: string (inline, e.g. "width: 200px;"), align: '' \| left \| center \| right &#125;

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:3815`</small>

### `sc_button_style_field` {#sc_button_style_field}
*🔌 pluggable*

```php
sc_button_style_field( $args = array() )
```

The shared Button STYLE option group — Button Style preset, Size, Shape, Width, Alignment and Hover Animation — sourced from the same Theme Settings → Buttons presets as the [button] shortcode. Any element that renders a themed button (e.g. the WooCommerce Add to Cart element) can drop this into a Style tab and read the values back with sc_button_style_atts(), so the button look never drifts.

| Parameter | Type | Description |
| --- | --- | --- |
| `$args` | `array` | Optional overrides (currently unused; reserved). |

**Returns** `array` Option definitions keyed style / size / shape / width / alignment / hover_animation.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:3697`</small>

### `sc_cal_color` {#sc_cal_color}
*🔌 pluggable*

```php
sc_cal_color( $c )
```

Returns a validated calendar accent color, defaulting to 'blue' for unknown values.

<small>Source: `framework/extensions/shortcodes/shortcodes/calendar/views/view.php:32`</small>

### `sc_cal_events` {#sc_cal_events}
*🔌 pluggable*

```php
sc_cal_events( $atts )
```

Read + normalise events. Falls back to the legacy data_provider shape.

<small>Source: `framework/extensions/shortcodes/shortcodes/calendar/views/view.php:40`</small>

### `sc_cal_render` {#sc_cal_render}
*🔌 pluggable*

```php
sc_cal_render( $atts )
```

Renders the calendar shortcode markup for the resolved design.

<small>Source: `framework/extensions/shortcodes/shortcodes/calendar/views/view.php:141`</small>

### `sc_cal_render_grid` {#sc_cal_render_grid}
*🔌 pluggable*

```php
sc_cal_render_grid( $year, $month, $start_mon, $by_day, $today )
```

Render one month grid (server side). Mirrors the JS renderer in scripts.js.

<small>Source: `framework/extensions/shortcodes/shortcodes/calendar/views/view.php:89`</small>

### `sc_cal_to_ymd` {#sc_cal_to_ymd}
*🔌 pluggable*

```php
sc_cal_to_ymd( $v )
```

Normalise a date-picker / timestamp value to Y-m-d (or '' if unparseable).

<small>Source: `framework/extensions/shortcodes/shortcodes/calendar/views/view.php:19`</small>

### `sc_card_box_style_class` {#sc_card_box_style_class}
*🔌 pluggable*

```php
sc_card_box_style_class( $atts, $key = 'box_style' )
```

Read + validate a card element's saved Box Style value into a safe `boxp-&#123;slug&#125;` class (or '' when unset / malformed). The shared reader for every element that consumes sc_card_box_style_field(), so the validation lives in one place.

| Parameter | Type | Description |
| --- | --- | --- |
| `$atts` | `array` | the shortcode atts. |
| `$key` | `string` | the option id (default 'box_style'). |

**Returns** `string` a `boxp-&#123;slug&#125;` class, or '' .

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:1532`</small>

### `sc_card_box_style_field` {#sc_card_box_style_field}
*🔌 pluggable*

```php
sc_card_box_style_field( $args = array() )
```

The shared "Box Style" card control — a `border-style-picker` of the saved Box Presets (Theme Settings → Components → Box Presets), each previewed inline. The saved value is a `boxp-&#123;slug&#125;` class the card element stamps on its card wrapper (so the preset's border / radius / shadow / fill AND its new structured hover effects apply). Axis 1 of the unified card system — engine-independent.

| Parameter | Type | Description |
| --- | --- | --- |
| `$args` | `array` | label / desc / value overrides. |

**Returns** `array` option field.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:1504`</small>

### `sc_card_preview_mount_html` {#sc_card_preview_mount_html}
*🔌 pluggable*

```php
sc_card_preview_mount_html( $args = array() )
```

Markup for the live-preview mount (use as an `html-full` option's `html`).

| Parameter | Type | Description |
| --- | --- | --- |
| `$args` | `array` | heading, note, rows_name (the addable-popup option id, default card_rows). |

<small>Source: `framework/extensions/shortcodes/includes/card-preview/loader.php:21`</small>

### `sc_card_rows_field` {#sc_card_rows_field}
*🔌 pluggable*

```php
sc_card_rows_field( $args = array() )
```

The shared "Card Rows" slot designer — an addable, drag-sortable list of ROWS, each row a set of SLOTS with a flex direction (inline/stacked) + distribute (justify) + align. This is the ONE composable card model, used by wc_products and testimonials (and any element whose card is a stack of rows). Parameterise the SLOT choices + the seeded default per element; presence of a slot = "it's in a row" (a slot renders only when placed in a row and it has content).

| Parameter | Type | Description |
| --- | --- | --- |
| `$args` | `array` | 'label','desc','slots'=&gt;[slug=&gt;Label], 'value'=&gt;[ …seed rows… ] |

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:1548`</small>

### `sc_card_rows_render` {#sc_card_rows_render}
*🔌 pluggable*

```php
sc_card_rows_render( $rows, $slot_map, $prefix )
```

Assemble Card Rows → HTML. $slot_map = [ slug =&gt; html ]; empty slots (and empty rows) collapse. CSS classes: "&#123;prefix&#125;__row &#123;prefix&#125;-row--&#123;dir&#125; &#123;prefix&#125;-j-&#123;justify&#125; &#123;prefix&#125;-a-&#123;align&#125;".

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:1647`</small>

### `sc_card_rows_value` {#sc_card_rows_value}
*🔌 pluggable*

```php
sc_card_rows_value( $atts, $key = 'card_rows' )
```

Normalise a saved Card Rows value → a clean list of &#123; slots[], dir, justify, align &#125;. '' rows drop.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:1622`</small>

### `sc_code_block_beautify_html` {#sc_code_block_beautify_html}
*🔌 pluggable*

```php
sc_code_block_beautify_html( $html )
```

Normalize + re-indent arbitrary (possibly minified or messily-formatted) HTML into clean, tab-indented markup. &lt;pre&gt;/&lt;textarea&gt;/&lt;script&gt;/&lt;style&gt;/&lt;svg&gt; bodies are protected from reflow so their internal formatting is preserved verbatim.

<small>Source: `framework/extensions/shortcodes/shortcodes/code-block/views/view.php:110`</small>

### `sc_code_block_detect_language` {#sc_code_block_detect_language}
*🔌 pluggable*

```php
sc_code_block_detect_language( $code )
```

Cheap heuristic language sniffer for the "Auto-detect" choice. Good enough to pick the right Prism `language-*` class for the common cases (markup / php / css / js / json).

<small>Source: `framework/extensions/shortcodes/shortcodes/code-block/views/view.php:28`</small>

### `sc_code_block_indent_html` {#sc_code_block_indent_html}
*🔌 pluggable*

```php
sc_code_block_indent_html( $html )
```

Tab-indent a (normalized, single-line) HTML string with a simple element STACK. Structural containers (div, section, ul, table, tr, …) each own an indented line and indent their children; text-level "leaf" elements (p, li, h1–6, td, th, span, strong, …) sit on their own line at block context but keep their inline content + closing tag on the SAME line; any element nested inside a leaf renders fully inline. Each open frame is closed in the same mode it was opened, so inline/leaf nesting can't unbalance the indentation (the failure mode of tags that are both inline and leaf, e.g. &lt;span&gt;). &lt;svg&gt;/&lt;pre&gt;/… are protected upstream.

<small>Source: `framework/extensions/shortcodes/shortcodes/code-block/views/view.php:62`</small>

### `sc_color_field` {#sc_color_field}
*🔌 pluggable*

```php
sc_color_field( $args = array() )
```

Build a single color-picker select field for the Styling tab.

'subtitle_color' =&gt; sc_color_field( array(
      'label' =&gt; __( 'Subtitle Color', 'fw' ),
      'kind'  =&gt; 'text',   // 'text' or 'bg'
      'desc'  =&gt; __( '...', 'fw' ),
  ) ),

The rendered &lt;select&gt; gets class="sc-color-text" or class="sc-color-bg" so the
admin-CSS emitter can scope its option-coloring rules consistently regardless
of what field name the shortcode chose.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:501`</small>

### `sc_color_field_compact` {#sc_color_field_compact}
*🔌 pluggable*

```php
sc_color_field_compact( $args = array() )
```

Builds a compact preset+custom color-picker option field for a shortcode Styling tab.

Drop-in replacement for &#123;@see sc_color_field()&#125; that returns the
`predefined-colors-color-picker-compact` option type instead of a
plain &lt;select&gt;. Same call signature, same `kind` ('text' | 'bg')
semantics, same saved-class convention (`text-&#123;slug&#125;` / `bg-&#123;slug&#125;`).

Difference: shortcode editors get a compact preset dropdown PLUS an
inline custom color picker on the same row. Picking a preset stores
the class name in `predefined` (consumer emits `class="..."`);
picking a custom color stores the hex in `custom` (consumer emits
inline `style="color: …"` / `style="background: …"`). Both halves
are mutually exclusive — the picker keeps them in sync via the
existing predefined-colors-color-picker-compact JS.

Choices are built from the live plugin palette via
&#123;@see unysonplus_color_preset_slug_map()&#125; so the dropdown matches
whatever Theme Settings → General → Colors has configured.

Usage: shortcodes call this directly when composing their Styling-tab
`options` array — it's the standard builder for a preset+custom color
field. `sc_color_field()` (plain &lt;select&gt;, no custom picker) remains
available for fields that don't want the inline custom-color sidekick.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:552`</small>

### `sc_color_is_light` {#sc_color_is_light}
*🔌 pluggable*

```php
sc_color_is_light( $hex )
```

Returns true if a hex color is essentially white — luminance so high its text would be invisible against the admin dropdown's white surface. Used by the admin &lt;option&gt; stylers to pick a contrasting backdrop only for `#fff` and near-whites (e.g. Bootstrap's `Light` #f8f9fa). Yellow (#ffeb3b ≈ 0.87), Lime, Light Gray etc. stay bare so their actual hue is visible.

Threshold 0.95 chosen so White (1.0) and Light (0.976) trigger the
backdrop, but Yellow (0.87) does not.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:248`</small>

### `sc_color_to_css` {#sc_color_to_css}
*🔌 pluggable*

```php
sc_color_to_css( $value, $fallback = '', $as_hex = false )
```

Resolves a color-field value (preset var, custom hex, or legacy string) to a CSS color token.

Resolve a preset-or-custom color value (from sc_color_field_compact) to a
single CSS color STRING — for consumers that need a value (a CSS custom
property, an inline `color:`/`background:`, a JS/canvas color), not a class.

  - preset (`predefined` like 'text-red'/'bg-blue') → `var(--color-&#123;slug&#125;)`
    (live-linked to Theme Settings → General → Colors). When $as_hex is true
    (e.g. WebGL / canvas, which can't read a CSS var) → the slug's hex from
    unysonplus_color_preset_slug_map().
  - custom hex/rgb(a) → the sanitised value.
  - legacy plain string (pre-compact saves) → passed through.
  - nothing set → $fallback.

| Parameter | Type | Description |
| --- | --- | --- |
| `$value` | `mixed` | string\|array as produced by sc_color_field*() |
| `$fallback` | `string` | returned when nothing usable is set |
| `$as_hex` | `bool` | resolve a preset to its hex instead of var(--color-…) |

**Returns** `string` a CSS color token (possibly empty if $fallback is '')

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:682`</small>

### `sc_ct_cell` {#sc_ct_cell}
*🔌 pluggable*

```php
sc_ct_cell( $raw )
```

Render one cell from its raw token.

<small>Source: `framework/extensions/shortcodes/shortcodes/comparison-table/views/view.php:19`</small>

### `sc_ct_render` {#sc_ct_render}
*🔌 pluggable*

```php
sc_ct_render( $atts )
```

Renders the comparison-table shortcode from its columns and rows atts.

<small>Source: `framework/extensions/shortcodes/shortcodes/comparison-table/views/view.php:40`</small>

### `sc_design_enabled_shortcodes` {#sc_design_enabled_shortcodes}
*🔌 pluggable*

```php
sc_design_enabled_shortcodes()
```

Which shortcodes get the Presets tab. Filterable so more can opt in (and so a Design-Pack plugin could enable its own) without touching this file.

<small>Source: `framework/extensions/shortcodes/includes/design-presets.php:31`</small>

### `sc_design_presets_panel_html` {#sc_design_presets_panel_html}
*🔌 pluggable*

```php
sc_design_presets_panel_html()
```

The Presets-tab panel markup (server-rendered, safe). JS wires the buttons.

<small>Source: `framework/extensions/shortcodes/includes/design-presets.php:38`</small>

### `sc_design_presets_tab` {#sc_design_presets_tab}
*🔌 pluggable*

```php
sc_design_presets_tab()
```

The "Presets" tab (a single full-width html panel).

<small>Source: `framework/extensions/shortcodes/includes/design-presets.php:57`</small>

### `sc_divider_shape_path` {#sc_divider_shape_path}
*🔌 pluggable*

```php
sc_divider_shape_path( $style )
```

Filled SVG path (viewBox 0 0 1200 120) for each shape style.

<small>Source: `framework/extensions/shortcodes/shortcodes/divider/views/view.php:77`</small>

### `sc_easing_css` {#sc_easing_css}
*🔌 pluggable*

```php
sc_easing_css( $key )
```

Resolve an easing key to a CSS animation-timing-function value ('' = no override / Default).

<small>Source: `framework/extensions/shortcodes/includes/shortcode-easing-helper.php:39`</small>

### `sc_easing_defs` {#sc_easing_defs}
*🔌 pluggable*

```php
sc_easing_defs()
```

All easing definitions, keyed by easing key. [ 'label', 'group', 'css', 'gsap' ].

<small>Source: `framework/extensions/shortcodes/includes/shortcode-easing-helper.php:27`</small>

### `sc_easing_field` {#sc_easing_field}
*🔌 pluggable*

```php
sc_easing_field( $args = array() )
```

Build a POPOVER easing picker option (scalar passthrough value = the easing key). $args: label, desc, value (default key, defaults to 'default').

<small>Source: `framework/extensions/shortcodes/includes/shortcode-easing-helper.php:87`</small>

### `sc_easing_gsap` {#sc_easing_gsap}
*🔌 pluggable*

```php
sc_easing_gsap( $key )
```

Resolve an easing key to the nearest GSAP ease name ('' = default).

<small>Source: `framework/extensions/shortcodes/includes/shortcode-easing-helper.php:58`</small>

### `sc_easing_image_choices` {#sc_easing_image_choices}
*🔌 pluggable*

```php
sc_easing_image_choices()
```

Build the image-picker tiles (key =&gt; &#123;small,large,label&#125;) pointing at the curve SVGs.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-easing-helper.php:67`</small>

### `sc_editor_notice` {#sc_editor_notice}
*🔌 pluggable*

```php
sc_editor_notice( $text )
```

Returns an italic editor-only placeholder notice div wrapping the escaped text.

An editor-only "nothing to render yet" note.

Most elements say what is missing when they have nothing to show. That
matters more in a Gutenberg block than it ever did in the page builder: a
dynamic block that renders an empty string produces "Block rendered as
empty", which is exactly what a BROKEN block looks like. The user cannot
tell "you have not chosen an image yet" from "this is not working".

The styling is INLINE rather than a class, because several of the elements
that need this ship no stylesheet of their own — a `.fw-sc__empty` rule
would have nowhere to live for them, and a message that looks unstyled in
some blocks and styled in others is its own small confusion.

Callers are responsible for the editor check; this helper only builds the
markup, so a caller can decide to show it in other contexts too.

| Parameter | Type | Description |
| --- | --- | --- |
| `$text` | `string` | The message. Escaped here — pass plain text. |

**Returns** `string` HTML.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-build-helper.php:303`</small>

### `sc_element_scope_class` {#sc_element_scope_class}
*🔌 pluggable*

```php
sc_element_scope_class( $atts )
```

Derive a prefix-independent scope class for per-element Custom CSS — e.g. `u1a2b3c4d`. Derived from `unique_id` ALONE (fixed 8-char slug, leading `u` so it's a valid class start) so the front-end wrapper and the per-page CSS aggregator (framework/includes/dynamic-css.php) compute the SAME class without needing to know each shortcode's type-specific unique_id_prefix.

The per-element Custom CSS field's `selector` token resolves to `.&#123;scope&#125;`.

| Parameter | Type | Description |
| --- | --- | --- |
| `$atts` | `array` | Shortcode attributes (expects unique_id). |

**Returns** `string` Sanitized class without the leading dot, or '' .

<small>Source: `framework/extensions/shortcodes/includes/shortcode-build-helper.php:60`</small>

### `sc_element_unique_class` {#sc_element_unique_class}
*🔌 pluggable*

```php
sc_element_unique_class( $atts )
```

Derive the element's prefixed unique class — e.g. `bt-1a2b3c4d`.

Single source of truth for the `&#123;unique_id_prefix&#125;&#123;unique_id&#125;` class that
sc_build_wrapper_attr() puts on the wrapper. Returns '' when either the
prefix or the unique_id is missing.

| Parameter | Type | Description |
| --- | --- | --- |
| `$atts` | `array` | Shortcode attributes (expects unique_id_prefix, unique_id, optional unique_length). |

**Returns** `string` Sanitized class without the leading dot, or '' .

<small>Source: `framework/extensions/shortcodes/includes/shortcode-build-helper.php:32`</small>

### `sc_emit_button_admin_preview_css` {#sc_emit_button_admin_preview_css}
*🔌 pluggable*

```php
sc_emit_button_admin_preview_css()
```

Theme Settings → Buttons → Color Presets renders each row's preview as `&lt;span class="btn btn-preview-&#123;id&#125;"&gt;Name&lt;/span&gt;` inside the postbox header. fw-settings.css supplies the base `.btn` shape, but its color/bg come from an inline `&lt;style&gt;` block that postbox-header CSS can steamroll. This emitter adds a more-specific rule that forces a visible button look in that exact context.

Scoped to `.btn-preview-` only (not `btn-size-preview-`) so size previews
can express their own font-size / padding / border-radius without being
forced into a uniform 4px×14px/13px shape.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:2411`</small>

### `sc_emit_button_hover_animation_preview_css` {#sc_emit_button_hover_animation_preview_css}
*🔌 pluggable*

```php
sc_emit_button_hover_animation_preview_css()
```

Theme Settings → Buttons → Hover Animations row previews. Each row's template renders `&lt;span class="btn btn-primary btnfx-preview-&#123;id&#125;"&gt;`; this admin_head emitter replays the saved CSS for that row with &#123;&#123;BTN&#125;&#125; -&gt; .btnfx-preview-&#123;id&#125; and &#123;&#123;ANIM&#125;&#125; -&gt; a per-id keyframes name, so hovering the row's button plays the effect. Mirrors the front-end generation in css-tokens.php (same scrub), but keyed by the box id (the template has the id, not the name-derived slug).

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:2364`</small>

### `sc_emit_button_preview_saved_css` {#sc_emit_button_preview_saved_css}
*🔌 pluggable*

```php
sc_emit_button_preview_saved_css()
```

Saved-state colour rules for Theme Settings → Buttons preview spans. The addable-box template's inline `&lt;style&gt;` provides live-edit updates, but it gets re-rendered (and briefly cleared for siblings) when postbox toggles fire. This admin_head emitter gives every `.btn-preview-&#123;id&#125;` a stable baseline so toggling one row doesn't blank another row's preview. No `!important` — the inline rule still wins (DOM-late source order, same specificity) when present.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:2257`</small>

### `sc_emit_button_size_preview_saved_css` {#sc_emit_button_size_preview_saved_css}
*🔌 pluggable*

```php
sc_emit_button_size_preview_saved_css()
```

Saved-state rules for Theme Settings → Buttons → Sizes preview spans. The addable-box template's inline `&lt;style&gt;` provides live-edit updates, but it gets re-rendered (and briefly cleared for siblings) when postbox toggles fire. This admin_head emitter gives every `.btn-size-preview-&#123;id&#125;` a stable baseline so toggling one row doesn't blank another row's preview. No `!important` — the inline rule still wins (DOM-late source order) when present, so live-edit isn't blocked.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:2297`</small>

### `sc_emit_button_size_select_admin_css` {#sc_emit_button_size_select_admin_css}
*🔌 pluggable*

```php
sc_emit_button_size_select_admin_css()
```

Size each &lt;option&gt; in the Button shortcode's Size dropdown by the corresponding Button Size Preset's font_size. Mirrors sc_emit_font_size_select_admin_css's approach but uses raw px values directly (typical button sizes are 12px–22px, all readable in the dropdown without normalisation).

Scoped by `select.sc-button-size`.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:2223`</small>

### `sc_emit_button_style_select_admin_css` {#sc_emit_button_style_select_admin_css}
*🔌 pluggable*

```php
sc_emit_button_style_select_admin_css()
```

Color each &lt;option&gt; in the Button shortcode's Style dropdown by the corresponding Button Preset's DEFAULT-state text/background colors, so the dropdown previews each preset. Same pattern as sc_emit_color_select_admin_css. Scoped by `select.sc-button-style`.

Reads the nested SKIN shape: $bp['states']['default']['text_color'|'bg_color']
are compact-picker values &#123; predefined: &lt;color-preset-slug&gt;, custom: '#hex' &#125;.
Resolves predefined slugs via the Color Presets lookup (custom hex wins).
Outline / link presets (no background) preview as colored text on a neutral
backdrop. Chrome/Firefox/Edge honor option styling; Safari plain-text falls back.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:2144`</small>

### `sc_emit_color_preset_select_admin_css` {#sc_emit_color_preset_select_admin_css}
*🔌 pluggable*

```php
sc_emit_color_preset_select_admin_css()
```

Colour each &lt;option&gt; in dropdowns whose value is a raw Color Preset slug (vs. utility-class values handled by sc_emit_color_select_admin_css). Two flavours: select.sc-color-preset-text → options get colored TEXT select.sc-color-preset-bg → options get a colored BACKGROUND

Used by Theme Settings → Buttons (each row has 4 such selects).

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:2051`</small>

### `sc_emit_color_select_admin_css` {#sc_emit_color_select_admin_css}
*🔌 pluggable*

```php
sc_emit_color_select_admin_css()
```

Color each &lt;option&gt; in any Styling-tab color dropdown according to its palette color. Scoped by `select.sc-color-text` and `select.sc-color-bg`, which sc_color_field() adds automatically — so adding a new custom color field (via sc_color_field) gets the visual preview for free, with no change needed to this emitter.

Chrome / Firefox / Edge honor &lt;option&gt; coloring. Safari ignores it (plain
text fallback) — same trade-off as any native-select-styling approach.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:2012`</small>

### `sc_emit_font_size_select_admin_css` {#sc_emit_font_size_select_admin_css}
*🔌 pluggable*

```php
sc_emit_font_size_select_admin_css()
```

Size each &lt;option&gt; in any Styling-tab font-size dropdown proportionally to its preset value. Linear-mapped to [12, 32]px so the dropdown stays usable while preserving relative ordering. Scoped by `select.sc-font-size`, which sc_font_size_field() adds automatically.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:2084`</small>

### `sc_emit_styling_admin_css` {#sc_emit_styling_admin_css}
*🔌 pluggable*

```php
sc_emit_styling_admin_css()
```

Admin-CSS for the Styling tab — flexes the nested per-side group (`.fw-backend-options-group.sc-spacing-row`) so the 4 Top/Right/Bottom/Left dropdowns share a single row, and overrides short-select's fixed 100px width so they fill the available cell.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:2426`</small>

### `sc_eval_display_conditions` {#sc_eval_display_conditions}
*🔌 pluggable*

```php
sc_eval_display_conditions( $atts )
```

Display Conditions — per-element visibility gate (the Theme Builder "show this element when…" feature). Mirrors Divi's render-then-strip model: the element renders normally, then its output is discarded if its conditions don't pass.

Gate is intentionally FAIL-OPEN: any uncertainty (non-builder shortcode, decode
error, exception) returns the original output, so a bug here can never blank a
page. A cheap raw pre-check skips the (heavier) atts decode for the ~99% of
elements that set no condition. Extend the verdict via `fw_sc_display_conditions`.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-get-option-helpers.php:257`</small>

### `sc_expand_multi_animation_fields` {#sc_expand_multi_animation_fields}
*🔌 pluggable*

```php
sc_expand_multi_animation_fields( $fields, $max = 4 )
```

Expand `anim_meta['multi']` module fields into up to $max instance slots (base + `&lt;key&gt;__2..__N`). Each field (base and slot) is tagged `anim_meta['multi_base']` (the base key) and `anim_meta['multi_index']` (1..N) so the container can group slots under one inserter tile and reveal the next empty one on "Add". Single-instance fields pass through untouched, order kept.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-animation-helper.php:487`</small>

### `sc_ext_page_builder_is_builder_post` {#sc_ext_page_builder_is_builder_post}
*🔌 pluggable*

```php
sc_ext_page_builder_is_builder_post( $classes )
```

Adds 'unyson page-builder' body classes when the current post uses the page builder.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-helpers.php:81`</small>

### `sc_extract_spacing_classes` {#sc_extract_spacing_classes}
*🔌 pluggable*

```php
sc_extract_spacing_classes( &$atts )
```

Removes the spacing atts and returns their flattened, sanitized margin/padding class names.

Mirror of `sc_extract_styling_classes()` but for the nested `spacing` att
produced by the composite `spacing` option type. Pull the spacing att out
of $atts, flatten it into class-safe strings, and UNSET $atts['spacing']
so the `sc_apply_styling_classes` filter won't re-apply the same classes
to the wrapper.

Use in view.php when a shortcode wants to push spacing classes to an
inner element instead of the outer wrapper (currently: `[column]`).

  $spacing_extras = sc_extract_spacing_classes( $atts );
  // $atts['spacing'] is gone → outer wrapper won't get those classes
  // $spacing_extras = array( 'm-3', 'pt-2' ) → append to inner element

| Parameter | Type | Description |
| --- | --- | --- |
| `$atts` | `array` | Reference. The shortcode's atts array. Modified in place. |

**Returns** `string[]` Flat list of sanitized class names from the spacing tree.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:475`</small>

### `sc_extract_styling_atts` {#sc_extract_styling_atts}
*🔌 pluggable*

```php
sc_extract_styling_atts( &$atts, array $keys )
```

Extracts the given styling keys from atts, returning their collected classes and inline styles.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:369`</small>

### `sc_extract_styling_classes` {#sc_extract_styling_classes}
*🔌 pluggable*

```php
sc_extract_styling_classes( &$atts, array $keys )
```

Pull styling atts out of $atts, sanitize their values, return them as a class array, and unset them from $atts so the wrapper-class filter won't apply them to the wrapper.

Use in view.php when a shortcode wants to apply styling-tab picks to an inner element
(title, subtitle, icon, body, etc.) instead of the wrapper.

  $title_extras = sc_extract_styling_classes( $atts, array( 'text_color', 'font_size_preset' ) );
  // $atts no longer has text_color or font_size_preset → wrapper won't get them
  // $title_extras = array( 'text-red', 'display-1' ) → append to your inner element's class list

| Parameter | Type | Description |
| --- | --- | --- |
| `$atts` | `array` | Reference. The shortcode's atts array. Modified in place. |
| `$keys` | `array` | Att keys to extract. |

**Returns** `array` CSS-safe class names (one per non-empty extracted att).

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:278`</small>

### `sc_fb_icon` {#sc_fb_icon}
*🔌 pluggable*

```php
sc_fb_icon( $picked )
```

Renders a flip-box picked icon via the central icon renderer, falling back to inline font/upload markup.

<small>Source: `framework/extensions/shortcodes/shortcodes/flip-box/views/view.php:19`</small>

### `sc_fb_render` {#sc_fb_render}
*🔌 pluggable*

```php
sc_fb_render( $atts )
```

Renders the flip-box shortcode, resolving its design skin and front/back title and text content.

<small>Source: `framework/extensions/shortcodes/shortcodes/flip-box/views/view.php:39`</small>

### `sc_filter_styling_options` {#sc_filter_styling_options}
*🔌 pluggable*

```php
sc_filter_styling_options( $options, $tag = '' )
```

Filters shortcode options, stripping the styling layer when styling presets are disabled.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:2485`</small>

### `sc_fl_icon` {#sc_fl_icon}
*🔌 pluggable*

```php
sc_fl_icon( $picked )
```

Renders a feature-list picked icon via the central icon renderer, falling back to inline font/upload markup.

<small>Source: `framework/extensions/shortcodes/shortcodes/feature-list/views/view.php:19`</small>

### `sc_fl_render` {#sc_fl_render}
*🔌 pluggable*

```php
sc_fl_render( $atts )
```

Renders the feature-list shortcode, resolving its design and folding legacy icon/badge designs into the new model.

<small>Source: `framework/extensions/shortcodes/shortcodes/feature-list/views/view.php:40`</small>

### `sc_flatten_spacing_value` {#sc_flatten_spacing_value}
*🔌 pluggable*

```php
sc_flatten_spacing_value( $spacing )
```

Flatten the nested value of a `spacing` option (margin + padding subtrees, each with all/top/right/bottom/left slots holding Bootstrap utility class names) into a flat list of class-safe strings.

Pairs with the `spacing` composite option type at
framework/includes/option-types/spacing/. Used by sc_apply_styling_classes
so a single `spacing` att on a shortcode resolves to wrapper classes the
same way the legacy flat keys (margin, margin_top, padding_bottom, …) do.

                      Anything else returns an empty array.

| Parameter | Type | Description |
| --- | --- | --- |
| `$spacing` | `mixed` | Expected: array with 'margin' and/or 'padding' subarrays. |

**Returns** `string[]` Sanitized class names; never includes empty strings.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:407`</small>

### `sc_font_size_field` {#sc_font_size_field}
*🔌 pluggable*

```php
sc_font_size_field( $args = array() )
```

Build a single font-size-preset select field for the Styling tab.

'subtitle_size' =&gt; sc_font_size_field( array(
      'label' =&gt; __( 'Subtitle Size Preset', 'fw' ),
  ) ),

The rendered &lt;select&gt; gets class="sc-font-size" so the admin-CSS emitter
can size its options proportionally.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:732`</small>

### `sc_gallery_caption_text` {#sc_gallery_caption_text}
*🔌 pluggable*

```php
sc_gallery_caption_text( $item, $source )
```

Resolve the caption string for one item from the chosen source field. Returns '' when the source field is empty.

<small>Source: `framework/extensions/shortcodes/shortcodes/gallery/static.php:214`</small>

### `sc_gallery_gap_css` {#sc_gallery_gap_css}
*🔌 pluggable*

```php
sc_gallery_gap_css( $slug, $fallback = '1rem' )
```

Resolve a Gap-Scale slug (e.g. "3") to a CSS length for the layout `gap`. Returns `var(--gap-&lt;slug&gt;, &lt;fallback&gt;)` so it stays live with the site's Spacing → Gap Scale presets (css-tokens.php emits the `--gap-*` tokens). Empty slug (the "None" choice) → 0.

<small>Source: `framework/extensions/shortcodes/shortcodes/gallery/static.php:427`</small>

### `sc_gallery_gap_size` {#sc_gallery_gap_size}
*🔌 pluggable*

```php
sc_gallery_gap_size( $slug, $fallback = '1rem' )
```

Like sc_gallery_gap_css() but returns the CONCRETE size string (e.g. "1rem") from the live Gap Scale — for places that need a real length, not a CSS var (e.g. Splide's JS `gap` option in the Carousel design).

<small>Source: `framework/extensions/shortcodes/shortcodes/gallery/static.php:442`</small>

### `sc_gallery_get_items` {#sc_gallery_get_items}
*🔌 pluggable*

```php
sc_gallery_get_items( $images, $size = 'large' )
```

Normalize the multi-upload `images` value into a flat list of render-ready items. Each saved entry is `&#123; attachment_id, url &#125;`; we resolve real URLs, dimensions, alt/caption/title/description and the full-size source (for the lightbox) from the Media Library so output never depends on the stored url.

full, full_w, full_h, alt, caption, title, description.

| Parameter | Type | Description |
| --- | --- | --- |
| `$images` | `array` | The saved `images` att (array of &#123;attachment_id,url&#125;). |
| `$size` | `string` | Registered image size used for the on-page thumbnail. |

**Returns** `array[]` List of items with keys: id, url, w, h, srcset, sizes,

<small>Source: `framework/extensions/shortcodes/shortcodes/gallery/static.php:134`</small>

### `sc_gallery_img_html` {#sc_gallery_img_html}
*🔌 pluggable*

```php
sc_gallery_img_html( $item, $args = array() )
```

Build the responsive &lt;img&gt; for one item. Alt falls back to the caption / title only for accessibility (never the URL). Always lazy + async.

<small>Source: `framework/extensions/shortcodes/shortcodes/gallery/static.php:231`</small>

### `sc_gallery_item_link` {#sc_gallery_item_link}

```php
sc_gallery_item_link( $item, $force_new_tab = false )
```

Resolve an item's "Open Link" URL + anchor attrs. Returns array( url, attrs ) — url is '' when the item has no link. Order: the item's own link (the Post Type source stamps each entry with its post's permalink) → the image's Media-Library "Link URL" meta. External hosts get target=_blank automatically (the tag_list convention); $force_new_tab forces it for internal links too.

<small>Source: `framework/extensions/shortcodes/shortcodes/gallery/static.php:283`</small>

### `sc_gallery_ratio_css` {#sc_gallery_ratio_css}
*🔌 pluggable*

```php
sc_gallery_ratio_css( $ratio )
```

Map a saved ratio key (e.g. '4-3') to a CSS aspect-ratio value ('4 / 3'). 'original' (or unknown) returns '' so the caller can skip the property.

<small>Source: `framework/extensions/shortcodes/shortcodes/gallery/static.php:467`</small>

### `sc_gallery_render_tile` {#sc_gallery_render_tile}
*🔌 pluggable*

```php
sc_gallery_render_tile( $item, $args = array() )
```

Renders a single gallery tile, wiring click action, captions, hover zoom, and box/image styling.

<small>Source: `framework/extensions/shortcodes/shortcodes/gallery/static.php:300`</small>

### `sc_get_advanced_tab` {#sc_get_advanced_tab}
*🔌 pluggable*

```php
sc_get_advanced_tab()
```

Returns a reusable "Advanced" tab for shortcodes. Includes Unique ID, CSS ID, and CSS Class.

**Returns** `array`

<small>Source: `framework/extensions/shortcodes/includes/shortcode-get-option-helpers.php:14`</small>

### `sc_get_animation_fields` {#sc_get_animation_fields}
*🔌 pluggable*

```php
sc_get_animation_fields()
```

Returns the inner fields for the Animations tab.

Use inside each shortcode's options.php:

    'tab_animation' =&gt; [
        'title'   =&gt; __( 'Animations', 'fw' ),
        'type'    =&gt; 'tab',
        'options' =&gt; sc_get_animation_fields(),
    ],

<small>Source: `framework/extensions/shortcodes/includes/shortcode-animation-helper.php:38`</small>

### `sc_get_border_preset_choices` {#sc_get_border_preset_choices}
*🔌 pluggable*

```php
sc_get_border_preset_choices()
```

Dropdown choices for a column's Border Preset picker, sourced from the saved Border Presets (Theme Settings → General → Borders). Each preset's name-based slug becomes the option value `boxp-&#123;slug&#125;` (matching the generated CSS class in css-tokens.php). A blank "None" is prepended. Adding a preset in Theme Settings instantly shows up in every Column's Border Preset dropdown.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:1321`</small>

### `sc_get_button_size_choices` {#sc_get_button_size_choices}
*🔌 pluggable*

```php
sc_get_button_size_choices()
```

Returns dropdown choices for a button's size picker, sourced from the user's saved button size presets (Theme Settings → Buttons → Sizes). Each preset's `slug` becomes the option value `btn-&#123;slug&#125;`. Adding a row in Theme Settings instantly shows up in every Button shortcode's Size dropdown.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:1155`</small>

### `sc_get_button_style_choices` {#sc_get_button_style_choices}
*🔌 pluggable*

```php
sc_get_button_style_choices( $outline = false )
```

Returns dropdown choices for a button's style / outline picker, sourced from the user's saved button color presets (Theme Settings → Buttons). Each preset's `id` becomes the option value `btn-&#123;id&#125;` (filled) or `btn-outline-&#123;id&#125;` (outline). Adding a row in Theme Settings instantly shows up in every Button shortcode's dropdown.

option prepended. false → `btn-&#123;id&#125;` keys.

| Parameter | Type | Description |
| --- | --- | --- |
| `$outline` | `bool` | true → `btn-outline-&#123;id&#125;` keys + a blank "No Outline" |

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:1269`</small>

### `sc_get_button_style_default` {#sc_get_button_style_default}
*🔌 pluggable*

```php
sc_get_button_style_default()
```

The default Button Style for a freshly-added button: the first REAL preset (Primary, in the default order) — NOT the bare `.btn` base. `sc_get_button_style_choices()` prepends a `'' =&gt; Default` row, so the naive `key()` of the first choice is `''` (an unstyled button); this skips that leading blank and returns the first non-empty `btn-&#123;slug&#125;` key so a dropped-in CTA looks intentional out of the box. The blank "Default" row stays selectable (and the Site Converter still sets it explicitly). Returns '' only when no presets exist.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:1304`</small>

### `sc_get_color_preset_slug_choices` {#sc_get_color_preset_slug_choices}
*🔌 pluggable*

```php
sc_get_color_preset_slug_choices()
```

Slug-keyed choices for any select that picks a Color Preset by slug (e.g. Theme Settings → Buttons color fields). Returns `[ '' =&gt; 'Default', slug =&gt; display_name, … ]`. Pairs with `sc_emit_color_preset_select_admin_css` for option-level colouring.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:1245`</small>

### `sc_get_color_select_choices` {#sc_get_color_select_choices}
*🔌 pluggable*

```php
sc_get_color_select_choices( $kind = 'text' )
```

Builds select choices from the color presets, keyed by kind-slug, for a color-picker field.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:1051`</small>

### `sc_get_font_size_preset_choices` {#sc_get_font_size_preset_choices}
*🔌 pluggable*

```php
sc_get_font_size_preset_choices()
```

Builds select choices from font-size/text-style presets that set any typographic property.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:1759`</small>

### `sc_get_gap_select_choices` {#sc_get_gap_select_choices}
*🔌 pluggable*

```php
sc_get_gap_select_choices( $empty_label = null )
```

Returns dropdown choices for a column-gap picker, sourced from the live Gap Scale (Theme Settings → General → Spacing → Gaps, or plugin defaults).

Values are scale slugs (e.g. `3`, `huge`) — NOT full utility class names.
Callers resolve them on the output side by either appending a modifier
class (`section--gap-&#123;slug&#125;`) or a utility class (`g-&#123;slug&#125;` / `gx-&#123;slug&#125;`
/ `gy-&#123;slug&#125;`); css-tokens.php emits the matching rules.

                                of the dropdown. Pass `null` to omit it.
                                Typical: "Use Default Gap" on per-instance
                                fields, or "None" on the site-default field.

| Parameter | Type | Description |
| --- | --- | --- |
| `$empty_label` | `string\|null` | Label for the empty-string entry at the top |

**Returns** `array`

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:1125`</small>

### `sc_get_hover_animation_choices` {#sc_get_hover_animation_choices}
*🔌 pluggable*

```php
sc_get_hover_animation_choices()
```

Choices for a button's Hover Animation picker. The built-in values are CSS classes shipped in button/static/css/hover-fx.css — MOTION-ONLY effects (transform / shadow / radius / text) that layer over any button preset (solid, outline, gradient) without touching its colors. The user's Custom Hover Animations (Theme Settings → Buttons) are appended as `btnfx-c-&#123;slug&#125;` entries, generated into the preset stylesheet by css-tokens.php. (Flat map: no optgroups.)

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:1178`</small>

### `sc_get_icon_badge_preset_choices` {#sc_get_icon_badge_preset_choices}
*🔌 pluggable*

```php
sc_get_icon_badge_preset_choices()
```

Dropdown choices for an element's Icon Badge Preset picker, sourced from the saved Icon Badge presets (Theme Settings → Components → Icon Badges). Each preset's name-based slug becomes the option value `iconb-&#123;slug&#125;` (matching the generated CSS class in css-tokens.php). A blank "None" is prepended. Adding a preset in Theme Settings instantly shows up in every Icon Badge Preset dropdown.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:1347`</small>

### `sc_get_image_style_choices` {#sc_get_image_style_choices}
*🔌 pluggable*

```php
sc_get_image_style_choices()
```

Image Style choices for the `image_style` select: `imgs-&#123;slug&#125; =&gt; Name`, with a blank "None" prepended. The slug matches the generated `.imgs-&#123;slug&#125;` class in css-tokens.php. Adding a style in Theme Settings → Components → Image Styles instantly shows up here.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:1673`</small>

### `sc_get_option` {#sc_get_option}
*🔌 pluggable*

```php
sc_get_option($option_id, $default = NULL)
```

Get options value if framework is missing , load defaults

**Returns** `option` value

<small>Source: `framework/extensions/shortcodes/includes/shortcode-helpers.php:25`</small>

### `sc_get_options_box_border` {#sc_get_options_box_border}
*🔌 pluggable*

```php
sc_get_options_box_border($atts)
```

Get Border Options

<small>Source: `framework/extensions/shortcodes/includes/shortcode-option-helpers.php:2004`</small>

### `sc_get_post_option` {#sc_get_post_option}
*🔌 pluggable*

```php
sc_get_post_option($post_id, $id, $default = NULL)
```

Converts an attribute array to an HTML attribute string via fw_attr_to_html(), or returns the default.

Adds 'unyson page-builder' body classes when the current post uses the page builder.

Get post options value
if framework is missing , load defaults

**Returns** `option` value

<small>Source: `framework/extensions/shortcodes/includes/shortcode-helpers.php:45`</small>

### `sc_get_shortcode_attr` {#sc_get_shortcode_attr}
*🔌 pluggable*

```php
sc_get_shortcode_attr($atts)
```

Get Shortcode Attributes

<small>Source: `framework/extensions/shortcodes/includes/shortcode-option-helpers.php:1586`</small>

### `sc_get_spacing_select_choices` {#sc_get_spacing_select_choices}
*🔌 pluggable*

```php
sc_get_spacing_select_choices( $prefix = 'm' )
```

Returns the spacing-utility choices for a select field with the given prefix. Reads the live spacing scale (Theme Settings override or plugin defaults) so adding entries in Shortcode Settings → General → Spacing immediately appears in every Styling-tab Margin/Padding dropdown across all shortcodes.

Values are Bootstrap-style class names (e.g. m-0, m-1, m-3, m-huge).
Labels show the underlying spacing value so users can see what they're picking.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:1074`</small>

### `sc_get_table_preset_choices` {#sc_get_table_preset_choices}
*🔌 pluggable*

```php
sc_get_table_preset_choices()
```

Table Preset choices for the Table shortcode's `table-style-picker` field: `tbl-&#123;slug&#125; =&gt; Name`, with a blank "None" prepended. The slug matches the generated CSS class in css-tokens.php. Adding a preset in Shortcode Settings → Components → Tables instantly shows up here.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:1739`</small>

### `sc_hl_render` {#sc_hl_render}
*🔌 pluggable*

```php
sc_hl_render( $atts )
```

Renders the highlight-text shortcode, resolving its effect, tag, alignment, and text content.

<small>Source: `framework/extensions/shortcodes/shortcodes/highlight-text/views/view.php:19`</small>

### `sc_hover_collection_items` {#sc_hover_collection_items}
*🔌 pluggable*

```php
sc_hover_collection_items()
```

The narrow registry of collections whose VIEW stamps the per-card HOVER attrs on each item (via upw_hover_collection_item_attr, applied in the view). The engine Hover module skips the wrapper ONLY for these, so hover isn't lost on collections that aren't wired yet. Gallery is wired; add an element here only once its view stamps the item hover.

**Returns** `array&lt;string,string&gt;` base_class =&gt; item selector.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-animation-helper.php:705`</small>

### `sc_hover_item_markup` {#sc_hover_item_markup}
*🔌 pluggable*

```php
sc_hover_item_markup( $atts )
```

Per-item hover markup pieces for a collection view. Returns array( 'class' =&gt; ' sc-hover ...', 'attr' =&gt; ' data-hover="..." ...' ) to splice onto each item element — honouring the "Hover Target" scope (empty strings when scope is "Whole element", no hover, or the engine is inactive). Keeps every collection view's stamping identical to the Gallery reference.

| Parameter | Type | Description |
| --- | --- | --- |
| `$atts` | `array` | — |

**Returns** `array&#123;class:string,attr:string&#125;`

<small>Source: `framework/extensions/shortcodes/includes/shortcode-animation-helper.php:730`</small>

### `sc_hs_icon` {#sc_hs_icon}
*🔌 pluggable*

```php
sc_hs_icon( $picked )
```

Renders an image-hotspots picked icon via the central icon renderer, falling back to inline font/upload markup.

<small>Source: `framework/extensions/shortcodes/shortcodes/image-hotspots/views/view.php:19`</small>

### `sc_hs_render` {#sc_hs_render}
*🔌 pluggable*

```php
sc_hs_render( $atts )
```

Renders the image-hotspots shortcode, resolving its design and the background image and hotspot markers.

<small>Source: `framework/extensions/shortcodes/shortcodes/image-hotspots/views/view.php:39`</small>

### `sc_html_tag` {#sc_html_tag}
*🔌 pluggable*

```php
sc_html_tag($tag, array $attr, $content = NULL, $default = NULL)
```

Wraps fw_html_tag with guards, returning a default when the framework, tag, or content is missing.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-helpers.php:57`</small>

### `sc_icon_badge_preset_class` {#sc_icon_badge_preset_class}
*🔌 pluggable*

```php
sc_icon_badge_preset_class( $atts, $key = 'icon_badge_preset' )
```

Read + validate an element's saved Icon Badge Preset value into a safe `iconb-&#123;slug&#125;` class (or '' when unset / malformed). The shared reader for every element that consumes sc_icon_badge_preset_field(), so validation lives in one place.

| Parameter | Type | Description |
| --- | --- | --- |
| `$atts` | `array` | the shortcode atts. |
| `$key` | `string` | the option id (default 'icon_badge_preset'). |

**Returns** `string` an `iconb-&#123;slug&#125;` class, or '' .

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:1487`</small>

### `sc_icon_badge_preset_field` {#sc_icon_badge_preset_field}
*🔌 pluggable*

```php
sc_icon_badge_preset_field( $args = array() )
```

The shared "Icon Badge Preset" control — a `border-style-picker` of the saved Icon Badge presets (Theme Settings → Components → Icon Badges), each previewed inline. The saved value is an `iconb-&#123;slug&#125;` class the element stamps on its icon WRAPPER (so the preset's shaped tile — fill / border / corners / shadow — plus its icon colour, size and hover effects apply). The single source used by every icon-bearing shortcode (icon-box, icon, feature-list, steps, timeline, flip-box, image-box, special-heading, pricing-table) so the field is identical everywhere.

| Parameter | Type | Description |
| --- | --- | --- |
| `$args` | `array` | label / desc / value overrides. |

**Returns** `array` option field.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:1378`</small>

### `sc_icon_badge_preset_previews` {#sc_icon_badge_preset_previews}
*🔌 pluggable*

```php
sc_icon_badge_preset_previews()
```

Ready-to-use inline preview styles for each Icon Badge preset, keyed by its `iconb-&#123;slug&#125;` class: iconb-&#123;slug&#125; =&gt; array( 'tile_style' =&gt; '…', 'icon_style' =&gt; '…' ). Derived from each preset's DEFAULT state (shape + tile fill + border + icon colour, colours resolved against the Color Presets). Fed to the `border-style-picker` in badge mode so it draws a REAL mini tile per choice with inline styles — the preview is correct without depending on the generated front-end `.iconb-` CSS being present (and cached) in wp-admin. Preview tile SIZE is fixed by CSS (uniform rows), so the preset's own badge/icon size is intentionally not applied here.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:1411`</small>

### `sc_icon_custom_markup` {#sc_icon_custom_markup}
*🔌 pluggable*

```php
sc_icon_custom_markup( $custom )
```

Render a free-form "Custom Icon (emoji / SVG)" value: inline SVG is sanitised, anything else (an emoji or short text) is HTML-escaped.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:3259`</small>

### `sc_icon_enqueue_lottie` {#sc_icon_enqueue_lottie}
*🔌 pluggable*

```php
sc_icon_enqueue_lottie()
```

Enqueue the bundled lottie-web player + the UnysonPlus hydrator, once. Called from sc_icon_render() only when a Lottie icon is actually output, so pages without animated icons never load the ~168 KB player.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:2934`</small>

### `sc_icon_enqueue_pack` {#sc_icon_enqueue_pack}
*🔌 pluggable*

```php
sc_icon_enqueue_pack( $value )
```

Enqueue only the icon pack CSS a single icon-v2 value needs. Safe to call repeatedly (WP dedupes by handle). No-op for uploads / none / unknown.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:2743`</small>

### `sc_icon_enqueue_rive` {#sc_icon_enqueue_rive}
*🔌 pluggable*

```php
sc_icon_enqueue_rive()
```

Enqueue the bundled Rive canvas runtime (rive.js + rive.wasm) + the UnysonPlus hydrator, once. Called from sc_icon_render() only when a Rive icon is actually output, so pages without a Rive icon never load the heavy (~2 MB) WASM runtime. The hydrator pins the WASM URL to our bundled copy via the localized upwRiveWasm, so the runtime never reaches out to a CDN.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:2958`</small>

### `sc_icon_flatten_svg_css` {#sc_icon_flatten_svg_css}
*🔌 pluggable*

```php
sc_icon_flatten_svg_css( $markup )
```

Flatten an SVG's internal CSS into presentation attributes so the markup survives sanitisation intact. Adobe Illustrator exports style everything through a &lt;style&gt; block of `.stN&#123;...&#125;` classes (plus inline style="...") - wp_kses strips both, which used to turn AI exports black. This inlines: 1. every simple single-class rule (`.st0&#123;fill:#123&#125;`) onto the elements carrying that class, and 2. every inline style="prop:val" list, as plain attributes (fill="#123"), then drops the &lt;style&gt; block. Only a safe property allowlist is inlined - anything else is discarded.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:3088`</small>

### `sc_icon_join_classes` {#sc_icon_join_classes}
*🔌 pluggable*

```php
sc_icon_join_classes( $parts )
```

Join class fragments, dropping empties and collapsing internal gaps.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:2754`</small>

### `sc_icon_render` {#sc_icon_render}
*🔌 pluggable*

```php
sc_icon_render( $value, $args = array() )
```

Renders an icon value (font, SVG, emoji, or upload) into markup, the central single-source icon renderer.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:2762`</small>

### `sc_icon_sanitize_svg` {#sc_icon_sanitize_svg}
*🔌 pluggable*

```php
sc_icon_sanitize_svg( $markup )
```

Sanitise inline SVG markup against the shared allowlist. Returns '' if not SVG.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:3203`</small>

### `sc_icon_svg_allowed` {#sc_icon_svg_allowed}
*🔌 pluggable*

```php
sc_icon_svg_allowed()
```

wp_kses allowlist for inline icon SVG (scripts / handlers / external refs stripped).

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:2989`</small>

### `sc_icon_svg_library_fallback` {#sc_icon_svg_library_fallback}
*🔌 pluggable*

```php
sc_icon_svg_library_fallback( $id )
```

Returns equivalent icon-pack SVG markup for an unavailable icon id, hopping brand glyphs across packs.

Heal library ids that no longer resolve.

WHY: icon ids are PERSISTED in the database (theme Social Profiles, every
icon option on every page), so when an upstream library drops an icon the
stored value silently renders nothing on sites that are already live —
editing every one by hand is not a fix.

The case that prompted this: Lucide removed its brand/social icons, so
'lucide/twitter' and 'lucide/github' (used by social profiles) went blank.
Tabler still ships them as 'tabler/brand-&lt;name&gt;', and Tabler is bundled,
so a generic pack-hop recovers the whole family at once — no per-icon
list to maintain as more brands come and go.

**Returns** `string` markup, or '' if nothing equivalent exists

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:3326`</small>

### `sc_icon_svg_library_markup` {#sc_icon_svg_library_markup}
*🔌 pluggable*

```php
sc_icon_svg_library_markup( $id )
```

Resolve a library SVG id ('&lt;pack&gt;/&lt;name&gt;', e.g. 'lucide/star', 'tabler/home') to its raw inline-&lt;svg&gt; markup via the multi-pack engine. Filterable so extra libraries can be provided. Returns '' if unknown.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:3274`</small>

### `sc_iconbox_render_icon_container` {#sc_iconbox_render_icon_container}
*🔌 pluggable*

```php
sc_iconbox_render_icon_container( $custom_icon, $picked_icon, $extra_class = '', $extra_attrs = '' )
```

leading space (e.g. ` style="background-color:#000"`). The caller is responsible for escaping; we append it verbatim into the opening tag.

| Parameter | Type | Description |
| --- | --- | --- |
| `$extra_attrs` | `string` | Optional. Pre-built attribute fragment with a |

<small>Source: `framework/extensions/shortcodes/shortcodes/icon-box/views/view.php:308`</small>

### `sc_iconbox_render_icon_markup` {#sc_iconbox_render_icon_markup}
*🔌 pluggable*

```php
sc_iconbox_render_icon_markup( $custom_icon, $picked_icon )
```

Render the inner markup for the icon container. Priority: the picked icon (the unified picker now covers font / SVG / emoji / Lucide) wins when set; a legacy Custom Icon value is the fallback for content saved before the picker gained those kinds. The caller is responsible for the surrounding container (with aria-hidden).

<small>Source: `framework/extensions/shortcodes/shortcodes/icon-box/views/view.php:251`</small>

### `sc_image_mask_choices` {#sc_image_mask_choices}
*🔌 pluggable*

```php
sc_image_mask_choices()
```

[ key =&gt; label ] for a select (or image-picker). Includes None + Custom.

<small>Source: `framework/extensions/shortcodes/includes/image-mask-library.php:66`</small>

### `sc_image_mask_imagepicker_choices` {#sc_image_mask_imagepicker_choices}
*🔌 pluggable*

```php
sc_image_mask_imagepicker_choices()
```

image-picker choices for the mask control — each shape as a thumbnail tile (the shared mask SVGs). Same shape as the Image Box mask picker, so both render an identical visual grid.

<small>Source: `framework/extensions/shortcodes/includes/image-mask-library.php:92`</small>

### `sc_image_mask_library` {#sc_image_mask_library}
*🔌 pluggable*

```php
sc_image_mask_library()
```

Returns the shared, memoized image-mask library keyed by slug, matching the Image Box mask shapes.

<small>Source: `framework/extensions/shortcodes/includes/image-mask-library.php:24`</small>

### `sc_image_mask_svg_uri` {#sc_image_mask_svg_uri}
*🔌 pluggable*

```php
sc_image_mask_svg_uri( $key )
```

The picker-thumbnail SVG URI for a shape (shared Image Box asset dir).

<small>Source: `framework/extensions/shortcodes/includes/image-mask-library.php:77`</small>

### `sc_image_style_class` {#sc_image_style_class}
*🔌 pluggable*

```php
sc_image_style_class( $atts, $key = 'image_style' )
```

Read + validate a saved Image Style value into a safe `imgs-&#123;slug&#125;` class (or '' when unset / malformed). The shared reader for every element that consumes sc_image_style_field(), so validation lives in one place. The class goes on the image WRAPPER (the `.imgs-wrap` base rule consumes the preset's token vars).

| Parameter | Type | Description |
| --- | --- | --- |
| `$atts` | `array` | the shortcode atts. |
| `$key` | `string` | the option id (default 'image_style'). |

**Returns** `string` a `imgs-&#123;slug&#125;` class, or ''.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:1726`</small>

### `sc_image_style_field` {#sc_image_style_field}
*🔌 pluggable*

```php
sc_image_style_field( $args = array() )
```

The shared "Image Style" preset picker any element with an image drops into its options (crop, corners, mask, filter, scrim). Consumes the Theme Settings → Components → Image Styles library. Saved value is a flat `imgs-&#123;slug&#125;` string.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:1697`</small>

### `sc_imgbox_family_to_key` {#sc_imgbox_family_to_key}
*🔌 pluggable*

```php
sc_imgbox_family_to_key( $family, $sub, $reg )
```

Map a family + its variation values to an existing flat design key.

| Parameter | Type | Description |
| --- | --- | --- |
| `$family` | `string` | One of stacked\|side\|overlay\|card\|frame. |
| `$sub` | `array` | The family's saved sub-option values. |
| `$reg` | `array` | The registry array. |

**Returns** `string` A flat key that exists in $reg['designs'].

<small>Source: `framework/extensions/shortcodes/shortcodes/image-box/views/parts/resolve.php:25`</small>

### `sc_imgbox_icon_markup` {#sc_imgbox_icon_markup}
*🔌 pluggable*

```php
sc_imgbox_icon_markup( $custom_icon, $picked_icon )
```

Renders an image-box icon, preferring the picked icon then a legacy custom emoji/SVG icon.

<small>Source: `framework/extensions/shortcodes/shortcodes/image-box/views/view.php:115`</small>

### `sc_imgbox_locate_part` {#sc_imgbox_locate_part}
*🔌 pluggable*

```php
sc_imgbox_locate_part( $part )
```

Returns the file path to an image-box design part template for a sanitized part slug.

<small>Source: `framework/extensions/shortcodes/shortcodes/image-box/views/view.php:56`</small>

### `sc_imgbox_registry` {#sc_imgbox_registry}
*🔌 pluggable*

```php
sc_imgbox_registry()
```

Returns the memoized image-box design registry loaded from the parts registry file.

<small>Source: `framework/extensions/shortcodes/shortcodes/image-box/views/view.php:42`</small>

### `sc_imgbox_render` {#sc_imgbox_render}
*🔌 pluggable*

```php
sc_imgbox_render( $atts )
```

Renders the image-box shortcode, resolving its design family and variations to a part template and content.

<small>Source: `framework/extensions/shortcodes/shortcodes/image-box/views/view.php:155`</small>

### `sc_imgbox_resolve_design` {#sc_imgbox_resolve_design}
*🔌 pluggable*

```php
sc_imgbox_resolve_design( $atts, $reg )
```

Resolve an instance's atts to its flat design.

| Parameter | Type | Description |
| --- | --- | --- |
| `$atts` | `array` | Decoded shortcode atts. |
| `$reg` | `array` | The registry array. |

**Returns** `array` &#123; key, part, family, sub, content_over, hover_reveal &#125;

<small>Source: `framework/extensions/shortcodes/shortcodes/image-box/views/parts/resolve.php:87`</small>

### `sc_imgbox_sanitize_clip` {#sc_imgbox_sanitize_clip}
*🔌 pluggable*

```php
sc_imgbox_sanitize_clip( $clip )
```

Sanitizes an image-box custom clip-path value, rejecting url()/expression/js and disallowed characters.

<small>Source: `framework/extensions/shortcodes/shortcodes/image-box/views/view.php:91`</small>

### `sc_imgbox_sanitize_svg` {#sc_imgbox_sanitize_svg}
*🔌 pluggable*

```php
sc_imgbox_sanitize_svg( $svg )
```

Sanitizes a custom mask SVG, keeping only the svg fragment and stripping scripts and event handlers.

<small>Source: `framework/extensions/shortcodes/shortcodes/image-box/views/view.php:73`</small>

### `sc_kses_svg` {#sc_kses_svg}

```php
sc_kses_svg( $html )
```

wp_kses_post PLUS a safe inline-SVG element set. Headings / rich text can legitimately carry a decorative inline `&lt;svg&gt;` (a hand-drawn underline squiggle, a highlight stroke); wp_kses_post strips it, so the graphic vanishes. Allow the SHAPE + PRESENTATION element/attribute set only — never `&lt;script&gt;` / `&lt;foreignObject&gt;` / `on*` handlers, so no script surface is introduced. wp_kses also LOWERCASES attribute names, but a handful of SVG attrs are case-SENSITIVE (`viewBox`, `preserveAspectRatio`, gradient units) and break when lowercased — restore them.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:344`</small>

### `sc_lg_item` {#sc_lg_item}
*🔌 pluggable*

```php
sc_lg_item( $logo, $linkable = true, $show_labels = false, $hov = array() )
```

Renders a single logo-grid item with its SVG/image mark, optional label, and optional link wrapper.

<small>Source: `framework/extensions/shortcodes/shortcodes/logo-grid/views/view.php:19`</small>

### `sc_lg_render` {#sc_lg_render}
*🔌 pluggable*

```php
sc_lg_render( $atts )
```

Renders the logo-grid shortcode, resolving its design and emitting the grid of logo items.

<small>Source: `framework/extensions/shortcodes/shortcodes/logo-grid/views/view.php:62`</small>

### `sc_lottie_render` {#sc_lottie_render}
*🔌 pluggable*

```php
sc_lottie_render( $atts )
```

Renders the lottie shortcode, resolving the animation source from an uploaded file or URL.

<small>Source: `framework/extensions/shortcodes/shortcodes/lottie/views/view.php:19`</small>

### `sc_migrate_atts` {#sc_migrate_atts}
*🔌 pluggable*

```php
sc_migrate_atts( $atts, array $specs )
```

Migrates shortcode atts in place by running per-att callbacks according to each spec's condition.

Reusable atts-migration runner.

Each option's *value transform* is necessarily option-specific (a tiny
callback), but the *plumbing* — which att, whether it still needs
migrating, how the callback is invoked, writing the result back — is the
same every time. This runs a declarative spec of those transforms over a
shortcode's atts so option upgrades (scalar → array, renamed shapes, merged
legacy fields, …) only need a few-line migrator each.

Spec — `att_id =&gt; migration`, where migration is either:
  - a callable (shorthand)  →  arg:'value', when:'not_array'
  - an array:
      'cb'   =&gt; callable,                 // required
      'arg'  =&gt; 'value' | 'atts',         // pass the att's value (default) or the whole atts
      'when' =&gt; 'not_array'|'missing'|'always',

  'value'     → $cb( $atts[$id] )         (transform one option's value)
  'atts'      → $cb( $atts )              (build from several legacy atts, e.g. background)
  when 'not_array' (default) → runs only while the value isn't already an array
  when 'missing'            → runs only while the att is empty/unset
  when 'always'            → runs every time
A callback returning null leaves the att untouched (e.g. "no legacy data").

  $atts = sc_migrate_atts( $atts, array(
      'min_height' =&gt; 'section_migrate_min_height',                                    // scalar → multi-picker
      'background'  =&gt; array( 'cb' =&gt; 'section_migrate_legacy_background', 'arg' =&gt; 'atts', 'when' =&gt; 'missing' ),
  ) );

| Parameter | Type | Description |
| --- | --- | --- |
| `$atts` | `array` | — |
| `$specs` | `array` | — |

**Returns** `array`

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:2676`</small>

### `sc_mp_icon` {#sc_mp_icon}
*🔌 pluggable*

```php
sc_mp_icon( $picked )
```

Renders a modal-popup picked icon via the central icon renderer, falling back to inline font/upload markup.

<small>Source: `framework/extensions/shortcodes/shortcodes/modal-popup/views/view.php:19`</small>

### `sc_mp_render` {#sc_mp_render}
*🔌 pluggable*

```php
sc_mp_render( $atts )
```

Renders the modal-popup shortcode, resolving its design and the trigger button/image and modal content.

<small>Source: `framework/extensions/shortcodes/shortcodes/modal-popup/views/view.php:40`</small>

### `sc_needs_wrapper` {#sc_needs_wrapper}
*🔌 pluggable*

```php
sc_needs_wrapper( $atts )
```

Decide whether a shortcode view.php should render its wrapper element. Returns true if any of the wrapper-affecting atts are set. Filter `sc_needs_wrapper` lets future tabs opt in without per-shortcode edits.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:1829`</small>

### `sc_nl_render` {#sc_nl_render}
*🔌 pluggable*

```php
sc_nl_render( $atts )
```

Renders the newsletter shortcode, resolving its design and the title, fields, button, and consent text.

<small>Source: `framework/extensions/shortcodes/shortcodes/newsletter/views/view.php:19`</small>

### `sc_normalize_color_value` {#sc_normalize_color_value}
*🔌 pluggable*

```php
sc_normalize_color_value( $value, $kind = 'text' )
```

Normalizes a color option value into class/style parts, with the preset winning when both are set.

Resolve a Styling-tab color value (text_color / bg_color / any
inner-element color picked via sc_color_field*) to a class + style
pair the consuming view can emit verbatim.

Accepts BOTH the legacy string shape produced by `sc_color_field()`'s
plain &lt;select&gt; (`'text-red'`, `'bg-light-blue'`, `''`) AND the new
array shape produced by `sc_color_field_compact()`
(`&#123; predefined: 'text-red', custom: '' &#125;` or
 `&#123; predefined: '', custom: '#EB001B' &#125;`). This is the single
funnel both shapes flow through, so any consumer that calls this
helper supports both option-types without branching.

                     emitted when only the `custom` half is set

| Parameter | Type | Description |
| --- | --- | --- |
| `$value` | `mixed` | string\|array as described above |
| `$kind` | `string` | 'text' or 'bg' — controls the CSS property |

**Returns** `array&#123;` class: string, style: string &#125;

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:624`</small>

### `sc_notification_render_icon` {#sc_notification_render_icon}
*🔌 pluggable*

```php
sc_notification_render_icon( $custom_icon, $picked_icon, $type, $default_icons )
```

Renders a notification icon, preferring the picked icon, then a legacy custom icon, then the per-type default.

<small>Source: `framework/extensions/shortcodes/shortcodes/notification/views/view.php:88`</small>

### `sc_option_alignment` {#sc_option_alignment}
*🔌 pluggable*

```php
sc_option_alignment()
```

Returns an image-picker option group for choosing image alignment (none, float-left, and others).

<small>Source: `framework/extensions/shortcodes/includes/shortcode-option-helpers.php:971`</small>

### `sc_option_animate` {#sc_option_animate}
*🔌 pluggable*

```php
sc_option_animate()
```

Animate Options

<small>Source: `framework/extensions/shortcodes/includes/shortcode-option-helpers.php:1249`</small>

### `sc_option_bg_atts` {#sc_option_bg_atts}
*🔌 pluggable*

```php
sc_option_bg_atts($name)
```

Option attributes for background

<small>Source: `framework/extensions/shortcodes/includes/shortcode-option-helpers.php:384`</small>

### `sc_option_box` {#sc_option_box}
*🔌 pluggable*

```php
sc_option_box($label, $desc=NULL, $top=NULL, $right=NULL, $bottom=NULL, $left=NULL)
```

Margin & Padding Options

<small>Source: `framework/extensions/shortcodes/includes/shortcode-option-helpers.php:1937`</small>

### `sc_option_box_border` {#sc_option_box_border}
*🔌 pluggable*

```php
sc_option_box_border($label,$top='',$right='',$bottom='',$left='')
```

Border Options

<small>Source: `framework/extensions/shortcodes/includes/shortcode-option-helpers.php:1976`</small>

### `sc_option_box_border_radius` {#sc_option_box_border_radius}
*🔌 pluggable*

```php
sc_option_box_border_radius($label)
```

Border Radius Options

<small>Source: `framework/extensions/shortcodes/includes/shortcode-option-helpers.php:2042`</small>

### `sc_option_bs_margin` {#sc_option_bs_margin}
*🔌 pluggable*

```php
sc_option_bs_margin( $breakpoint )
```

Margin & Padding Options

<small>Source: `framework/extensions/shortcodes/includes/shortcode-option-helpers.php:1771`</small>

### `sc_option_bs_margin_choices` {#sc_option_bs_margin_choices}
*🔌 pluggable*

```php
sc_option_bs_margin_choices( $breakpoint )
```

Margin & Padding Options

<small>Source: `framework/extensions/shortcodes/includes/shortcode-option-helpers.php:1804`</small>

### `sc_option_bs_spacing` {#sc_option_bs_spacing}
*🔌 pluggable*

```php
sc_option_bs_spacing( $breakpoint )
```

Margin & Padding Options

<small>Source: `framework/extensions/shortcodes/includes/shortcode-option-helpers.php:1713`</small>

### `sc_option_bs_spacing_choices` {#sc_option_bs_spacing_choices}
*🔌 pluggable*

```php
sc_option_bs_spacing_choices( $breakpoint )
```

Margin & Padding Options

<small>Source: `framework/extensions/shortcodes/includes/shortcode-option-helpers.php:1746`</small>

### `sc_option_bs_spacing_size_choices` {#sc_option_bs_spacing_size_choices}
*🔌 pluggable*

```php
sc_option_bs_spacing_size_choices( $property, $sides, $breakpoint )
```

Margin & Padding Options

<small>Source: `framework/extensions/shortcodes/includes/shortcode-option-helpers.php:1822`</small>

### `sc_option_button_color_defaults` {#sc_option_button_color_defaults}
*🔌 pluggable*

```php
sc_option_button_color_defaults()
```

Button color default values

<small>Source: `framework/extensions/shortcodes/includes/shortcode-option-helpers.php:162`</small>

### `sc_option_button_colors` {#sc_option_button_colors}
*🔌 pluggable*

```php
sc_option_button_colors()
```

Color palette default values

<small>Source: `framework/extensions/shortcodes/includes/shortcode-option-helpers.php:215`</small>

### `sc_option_button_size_defaults` {#sc_option_button_size_defaults}
*🔌 pluggable*

```php
sc_option_button_size_defaults()
```

Button size default values

<small>Source: `framework/extensions/shortcodes/includes/shortcode-option-helpers.php:233`</small>

### `sc_option_button_sizes` {#sc_option_button_sizes}
*🔌 pluggable*

```php
sc_option_button_sizes()
```

Color palette default values

<small>Source: `framework/extensions/shortcodes/includes/shortcode-option-helpers.php:294`</small>

### `sc_option_class` {#sc_option_class}
*🔌 pluggable*

```php
sc_option_class()
```

Class

<small>Source: `framework/extensions/shortcodes/includes/shortcode-option-helpers.php:2091`</small>

### `sc_option_color_palette` {#sc_option_color_palette}
*🔌 pluggable*

```php
sc_option_color_palette()
```

Get predefined colors

<small>Source: `framework/extensions/shortcodes/includes/shortcode-option-helpers.php:89`</small>

### `sc_option_color_palette_defaults` {#sc_option_color_palette_defaults}
*🔌 pluggable*

```php
sc_option_color_palette_defaults()
```

Color palette default values

<small>Source: `framework/extensions/shortcodes/includes/shortcode-option-helpers.php:12`</small>

### `sc_option_color_picker` {#sc_option_color_picker}
*🔌 pluggable*

```php
sc_option_color_picker($label = NULL, $default = '#ffffff', $desc = NULL)
```

Color Picker

<small>Source: `framework/extensions/shortcodes/includes/shortcode-option-helpers.php:132`</small>

### `sc_option_color_select` {#sc_option_color_select}
*🔌 pluggable*

```php
sc_option_color_select( $label, $color = 'text' )
```

Color Swatch Options

<small>Source: `framework/extensions/shortcodes/includes/shortcode-option-helpers.php:107`</small>

### `sc_option_css_tag` {#sc_option_css_tag}
*🔌 pluggable*

```php
sc_option_css_tag( $label=NULL, $desc=NULL, $default='h2' )
```

CSS Tag

<small>Source: `framework/extensions/shortcodes/includes/shortcode-option-helpers.php:360`</small>

### `sc_option_custom_id` {#sc_option_custom_id}
*🔌 pluggable*

```php
sc_option_custom_id($label='CSS ID',$desc=NULL)
```

Custom ID

<small>Source: `framework/extensions/shortcodes/includes/shortcode-option-helpers.php:2077`</small>

### `sc_option_float` {#sc_option_float}
*🔌 pluggable*

```php
sc_option_float( $label = 'Alignment', $desc = 'Floats an element to the left or right, or disable floating, based on the current viewport size.' )
```

Link Options

<small>Source: `framework/extensions/shortcodes/includes/shortcode-option-helpers.php:708`</small>

### `sc_option_font_sizes` {#sc_option_font_sizes}
*🔌 pluggable*

```php
sc_option_font_sizes()
```

Color palette default values

<small>Source: `framework/extensions/shortcodes/includes/shortcode-option-helpers.php:312`</small>

### `sc_option_hover_2d` {#sc_option_hover_2d}
*🔌 pluggable*

```php
sc_option_hover_2d()
```

2D Hover Option

<small>Source: `framework/extensions/shortcodes/includes/shortcode-option-helpers.php:782`</small>

### `sc_option_hover_background` {#sc_option_hover_background}
*🔌 pluggable*

```php
sc_option_hover_background()
```

Background Hover Option

<small>Source: `framework/extensions/shortcodes/includes/shortcode-option-helpers.php:829`</small>

### `sc_option_hover_border` {#sc_option_hover_border}
*🔌 pluggable*

```php
sc_option_hover_border()
```

Border Hover Option

<small>Source: `framework/extensions/shortcodes/includes/shortcode-option-helpers.php:865`</small>

### `sc_option_hover_curls` {#sc_option_hover_curls}
*🔌 pluggable*

```php
sc_option_hover_curls()
```

Curls Hover Option

<small>Source: `framework/extensions/shortcodes/includes/shortcode-option-helpers.php:951`</small>

### `sc_option_hover_shadow` {#sc_option_hover_shadow}
*🔌 pluggable*

```php
sc_option_hover_shadow()
```

Shadow and Glow Hover Option

<small>Source: `framework/extensions/shortcodes/includes/shortcode-option-helpers.php:900`</small>

### `sc_option_hover_speech_bubbles` {#sc_option_hover_speech_bubbles}
*🔌 pluggable*

```php
sc_option_hover_speech_bubbles()
```

Speech Bubbles Hover Option

<small>Source: `framework/extensions/shortcodes/includes/shortcode-option-helpers.php:925`</small>

### `sc_option_link` {#sc_option_link}
*🔌 pluggable*

```php
sc_option_link()
```

Link Options

<small>Source: `framework/extensions/shortcodes/includes/shortcode-option-helpers.php:594`</small>

### `sc_option_margin` {#sc_option_margin}
*🔌 pluggable*

```php
sc_option_margin()
```

Margin & Padding Options

<small>Source: `framework/extensions/shortcodes/includes/shortcode-option-helpers.php:1863`</small>

### `sc_option_spacing` {#sc_option_spacing}
*🔌 pluggable*

```php
sc_option_spacing( $default = NULL )
```

Spacing Options

<small>Source: `framework/extensions/shortcodes/includes/shortcode-option-helpers.php:1635`</small>

### `sc_option_text_alignment` {#sc_option_text_alignment}
*🔌 pluggable*

```php
sc_option_text_alignment()
```

Options for Text Alignment

<small>Source: `framework/extensions/shortcodes/includes/shortcode-option-helpers.php:1207`</small>

### `sc_option_text_transform` {#sc_option_text_transform}
*🔌 pluggable*

```php
sc_option_text_transform($label=NULL,$desc=NULL)
```

Text Transformation

<small>Source: `framework/extensions/shortcodes/includes/shortcode-option-helpers.php:339`</small>

### `sc_option_visibility` {#sc_option_visibility}
*🔌 pluggable*

```php
sc_option_visibility()
```

Visibility Options

<small>Source: `framework/extensions/shortcodes/includes/shortcode-option-helpers.php:1483`</small>

### `sc_options_add_scss` {#sc_options_add_scss}
*🔌 pluggable*

```php
sc_options_add_scss($atts,$scss)
```

Get the ID

<small>Source: `framework/extensions/shortcodes/includes/shortcode-option-helpers.php:2118`</small>

### `sc_options_get_id` {#sc_options_get_id}
*🔌 pluggable*

```php
sc_options_get_id($shortcode,$id,$custom_id)
```

Get the ID

<small>Source: `framework/extensions/shortcodes/includes/shortcode-option-helpers.php:2104`</small>

### `sc_options_get_user_visibility` {#sc_options_get_user_visibility}
*🔌 pluggable*

```php
sc_options_get_user_visibility($atts)
```

Get Visibility Options

<small>Source: `framework/extensions/shortcodes/includes/shortcode-option-helpers.php:1546`</small>

### `sc_options_vertical_center_container` {#sc_options_vertical_center_container}
*🔌 pluggable*

```php
sc_options_vertical_center_container($atts,$tag)
```

Get the image from options

<small>Source: `framework/extensions/shortcodes/includes/shortcode-option-helpers.php:1229`</small>

### `sc_plugin_provides_settings_ui` {#sc_plugin_provides_settings_ui}
*🔌 pluggable*

```php
sc_plugin_provides_settings_ui()
```

The plugin always provides the preset editor now — the Shortcodes extension Settings form (settings-options.php), stored theme-independently. So a Settings UI is always reachable regardless of the active theme. (Formerly defined in the now-removed shortcode-options/loader.php.)

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:128`</small>

### `sc_position_style` {#sc_position_style}
*🔌 pluggable*

```php
sc_position_style( $atts )
```

Build the inline CSS for the shared "Position" control (Advanced tab → element_position, a multi-picker). Emits position + offsets + z-index ONLY for a positioned value; offsets and z-index are omitted for static (they do nothing there). Offset values are whitelisted to safe CSS lengths (px/%/em/rem/vh/vw/vmin/vmax, auto, 0, negatives) so nothing arbitrary reaches style.

| Parameter | Type | Description |
| --- | --- | --- |
| `$atts` | `array` | shortcode atts |

**Returns** `string` e.g. "position:absolute;top:20px;right:0;z-index:5;" or '' when Default/Static-less.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-build-helper.php:149`</small>

### `sc_posts_build_query_args` {#sc_posts_build_query_args}
*🔌 pluggable*

```php
sc_posts_build_query_args( $atts, $paged = 1 )
```

Builds the WP_Query args for the posts shortcode from its atts and the current page number.

<small>Source: `framework/extensions/shortcodes/shortcodes/posts/views/view.php:200`</small>

### `sc_posts_card_registry` {#sc_posts_card_registry}
*🔌 pluggable*

```php
sc_posts_card_registry()
```

Returns the memoized posts card-design registry loaded from the parts registry file.

<small>Source: `framework/extensions/shortcodes/shortcodes/posts/views/view.php:87`</small>

### `sc_posts_dp` {#sc_posts_dp}
*🔌 pluggable*

```php
sc_posts_dp( $atts, $new_path, $old_flat, $default = '' )
```

Reads a posts att by new nested path, falling back to the legacy flat key then a default.

<small>Source: `framework/extensions/shortcodes/shortcodes/posts/views/view.php:34`</small>

### `sc_posts_gap_size` {#sc_posts_gap_size}
*🔌 pluggable*

```php
sc_posts_gap_size( $val )
```

Resolves a posts gap value to a CSS size from a Gap Scale preset slug or a legacy px value.

<small>Source: `framework/extensions/shortcodes/shortcodes/posts/views/view.php:52`</small>

### `sc_posts_get_ordered_slugs` {#sc_posts_get_ordered_slugs}
*🔌 pluggable*

```php
sc_posts_get_ordered_slugs( $atts, $exclude = [] )
```

Returns the ordered, enabled card-block slugs (from the Card Rows designer, else element_order, else defaults), minus any excluded ones.

<small>Source: `framework/extensions/shortcodes/shortcodes/posts/views/view.php:642`</small>

### `sc_posts_locate_part` {#sc_posts_locate_part}
*🔌 pluggable*

```php
sc_posts_locate_part( $slug )
```

Resolves a card template part by slug, preferring child theme then parent theme then the bundled view.

<small>Source: `framework/extensions/shortcodes/shortcodes/posts/views/view.php:178`</small>

### `sc_posts_normalize_atts` {#sc_posts_normalize_atts}
*🔌 pluggable*

```php
sc_posts_normalize_atts( $atts )
```

Resolves picker-moved options (design/card/pagination/readmore groups) back to flat att keys and derives responsive column counts.

<small>Source: `framework/extensions/shortcodes/shortcodes/posts/views/view.php:107`</small>

### `sc_posts_render` {#sc_posts_render}
*🔌 pluggable*

```php
sc_posts_render( $atts )
```

Renders the full Posts shortcode markup from its atts (query, layout, cards, pagination, filters, slider).

<small>Source: `framework/extensions/shortcodes/shortcodes/posts/views/view.php:792`</small>

### `sc_posts_render_block` {#sc_posts_render_block}
*🔌 pluggable*

```php
sc_posts_render_block( $slug, $atts, $post_id, $cat_overlay_html = '' )
```

Renders a single card block by slug (image, cats, title, meta, excerpt, readmore).

<small>Source: `framework/extensions/shortcodes/shortcodes/posts/views/view.php:585`</small>

### `sc_posts_render_body_rows` {#sc_posts_render_body_rows}
*🔌 pluggable*

```php
sc_posts_render_body_rows( $atts, $post_id, $exclude = [ 'image' ] )
```

Renders a card's body blocks grouped into the designed Card Rows, excluding the image, with a flat-stack fallback.

<small>Source: `framework/extensions/shortcodes/shortcodes/posts/views/view.php:608`</small>

### `sc_posts_render_card` {#sc_posts_render_card}
*🔌 pluggable*

```php
sc_posts_render_card( $atts, $post_id, $card_style, $index = 0 )
```

Renders one post card by including the template part mapped to the given card style.

<small>Source: `framework/extensions/shortcodes/shortcodes/posts/views/view.php:701`</small>

### `sc_posts_render_cards` {#sc_posts_render_cards}
*🔌 pluggable*

```php
sc_posts_render_cards( $atts, $posts_list, $start_index = 0 )
```

Renders the inner card markup for a list of posts, applying first-post, alternate, and featured treatments.

<small>Source: `framework/extensions/shortcodes/shortcodes/posts/views/view.php:730`</small>

### `sc_posts_render_cats` {#sc_posts_render_cats}
*🔌 pluggable*

```php
sc_posts_render_cats( $atts, $post_id )
```

Renders category/taxonomy chip links for a post, honoring the block toggle, taxonomy, and max-count options.

<small>Source: `framework/extensions/shortcodes/shortcodes/posts/views/view.php:410`</small>

### `sc_posts_render_excerpt` {#sc_posts_render_excerpt}
*🔌 pluggable*

```php
sc_posts_render_excerpt( $atts, $post_id )
```

Renders a post's excerpt from the chosen source, trimmed to the configured word length and suffix.

<small>Source: `framework/extensions/shortcodes/shortcodes/posts/views/view.php:492`</small>

### `sc_posts_render_filter_bar` {#sc_posts_render_filter_bar}
*🔌 pluggable*

```php
sc_posts_render_filter_bar( $atts )
```

Renders the AJAX category filter bar of buttons for the chosen taxonomy's terms.

<small>Source: `framework/extensions/shortcodes/shortcodes/posts/views/view.php:1058`</small>

### `sc_posts_render_image` {#sc_posts_render_image}
*🔌 pluggable*

```php
sc_posts_render_image( $atts, $post_id, $cat_overlay_html = '' )
```

Renders a post's featured image (or fallback) as a permalink anchor with ratio, image-style preset, and optional category overlay.

<small>Source: `framework/extensions/shortcodes/shortcodes/posts/views/view.php:442`</small>

### `sc_posts_render_meta` {#sc_posts_render_meta}
*🔌 pluggable*

```php
sc_posts_render_meta( $atts, $post_id )
```

Renders a post's meta bar (date, author, comments, reading time) in the chosen layout and separator style.

<small>Source: `framework/extensions/shortcodes/shortcodes/posts/views/view.php:315`</small>

### `sc_posts_render_pagination` {#sc_posts_render_pagination}
*🔌 pluggable*

```php
sc_posts_render_pagination( $query, $align )
```

Renders numbered pagination links for the query within an aligned nav wrapper.

<small>Source: `framework/extensions/shortcodes/shortcodes/posts/views/view.php:1036`</small>

### `sc_posts_render_readmore` {#sc_posts_render_readmore}
*🔌 pluggable*

```php
sc_posts_render_readmore( $atts, $post_id )
```

Renders a post's read-more link in the chosen style with a visually-hidden title for accessible, crawlable link text.

<small>Source: `framework/extensions/shortcodes/shortcodes/posts/views/view.php:519`</small>

### `sc_posts_render_title` {#sc_posts_render_title}
*🔌 pluggable*

```php
sc_posts_render_title( $atts, $post_id )
```

Renders a post's title as a permalink-linked heading using the configured tag.

<small>Source: `framework/extensions/shortcodes/shortcodes/posts/views/view.php:566`</small>

### `sc_posts_slug_enabled` {#sc_posts_slug_enabled}
*🔌 pluggable*

```php
sc_posts_slug_enabled( $atts, $slug )
```

Is a card block explicitly enabled in the Elements → block list? Checks the raw `element_order` (independent of the self-heal in sc_posts_get_ordered_slugs) so a single block can be toggled off. Returns true when the list is empty (defaults = all on) or the slug is absent (forward-compatible with blocks added after a saved order).

<small>Source: `framework/extensions/shortcodes/shortcodes/posts/views/view.php:395`</small>

### `sc_pt_icon` {#sc_pt_icon}
*🔌 pluggable*

```php
sc_pt_icon( $picked )
```

Renders a picked icon (via the central icon renderer, or icon-font/upload fallback) for the pricing table.

<small>Source: `framework/extensions/shortcodes/shortcodes/pricing-table/views/view.php:23`</small>

### `sc_pt_render` {#sc_pt_render}
*🔌 pluggable*

```php
sc_pt_render( $atts )
```

Renders the Pricing Table shortcode from its atts, resolving the design skin, plans, columns, and featured emphasis.

<small>Source: `framework/extensions/shortcodes/shortcodes/pricing-table/views/view.php:44`</small>

### `sc_rating_star_paths` {#sc_rating_star_paths}
*🔌 pluggable*

```php
sc_rating_star_paths()
```

Symbol key =&gt; &#123; vb: viewBox, d: filled path &#125;. Filterable to add shapes.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:3541`</small>

### `sc_rating_stars` {#sc_rating_stars}
*🔌 pluggable*

```php
sc_rating_stars( $rating, $args = array() )
```

Render a two-tone rating (gray base row + filled row overlaid and clipped to the value, so fractional ratings show a partial last symbol). Self-contained: the symbol &lt;symbol&gt; sprite and the base CSS are printed once per request.

color value or CSS string), size (sm|md|lg|CSS length), label.

| Parameter | Type | Description |
| --- | --- | --- |
| `$rating` | `float` | 0..max. |
| `$args` | `array` | max (5), symbol (star\|heart\|circle\|…), fill/empty (compact |

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:3561`</small>

### `sc_rating_style_field` {#sc_rating_style_field}
*🔌 pluggable*

```php
sc_rating_style_field( $args = array() )
```

Reusable "Rating style" options (Symbol + Filled/Empty color + Size) for any star-showing element. Returns an option-id =&gt; option-def array to merge into a group. Read the saved values back with sc_rating_style_from_atts().

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:3627`</small>

### `sc_rating_style_from_atts` {#sc_rating_style_from_atts}
*🔌 pluggable*

```php
sc_rating_style_from_atts( $atts, $prefix = 'rating_' )
```

Pull the sc_rating_style_field values from an element's atts → sc_rating_stars() args.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:3673`</small>

### `sc_remove_styling_options` {#sc_remove_styling_options}
*🔌 pluggable*

```php
sc_remove_styling_options( $options )
```

Recursively drop the `tab_styling` tab and any preset-picker option (button-style-picker / border-style-picker / table-style-picker), and prune containers (tab/box/group) that become empty as a result.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:2451`</small>

### `sc_render_card` {#sc_render_card}
*🔌 pluggable*

```php
sc_render_card( $t, $args )
```

Renders a single testimonial card with the configured style, alignment, avatar, rating, and per-element color options.

<small>Source: `framework/extensions/shortcodes/shortcodes/testimonials/static.php:202`</small>

### `sc_render_rating` {#sc_render_rating}
*🔌 pluggable*

```php
sc_render_rating( $rating )
```

Renders a star rating for a value 0-5 via the shared rating engine, falling back to inline SVG stars.

<small>Source: `framework/extensions/shortcodes/shortcodes/testimonials/static.php:151`</small>

### `sc_render_rating_set_style` {#sc_render_rating_set_style}
*🔌 pluggable*

```php
sc_render_rating_set_style( $style = null )
```

Stores and returns the request-scoped testimonial rating style so every design partial reuses it.

<small>Source: `framework/extensions/shortcodes/shortcodes/testimonials/static.php:138`</small>

### `sc_sanitize_class` {#sc_sanitize_class}
*🔌 pluggable*

```php
sc_sanitize_class( $value )
```

Sanitize a string for safe use as a CSS class name. Allowed: a-z A-Z 0-9 _ -. Everything else is stripped.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:46`</small>

### `sc_section_align_fields` {#sc_section_align_fields}
*🔌 pluggable*

```php
sc_section_align_fields( $noun = 'section' )
```

Returns the column horizontal/vertical align and reverse-columns option definitions, with SVG thumbnails, worded for the given host noun.

The shared "columns alignment" option fields — Columns Horizontal Alignment
(`column_halign`), Columns Vertical Alignment (`column_valign`) and Column
Order / reverse (`reverse_columns`) — with their baked-in image-picker glyphs.

Extracted from the Section shortcode so ANY grid-holding container (Section,
Container, …) can offer the exact same controls without duplicating the ~90
lines of SVG glyph code. The emitted values route through the shared
`.section--cols-*` / `.section--rev*` modifier classes (class-only descendant
selectors in section/static/css/styles.css), so an element only needs to stamp
those classes onto a wrapper whose descendant `.fw-row`(s) should react.

                     "container", …) so the help text reads naturally per host.

| Parameter | Type | Description |
| --- | --- | --- |
| `$noun` | `string` | The element noun woven into the descriptions ("section", |

**Returns** `array` &#123; column_halign, column_valign, reverse_columns &#125; option defs.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:916`</small>

### `sc_section_background_effects` {#sc_section_background_effects}
*🔌 pluggable*

```php
sc_section_background_effects()
```

Returns the filterable registry of custom Section-Background effects, cached per request.

The registry of custom Section-Background effects. A child theme / plugin adds
its own from `functions.php` via the `sc_section_background_effects` filter:

  add_filter( 'sc_section_background_effects', function ( $effects ) &#123;
      $effects['starfield'] = array(
          'label'  =&gt; 'Starfield',
          'css'    =&gt; get_stylesheet_directory_uri() . '/bg-effects/starfield.css',
          'js'     =&gt; get_stylesheet_directory_uri() . '/bg-effects/starfield.js',
          'ver'    =&gt; '1.0.0',                 // optional (cache-bust)
          'deps'   =&gt; array(),                 // optional extra script deps
          'class'  =&gt; '',                      // optional extra wrapper class
          'render' =&gt; function ( $args ) &#123;     // optional inner markup
              return '&lt;canvas class="starfield-canvas"&gt;&lt;/canvas&gt;';
          &#125;,
      );
      return $effects;
  &#125; );

Each effect's `css`/`js` load ON DEMAND (only when the effect is actually used
on a page), depending on the shared `sc-bg-fill` runtime.

**Returns** `array[]` keyed by effect id.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-background-helper.php:144`</small>

### `sc_section_background_enqueue_runtime` {#sc_section_background_enqueue_runtime}

```php
sc_section_background_enqueue_runtime()
```

On-demand enqueue of the shared runtime — only when a section background actually rendered on this page (mirrors the Animation helper's wp_footer/priority-5 model).

<small>Source: `framework/extensions/shortcodes/includes/shortcode-background-helper.php:197`</small>

### `sc_section_background_field` {#sc_section_background_field}
*🔌 pluggable*

```php
sc_section_background_field( $args = array() )
```

The reusable "Use as Section Background" switch. Drop it straight into an options array. Override label / desc / help / value via $args as needed.

| Parameter | Type | Description |
| --- | --- | --- |
| `$args` | `array` | label, desc, help, value ('yes'/'no', default 'no'). |

**Returns** `array` Unyson `switch` option definition.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-background-helper.php:47`</small>

### `sc_section_background_flag` {#sc_section_background_flag}
*🔌 pluggable*

```php
sc_section_background_flag()
```

Returns whether any Section background fill was used on the current page.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-background-helper.php:98`</small>

### `sc_section_background_is_on` {#sc_section_background_is_on}
*🔌 pluggable*

```php
sc_section_background_is_on( $value )
```

Tolerant truthiness for a switch value ('yes' / true / '1' / 1).

<small>Source: `framework/extensions/shortcodes/includes/shortcode-background-helper.php:71`</small>

### `sc_section_background_render` {#sc_section_background_render}
*🔌 pluggable*

```php
sc_section_background_render( $effect_id, $args = array() )
```

Render a registered custom effect as a Section backdrop. Output it INSIDE a `&lt;section&gt;` (e.g. from a template, a Theme Builder block, or a custom shortcode's view) — the shared runtime lifts it to fill the Section, behind the content.

Registers the flag + records the effect so its assets enqueue on demand.

| Parameter | Type | Description |
| --- | --- | --- |
| `$effect_id` | `string` | key registered via the `sc_section_background_effects` filter. |
| `$args` | `array` | passed to the effect's `render` callback. |

**Returns** `string` backdrop HTML (empty string if the effect isn't registered).

<small>Source: `framework/extensions/shortcodes/includes/shortcode-background-helper.php:167`</small>

### `sc_section_background_use` {#sc_section_background_use}
*🔌 pluggable*

```php
sc_section_background_use( $effect = '' )
```

Flag the current page as using the section-background feature, so the shared runtime (JS + CSS) is enqueued in wp_footer. Call once per element that renders with the toggle ON.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-background-helper.php:82`</small>

### `sc_section_background_used_effects` {#sc_section_background_used_effects}
*🔌 pluggable*

```php
sc_section_background_used_effects()
```

The named custom effects that rendered on this page (keys passed to sc_section_background_use()).

**Returns** `string[]`

<small>Source: `framework/extensions/shortcodes/includes/shortcode-background-helper.php:110`</small>

### `sc_section_dynamic_css` {#sc_section_dynamic_css}
*🔌 pluggable*

```php
sc_section_dynamic_css( $atts, $scope )
```

Builds per-page CSS for a section's custom min-height and container-width values (named presets use utility classes instead).

Per-instance Section styling that would otherwise be written as INLINE style="…" on the markup —
the section's Min Height and Container Width — resolved to a scoped CSS rule targeting the element's
`.u&#123;hash&#125;` scope class, so it rides the per-page dynamic CSS FILE (dynamic-css.php) instead of the
HTML. Both the front-end view (to decide whether to add the scope class) and the CSS aggregator (to
emit the rule) call this, so they stay byte-identical. Presets AND custom values both route here —
nothing about section sizing lands inline anymore.

  Min Height    → `.u&#123;hash&#125;&#123;min-height:&lt;preset-vh | custom value&gt;&#125;`
  Container Width → `.u&#123;hash&#125; .fw-container&#123;max-width:calc(&lt;w&gt; + 2*gutter)&#125;`  (beats the grid's
                    `body .fw-container` at 0,2,0 vs 0,1,1, the reason this used to need inline)

| Parameter | Type | Description |
| --- | --- | --- |
| `$atts` | `array` | section shortcode atts (expects min_height / container_width / unique_id) |
| `$scope` | `string` | the element scope class (sc_element_scope_class), without the leading dot |

**Returns** `string` CSS (no &lt;style&gt; tag), or '' when the section sets neither.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-build-helper.php:95`</small>

### `sc_smooth_scroll_enqueue` {#sc_smooth_scroll_enqueue}
*🔌 pluggable*

```php
sc_smooth_scroll_enqueue()
```

Conditionally enqueue Lenis + the initializer when the current singular page has Smooth Scroll switched on.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-smooth-scroll.php:65`</small>

### `sc_smooth_scroll_post_option` {#sc_smooth_scroll_post_option}
*🔌 pluggable*

```php
sc_smooth_scroll_post_option( $options, $post_type )
```

Per-page toggle in the post editor. Defaults to a side metabox on Pages and Posts; the post-type list is filterable.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-smooth-scroll.php:25`</small>

### `sc_spacing_field` {#sc_spacing_field}
*🔌 pluggable*

```php
sc_spacing_field( $args = array() )
```

Build a single Bootstrap-spacing select field for the Styling tab.

'margin'    =&gt; sc_spacing_field( array( 'label' =&gt; __( 'Margin', 'fw' ),    'prefix' =&gt; 'm' ) ),
  'padding_y' =&gt; sc_spacing_field( array( 'label' =&gt; __( 'Padding Y', 'fw' ), 'prefix' =&gt; 'py' ) ),

`prefix` is the Bootstrap utility shorthand: 'm', 'mt', 'mb', 'ms', 'me', 'mx', 'my',
'p', 'pt', 'pb', 'ps', 'pe', 'px', 'py'. The dropdown values become Bootstrap class
names (e.g. 'm-3', 'py-2') which the spacing-override block in css-tokens.php
makes site-customizable via Theme Settings → General → Spacing.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:844`</small>

### `sc_spacing_has_value` {#sc_spacing_has_value}
*🔌 pluggable*

```php
sc_spacing_has_value( $spacing )
```

True iff a `spacing` att has at least one non-empty leaf — i.e. the user actually picked a margin or padding value. The full default value tree (every slot empty) is the same as "no value", so a naive `! empty()` on the att would falsely say "has value" and force the wrapper to render.

Used by sc_needs_wrapper.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:450`</small>

### `sc_sr_render` {#sc_sr_render}
*🔌 pluggable*

```php
sc_sr_render( $atts )
```

Renders the Star Rating shortcode from its atts, resolving the design, max, rating value, label, and size.

<small>Source: `framework/extensions/shortcodes/shortcodes/star-rating/views/view.php:34`</small>

### `sc_sr_symbol` {#sc_sr_symbol}
*🔌 pluggable*

```php
sc_sr_symbol( $design )
```

Returns the inline SVG symbol markup (star, heart, or circle) for the given rating design.

<small>Source: `framework/extensions/shortcodes/shortcodes/star-rating/views/view.php:19`</small>

### `sc_ss_render` {#sc_ss_render}
*🔌 pluggable*

```php
sc_ss_render( $atts )
```

Renders the Social Share shortcode from its atts, resolving the design, selected networks, and share URL/title.

<small>Source: `framework/extensions/shortcodes/shortcodes/social-share/views/view.php:19`</small>

### `sc_steps_icon` {#sc_steps_icon}
*🔌 pluggable*

```php
sc_steps_icon( $picked )
```

Renders a picked icon (via the central icon renderer, or icon-font/upload fallback) for a step.

<small>Source: `framework/extensions/shortcodes/shortcodes/steps/views/view.php:19`</small>

### `sc_steps_render` {#sc_steps_render}
*🔌 pluggable*

```php
sc_steps_render( $atts )
```

Renders the Steps shortcode from its atts, resolving the design and the list of steps.

<small>Source: `framework/extensions/shortcodes/shortcodes/steps/views/view.php:40`</small>

### `sc_stt_render` {#sc_stt_render}
*🔌 pluggable*

```php
sc_stt_render( $atts )
```

Renders the Scroll-to-Top shortcode (button and/or progress bar) from its position, shape, size, and color atts.

<small>Source: `framework/extensions/shortcodes/shortcodes/scroll-to-top/views/view.php:19`</small>

### `sc_styling_att_keys` {#sc_styling_att_keys}
*🔌 pluggable*

```php
sc_styling_att_keys()
```

Single source of truth for the att keys that the Styling tab produces. Used by sc_needs_wrapper() and sc_apply_styling_classes() so adding a new field only requires updating one place.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:1796`</small>

### `sc_styling_help_text` {#sc_styling_help_text}
*🔌 pluggable*

```php
sc_styling_help_text( $context )
```

Returns the localised `help` tooltip string for a Styling-tab preset picker. Switches between two wordings: - A (theme provides Settings UI) → "Add more in Shortcode Settings → …" - B (theme does not) → "Install the Unyson+ Theme to manage … visually."

'button_style', 'button_outline', 'button_size'.

| Parameter | Type | Description |
| --- | --- | --- |
| `$context` | `string` | One of: 'color', 'font_size', 'spacing', |

**Returns** `string` HTML-safe help string with a single anchor.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:144`</small>

### `sc_svg_attachment_metadata` {#sc_svg_attachment_metadata}

```php
sc_svg_attachment_metadata( $metadata, $attachment_id )
```

WordPress generates NO metadata for SVG attachments, which breaks the admin: the grid shows no thumbnail, Edit Media says "Image data does not exist", and image functions return no dimensions. Provide metadata from the SVG's own width/height/viewBox so SVGs behave like normal images.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:3460`</small>

### `sc_svg_check_filetype` {#sc_svg_check_filetype}

```php
sc_svg_check_filetype( $data, $file, $filename, $mimes )
```

Filters WordPress filetype detection to accept .svg as image/svg+xml when SVG uploads are allowed.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:3397`</small>

### `sc_svg_file_dimensions` {#sc_svg_file_dimensions}

```php
sc_svg_file_dimensions( $file )
```

Read an SVG file's intrinsic dimensions: width/height attributes first, else the viewBox, else the SVG default 300x150.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:3438`</small>

### `sc_svg_image_downsize` {#sc_svg_image_downsize}

```php
sc_svg_image_downsize( $out, $attachment_id, $size )
```

wp_get_attachment_image()/image_downsize(): serve the SVG itself at its intrinsic size.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:3498`</small>

### `sc_svg_mime_type_icon` {#sc_svg_mime_type_icon}

```php
sc_svg_mime_type_icon( $icon, $mime, $post_id )
```

The Edit-Media screen (and any other surface that falls back to a mime icon) gates its real preview on wp_attachment_is_image(), whose extension whitelist excludes svg. Serve the SVG itself as its own "icon" so those surfaces preview the actual artwork instead of a generic document glyph.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:3520`</small>

### `sc_svg_prepare_attachment_js` {#sc_svg_prepare_attachment_js}

```php
sc_svg_prepare_attachment_js( $response, $attachment )
```

Media-modal / grid JS payload: give SVGs a usable preview + dimensions.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:3479`</small>

### `sc_svg_sanitize_upload` {#sc_svg_sanitize_upload}

```php
sc_svg_sanitize_upload( $file )
```

Prefilters SVG uploads to enforce admin permission and sanitize the file, rejecting anything that fails.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:3407`</small>

### `sc_svg_upload_allowed` {#sc_svg_upload_allowed}

```php
sc_svg_upload_allowed()
```

Returns whether the current context may upload SVGs (manage_options capability or the filter override).

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:3382`</small>

### `sc_svg_upload_mimes` {#sc_svg_upload_mimes}
*🔌 pluggable*

```php
sc_svg_upload_mimes( $mimes )
```

Adds the SVG MIME type to the allowed upload types when SVG uploads are permitted for the current context.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:3388`</small>

### `sc_testimonial_fields` {#sc_testimonial_fields}
*🔌 pluggable*

```php
sc_testimonial_fields( $t )
```

Extracts a testimonial item's fields (content, author, job, site, rating, avatar) with safe defaults for the design templates.

<small>Source: `framework/extensions/shortcodes/shortcodes/testimonials/static.php:118`</small>

### `sc_testimonial_quote_html` {#sc_testimonial_quote_html}
*🔌 pluggable*

```php
sc_testimonial_quote_html( $content )
```

Sanitizes a testimonial quote to a safe inline subset (bold/italic/link/break) and converts newlines to &lt;br&gt;.

<small>Source: `framework/extensions/shortcodes/shortcodes/testimonials/static.php:95`</small>

### `sc_text_block_dropcap_wrap` {#sc_text_block_dropcap_wrap}
*🔌 pluggable*

```php
sc_text_block_dropcap_wrap( $html, $chars, $cap_style )
```

Wraps the first N letters of the HTML in a drop-cap span, honoring leading tags and entities, with no JavaScript.

<small>Source: `framework/extensions/shortcodes/shortcodes/text-block/views/view.php:19`</small>

### `sc_theme_provides_settings_ui` {#sc_theme_provides_settings_ui}
*🔌 pluggable*

```php
sc_theme_provides_settings_ui()
```

True if the active theme (parent or directly active) ships the Unyson+-style Theme Settings UI (Color Presets / Typography / Spacing / Buttons tabs). Default: only `unysonplus-theme` matches. Third-party themes that re-implement those tabs should hook the `sc_theme_provides_settings_ui` filter and return true — they should also hook `sc_theme_settings_url` to point at their own URL.

Cached per-request: theme can't change mid-request.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:108`</small>

### `sc_theme_settings_url` {#sc_theme_settings_url}
*🔌 pluggable*

```php
sc_theme_settings_url( $context = '' )
```

Returns a URL to the Theme Settings page, optionally scrolled to a tab. Used in field help-text links so users can jump from a shortcode picker directly to where they can ADD MORE presets.

Contexts and corresponding tab anchors on unysonplus-theme:
  'colors'     → tab_colors      (Color Presets)
  'typography' → tab_typography  (Font sizes live here)
  'spacing'    → tab_spacing     (Spacing Scale)
  'buttons'    → tab_button      (Button Color Presets + Sizes)

Filterable via `sc_theme_settings_url` so non-unysonplus themes can
point at their own settings page / different tab IDs.

<small>Source: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:74`</small>

### `sc_tl_icon` {#sc_tl_icon}
*🔌 pluggable*

```php
sc_tl_icon( $picked )
```

Renders a timeline item's picked icon via the central icon renderer, with a minimal font/upload fallback.

<small>Source: `framework/extensions/shortcodes/shortcodes/timeline/views/view.php:19`</small>

### `sc_tl_render` {#sc_tl_render}
*🔌 pluggable*

```php
sc_tl_render( $atts )
```

Renders the tag-list shortcode, parsing one item per line (with optional "Label | URL" links) into linked tags.

<small>Source: `framework/extensions/shortcodes/shortcodes/tag-list/views/view.php:9`</small>

### `sc_tt_icon` {#sc_tt_icon}
*🔌 pluggable*

```php
sc_tt_icon( $picked )
```

Renders a tooltip trigger's picked icon via the central icon renderer, with a minimal font/upload fallback.

<small>Source: `framework/extensions/shortcodes/shortcodes/tooltip/views/view.php:19`</small>

### `sc_tt_render` {#sc_tt_render}
*🔌 pluggable*

```php
sc_tt_render( $atts )
```

Renders the tooltip shortcode, resolving the design and building the trigger and tip content markup.

<small>Source: `framework/extensions/shortcodes/shortcodes/tooltip/views/view.php:40`</small>

### `sc_vp_parse` {#sc_vp_parse}
*🔌 pluggable*

```php
sc_vp_parse( $url )
```

Resolve a video URL to [ type, src ] where type is youtube|vimeo|file.

<small>Source: `framework/extensions/shortcodes/shortcodes/video-popup/views/view.php:19`</small>

### `sc_vp_render` {#sc_vp_render}
*🔌 pluggable*

```php
sc_vp_render( $atts )
```

Renders the video-popup shortcode, resolving the design, poster image, and parsed video source.

<small>Source: `framework/extensions/shortcodes/shortcodes/video-popup/views/view.php:34`</small>

### `unysonplus_components_color_choices` {#unysonplus_components_color_choices}
*🔌 pluggable*

```php
unysonplus_components_color_choices()
```

Compact-color-picker choices from the current Color Presets: slug =&gt; array( 'label' =&gt; Name, 'color' =&gt; #hex ) Wired into every preset's color fields; css-tokens.php resolves the saved slug back to a hex when emitting CSS.

<small>Source: `framework/extensions/shortcodes/includes/components-options.php:32`</small>

### `unysonplus_components_settings_options` {#unysonplus_components_settings_options}
*🔌 pluggable*

```php
unysonplus_components_settings_options()
```

Builds the Components theme-settings options tree (color and gap defaults) for the settings page.

<small>Source: `framework/extensions/shortcodes/includes/components-options.php:48`</small>

### `upw_sc_lib_ajax_manage` {#upw_sc_lib_ajax_manage}

```php
upw_sc_lib_ajax_manage()
```

AJAX handler to install, uninstall, or refresh shortcode-library items, returning the updated item/installed lists.

<small>Source: `framework/extensions/shortcodes/includes/library/installer.php:256`</small>

### `upw_sc_lib_bundled_catalog` {#upw_sc_lib_bundled_catalog}

```php
upw_sc_lib_bundled_catalog()
```

Bundled fallback catalog shipped beside this installer, so the gallery works offline.

<small>Source: `framework/extensions/shortcodes/includes/library/installer.php:41`</small>

### `upw_sc_lib_catalog` {#upw_sc_lib_catalog}

```php
upw_sc_lib_catalog( $force = false )
```

The gallery catalog: remote fetch (12h transient) with the bundled catalog as fallback. Adds `_catalog_ok` = whether the remote (not just the fallback) was reachable.

<small>Source: `framework/extensions/shortcodes/includes/library/installer.php:90`</small>

### `upw_sc_lib_catalog_url` {#upw_sc_lib_catalog_url}

```php
upw_sc_lib_catalog_url()
```

Remote catalog URL (filterable so a dev can point at a local copy for testing).

<small>Source: `framework/extensions/shortcodes/includes/library/installer.php:21`</small>

### `upw_sc_lib_install` {#upw_sc_lib_install}

```php
upw_sc_lib_install( $slug )
```

Download + install ONE shortcode by slug: fetch its zip, verify sha256, extract into the theme's shortcodes customization tree (atomic). Returns true or WP_Error.

<small>Source: `framework/extensions/shortcodes/includes/library/installer.php:153`</small>

### `upw_sc_lib_install_dir` {#upw_sc_lib_install_dir}

```php
upw_sc_lib_install_dir()
```

Install target: the ACTIVE theme's shortcodes customization tree (loader auto-registers here).

<small>Source: `framework/extensions/shortcodes/includes/library/installer.php:30`</small>

### `upw_sc_lib_installed_slugs` {#upw_sc_lib_installed_slugs}

```php
upw_sc_lib_installed_slugs()
```

Slugs currently installed in the theme's shortcodes customization tree (folder + config.php).

<small>Source: `framework/extensions/shortcodes/includes/library/installer.php:120`</small>

### `upw_sc_lib_installer_payload` {#upw_sc_lib_installer_payload}

```php
upw_sc_lib_installer_payload()
```

Data localized to the gallery JS.

<small>Source: `framework/extensions/shortcodes/includes/library/installer.php:232`</small>

### `upw_sc_lib_items` {#upw_sc_lib_items}

```php
upw_sc_lib_items()
```

Merged gallery items, each tagged with state: installed | available.

<small>Source: `framework/extensions/shortcodes/includes/library/installer.php:131`</small>

### `upw_sc_lib_normalize_catalog` {#upw_sc_lib_normalize_catalog}

```php
upw_sc_lib_normalize_catalog( $raw )
```

Normalize a raw catalog into &#123; version, base_url, shortcodes:&#123; slug =&gt; &#123;...&#125; &#125; &#125;.

<small>Source: `framework/extensions/shortcodes/includes/library/installer.php:49`</small>

### `upw_sc_lib_resolve_url` {#upw_sc_lib_resolve_url}

```php
upw_sc_lib_resolve_url( $catalog, $rel )
```

Resolve a catalog-relative path (thumb / payload) against the catalog base_url.

<small>Source: `framework/extensions/shortcodes/includes/library/installer.php:78`</small>

### `upw_sc_lib_uninstall` {#upw_sc_lib_uninstall}

```php
upw_sc_lib_uninstall( $slug )
```

Remove ONE installed shortcode's folder (guarded to the install dir + a catalog slug).

<small>Source: `framework/extensions/shortcodes/includes/library/installer.php:210`</small>

← Back to [Functions overview](./index.md)
