---
sidebar_position: 6
title: "Run a WordPress site as a CRM: workspaces"
sidebar_label: "Run the site as a CRM"
description: "Make a WordPress site open straight to the Unyson+ CRM instead of the dashboard. Choose per role what people open to, which WordPress menus they keep, and give the CRM its own menu item."
keywords: [wordpress as a crm, crm only wordpress dashboard, hide wordpress admin menus by role, wordpress login redirect by role, standalone crm on wordpress, wordpress app mode]
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
- see only the CRM and their profile in the WordPress menu, plus any menus you tick under **WordPress
  menus to keep** for that role (Posts, Pages, Media…);
- get a trimmed admin bar (no WordPress logo, comments, "New" or updates);
- see CRM screens without the WordPress menu until they choose **Show the WordPress menu**.

A sign-in that was heading to a particular page (a link someone followed) still goes there.

### Administrators can always switch back

An administrator whose role opens to the CRM gets **Switch to WordPress** in the admin bar, and
**Switch to CRM** to go back. The choice is per person and is remembered.

## Hiding a menu is not a permission

A hidden menu keeps people's focus; it does not lock anything. A screen whose menu is hidden can still be
opened by its address. What someone may do is set by their role, which is why the CRM's own
[team roles](./team-roles.md) are the right roles for a team: a Sales Rep can only work the CRM records
they own, whatever menus are shown.

## Membership too

Membership is a workspace as well. Staff who look after members can open to **Membership** the same way,
and you can give it its own menu item.
