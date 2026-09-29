---
sidebar_position: 10
title: "WordPress Admin Theme — Dark Mode, Grouped Menu, Custom Login"
sidebar_label: "Admin Skin"
description: "Free WordPress admin theme: dark mode, a grouped sidebar you can edit per role, a skinned login screen, per-user accent and density. It restyles the real wp-admin, so every plugin screen keeps working."
---

# Admin Skin

<div class="ext-hero">
  <span class="ext-hero__badge">FREE!</span>
  <p class="ext-hero__title">The WordPress admin, with the edges taken off.</p>
  <p class="ext-hero__sub">Dark mode, a grouped sidebar you can rearrange per role, a login screen that matches, and a per-user accent — across every screen, including the ones other plugins add.</p>
</div>

**Admin Skin** restyles the **real** wp-admin rather than replacing it. There is no separate admin
app to learn and nothing to keep in step: every screen — WordPress's own, UnysonPlus's, WooCommerce's,
any plugin's — is drawn through the same set of design tokens, so they all change together.

That distinction matters more than it sounds. A plugin that replaces the admin has to support each
screen one at a time, and anything it has not got to yet looks broken. Because this one only changes
how wp-admin is *painted*, a plugin released tomorrow is already skinned.

It is **active by default** on a new install. If you would rather have stock WordPress back, there
are two ways out and the extension tells you about both the first time it appears:

- **Just for you** — the *Appearance* control in the top bar has a **Use classic wp-admin** link, and
  the same switch is on your profile page. Everyone else keeps the skin.
- **For the whole site** — deactivate it in **Unyson+ → Extensions**.

## Light, dark and system

Pick a mode from the **Appearance** control in the top bar (the palette icon):

- **Light** and **Dark** are exactly that.
- **System** follows the operating system, so the admin turns dark in the evening along with
  everything else on your machine.

The choice is **per user** — yours does not change what your client sees. The site-wide default
lives in the extension's settings, and you can turn per-user choice off entirely there if you would
rather everyone saw the same thing.

:::note Some panels stay light on purpose
In dark mode a few panels keep a light surface: the classic editor's writing area, the Box Style and
Table Style pickers, and the Box Shadow preview. Those are not chrome — they are **previews of your
front end**, and your front end is a light surface. Darkening them would show you a shadow, a border
or a text colour that is not what a visitor gets. The controls around a preview follow the skin; the
preview itself does not.

The editor canvas has an opt-in (**Dark editor canvas**) if you want it anyway.
:::

## Accent colour

The accent is the one colour the admin uses for anything active — buttons, links, the current menu
item, focus rings. Choose from the swatches in the Appearance control, or pick any colour.

Like the mode, it is per user by default, with a site-wide default in the settings. The skin works
out its own hover shade and a readable text colour to sit on it, so a dark accent gets white text
and a light one gets dark text without you having to think about it.

## Density

**Comfortable** or **Compact**, from the same Appearance control. Compact steps down the type size,
control heights, table rows and the sidebar width — it is the same skin, tightened, not a different
one. It earns its keep on long list tables, where it fits noticeably more rows on screen.

## The sidebar

The menu is grouped — **Workspace**, **Shop**, **Tools**, **Manage**, **Plugins** — instead of one
long list, with a search box at the top. Start typing and the list filters as you go, which is
usually faster than hunting for a plugin whose menu name you half-remember.

Plugins the skin has never heard of land in **Plugins** and keep working normally.

### Editing the menu

**Unyson+ → Admin Skin → Admin Menu** lets you change all of it, **per role**:

- **Move an item to another group** with the dropdown beside it.
- **Reorder** by dragging the handle.
- **Hide** what a role does not need.
- **Rename the groups** themselves.

Each role keeps its own layout, which is what makes this useful on a client site: they sign in to
Pages, Posts and Media, and you keep the full menu.

:::warning Hiding is not access control
A hidden item is removed from the menu, and its top-level URL redirects to the dashboard — but
someone who still holds the capability can reach a subpage by typing its address. Use **roles and
capabilities** to control what a person may *do*; use this to control what they *see*.
:::

One thing the screen will not let you do is hide **Unyson+** for a role that can edit this layout —
that menu is how you get back here.

## Notices

WordPress puts every plugin's notices at the top of every screen. The skin collects them into a
single line — *"3 notices"* — that expands when you want them.

Any notice can be **muted**, and it stays muted: the same nag does not come back on the next page
load. A footer shows how many are hidden and gives them back if you muted something you shouldn't
have. Muting is per user, and a notice whose wording changes counts as a new one and will appear
again — deliberately, since that usually means it is saying something new.

## The login screen

`wp-login.php` is skinned too, so signing in looks like the admin it leads to rather than stock
WordPress. It uses the site's default mode and accent — there is no logged-in user yet to have a
preference — and the mark above the form becomes your **site icon**, or your site name if you have
not set one, linking to your home page.

Turn it off with **Skin the login screen** in the settings if you would rather keep the standard
screen.

## Command palette

WordPress's own command palette (**Ctrl + K**, or **⌘ + K** on a Mac) gains UnysonPlus entries:
Theme Settings, Extensions, the Admin Skin settings, and two that act rather than navigate — toggle
light/dark, and toggle density.

## Settings

**Unyson+ → Admin Skin**, or the **Settings** link on its card in **Unyson+ → Extensions** — both
open the same screen.

| Setting | What it does |
|---|---|
| **Active skin** | The site-wide skin. Bundled skins ship with the extension. |
| **Default mode** | Light, dark or system — what a user sees until they choose. |
| **Density** | Comfortable or compact, as the site default. |
| **Accent colour** | Overrides the skin's accent for everyone. Empty keeps the skin's own. |
| **Let users choose** | Off means everyone gets the site defaults, with no per-user override. |
| **Group the sidebar** | Turn the grouping off for a plain list. |
| **Sidebar search** | The filter box at the top of the menu. |
| **Collect notices** | The notice tray. Off puts notices back at the top of the page. |
| **Skin the block editor chrome** | Applies the skin to the editor's own chrome. |
| **Account menu** | Where the avatar and its menu sit: sidebar, top bar, or both. |
| **Skin the Customizer** | The Customizer's control pane. The preview beside it is never touched. |
| **Skin the login screen** | `wp-login.php`. |
| **Dark editor canvas** | Opt-in: tint the classic editor's writing area in dark mode. See the note above. |
| **Hide Appearance → Design / Fonts** | Screens that only do anything on a block theme. *Auto* hides them while a classic theme is active and brings them back by themselves on a block theme. |
| **Keep the WordPress logo** | The W menu in the top bar. |

## Good to know

- **Nothing is rewritten.** Deactivate the extension and wp-admin is exactly as it was — no
  leftovers, no settings to unpick.
- **Your WordPress colour scheme is untouched.** While the skin is on it uses its own, and your
  original choice comes back the moment you turn it off.
- **Keyboard and screen readers work as before**, because the markup is WordPress's own. The skin
  changes colour, spacing and layout, not structure.
