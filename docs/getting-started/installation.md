---
sidebar_position: 2
title: Installation
slug: /installation
---

# Installation

Unyson+ ships as a normal WordPress plugin plus an optional parent theme.

:::tip[💡 Web dev tip: keep everything updated]
Out-of-date software is the most common way sites get hacked, so keep **WordPress core, PHP, your theme and plugins** current — updates are mostly security and bug fixes. UnysonPlus updates itself from GitHub; for everything else, enable auto-updates or check regularly. [WordPress: updating](https://wordpress.org/documentation/article/updating-wordpress/)
:::

## Requirements

Unyson+ runs on any standard WordPress host. You'll need:

- **WordPress** — a currently supported version.
- **PHP 7.4 or newer** (PHP 8.1–8.2 recommended).
- **MySQL 5.7+** or **MariaDB 10.3+**.
- The usual PHP extensions (normally already enabled): `zip`, `curl`, `mysqli`, `gd`,
  `mbstring`, `dom`, `openssl`.

### Recommended PHP settings

Many shared hosts ship conservative defaults — a **2 MB** `upload_max_filesize` is common — that
are too small to upload the plugin, media, or a backup archive. Raise them to:

```ini
upload_max_filesize = 128M
post_max_size = 128M
max_execution_time = 300
max_input_time = 300
memory_limit = 256M
max_input_vars = 3000
```

On **cPanel**, set these in **MultiPHP INI Editor** (select your domain first), or add them to a
**`.user.ini`** file in your site root (LiteSpeed's lsphp reads it; allow a few minutes to apply).
The largest file you can upload is `min(upload_max_filesize, post_max_size)`, so raise **both**.

:::tip[Why max_input_vars matters]
The page builder and Theme Settings forms can post many fields in a single save. If
`max_input_vars` is too low, PHP silently drops the extra fields and part of your layout or
settings won't save. `3000` gives comfortable headroom.
:::

If backups stall on a **LiteSpeed** server, see the
[Backup & Demo Content](../extensions/backups.md#litespeed-web-server) troubleshooting notes.

## 1. Install the plugin

1. Download the latest **Unyson+** plugin from the
   [plugin repository](https://github.com/UnysonPlus/UnysonPlus).
2. In WordPress, go to **Plugins → Add New → Upload Plugin** and upload the ZIP, or
   copy the `unysonplus` folder into `wp-content/plugins/`.
3. Activate **Unyson+** from the **Plugins** menu.

:::tip[Keep the folder name]
Install the plugin into a folder named `unysonplus`. The GitHub auto-updater and the
theme both reference that folder name.
:::

## 2. Install the theme (optional but recommended)

1. Download **Unyson+ Theme** from the
   [theme repository](https://github.com/UnysonPlus/UnysonPlus-Theme).
2. Go to **Appearance → Themes → Add New → Upload Theme** and upload the ZIP.
3. Activate it. The child theme,
   [Unyson+ Theme Child](https://github.com/UnysonPlus/UnysonPlus-Theme-Child), is a good
   starting point for customizations.

## 3. Activate extensions

Open **Unyson+ → Extensions**. Active extensions appear at the top; available ones can be
downloaded with one click. See [Extensions](../extensions/overview.md) for the full list.

## Automatic updates

Once installed, Unyson+ checks GitHub for new versions and offers updates from the
WordPress dashboard — no manual re-uploads needed for routine updates.

:::info[Bootstrapping a very old install]
A site running a much older build may not yet have the updater pointing at the current
repository. In that case, upload the current plugin once manually; after that, updates are
automatic.
:::
