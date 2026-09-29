---
title: MCP server
sidebar_position: 2
description: Reference for the AI Assistant's built-in MCP server — endpoint, sign-in, access modes, supported methods, tools, errors, testing with curl, troubleshooting and limits.
---

# MCP server

The [AI Assistant (Beta)](./index.md) extension includes an **MCP server**. MCP (Model Context
Protocol) is the open standard AI programs use to call tools, so any MCP-capable AI program (a
command-line coding agent, an IDE assistant, a desktop app) can read and build your site through the
same checked, undoable abilities the chat panel uses. The AI program brings its own model: no AI key is
stored in WordPress.

:::tip Setting up a specific AI program?
The step-by-step setup for each popular program is in the guide
[Connect an AI coding tool to your WordPress site](/guides/connect-ai-tools-to-wordpress).
This page is the reference.
:::

## At a glance

| | |
| --- | --- |
| **Endpoint** | `POST https://<your-site>/wp-json/unysonplus-ai/v1/mcp` |
| **Transport** | MCP Streamable HTTP: JSON-RPC 2.0 over POST, answered with plain JSON (no event stream) |
| **Protocol versions** | `2025-06-18`, `2025-03-26`, `2024-11-05` (the client's choice when supported, else the newest) |
| **Sessions** | Stateless: no session id to keep; every request stands alone |
| **Sign-in** | **Web sign-in (OAuth 2.1)**: the program opens a page on your site where you choose **Allow**; or an **Application Password** sent as `Authorization: Basic base64(username:password)` |
| **Acts as** | The WordPress user who allowed the app or owns the password, limited by that user's role |
| **Access switch** | *Unyson+ → AI Assistant → Advanced → Outside AI programs*: **Off** (default), **Read only**, **Read and write** |
| **Needs** | The AI Assistant extension active, WordPress 6.9+ (Abilities API), and HTTPS on a live site |

## Sign in with the web page (OAuth)

Programs that support web sign-in for remote MCP servers need **only the server URL**. Add
`https://<your-site>/wp-json/unysonplus-ai/v1/mcp` as a remote MCP server, and the program opens a page
on your site:

1. If you are not logged in to WordPress, log in first (the page is part of wp-admin).
2. The page names the app and asks **"Allow … to use this site?"**. Choose what it may do:
   **Read and write** or **Read only**.
3. Press **Allow**. You return to the program, which is now connected as you. **Deny** cancels.

If access for outside programs is **Off**, an administrator's **Allow** turns it on (at the level they
chose); other users see that an administrator must allow it.

The app stays signed in for up to 30 days of inactivity. *Unyson+ → AI Assistant → Advanced → Outside AI
programs → Apps signed in with your account* lists each app, its access, and when it was last used;
**Sign out** ends its access immediately.

**For client developers.** Standard MCP authorization:

| | |
| --- | --- |
| **Discovery** | A signed-out request answers **401** with `WWW-Authenticate: Bearer resource_metadata="…/wp-json/unysonplus-ai/v1/oauth/protected-resource"`. Also served at `/.well-known/oauth-protected-resource`, `/.well-known/oauth-authorization-server` and `/.well-known/openid-configuration` on the site's home URL |
| **Registration** | Dynamic client registration: `POST …/oauth/register` with `redirect_uris` (https, or http on `localhost` / `127.0.0.1`). Public clients only (`token_endpoint_auth_method: none`) |
| **Authorization** | Authorization code with **PKCE `S256`** (required). Scopes `mcp:write` (default) and `mcp:read` |
| **Tokens** | `POST …/oauth/token`, form-encoded. Access tokens last 1 hour; refresh tokens 30 days and are replaced on every use. Codes are single-use and expire after 10 minutes |
| **Revocation** | `POST …/oauth/revoke` with `token` (RFC 7009) |
| **Where tokens work** | Only on the AI Assistant's own routes (`/wp-json/unysonplus-ai/…`), never on the rest of the WordPress REST API. The site stores only a hash of each token |

## Or use a connection password

1. Activate **AI Assistant (Beta)** under *Unyson+ → Extensions*.
2. Open *Unyson+ → AI Assistant → Advanced → Outside AI programs*.
3. Name the connection (for example "Coding agent on my laptop") and press
   **Create a connection password**. This also switches access on (Read and write) if it was Off.
4. Copy the details shown **once**: the server URL, username, password, the ready-made
   `Authorization` header, and a config block most programs accept as-is:

   ```json
   {
     "mcpServers": {
       "unysonplus": {
         "type": "http",
         "url": "https://example.com/wp-json/unysonplus-ai/v1/mcp",
         "headers": { "Authorization": "Basic <base64 of username:password>" }
       }
     }
   }
   ```

Create one password per program or device, so each can be revoked on its own. The list shows when each
was last used; **Revoke** signs that program out immediately.

**Access modes.** *Read only* offers only the tools that change nothing (their list shrinks
accordingly, and a write tool is answered as unknown). *Read and write* offers everything, and every
write saves a revision first. To keep a program away from site-wide settings, give it a password
created by an **Editor** account rather than an Administrator.

## What it answers

| Method | Result |
| --- | --- |
| `initialize` | The negotiated `protocolVersion`, `capabilities: { tools: { listChanged: false } }`, `serverInfo` (name `unysonplus`, the extension version) and **instructions**: short working rules for the AI (start with `site_info`, call `describe_element` before setting options, keep new pages as drafts, run `render_check` before finishing, and the site-build order) |
| `ping` | An empty result |
| `tools/list` | Every tool this connection may use (see below) |
| `tools/call` | Runs one tool |
| `resources/list`, `prompts/list` | Empty lists: everything is offered as tools |
| Notifications (`notifications/initialized`, …) | Accepted with `202 Accepted` |
| A batch (a JSON array of messages) | One array of replies |
| `GET` on the endpoint | `405`: there is no server-initiated stream |

