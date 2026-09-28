---
title: Set up AI for Unyson+ (Claude subscription, API key or free local models)
description: Power the Unyson+ AI Assistant chat panel and the Site Converter's AI assist with your Claude subscription through Claude Code, an Anthropic API key, or free local models through Ollama.
keywords: [Claude Code WordPress, Claude subscription WordPress, Anthropic API key WordPress, Ollama WordPress, free local AI WordPress, Qwen3, AI Assistant, Site Converter AI]
---

# Set up AI for Unyson+

Two Unyson+ features use an AI model: the **✦ AI Assistant** chat panel (it builds and edits pages
from a request) and the Site Converter's optional **AI assist** (it refines a conversion). Both work
with any of three sources, and both run the AI **on your computer**, through the free **AI Dev Kit**,
unless you give WordPress a provider key.

| Source | Cost | Quality | Works for |
| --- | --- | --- | --- |
| **Your Claude subscription**, through Claude Code | Included in the subscription | Best | AI Assistant, Site Converter |
| **An API key** | Pay per use | Best | AI Assistant (a key in WordPress), Site Converter (a key in the kit) |
| **A free local model**, through Ollama | Free | Good for one section at a time | AI Assistant, Site Converter |

Everything below starts from the AI Dev Kit. Get it from
[GitHub](https://github.com/UnysonPlus/UnysonPlus-AI-Dev-Kit), then run `start-converter.bat`
(Windows) or `start-converter.command` (macOS). The first run downloads what it needs; keep the window
open while you work. Its dashboard opens at `http://localhost:4600`.

## Use your Claude subscription (Claude Code)

A Claude subscription needs **no API key**: Claude Code signs in with your account, and the kit uses
it.

1. Install Claude Code. Windows (PowerShell):
   ```powershell
   irm https://claude.ai/install.ps1 | iex
   ```
   macOS / Linux:
   ```bash
   curl -fsSL https://claude.ai/install.sh | bash
   ```
2. Open a **new** terminal and check `claude --version` works (add `~/.local/bin` to PATH if needed).
3. Run `claude` once, sign in with your Claude account, then type `/exit`.
4. Restart the kit. Its window should say **AI ON — Claude Code subscription**.

Now:

- **AI Assistant:** open it in WordPress (*Unyson+ → AI Assistant*, then **Check again**). It says
  *Connected: Claude — your Claude subscription, through the AI Dev Kit on this computer*. This works
  on a hosted site too: your browser talks to the kit, and the kit's Claude Code talks to your site with
  a one-off password that is deleted when each answer is back.
- **Site Converter:** tick **AI assist** when converting.

Each request counts toward your subscription's normal usage limits.

## Use an API key (pay per use)

- **AI Assistant:** add a key from your AI provider under WordPress's *Settings → Connectors*
  (WordPress 7 or newer). The assistant uses it automatically.
- **Site Converter:** create a key at [console.anthropic.com](https://console.anthropic.com) (it needs
  billing and is **separate** from a Claude subscription) and start the capture service with it:
  ```powershell
  $env:ANTHROPIC_API_KEY="sk-ant-..."; node serve.mjs
  ```
  ```bash
  ANTHROPIC_API_KEY=sk-ant-... node serve.mjs
  ```

The kit's key stays in the kit on your computer; it is never sent to or stored in WordPress.

## Use a free local model (Ollama)

The AI Dev Kit includes **Ollama**, which runs open models on your own computer: free and private.

1. In the kit's dashboard, open **Settings → Local AI models**.
2. Download **Qwen3 8B** (most PCs) or **Qwen3 4B** (smaller PCs).
3. Select it.

**Your own models.** Under the list, **Add a model** takes any name from
[ollama.com/library](https://ollama.com/library) (for example `llama3.1:8b`) or a Hugging Face link to a
GGUF model (`https://huggingface.co/<user>/<model>-GGUF`). **Import a .gguf file** registers a model file
already on your computer. Press **Check** on any model to see whether it can do the Unyson+ tasks:
it grades **Ready**, **Weak** or **Not suitable**.

**What to expect.** A local model is slower and less capable than Claude. Ask the AI Assistant for one
change at a time, such as *"Add a FAQ section with three questions"*, not a whole site. On a mid-range
laptop graphics card (6 GB) with Qwen3 8B, a FAQ section took about a minute and a three-card feature
section about six. If Claude Code is also signed in, the kit uses Claude instead.

### Use Ollama without the kit (AI Assistant only)

If you already run Ollama, point the AI Assistant at it directly: in WordPress set
*Unyson+ → AI Assistant → Advanced → AI model → Local AI address* to `http://localhost:11434`, and
allow your site in Ollama's `OLLAMA_ORIGINS` setting (for example
`OLLAMA_ORIGINS=https://your-site.com`), then restart Ollama.

## Browsers

The AI Assistant reaches the kit from your browser. Use **Chrome**, **Edge** or **Firefox**, and allow
it the first time the browser asks whether the site may access devices on your network. **Safari** does
not let web pages talk to programs on your computer.

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| The kit says "no AI backend" | Sign in to Claude Code, set `ANTHROPIC_API_KEY`, or select a local model; then restart the kit |
| `claude --version` is not recognized | Add the install folder to PATH and open a new terminal, or set `CLAUDE_CLI` to the program's full path |
| You want a specific Claude model | Set `ANTHROPIC_MODEL` before starting the kit |
| The AI Assistant says "Not connected yet" | Start the kit, then press **Check again**. On a live site, make sure the browser allowed access to your network |
| "Your AI Dev Kit is too old" | Update the kit, or set the Local AI address to Ollama (above) |
| A local model answers but does badly | Press **Check** on it in the dashboard; pick a model that grades **Ready** |

## See also

- [Connect an AI coding tool to your WordPress site](./connect-ai-tools-to-wordpress.md): drive the site
  from Claude Code, Cursor, VS Code, Windsurf or Claude Desktop instead of the chat panel.
- [AI Assistant](/extensions/ai-assistant) and [Site Converter AI assist](/extensions/site-converter/ai-assist).
