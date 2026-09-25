---
sidebar_position: 1
title: "Free WordPress AI Site Builder Assistant (Beta)"
sidebar_label: "AI Assistant (Beta)"
description: "Free WordPress AI assistant for the Unyson+ page builder — build and edit pages by conversation, drive your site from any MCP-capable AI agent, and answer visitors through the Chat button. Built on the WordPress 7 Abilities API, AI Client and Connectors."
---

# AI Assistant (Beta)

<div class="ext-hero">
  <span class="ext-hero__badge">BETA</span>
  <p class="ext-hero__title">Build pages by talking to your site.</p>
  <p class="ext-hero__sub">Ask for a pricing section, a new landing page or a restyled header and watch it land in the page builder as real, editable elements — using your own AI provider key, or an AI agent you already use. No proprietary credits, no paid tier.</p>
</div>

The **AI Assistant** lets an AI model build and edit an Unyson+ site through a set of safe,
schema-checked actions. The same actions power three front-ends: a chat panel inside the page
builder, external AI agents connected over MCP, and an AI channel in the
[Chat](../overview.md#available-extensions) button that answers your visitors.

:::warning Beta — trial stage
The AI Assistant is in **beta**. It appears in *Unyson+ → Extensions* as **AI Assistant (Beta)** and
ships inactive. **Phases 1–4 have shipped** (extension 1.0.3): the abilities layer below — read the
site, create pages, insert / update / move / remove items, and undo — a built-in **MCP server** for
[connecting an AI agent](#front-end-1--mcp-access-for-ai-agents), the
[**AI Assistant panel**](#front-end-2--the-in-builder-assistant-panel) in the page builder and Live
Page Editor, and a [**render check**](#the-verify-loop) the assistant runs after every build. The Chat
channel is still to come; the [roadmap](#roadmap) is updated as each phase lands. Expect changes while
in beta.
:::

## What it does

1. **Create and edit pages by conversation.** "Add a pricing section with three plans" produces
   valid page-builder content made of real Unyson+ elements and presets — not a screenshot, not
   raw HTML.
2. **Works with or without an API key.** Site owners can add an AI provider key once under
   WordPress's **Settings → Connectors**. Developers can instead drive the site from any
   MCP-capable AI agent on their desktop, with no key stored in WordPress at all.
3. **Never breaks a page.** Every change is validated against the element's real option schema,
   and a revision is saved first, so one click undoes it.
4. **Proves the result.** The assistant renders the page and checks it before it reports success,
   instead of simply claiming the job is done.
5. **Answers visitors.** The Chat button gains an optional AI channel that answers questions from
   your site's content and hands off to a human channel when it can't help.

Out of scope for the first version: generating images, editing theme PHP files, and bulk
operations across a multisite network.

## Built on the WordPress 7 AI stack

WordPress 7 ships the whole AI stack in core, so the AI Assistant builds on it rather than
carrying its own provider code. That means one key, configured once, works for every plugin that
uses it — and the assistant keeps working as providers and models change.

| Core piece | What it gives the AI Assistant | Key functions |
| --- | --- | --- |
| **Abilities API** (since 6.9) | Typed actions an AI may perform, each with a JSON Schema for input and output, a permission check, and hints (`readonly`, `destructive`, `idempotent`) | `wp_register_ability()`, `wp_register_ability_category()`, `wp_get_abilities()` |
| **AI Client** | One provider-neutral way to prompt a model and let it call registered abilities as tools | `wp_ai_client_prompt()`, `->using_abilities()`, `wp_supports_ai()` |
| **Connectors** | An admin screen where the site owner stores an AI provider key once | `wp_get_connectors()`, `wp_get_connector()` |
| **REST / MCP exposure** | Abilities flagged `public` / `show_in_rest` can be called over REST and served to external agents by the MCP adapter | `meta.public`, `meta.show_in_rest` |

A site can switch AI off entirely with `define( 'WP_AI_SUPPORT', false );` or the
`wp_supports_ai` filter; the AI Assistant respects both and hides its UI.

## Architecture

One **abilities layer** does all the work; every front-end is a thin client on top of it. A new
capability is written once and is immediately available to MCP agents and the builder panel —
and, if it is read-only, to the visitor chat.

```
 MCP-capable AI agent ──MCP──▶ MCP adapter ───────┐
 Builder AI panel ──AI Client + Connector key──┐  │
 Visitor Chat AI channel ──AI Client (read-only)┤  │
                                                ▼  ▼
                                 ┌─────────────────────────────┐
                                 │  Unyson+ abilities layer    │
                                 │  (validate · revision · run)│
                                 └──────────────┬──────────────┘
          ┌───────────────────┬─────────────────┼──────────────────┬───────────────────┐
          ▼                   ▼                 ▼                  ▼                   ▼
   Page Builder JSON   Theme Settings     Presets           Site Converter      Render + verify
```

Design rules:

- **Abilities are the only write path.** No front-end writes post meta or options directly;
  everything goes through a validated ability.
- **Validate against the live schemas.** Element option schemas are read from the registered
  shortcodes at runtime, never from a hand-copied list, so they cannot drift.
- **Presets first.** When styling a button, card or section, the assistant picks or creates a
  Theme Settings preset instead of writing one-off styles on the element — the same rule the
  [Site Converter](../site-converter/index.md) follows — so a later preset edit restyles
  everything consistently.
- **Grounded in the reference docs.** Rather than stuffing every element's documentation into
  each request, the model looks up only the elements it needs through the `describe-element`
  ability.

## Abilities

All abilities live in the `unysonplus` namespace, grouped into categories. The **Visitor** column
marks the read-only subset that the Chat AI channel is allowed to use. Every ability in the *Site and
content* table is live in 1.0.0; in the other two tables each row says **Shipped** or *Planned*.

### Site and content (read)

| Ability | Input | Returns | Permission | Visitor |
| --- | --- | --- | --- | --- |
| `unysonplus/site-info` | — | Site name, tagline, active theme, active extensions, page list | `edit_posts` | No |
| `unysonplus/list-elements` | optional category | Every layout type and page-builder element with a one-line summary | `edit_posts` | No |
| `unysonplus/describe-element` | element slug, `include_effects` | Every option id with its type, tab, label, allowed choices and default (animation effect options only on request) | `edit_posts` | No |
| `unysonplus/get-page` | post ID, `detail` (outline / full) | The page's builder tree; the outline gives every item a `path` such as `0.2.1` | `edit_post` on that ID | No |
| `unysonplus/list-presets` | preset type | Button, box, section and color presets with their names | `edit_posts` | No |
| `unysonplus/search-content` | query | Matching published pages, posts and products (title, excerpt, URL) | public | **Yes** |
| `unysonplus/get-content` | post ID or URL | Plain-text body of a *published* page, post or product | public | **Yes** |

### Building (write)

| Ability | Input | Effect | Permission | Hints |
| --- | --- | --- | --- | --- |
| `unysonplus/create-page` | title, status (draft default), post type, slug, optional items | Creates a new builder page — **Shipped** | publish capability for publish/private, else edit | — |
| `unysonplus/insert-items` | post ID, items, optional parent path + position | Inserts validated items at the page root or inside a layout item — **Shipped** | `edit_post` | — |
| `unysonplus/update-element` | post ID, path, atts (merged; `null` resets one), column width | Changes options on one item — **Shipped** | `edit_post` | idempotent |
| `unysonplus/move-element` | post ID, path, destination parent, position | Moves an item with its children — **Shipped** | `edit_post` | — |
| `unysonplus/remove-element` | post ID, path | Deletes an item and everything inside it — **Shipped** | `edit_post` | **destructive** |
| `unysonplus/apply-template` | post ID, template ID, position | Inserts a Template Library section or page — *Planned* | `edit_post` | — |
| `unysonplus/save-preset` | preset type, name, values | Creates or updates a Theme Settings preset — *Planned* | `edit_theme_options` | idempotent |
| `unysonplus/update-theme-settings` | settings path, values | Changes Theme Settings (colors, fonts, header, footer…) — *Planned* | `edit_theme_options` | — |
| `unysonplus/convert-url` | source URL | Runs the Site Converter capture + import — *Planned* | `manage_options` | **destructive** |

### Safety and verification

| Ability | Input | Returns | Permission |
| --- | --- | --- | --- |
| `unysonplus/list-revisions` | post ID | AI revisions, newest first (the newest 20 are kept) — **Shipped** | `edit_post` |
| `unysonplus/undo` | post ID, optional revision ID | Restores a saved revision; the current state is saved first, so an undo can itself be undone — **Shipped** | `edit_post` |
| `unysonplus/render-check` | post ID | Renders the page and lists what a visitor would notice, each with its item path — see [The verify loop](#the-verify-loop) — **Shipped** | `edit_post` |

Every write ability returns the page's new outline, the id of the revision that undoes it, and edit
and preview links. Invalid input changes nothing and returns the exact problems — an unknown option
id, a value outside a select's choices, an element placed where it cannot sit — so the model can
correct itself and retry.

### Items and paths

Items use the same shape the builder saves. A layout item is
`{type: "flexbox" | "section" | "column" | "container" | "row", atts: {…}, _items: […]}` (a column also
takes `width`, e.g. `"1_2"`); an element is `{type: "simple", shortcode: "button", atts: {…}}`. The
page root holds sections, flexboxes or containers; a section holds only columns; elements go inside a
column or flexbox. A new band is usually
`{type: "flexbox", atts: {html_tag: "section", display: "block"}, _items: […]}`.

A **path** is the dotted index `get-page` prints (`0.2.1` = first band → its third child → that
child's second child), or `id:<unique_id>`.

### Calling the abilities over REST

Abilities are served under WordPress's `wp-abilities/v1` namespace. Read-only abilities run with
`GET`, the rest with `POST`:

```
GET  /wp-json/wp-abilities/v1/abilities?category=unysonplus-build
GET  /wp-json/wp-abilities/v1/abilities/unysonplus/get-page/run?input[post_id]=42
POST /wp-json/wp-abilities/v1/abilities/unysonplus/update-element/run
     {"input": {"post_id": 42, "path": "0.1", "atts": {"title": "Hello"}}}
```

An external caller signs in with an **Application Password** (see
[Connecting an agent](#connecting-an-agent) below). Most agents are better served by the MCP
endpoint, which wraps these same abilities as tools.

## Front-end 1 — MCP access for AI agents

**Shipped in 1.0.1.** The extension runs its own MCP server, so any MCP-capable AI agent — a
desktop app, a command-line coding agent, an IDE assistant — can use your site's abilities as tools.
No AI key is stored in WordPress: the agent brings its own model.

```
POST /wp-json/unysonplus-ai/v1/mcp      (MCP Streamable HTTP transport, JSON responses)
```

The fifteen abilities appear as tools named without the prefix: `site_info`, `list_elements`,
`describe_element`, `get_page`, `list_presets`, `search_content`, `get_content`, `create_page`,
`insert_items`, `update_element`, `move_element`, `remove_element`, `render_check`, `list_revisions` and `undo`.
Each tool carries read-only / destructive / idempotent hints so the agent can ask before a risky
step. The server also sends the agent short working instructions (start with `site_info`, check
`describe_element` before setting options, keep new pages as drafts, use presets for styling).

- **Access mode:** *Unyson+ → AI Assistant → MCP access* — **Off** (default: every agent is refused),
  **Read-only** (only the Read tools are offered), or **Read & write**.
- **Who the agent is:** it signs in with an Application Password and acts as **that user**, so it can
  only do what the user's role allows. Use an Editor account to keep an agent away from site settings.
- **Where it shines:** large jobs (a whole page or site from a brief), repetitive edits across many
  pages, and pairing with the [Site Converter](../site-converter/index.md) to reproduce a source site.
- **Also works with the WordPress MCP adapter.** Every ability is flagged `meta.mcp.public`, so a site
  running the adapter plugin exposes the same tools through it.

### Connecting an agent

1. Activate **AI Assistant (Beta)** under *Unyson+ → Extensions*.
2. Open *Unyson+ → AI Assistant*, set **MCP access** to *Read-only* or *Read & write*, and save.
3. Under **Connect an agent**, give the connection a label (e.g. "Work laptop") and click
   **Create connection password**. The screen shows — **once** — the server URL, username, password,
   the ready-made `Authorization` header, and a JSON config block:

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

4. Paste that into your agent's MCP server settings (or add a remote HTTP MCP server with the URL and
   `Authorization` header), then ask it to build something — e.g. *"Build a draft landing page for a
   small bakery: a hero, a three-item features row and a closing call to action."*

Every connection is listed under **Your connections** with when it was last used, and **Revoke** signs
that agent out immediately. Create one connection per agent or device so each can be revoked alone.

:::note HTTPS and local sites
WordPress only offers Application Passwords over **HTTPS** or on a site whose `WP_ENVIRONMENT_TYPE`
is `local`. On a plain-HTTP **development** host — `localhost`, `127.0.0.1`, or a name ending in
`.local`, `.test` or `.localhost` — the AI Assistant enables them so you can connect an agent while
building locally. Return `false` from the `fw_ai_assistant_allow_local_app_passwords` filter to opt out.
A live site should always be served over HTTPS: the password travels with every request.
:::

## Front-end 2 — the in-builder assistant panel

**Shipped in 1.0.2.** An **✦ AI Assistant (Beta)** button sits at the bottom right of the backend
page builder and of the [Live Page Editor](../live-editor.md). It opens a chat panel: describe a
change — *"Add a pricing section with three plans"*, *"Add a FAQ at the end"*, *"Make the headings
sound more confident"* — and it lands in the builder a few seconds later.

- **It edits what you have open.** The panel sends the page as it is in your editor — unsaved edits
  included — and the AI works on that copy. The result is applied to the builder, **not saved**:
  press **Update** (or **Save** in the Live Page Editor) to keep it, exactly like a manual edit.
- **One step on your Undo.** Each AI change is a single entry on the builder's own Undo / Redo
  history (and the Live Page Editor's Ctrl+Z). Every reply also has an **Undo this change** link.
- **It knows the page.** The current outline goes along with every request, so "change the second
  heading" or "add a section below the pricing" needs no further explanation.
- **Shows its work.** Each reply lists the changes made ("Inserted 1 item(s)", "Updated button at
  1.2"…).
- **Safe with concurrent edits.** If you change the page while the assistant is working, its result is
  not applied (so nothing you did is overwritten) and it asks you to try again.
- **Conversational.** Follow-ups carry the recent conversation, so "make it four plans instead" works.

### Choosing the AI model

The panel needs a model. *Unyson+ → AI Assistant → Builder assistant → AI model* picks one:

| Option | What it uses | Where it works |
| --- | --- | --- |
| **Automatic** (default) | The WordPress AI Client if a provider key is set, otherwise the local agent command | Everywhere |
| **WordPress AI Client** | The provider key under WordPress's *Settings → Connectors* (WordPress 7 or newer) — you pay the provider per request | Everywhere |
| **Local agent command** | A command-line AI agent already installed on the machine, run in the background by the web server | Local development hosts only (`localhost`, `*.local`, `*.test`) |
| **Off** | — hides the button | — |

The **local agent command** is for building on your own machine without an API key: if a
command-line AI agent that accepts an MCP server config file is installed and signed in, enter the
command that runs it with two placeholders — `{mcp_config}` (a one-off MCP config pointing at this
site) and `{prompt_file}` (the instructions and request) — and its output becomes the reply. For each
request the extension creates a temporary Application Password and a one-off session, points the agent
at the [MCP server](#front-end-1--mcp-access-for-ai-agents) with them, and deletes both when the agent
finishes. The session limits the agent to the panel's tools and to the copy of the page you have open.
The command is only accepted, shown and run on a development host, never on a public site.

When no model is available the panel explains how to add one instead of accepting a request.

:::note Beta testing status
1.0.2 was verified end to end with the **local agent command**, in both the backend builder and the
Live Page Editor. The **WordPress AI Client** path uses the same sandbox and tools but has not yet been
run against a live provider key — reports welcome.
:::

## Front-end 3 — the Chat AI channel

The [Chat](../overview.md#available-extensions) extension today is a floating contact button
with WhatsApp, Messenger, Telegram, SMS, Email and custom-link channels. The AI Assistant adds one
more channel: **AI Assistant**.

- **Answers from your content only.** It uses just the read-only abilities (`search-content`,
  `get-content`), so it can answer "Do you ship to Canada?" from your shipping page — and it can
  never change anything.
- **Hands off to a human.** When it can't answer, or the visitor asks for a person, it offers the
  other channels you enabled (e.g. "Continue on WhatsApp") with the conversation summary
  pre-filled.
- **Owner controls:** a system prompt / persona field, a list of pages to prioritise or exclude,
  opening hours for the human hand-off, and a daily message cap.
- **Cost-aware:** every visitor message costs a request on the owner's provider key, so the
  channel ships **off**, shows an estimated monthly cost from the daily cap, and stops (falling
  back to the human channels) when the cap is reached.
- **Privacy:** conversations are not stored by default; an opt-in log keeps the last 30 days for
  review, and the channel adds a line to the site's privacy policy suggestion text.

## Safety, permissions and undo

| Risk | How it is handled |
| --- | --- |
| A model writes invalid builder content | Every write is validated against the live option schema; invalid input is rejected with a readable error the model can correct |
| A change goes wrong | A revision tagged `ai` is saved before every write; `undo` restores it, and the panel shows Undo on each step |
| Doing more than the user may do | Each ability's permission check uses standard WordPress capabilities for the *current* user; MCP agents act as their Application Password user |
| Destructive actions | Abilities carry a `destructive` hint so an agent can ask first, and the assistant is instructed to ask before removing content you wrote; in the panel nothing is saved until you press Update, and every change is one Undo step. *(A confirmation dialog in the panel is planned.)* |
| Prompt injection from page content or visitors | Visitor chat only has read-only abilities; content returned by `get-content` is passed to the model as quoted data, never as instructions |
| Runaway usage | The panel caps each request at 16 model rounds (the local agent at 10 minutes). *(Per-user rate limits and the visitor channel's daily cap are planned.)* |
| Claiming success that isn't real | The assistant is instructed to run `render-check` and fix what it reports; the panel runs it again itself and shows the result under every reply that changed the page |

## The verify loop

**Shipped in 1.0.3.** A reply saying "I've built the page" is worthless if the page is broken, so the
assistant checks its own work:

1. After building, it calls **`render-check`**, which renders the page element by element — inside
   the builder panel, the unsaved version you have open — and lists every problem with the item's
   `path`.
2. It fixes what the check reports for the items it added or changed, and checks again.
3. The panel then runs the check once more itself and shows the result under the reply — a green
   *"Page check: No problems found"* or the list of what is still wrong — so the verdict never rests on
   the model's word alone.

What the check reports:

| Severity | Problem |
| --- | --- |
| Error | An element that renders nothing, fails while rendering, prints a PHP error, or leaves raw `[shortcode]` text on the page |
| Error | An image with no source, or pointing at an uploaded file that no longer exists |
| Warning | An element's **main visual** is empty — an icon box with no icon, an image box with no image, a Lottie with no file — which shows as an empty gap |
| Warning | Text still showing its default, like a button labelled "Submit" |
| Warning | A link that goes nowhere (`#` or empty) |
| Warning | An empty section or flexbox with no styling of its own (a styled empty one — a coloured bar, a divider — is left alone) |
| Warning | More than one `h1`, or a heading that skips a level (`h2` → `h4`) |

The "main visual" is an icon or media option named after the element itself (`icon_box` → `icon`,
`image_box` → `image`), so optional extras such as a button's icon are not flagged. Theme and extension
developers can adjust the list per element with the `fw_ai_assistant_visual_atts` filter.

The check reads markup, not pixels. Comparing the result visually against a reference design is the
next step (see [Open questions](#open-questions)).

## Settings and storage

| Setting | Where | Default |
| --- | --- | --- |
| Enable AI Assistant | *Unyson+ → Extensions* | Off (ships inactive) |
| AI provider key | *Settings → Connectors* (WordPress core) | None |
| Builder assistant AI model (Automatic / WordPress AI Client / Local agent command / Off) | *Unyson+ → AI Assistant → Builder assistant* — option `upw_ai_panel_backend` | Automatic |
| Local agent command (development hosts only) | same — option `upw_ai_local_agent_cmd` | None |
| MCP access (Off / Read-only / Read & write) | *Unyson+ → AI Assistant → MCP access* — stored as option `upw_ai_mcp_mode` | Off |
| Agent connections | *Unyson+ → AI Assistant → Connect an agent* (WordPress Application Passwords) | None |
| Chat AI channel | *Theme Settings → Site-wide UX → Chat Button* | Off |
| Visitor daily message cap | same | 100 |

Nothing is written outside the standard places: AI revisions are post-meta rows on the page they
belong to (the newest 20 per page), settings are WordPress options, connections are ordinary
Application Passwords, and the planned visitor log will be a custom table removed on uninstall.

### File layout

```
framework/extensions/ai-assistant/
├── manifest.php
├── class-fw-extension-ai-assistant.php   admin screen + wiring
├── includes/
│   ├── class-fw-ai-schema.php            element catalog, option schemas, validation
│   ├── class-fw-ai-store.php             builder-tree read/write, revisions, paths
│   ├── class-fw-ai-abilities.php         ability registration + callbacks
│   ├── class-fw-ai-mcp.php               the MCP server endpoint
│   ├── class-fw-ai-panel.php             the builder panel's REST routes + model backends
│   └── class-fw-ai-check.php             render-check
├── static/                               the panel's JS + CSS
└── views/page.php                        Unyson+ → AI Assistant
```

The panel is only loaded for users who can edit the page. For developers, `fw_ai_assistant_tree_saved` fires after every AI write with the post id and the new
tree.

The Chat AI channel lives in the **Chat** extension (`chat/includes/ai-channel.php`) and only
activates when the AI Assistant extension is active.

## Roadmap

| Phase | Deliverable | Done when | Status |
| --- | --- | --- | --- |
| 1 | Extension skeleton + read abilities + write abilities with schema validation and revisions | A test page can be built and undone entirely through abilities | **Done** — 1.0.0 |
| 2 | MCP access + "Connect an agent" screen | An external agent builds a 3-section page from a one-line brief | **Done** — 1.0.1 |
| 3 | In-builder assistant panel | "Add a pricing section" works in the backend builder and Live Page Editor, with per-step Undo | **Done** — 1.0.2 |
| 4 | `render-check` + verify loop | Every build reply includes a render check; a deliberately broken section is caught (the Phase 2 acceptance run showed why: an agent left icon boxes without an icon, rendering an empty gap above each title) | **Done** — 1.0.3 (the same request now ends with the icons set and a clean check) |
| 5 | Chat AI channel | Answers a question from a published page, hands off to a human channel, respects the daily cap | Not started |

## Open questions

- **Minimum WordPress version.** The abilities layer needs only the Abilities API, so 1.0.0 requires
  WordPress 6.9 (on older WordPress it loads but registers nothing). The builder panel and Chat
  channel will need WordPress 7's AI Client and Connectors. Should those parts hide themselves on
  6.9, or should the extension require 7.0 outright?
- **Panel placement.** 1.0.2 uses a floating button that opens a panel at the bottom right; while
  open, it covers part of the backend editor's *Publish* box (close the panel to reach it). Should it
  dock on the left instead, or shrink when the Publish box is in view?
- **Visual comparison.** 1.0.3's render check is HTML-only, which works on every host. Pixel checks
  (layout gaps, overlapping elements, comparing against a reference design) need a headless browser,
  which most hosts don't have. Should the check add a visual pass only when the capture service is
  reachable?
- **Visitor channel models.** Should the visitor channel be allowed to use a cheaper model than
  the builder panel, configured separately?
