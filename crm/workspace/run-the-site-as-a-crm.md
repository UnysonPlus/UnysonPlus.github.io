---
sidebar_position: 6
title: "Run a WordPress site as a CRM: workspaces"
sidebar_label: "Run the site as a CRM"
description: "Make a WordPress site open straight to the Unyson+ CRM instead of the dashboard. Choose per role what people open to, give the CRM its own menu item, and drag, rename, re-icon and hide each role's WordPress menu items."
keywords: [wordpress admin menu editor per role, reorder wordpress admin menu, wordpress as a crm, crm only wordpress dashboard, hide wordpress admin menus by role, wordpress login redirect by role, standalone crm on wordpress, wordpress app mode]
---

# Run the site as a CRM

A site used as a CRM all day should not open to the WordPress dashboard. With **workspaces**, your team signs
in and lands in the CRM, sees the CRM and nothing else they do not need, and you can still reach all of
WordPress yourself.

Go to **Unyson+ → Admin Menu**. It has two tabs: **Menus** arranges each role's menu, and **Roles** sets what each
role opens to.

## Give the CRM its own menu item

On **Menus**, open the **Unyson+** item and drag **CRM** out of its sub-items into the menu (or choose **Move to top
level**). It becomes an item of its own for that role. People who cannot reach the Unyson+ menu, such as Sales
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
**Switch to CRM** to go back. The choice is per person and is remembered.

## Arrange each role's menu

The **Menus** tab arranges the WordPress menu for one role at a time. Pick the role at the top, then:

- **drag** items to reorder them (or focus an item and press **Alt + ↑ / ↓**);
- **rename** an item by typing in its box, for example *Posts* → *News*;
- **change its icon** with the button beside the name;
- untick **Shown** to hide an item, or open its sub-items and untick the ones the role does not need;
- with the Admin Skin on, drag an item into another group (Workspace, Shop, Tools…) and rename the groups.
- open an item's sub-items to **drag them into a new order**, or **drag one out** into the menu to give it a place of
  its own, for example SEO out of the Unyson+ menu or Site Health out of Tools (**Move to top level** does the same
  without dragging). It can then be dragged, renamed and given an icon like any other item. Drag it back into its own
  menu, or choose **Move back**, to return it. The page itself does not move, so its address and bookmarks keep
  working;
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

Membership is a workspace as well. Staff who look after members can open to **Membership** the same way,
and you can give it its own menu item.
