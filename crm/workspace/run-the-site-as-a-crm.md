---
sidebar_position: 6
title: "Run a WordPress site as a CRM: workspaces"
sidebar_label: "Run the site as a CRM"
description: "Turn on CRM mode to make a WordPress site open straight to the Unyson+ CRM, with a CRM-only menu and no public website. Choose per role what people open to, give the CRM its own menu item, and drag, rename, re-icon and hide each role's WordPress menu items."
keywords: [crm mode wordpress, wordpress without frontend, disable wordpress frontend redirect to login, wordpress admin menu editor per role, reorder wordpress admin menu, wordpress as a crm, crm only wordpress dashboard, hide wordpress admin menus by role, wordpress login redirect by role, standalone crm on wordpress, wordpress app mode]
---

# Run the site as a CRM

A site used as a CRM all day should not open to the WordPress dashboard. With **workspaces**, your team signs
in and lands in the CRM, sees the CRM and nothing else they do not need, and you can still reach all of
WordPress yourself.

## CRM mode: one switch

The quickest way is in the CRM itself: **CRM → Settings → CRM mode**, at the top of the page.

<img src="/img/crm/crm-mode.png" alt="The CRM mode section of the CRM settings, with Administrators open to the CRM too and No public website ticked, and a Turn on CRM mode button" width="1624" />

Pick what you want and click **Turn on CRM mode**:

- **The CRM's own roles open to the CRM.** CRM Managers and Sales Reps land in the CRM when they sign in, and see
  only the CRM and their profile in the menu.
- **Administrators open to the CRM too** (ticked by default). You land in the CRM as well and see the same short
  menu. **Switch to WordPress** in the top bar, at the right, takes you to the full WordPress admin, and **Switch to
  CRM** brings you back. The choice is per person, so stepping out does not change what your team sees. While you are
  in the CRM, the switch shows how many updates (WordPress, plugins, themes) are waiting, since the usual updates
  item is hidden. In CRM mode the CRM fills the screen: the CRM sidebar has no "Hide the WordPress menu" or "Back to
  WordPress" links, because the top-bar switch is the way out.
- **No public website** (ticked by default). For a site that is only a CRM: see [below](#no-public-website).

The section then shows **On**. Change the two options and click **Save**, or click **Turn off CRM mode** to put
everything back: every role opens to WordPress again and the website is public. Your CRM data is not touched either
way.

Only administrators can change CRM mode. Under the hood it is the **workspaces** feature described on the rest of
this page, so everything below still applies, and you can fine-tune it there.

## No public website

A CRM-only site, such as a team's desk on its own subdomain, has nothing to show visitors. With **No public
website** on:

- anyone who opens the site's address (the home page, a page, a post) is sent to the login screen;
- people who are signed in are sent to their app, such as the CRM, or to the WordPress admin;
- search engines are asked not to index anything: every page says `noindex, nofollow` and `robots.txt` disallows the
  whole site;
- the SEO warning "search engines may not be able to find this site" is no longer shown, because that is now the
  point.

What keeps working, because it is not the website: the links in the CRM's emails (confirm, unsubscribe and
preferences links, open and click tracking), the login screen, forms that post to the site, the REST API (so other
tools and AI assistants can still connect), and scheduled tasks. Members a site keeps out of wp-admin (see
[Membership too](#membership-too)) can still reach the front end, since it is the only place they have.

You can also switch it on or off without CRM mode: **Unyson+ → Admin Menu → Roles → Website → No public website**.

## Workspaces in full

Go to **Unyson+ → Admin Menu**. It has two tabs: **Menus** arranges each role's menu, and **Roles** sets what each
role opens to.

## The quick way

On the **Roles** tab, **Quick set-up → Run the site as a CRM → Apply** does the usual set-up in one click: the CRM
Manager and Sales Rep roles open to the CRM, and administrators get the CRM as a menu item of its own. Roles it does
not name are left as they are, so check the table below it afterwards, and each role's menu under **Menus**.

The sections below do the same by hand, and cover the rest.

## Give the CRM its own menu item

On **Menus**, click the **Unyson+** item to open it and drag **CRM** out of its sub-items into the menu. It becomes an item of its own for that role. People who cannot reach the Unyson+ menu, such as Sales
Reps, already get the CRM as a menu item of its own.

## Choose what each role opens to

On the **Roles** tab, set **Opens to** for each role. For a team, the usual choice is:

| Role | Opens to |
|---|---|
| Sales Rep | CRM |
| CRM Manager | CRM |
| Administrator | WordPress, or CRM if you work in the CRM most of the day |

People in a role that opens to the CRM:

- land in the CRM when they sign in, and when they open Dashboard;
- see only the CRM and their profile in the WordPress menu, plus whatever you bring back for the role
  under **Menus** (below);
- get a trimmed admin bar (no WordPress logo, comments, "New" or updates);
- see CRM screens without the WordPress menu until they choose **Show the WordPress menu**.

A sign-in that was heading to a particular page (a link someone followed) still goes there.

### Administrators can always switch back

An administrator whose role opens to the CRM gets **Switch to WordPress** in the admin bar, and
**Switch to CRM** to go back. The choice is per person and is remembered. While in the CRM, the switch shows a red
count when updates are waiting.

## Arrange each role's menu

The **Menus** tab arranges the WordPress menu for one role at a time. Pick the role at the top, then:

- **drag** items to reorder them (or focus an item and press **Alt + ↑ / ↓**);
- **rename** an item by typing in its box, for example *Posts* → *News*;
- **change its icon** with the button beside the name;
- untick **Shown** to hide an item, or open its sub-items and untick the ones the role does not need;
- with the Admin Skin on, drag an item into another group (Workspace, Shop, Tools…) and rename the groups.
- click an item (or the arrow at its end) to open its sub-items, then **drag them into a new order**, or **drag one
  out** into the menu to give it a place of its own, for example SEO out of the Unyson+ menu or Site Health out of
  Tools. It can then be dragged, renamed and given an icon like any other item. Drag it back into its own menu to
  return it. The page itself does not move, so its address and bookmarks keep working. With the keyboard,
  **Alt + ←** moves a sub-item out and **Alt + →** moves it back;
- a sub-item can go back to its own menu or out to the top level, not into a different menu, and a menu's first
  entry (the item itself) stays first.

The preview beside the list shows the menu as that role will see it. **Copy from** gives the role another
role's menu, and **Reset to the WordPress menu** removes its changes. Administrators whose menu you changed
get **Show the full menu** in the admin bar, so you can always reach everything.

For a role that opens to the CRM, the menu starts as the CRM and Profile. Anything you show is added, and
anything a plugin adds to WordPress later stays out of that role's menu until you show it here. For other
roles, a new item appears at the end of their menu.

## Hiding a menu is not a permission

A hidden menu keeps people's focus; it does not lock anything. A hidden top-level screen opened by its
address is sent back, but its sub-pages can still be opened by anyone whose role allows them. What someone may do is set by their role, which is why the CRM's own
[team roles](./team-roles.md) are the right roles for a team: a Sales Rep can only work the CRM records
they own, whatever menus are shown.

## Membership too

Membership is a workspace as well. Staff who look after members can open to **Membership** the same way, and you
can give it its own menu item. The **Run a members' site** set-up also keeps members (Subscribers) out of wp-admin
altogether; see [keep members out of wp-admin](/membership/member-area/login-and-account#keep-members-out-of-wp-admin-completely).
