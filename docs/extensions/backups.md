---
title: Backups & Demo Content
---

# Backups & Demo Content

The **Backups & Demo Content** extension creates full or content-only archives of your site — on a
schedule or on demand — restores them, and packages **demo content** so a theme can ship a
ready-made starter site. Because a restore rewrites the site URL as it imports, the same archives
double as a **site-migration** tool: back up on one server, restore on another.

Enable it under **Unyson+ → Extensions → Backups & Demo Content**, then open **Unyson+ → Backups**.

## Backup types

- **Full Backup** — themes, plugins, uploads and the full database. A complete, self-contained copy
  of the site.
- **Content Backup** — uploads and the database **without private data** (users, admin email, secret
  keys). Ideal for moving *content* between sites that already share the same theme and plugins, and
  for building demo-content archives.

## Creating a backup

On the **Backups** page:

- **Create Full Backup Now** / **Create Content Backup Now** — runs immediately and drops a `.zip`
  into the **Archives** list.
- **Edit Backup Schedule** — automated recurring backups (hourly / daily / weekly) with a retention
  count, so old archives are pruned automatically.
- **Selective Backup & Cleanup** — exclude **Plugins**, **Themes** or **Uploads** from full backups
  (handy for trimming a migration archive down to just what the destination doesn't already have),
  and set how many recent archives to keep.

Each archive holds the database as `database.json.txt` plus a files tree; the Archives list shows the
date and the type (Full / Content).

## Where backups are stored

Archives are written to **`wp-content/fw-backup/`** — deliberately *outside* the uploads directory.
Some managed hosts (WP Engine, for example) block writing `.php` files anywhere under
`wp-content/uploads/` as an anti-malware measure, and a full backup stages plugins and themes (which
are full of `.php` files) before zipping them. `wp-content` allows `.php`, so backups work on those
hosts too.

A few consequences worth knowing:

- **Archives are never served by a direct URL.** Downloads stream through a capability-checked PHP
  handler, so a backup zip can't be guessed and fetched by an anonymous visitor.
- **Anything you drop in that folder is listed.** Copy a `.zip` there over SFTP and it appears under
  **Archives**, ready to Restore — see the tip below.
- **The old location is still read.** Backups created before the move lived in
  `wp-content/uploads/fw-backup/`; that directory is still scanned, so older archives stay listable,
  downloadable and deletable. New backups always go to `wp-content/fw-backup/`.
- **The location is filterable**, if your host needs it somewhere else:

  ```php
  add_filter( 'fw:ext:backups:destination_directory', function ( $dir ) {
  	return WP_CONTENT_DIR . '/my-backups';
  } );
  ```

  Point it somewhere PHP can write and that isn't publicly served; the extension creates the folder
  if it doesn't exist.

## Migrating a site

The extension is a practical way to move a site between hosts:

1. **On the source site**, create a backup. Moving to a server that already has the theme + plugin
   installed? A **Content backup** is smallest and sufficient. For a bare destination, use a **Full**
   (or selective) backup.
2. Download the `.zip` (or grab it straight from `wp-content/fw-backup/`).
3. **On the destination**, install WordPress + Unyson+ (the plugin and this extension), then open
   **Unyson+ → Backup → Upload a Backup**, choose the `.zip`, and **Restore** it.
4. The restore imports the files and database and **rewrites the old site URL to the new one** —
   safely, walking serialized data so page-builder content is never corrupted. Moving a site that
   lived in a subfolder (`example.com/oldsite/`) to a domain root also rewrites **root-relative**
   paths that carried the old subdirectory (`/oldsite/wp-content/…` → `/wp-content/…`), including
   the escaped-slash form embedded inside builder JSON, so images don't 404 after the move.

After restoring, open a couple of pages and confirm nothing still points at the old domain.

:::tip Restore without uploading
The extension lists **any** `.zip` placed in `wp-content/fw-backup/`. If a backup is too large for
your host's upload limit, copy it there with SFTP or cPanel File Manager and it appears under
**Archives**, ready to Restore — no browser upload involved.
:::

## Demo content

A theme can bundle a **demo-content archive** so activating it offers a one-click starter site:
create a Content backup, register it as the theme's demo content, and users import it from
**Tools → Demo Content Install**. This is how a theme ships the "looks like the live preview"
content its users expect.

## Requirements

Backups (especially Full) move a lot of data, so give PHP enough headroom. Recommended `php.ini`
values:

```ini
upload_max_filesize = 128M
post_max_size = 128M
max_input_time = 300
max_execution_time = 300
memory_limit = 256M
max_input_vars = 3000
```

You don't have to guess: the **Backups** page compares your server's actual limits against these and
shows a table of any that fall short — a low `upload_max_filesize` or `post_max_size` is the usual
cause of a backup upload that silently fails on shared hosting.

On cPanel, set these in **MultiPHP INI Editor**, or add them to a **`.user.ini`** file in the site
root (LiteSpeed's lsphp reads it; allow a few minutes for the change to take effect).

## WP-CLI

With [WP-CLI](https://wp-cli.org/) available, backups can be driven from the shell — handy for cron
jobs on hosts where WordPress's own scheduler is unreliable:

```bash
# List the archives (name, date, type)
wp unyson ext backups list

# Create a content backup, or a full one
wp unyson ext backups create
wp unyson ext backups create --full

# Restore by ID — the archive's file name without the .zip extension
wp unyson ext backups restore fw-backup-2017_03_25-05_58_28-2.0.23
```

Because CLI runs outside the web server, it sidesteps the request time-outs and upload caps that
trip up big backups in the browser.

## Troubleshooting

### "Ajax error — Bad Request" when uploading a backup

The archive is larger than your server's **`upload_max_filesize`** / **`post_max_size`** (or a
web-server request-body cap). Do one of:

- **Raise the limits** (see [Requirements](#requirements) above), or
- **Upload a smaller Content backup** instead of a Full one, or
- **Skip the upload entirely** — drop the `.zip` into `wp-content/fw-backup/` via SFTP / File
  Manager; the extension lists it automatically under **Archives**.

### LiteSpeed web server

If your host runs **LiteSpeed**, the extension shows a heads-up notice, because LiteSpeed can
**abort long-running background requests** — exactly what a backup relies on — so a backup may stall
or fail partway through.

1. Add this line to your site's **`.htaccess`** (above the `# BEGIN WordPress` block) so LiteSpeed
   doesn't kill the request when the browser disconnects:

   ```apache
   RewriteRule .* - [E=noabort:1]
   ```

2. If backups still stall, have WordPress run cron on real page loads instead of a background
   request, by adding to **`wp-config.php`**:

   ```php
   define( 'ALTERNATE_WP_CRON', true );
   ```

If it still won't finish after both changes, your host may cap requests tighter than a backup needs —
ask them to raise the PHP limits above, or use the **File Manager** restore path described in the tip
under [Migrating a site](#migrating-a-site).
