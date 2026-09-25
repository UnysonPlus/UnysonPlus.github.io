---
sidebar_position: 1
title: "Free WordPress AI Site Builder Assistant"
sidebar_label: "AI Assistant"
description: "Free WordPress AI assistant for the Unyson+ page builder — build and edit pages by conversation, drive your site from any MCP-capable AI agent, and answer visitors through the Chat button. Built on the WordPress 7 Abilities API, AI Client and Connectors."
---

# AI Assistant

<div class="ext-hero">
  <span class="ext-hero__badge">FREE!</span>
  <p class="ext-hero__title">Build pages by talking to your site.</p>
  <p class="ext-hero__sub">Ask for a pricing section, a new landing page or a restyled header and watch it land in the page builder as real, editable elements — using your own AI provider key, or an AI agent you already use. No proprietary credits, no paid tier.</p>
</div>

The **AI Assistant** lets an AI model build and edit an Unyson+ site through a set of safe,
schema-checked actions. The same actions power three front-ends: a chat panel inside the page
builder, external AI agents connected over MCP, and an AI channel in the
[Chat](../overview.md#available-extensions) button that answers your visitors.

:::info Status — in design
This page is the design and build plan. Nothing has shipped yet; the
[roadmap](#roadmap) below is updated as each phase lands.
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
marks the read-only subset that the Chat AI channel is allowed to use.

### Site and content (read)

| Ability | Input | Returns | Permission | Visitor |
| --- | --- | --- | --- | --- |
| `unysonplus/site-info` | — | Site name, tagline, active theme, active extensions, page list | `edit_posts` | No |
| `unysonplus/list-elements` | optional category | Every available page-builder element with a one-line summary | `edit_posts` | No |
| `unysonplus/describe-element` | element slug | The element's full option schema + usage notes | `edit_posts` | No |
| `unysonplus/get-page` | post ID | The page's builder structure (sections → columns → elements) | `edit_post` on that ID | No |
| `unysonplus/list-presets` | preset type | Button, box, section and color presets with their names | `edit_posts` | No |
| `unysonplus/search-content` | query | Matching published pages, posts and products (title, excerpt, URL) | public | **Yes** |
| `unysonplus/get-content` | post ID or URL | Plain-text body of a *published* page, post or product | public | **Yes** |

### Building (write)

| Ability | Input | Effect | Permission | Hints |
| --- | --- | --- | --- | --- |
| `unysonplus/create-page` | title, status (draft default), optional structure | Creates a new builder page | `publish_pages` for publish, else `edit_pages` | — |
| `unysonplus/insert-section` | post ID, position, section structure | Inserts a validated section | `edit_post` | — |
| `unysonplus/update-element` | post ID, element path, option values | Changes options on one element | `edit_post` | idempotent |
| `unysonplus/move-element` | post ID, from path, to path | Reorders sections, columns or elements | `edit_post` | idempotent |
| `unysonplus/remove-element` | post ID, element path | Deletes an element or section | `edit_post` | **destructive** |
| `unysonplus/apply-template` | post ID, template ID, position | Inserts a Template Library section or page | `edit_post` | — |
| `unysonplus/save-preset` | preset type, name, values | Creates or updates a Theme Settings preset | `edit_theme_options` | idempotent |
| `unysonplus/update-theme-settings` | settings path, values | Changes Theme Settings (colors, fonts, header, footer…) | `edit_theme_options` | — |
| `unysonplus/convert-url` | source URL | Runs the Site Converter capture + import | `manage_options` | **destructive** |

### Safety and verification

| Ability | Input | Returns | Permission |
| --- | --- | --- | --- |
| `unysonplus/list-revisions` | post ID | AI-tagged revisions, newest first | `edit_post` |
| `unysonplus/undo` | post ID, optional revision ID | Restores the page to the revision saved before an AI change | `edit_post` |
| `unysonplus/render-check` | post ID | Rendered HTML summary: sections found, headings, missing images, console errors, and an optional screenshot | `edit_post` |

Every write ability returns the changed structure *plus* a short diff, so the model — and the
person watching — can see exactly what moved.

## Front-end 1 — MCP access for AI agents

The quickest front-end to ship, and the one that needs no key stored in WordPress. Abilities
flagged for MCP are served by WordPress's MCP adapter, so any MCP-capable AI agent on your
desktop can list and call them.

- **Authentication:** a WordPress **Application Password** for a dedicated user. The agent can do
  exactly what that user's role allows — nothing more.
- **Typical session:** the agent calls `site-info` → `list-elements` → `describe-element` for the
  pieces it needs → `create-page` / `insert-section` → `render-check` → reports back.
- **Where it shines:** large jobs (a whole site from a brief), repetitive edits across many pages,
  and pairing with the [Site Converter](../site-converter/index.md) to reproduce a source site.
- **Setup (planned):** *Unyson+ → AI Assistant → Connect an agent* shows the MCP endpoint URL and
  a one-click "create Application Password" button with a ready-to-paste config snippet.

## Front-end 2 — the in-builder assistant panel

A chat panel docked in the page builder (backend and [Live Page Editor](../live-editor.md)),
powered by the WordPress AI Client and whatever provider key is set under **Connectors**.

- **Context-aware:** the panel knows which page is open and which element is selected, so
  "make this button bigger" needs no explanation.
- **Streaming progress:** each ability call is shown as a step ("Inserted section *Pricing*",
  "Updated button preset *Primary*") with an **Undo** link on every step.
- **Draft-safe by default:** new pages are created as drafts; changes to a published page are
  applied to the builder but not saved until you press **Update**, exactly like a manual edit.
- **Prompt starters:** "Build a landing page for…", "Rewrite this section's copy", "Match this
  page to my brand colors", "Convert this URL".
- **No key configured:** the panel shows a short explainer linking to **Settings → Connectors**
  and to the MCP option above.

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
| Destructive actions | Abilities marked `destructive` (remove, convert URL) require an explicit confirmation step in the panel |
| Prompt injection from page content or visitors | Visitor chat only has read-only abilities; content returned by `get-content` is passed to the model as quoted data, never as instructions |
| Runaway usage | Per-user and per-site rate limits; a daily cap for the visitor channel |
| Claiming success that isn't real | The assistant must call `render-check` after a build and include its result in the final reply |

## The verify loop

A reply saying "I've recreated the page" is worthless if the page is broken. After every build the
assistant:

1. Calls `render-check` on the page it changed.
2. Confirms every section it inserted appears in the rendered HTML, headings are in order, images
   load, and there are no front-end errors.
3. When a reference was given (a URL or screenshot), compares section by section using the
   capture service's visual comparison and lists what still differs.
4. Reports the result honestly — what matches, and what it could not match.

## Settings and storage

| Setting | Where | Default |
| --- | --- | --- |
| Enable AI Assistant | *Unyson+ → Extensions* | Off (ships inactive) |
| AI provider key | *Settings → Connectors* (WordPress core) | None |
| Model preference | *Unyson+ → AI Assistant* | Provider default |
| Allowed roles for the builder panel | *Unyson+ → AI Assistant* | Administrator, Editor |
| MCP access | *Unyson+ → AI Assistant → Connect an agent* | Off |
| Chat AI channel | *Theme Settings → Site-wide UX → Chat Button* | Off |
| Visitor daily message cap | same | 100 |

Nothing is written outside the standard places: revisions use WordPress revisions, settings use
the extension's options, and the optional visitor log is a custom table removed on uninstall.

### File layout (planned)

```
framework/extensions/ai-assistant/
├── manifest.php
├── class-fw-extension-ai-assistant.php
├── includes/
│   ├── abilities/          one file per ability category (read, build, safety, visitor)
│   ├── class-schema-validator.php
│   ├── class-revisions.php
│   └── class-render-check.php
├── views/                  settings page, builder panel mount
└── static/
    ├── js/panel.js         builder chat panel
    └── css/panel.css
```

The Chat AI channel lives in the **Chat** extension (`chat/includes/ai-channel.php`) and only
activates when the AI Assistant extension is active.

## Roadmap

| Phase | Deliverable | Done when | Status |
| --- | --- | --- | --- |
| 1 | Extension skeleton + read abilities + write abilities with schema validation and revisions | A test page can be built and undone entirely through abilities | Not started |
| 2 | MCP access + "Connect an agent" screen | An external agent builds a 3-section page from a one-line brief | Not started |
| 3 | In-builder assistant panel | "Add a pricing section" works in the backend builder and Live Page Editor, with per-step Undo | Not started |
| 4 | `render-check` + verify loop | Every build reply includes a render check; a deliberately broken section is caught | Not started |
| 5 | Chat AI channel | Answers a question from a published page, hands off to a human channel, respects the daily cap | Not started |

## Open questions

- **Minimum WordPress version.** The assistant needs WordPress 7's AI Client and Connectors. On
  older sites, should the extension hide itself, or offer MCP-only mode using the Abilities API
  (available since 6.9)?
- **Where the builder panel lives.** A docked side panel (always visible) or a floating button
  that opens it (less clutter)?
- **Screenshots in `render-check`.** Server-side screenshots need a headless browser, which most
  hosts don't have. The default could be an HTML-only check, with screenshots only when the
  capture service is reachable.
- **Visitor channel models.** Should the visitor channel be allowed to use a cheaper model than
  the builder panel, configured separately?
