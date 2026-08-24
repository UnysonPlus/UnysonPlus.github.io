---
title: Forms — hooks
sidebar_label: Forms
slug: /hooks/forms
description: Actions and filters exposed by the UnysonPlus Forms subsystem.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED — do not edit by hand. Edit the framework docblocks, then run: php scripts/extract-php-api.php … && node scripts/gen-php-api.mjs -->

# Forms — hooks

**8 hooks** — 3 actions · 5 filters.

| Hook | Type | Summary |
| --- | --- | --- |
| [`fw_ext_forms_frontend_submit`](#h-fw-ext-forms-frontend-submit) | action | Fires after a frontend form is submitted, passing form id, type, instance, and process data for post-submit handling. |
| [`fw_option_type_form_builder_init`](#h-fw-option-type-form-builder-init) | action | Fires after the Form Builder option type loads its item classes, letting extensions register additional form-builder items. |
| [`fw:ext:contact-forms:email:bcc`](#h-fw-ext-contact-forms-email-bcc) | filter | Filters the BCC recipient map used when a contact-form submission email is sent. |
| [`fw:ext:contact-forms:email:cc`](#h-fw-ext-contact-forms-email-cc) | filter | Filters the CC recipient map used when a contact-form submission email is sent. |
| [`fw:ext:contact-forms:sent`](#h-fw-ext-contact-forms-sent) | action | Fires after a contact-form email is sent successfully, passing the entry data so listeners can log or react to the submission. |
| [`fw:ext:forms:attr:class`](#h-fw-ext-forms-attr-class) | filter | Filters the CSS class string applied to the rendered form element. |
| [`fw:ext:forms:builder:load-item:form-header-title`](#h-fw-ext-forms-builder-load-item-form-header-title) | filter | Filters whether a new contact form seeds a default form-header-title item into the form builder. |
| [`fw:ext:forms:collect-uploads`](#h-fw-ext-forms-collect-uploads) | filter | Filters the collected uploaded files (from File Upload fields) mapped by shortcode, after validation passes. |

---

### `fw_ext_forms_frontend_submit` {#h-fw-ext-forms-frontend-submit}
*🎬 action*

Fires after a frontend form is submitted, passing form id, type, instance, and process data for post-submit handling.

```php
add_action( 'fw_ext_forms_frontend_submit', $callback );
```
<small>Fired in: `framework/extensions/forms/class-fw-extension-forms.php:283`</small>

### `fw_option_type_form_builder_init` {#h-fw-option-type-form-builder-init}
*🎬 action*

Fires after the Form Builder option type loads its item classes, letting extensions register additional form-builder items.

```php
add_action( 'fw_option_type_form_builder_init', $callback );
```
<small>Fired in: `framework/extensions/forms/includes/option-types/form-builder/class-fw-option-type-form-builder.php:25`</small>

### `fw:ext:contact-forms:email:bcc` {#h-fw-ext-contact-forms-email-bcc}
*🧪 filter*

Filters the BCC recipient map used when a contact-form submission email is sent.

```php
add_filter( 'fw:ext:contact-forms:email:bcc', $callback );
```
<small>Fired in: `framework/extensions/forms/extensions/contact-forms/class-fw-extension-contact-forms.php:169`</small>

### `fw:ext:contact-forms:email:cc` {#h-fw-ext-contact-forms-email-cc}
*🧪 filter*

Filters the CC recipient map used when a contact-form submission email is sent.

```php
add_filter( 'fw:ext:contact-forms:email:cc', $callback );
```
<small>Fired in: `framework/extensions/forms/extensions/contact-forms/class-fw-extension-contact-forms.php:163`</small>

### `fw:ext:contact-forms:sent` {#h-fw-ext-contact-forms-sent}
*🎬 action*

Fires after a contact-form email is sent successfully, passing the entry data so listeners can log or react to the submission.

```php
add_action( 'fw:ext:contact-forms:sent', $callback );
```
<small>Fired in: `framework/extensions/forms/extensions/contact-forms/class-fw-extension-contact-forms.php:198`</small>

### `fw:ext:forms:attr:class` {#h-fw-ext-forms-attr-class}
*🧪 filter*

Filters the CSS class string applied to the rendered form element.

```php
add_filter( 'fw:ext:forms:attr:class', $callback );
```
<small>Fired in: `framework/extensions/forms/class-fw-extension-forms.php:84`</small>

### `fw:ext:forms:builder:load-item:form-header-title` {#h-fw-ext-forms-builder-load-item-form-header-title}
*🧪 filter · 2 call sites*

Filters whether a new contact form seeds a default form-header-title item into the form builder.

```php
add_filter( 'fw:ext:forms:builder:load-item:form-header-title', $callback );
```
<small>Fired in: `framework/extensions/forms/extensions/contact-forms/shortcodes/contact-form/options.php:24`</small>

### `fw:ext:forms:collect-uploads` {#h-fw-ext-forms-collect-uploads}
*🧪 filter*

Filters the collected uploaded files (from File Upload fields) mapped by shortcode, after validation passes.

```php
add_filter( 'fw:ext:forms:collect-uploads', $callback );
```
<small>Fired in: `framework/extensions/forms/class-fw-extension-forms.php:254`</small>

← Back to [Hooks overview](./index.md)
