---
sidebar_position: 9
title: The Kit Assistant (chat)
---

# The Kit Assistant

The **Kit Assistant** is the chat in the AI Dev Kit dashboard, at
**`http://localhost:4600/#chat`**. It answers questions about your conversions and about Unyson+
itself, using the kit's own tools: it can open a web page and read it, pull up a capture's conversion
report, search the kit's documentation, and — with your confirmation — start a capture.

It runs on whichever AI backend the kit is set to, so the conversation stays on your machine (a local
model through Ollama) or goes to your own Claude subscription or API key. Nothing is sent anywhere
you have not configured yourself.

:::note Not a general coding agent
The assistant has **seven tools** and no ability to edit files, run commands or change your site. It
reads things and answers. Anything that changes something waits for your Confirm — see
[What it can do](#what-it-can-do) below.
:::

## What it can do

| Tool | What it does |
| --- | --- |
| `look_at_url` | Opens a page in the kit's own browser (real Chrome, so JavaScript-built sites work) and reads its title, headings, navigation and visible text. Leaves a screenshot. |
| `conversion_report` | A capture's report: per-section decisions, which elements fell back and why, dropped styles, style coverage. |
| `search_docs` | Searches the kit's documentation — section recipes, shortcode and option references, Theme Settings, the build protocol. |
| `read_doc` | Reads one kit doc in full. |
| `capture_status` | How a capture is going, or how it ended. |
| `start_capture` | **Asks first.** Proposes a capture; nothing runs until you press Confirm. |
| `hand_to_studio` | **Asks first.** Proposes handing a scene request to Kinetic Scenes. |

Anything that writes comes back as a **proposal** — what would happen, where, and what it would
replace — with **Confirm** and **Cancel** buttons underneath. The assistant cannot press them, and a
proposal expires after 30 minutes. This is why it will say "this needs your Confirm" rather than
claiming it has started something.

The conversation is kept in `capture-out/chat-history.json` (the last 200 messages) so it survives
restarting the service. **New chat** clears it.

## Attaching an image

You can show the assistant a picture — a screenshot of a page that came out wrong, a design mock-up,
a photo of a whiteboard. Three ways:

- the **paperclip** button in the composer,
- **paste** an image straight into the message box,
- **drag and drop** one anywhere onto the composer.

Up to **four images per message**, in PNG, JPEG, GIF or WebP. Each one appears as a thumbnail above
the box before you send, with an **×** to remove it, and stays visible in the conversation afterwards.

Large images are **scaled down in your browser before they are sent** (to 1568px on the long edge,
which is as much as the models actually read). Screenshots stay PNG so their text stays crisp;
photographs are re-encoded as JPEG. A GIF is sent untouched so its animation survives. The images
themselves are saved under `capture-out/_chat/` and the conversation stores only a reference to the
file, so your chat history does not balloon.

### Your model has to be able to see

Reading an image is a capability of the **model**, not of the kit:

- **Claude** (either backend — your subscription through Claude Code, or an API key) reads images.
- **A local model** reads images only if it is a *vision* model. In **Settings → Local AI models**
  these are marked with a blue **vision** badge; **Qwen3-VL 8B** is the recommended one, and
  Gemma 3, Mistral Small 3.2 and the other Qwen3-VL sizes also work.

If you attach an image while a text-only local model is picked, the assistant says so and names a
model that would work, rather than answering as though it had seen the picture.

## Commands

Typing **`/`** in the message box opens a list of commands. Each one runs a **single tool directly**,
with no model involved — which makes it instant, exact, and equally reliable on a small local model
that might otherwise need persuading to pick the right tool.

| Command | What it does |
| --- | --- |
| `/look <url>` | Open a page in the kit's browser and read it |
| `/report [capture]` | The conversion report — what fell back, and why |
| `/status [capture]` | How a capture is going, or how it ended |
| `/docs <query>` | Search the kit docs |
| `/doc <path>` | Read one kit doc in full |
| `/capture <url>` | Capture a site — **asks you to Confirm first** |
| `/studio <request>` | Hand a scene to Kinetic Scenes — **asks you to Confirm** |
| `/clear` | Clear the conversation |
| `/help` | List the commands |

Where a command takes `[capture]` you can leave it out and the latest capture is used, or name a
capture folder, a URL, or `latest`.

Use **↑ / ↓** to move through the list, **Tab** or **Enter** to pick one, **Esc** to dismiss it. A
command that needs no argument runs as soon as you pick it. Commands that change something still go
through the same Confirm step as the assistant's own proposals — `/capture` proposes a capture, it
does not start one.

Anything that does not begin with `/` is an ordinary message to the model. If you attach an image, it
is always sent to the model, since looking at a picture is not something a single tool can do.

## Limits

- **Seven tools, nothing else.** It cannot edit a file, run a command, change your WordPress site or
  touch git.
- **The last 12 turns** of the conversation are sent to the model; older ones scroll out of its view
  (they stay in the transcript).
- **Six tool rounds** per message. After that it answers with what it has gathered.
- **It is for this dashboard.** The chat endpoints refuse requests from any other web page.

## If it says AI is off

The chat needs a model. Open **Settings**, and either pick a local model under *Local AI models*
(the kit downloads it for you) or enable Claude — the kit finds the `claude` CLI on your PATH, or an
`ANTHROPIC_API_KEY` if you have one set. The chat header always names the model that is answering.
