---
title: "Set up WordPress for the CRM website generator (no coding needed)"
sidebar_label: "CRM generator: setup"
description: "Get a fresh WordPress ready for the free CRM Website Generator: install Unyson+, connect Claude with one click and a sign-in, then paste the prompt. No terminal, API key or password sharing."
keywords:
  - crm website generator setup
  - build a wordpress site with claude
  - connect claude to wordpress
  - ai website builder wordpress
---

# Set up WordPress for the CRM website generator

The [CRM Website Generator](https://create.unysonplus.com/crm/) writes a prompt that builds your whole site:
pages, lead forms and a CRM. With a paid Claude plan, Claude builds it from the normal Claude app,
connected to your site through Unyson+. You never open a terminal, never need an API key and never
share a password.

This page takes you from a fresh WordPress to "paste the prompt" in four steps.

## What you need

- **A fresh WordPress on a web host**, with a public **https://** address. Fresh matters: the build
  switches the theme, creates pages and menus and removes the sample content, so never point it at a
  site with real content. If your site is already live, use your host's **staging** copy.
- **A backup.** Take one with your host's backup or snapshot tool before you start.
- **A Claude plan that lets you add custom connectors.** Open Claude's settings and look for
  connectors; if you can add a custom one, you are set.
- About 15 minutes for the generator's form.

### Need WordPress first?

Most web hosts install WordPress for you in one click from their control panel. Look for "Install
WordPress", "WordPress toolkit" or "One-click apps", and choose a fresh install. Many hosts also offer a
**staging** site: a private copy you can build on and publish when it is ready. That is the ideal place
for this.

A WordPress on your own computer (for example with Local) will not work with the Claude app, because
Claude connects from the internet and cannot reach your computer. To build locally, use a coding agent
instead (see [below](#prefer-a-coding-agent)).

## 1. Install Unyson+

1. Download [unysonplus.zip](https://github.com/UnysonPlus/UnysonPlus/releases/latest/download/unysonplus.zip).
2. In WordPress, go to **Plugins → Add New → Upload Plugin**, choose the file, then **Install Now** and
   **Activate**.

## 2. Turn on the AI Assistant

1. Go to **Unyson+ → Extensions** and install **AI Assistant**. (The notice on your dashboard links
   there too.) If the Unyson+ theme is not active yet, WordPress offers it in a notice; activate it.
2. Open **Unyson+ → AI Assistant → Settings → Advanced → Outside AI programs**, choose
   **Read and write** and press **Save access**.
3. Press **Check the connection** in the same section. Each line shows a tick, or says in plain words what
   to fix. If your web addresses are set to "Plain", it offers a one-click switch to "Post name".

You do not need to switch on the CRM, post types or custom fields yourself: when Claude builds the CRM,
it turns on the extensions it needs, and asks you first.

## 3. Connect Claude

The **Server URL** under *Outside AI programs* is your connector address, ending in
`/wp-json/unysonplus-ai/v1/mcp`. Copy it, then:

1. In Claude's settings, add a **custom connector** and paste the address. Leave any client ID or
   secret fields empty.
2. Claude opens your site. Log in to WordPress if asked, choose **Read and write**, and press **Allow**.

That's the whole sign-in: no password goes into Claude. The
[connection guide](./connect-ai-tools-to-wordpress.md#web-apps-chatgpt-and-claudeai) has more detail.

## 4. Build

1. Fill in the [generator](https://create.unysonplus.com/crm/). Under **Build setup**, keep **How will you
   build?** on **In the Claude app** and **Your fresh WordPress is** on **On my web host**.
2. Press **Copy prompt** and paste it into a new Claude chat with the Unyson+ connector switched on.
3. Claude works in **stages**: it checks the site, sets up the design, builds the pages, the forms and
   the CRM, then checks everything. After each stage it tells you what it did; reply "continue".
4. Claude cannot see your pages, so it gives you each link and asks you to look at it on a computer and
   a phone. Tell it anything that looks wrong.

If the chat gets cut off (a long build can reach your plan's usage limit), press **Copy resume
message** in the generator and paste it into a new chat. Claude checks what is already built and
carries on from there; nothing is lost, because the site itself holds the work.

## After the build

- **Disconnect or switch to read-only.** The build needed read and write access; you can now press
  **Sign out** next to Claude under *Apps signed in with your account* on the Outside AI programs
  screen (or keep it connected for later edits).
- **Set up SMTP** on the Mailer screen so your emails don't land in spam. Your host or email provider
  gives you the SMTP details; enter them yourself, never in a chat.
- **Add your real content:** photos, testimonials, team and prices replace the clearly marked
  [placeholders].
- When you built on staging, use your host's "push to live" to publish.

## If something goes wrong

| What you see | What to do |
|---|---|
| The setup page says the connection could not be reached | A security plugin or your host's firewall may block the WordPress REST API (`/wp-json/`). Allow it for logged-in users, or ask your host. |
| Claude says the connector failed to sign in | Check the address starts with `https://` and ends with `/wp-json/unysonplus-ai/v1/mcp`. Some firewalls also block the `/.well-known/` sign-in addresses; ask your host to allow them. |
| A feature fails to download during setup | GitHub limits downloads from one server address; shared hosts share addresses. Wait an hour and run the setup again. |
| Claude says Unyson+ is too old | Update Unyson+ under **Dashboard → Updates**, then continue. |
| Claude says permalinks are "plain" | Run the setup again, or set **Settings → Permalinks** to "Post name". |
| A form's notification email doesn't arrive | Entries are still saved under **Unyson+ → Form Entries**. Set up SMTP on the Mailer screen. |

## Prefer a coding agent?

If you use Claude Code, Cursor, Codex or another coding agent, choose **With a coding agent** under
**Build setup**. The generator then asks where your WordPress is and how the agent reaches it, and the
prompt has the agent do the setup itself. On a live host, the safest choice is **Build locally, move it
later**: the agent builds on your computer and you move the finished site to your host, so it never
needs access to your hosting account.
