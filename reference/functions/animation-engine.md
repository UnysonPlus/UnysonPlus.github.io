---
title: Animation Engine — functions
sidebar_label: Animation Engine
slug: /functions/animation-engine
description: Public PHP helper functions in the UnysonPlus Animation Engine subsystem — signatures, parameters, and return values.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED — do not edit by hand. Edit the framework docblocks, then run: php scripts/extract-php-api.php … && node scripts/gen-php-api.mjs -->

# Animation Engine — functions

**127 public functions.** 127 are 🔌 pluggable (`function_exists()`-guarded, so a theme/child can override them).

| Function | Summary |
| --- | --- |
| [`fw_model_allowed_mimes`](#fw_model_allowed_mimes) | Returns the allowed glTF model MIME map (glb, gltf) for the model-upload bypass. |
| [`sc_get`](#sc_get) | Returns a value from the shortcode atts array by path via fw_akg, falling back to a default. |
| [`sc_get_gsap_fields`](#sc_get_gsap_fields) | Returns the GSAP "Scroll Motion" fields appended to the Animations tab. |
| [`sc_get_hscroll_fields`](#sc_get_hscroll_fields) | Builds the horizontal-scroll module option fields, including per-style preview tiles and shared controls. |
| [`sc_get_motion_sequence_fields`](#sc_get_motion_sequence_fields) | The Motion Sequence control (Section only). An INLINE multi-picker keyed `motion_sequence`, picker id `mode` (Off / On) — one row until switched on, matching the engine's other controls. |
| [`sc_get_scroll_loop_fields`](#sc_get_scroll_loop_fields) | The Scroll Loop control appended to the Animations tab. |
| [`sc_get_scrollytelling_fields`](#sc_get_scrollytelling_fields) | Animation Engine — Scrollytelling module: options declaration. |
| [`sc_get_sticky_stack_fields`](#sc_get_sticky_stack_fields) | The Sticky Card Stack control (Section only). A popover image-picker multi-picker keyed `sticky_stack`, picker id `mode`, so it stays compact like the other engine controls. |
| [`sc_gsap_flag`](#sc_gsap_flag) | Per-request flag: "at least one GSAP-animated shortcode has rendered". Gates the wp_footer enqueue so zero GSAP bytes ship on un-animated pages. |
| [`sc_gsap_used`](#sc_gsap_used) | Records which GSAP effects rendered on this request, so wp_footer can load the heavier per-effect plugins (e.g. SplitText) ONLY when they're used. |
| [`sc_model_viewer_render`](#sc_model_viewer_render) | Renders the model-viewer shortcode, resolving the 3D model source from a media pick or pasted URL. |
| [`sc_scroll_loop_flag`](#sc_scroll_loop_flag) | Per-request flag: "at least one loop section rendered". Gates the wp_footer enqueue so zero loop bytes ship on pages without a loop group. |
| [`sc_scroll_loop_snap_used`](#sc_scroll_loop_snap_used) | Per-request flag: "at least one loop section requested snapping". Gates loading the separate Lenis Snap build. |
| [`sc_seq_frames`](#sc_seq_frames) | Resolve the ordered list of frame URLs from either source. |
| [`sc_svg_draw_color`](#sc_svg_draw_color) | Returns a color option field (compact styling-tab picker or a plain color-picker fallback) for the SVG Draw options. |
| [`sc_svg_draw_preset`](#sc_svg_draw_preset) | Built-in stroke presets — single-colour outline art that draws cleanly. |
| [`sc_svg_draw_render`](#sc_svg_draw_render) | Renders the SVG Draw shortcode from its atts, loading the SVG from preset, code, or a path-validated upload. |
| [`sc_svg_draw_sanitize`](#sc_svg_draw_sanitize) | Sanitise user-supplied SVG markup before it is echoed inline. |
| [`sc_svg_morph_color`](#sc_svg_morph_color) | Returns a color option field (compact styling-tab picker or a plain color-picker fallback) for the SVG Morph options. |
| [`sc_svg_morph_extract_path`](#sc_svg_morph_extract_path) | Extract the PRIMARY morphable path `d` from SVG markup: the longest `&lt;path&gt;` (a heuristic for the main outline), or a basic shape (circle / rect / polygon / polyline) converted to a path. Only a validated numeric `d` is ever returned — never the raw markup — so this is safe to echo. Complex multi-part art collapses to its largest single outline (morphing needs one shape). |
| [`sc_svg_morph_points_to_path`](#sc_svg_morph_points_to_path) | Curated morph SETS — an ordered sequence of shape keys the element cycles through. Chosen because each pair reads well as a morph. `loopback` closes the cycle (…→ last → first) for a seamless loop. |
| [`sc_svg_morph_render`](#sc_svg_morph_render) | Renders the SVG Morph shortcode from its atts, collecting and sanitizing each shape's path and timing. |
| [`sc_svg_morph_shapes`](#sc_svg_morph_shapes) | Built-in morph shapes — single closed paths in a 0–100 box. The runtime samples each into N points, so any of these can morph into any other. Keep each a SINGLE subpath (one M … Z): the sampler walks a continuous outline, so a multi-subpath shape would tear. |
| [`sc_webgl_object_render`](#sc_webgl_object_render) | Renders the WebGL Object shortcode, resolving the style preset, image URL, and HEX colors for the Three.js config. |
| [`upw_ae_group_tiles`](#upw_ae_group_tiles) | Group a FLAT image-picker choices map into categories for the searchable "tabs" layout used by every module effect picker. The flat list stays the source of truth (a module just adds a new tile to it); categorisation is a thin map over it. |
| [`upw_anim_asset_ver`](#upw_anim_asset_ver) | Version + filemtime cache-buster for a file that exists (else the bare version). |
| [`upw_anim_diagnose_post`](#upw_anim_diagnose_post) | Walks a post's page-builder tree and reports which animation-engine fields are active on each element. |
| [`upw_anim_diagnostics_render_page`](#upw_anim_diagnostics_render_page) | Renders the animation diagnostics admin page, handling the per-post reset action. |
| [`upw_anim_engine_setting`](#upw_anim_engine_setting) | Read a global Animation Engine setting (theme-scoped). Modules use this to honour the engine's global policy (e.g. reduced motion, disable-on-mobile). |
| [`upw_anim_engine_settings_section`](#upw_anim_engine_settings_section) | The "Animations" nav section: a box → group of global engine options, plus a per-module area. Returns the section keyed `animation_engine_container`. |
| [`upw_anim_field_defs`](#upw_anim_field_defs) | picker id + off value per animation field, from the live field definitions. Cached per request. |
| [`upw_anim_pb_key`](#upw_anim_pb_key) | The page-builder option key (for fw_get_db_post_option / fw_set_db_post_option). |
| [`upw_anim_raf_handle`](#upw_anim_raf_handle) | Register + enqueue the shared frame scheduler (static/js/upw-raf.js) once per request and return its handle, so modules whose JS uses window.upwAnimRaf can depend on it. One rAF loop drives every subscribed animation and pauses while the tab is hidden. |
| [`upw_anim_register_assets`](#upw_anim_register_assets) | Declare a module's on-demand asset layout (call once, at module load). |
| [`upw_anim_reset_post`](#upw_anim_reset_post) | Reset EVERY element's animation values to their off/none default. Returns count of atts reset. |
| [`upw_anim_slider`](#upw_anim_slider) | A `slider` option field: value + min/max/step, plus an optional description. |
| [`upw_anim_use_asset`](#upw_anim_use_asset) | Record that $module used $style on this request → its partial(s) get enqueued. |
| [`upw_anim_used_styles`](#upw_anim_used_styles) | The distinct styles a module emitted this request (for tests / conditionals). |
| [`upw_bg_color_field`](#upw_bg_color_field) | Builds a background-effect color-picker field, delegating to the shared color helper when available. |
| [`upw_bg_containers`](#upw_bg_containers) | Shortcode tags that get the Background Effect option. |
| [`upw_bg_css_color`](#upw_bg_css_color) | Resolve a preset/custom color to a CSS string (var() for presets, live-linked). |
| [`upw_bg_effects`](#upw_bg_effects) | Returns the list of available background effect ids. |
| [`upw_bg_enabled`](#upw_bg_enabled) | Animation Engine — Animated Backgrounds module: helpers. |
| [`upw_bg_hex`](#upw_bg_hex) | Resolve a preset/custom color to a real hex (canvas can't use var()). |
| [`upw_color_field`](#upw_color_field) | Build a color option using the shortcodes Styling-tab preset selector (predefined-colors-color-picker-compact) instead of a raw color-picker, so element colors stay tied to the theme palette. Falls back to a plain color-picker if the helper isn't available (engine without shortcodes). |
| [`upw_color_shift_enabled`](#upw_color_shift_enabled) | Global master switch — the single choke point (defaults to enabled, like every other module). |
| [`upw_color_shift_flag`](#upw_color_shift_flag) | Tracks (and optionally sets) whether the Scroll Color Shift feature was used on the current request. |
| [`upw_confetti_enabled`](#upw_confetti_enabled) | Animation Engine — Confetti module. |
| [`upw_confetti_palettes`](#upw_confetti_palettes) | Valid palette keys (shared by the select + the wrapper-filter validation). |
| [`upw_confetti_style_groups`](#upw_confetti_style_groups) | Group label =&gt; ordered style keys — organises the picker into tabs. |
| [`upw_confetti_styles`](#upw_confetti_styles) | Flat key =&gt; label of EVERY style — the source of truth for validation + the one runtime. |
| [`upw_cs_resolve_color`](#upw_cs_resolve_color) | Animation Engine — Scroll Color Shift module (Section-level). |
| [`upw_cursor_font_props`](#upw_cursor_font_props) | A typography-v2 value → JS style props, and enqueue its Google font if one is chosen. Shared by the Word Trail and Contextual Label styles. |
| [`upw_cursor_setting`](#upw_cursor_setting) | Read a Cursor setting from the theme-scoped `animation_cursor` bucket. |
| [`upw_cursor_styles`](#upw_cursor_styles) | style-id =&gt; label. Single source of truth for the picker + validation. |
| [`upw_effects_recursive_unset`](#upw_effects_recursive_unset) | Recursively removes every occurrence of a given key from a nested array, by reference. |
| [`upw_flip_card_enabled`](#upw_flip_card_enabled) | Returns whether the Flip Card module is enabled in Theme Settings (defaults to enabled). |
| [`upw_flip_card_flag`](#upw_flip_card_flag) | Static used-flag for Flip Card; sets it when passed true and returns whether the module was used on the page. |
| [`upw_flip_card_options`](#upw_flip_card_options) | The shared settings group revealed under every flip style. |
| [`upw_flip_card_styles`](#upw_flip_card_styles) | Animation Engine — 3D Flip Card module: helpers. |
| [`upw_flip_resolve_color`](#upw_flip_resolve_color) | Resolve a color value (compact-color array or legacy string) to a CSS color. |
| [`upw_get_color_shift_fields`](#upw_get_color_shift_fields) | The Scroll Color Shift control (a compact popover multi-picker). |
| [`upw_gsap_critical_css`](#upw_gsap_critical_css) | Prints the tiny in-head critical CSS that hides `.upw-g-pending` GSAP entrance elements to prevent FOUC. |
| [`upw_gsap_effects`](#upw_gsap_effects) | Canonical Scroll-Motion effect list — the SINGLE source of truth for the effect KEYS + labels. The picker tiles (settings.php) and the render-time allow-list (render.php) both derive from this, so those two can never drift again (the drift is what shipped the data-upw-g-each stagger bug). The tile SVG slug is the key with `_` -&gt; `-`. NOTE: the JS BUILDERS map (upw-gsap.js) implements each key and must carry the SAME keys (it can't share a PHP literal) — keep it in step. `custom` (the code snippet) is handled separately (own tile + gated runtime), so it is NOT listed here. |
| [`upw_gsap_snippets_gate`](#upw_gsap_snippets_gate) | Emits the window.upwSnippetsOK flag in the footer only when the singular's author and last editor both have unfiltered_html. |
| [`upw_hover_apply_instances`](#upw_hover_apply_instances) | Applies hover effect instances onto a wrapper's attr array, adding classes, data-hover-* attrs, CSS vars, and asset records. |
| [`upw_hover_collection_item_attr`](#upw_hover_collection_item_attr) | Builds the hover-effect attr array for a single collection item, or empty if hover is disabled or has no instances. |
| [`upw_hover_color`](#upw_hover_color) | Resolve a preset-or-custom color value (from upw_color_field) to a CSS color string: a preset → var(--color-&#123;slug&#125;) (live-linked to Theme Settings); a custom color → its hex; a legacy plain string → passed through. |
| [`upw_hover_effects`](#upw_hover_effects) | The valid hover-effect ids — single source of truth for emit + wrapper checks. |
| [`upw_hover_enabled`](#upw_hover_enabled) | Global master switch (Theme Settings → Animations → Interactions). |
| [`upw_hover_instances`](#upw_hover_instances) | Collect every hover instance saved on an element — the base `interaction` plus any `interaction__N` slots (multi-instance). Returns a list of [ 'effect' =&gt; key, 'settings' =&gt; array ] for the active ones only, so a user can combine several hover effects (Lift + Ripple, …) on one element. |
| [`upw_hover_scope`](#upw_hover_scope) | Hover target scope for an element: 'each' (per-item, only the hovered card reacts) or 'whole'. Defaults to 'each' so collections light up per card. Meaningful only on collection elements. |
| [`upw_hscroll_enabled`](#upw_hscroll_enabled) | Returns whether the Horizontal Scroll module is enabled in Theme Settings (defaults to enabled). |
| [`upw_hscroll_styles`](#upw_hscroll_styles) | The valid horizontal-scroll style keys (shared by the wrapper filter + needs-wrapper). |
| [`upw_marquee_enabled`](#upw_marquee_enabled) | Animation Engine — Marquee module: helpers. |
| [`upw_marquee_flag`](#upw_marquee_flag) | Static used-flag for Marquee; sets it when passed true and returns whether the module was used on the page. |
| [`upw_model_content_ok`](#upw_model_content_ok) | Cheap content sanity-check before we override WordPress's finfo veto — so the bypass only ever applies to a file that really is a glTF model, not anything that merely ends in .glb/.gltf. - .glb → binary glTF; the first 4 bytes are the magic "glTF" (0x676C5446). - .gltf → a JSON document; the first non-whitespace byte must be "&#123;". |
| [`upw_motion_path_all_modes`](#upw_motion_path_all_modes) | Returns all motion-path mode keys — the shape preset keys plus 'custom'. |
| [`upw_motion_path_enabled`](#upw_motion_path_enabled) | Animation Engine — Motion Path module: helpers. |
| [`upw_motion_path_presets`](#upw_motion_path_presets) | The built-in path shapes. Each `d` lives in a normalized 0..100 × 0..100 box; the runtime scales it to the element's chosen Path size (px) and moves the element RELATIVE to its first point, so it starts at its natural layout position and travels the shape from there. |
| [`upw_motion_path_shape_keys`](#upw_motion_path_shape_keys) | Returns the keys of the built-in motion-path shape presets. |
| [`upw_motion_sequence_enabled`](#upw_motion_sequence_enabled) | Returns whether the Motion Sequence module is enabled in Theme Settings (defaults to enabled). |
| [`upw_mq_slider`](#upw_mq_slider) | Builds a marquee slider option field by delegating to the shared upw_anim_slider builder. |
| [`upw_parallax_enabled`](#upw_parallax_enabled) | Animation Engine — Parallax module: helpers. |
| [`upw_parallax_flag`](#upw_parallax_flag) | Static used-flag for Parallax; sets it when passed true and returns whether the module was used on the page. |
| [`upw_perf_note`](#upw_perf_note) | Shared "only loads when used" reassurance, surfaced on the animation pickers so users see — at the point of choice — that the engine won't bloat their pages. Kept HONEST: the runtime is enqueued per-PAGE (not per-effect — one file carries a category's effects, and shared libraries like GSAP load for any effect), so the accurate promise is "loads only on pages that use it", not "only the selected one". |
| [`upw_phys_slider`](#upw_phys_slider) | Builds a physics slider option field by delegating to the shared upw_anim_slider builder. |
| [`upw_phys_trigger`](#upw_phys_trigger) | Returns a select option field for the physics trigger (hover or click/tap), with the given default. |
| [`upw_physics_effects`](#upw_physics_effects) | Valid physics-effect ids — single source of truth for emit + wrapper checks. |
| [`upw_physics_enabled`](#upw_physics_enabled) | Animation Engine — Physics module: helpers. |
| [`upw_preloader_enabled`](#upw_preloader_enabled) | Returns whether the site preloader is enabled in its settings. |
| [`upw_preloader_inner`](#upw_preloader_inner) | The animator markup for a preloader style (built into the overlay). |
| [`upw_preloader_settings`](#upw_preloader_settings) | Resolve + cache the preloader settings for this request. |
| [`upw_preloader_style_opt`](#upw_preloader_style_opt) | Read a per-style option for the CURRENT style from the `preloader_style` multi-picker reveal. Future preloader styles that ship their own options (declared in the style's `choices` reveal group) read them through this — e.g. upw_preloader_style_opt( 'count', 5 ). |
| [`upw_preloader_styles`](#upw_preloader_styles) | Animation Engine — Preloader module: helpers. |
| [`upw_prlx_slider`](#upw_prlx_slider) | Builds a parallax slider option field by delegating to the shared upw_anim_slider builder. |
| [`upw_prlx_switch`](#upw_prlx_switch) | Returns a parallax on/off switch option field with the given label, description, and default. |
| [`upw_pt_enabled`](#upw_pt_enabled) | Returns whether page transitions are enabled and not in the admin. |
| [`upw_pt_resolve`](#upw_pt_resolve) | Read the transition multi-picker into a normalized [ type, dir, count, total ]. |
| [`upw_pt_setting`](#upw_pt_setting) | Animation Engine — Page Transitions module: helpers. |
| [`upw_pt_types`](#upw_pt_types) | Returns the list of valid page-transition type keys. |
| [`upw_scroll_enabled`](#upw_scroll_enabled) | Returns whether the Scroll Motion module is enabled in Theme Settings (defaults to enabled). |
| [`upw_scroll_loop_enabled`](#upw_scroll_loop_enabled) | Returns whether the Infinite Scroll Loop module is enabled in Theme Settings (defaults to enabled). |
| [`upw_scroll_reveal_enabled`](#upw_scroll_reveal_enabled) | Animation Engine — Scroll Reveal module: helpers. |
| [`upw_scroll_text_highlight_enabled`](#upw_scroll_text_highlight_enabled) | Animation Engine — Scroll Text Highlight module. |
| [`upw_scroll_var_enabled`](#upw_scroll_var_enabled) | Returns whether the Scroll Variable module is enabled in Theme Settings (defaults to enabled). |
| [`upw_scroll_var_options`](#upw_scroll_var_options) | The revealed options behind the tile (shared by the single `on` mode). |
| [`upw_scroll_var_sanitize_name`](#upw_scroll_var_sanitize_name) | Sanitize a user string into a valid CSS custom-property name, forcing a leading `--`. |
| [`upw_scrollprog_enabled`](#upw_scrollprog_enabled) | Animation Engine — Scroll Progress module. |
| [`upw_scrollytelling_directional`](#upw_scrollytelling_directional) | Styles that expose a Direction sub-option (up / down / left / right). |
| [`upw_scrollytelling_enabled`](#upw_scrollytelling_enabled) | Animation Engine — Scrollytelling module: helpers. |
| [`upw_scrollytelling_style_keys`](#upw_scrollytelling_style_keys) | Returns the keys of the available scrollytelling styles. |
| [`upw_scrollytelling_styles`](#upw_scrollytelling_styles) | The valid style keys (label registry) — shared by the picker + the wrapper filter. |
| [`upw_skf_enabled`](#upw_skf_enabled) | Global master switch (defaults to enabled, like every other module). |
| [`upw_skf_flag`](#upw_skf_flag) | Static used-flag for Scroll Keyframes; sets it when passed true and returns whether the module was used on the page. |
| [`upw_smoothscroll_enabled`](#upw_smoothscroll_enabled) | Returns whether smooth scrolling is enabled in Theme Settings (defaults to off). |
| [`upw_sp_color`](#upw_sp_color) | Returns a compact color option field for the scroll-progress bar, defaulting to the given hex. |
| [`upw_sth_resolve_color`](#upw_sth_resolve_color) | Resolve a compact-color value (array or legacy string) to a CSS color. |
| [`upw_sth_styles`](#upw_sth_styles) | Returns the map of scroll-text-highlight style keys to their translated labels. |
| [`upw_sticky_stack_enabled`](#upw_sticky_stack_enabled) | Returns whether the Sticky Card Stack module is enabled in Theme Settings (defaults to enabled). |
| [`upw_sticky_stack_styles`](#upw_sticky_stack_styles) | The valid style keys (shared by the wrapper filter + needs-wrapper). |
| [`upw_text_color`](#upw_text_color) | Resolve a preset-or-custom color to a CSS string (reuses the hover resolver). |
| [`upw_text_color_field`](#upw_text_color_field) | A palette-preset color field, reusing the hover module's helper when present. |
| [`upw_text_effects`](#upw_text_effects) | The valid text-effect ids — single source of truth for emit + wrapper checks. |
| [`upw_text_enabled`](#upw_text_enabled) | Global master switch (Theme Settings → Animations → Text). |
| [`upw_text_trigger_list`](#upw_text_trigger_list) | Normalise a multi-select trigger value (array of view/load/click/hover, or a legacy scalar, or empty) into a space-separated list for data-text-trigger. Shared by every one-shot effect whose trigger is the multi image-picker (reveal family, scramble, typewriter, countup, splitflap, matrix). Defaults to 'view'. |
| [`upw_viewport_units_enabled`](#upw_viewport_units_enabled) | Animation Engine — Viewport Units module. |

---

### `fw_model_allowed_mimes` {#fw_model_allowed_mimes}
*🔌 pluggable*

```php
fw_model_allowed_mimes()
```

Returns the allowed glTF model MIME map (glb, gltf) for the model-upload bypass.

<small>Source: `framework/extensions/animation-engine/includes/glb-upload.php:23`</small>

### `sc_get` {#sc_get}
*🔌 pluggable*

```php
sc_get( $path, $atts, $default = '' )
```

Returns a value from the shortcode atts array by path via fw_akg, falling back to a default.

<small>Source: `framework/extensions/animation-engine/shortcodes/gallery-3d/views/view.php:18`</small>

### `sc_get_gsap_fields` {#sc_get_gsap_fields}
*🔌 pluggable*

```php
sc_get_gsap_fields()
```

Returns the GSAP "Scroll Motion" fields appended to the Animations tab.

Saved value shape (multi-picker, picker id = `effect`):

    [ 'effect' =&gt; 'reveal', 'reveal' =&gt; [ &lt;sub-option values&gt; ] ]

Only the selected effect's sub-array carries data; switching effects never
loses the others' values (standard multi-picker behaviour).

<small>Source: `framework/extensions/animation-engine/modules/scroll-motion/includes/scroll-motion-settings.php:25`</small>

### `sc_get_hscroll_fields` {#sc_get_hscroll_fields}
*🔌 pluggable*

```php
sc_get_hscroll_fields()
```

Builds the horizontal-scroll module option fields, including per-style preview tiles and shared controls.

<small>Source: `framework/extensions/animation-engine/modules/horizontal-scroll/horizontal-scroll.php:41`</small>

### `sc_get_motion_sequence_fields` {#sc_get_motion_sequence_fields}
*🔌 pluggable*

```php
sc_get_motion_sequence_fields()
```

The Motion Sequence control (Section only). An INLINE multi-picker keyed `motion_sequence`, picker id `mode` (Off / On) — one row until switched on, matching the engine's other controls.

<small>Source: `framework/extensions/animation-engine/modules/motion-sequence/motion-sequence.php:38`</small>

### `sc_get_scroll_loop_fields` {#sc_get_scroll_loop_fields}
*🔌 pluggable*

```php
sc_get_scroll_loop_fields()
```

The Scroll Loop control appended to the Animations tab.

A popover image-picker multi-picker (keyed `scroll_loop`, picker id `mode`) so it
stays compact in the tab like the other engine controls (Scroll Motion, Page
Transitions, Hover) rather than laying its fields out inline.

Saved value shape:

    [ 'mode' =&gt; 'off'|'loop',
      'loop' =&gt; [ 'snap' =&gt; 'yes'|'no', 'snap_duration' =&gt; 0.8, 'run_on_mobile' =&gt; 'yes'|'no' ] ]

<small>Source: `framework/extensions/animation-engine/modules/scroll-loop/includes/scroll-loop-helpers.php:26`</small>

### `sc_get_scrollytelling_fields` {#sc_get_scrollytelling_fields}
*🔌 pluggable*

```php
sc_get_scrollytelling_fields()
```

Animation Engine — Scrollytelling module: options declaration.

Builds the Section-only "Scrollytelling" multi-picker (a popover image-picker keyed
`scrollytelling`, picker id `mode`), mirroring the Sticky Card Stack control. One shared options
group is revealed under every style; a single `intensity` knob drives whatever that style does.
Injected into the Section's Animations tab by scrollytelling-render.php.

<small>Source: `framework/extensions/animation-engine/modules/scrollytelling/includes/scrollytelling-settings.php:15`</small>

### `sc_get_sticky_stack_fields` {#sc_get_sticky_stack_fields}
*🔌 pluggable*

```php
sc_get_sticky_stack_fields()
```

The Sticky Card Stack control (Section only). A popover image-picker multi-picker keyed `sticky_stack`, picker id `mode`, so it stays compact like the other engine controls.

<small>Source: `framework/extensions/animation-engine/modules/sticky-stack/sticky-stack.php:38`</small>

### `sc_gsap_flag` {#sc_gsap_flag}
*🔌 pluggable*

```php
sc_gsap_flag( $set = false )
```

Per-request flag: "at least one GSAP-animated shortcode has rendered". Gates the wp_footer enqueue so zero GSAP bytes ship on un-animated pages.

<small>Source: `framework/extensions/animation-engine/modules/scroll-motion/includes/scroll-motion-helpers.php:20`</small>

### `sc_gsap_used` {#sc_gsap_used}
*🔌 pluggable*

```php
sc_gsap_used( $effect = null )
```

Records which GSAP effects rendered on this request, so wp_footer can load the heavier per-effect plugins (e.g. SplitText) ONLY when they're used.

<small>Source: `framework/extensions/animation-engine/modules/scroll-motion/includes/scroll-motion-helpers.php:33`</small>

### `sc_model_viewer_render` {#sc_model_viewer_render}
*🔌 pluggable*

```php
sc_model_viewer_render( $atts )
```

Renders the model-viewer shortcode, resolving the 3D model source from a media pick or pasted URL.

<small>Source: `framework/extensions/animation-engine/shortcodes/model-viewer/views/view.php:21`</small>

### `sc_scroll_loop_flag` {#sc_scroll_loop_flag}
*🔌 pluggable*

```php
sc_scroll_loop_flag( $set = false )
```

Per-request flag: "at least one loop section rendered". Gates the wp_footer enqueue so zero loop bytes ship on pages without a loop group.

<small>Source: `framework/extensions/animation-engine/modules/scroll-loop/includes/scroll-loop-helpers.php:111`</small>

### `sc_scroll_loop_snap_used` {#sc_scroll_loop_snap_used}
*🔌 pluggable*

```php
sc_scroll_loop_snap_used( $set = false )
```

Per-request flag: "at least one loop section requested snapping". Gates loading the separate Lenis Snap build.

<small>Source: `framework/extensions/animation-engine/modules/scroll-loop/includes/scroll-loop-helpers.php:125`</small>

### `sc_seq_frames` {#sc_seq_frames}
*🔌 pluggable*

```php
sc_seq_frames( $atts )
```

Resolve the ordered list of frame URLs from either source.

<small>Source: `framework/extensions/animation-engine/shortcodes/image-sequence/views/view.php:19`</small>

### `sc_svg_draw_color` {#sc_svg_draw_color}
*🔌 pluggable*

```php
sc_svg_draw_color( $label, $kind, $default_hex, $desc = '' )
```

Returns a color option field (compact styling-tab picker or a plain color-picker fallback) for the SVG Draw options.

<small>Source: `framework/extensions/animation-engine/shortcodes/svg-draw/options.php:8`</small>

### `sc_svg_draw_preset` {#sc_svg_draw_preset}
*🔌 pluggable*

```php
sc_svg_draw_preset( $id )
```

Built-in stroke presets — single-colour outline art that draws cleanly.

<small>Source: `framework/extensions/animation-engine/shortcodes/svg-draw/views/view.php:58`</small>

### `sc_svg_draw_render` {#sc_svg_draw_render}
*🔌 pluggable*

```php
sc_svg_draw_render( $atts )
```

Renders the SVG Draw shortcode from its atts, loading the SVG from preset, code, or a path-validated upload.

<small>Source: `framework/extensions/animation-engine/shortcodes/svg-draw/views/view.php:75`</small>

### `sc_svg_draw_sanitize` {#sc_svg_draw_sanitize}
*🔌 pluggable*

```php
sc_svg_draw_sanitize( $svg )
```

Sanitise user-supplied SVG markup before it is echoed inline.

Two-tier: authors who can post raw HTML (`unfiltered_html`) keep full control — they can already
inject arbitrary markup site-wide, so gating them adds nothing. Everyone else (Author /
Contributor) is run through a hardened allow-strip that removes every script-capable / remote-ref
element AND all `on*` event handlers — crucially catching the `&lt;svg/onload=…&gt;` slash-separator
form that a naïve `\son…` strip misses, plus scripted/data: URLs on any remaining ref attribute.

<small>Source: `framework/extensions/animation-engine/shortcodes/svg-draw/views/view.php:27`</small>

### `sc_svg_morph_color` {#sc_svg_morph_color}
*🔌 pluggable*

```php
sc_svg_morph_color( $label, $kind, $default_hex, $desc = '' )
```

Returns a color option field (compact styling-tab picker or a plain color-picker fallback) for the SVG Morph options.

<small>Source: `framework/extensions/animation-engine/shortcodes/svg-morph/options.php:8`</small>

### `sc_svg_morph_extract_path` {#sc_svg_morph_extract_path}
*🔌 pluggable*

```php
sc_svg_morph_extract_path( $svg )
```

Extract the PRIMARY morphable path `d` from SVG markup: the longest `&lt;path&gt;` (a heuristic for the main outline), or a basic shape (circle / rect / polygon / polyline) converted to a path. Only a validated numeric `d` is ever returned — never the raw markup — so this is safe to echo. Complex multi-part art collapses to its largest single outline (morphing needs one shape).

<small>Source: `framework/extensions/animation-engine/shortcodes/svg-morph/views/view.php:63`</small>

### `sc_svg_morph_points_to_path` {#sc_svg_morph_points_to_path}
*🔌 pluggable*

```php
sc_svg_morph_points_to_path( $pts, $close )
```

Curated morph SETS — an ordered sequence of shape keys the element cycles through. Chosen because each pair reads well as a morph. `loopback` closes the cycle (…→ last → first) for a seamless loop.

<small>Source: `framework/extensions/animation-engine/shortcodes/svg-morph/views/view.php:46`</small>

### `sc_svg_morph_render` {#sc_svg_morph_render}
*🔌 pluggable*

```php
sc_svg_morph_render( $atts )
```

Renders the SVG Morph shortcode from its atts, collecting and sanitizing each shape's path and timing.

<small>Source: `framework/extensions/animation-engine/shortcodes/svg-morph/views/view.php:100`</small>

### `sc_svg_morph_shapes` {#sc_svg_morph_shapes}
*🔌 pluggable*

```php
sc_svg_morph_shapes()
```

Built-in morph shapes — single closed paths in a 0–100 box. The runtime samples each into N points, so any of these can morph into any other. Keep each a SINGLE subpath (one M … Z): the sampler walks a continuous outline, so a multi-subpath shape would tear.

<small>Source: `framework/extensions/animation-engine/shortcodes/svg-morph/views/view.php:23`</small>

### `sc_webgl_object_render` {#sc_webgl_object_render}
*🔌 pluggable*

```php
sc_webgl_object_render( $atts )
```

Renders the WebGL Object shortcode, resolving the style preset, image URL, and HEX colors for the Three.js config.

<small>Source: `framework/extensions/animation-engine/shortcodes/webgl-object/views/view.php:21`</small>

### `upw_ae_group_tiles` {#upw_ae_group_tiles}
*🔌 pluggable*

```php
upw_ae_group_tiles( $flat, $cats, $drop = array() )
```

Group a FLAT image-picker choices map into categories for the searchable "tabs" layout used by every module effect picker. The flat list stays the source of truth (a module just adds a new tile to it); categorisation is a thin map over it.

Any id not named in $cats (and not dropped) is appended to a final "More" group,
              so a newly-added effect is surfaced rather than silently lost.

| Parameter | Type | Description |
| --- | --- | --- |
| `$flat` | `array` | Ordered map of id =&gt; tile (as built by a module's tile helper). |
| `$cats` | `array` | Ordered map of group_key =&gt; array( 'label' =&gt; .., 'ids' =&gt; array( id, .. ) ). |
| `$drop` | `array` | Choice ids to omit entirely (e.g. a redundant 'none' tile). |

**Returns** `array` Grouped choices ( group_key =&gt; array( 'label' =&gt; .., 'choices' =&gt; array( id =&gt; tile ) ) ).

<small>Source: `framework/extensions/animation-engine/includes/theme-settings.php:50`</small>

### `upw_anim_asset_ver` {#upw_anim_asset_ver}
*🔌 pluggable*

```php
upw_anim_asset_ver( $ver, $abs )
```

Version + filemtime cache-buster for a file that exists (else the bare version).

<small>Source: `framework/extensions/animation-engine/includes/asset-loader.php:120`</small>

### `upw_anim_diagnose_post` {#upw_anim_diagnose_post}
*🔌 pluggable*

```php
upw_anim_diagnose_post( $post_id )
```

Walks a post's page-builder tree and reports which animation-engine fields are active on each element.

**Returns** `array` &#123; key: string\|null, elements: [ &#123; type, active: [ 'fid'=&gt;value, … ], count &#125; ], total_active, all_on_signature: bool &#125;

<small>Source: `framework/extensions/animation-engine/includes/animation-diagnostics.php:60`</small>

### `upw_anim_diagnostics_render_page` {#upw_anim_diagnostics_render_page}
*🔌 pluggable*

```php
upw_anim_diagnostics_render_page()
```

Renders the animation diagnostics admin page, handling the per-post reset action.

<small>Source: `framework/extensions/animation-engine/includes/animation-diagnostics.php:145`</small>

### `upw_anim_engine_setting` {#upw_anim_engine_setting}
*🔌 pluggable*

```php
upw_anim_engine_setting( $key, $default = '' )
```

Read a global Animation Engine setting (theme-scoped). Modules use this to honour the engine's global policy (e.g. reduced motion, disable-on-mobile).

| Parameter | Type | Description |
| --- | --- | --- |
| `$key` | `string` | Leaf id inside the `animation_engine` multi (e.g. 'respect_reduced_motion'). |
| `$default` | `mixed` | Returned when unset. |

**Returns** `mixed`

<small>Source: `framework/extensions/animation-engine/includes/theme-settings.php:199`</small>

### `upw_anim_engine_settings_section` {#upw_anim_engine_settings_section}
*🔌 pluggable*

```php
upw_anim_engine_settings_section()
```

The "Animations" nav section: a box → group of global engine options, plus a per-module area. Returns the section keyed `animation_engine_container`.

<small>Source: `framework/extensions/animation-engine/includes/theme-settings.php:86`</small>

### `upw_anim_field_defs` {#upw_anim_field_defs}
*🔌 pluggable*

```php
upw_anim_field_defs()
```

picker id + off value per animation field, from the live field definitions. Cached per request.

<small>Source: `framework/extensions/animation-engine/includes/animation-diagnostics.php:20`</small>

### `upw_anim_pb_key` {#upw_anim_pb_key}
*🔌 pluggable*

```php
upw_anim_pb_key()
```

The page-builder option key (for fw_get_db_post_option / fw_set_db_post_option).

<small>Source: `framework/extensions/animation-engine/includes/animation-diagnostics.php:43`</small>

### `upw_anim_raf_handle` {#upw_anim_raf_handle}
*🔌 pluggable*

```php
upw_anim_raf_handle()
```

Register + enqueue the shared frame scheduler (static/js/upw-raf.js) once per request and return its handle, so modules whose JS uses window.upwAnimRaf can depend on it. One rAF loop drives every subscribed animation and pauses while the tab is hidden.

<small>Source: `framework/extensions/animation-engine/includes/asset-loader.php:83`</small>

### `upw_anim_register_assets` {#upw_anim_register_assets}
*🔌 pluggable*

```php
upw_anim_register_assets( $module, $args )
```

Declare a module's on-demand asset layout (call once, at module load).

<small>Source: `framework/extensions/animation-engine/includes/asset-loader.php:48`</small>

### `upw_anim_reset_post` {#upw_anim_reset_post}
*🔌 pluggable*

```php
upw_anim_reset_post( $post_id )
```

Reset EVERY element's animation values to their off/none default. Returns count of atts reset.

<small>Source: `framework/extensions/animation-engine/includes/animation-diagnostics.php:98`</small>

### `upw_anim_slider` {#upw_anim_slider}
*🔌 pluggable*

```php
upw_anim_slider( $label, $val, $min, $max, $step, $desc = '' )
```

A `slider` option field: value + min/max/step, plus an optional description.

**Returns** `array` Unyson option definition.

<small>Source: `framework/extensions/animation-engine/includes/module-helpers.php:20`</small>

### `upw_anim_use_asset` {#upw_anim_use_asset}
*🔌 pluggable*

```php
upw_anim_use_asset( $module, $style )
```

Record that $module used $style on this request → its partial(s) get enqueued.

<small>Source: `framework/extensions/animation-engine/includes/asset-loader.php:101`</small>

### `upw_anim_used_styles` {#upw_anim_used_styles}
*🔌 pluggable*

```php
upw_anim_used_styles( $module )
```

The distinct styles a module emitted this request (for tests / conditionals).

<small>Source: `framework/extensions/animation-engine/includes/asset-loader.php:112`</small>

### `upw_bg_color_field` {#upw_bg_color_field}
*🔌 pluggable*

```php
upw_bg_color_field( $label, $kind, $default_hex, $desc = '' )
```

Builds a background-effect color-picker field, delegating to the shared color helper when available.

<small>Source: `framework/extensions/animation-engine/modules/backgrounds/includes/backgrounds-helpers.php:48`</small>

### `upw_bg_containers` {#upw_bg_containers}
*🔌 pluggable*

```php
upw_bg_containers()
```

Shortcode tags that get the Background Effect option.

<small>Source: `framework/extensions/animation-engine/modules/backgrounds/includes/backgrounds-helpers.php:41`</small>

### `upw_bg_css_color` {#upw_bg_css_color}
*🔌 pluggable*

```php
upw_bg_css_color( $val, $fallback )
```

Resolve a preset/custom color to a CSS string (var() for presets, live-linked).

<small>Source: `framework/extensions/animation-engine/modules/backgrounds/includes/backgrounds-helpers.php:60`</small>

### `upw_bg_effects` {#upw_bg_effects}
*🔌 pluggable*

```php
upw_bg_effects()
```

Returns the list of available background effect ids.

<small>Source: `framework/extensions/animation-engine/modules/backgrounds/includes/backgrounds-helpers.php:26`</small>

### `upw_bg_enabled` {#upw_bg_enabled}
*🔌 pluggable*

```php
upw_bg_enabled()
```

Animation Engine — Animated Backgrounds module: helpers.

Setting reader, the enable flag / used flag, the effect + container registries, and the
color field / color-resolver helpers. Loaded first by backgrounds.php (the settings + render
parts depend on these). All wrapped in function_exists guards.

<small>Source: `framework/extensions/animation-engine/modules/backgrounds/includes/backgrounds-helpers.php:14`</small>

### `upw_bg_hex` {#upw_bg_hex}
*🔌 pluggable*

```php
upw_bg_hex( $val, $fallback )
```

Resolve a preset/custom color to a real hex (canvas can't use var()).

<small>Source: `framework/extensions/animation-engine/modules/backgrounds/includes/backgrounds-helpers.php:71`</small>

### `upw_color_field` {#upw_color_field}
*🔌 pluggable*

```php
upw_color_field( $label, $kind = 'bg', $default_hex = '', $desc = '' )
```

Build a color option using the shortcodes Styling-tab preset selector (predefined-colors-color-picker-compact) instead of a raw color-picker, so element colors stay tied to the theme palette. Falls back to a plain color-picker if the helper isn't available (engine without shortcodes).

<small>Source: `framework/extensions/animation-engine/modules/hover/includes/hover-helpers.php:47`</small>

### `upw_color_shift_enabled` {#upw_color_shift_enabled}
*🔌 pluggable*

```php
upw_color_shift_enabled()
```

Global master switch — the single choke point (defaults to enabled, like every other module).

<small>Source: `framework/extensions/animation-engine/modules/scroll-color-shift/scroll-color-shift.php:35`</small>

### `upw_color_shift_flag` {#upw_color_shift_flag}
*🔌 pluggable*

```php
upw_color_shift_flag( $set = false )
```

Tracks (and optionally sets) whether the Scroll Color Shift feature was used on the current request.

<small>Source: `framework/extensions/animation-engine/modules/scroll-color-shift/scroll-color-shift.php:47`</small>

### `upw_confetti_enabled` {#upw_confetti_enabled}
*🔌 pluggable*

```php
upw_confetti_enabled()
```

Animation Engine — Confetti module.

Fires a celebratory particle burst from an element on a trigger (scroll-into-view, click, page
load or hover) — confetti, stars, fireworks, streamers, hearts or snow. Per-element (attaches from
the Animations tab). One shared full-viewport &lt;canvas&gt; renders every burst; pure Canvas 2D, no
library. Honours "reduce motion" (no burst) and loads only on pages that use it.

Saved value shape (multi-picker, picker id `style`):
  [ 'style' =&gt; 'none'|'&lt;style&gt;', '&lt;style&gt;' =&gt; [ trigger, count, spread, power, duration, palette, replay ] ]

<small>Source: `framework/extensions/animation-engine/modules/confetti/confetti.php:18`</small>

### `upw_confetti_palettes` {#upw_confetti_palettes}
*🔌 pluggable*

```php
upw_confetti_palettes()
```

Valid palette keys (shared by the select + the wrapper-filter validation).

<small>Source: `framework/extensions/animation-engine/modules/confetti/confetti.php:80`</small>

### `upw_confetti_style_groups` {#upw_confetti_style_groups}
*🔌 pluggable*

```php
upw_confetti_style_groups()
```

Group label =&gt; ordered style keys — organises the picker into tabs.

<small>Source: `framework/extensions/animation-engine/modules/confetti/confetti.php:68`</small>

### `upw_confetti_styles` {#upw_confetti_styles}
*🔌 pluggable*

```php
upw_confetti_styles()
```

Flat key =&gt; label of EVERY style — the source of truth for validation + the one runtime.

<small>Source: `framework/extensions/animation-engine/modules/confetti/confetti.php:30`</small>

### `upw_cs_resolve_color` {#upw_cs_resolve_color}
*🔌 pluggable*

```php
upw_cs_resolve_color( $val )
```

Animation Engine — Scroll Color Shift module (Section-level).

Give each Section a target background (and optional text) colour; as the visitor scrolls, the
PAGE background smoothly morphs from one section's colour to the next — the agency-site
"scroll colour shift". Section-only (injected into the Section's Animations tab, like Scroll Loop
/ Sticky Stack). One passive, rAF-throttled scroll check picks the section crossing the viewport
middle and transitions `body` colours. No library. Loads only on pages that use it.

Saved value shape (multi-picker, picker id `mode`):
  [ 'mode' =&gt; 'off'|'shift', 'shift' =&gt; [ bg_color, text_color, duration ] ]

Best on full-bleed, transparent sections (so the morphing page colour shows through).

<small>Source: `framework/extensions/animation-engine/modules/scroll-color-shift/scroll-color-shift.php:21`</small>

### `upw_cursor_font_props` {#upw_cursor_font_props}
*🔌 pluggable*

```php
upw_cursor_font_props( $wf )
```

A typography-v2 value → JS style props, and enqueue its Google font if one is chosen. Shared by the Word Trail and Contextual Label styles.

<small>Source: `framework/extensions/animation-engine/modules/cursor/includes/cursor-helpers.php:83`</small>

### `upw_cursor_setting` {#upw_cursor_setting}
*🔌 pluggable*

```php
upw_cursor_setting( $key, $default = '' )
```

Read a Cursor setting from the theme-scoped `animation_cursor` bucket.

<small>Source: `framework/extensions/animation-engine/modules/cursor/includes/cursor-helpers.php:15`</small>

### `upw_cursor_styles` {#upw_cursor_styles}
*🔌 pluggable*

```php
upw_cursor_styles()
```

style-id =&gt; label. Single source of truth for the picker + validation.

<small>Source: `framework/extensions/animation-engine/modules/cursor/includes/cursor-helpers.php:29`</small>

### `upw_effects_recursive_unset` {#upw_effects_recursive_unset}
*🔌 pluggable*

```php
upw_effects_recursive_unset( &$arr, $key )
```

Recursively removes every occurrence of a given key from a nested array, by reference.

<small>Source: `framework/extensions/animation-engine/includes/effects-control.php:51`</small>

### `upw_flip_card_enabled` {#upw_flip_card_enabled}
*🔌 pluggable*

```php
upw_flip_card_enabled()
```

Returns whether the Flip Card module is enabled in Theme Settings (defaults to enabled).

<small>Source: `framework/extensions/animation-engine/modules/flip-card/includes/flip-card-helpers.php:30`</small>

### `upw_flip_card_flag` {#upw_flip_card_flag}
*🔌 pluggable*

```php
upw_flip_card_flag( $set = false )
```

Static used-flag for Flip Card; sets it when passed true and returns whether the module was used on the page.

<small>Source: `framework/extensions/animation-engine/modules/flip-card/includes/flip-card-helpers.php:42`</small>

### `upw_flip_card_options` {#upw_flip_card_options}
*🔌 pluggable*

```php
upw_flip_card_options()
```

The shared settings group revealed under every flip style.

<small>Source: `framework/extensions/animation-engine/modules/flip-card/includes/flip-card-helpers.php:67`</small>

### `upw_flip_card_styles` {#upw_flip_card_styles}
*🔌 pluggable*

```php
upw_flip_card_styles()
```

Animation Engine — 3D Flip Card module: helpers.

The setting reader (upw_flip_card_enabled), the used-on-this-page flag (upw_flip_card_flag),
the flip-style registry (upw_flip_card_styles), the color resolver (upw_flip_resolve_color),
and the shared back-face options group (upw_flip_card_options). Loaded first — the settings +
render parts depend on it.

<small>Source: `framework/extensions/animation-engine/modules/flip-card/includes/flip-card-helpers.php:15`</small>

### `upw_flip_resolve_color` {#upw_flip_resolve_color}
*🔌 pluggable*

```php
upw_flip_resolve_color( $val )
```

Resolve a color value (compact-color array or legacy string) to a CSS color.

<small>Source: `framework/extensions/animation-engine/modules/flip-card/includes/flip-card-helpers.php:53`</small>

### `upw_get_color_shift_fields` {#upw_get_color_shift_fields}
*🔌 pluggable*

```php
upw_get_color_shift_fields()
```

The Scroll Color Shift control (a compact popover multi-picker).

<small>Source: `framework/extensions/animation-engine/modules/scroll-color-shift/scroll-color-shift.php:58`</small>

### `upw_gsap_critical_css` {#upw_gsap_critical_css}
*🔌 pluggable*

```php
upw_gsap_critical_css()
```

Prints the tiny in-head critical CSS that hides `.upw-g-pending` GSAP entrance elements to prevent FOUC.

<small>Source: `framework/extensions/animation-engine/modules/scroll-motion/includes/scroll-motion-render.php:58`</small>

### `upw_gsap_effects` {#upw_gsap_effects}
*🔌 pluggable*

```php
upw_gsap_effects()
```

Canonical Scroll-Motion effect list — the SINGLE source of truth for the effect KEYS + labels. The picker tiles (settings.php) and the render-time allow-list (render.php) both derive from this, so those two can never drift again (the drift is what shipped the data-upw-g-each stagger bug). The tile SVG slug is the key with `_` -&gt; `-`. NOTE: the JS BUILDERS map (upw-gsap.js) implements each key and must carry the SAME keys (it can't share a PHP literal) — keep it in step. `custom` (the code snippet) is handled separately (own tile + gated runtime), so it is NOT listed here.

**Returns** `array&lt;string,string&gt;` key =&gt; translated label, in tile order.

<small>Source: `framework/extensions/animation-engine/modules/scroll-motion/includes/scroll-motion-helpers.php:51`</small>

### `upw_gsap_snippets_gate` {#upw_gsap_snippets_gate}
*🔌 pluggable*

```php
upw_gsap_snippets_gate()
```

Emits the window.upwSnippetsOK flag in the footer only when the singular's author and last editor both have unfiltered_html.

<small>Source: `framework/extensions/animation-engine/modules/scroll-motion/includes/scroll-motion-render.php:29`</small>

### `upw_hover_apply_instances` {#upw_hover_apply_instances}
*🔌 pluggable*

```php
upw_hover_apply_instances( $attr, $instances )
```

Applies hover effect instances onto a wrapper's attr array, adding classes, data-hover-* attrs, CSS vars, and asset records.

<small>Source: `framework/extensions/animation-engine/modules/hover/includes/hover-render.php:25`</small>

### `upw_hover_collection_item_attr` {#upw_hover_collection_item_attr}
*🔌 pluggable*

```php
upw_hover_collection_item_attr( $atts )
```

Builds the hover-effect attr array for a single collection item, or empty if hover is disabled or has no instances.

<small>Source: `framework/extensions/animation-engine/modules/hover/includes/hover-render.php:365`</small>

### `upw_hover_color` {#upw_hover_color}
*🔌 pluggable*

```php
upw_hover_color( $val )
```

Resolve a preset-or-custom color value (from upw_color_field) to a CSS color string: a preset → var(--color-&#123;slug&#125;) (live-linked to Theme Settings); a custom color → its hex; a legacy plain string → passed through.

<small>Source: `framework/extensions/animation-engine/modules/hover/includes/hover-helpers.php:70`</small>

### `upw_hover_effects` {#upw_hover_effects}
*🔌 pluggable*

```php
upw_hover_effects()
```

The valid hover-effect ids — single source of truth for emit + wrapper checks.

<small>Source: `framework/extensions/animation-engine/modules/hover/includes/hover-helpers.php:28`</small>

### `upw_hover_enabled` {#upw_hover_enabled}
*🔌 pluggable*

```php
upw_hover_enabled()
```

Global master switch (Theme Settings → Animations → Interactions).

<small>Source: `framework/extensions/animation-engine/modules/hover/includes/hover-helpers.php:16`</small>

### `upw_hover_instances` {#upw_hover_instances}
*🔌 pluggable*

```php
upw_hover_instances( $atts )
```

Collect every hover instance saved on an element — the base `interaction` plus any `interaction__N` slots (multi-instance). Returns a list of [ 'effect' =&gt; key, 'settings' =&gt; array ] for the active ones only, so a user can combine several hover effects (Lift + Ripple, …) on one element.

<small>Source: `framework/extensions/animation-engine/modules/hover/includes/hover-helpers.php:98`</small>

### `upw_hover_scope` {#upw_hover_scope}
*🔌 pluggable*

```php
upw_hover_scope( $atts )
```

Hover target scope for an element: 'each' (per-item, only the hovered card reacts) or 'whole'. Defaults to 'each' so collections light up per card. Meaningful only on collection elements.

| Parameter | Type | Description |
| --- | --- | --- |
| `$atts` | `array` | — |

**Returns** `string` 'each'\|'whole'

<small>Source: `framework/extensions/animation-engine/modules/hover/includes/hover-render.php:354`</small>

### `upw_hscroll_enabled` {#upw_hscroll_enabled}
*🔌 pluggable*

```php
upw_hscroll_enabled()
```

Returns whether the Horizontal Scroll module is enabled in Theme Settings (defaults to enabled).

<small>Source: `framework/extensions/animation-engine/modules/horizontal-scroll/horizontal-scroll.php:22`</small>

### `upw_hscroll_styles` {#upw_hscroll_styles}
*🔌 pluggable*

```php
upw_hscroll_styles()
```

The valid horizontal-scroll style keys (shared by the wrapper filter + needs-wrapper).

<small>Source: `framework/extensions/animation-engine/modules/horizontal-scroll/horizontal-scroll.php:34`</small>

### `upw_marquee_enabled` {#upw_marquee_enabled}
*🔌 pluggable*

```php
upw_marquee_enabled()
```

Animation Engine — Marquee module: helpers.

The enabled-state reader, the per-page "used" flag, and the slider field factory. Loaded first
by marquee.php (the settings + render parts depend on these). All wrapped in function_exists
guards for partial-upgrade double-load safety.

<small>Source: `framework/extensions/animation-engine/modules/marquee/includes/marquee-helpers.php:14`</small>

### `upw_marquee_flag` {#upw_marquee_flag}
*🔌 pluggable*

```php
upw_marquee_flag( $set = false )
```

Static used-flag for Marquee; sets it when passed true and returns whether the module was used on the page.

<small>Source: `framework/extensions/animation-engine/modules/marquee/includes/marquee-helpers.php:26`</small>

### `upw_model_content_ok` {#upw_model_content_ok}
*🔌 pluggable*

```php
upw_model_content_ok( $ext, $file )
```

Cheap content sanity-check before we override WordPress's finfo veto — so the bypass only ever applies to a file that really is a glTF model, not anything that merely ends in .glb/.gltf. - .glb → binary glTF; the first 4 bytes are the magic "glTF" (0x676C5446). - .gltf → a JSON document; the first non-whitespace byte must be "&#123;".

<small>Source: `framework/extensions/animation-engine/includes/glb-upload.php:38`</small>

### `upw_motion_path_all_modes` {#upw_motion_path_all_modes}
*🔌 pluggable*

```php
upw_motion_path_all_modes()
```

Returns all motion-path mode keys — the shape preset keys plus 'custom'.

<small>Source: `framework/extensions/animation-engine/modules/motion-path/includes/motion-path-helpers.php:97`</small>

### `upw_motion_path_enabled` {#upw_motion_path_enabled}
*🔌 pluggable*

```php
upw_motion_path_enabled()
```

Animation Engine — Motion Path module: helpers.

The global master-switch reader, the per-request used-flag path, and the preset path library
(each entry is a normalized SVG `d` in a 0..100 box + a viewBox). Loaded first by
motion-path.php — the settings + render parts depend on these. All function_exists-guarded.

<small>Source: `framework/extensions/animation-engine/modules/motion-path/includes/motion-path-helpers.php:14`</small>

### `upw_motion_path_presets` {#upw_motion_path_presets}
*🔌 pluggable*

```php
upw_motion_path_presets()
```

The built-in path shapes. Each `d` lives in a normalized 0..100 × 0..100 box; the runtime scales it to the element's chosen Path size (px) and moves the element RELATIVE to its first point, so it starts at its natural layout position and travels the shape from there.

**Returns** `array&lt;string,array&#123;label:string,d:string&#125;&gt;`

<small>Source: `framework/extensions/animation-engine/modules/motion-path/includes/motion-path-helpers.php:32`</small>

### `upw_motion_path_shape_keys` {#upw_motion_path_shape_keys}
*🔌 pluggable*

```php
upw_motion_path_shape_keys()
```

Returns the keys of the built-in motion-path shape presets.

<small>Source: `framework/extensions/animation-engine/modules/motion-path/includes/motion-path-helpers.php:90`</small>

### `upw_motion_sequence_enabled` {#upw_motion_sequence_enabled}
*🔌 pluggable*

```php
upw_motion_sequence_enabled()
```

Returns whether the Motion Sequence module is enabled in Theme Settings (defaults to enabled).

<small>Source: `framework/extensions/animation-engine/modules/motion-sequence/motion-sequence.php:23`</small>

### `upw_mq_slider` {#upw_mq_slider}
*🔌 pluggable*

```php
upw_mq_slider( $label, $val, $min, $max, $step, $desc = '' )
```

Builds a marquee slider option field by delegating to the shared upw_anim_slider builder.

<small>Source: `framework/extensions/animation-engine/modules/marquee/includes/marquee-helpers.php:37`</small>

### `upw_parallax_enabled` {#upw_parallax_enabled}
*🔌 pluggable*

```php
upw_parallax_enabled()
```

Animation Engine — Parallax module: helpers.

The enable reader, the per-page usage flag, and the slider / switch field builders shared by
the settings and render parts. Loaded first by parallax.php (the settings + render parts depend
on these). All wrapped in function_exists guards.

<small>Source: `framework/extensions/animation-engine/modules/parallax/includes/parallax-helpers.php:14`</small>

### `upw_parallax_flag` {#upw_parallax_flag}
*🔌 pluggable*

```php
upw_parallax_flag( $set = false )
```

Static used-flag for Parallax; sets it when passed true and returns whether the module was used on the page.

<small>Source: `framework/extensions/animation-engine/modules/parallax/includes/parallax-helpers.php:26`</small>

### `upw_perf_note` {#upw_perf_note}
*🔌 pluggable*

```php
upw_perf_note( $scope = 'page' )
```

Shared "only loads when used" reassurance, surfaced on the animation pickers so users see — at the point of choice — that the engine won't bloat their pages. Kept HONEST: the runtime is enqueued per-PAGE (not per-effect — one file carries a category's effects, and shared libraries like GSAP load for any effect), so the accurate promise is "loads only on pages that use it", not "only the selected one".

| Parameter | Type | Description |
| --- | --- | --- |
| `$scope` | `string` | 'page' (per-element effects) \| 'site' (site-wide, e.g. cursor) |

<small>Source: `framework/extensions/animation-engine/includes/theme-settings.php:29`</small>

### `upw_phys_slider` {#upw_phys_slider}
*🔌 pluggable*

```php
upw_phys_slider( $label, $val, $min, $max, $step, $desc = '' )
```

Builds a physics slider option field by delegating to the shared upw_anim_slider builder.

<small>Source: `framework/extensions/animation-engine/modules/physics/includes/physics-helpers.php:40`</small>

### `upw_phys_trigger` {#upw_phys_trigger}
*🔌 pluggable*

```php
upw_phys_trigger( $default = 'hover' )
```

Returns a select option field for the physics trigger (hover or click/tap), with the given default.

<small>Source: `framework/extensions/animation-engine/modules/physics/includes/physics-helpers.php:46`</small>

### `upw_physics_effects` {#upw_physics_effects}
*🔌 pluggable*

```php
upw_physics_effects()
```

Valid physics-effect ids — single source of truth for emit + wrapper checks.

<small>Source: `framework/extensions/animation-engine/modules/physics/includes/physics-helpers.php:27`</small>

### `upw_physics_enabled` {#upw_physics_enabled}
*🔌 pluggable*

```php
upw_physics_enabled()
```

Animation Engine — Physics module: helpers.

The setting reader (upw_physics_enabled), the effect-id registry (upw_physics_effects) — the
single source of truth for emit + wrapper checks — and the
small option-builders (upw_phys_slider / upw_phys_trigger) that keep the choices array readable.
Loaded FIRST; the settings + render parts depend on these.

<small>Source: `framework/extensions/animation-engine/modules/physics/includes/physics-helpers.php:15`</small>

### `upw_preloader_enabled` {#upw_preloader_enabled}
*🔌 pluggable*

```php
upw_preloader_enabled()
```

Returns whether the site preloader is enabled in its settings.

<small>Source: `framework/extensions/animation-engine/modules/preloader/includes/preloader-helpers.php:105`</small>

### `upw_preloader_inner` {#upw_preloader_inner}
*🔌 pluggable*

```php
upw_preloader_inner( $style, $has_logo )
```

The animator markup for a preloader style (built into the overlay).

<small>Source: `framework/extensions/animation-engine/modules/preloader/includes/preloader-helpers.php:38`</small>

### `upw_preloader_settings` {#upw_preloader_settings}
*🔌 pluggable*

```php
upw_preloader_settings()
```

Resolve + cache the preloader settings for this request.

<small>Source: `framework/extensions/animation-engine/modules/preloader/includes/preloader-helpers.php:63`</small>

### `upw_preloader_style_opt` {#upw_preloader_style_opt}
*🔌 pluggable*

```php
upw_preloader_style_opt( $key, $default = null )
```

Read a per-style option for the CURRENT style from the `preloader_style` multi-picker reveal. Future preloader styles that ship their own options (declared in the style's `choices` reveal group) read them through this — e.g. upw_preloader_style_opt( 'count', 5 ).

<small>Source: `framework/extensions/animation-engine/modules/preloader/includes/preloader-helpers.php:117`</small>

### `upw_preloader_styles` {#upw_preloader_styles}
*🔌 pluggable*

```php
upw_preloader_styles()
```

Animation Engine — Preloader module: helpers.

The style registry, the per-style animator markup, the request-cached settings reader, the
enabled flag and the per-style option reader. Loaded first by preloader.php (the settings +
render parts depend on these). All wrapped in function_exists guards.

<small>Source: `framework/extensions/animation-engine/modules/preloader/includes/preloader-helpers.php:14`</small>

### `upw_prlx_slider` {#upw_prlx_slider}
*🔌 pluggable*

```php
upw_prlx_slider( $label, $val, $min, $max, $step, $desc = '' )
```

Builds a parallax slider option field by delegating to the shared upw_anim_slider builder.

<small>Source: `framework/extensions/animation-engine/modules/parallax/includes/parallax-helpers.php:37`</small>

### `upw_prlx_switch` {#upw_prlx_switch}
*🔌 pluggable*

```php
upw_prlx_switch( $label, $desc = '', $default_yes = false )
```

Returns a parallax on/off switch option field with the given label, description, and default.

<small>Source: `framework/extensions/animation-engine/modules/parallax/includes/parallax-helpers.php:43`</small>

### `upw_pt_enabled` {#upw_pt_enabled}
*🔌 pluggable*

```php
upw_pt_enabled()
```

Returns whether page transitions are enabled and not in the admin.

<small>Source: `framework/extensions/animation-engine/modules/page-transitions/includes/page-transitions-helpers.php:29`</small>

### `upw_pt_resolve` {#upw_pt_resolve}
*🔌 pluggable*

```php
upw_pt_resolve()
```

Read the transition multi-picker into a normalized [ type, dir, count, total ].

<small>Source: `framework/extensions/animation-engine/modules/page-transitions/includes/page-transitions-helpers.php:47`</small>

### `upw_pt_setting` {#upw_pt_setting}
*🔌 pluggable*

```php
upw_pt_setting( $key, $default = '' )
```

Animation Engine — Page Transitions module: helpers.

Setting reader, the transition-type registry, and the multi-picker resolver (single source of
truth for the picker + the runtime's normalized [ type, dir, count, total ]). Loaded first by
page-transitions.php (the settings + enqueue parts depend on these). All wrapped in
function_exists guards.

<small>Source: `framework/extensions/animation-engine/modules/page-transitions/includes/page-transitions-helpers.php:15`</small>

### `upw_pt_types` {#upw_pt_types}
*🔌 pluggable*

```php
upw_pt_types()
```

Returns the list of valid page-transition type keys.

<small>Source: `framework/extensions/animation-engine/modules/page-transitions/includes/page-transitions-helpers.php:36`</small>

### `upw_scroll_enabled` {#upw_scroll_enabled}
*🔌 pluggable*

```php
upw_scroll_enabled()
```

Returns whether the Scroll Motion module is enabled in Theme Settings (defaults to enabled).

<small>Source: `framework/extensions/animation-engine/includes/effects-control.php:26`</small>

### `upw_scroll_loop_enabled` {#upw_scroll_loop_enabled}
*🔌 pluggable*

```php
upw_scroll_loop_enabled()
```

Returns whether the Infinite Scroll Loop module is enabled in Theme Settings (defaults to enabled).

<small>Source: `framework/extensions/animation-engine/includes/effects-control.php:39`</small>

### `upw_scroll_reveal_enabled` {#upw_scroll_reveal_enabled}
*🔌 pluggable*

```php
upw_scroll_reveal_enabled()
```

Animation Engine — Scroll Reveal module: helpers.

The global master-switch reader and the per-request used-flag (gates the footer enqueue).
Loaded first by scroll-reveal.php — the settings + render parts depend on these. All wrapped
in function_exists guards.

<small>Source: `framework/extensions/animation-engine/modules/scroll-reveal/includes/scroll-reveal-helpers.php:14`</small>

### `upw_scroll_text_highlight_enabled` {#upw_scroll_text_highlight_enabled}
*🔌 pluggable*

```php
upw_scroll_text_highlight_enabled()
```

Animation Engine — Scroll Text Highlight module.

Reveals an element's words one-by-one as it scrolls through the viewport (the "scrollytelling"
read): each word goes from muted to full as the reader scrolls past it. Four styles — fill
(colour), fade (opacity), blur (blur→sharp) and marker (highlighter sweep). Per-element (attaches
from the Animations tab). The runtime splits the text into word/char spans and scrubs an .is-on
class from a passive, rAF-throttled scroll check — no library. Assets load only on pages that use
it. Global on/off: Theme Settings → Animations → Effects.

Saved value shape (multi-picker, picker id `mode`):
  [ 'mode' =&gt; 'off'|'&lt;style&gt;', '&lt;style&gt;' =&gt; [ split, active_color, duration, once ] ]

<small>Source: `framework/extensions/animation-engine/modules/scroll-text-highlight/scroll-text-highlight.php:20`</small>

### `upw_scroll_var_enabled` {#upw_scroll_var_enabled}
*🔌 pluggable*

```php
upw_scroll_var_enabled()
```

Returns whether the Scroll Variable module is enabled in Theme Settings (defaults to enabled).

<small>Source: `framework/extensions/animation-engine/modules/scroll-var/scroll-var.php:23`</small>

### `upw_scroll_var_options` {#upw_scroll_var_options}
*🔌 pluggable*

```php
upw_scroll_var_options()
```

The revealed options behind the tile (shared by the single `on` mode).

<small>Source: `framework/extensions/animation-engine/modules/scroll-var/scroll-var.php:48`</small>

### `upw_scroll_var_sanitize_name` {#upw_scroll_var_sanitize_name}
*🔌 pluggable*

```php
upw_scroll_var_sanitize_name( $name )
```

Sanitize a user string into a valid CSS custom-property name, forcing a leading `--`.

<small>Source: `framework/extensions/animation-engine/modules/scroll-var/scroll-var.php:35`</small>

### `upw_scrollprog_enabled` {#upw_scrollprog_enabled}
*🔌 pluggable*

```php
upw_scrollprog_enabled()
```

Animation Engine — Scroll Progress module.

A site-wide reading-progress indicator with 16 styles — bars (solid/gradient/glow/segmented/
pill/labelled/under-nav/liquid), a side edge bar, corner ring / ring-with-number / gauge /
battery, a %-counter or reading-time chip, and section scroll-spy dots. Tiny self-contained
JS/CSS, enqueued site-wide only when enabled. Configured in Theme Settings → Animations →
Scroll Progress (its own tab — a page-level indicator, not a per-element effect).

<small>Source: `framework/extensions/animation-engine/modules/scroll-progress/scroll-progress.php:16`</small>

### `upw_scrollytelling_directional` {#upw_scrollytelling_directional}
*🔌 pluggable*

```php
upw_scrollytelling_directional()
```

Styles that expose a Direction sub-option (up / down / left / right).

<small>Source: `framework/extensions/animation-engine/modules/scrollytelling/includes/scrollytelling-helpers.php:68`</small>

### `upw_scrollytelling_enabled` {#upw_scrollytelling_enabled}
*🔌 pluggable*

```php
upw_scrollytelling_enabled()
```

Animation Engine — Scrollytelling module: helpers.

Global master-switch reader, per-request used-flag, and the style registry (single source of
truth for the picker + the wrapper checks). Loaded first by scrollytelling.php. All wrapped in
function_exists guards.

<small>Source: `framework/extensions/animation-engine/modules/scrollytelling/includes/scrollytelling-helpers.php:14`</small>

### `upw_scrollytelling_style_keys` {#upw_scrollytelling_style_keys}
*🔌 pluggable*

```php
upw_scrollytelling_style_keys()
```

Returns the keys of the available scrollytelling styles.

<small>Source: `framework/extensions/animation-engine/modules/scrollytelling/includes/scrollytelling-helpers.php:75`</small>

### `upw_scrollytelling_styles` {#upw_scrollytelling_styles}
*🔌 pluggable*

```php
upw_scrollytelling_styles()
```

The valid style keys (label registry) — shared by the picker + the wrapper filter.

<small>Source: `framework/extensions/animation-engine/modules/scrollytelling/includes/scrollytelling-helpers.php:26`</small>

### `upw_skf_enabled` {#upw_skf_enabled}
*🔌 pluggable*

```php
upw_skf_enabled()
```

Global master switch (defaults to enabled, like every other module).

<small>Source: `framework/extensions/animation-engine/modules/scroll-keyframes/scroll-keyframes.php:28`</small>

### `upw_skf_flag` {#upw_skf_flag}
*🔌 pluggable*

```php
upw_skf_flag( $set = false )
```

Static used-flag for Scroll Keyframes; sets it when passed true and returns whether the module was used on the page.

<small>Source: `framework/extensions/animation-engine/modules/scroll-keyframes/scroll-keyframes.php:40`</small>

### `upw_smoothscroll_enabled` {#upw_smoothscroll_enabled}
*🔌 pluggable*

```php
upw_smoothscroll_enabled()
```

Returns whether smooth scrolling is enabled in Theme Settings (defaults to off).

<small>Source: `framework/extensions/animation-engine/modules/smooth-scroll/smooth-scroll.php:22`</small>

### `upw_sp_color` {#upw_sp_color}
*🔌 pluggable*

```php
upw_sp_color( $default_hex, $label = null )
```

Returns a compact color option field for the scroll-progress bar, defaulting to the given hex.

<small>Source: `framework/extensions/animation-engine/modules/scroll-progress/scroll-progress.php:27`</small>

### `upw_sth_resolve_color` {#upw_sth_resolve_color}
*🔌 pluggable*

```php
upw_sth_resolve_color( $val )
```

Resolve a compact-color value (array or legacy string) to a CSS color.

<small>Source: `framework/extensions/animation-engine/modules/scroll-text-highlight/scroll-text-highlight.php:60`</small>

### `upw_sth_styles` {#upw_sth_styles}
*🔌 pluggable*

```php
upw_sth_styles()
```

Returns the map of scroll-text-highlight style keys to their translated labels.

<small>Source: `framework/extensions/animation-engine/modules/scroll-text-highlight/scroll-text-highlight.php:32`</small>

### `upw_sticky_stack_enabled` {#upw_sticky_stack_enabled}
*🔌 pluggable*

```php
upw_sticky_stack_enabled()
```

Returns whether the Sticky Card Stack module is enabled in Theme Settings (defaults to enabled).

<small>Source: `framework/extensions/animation-engine/modules/sticky-stack/sticky-stack.php:23`</small>

### `upw_sticky_stack_styles` {#upw_sticky_stack_styles}
*🔌 pluggable*

```php
upw_sticky_stack_styles()
```

The valid style keys (shared by the wrapper filter + needs-wrapper).

<small>Source: `framework/extensions/animation-engine/modules/sticky-stack/sticky-stack.php:122`</small>

### `upw_text_color` {#upw_text_color}
*🔌 pluggable*

```php
upw_text_color( $val, $fallback = '' )
```

Resolve a preset-or-custom color to a CSS string (reuses the hover resolver).

<small>Source: `framework/extensions/animation-engine/modules/text-effects/includes/text-effects-helpers.php:57`</small>

### `upw_text_color_field` {#upw_text_color_field}
*🔌 pluggable*

```php
upw_text_color_field( $label, $kind = 'text', $default_hex = '', $desc = '' )
```

A palette-preset color field, reusing the hover module's helper when present.

<small>Source: `framework/extensions/animation-engine/modules/text-effects/includes/text-effects-helpers.php:45`</small>

### `upw_text_effects` {#upw_text_effects}
*🔌 pluggable*

```php
upw_text_effects()
```

The valid text-effect ids — single source of truth for emit + wrapper checks.

<small>Source: `framework/extensions/animation-engine/modules/text-effects/includes/text-effects-helpers.php:28`</small>

### `upw_text_enabled` {#upw_text_enabled}
*🔌 pluggable*

```php
upw_text_enabled()
```

Global master switch (Theme Settings → Animations → Text).

<small>Source: `framework/extensions/animation-engine/modules/text-effects/includes/text-effects-helpers.php:16`</small>

### `upw_text_trigger_list` {#upw_text_trigger_list}
*🔌 pluggable*

```php
upw_text_trigger_list( $raw )
```

Normalise a multi-select trigger value (array of view/load/click/hover, or a legacy scalar, or empty) into a space-separated list for data-text-trigger. Shared by every one-shot effect whose trigger is the multi image-picker (reveal family, scramble, typewriter, countup, splitflap, matrix). Defaults to 'view'.

<small>Source: `framework/extensions/animation-engine/modules/text-effects/includes/text-effects-render.php:24`</small>

### `upw_viewport_units_enabled` {#upw_viewport_units_enabled}
*🔌 pluggable*

```php
upw_viewport_units_enabled()
```

Animation Engine — Viewport Units module.

Publishes STABLE viewport-unit CSS custom properties site-wide on
document.documentElement: --vh = innerHeight/100 (px) and --vw = innerWidth/100
(px). Updated on resize + orientationchange only (never on scroll), so mobile
viewport units don't jump when the address bar shows/hides. Use them in custom
CSS as calc(var(--vh) * 100) for a jump-free 100vh, or var(--vw) for fluid
sizing. Tiny dependency-free JS, enqueued site-wide only when enabled.
Configured in Theme Settings → Animations → Viewport Units.

<small>Source: `framework/extensions/animation-engine/modules/viewport-units/viewport-units.php:18`</small>

← Back to [Functions overview](./index.md)
