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

Go to **Unyson+ → Workspaces**.

## Give the CRM its own menu item

Under **Menu**, tick **Show CRM as its own item in the WordPress menu**. The CRM moves from inside the
Unyson+ menu to the top of the WordPress menu, just below Dashboard, for everyone who can use it.

## Choose what each role opens to

Under **Roles**, set **Opens to** for each role. For a team, the usual choice is:

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
