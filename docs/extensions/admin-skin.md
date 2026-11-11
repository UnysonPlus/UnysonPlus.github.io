---
sidebar_position: 10
title: "WordPress Admin Theme — Dark Mode, Grouped Menu, Custom Login"
sidebar_label: "Admin Skin"
description: "Free WordPress admin theme: six skins including a glass dashboard, a background image or gradient behind the admin, dark mode, a grouped sidebar you can edit per role, and a skinned login screen. It restyles the real wp-admin, so every plugin screen keeps working."
---

# Admin Skin

<div class="ext-hero">
  <span class="ext-hero__badge">FREE!</span>
  <p class="ext-hero__title">The WordPress admin, with the edges taken off.</p>
  <p class="ext-hero__sub">Six skins, a background of your own, dark mode, a grouped sidebar you can rearrange per role, and a login screen that matches — across every screen, including the ones other plugins add.</p>
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

## Skins

A skin is more than a palette. It sets the typefaces, the corner radii, how tall a table row is, how
wide the sidebar sits — and, for four of them, structural changes like a sidebar that floats clear of
the window edge. Six ship with the extension; pick one under **Unyson+ → Admin Skin → Active skin**.

| Skin | What it is for |
|---|---|
| **Default** | The modern UnysonPlus admin. Roomy, quiet, one accent. |
| **Classic** | The same structure at WordPress's own density and blue. The escape hatch for anyone who wants the new layout without the new look. |
| **Console** | Dense and square: smaller type, short rows, ruled table cells and monospace figures so columns of numbers line up. Built for people who live in list tables. |
| **Aurora** | A dark analytics dashboard. The sidebar detaches from the edge and the content sits on its own inset panel. |
| **Soft** | A light product dashboard: a warm paper ground, cards with no borders at all, pill-shaped buttons and fields. |
| **Glass** | Frosted panels over a background of your choosing, with a floating sidebar. Needs a background to be itself — see below. |

Your mode, accent and density all still apply on top, so each skin has a light and a dark face.

Changing skin changes nothing but how the admin is drawn. Your menu layout, your muted notices and
your background all survive the switch.

## A background of your own

Under **Unyson+ → Admin Skin → Background** you can put a gradient, a colour or an image behind the
whole admin. It is deliberately **not** part of the skin, so changing skin keeps your background, and
every skin that accepts one can use it.

- **Gradient preset** — six bundled gradients. Nothing to upload, nothing to load, and no detail to
  compete with text. This is the one to reach for first.
- **A colour of my own** — a flat colour, if you want the admin to carry a brand shade.
- **An image** — shown full-bleed and held still while the page scrolls. Picking it opens the
  WordPress media library, and adds a **Colour behind it**: what shows while the image loads and
  anywhere the image does not reach. Set it close to the image's overall tone so the page does not
  flash a different colour on the way in.

You pick one of these, and only its own settings appear — choose *An image* and you get the image
fields, not a preset list and a colour swatch you are not using.

Two sliders sit under them:

- **Scrim** is a veil laid over the background — light in light mode, dark in dark mode. It is the
  guard rail that keeps text readable. At 0 the background comes through at full strength, which
  almost no photograph survives. Raise it until the quietest text on screen is comfortable.
- **Glass blur** is how far a frosted skin blurs what is behind it. Only skins that frost their
  panels use it. Blur is redrawn on every scroll, so lower it if the admin feels heavy on an older
  machine; 0 leaves the panels simply translucent.

:::tip Pick a calm picture
This sits behind screens people read all day. A photograph with a lot of contrast and detail —
especially one that is bright in some places and dark in others — is the one thing that can make an
admin genuinely hard to use. Something soft and evenly lit, plus a scrim, is what works.
:::

**Console and Classic ignore backgrounds on purpose.** They are opaque by design, and a photograph
behind them only makes them worse, so the setting simply has no effect while one of them is active.

### Glass needs one

Glass is the skin the background exists for: its panels blur whatever is behind them, so over a flat
colour there is nothing to blur and it would just look washed out. When no background is set, Glass
falls back to solid panels and keeps everything else — the radii, the floating sidebar, the spacing.

It does the same thing in two other cases, both deliberate: when your operating system is set to
reduce transparency, and on a browser that cannot draw the blur at all. In every one of those cases
you get a solid, readable admin rather than a broken-looking one.

### Turning it off, just for you

If **Let users turn it off** is on, each person gets a **Plain background** switch in their Appearance
menu. Someone who finds a background distracting drops back to the skin's flat colour without
changing what anyone else on the site sees.

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
| **Active skin** | The site-wide skin — Default, Classic, Console, Aurora, Soft or Glass. |
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
| **Background** | None, a gradient preset, a colour of your own, or an image. Only the chosen one's settings are shown. |
| **Scrim** | How strongly the background is veiled, to keep text readable. |
| **Glass blur** | How far a frosted skin blurs what is behind it. |
| **Let users turn it off** | Adds a *Plain background* switch to each person's Appearance menu. |

## Good to know

- **Nothing is rewritten.** Deactivate the extension and wp-admin is exactly as it was — no
  leftovers, no settings to unpick.
- **Your WordPress colour scheme is untouched.** While the skin is on it uses its own, and your
  original choice comes back the moment you turn it off.
- **Keyboard and screen readers work as before**, because the markup is WordPress's own. The skin
  changes colour, spacing and layout, not structure.
