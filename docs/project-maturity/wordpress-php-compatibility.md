---
title: "WordPress & PHP compatibility"
sidebar_label: "WordPress & PHP compatibility"
sidebar_position: 3
slug: /project-maturity/wordpress-php-compatibility
description: "Which PHP and WordPress versions Unyson+ supports — a PHP 8.0+ baseline (8.2-clean), WordPress 5.8+, a fail-closed guard on older PHP, and how security hardening is handled."
keywords:
  - unyson+ php version
  - unysonplus php 8 compatible
  - unyson+ wordpress version requirement
  - unyson+ php 8.2
  - is unyson+ secure
---

# WordPress & PHP compatibility

Unyson+ is built on the proven Unyson framework and **modernized for today's PHP and WordPress** —
it is not a legacy codebase frozen at its minimum requirement.

## Supported versions

| Platform | Requirement | Notes |
| --- | --- | --- |
| **PHP** | **8.0 or newer** | The codebase is **8.2-clean**; 8.1–8.2 recommended. The 5.6–7.4 line was dropped so the code can use modern, typed PHP. |
| **WordPress** | **5.8 or newer** | Tracks current WordPress; works with the block editor present (the Page Builder serves the classic screen itself — see below). |

The plugin header declares these (`Requires PHP: 8.0`, `Requires at least: 5.8`), so WordPress itself
warns before an incompatible activation.

## It fails closed on older PHP — it doesn't fatal

Modern typed syntax would fatal on PHP below 8.0. Rather than risk a white screen, the entry point
**checks the PHP version first and bails with an admin notice** instead of loading the framework:

```php
if ( version_compare( PHP_VERSION, '8.0', '<' ) ) {
    add_action( 'admin_notices', function () {
        echo '<div class="notice notice-error"><p>'
            . esc_html__( 'Unyson+ requires PHP 8.0 or higher — the framework was not loaded.', 'fw' )
            . '</p></div>';
    } );
    return;
}
require __DIR__ . '/framework/bootstrap.php';
```

So an under-provisioned server gets a clear, actionable message — not a broken dashboard.

## No Classic Editor plugin, no external dependencies for the editor

A common misconception is that the Page Builder needs the **Classic Editor** plugin. It does not.
A bundled **Page Editor** extension serves WordPress's own built-in classic editor screen by flipping
the core `use_block_editor_for_post_type` switch — the same thing the Classic Editor plugin does, in
about fifteen lines — so the builder has a full-width home with nothing extra to install. Background:
[Is the classic editor in WordPress core?](/page-builder/classic-editor-and-gutenberg).

## Security hardening

Security is treated as ongoing maintenance, not a one-time pass:

- Database access uses **prepared statements** and `esc_sql()` for the rare identifier that can't be
  parameterized; output is escaped at the boundary (`esc_html`, `esc_attr`, `esc_url`).
- Cross-boundary `require`s are **`file_exists()`-guarded**, so a partial install degrades a feature
  instead of fataling.
- The newer code is **typed and namespaced**, which removes a whole class of type-confusion bugs.
- Fixes ship like any other change — a version bump and a release — so a hardening update reaches
  sites through the normal updater.

:::tip[💡 Web dev tip: keep your own stack on supported versions]
A framework can only be as secure as the platform under it. Run a **currently supported PHP version**
(each major line gets security fixes for a limited window) and keep WordPress current — most "plugin"
vulnerabilities are really unpatched platforms underneath.
[The PHP supported-versions schedule](https://www.php.net/supported-versions.php)
:::
