---
title: Other Extensions — hooks
sidebar_label: Other Extensions
slug: /hooks/other-extensions
description: Actions and filters exposed by the UnysonPlus Other Extensions subsystem.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED — do not edit by hand. Edit the framework docblocks, then run: php scripts/extract-php-api.php … && node scripts/gen-php-api.mjs -->

# Other Extensions — hooks

**48 hooks** — 19 actions · 29 filters.

| Hook | Type | Summary |
| --- | --- | --- |
| [`fw_ext_gutenberg_blocks`](#h-fw-ext-gutenberg-blocks) | filter | Filters the registered Gutenberg block definitions keyed by directory name. |
| [`fw_le_revisions_max_bytes`](#h-fw-le-revisions-max-bytes) | filter | Filters the maximum stored bytes allowed per post for Live Editor revision history. |
| [`fw_tpl_lib_catalog_url`](#h-fw-tpl-lib-catalog-url) | filter | Filters the URL of the Template Library remote catalog.json that lists installable templates. |
| [`fw_tpl_lib_install_dir`](#h-fw-tpl-lib-install-dir) | filter | Filters the absolute uploads path where installed templates are stored (default uploads/unysonplus/templates). |
| [`unysonplus_newsletter_crm_batch_size`](#h-unysonplus-newsletter-crm-batch-size) | filter | Filters the number of recipients sent per campaign tick (capped at 500), letting hosts tune against SMTP rate limits. |
| [`unysonplus_newsletter_crm_campaign_deleted`](#h-unysonplus-newsletter-crm-campaign-deleted) | action | Fired after a campaign and its queue are deleted. |
| [`unysonplus_newsletter_crm_campaign_mail`](#h-unysonplus-newsletter-crm-campaign-mail) | filter | Filters the campaign email array (to, subject, body, headers) for a subscriber just before wp_mail() sends it. |
| [`unysonplus_newsletter_crm_campaign_paused`](#h-unysonplus-newsletter-crm-campaign-paused) | action | Fired when a send is paused. The queue is retained. |
| [`unysonplus_newsletter_crm_campaign_resumed`](#h-unysonplus-newsletter-crm-campaign-resumed) | action | Fires after a paused campaign is set back to sending or scheduled, passing the refreshed campaign object. |
| [`unysonplus_newsletter_crm_campaign_saved`](#h-unysonplus-newsletter-crm-campaign-saved) | action | Fired after a campaign is created or edited. |
| [`unysonplus_newsletter_crm_campaign_scheduled`](#h-unysonplus-newsletter-crm-campaign-scheduled) | action | Fired when a campaign is queued for sending (now or later). |
| [`unysonplus_newsletter_crm_campaign_sent`](#h-unysonplus-newsletter-crm-campaign-sent) | action | Fired once a campaign's queue is drained. |
| [`unysonplus_newsletter_crm_campaign_started`](#h-unysonplus-newsletter-crm-campaign-started) | action | Fired when a campaign's queue has been built and sending begins. |
| [`unysonplus_newsletter_crm_capability`](#h-unysonplus-newsletter-crm-capability) | filter | Filters the capability (default manage_options) required to reach the newsletter CRM admin screen and REST endpoints. |
| [`unysonplus_newsletter_crm_confirm_token_ttl`](#h-unysonplus-newsletter-crm-confirm-token-ttl) | filter | Filters the lifetime in seconds of a double-opt-in confirmation token (default 48 hours). |
| [`unysonplus_newsletter_crm_confirm_url`](#h-unysonplus-newsletter-crm-confirm-url) | filter | Filters the double-opt-in confirmation link built for a subscriber from their confirm token. |
| [`unysonplus_newsletter_crm_csv_fields`](#h-unysonplus-newsletter-crm-csv-fields) | filter | Filters the column map used when exporting subscribers to CSV. |
| [`unysonplus_newsletter_crm_email_block`](#h-unysonplus-newsletter-crm-email-block) | filter | Filters the HTML of a single compiled email block during Email Builder document compilation. |
| [`unysonplus_newsletter_crm_email_defaults`](#h-unysonplus-newsletter-crm-email-defaults) | filter | Filters the built-in global email styles (width, colors, font, line height) used as the compile context. |
| [`unysonplus_newsletter_crm_email_document`](#h-unysonplus-newsletter-crm-email-document) | filter | Filters the complete compiled email HTML document, with access to the row markup and style context. |
| [`unysonplus_newsletter_crm_email_templates`](#h-unysonplus-newsletter-crm-email-templates) | filter | Filters the list of starter templates offered in the Email Builder. |
| [`unysonplus_newsletter_crm_email_widths`](#h-unysonplus-newsletter-crm-email-widths) | filter | Filters the coarse column-width vocabulary (id to row fraction) the email builder offers. |
| [`unysonplus_newsletter_crm_endpoint_page`](#h-unysonplus-newsletter-crm-endpoint-page) | filter | Filters the public confirm/unsubscribe page body; return a string to replace the default response entirely. |
| [`unysonplus_newsletter_crm_field_map`](#h-unysonplus-newsletter-crm-field-map) | filter | Filters the outbound subscriber field map a provider sends to its ESP, given the subscriber and provider slug. |
| [`unysonplus_newsletter_crm_import_batch_seconds`](#h-unysonplus-newsletter-crm-import-batch-seconds) | filter | Filters the per-request time budget in seconds for a chunked CSV subscriber import (default 10). |
| [`unysonplus_newsletter_crm_import_batch_size`](#h-unysonplus-newsletter-crm-import-batch-size) | filter | Filters the number of CSV rows processed per import request (default 200). |
| [`unysonplus_newsletter_crm_list_deleted`](#h-unysonplus-newsletter-crm-list-deleted) | action | Fired after a list or tag is deleted. The row is already gone — this is a copy. |
| [`unysonplus_newsletter_crm_list_saved`](#h-unysonplus-newsletter-crm-list-saved) | action | Fired after a list or tag is created or edited. |
| [`unysonplus_newsletter_crm_mail`](#h-unysonplus-newsletter-crm-mail) | filter | Filters an outgoing transactional subscriber email array (to, subject, body, headers) before it is sent, given the subscriber and email kind. |
| [`unysonplus_newsletter_crm_mail_html`](#h-unysonplus-newsletter-crm-mail-html) | filter | Filters the sendable HTML for a pre-compiled email document body before delivery. |
| [`unysonplus_newsletter_crm_mail_placeholders`](#h-unysonplus-newsletter-crm-mail-placeholders) | filter | Filters the placeholder-to-value map used to personalize email text for a subscriber. |
| [`unysonplus_newsletter_crm_preview_subscriber`](#h-unysonplus-newsletter-crm-preview-subscriber) | filter | Filters the stand-in subscriber object a campaign preview is rendered against. |
| [`unysonplus_newsletter_crm_providers`](#h-unysonplus-newsletter-crm-providers) | filter | Filters the registered ESP provider map (keyed by slug) so add-ons can register integrations. |
| [`unysonplus_newsletter_crm_segment_deleted`](#h-unysonplus-newsletter-crm-segment-deleted) | action | Fired after a segment is deleted. |
| [`unysonplus_newsletter_crm_segment_saved`](#h-unysonplus-newsletter-crm-segment-saved) | action | Fired after a segment is created or edited. |
| [`unysonplus_newsletter_crm_subscriber_added`](#h-unysonplus-newsletter-crm-subscriber-added) | action | Fired once, when a brand-new subscriber row is created. |
| [`unysonplus_newsletter_crm_subscriber_confirmed`](#h-unysonplus-newsletter-crm-subscriber-confirmed) | action | Fired when double opt-in completes. |
| [`unysonplus_newsletter_crm_subscriber_data`](#h-unysonplus-newsletter-crm-subscriber-data) | filter | Filters a subscriber row immediately before it is written, the shared seam for CSV import and ESP adapters. |
| [`unysonplus_newsletter_crm_subscriber_deleted`](#h-unysonplus-newsletter-crm-subscriber-deleted) | action | Fired after a hard delete. The row is already gone — this is a copy. |
| [`unysonplus_newsletter_crm_subscriber_imported`](#h-unysonplus-newsletter-crm-subscriber-imported) | action | Fired per row during a CSV import. |
| [`unysonplus_newsletter_crm_subscriber_resubscribed`](#h-unysonplus-newsletter-crm-subscriber-resubscribed) | action | Fired when a previously opted-out address comes back — distinct from _added. |
| [`unysonplus_newsletter_crm_subscriber_unsubscribed`](#h-unysonplus-newsletter-crm-subscriber-unsubscribed) | action | Fired on opt-out, from any path. |
| [`unysonplus_newsletter_crm_subscriber_updated`](#h-unysonplus-newsletter-crm-subscriber-updated) | action | Fired when an existing subscriber's data changed. |
| [`unysonplus_newsletter_crm_unsubscribe_url`](#h-unysonplus-newsletter-crm-unsubscribe-url) | filter | Filters the unsubscribe link built for a subscriber from their unsubscribe token. |
| [`unysonplus_newsletter_crm_validate`](#h-unysonplus-newsletter-crm-validate) | filter | Filters signup acceptance before storing; return a WP_Error to veto an address via blocklist or spam checks. |
| [`upwc_mini_cart_empty`](#h-upwc-mini-cart-empty) | action | Fires inside the empty mini-cart render before default markup, letting a theme output its own empty-cart block. |
| [`upwc_mini_cart_empty_html`](#h-upwc-mini-cart-empty-html) | filter | Filters the rendered empty mini-cart HTML before it is returned. |
| [`upwc_wc_free_shipping_threshold`](#h-upwc-wc-free-shipping-threshold) | filter | Filters the detected free-shipping minimum-amount threshold used by the WooCommerce integration. |

---

### `fw_ext_gutenberg_blocks` {#h-fw-ext-gutenberg-blocks}
*🧪 filter*

Filters the registered Gutenberg block definitions keyed by directory name.

```php
add_filter( 'fw_ext_gutenberg_blocks', $callback );
```
<small>Fired in: `framework/extensions/gutenberg/class-fw-extension-gutenberg.php:855`</small>

### `fw_le_revisions_max_bytes` {#h-fw-le-revisions-max-bytes}
*🧪 filter*

Filters the maximum stored bytes allowed per post for Live Editor revision history.

```php
add_filter( 'fw_le_revisions_max_bytes', $callback );
```
<small>Fired in: `framework/extensions/live-editor/class-fw-extension-live-editor.php:1976`</small>

### `fw_tpl_lib_catalog_url` {#h-fw-tpl-lib-catalog-url}
*🧪 filter*

Filters the URL of the Template Library remote catalog.json that lists installable templates.

```php
add_filter( 'fw_tpl_lib_catalog_url', $callback );
```
<small>Fired in: `framework/extensions/template-library/includes/installer.php:64`</small>

### `fw_tpl_lib_install_dir` {#h-fw-tpl-lib-install-dir}
*🧪 filter*

Filters the absolute uploads path where installed templates are stored (default uploads/unysonplus/templates).

```php
add_filter( 'fw_tpl_lib_install_dir', $callback );
```
<small>Fired in: `framework/extensions/template-library/includes/installer.php:29`</small>

### `unysonplus_newsletter_crm_batch_size` {#h-unysonplus-newsletter-crm-batch-size}
*🧪 filter*

Filters the number of recipients sent per campaign tick (capped at 500), letting hosts tune against SMTP rate limits.

```php
add_filter( 'unysonplus_newsletter_crm_batch_size', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-sender.php:341`</small>

### `unysonplus_newsletter_crm_campaign_deleted` {#h-unysonplus-newsletter-crm-campaign-deleted}
*🎬 action*

Fired after a campaign and its queue are deleted.

```php
add_action( 'unysonplus_newsletter_crm_campaign_deleted', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-service.php:948`</small>

### `unysonplus_newsletter_crm_campaign_mail` {#h-unysonplus-newsletter-crm-campaign-mail}
*🧪 filter*

Filters the campaign email array (to, subject, body, headers) for a subscriber just before wp_mail() sends it.

```php
add_filter( 'unysonplus_newsletter_crm_campaign_mail', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-sender.php:246`</small>

### `unysonplus_newsletter_crm_campaign_paused` {#h-unysonplus-newsletter-crm-campaign-paused}
*🎬 action*

Fired when a send is paused. The queue is retained.

```php
add_action( 'unysonplus_newsletter_crm_campaign_paused', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-service.php:899`</small>

### `unysonplus_newsletter_crm_campaign_resumed` {#h-unysonplus-newsletter-crm-campaign-resumed}
*🎬 action*

Fires after a paused campaign is set back to sending or scheduled, passing the refreshed campaign object.

```php
add_action( 'unysonplus_newsletter_crm_campaign_resumed', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-service.php:927`</small>

### `unysonplus_newsletter_crm_campaign_saved` {#h-unysonplus-newsletter-crm-campaign-saved}
*🎬 action*

Fired after a campaign is created or edited.

```php
add_action( 'unysonplus_newsletter_crm_campaign_saved', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-service.php:793`</small>

### `unysonplus_newsletter_crm_campaign_scheduled` {#h-unysonplus-newsletter-crm-campaign-scheduled}
*🎬 action*

Fired when a campaign is queued for sending (now or later).

```php
add_action( 'unysonplus_newsletter_crm_campaign_scheduled', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-service.php:874`</small>

### `unysonplus_newsletter_crm_campaign_sent` {#h-unysonplus-newsletter-crm-campaign-sent}
*🎬 action*

Fired once a campaign's queue is drained.

```php
add_action( 'unysonplus_newsletter_crm_campaign_sent', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-sender.php:324`</small>

### `unysonplus_newsletter_crm_campaign_started` {#h-unysonplus-newsletter-crm-campaign-started}
*🎬 action*

Fired when a campaign's queue has been built and sending begins.

```php
add_action( 'unysonplus_newsletter_crm_campaign_started', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-sender.php:172`</small>

### `unysonplus_newsletter_crm_capability` {#h-unysonplus-newsletter-crm-capability}
*🧪 filter*

Filters the capability (default manage_options) required to reach the newsletter CRM admin screen and REST endpoints.

```php
add_filter( 'unysonplus_newsletter_crm_capability', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-service.php:76`</small>

### `unysonplus_newsletter_crm_confirm_token_ttl` {#h-unysonplus-newsletter-crm-confirm-token-ttl}
*🧪 filter*

Filters the lifetime in seconds of a double-opt-in confirmation token (default 48 hours).

```php
add_filter( 'unysonplus_newsletter_crm_confirm_token_ttl', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-service.php:227`</small>

### `unysonplus_newsletter_crm_confirm_url` {#h-unysonplus-newsletter-crm-confirm-url}
*🧪 filter*

Filters the double-opt-in confirmation link built for a subscriber from their confirm token.

```php
add_filter( 'unysonplus_newsletter_crm_confirm_url', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-endpoints.php:55`</small>

### `unysonplus_newsletter_crm_csv_fields` {#h-unysonplus-newsletter-crm-csv-fields}
*🧪 filter*

Filters the column map used when exporting subscribers to CSV.

```php
add_filter( 'unysonplus_newsletter_crm_csv_fields', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-csv.php:42`</small>

### `unysonplus_newsletter_crm_email_block` {#h-unysonplus-newsletter-crm-email-block}
*🧪 filter*

Filters the HTML of a single compiled email block during Email Builder document compilation.

```php
add_filter( 'unysonplus_newsletter_crm_email_block', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-email-compiler.php:108`</small>

### `unysonplus_newsletter_crm_email_defaults` {#h-unysonplus-newsletter-crm-email-defaults}
*🧪 filter*

Filters the built-in global email styles (width, colors, font, line height) used as the compile context.

```php
add_filter( 'unysonplus_newsletter_crm_email_defaults', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-email-compiler.php:40`</small>

### `unysonplus_newsletter_crm_email_document` {#h-unysonplus-newsletter-crm-email-document}
*🧪 filter*

Filters the complete compiled email HTML document, with access to the row markup and style context.

```php
add_filter( 'unysonplus_newsletter_crm_email_document', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-email-compiler.php:450`</small>

### `unysonplus_newsletter_crm_email_templates` {#h-unysonplus-newsletter-crm-email-templates}
*🧪 filter*

Filters the list of starter templates offered in the Email Builder.

```php
add_filter( 'unysonplus_newsletter_crm_email_templates', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-email-templates.php:90`</small>

### `unysonplus_newsletter_crm_email_widths` {#h-unysonplus-newsletter-crm-email-widths}
*🧪 filter*

Filters the coarse column-width vocabulary (id to row fraction) the email builder offers.

```php
add_filter( 'unysonplus_newsletter_crm_email_widths', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-email-compiler.php:139`</small>

### `unysonplus_newsletter_crm_endpoint_page` {#h-unysonplus-newsletter-crm-endpoint-page}
*🧪 filter*

Filters the public confirm/unsubscribe page body; return a string to replace the default response entirely.

```php
add_filter( 'unysonplus_newsletter_crm_endpoint_page', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-endpoints.php:270`</small>

### `unysonplus_newsletter_crm_field_map` {#h-unysonplus-newsletter-crm-field-map}
*🧪 filter*

Filters the outbound subscriber field map a provider sends to its ESP, given the subscriber and provider slug.

```php
add_filter( 'unysonplus_newsletter_crm_field_map', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/providers/class-fw-newsletter-crm-provider.php:158`</small>

### `unysonplus_newsletter_crm_import_batch_seconds` {#h-unysonplus-newsletter-crm-import-batch-seconds}
*🧪 filter*

Filters the per-request time budget in seconds for a chunked CSV subscriber import (default 10).

```php
add_filter( 'unysonplus_newsletter_crm_import_batch_seconds', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-admin-page.php:868`</small>

### `unysonplus_newsletter_crm_import_batch_size` {#h-unysonplus-newsletter-crm-import-batch-size}
*🧪 filter*

Filters the number of CSV rows processed per import request (default 200).

```php
add_filter( 'unysonplus_newsletter_crm_import_batch_size', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-admin-page.php:861`</small>

### `unysonplus_newsletter_crm_list_deleted` {#h-unysonplus-newsletter-crm-list-deleted}
*🎬 action*

Fired after a list or tag is deleted. The row is already gone — this is a copy.

```php
add_action( 'unysonplus_newsletter_crm_list_deleted', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-service.php:531`</small>

### `unysonplus_newsletter_crm_list_saved` {#h-unysonplus-newsletter-crm-list-saved}
*🎬 action*

Fired after a list or tag is created or edited.

```php
add_action( 'unysonplus_newsletter_crm_list_saved', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-service.php:508`</small>

### `unysonplus_newsletter_crm_mail` {#h-unysonplus-newsletter-crm-mail}
*🧪 filter*

Filters an outgoing transactional subscriber email array (to, subject, body, headers) before it is sent, given the subscriber and email kind.

```php
add_filter( 'unysonplus_newsletter_crm_mail', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-mail.php:118`</small>

### `unysonplus_newsletter_crm_mail_html` {#h-unysonplus-newsletter-crm-mail-html}
*🧪 filter · 2 call sites*

Filters the sendable HTML for a pre-compiled email document body before delivery.

```php
add_filter( 'unysonplus_newsletter_crm_mail_html', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-mail.php:273`</small>

### `unysonplus_newsletter_crm_mail_placeholders` {#h-unysonplus-newsletter-crm-mail-placeholders}
*🧪 filter*

Filters the placeholder-to-value map used to personalize email text for a subscriber.

```php
add_filter( 'unysonplus_newsletter_crm_mail_placeholders', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-mail.php:213`</small>

### `unysonplus_newsletter_crm_preview_subscriber` {#h-unysonplus-newsletter-crm-preview-subscriber}
*🧪 filter*

Filters the stand-in subscriber object a campaign preview is rendered against.

```php
add_filter( 'unysonplus_newsletter_crm_preview_subscriber', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-service.php:1096`</small>

### `unysonplus_newsletter_crm_providers` {#h-unysonplus-newsletter-crm-providers}
*🧪 filter*

Filters the registered ESP provider map (keyed by slug) so add-ons can register integrations.

```php
add_filter( 'unysonplus_newsletter_crm_providers', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-service.php:57`</small>

### `unysonplus_newsletter_crm_segment_deleted` {#h-unysonplus-newsletter-crm-segment-deleted}
*🎬 action*

Fired after a segment is deleted.

```php
add_action( 'unysonplus_newsletter_crm_segment_deleted', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-service.php:653`</small>

### `unysonplus_newsletter_crm_segment_saved` {#h-unysonplus-newsletter-crm-segment-saved}
*🎬 action*

Fired after a segment is created or edited.

```php
add_action( 'unysonplus_newsletter_crm_segment_saved', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-service.php:632`</small>

### `unysonplus_newsletter_crm_subscriber_added` {#h-unysonplus-newsletter-crm-subscriber-added}
*🎬 action*

Fired once, when a brand-new subscriber row is created.

```php
add_action( 'unysonplus_newsletter_crm_subscriber_added', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-service.php:193`</small>

### `unysonplus_newsletter_crm_subscriber_confirmed` {#h-unysonplus-newsletter-crm-subscriber-confirmed}
*🎬 action*

Fired when double opt-in completes.

```php
add_action( 'unysonplus_newsletter_crm_subscriber_confirmed', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-service.php:248`</small>

### `unysonplus_newsletter_crm_subscriber_data` {#h-unysonplus-newsletter-crm-subscriber-data}
*🧪 filter · 2 call sites*

Filters a subscriber row immediately before it is written, the shared seam for CSV import and ESP adapters.

```php
add_filter( 'unysonplus_newsletter_crm_subscriber_data', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-service.php:172`</small>

### `unysonplus_newsletter_crm_subscriber_deleted` {#h-unysonplus-newsletter-crm-subscriber-deleted}
*🎬 action*

Fired after a hard delete. The row is already gone — this is a copy.

```php
add_action( 'unysonplus_newsletter_crm_subscriber_deleted', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-service.php:384`</small>

### `unysonplus_newsletter_crm_subscriber_imported` {#h-unysonplus-newsletter-crm-subscriber-imported}
*🎬 action*

Fired per row during a CSV import.

```php
add_action( 'unysonplus_newsletter_crm_subscriber_imported', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-service.php:437`</small>

### `unysonplus_newsletter_crm_subscriber_resubscribed` {#h-unysonplus-newsletter-crm-subscriber-resubscribed}
*🎬 action*

Fired when a previously opted-out address comes back — distinct from _added.

```php
add_action( 'unysonplus_newsletter_crm_subscriber_resubscribed', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-service.php:196`</small>

### `unysonplus_newsletter_crm_subscriber_unsubscribed` {#h-unysonplus-newsletter-crm-subscriber-unsubscribed}
*🎬 action*

Fired on opt-out, from any path.

```php
add_action( 'unysonplus_newsletter_crm_subscriber_unsubscribed', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-service.php:321`</small>

### `unysonplus_newsletter_crm_subscriber_updated` {#h-unysonplus-newsletter-crm-subscriber-updated}
*🎬 action · 5 call sites*

Fired when an existing subscriber's data changed.

```php
add_action( 'unysonplus_newsletter_crm_subscriber_updated', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-admin-page.php:479`</small>

### `unysonplus_newsletter_crm_unsubscribe_url` {#h-unysonplus-newsletter-crm-unsubscribe-url}
*🧪 filter*

Filters the unsubscribe link built for a subscriber from their unsubscribe token.

```php
add_filter( 'unysonplus_newsletter_crm_unsubscribe_url', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-endpoints.php:73`</small>

### `unysonplus_newsletter_crm_validate` {#h-unysonplus-newsletter-crm-validate}
*🧪 filter*

Filters signup acceptance before storing; return a WP_Error to veto an address via blocklist or spam checks.

```php
add_filter( 'unysonplus_newsletter_crm_validate', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-service.php:109`</small>

### `upwc_mini_cart_empty` {#h-upwc-mini-cart-empty}
*🎬 action*

Fires inside the empty mini-cart render before default markup, letting a theme output its own empty-cart block.

```php
add_action( 'upwc_mini_cart_empty', $callback );
```
<small>Fired in: `framework/extensions/woocommerce/includes/mini-cart-render.php:233`</small>

### `upwc_mini_cart_empty_html` {#h-upwc-mini-cart-empty-html}
*🧪 filter*

Filters the rendered empty mini-cart HTML before it is returned.

```php
add_filter( 'upwc_mini_cart_empty_html', $callback );
```
<small>Fired in: `framework/extensions/woocommerce/includes/mini-cart-render.php:264`</small>

### `upwc_wc_free_shipping_threshold` {#h-upwc-wc-free-shipping-threshold}
*🧪 filter*

Filters the detected free-shipping minimum-amount threshold used by the WooCommerce integration.

```php
add_filter( 'upwc_wc_free_shipping_threshold', $callback );
```
<small>Fired in: `framework/extensions/woocommerce/helpers.php:112`</small>

← Back to [Hooks overview](./index.md)
