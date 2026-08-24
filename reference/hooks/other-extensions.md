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
| [`fw_ext_gutenberg_blocks`](#h-fw-ext-gutenberg-blocks) | filter | — |
| [`fw_le_revisions_max_bytes`](#h-fw-le-revisions-max-bytes) | filter | — |
| [`fw_tpl_lib_catalog_url`](#h-fw-tpl-lib-catalog-url) | filter | — |
| [`fw_tpl_lib_install_dir`](#h-fw-tpl-lib-install-dir) | filter | — |
| [`unysonplus_newsletter_crm_batch_size`](#h-unysonplus-newsletter-crm-batch-size) | filter | — |
| [`unysonplus_newsletter_crm_campaign_deleted`](#h-unysonplus-newsletter-crm-campaign-deleted) | action | Fired after a campaign and its queue are deleted. |
| [`unysonplus_newsletter_crm_campaign_mail`](#h-unysonplus-newsletter-crm-campaign-mail) | filter | — |
| [`unysonplus_newsletter_crm_campaign_paused`](#h-unysonplus-newsletter-crm-campaign-paused) | action | Fired when a send is paused. The queue is retained. |
| [`unysonplus_newsletter_crm_campaign_resumed`](#h-unysonplus-newsletter-crm-campaign-resumed) | action | — |
| [`unysonplus_newsletter_crm_campaign_saved`](#h-unysonplus-newsletter-crm-campaign-saved) | action | Fired after a campaign is created or edited. |
| [`unysonplus_newsletter_crm_campaign_scheduled`](#h-unysonplus-newsletter-crm-campaign-scheduled) | action | Fired when a campaign is queued for sending (now or later). |
| [`unysonplus_newsletter_crm_campaign_sent`](#h-unysonplus-newsletter-crm-campaign-sent) | action | Fired once a campaign's queue is drained. |
| [`unysonplus_newsletter_crm_campaign_started`](#h-unysonplus-newsletter-crm-campaign-started) | action | Fired when a campaign's queue has been built and sending begins. |
| [`unysonplus_newsletter_crm_capability`](#h-unysonplus-newsletter-crm-capability) | filter | — |
| [`unysonplus_newsletter_crm_confirm_token_ttl`](#h-unysonplus-newsletter-crm-confirm-token-ttl) | filter | — |
| [`unysonplus_newsletter_crm_confirm_url`](#h-unysonplus-newsletter-crm-confirm-url) | filter | — |
| [`unysonplus_newsletter_crm_csv_fields`](#h-unysonplus-newsletter-crm-csv-fields) | filter | — |
| [`unysonplus_newsletter_crm_email_block`](#h-unysonplus-newsletter-crm-email-block) | filter | — |
| [`unysonplus_newsletter_crm_email_defaults`](#h-unysonplus-newsletter-crm-email-defaults) | filter | — |
| [`unysonplus_newsletter_crm_email_document`](#h-unysonplus-newsletter-crm-email-document) | filter | — |
| [`unysonplus_newsletter_crm_email_templates`](#h-unysonplus-newsletter-crm-email-templates) | filter | — |
| [`unysonplus_newsletter_crm_email_widths`](#h-unysonplus-newsletter-crm-email-widths) | filter | — |
| [`unysonplus_newsletter_crm_endpoint_page`](#h-unysonplus-newsletter-crm-endpoint-page) | filter | — |
| [`unysonplus_newsletter_crm_field_map`](#h-unysonplus-newsletter-crm-field-map) | filter | — |
| [`unysonplus_newsletter_crm_import_batch_seconds`](#h-unysonplus-newsletter-crm-import-batch-seconds) | filter | — |
| [`unysonplus_newsletter_crm_import_batch_size`](#h-unysonplus-newsletter-crm-import-batch-size) | filter | — |
| [`unysonplus_newsletter_crm_list_deleted`](#h-unysonplus-newsletter-crm-list-deleted) | action | Fired after a list or tag is deleted. The row is already gone — this is a copy. |
| [`unysonplus_newsletter_crm_list_saved`](#h-unysonplus-newsletter-crm-list-saved) | action | Fired after a list or tag is created or edited. |
| [`unysonplus_newsletter_crm_mail`](#h-unysonplus-newsletter-crm-mail) | filter | — |
| [`unysonplus_newsletter_crm_mail_html`](#h-unysonplus-newsletter-crm-mail-html) | filter | — |
| [`unysonplus_newsletter_crm_mail_placeholders`](#h-unysonplus-newsletter-crm-mail-placeholders) | filter | — |
| [`unysonplus_newsletter_crm_preview_subscriber`](#h-unysonplus-newsletter-crm-preview-subscriber) | filter | — |
| [`unysonplus_newsletter_crm_providers`](#h-unysonplus-newsletter-crm-providers) | filter | — |
| [`unysonplus_newsletter_crm_segment_deleted`](#h-unysonplus-newsletter-crm-segment-deleted) | action | Fired after a segment is deleted. |
| [`unysonplus_newsletter_crm_segment_saved`](#h-unysonplus-newsletter-crm-segment-saved) | action | Fired after a segment is created or edited. |
| [`unysonplus_newsletter_crm_subscriber_added`](#h-unysonplus-newsletter-crm-subscriber-added) | action | Fired once, when a brand-new subscriber row is created. |
| [`unysonplus_newsletter_crm_subscriber_confirmed`](#h-unysonplus-newsletter-crm-subscriber-confirmed) | action | Fired when double opt-in completes. |
| [`unysonplus_newsletter_crm_subscriber_data`](#h-unysonplus-newsletter-crm-subscriber-data) | filter | — |
| [`unysonplus_newsletter_crm_subscriber_deleted`](#h-unysonplus-newsletter-crm-subscriber-deleted) | action | Fired after a hard delete. The row is already gone — this is a copy. |
| [`unysonplus_newsletter_crm_subscriber_imported`](#h-unysonplus-newsletter-crm-subscriber-imported) | action | Fired per row during a CSV import. |
| [`unysonplus_newsletter_crm_subscriber_resubscribed`](#h-unysonplus-newsletter-crm-subscriber-resubscribed) | action | Fired when a previously opted-out address comes back — distinct from _added. |
| [`unysonplus_newsletter_crm_subscriber_unsubscribed`](#h-unysonplus-newsletter-crm-subscriber-unsubscribed) | action | Fired on opt-out, from any path. |
| [`unysonplus_newsletter_crm_subscriber_updated`](#h-unysonplus-newsletter-crm-subscriber-updated) | action | Fired when an existing subscriber's data changed. |
| [`unysonplus_newsletter_crm_unsubscribe_url`](#h-unysonplus-newsletter-crm-unsubscribe-url) | filter | — |
| [`unysonplus_newsletter_crm_validate`](#h-unysonplus-newsletter-crm-validate) | filter | — |
| [`upwc_mini_cart_empty`](#h-upwc-mini-cart-empty) | action | — |
| [`upwc_mini_cart_empty_html`](#h-upwc-mini-cart-empty-html) | filter | — |
| [`upwc_wc_free_shipping_threshold`](#h-upwc-wc-free-shipping-threshold) | filter | — |

---

### `fw_ext_gutenberg_blocks` {#h-fw-ext-gutenberg-blocks}
*🧪 filter*

```php
add_filter( 'fw_ext_gutenberg_blocks', $callback );
```
<small>Fired in: `framework/extensions/gutenberg/class-fw-extension-gutenberg.php:853`</small>

### `fw_le_revisions_max_bytes` {#h-fw-le-revisions-max-bytes}
*🧪 filter*

```php
add_filter( 'fw_le_revisions_max_bytes', $callback );
```
<small>Fired in: `framework/extensions/live-editor/class-fw-extension-live-editor.php:1974`</small>

### `fw_tpl_lib_catalog_url` {#h-fw-tpl-lib-catalog-url}
*🧪 filter*

```php
add_filter( 'fw_tpl_lib_catalog_url', $callback );
```
<small>Fired in: `framework/extensions/template-library/includes/installer.php:62`</small>

### `fw_tpl_lib_install_dir` {#h-fw-tpl-lib-install-dir}
*🧪 filter*

```php
add_filter( 'fw_tpl_lib_install_dir', $callback );
```
<small>Fired in: `framework/extensions/template-library/includes/installer.php:28`</small>

### `unysonplus_newsletter_crm_batch_size` {#h-unysonplus-newsletter-crm-batch-size}
*🧪 filter*

```php
add_filter( 'unysonplus_newsletter_crm_batch_size', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-sender.php:339`</small>

### `unysonplus_newsletter_crm_campaign_deleted` {#h-unysonplus-newsletter-crm-campaign-deleted}
*🎬 action*

Fired after a campaign and its queue are deleted.

```php
add_action( 'unysonplus_newsletter_crm_campaign_deleted', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-service.php:939`</small>

### `unysonplus_newsletter_crm_campaign_mail` {#h-unysonplus-newsletter-crm-campaign-mail}
*🧪 filter*

```php
add_filter( 'unysonplus_newsletter_crm_campaign_mail', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-sender.php:245`</small>

### `unysonplus_newsletter_crm_campaign_paused` {#h-unysonplus-newsletter-crm-campaign-paused}
*🎬 action*

Fired when a send is paused. The queue is retained.

```php
add_action( 'unysonplus_newsletter_crm_campaign_paused', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-service.php:891`</small>

### `unysonplus_newsletter_crm_campaign_resumed` {#h-unysonplus-newsletter-crm-campaign-resumed}
*🎬 action*

```php
add_action( 'unysonplus_newsletter_crm_campaign_resumed', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-service.php:918`</small>

### `unysonplus_newsletter_crm_campaign_saved` {#h-unysonplus-newsletter-crm-campaign-saved}
*🎬 action*

Fired after a campaign is created or edited.

```php
add_action( 'unysonplus_newsletter_crm_campaign_saved', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-service.php:785`</small>

### `unysonplus_newsletter_crm_campaign_scheduled` {#h-unysonplus-newsletter-crm-campaign-scheduled}
*🎬 action*

Fired when a campaign is queued for sending (now or later).

```php
add_action( 'unysonplus_newsletter_crm_campaign_scheduled', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-service.php:866`</small>

### `unysonplus_newsletter_crm_campaign_sent` {#h-unysonplus-newsletter-crm-campaign-sent}
*🎬 action*

Fired once a campaign's queue is drained.

```php
add_action( 'unysonplus_newsletter_crm_campaign_sent', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-sender.php:323`</small>

### `unysonplus_newsletter_crm_campaign_started` {#h-unysonplus-newsletter-crm-campaign-started}
*🎬 action*

Fired when a campaign's queue has been built and sending begins.

```php
add_action( 'unysonplus_newsletter_crm_campaign_started', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-sender.php:172`</small>

### `unysonplus_newsletter_crm_capability` {#h-unysonplus-newsletter-crm-capability}
*🧪 filter*

```php
add_filter( 'unysonplus_newsletter_crm_capability', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-service.php:73`</small>

### `unysonplus_newsletter_crm_confirm_token_ttl` {#h-unysonplus-newsletter-crm-confirm-token-ttl}
*🧪 filter*

```php
add_filter( 'unysonplus_newsletter_crm_confirm_token_ttl', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-service.php:219`</small>

### `unysonplus_newsletter_crm_confirm_url` {#h-unysonplus-newsletter-crm-confirm-url}
*🧪 filter*

```php
add_filter( 'unysonplus_newsletter_crm_confirm_url', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-endpoints.php:54`</small>

### `unysonplus_newsletter_crm_csv_fields` {#h-unysonplus-newsletter-crm-csv-fields}
*🧪 filter*

```php
add_filter( 'unysonplus_newsletter_crm_csv_fields', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-csv.php:41`</small>

### `unysonplus_newsletter_crm_email_block` {#h-unysonplus-newsletter-crm-email-block}
*🧪 filter*

```php
add_filter( 'unysonplus_newsletter_crm_email_block', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-email-compiler.php:105`</small>

### `unysonplus_newsletter_crm_email_defaults` {#h-unysonplus-newsletter-crm-email-defaults}
*🧪 filter*

```php
add_filter( 'unysonplus_newsletter_crm_email_defaults', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-email-compiler.php:39`</small>

### `unysonplus_newsletter_crm_email_document` {#h-unysonplus-newsletter-crm-email-document}
*🧪 filter*

```php
add_filter( 'unysonplus_newsletter_crm_email_document', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-email-compiler.php:444`</small>

### `unysonplus_newsletter_crm_email_templates` {#h-unysonplus-newsletter-crm-email-templates}
*🧪 filter*

```php
add_filter( 'unysonplus_newsletter_crm_email_templates', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-email-templates.php:88`</small>

### `unysonplus_newsletter_crm_email_widths` {#h-unysonplus-newsletter-crm-email-widths}
*🧪 filter*

```php
add_filter( 'unysonplus_newsletter_crm_email_widths', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-email-compiler.php:135`</small>

### `unysonplus_newsletter_crm_endpoint_page` {#h-unysonplus-newsletter-crm-endpoint-page}
*🧪 filter*

```php
add_filter( 'unysonplus_newsletter_crm_endpoint_page', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-endpoints.php:266`</small>

### `unysonplus_newsletter_crm_field_map` {#h-unysonplus-newsletter-crm-field-map}
*🧪 filter*

```php
add_filter( 'unysonplus_newsletter_crm_field_map', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/providers/class-fw-newsletter-crm-provider.php:156`</small>

### `unysonplus_newsletter_crm_import_batch_seconds` {#h-unysonplus-newsletter-crm-import-batch-seconds}
*🧪 filter*

```php
add_filter( 'unysonplus_newsletter_crm_import_batch_seconds', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-admin-page.php:865`</small>

### `unysonplus_newsletter_crm_import_batch_size` {#h-unysonplus-newsletter-crm-import-batch-size}
*🧪 filter*

```php
add_filter( 'unysonplus_newsletter_crm_import_batch_size', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-admin-page.php:859`</small>

### `unysonplus_newsletter_crm_list_deleted` {#h-unysonplus-newsletter-crm-list-deleted}
*🎬 action*

Fired after a list or tag is deleted. The row is already gone — this is a copy.

```php
add_action( 'unysonplus_newsletter_crm_list_deleted', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-service.php:523`</small>

### `unysonplus_newsletter_crm_list_saved` {#h-unysonplus-newsletter-crm-list-saved}
*🎬 action*

Fired after a list or tag is created or edited.

```php
add_action( 'unysonplus_newsletter_crm_list_saved', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-service.php:500`</small>

### `unysonplus_newsletter_crm_mail` {#h-unysonplus-newsletter-crm-mail}
*🧪 filter*

```php
add_filter( 'unysonplus_newsletter_crm_mail', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-mail.php:116`</small>

### `unysonplus_newsletter_crm_mail_html` {#h-unysonplus-newsletter-crm-mail-html}
*🧪 filter · 2 call sites*

```php
add_filter( 'unysonplus_newsletter_crm_mail_html', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-mail.php:268`</small>

### `unysonplus_newsletter_crm_mail_placeholders` {#h-unysonplus-newsletter-crm-mail-placeholders}
*🧪 filter*

```php
add_filter( 'unysonplus_newsletter_crm_mail_placeholders', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-mail.php:209`</small>

### `unysonplus_newsletter_crm_preview_subscriber` {#h-unysonplus-newsletter-crm-preview-subscriber}
*🧪 filter*

```php
add_filter( 'unysonplus_newsletter_crm_preview_subscriber', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-service.php:1085`</small>

### `unysonplus_newsletter_crm_providers` {#h-unysonplus-newsletter-crm-providers}
*🧪 filter*

```php
add_filter( 'unysonplus_newsletter_crm_providers', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-service.php:55`</small>

### `unysonplus_newsletter_crm_segment_deleted` {#h-unysonplus-newsletter-crm-segment-deleted}
*🎬 action*

Fired after a segment is deleted.

```php
add_action( 'unysonplus_newsletter_crm_segment_deleted', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-service.php:645`</small>

### `unysonplus_newsletter_crm_segment_saved` {#h-unysonplus-newsletter-crm-segment-saved}
*🎬 action*

Fired after a segment is created or edited.

```php
add_action( 'unysonplus_newsletter_crm_segment_saved', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-service.php:624`</small>

### `unysonplus_newsletter_crm_subscriber_added` {#h-unysonplus-newsletter-crm-subscriber-added}
*🎬 action*

Fired once, when a brand-new subscriber row is created.

```php
add_action( 'unysonplus_newsletter_crm_subscriber_added', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-service.php:186`</small>

### `unysonplus_newsletter_crm_subscriber_confirmed` {#h-unysonplus-newsletter-crm-subscriber-confirmed}
*🎬 action*

Fired when double opt-in completes.

```php
add_action( 'unysonplus_newsletter_crm_subscriber_confirmed', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-service.php:240`</small>

### `unysonplus_newsletter_crm_subscriber_data` {#h-unysonplus-newsletter-crm-subscriber-data}
*🧪 filter · 2 call sites*

```php
add_filter( 'unysonplus_newsletter_crm_subscriber_data', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-service.php:165`</small>

### `unysonplus_newsletter_crm_subscriber_deleted` {#h-unysonplus-newsletter-crm-subscriber-deleted}
*🎬 action*

Fired after a hard delete. The row is already gone — this is a copy.

```php
add_action( 'unysonplus_newsletter_crm_subscriber_deleted', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-service.php:376`</small>

### `unysonplus_newsletter_crm_subscriber_imported` {#h-unysonplus-newsletter-crm-subscriber-imported}
*🎬 action*

Fired per row during a CSV import.

```php
add_action( 'unysonplus_newsletter_crm_subscriber_imported', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-service.php:429`</small>

### `unysonplus_newsletter_crm_subscriber_resubscribed` {#h-unysonplus-newsletter-crm-subscriber-resubscribed}
*🎬 action*

Fired when a previously opted-out address comes back — distinct from _added.

```php
add_action( 'unysonplus_newsletter_crm_subscriber_resubscribed', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-service.php:189`</small>

### `unysonplus_newsletter_crm_subscriber_unsubscribed` {#h-unysonplus-newsletter-crm-subscriber-unsubscribed}
*🎬 action*

Fired on opt-out, from any path.

```php
add_action( 'unysonplus_newsletter_crm_subscriber_unsubscribed', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-service.php:313`</small>

### `unysonplus_newsletter_crm_subscriber_updated` {#h-unysonplus-newsletter-crm-subscriber-updated}
*🎬 action · 5 call sites*

Fired when an existing subscriber's data changed.

```php
add_action( 'unysonplus_newsletter_crm_subscriber_updated', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-admin-page.php:479`</small>

### `unysonplus_newsletter_crm_unsubscribe_url` {#h-unysonplus-newsletter-crm-unsubscribe-url}
*🧪 filter*

```php
add_filter( 'unysonplus_newsletter_crm_unsubscribe_url', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-endpoints.php:71`</small>

### `unysonplus_newsletter_crm_validate` {#h-unysonplus-newsletter-crm-validate}
*🧪 filter*

```php
add_filter( 'unysonplus_newsletter_crm_validate', $callback );
```
<small>Fired in: `framework/extensions/newsletter-crm/includes/class-fw-newsletter-crm-service.php:104`</small>

### `upwc_mini_cart_empty` {#h-upwc-mini-cart-empty}
*🎬 action*

```php
add_action( 'upwc_mini_cart_empty', $callback );
```
<small>Fired in: `framework/extensions/woocommerce/includes/mini-cart-render.php:232`</small>

### `upwc_mini_cart_empty_html` {#h-upwc-mini-cart-empty-html}
*🧪 filter*

```php
add_filter( 'upwc_mini_cart_empty_html', $callback );
```
<small>Fired in: `framework/extensions/woocommerce/includes/mini-cart-render.php:262`</small>

### `upwc_wc_free_shipping_threshold` {#h-upwc-wc-free-shipping-threshold}
*🧪 filter*

```php
add_filter( 'upwc_wc_free_shipping_threshold', $callback );
```
<small>Fired in: `framework/extensions/woocommerce/helpers.php:111`</small>

← Back to [Hooks overview](./index.md)
