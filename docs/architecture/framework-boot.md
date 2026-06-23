---
title: How the framework boots
sidebar_position: 2
---

# How the framework boots

The framework loads in a deliberate sequence so that theme paths are known, components initialize
in dependency order, and extensions get a chance to hook into each other. This page traces that
sequence from the plugin's entry file to the `fw_init` action.

## The entry point

`unysonplus.php` is a normal WordPress plugin header. Its job is small: guard against
double-loading (`if ( defined( 'FW' ) )`), then `require framework/bootstrap.php`. It also wires
up the **GitHub plugin-update-checker** (the auto-updater pointed at
`UnysonPlus/UnysonPlus`, branch `master`) and a few plugin-only conveniences (activation hooks, the
Classic Editor recommendation notice, update pre/post hooks).

:::note The framework is path-agnostic
`unysonplus.php` notes it explicitly: *"The framework doesn't know that it's used as a plugin. It
can be located in the theme directory or any other directory. Only its path and uri is known."*
This is why boot is deferred to `after_setup_theme` — the framework needs the theme's paths
resolved, which aren't reliable at plugin-load time.
:::

## The boot sequence

`framework/bootstrap.php` defines the `FW` constant and registers `_action_init_framework()` on
**`after_setup_theme`**. When that fires, the framework loads in this order:

```
after_setup_theme
   └─ _action_init_framework()
        1. do_action('fw_before_init')        ← textdomain loads here
        2. require autoload.php                ← class autoloader
        3. load helper files (general, meta, fw-storage, database)
        4. require core/Fw.php  →  fw()        ← create the singleton
        5. require core includes (hooks, presets, css-tokens, device-tabs,
           dynamic-css, dynamic-content, option types: background-pro, spacing, …)
        6. init components, IN ORDER:  theme → extensions → backend
              fw()->{component}->_init()
        7. second pass:  _after_components_init()  ← extensions activate here
        8. do_action('fw_init')                ← the framework is fully loaded
```

### Why the component order matters

The components init in a fixed order, each pass giving the next a chance to hook:

1. **theme** first — so a theme's `hooks.php` can `add_action()` for events that fire during the
   `extensions` and `backend` components' init.
2. **extensions** next — so extensions can hook into `backend` events.
3. **backend** last.

There are **two passes**. `_init()` runs on all three components first; then
`_after_components_init()` runs on all three. Extensions are *discovered* in their `_init()` but
only *activated* in the extensions component's `_after_components_init()` — at which point every
component exists and `fw()->extensions->get(...)` works from inside any extension.

## The `fw()` singleton

`fw()` returns the one `_Fw` instance (created lazily, cached in a static). It exposes the
manifest and the three components as public properties:

```php
fw()->manifest      // FW_Framework_Manifest — version + requirements
fw()->extensions    // _FW_Component_Extensions — discover/activate/get extensions
fw()->backend       // _FW_Component_Backend — options UI, render, AJAX save
fw()->theme         // _FW_Component_Theme — theme settings integration
```

On construction it loads `framework/manifest.php` into the manifest object and registers a
`fw_init` callback (`_check_requirements`) that, in admin, surfaces a flash-message warning if the
PHP/WordPress version requirements aren't met.

## The boot hooks you can use

| Hook | Fires | Use it to… |
| --- | --- | --- |
| `fw_before_init` | Start of `_action_init_framework()` | Earliest framework hook (textdomain loads at priority 3). |
| `fw_extensions_before_init` | Before extensions are discovered | Register custom `FW_Extension` subclasses. |
| `fw_extensions_init` | After extensions are activated | Safe point where `$extension->get_children()` works. |
| `fw_init` | End of boot | The framework is fully loaded; everything is available. |

:::tip Reading settings during boot is a trap
Don't read extension/theme settings inside an extension's `_init()` — that can force the option
types to initialize before the page-builder extension has registered its `page-builder` option
type, producing *"Undefined option type: page-builder"*. Defer settings reads to `init` or later.
(This exact bug is recorded in the Portfolio extension changelog.)
:::
