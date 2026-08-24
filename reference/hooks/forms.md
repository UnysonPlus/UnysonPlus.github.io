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
| [`fw_ext_forms_frontend_submit`](#h-fw-ext-forms-frontend-submit) | action | — |
| [`fw_option_type_form_builder_init`](#h-fw-option-type-form-builder-init) | action | — |
| [`fw:ext:contact-forms:email:bcc`](#h-fw-ext-contact-forms-email-bcc) | filter | — |
| [`fw:ext:contact-forms:email:cc`](#h-fw-ext-contact-forms-email-cc) | filter | — |
| [`fw:ext:contact-forms:sent`](#h-fw-ext-contact-forms-sent) | action | — |
| [`fw:ext:forms:attr:class`](#h-fw-ext-forms-attr-class) | filter | — |
| [`fw:ext:forms:builder:load-item:form-header-title`](#h-fw-ext-forms-builder-load-item-form-header-title) | filter | — |
| [`fw:ext:forms:collect-uploads`](#h-fw-ext-forms-collect-uploads) | filter | — |

---

### `fw_ext_forms_frontend_submit` {#h-fw-ext-forms-frontend-submit}
*🎬 action*

```php
add_action( 'fw_ext_forms_frontend_submit', $callback );
```
<small>Fired in: `framework/extensions/forms/class-fw-extension-forms.php:280`</small>

### `fw_option_type_form_builder_init` {#h-fw-option-type-form-builder-init}
*🎬 action*

```php
add_action( 'fw_option_type_form_builder_init', $callback );
```
<small>Fired in: `framework/extensions/forms/includes/option-types/form-builder/class-fw-option-type-form-builder.php:24`</small>

### `fw:ext:contact-forms:email:bcc` {#h-fw-ext-contact-forms-email-bcc}
*🧪 filter*

```php
add_filter( 'fw:ext:contact-forms:email:bcc', $callback );
```
<small>Fired in: `framework/extensions/forms/extensions/contact-forms/class-fw-extension-contact-forms.php:161`</small>

### `fw:ext:contact-forms:email:cc` {#h-fw-ext-contact-forms-email-cc}
*🧪 filter*

```php
add_filter( 'fw:ext:contact-forms:email:cc', $callback );
```
<small>Fired in: `framework/extensions/forms/extensions/contact-forms/class-fw-extension-contact-forms.php:159`</small>

### `fw:ext:contact-forms:sent` {#h-fw-ext-contact-forms-sent}
*🎬 action*

```php
add_action( 'fw:ext:contact-forms:sent', $callback );
```
<small>Fired in: `framework/extensions/forms/extensions/contact-forms/class-fw-extension-contact-forms.php:189`</small>

### `fw:ext:forms:attr:class` {#h-fw-ext-forms-attr-class}
*🧪 filter*

```php
add_filter( 'fw:ext:forms:attr:class', $callback );
```
<small>Fired in: `framework/extensions/forms/class-fw-extension-forms.php:83`</small>

### `fw:ext:forms:builder:load-item:form-header-title` {#h-fw-ext-forms-builder-load-item-form-header-title}
*🧪 filter · 2 call sites*

```php
add_filter( 'fw:ext:forms:builder:load-item:form-header-title', $callback );
```
<small>Fired in: `framework/extensions/forms/extensions/contact-forms/shortcodes/contact-form/options.php:23`</small>

### `fw:ext:forms:collect-uploads` {#h-fw-ext-forms-collect-uploads}
*🧪 filter*

```php
add_filter( 'fw:ext:forms:collect-uploads', $callback );
```
<small>Fired in: `framework/extensions/forms/class-fw-extension-forms.php:252`</small>

← Back to [Hooks overview](./index.md)
