---
title: Portfolio — functions
sidebar_label: Portfolio
slug: /functions/portfolio
description: Public PHP helper functions in the UnysonPlus Portfolio subsystem — signatures, parameters, and return values.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED — do not edit by hand. Edit the framework docblocks, then run: php scripts/extract-php-api.php … && node scripts/gen-php-api.mjs -->

# Portfolio — functions

**20 public functions.** 0 are 🔌 pluggable (`function_exists()`-guarded, so a theme/child can override them).

| Function | Summary |
| --- | --- |
| [`fw_ext_portfolio`](#fw_ext_portfolio) | Convenience accessor for the portfolio extension instance. |
| [`fw_ext_portfolio_get_gallery_images`](#fw_ext_portfolio_get_gallery_images) | — |
| [`fw_ext_portfolio_get_project_meta`](#fw_ext_portfolio_get_project_meta) | Read a project's "Project Details" meta (client, URL, date, services, summary, featured). Returns raw saved values; rendering helpers escape. |
| [`fw_ext_portfolio_get_related`](#fw_ext_portfolio_get_related) | Query projects related to the given one (sharing a portfolio category). Falls back to the most recent projects when none share a category. |
| [`fw_ext_portfolio_grid_attrs`](#fw_ext_portfolio_grid_attrs) | Compute the class list + inline custom-property style for a portfolio card grid from its display args. Shared by the [portfolio] element's grid and the archive views so both speak the same CSS contract. |
| [`fw_ext_portfolio_grid_query_export`](#fw_ext_portfolio_grid_query_export) | The subset of grid args the AJAX endpoint needs to re-run the query and re-render cards. Display-only knobs (columns/gap/ratio/hover/layout) stay client-side — appended cards inherit the grid's CSS contract. |
| [`fw_ext_portfolio_is_featured`](#fw_ext_portfolio_is_featured) | Whether a project is flagged as featured. |
| [`fw_ext_portfolio_query_projects`](#fw_ext_portfolio_query_projects) | Query one page of projects for the grid. |
| [`fw_ext_portfolio_render_archive_filter_links`](#fw_ext_portfolio_render_archive_filter_links) | Render the archive filter bar as REAL taxonomy links (not JS show/hide) — each category filter is its own crawlable taxonomy archive URL, so the bar stays correct alongside pagination and is SEO-visible. Used by the extension's archive/taxonomy views. Returns '' with fewer than 2 terms. |
| [`fw_ext_portfolio_render_card`](#fw_ext_portfolio_render_card) | Render a single project card (thumbnail + title + optional summary). Shared by the related row and the [portfolio] grid so they stay identical. |
| [`fw_ext_portfolio_render_cards`](#fw_ext_portfolio_render_cards) | Render just the cards for a set of projects (the grid inner HTML) — used by the initial render and by the AJAX filter / load-more responses. |
| [`fw_ext_portfolio_render_gallery`](#fw_ext_portfolio_render_gallery) | — |
| [`fw_ext_portfolio_render_grid`](#fw_ext_portfolio_render_grid) | — |
| [`fw_ext_portfolio_render_prevnext`](#fw_ext_portfolio_render_prevnext) | Render previous / next project navigation for the single view — thumbnail + direction label + project title (the title keeps the link text descriptive per the house link-text rule). Adjacency follows publish order; optionally constrained to projects sharing a portfolio category. |
| [`fw_ext_portfolio_render_project_meta`](#fw_ext_portfolio_render_project_meta) | Render a project's details as a definition list. Empty fields are skipped; returns '' when there is nothing to show. |
| [`fw_ext_portfolio_render_related`](#fw_ext_portfolio_render_related) | Render a row of related-project cards. |
| [`fw_ext_portfolio_render_results`](#fw_ext_portfolio_render_results) | Render a project's Results / metrics band. Returns '' when no metrics are filled in. |
| [`fw_ext_portfolio_render_testimonial`](#fw_ext_portfolio_render_testimonial) | Render a project's client testimonial (quote + author + company). Returns '' when no quote is set. |
| [`fw_ext_portfolio_sanitize_grid_args`](#fw_ext_portfolio_sanitize_grid_args) | Whitelist-sanitize the grid args (shared by render time and the AJAX endpoint, where the args arrive from the client and must be re-validated). |
| [`fw_ext_portfolio_sanitize_heading_tag`](#fw_ext_portfolio_sanitize_heading_tag) | Sanitize a heading-tag choice for the rendering helpers. Levels are chosen by outline position (house rule: no skipped levels), so h2 is the default — portfolio sections sit directly under the page h1 on most themes. |

---

### `fw_ext_portfolio` {#fw_ext_portfolio}

```php
fw_ext_portfolio()
```

Convenience accessor for the portfolio extension instance.

**Returns** `FW_Extension_Portfolio\|null`

<small>Source: `framework/extensions/portfolio/helpers.php:40`</small>

### `fw_ext_portfolio_get_gallery_images` {#fw_ext_portfolio_get_gallery_images}

```php
fw_ext_portfolio_get_gallery_images( $post_id = 0 )
```

<small>Source: `framework/extensions/portfolio/helpers.php:5`</small>

### `fw_ext_portfolio_get_project_meta` {#fw_ext_portfolio_get_project_meta}

```php
fw_ext_portfolio_get_project_meta( $post_id = 0 )
```

Read a project's "Project Details" meta (client, URL, date, services, summary, featured). Returns raw saved values; rendering helpers escape.

| Parameter | Type | Description |
| --- | --- | --- |
| `$post_id` | `int` | 0 = current post. |

**Returns** `array&#123;client:string,url:string,date:string,services:string,summary:string,featured:bool&#125;`

<small>Source: `framework/extensions/portfolio/helpers.php:52`</small>

### `fw_ext_portfolio_get_related` {#fw_ext_portfolio_get_related}

```php
fw_ext_portfolio_get_related( $post_id = 0, $count = 3 )
```

Query projects related to the given one (sharing a portfolio category). Falls back to the most recent projects when none share a category.

| Parameter | Type | Description |
| --- | --- | --- |
| `$post_id` | `int` | — |
| `$count` | `int` | — |

**Returns** `WP_Post[]`

<small>Source: `framework/extensions/portfolio/helpers.php:283`</small>

### `fw_ext_portfolio_grid_attrs` {#fw_ext_portfolio_grid_attrs}

```php
fw_ext_portfolio_grid_attrs( $args = array() )
```

Compute the class list + inline custom-property style for a portfolio card grid from its display args. Shared by the [portfolio] element's grid and the archive views so both speak the same CSS contract.

| Parameter | Type | Description |
| --- | --- | --- |
| `$args` | `array` | &#123; @type int $columns; @type int $gap; @type string $ratio 1-1\|4-3\|3-2\|16-9\|3-4\|auto; @type string $hover zoom\|overlay\|grayscale\|none; &#125; |

**Returns** `array&#123;class:string,style:string&#125;`

<small>Source: `framework/extensions/portfolio/helpers.php:489`</small>

### `fw_ext_portfolio_grid_query_export` {#fw_ext_portfolio_grid_query_export}

```php
fw_ext_portfolio_grid_query_export( $args )
```

The subset of grid args the AJAX endpoint needs to re-run the query and re-render cards. Display-only knobs (columns/gap/ratio/hover/layout) stay client-side — appended cards inherit the grid's CSS contract.

| Parameter | Type | Description |
| --- | --- | --- |
| `$args` | `array` | Sanitized grid args. |

**Returns** `array`

<small>Source: `framework/extensions/portfolio/helpers.php:692`</small>

### `fw_ext_portfolio_is_featured` {#fw_ext_portfolio_is_featured}

```php
fw_ext_portfolio_is_featured( $post_id = 0 )
```

Whether a project is flagged as featured.

| Parameter | Type | Description |
| --- | --- | --- |
| `$post_id` | `int` | — |

**Returns** `bool`

<small>Source: `framework/extensions/portfolio/helpers.php:103`</small>

### `fw_ext_portfolio_query_projects` {#fw_ext_portfolio_query_projects}

```php
fw_ext_portfolio_query_projects( $args, $page = 1 )
```

Query one page of projects for the grid.

| Parameter | Type | Description |
| --- | --- | --- |
| `$args` | `array` | Sanitized grid args. |
| `$page` | `int` | 1-based page (meaningful when count &gt; 0). |

**Returns** `array&#123;posts:WP_Post[],max:int&#125;`

<small>Source: `framework/extensions/portfolio/helpers.php:715`</small>

### `fw_ext_portfolio_render_archive_filter_links` {#fw_ext_portfolio_render_archive_filter_links}

```php
fw_ext_portfolio_render_archive_filter_links()
```

Render the archive filter bar as REAL taxonomy links (not JS show/hide) — each category filter is its own crawlable taxonomy archive URL, so the bar stays correct alongside pagination and is SEO-visible. Used by the extension's archive/taxonomy views. Returns '' with fewer than 2 terms.

**Returns** `string`

<small>Source: `framework/extensions/portfolio/helpers.php:813`</small>

### `fw_ext_portfolio_render_card` {#fw_ext_portfolio_render_card}

```php
fw_ext_portfolio_render_card( $project, $args = array() )
```

Render a single project card (thumbnail + title + optional summary). Shared by the related row and the [portfolio] grid so they stay identical.

| Parameter | Type | Description |
| --- | --- | --- |
| `$project` | `WP_Post\|int` | — |
| `$args` | `array` | &#123; @type bool $show_summary; @type bool $show_category; @type string $image_size; @type string $classes; &#125; |

**Returns** `string`

<small>Source: `framework/extensions/portfolio/helpers.php:387`</small>

### `fw_ext_portfolio_render_cards` {#fw_ext_portfolio_render_cards}

```php
fw_ext_portfolio_render_cards( $posts, $args )
```

Render just the cards for a set of projects (the grid inner HTML) — used by the initial render and by the AJAX filter / load-more responses.

| Parameter | Type | Description |
| --- | --- | --- |
| `$posts` | `WP_Post[]` | — |
| `$args` | `array` | Sanitized grid args (display subset). |

**Returns** `string`

<small>Source: `framework/extensions/portfolio/helpers.php:768`</small>

### `fw_ext_portfolio_render_gallery` {#fw_ext_portfolio_render_gallery}

```php
fw_ext_portfolio_render_gallery( $post_id = 0, $args = array() )
```

<small>Source: `framework/extensions/portfolio/helpers.php:931`</small>

### `fw_ext_portfolio_render_grid` {#fw_ext_portfolio_render_grid}

```php
fw_ext_portfolio_render_grid( $args = array() )
```

<small>Source: `framework/extensions/portfolio/helpers.php:543`</small>

### `fw_ext_portfolio_render_prevnext` {#fw_ext_portfolio_render_prevnext}

```php
fw_ext_portfolio_render_prevnext( $post_id = 0, $args = array() )
```

Render previous / next project navigation for the single view — thumbnail + direction label + project title (the title keeps the link text descriptive per the house link-text rule). Adjacency follows publish order; optionally constrained to projects sharing a portfolio category.

for signature symmetry with the other renderers.

| Parameter | Type | Description |
| --- | --- | --- |
| `$post_id` | `int` | Unused (adjacency comes from the global post) — kept |
| `$args` | `array` | &#123; @type bool $same_category Constrain to same category. &#125; |

**Returns** `string`

<small>Source: `framework/extensions/portfolio/helpers.php:864`</small>

### `fw_ext_portfolio_render_project_meta` {#fw_ext_portfolio_render_project_meta}

```php
fw_ext_portfolio_render_project_meta( $post_id = 0, $args = array() )
```

Render a project's details as a definition list. Empty fields are skipped; returns '' when there is nothing to show.

| Parameter | Type | Description |
| --- | --- | --- |
| `$post_id` | `int` | 0 = current post. |
| `$args` | `array` | &#123; @type string $heading Optional heading above the list. @type string $heading_tag h2-h6\|div, default h2. &#125; |

**Returns** `string`

<small>Source: `framework/extensions/portfolio/helpers.php:118`</small>

### `fw_ext_portfolio_render_related` {#fw_ext_portfolio_render_related}

```php
fw_ext_portfolio_render_related( $post_id = 0, $args = array() )
```

Render a row of related-project cards.

| Parameter | Type | Description |
| --- | --- | --- |
| `$post_id` | `int` | — |
| `$args` | `array` | &#123; @type int $count; @type string $heading; @type string $heading_tag h2-h6\|div, default h2. &#125; |

**Returns** `string`

<small>Source: `framework/extensions/portfolio/helpers.php:350`</small>

### `fw_ext_portfolio_render_results` {#fw_ext_portfolio_render_results}

```php
fw_ext_portfolio_render_results( $post_id = 0 )
```

Render a project's Results / metrics band. Returns '' when no metrics are filled in.

| Parameter | Type | Description |
| --- | --- | --- |
| `$post_id` | `int` | — |

**Returns** `string`

<small>Source: `framework/extensions/portfolio/helpers.php:208`</small>

### `fw_ext_portfolio_render_testimonial` {#fw_ext_portfolio_render_testimonial}

```php
fw_ext_portfolio_render_testimonial( $post_id = 0 )
```

Render a project's client testimonial (quote + author + company). Returns '' when no quote is set.

| Parameter | Type | Description |
| --- | --- | --- |
| `$post_id` | `int` | — |

**Returns** `string`

<small>Source: `framework/extensions/portfolio/helpers.php:244`</small>

### `fw_ext_portfolio_sanitize_grid_args` {#fw_ext_portfolio_sanitize_grid_args}

```php
fw_ext_portfolio_sanitize_grid_args( $args )
```

Whitelist-sanitize the grid args (shared by render time and the AJAX endpoint, where the args arrive from the client and must be re-validated).

| Parameter | Type | Description |
| --- | --- | --- |
| `$args` | `array` | — |

**Returns** `array`

<small>Source: `framework/extensions/portfolio/helpers.php:631`</small>

### `fw_ext_portfolio_sanitize_heading_tag` {#fw_ext_portfolio_sanitize_heading_tag}

```php
fw_ext_portfolio_sanitize_heading_tag( $tag, $default = 'h2' )
```

Sanitize a heading-tag choice for the rendering helpers. Levels are chosen by outline position (house rule: no skipped levels), so h2 is the default — portfolio sections sit directly under the page h1 on most themes.

| Parameter | Type | Description |
| --- | --- | --- |
| `$tag` | `string` | — |
| `$default` | `string` | — |

**Returns** `string`

<small>Source: `framework/extensions/portfolio/helpers.php:27`</small>

← Back to [Functions overview](./index.md)