## Tools

Every [ability](./index.md#abilities) appears as a tool named without the `unysonplus/` prefix and with
underscores: `unysonplus/create-page` is the tool `create_page`. The core set covers reading the site
(`site_info`, `list_elements`, `describe_element`, `get_page`, `search_content`, `get_content`), building
pages (`create_page`, `insert_items`, `update_element`, `move_element`, `remove_element`,
`apply_template`, and `replace_text` for site-wide find and replace with a preview), designing the site (`describe_theme_settings`, `update_theme_settings`,
`save_preset`, `update_site_identity`), checking (`render_check`, and `visual_check` to compare a page with a source site) and undoing (`undo`,
`undo_theme_settings`, `undo_change` and the revision lists). Active extensions add their own
(menus, forms, SEO, shop products, animations and more); the
[abilities tables](./index.md#abilities) list them all.

Each tool carries a title, a description, a JSON input schema and hints: `readOnlyHint`,
`destructiveHint` (removing content, converting a URL) and `idempotentHint`, so a well-behaved program
asks before a risky step.

**Results.** A successful call returns the result as JSON text in `content[0].text` and, for object
results, the same data in `structuredContent`. A rejected call returns `isError: true` and says exactly
what to fix: every option id and value is checked against the element's real options before anything is
saved. For example, placing a button straight on the page root with a misspelled option returns:

```json
{ "content": [ { "type": "text", "text": "The items did not validate — nothing was changed. Fix these and retry: 0: a `simple` cannot sit at the page root; wrap it in a flexbox (atts.html_tag = section) or a section. | 0 (button): unknown att(s) colour. Call unysonplus/describe-element for \"button\" to see valid ids." } ], "isError": true }
```

## Test a connection with curl

Before involving any AI, prove the connection with two requests. Replace the URL and the credentials:

```bash
curl -s -u 'USERNAME:APPLICATION PASSWORD' \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"curl","version":"1"}}}' \
  https://example.com/wp-json/unysonplus-ai/v1/mcp
```

A working connection answers with the server details:

```json
{"jsonrpc":"2.0","id":1,"result":{"protocolVersion":"2025-06-18","capabilities":{"tools":{"listChanged":false}},"serverInfo":{"name":"unysonplus","title":"UnysonPlus AI Assistant (Beta) — My Site","version":"1.0.16"},"instructions":"You are connected to a WordPress site built with the UnysonPlus page builder. …"}}
```

Then list the tools (`"method":"tools/list"`) and try a read-only one:

```bash
curl -s -u 'USERNAME:APPLICATION PASSWORD' -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"site_info","arguments":{}}}' \
  https://example.com/wp-json/unysonplus-ai/v1/mcp
```

## Errors and troubleshooting

| You see | Why | Fix |
| --- | --- | --- |
| **404** `rest_no_route` | The AI Assistant extension is not active (or the site is older than WordPress 6.9) | Activate it under *Unyson+ → Extensions* |
| **401** `upw_ai_mcp_auth` "Sign in" | No valid `Authorization` header arrived: a web sign-in that has not happened yet or has expired, or a wrong password | Check the username and password. If they are right, your host may be stripping the header before WordPress sees it (common on Apache with PHP as CGI): add `SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1` to the site's `.htaccess` |
| **401** on a plain-HTTP live site | WordPress only offers Application Passwords over HTTPS | Serve the site over HTTPS |
| **403** `upw_ai_mcp_off` | Access is set to Off | Set it to Read only or Read and write |
| **403** `upw_ai_mcp_forbidden` | The signed-in user cannot edit content | Sign in (or create the password) as an Editor or Administrator |
| The sign-in page says the app "asked to return to an address it did not register" | The program's sign-in request does not match its registration | Remove the server from the program and add it again |
| **405** on `GET` | Expected: the server has no event stream | POST JSON-RPC messages |
| JSON-RPC error `-32602` "Unknown tool" | The tool is not offered to this connection: a write tool in Read-only mode, or an extension that is not active | Switch to Read and write, or activate the extension |
| JSON-RPC error `-32601` "Method not found" | A method outside the list above | See [What it answers](#what-it-answers) |
| "Last used: Never" in the connections list | The program never signed in with that password | Check the program's MCP settings, then test with curl |

On a **local development site** served over plain HTTP (`localhost`, `127.0.0.1`, or a name ending in
`.local`, `.test` or `.localhost`), the AI Assistant enables Application Passwords so you can connect
while you build. Return `false` from the `fw_ai_assistant_allow_local_app_passwords` filter to opt out.

## Limits

- **Web sign-in needs a site the program can reach.** A program that runs on a provider's servers
  (a web chat app's connector) signs in over the internet, so it can connect to a public HTTPS site,
  not to a site on your own computer. Programs that run on your computer can use either.
- **No resources, prompts or change notifications.** Everything is a tool; the tool list does not
  change during a connection.
- **No streaming.** Each call answers when it is done. The tools are quick; a whole-site build is many
  small calls rather than one long one.

## Also available through the WordPress MCP adapter

Every ability is flagged `meta.mcp.public`, so a site running WordPress's own MCP adapter plugin exposes
the same tools through the adapter as well. The built-in server above needs no extra plugin.
