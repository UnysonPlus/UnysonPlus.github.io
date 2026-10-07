---
title: Connect an AI coding tool to your WordPress site
description: Let Claude Code, Cursor, VS Code, Windsurf or Claude Desktop build and edit your Unyson+ WordPress site through its built-in MCP server, with exact setup for each.
keywords: [MCP, WordPress MCP server, Claude Code WordPress, Cursor WordPress, VS Code MCP, Windsurf MCP, Claude Desktop MCP, AI build WordPress site]
---

# Connect an AI coding tool to your WordPress site

The Unyson+ **AI Assistant** extension includes an **MCP server**, the open standard AI tools use to
call other software. Connect your AI tool to it and you can say *"build a draft About page with our
story and team"* in **Claude Code**, **Cursor**, **VS Code**, **Windsurf** or **Claude Desktop**, and
it builds the page in your site's page builder: checked against the real element options, saved as
a draft, and undoable.

This guide is the setup for each tool. The technical details (methods, errors, limits) are in the
[MCP server reference](/extensions/ai-assistant/mcp-server).

:::note Just want to chat inside WordPress?
You do not need any of this for the **✦ AI Assistant** chat panel inside WordPress; it finds its AI a
different way. See [Set up AI for Unyson+](./set-up-ai-for-unysonplus.md).
:::

:::tip Does your tool offer a browser sign-in for MCP servers?
Then skip the password: add the server URL
`https://example.com/wp-json/unysonplus-ai/v1/mcp` as a remote MCP server, and the tool opens a page on
your site asking **"Allow … to use this site?"**. Choose *Read and write* or *Read only* and press
**Allow**. See [Web apps](#web-apps-chatgpt-and-claudeai) below. The password steps that follow work
with every tool.
:::

## 1. Create a connection password on your site

1. In WordPress, activate **AI Assistant (Beta)** under *Unyson+ → Extensions*.
2. Open *Unyson+ → AI Assistant → Advanced → Outside AI programs*.
3. Name the connection after the tool (for example "Claude Code on my laptop") and press
   **Create a connection password**.
4. Keep the page open: it shows the details **once**. Press **Copy everything** to copy the Server URL,
   username, password and **Authorization header** (it starts with `Basic `) in one go — paste it to your
   AI tool or straight to the AI that asked. Separate fields and a ready-made MCP config are under
   *Other formats*.

Access is switched to *Read and write*. Choose *Read only* on the same screen if the tool should only
look. Your site must use **HTTPS** (a local development site on `localhost`, `.local` or `.test` is
fine too).

In the examples below, replace `https://example.com` with your site and `Basic YOUR_TOKEN` with the
Authorization header you copied.

## 2. Add it to your AI tool

### Claude Code

One command in a terminal (add `--scope user` to use it in every project):

```bash
claude mcp add --transport http unysonplus https://example.com/wp-json/unysonplus-ai/v1/mcp --header "Authorization: Basic YOUR_TOKEN" --scope user
```

Check it with `claude mcp list`: the server should show **Connected**. Then start `claude` and ask for
something.

### Cursor

Add the server to `~/.cursor/mcp.json` (all projects) or `.cursor/mcp.json` (one project):

```json
{
  "mcpServers": {
    "unysonplus": {
      "url": "https://example.com/wp-json/unysonplus-ai/v1/mcp",
      "headers": { "Authorization": "Basic YOUR_TOKEN" }
    }
  }
}
```

Open *Cursor Settings → MCP* and make sure **unysonplus** is enabled, then use Agent mode in chat.

### VS Code (GitHub Copilot agent mode)

Add a `.vscode/mcp.json` to your workspace:

```json
{
  "servers": {
    "unysonplus": {
      "type": "http",
      "url": "https://example.com/wp-json/unysonplus-ai/v1/mcp",
      "headers": { "Authorization": "Basic YOUR_TOKEN" }
    }
  }
}
```

Start the server from the file (VS Code shows a **Start** link above it), then open Copilot Chat in
**Agent** mode; the site's tools appear under the tools icon.

### Windsurf

Add the server to `~/.codeium/windsurf/mcp_config.json`:

```json
{
  "mcpServers": {
    "unysonplus": {
      "serverUrl": "https://example.com/wp-json/unysonplus-ai/v1/mcp",
      "headers": { "Authorization": "Basic YOUR_TOKEN" }
    }
  }
}
```

Refresh the MCP servers in Cascade's settings, then ask Cascade.

### Claude Desktop

Claude Desktop connects to remote servers through a small local bridge that adds the header. It needs
[Node.js](https://nodejs.org/) installed. Open *Settings → Developer → Edit Config* and add:

```json
{
  "mcpServers": {
    "unysonplus": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://example.com/wp-json/unysonplus-ai/v1/mcp", "--header", "Authorization:${UPW_AUTH}"],
      "env": { "UPW_AUTH": "Basic YOUR_TOKEN" }
    }
  }
}
```

(The header goes through an environment variable because a space inside the arguments breaks on some
systems.) Restart Claude Desktop; the tools appear under the tools icon in a new chat.

### Any other MCP tool

Add a **remote HTTP** (Streamable HTTP) MCP server with the Server URL and an `Authorization` header set
to the value you copied. Most tools accept the config block the connection screen shows as-is.

### Web apps: ChatGPT and claude.ai

**ChatGPT** connectors and **claude.ai** custom connectors connect through a browser sign-in (OAuth)
instead of a password, which the site supports from AI Assistant 1.0.19:

1. In the app's connector settings, add a custom connector (remote MCP server) with the URL
   `https://example.com/wp-json/unysonplus-ai/v1/mcp`. Leave any client ID / secret fields empty: the
   app registers itself.
2. The app opens your site. Log in to WordPress if asked, choose *Read and write* or *Read only*, and
   press **Allow**.
3. Back in the app, the site's tools are available in your chats.

These apps connect from the provider's servers, so your site must be **public and on HTTPS**: a site
on your own computer cannot be reached. The app appears under *Apps signed in with your account* on the
Outside AI programs screen, where **Sign out** disconnects it.

## 3. Try it

Good first requests:

- *"What is on this site? Use site_info."* (read-only, safe to try first)
- *"Create a draft page called Pricing with three plans and a FAQ, then check it for problems."*
- *"Give the site a warm colour palette and friendly fonts."* (Theme Settings changes are live; ask it
  to undo them if you do not like them)

New pages are **drafts**. Every change saves a revision first, and the tool can undo its own changes
(`undo`, `undo_theme_settings`, `undo_change`).

## If it does not connect

Test the connection with the two `curl` commands in the
[MCP server reference](/extensions/ai-assistant/mcp-server#test-a-connection-with-curl), then check its
[troubleshooting table](/extensions/ai-assistant/mcp-server#errors-and-troubleshooting). The two most common
causes: the extension is not active (a 404), or the host strips the `Authorization` header (a 401 with
the right password), which one `.htaccess` line fixes.

When the tool has connected, **Last used** in the connections list shows the time. To disconnect a
tool, press **Revoke** next to its connection (or **Sign out** next to an app that used the browser
sign-in).
