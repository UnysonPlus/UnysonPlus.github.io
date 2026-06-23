---
title: Updates & auto-updates
---

# Updates & auto-updates

One of Unyson+'s defining traits: the **framework, the theme, and every extension update straight
from GitHub**, no marketplace, no license keys, no manual re-uploads for routine updates. Push a new
version to a repo and your sites are offered the update from the WordPress dashboard.

This page explains how that works and how to make **your own** theme or extension auto-update the
same way.

## How updates are delivered

There are two complementary mechanisms, and you don't have to think about which is which, they all
surface as normal WordPress updates:

| What updates | Mechanism | Where it shows |
| --- | --- | --- |
| **The plugin** (`unysonplus`) | A bundled GitHub update checker wired in `unysonplus.php` | The standard **Plugins** screen |
| **The theme** (`unysonplus-theme`) | The same checker wired in the theme's `functions.php` | The standard **Themes** / Updates screen |
| **The framework + extensions** | The **Update** extension via the `github_update` manifest key | The **Unyson+** updates list |

The plugin and theme each point their checker at a GitHub repo and branch, for example the plugin:

```php
$checker = YahnisElsts\PluginUpdateChecker\v5\PucFactory::buildUpdateChecker(
    'https://github.com/UnysonPlus/UnysonPlus/',
    __FILE__,
    'unysonplus'
);
$checker->setBranch( 'master' );
$checker->getVcsApi()->enableReleaseAssets(); // use a release ZIP when present
```

## Updates are version-driven

An update is offered when the version in the repo is **higher** than the installed one. That's why
the project's [versioning rules](/docs/architecture/manifests-and-versioning#versioning-rules) matter:
every meaningful change bumps a version, and **you never downgrade a version** (it breaks the
updater's cached state). Bump → push → the update appears.

## The Update extension

The **Update** extension keeps the framework and its extensions current. It reads each extension's
`github_update` manifest key, checks the named GitHub repo for a newer version, and lists available
updates so you can apply them from the dashboard. It's a `standalone` extension you enable from
**Unyson+ → Extensions**.

## Make your own extension or theme auto-update

Opting in is one manifest key. Add it to your extension's `manifest.php` (or your theme's manifest):

```php
// In an extension's manifest.php
$manifest['github_update'] = 'YourOrg/Your-Extension-Repo'; // user/repo
$manifest['github_repo']   = 'https://github.com/YourOrg/Your-Extension-Repo';
$manifest['github_branch'] = 'master';
```

- **`github_update`** (`user/repo`) is the key the Update extension keys off, this is what enables
  auto-updates for your extension.
- **`github_branch`** is the branch the stable version lives on (`master` or `main`).
- Bump your manifest `version` when you push, and the update is offered on every site running it.

The recognized branches default to `master` / `main`; a filter lets you change them:

```php
add_filter( 'fw_ext_update_github_branches', function ( $branches, $user_repo ) {
    return array( 'release' );
}, 10, 2 );
```

:::tip Themes ship the checker directly
A theme doesn't use the Update extension, it wires the bundled update checker in its own
`functions.php` (pointed at its repo + branch), exactly like the plugin. The Unyson+ Theme and the
sample child theme both do this, so a generated child theme inherits a working auto-updater.
:::

## See also

- [Manifests & versioning](/docs/architecture/manifests-and-versioning) — the version model the
  updater depends on.
- [Update / extension-manager hooks](/docs/hooks/extensions-and-updates) — including
  `fw_ext_mngr_github_branch` to change the branch a download/update uses.
