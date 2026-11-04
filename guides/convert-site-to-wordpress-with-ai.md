---
title: "Convert a site to WordPress with an AI agent (Claude)"
sidebar_label: "With an AI agent (Claude)"
description: "Let an AI agent like Claude convert your site to WordPress and refine it until it matches the original — it runs the Unyson+ Site Converter, then compares the result to your source section by section and fixes the gaps. Free, no coding."
keywords:
  - convert website to wordpress with ai
  - ai convert site to wordpress
  - claude convert website to wordpress
  - ai agent wordpress site builder
  - automatically convert site to wordpress
image: /img/page-builder.png
---

# Convert a site to WordPress with an AI agent (Claude)

The free **[Site Converter](/extensions/site-converter)** rebuilds any page into native, editable
WordPress — but an automatic conversion gets you a **close starting point, not a pixel-perfect
clone**. Closing that last gap by hand takes time.

An **AI agent** does it for you. Connect **Claude** (or another MCP-capable tool) to your WordPress
site, and it will **run the conversion and then refine the result until it matches your original** —
because it can see both pages, compare them section by section, and edit the WordPress version until
the difference is gone. The result is still a real, editable WordPress site that you own — just much
closer to the source, with far less hand-tuning.

:::note[What "match" really means]
This is an iterative refinement, not magic: the agent gets a page very close to the original and
keeps improving it, but perfection isn't guaranteed. The upside is that whatever it produces is
**editable WordPress**, not a frozen screenshot — so you (or the agent) can keep adjusting.
:::

## How it works

Under the hood the agent uses two tools your site exposes:

1. **`convert_url`** — runs the Site Converter on your source URL, producing real page-builder pages
   and a matching child theme.
2. **`visual_check`** — opens your **original** and the **converted** page side by side and reports,
   **section by section, what is missing, moved or restyled**. The agent fixes each difference in the
   builder, then runs the check again — repeating until the page matches.

That compare-and-fix loop is the part that's tedious by hand and that the agent is good at.

## Step 1 — Connect Claude to your WordPress site

The Unyson+ **AI Assistant** extension ships an **MCP server** — the standard way AI tools drive
other software. Activate it and connect your tool once:

- Full setup for **Claude Code, Claude Desktop, Cursor, VS Code, Windsurf, and the ChatGPT /
  claude.ai connectors** is in **[Connect an AI coding tool to your WordPress site](/guides/connect-ai-tools-to-wordpress)**.
- Just want to chat *inside* WordPress instead? See **[Set up AI for Unyson+](/guides/set-up-ai-for-unysonplus)**.

You also need the **Site Converter** extension active (the agent will offer to enable it) and, for a
URL conversion, the **[capture service](/extensions/site-converter/capture-service)** running — that's
what renders the source page in real Chrome.

## Step 2 — Ask it to convert your site

Point the agent at your source — your published site's URL (a Webflow, Wix, Squarespace, Framer or
any other live page) — and ask it to convert:

> "Convert `https://my-site.example` to WordPress — create a child theme and import the images."

It runs `convert_url` and builds the pages. (Conversion replaces the destination's pages and
activates a new child theme, so do it on a fresh or staging site; the agent confirms before it runs.)

## Step 3 — Ask it to match the original

Now the part that makes the difference:

> "Compare the converted home page with `https://my-site.example` and fix anything that doesn't match
> — spacing, colors, fonts, section order — then check it again."

The agent runs `visual_check`, works through the differences, and re-checks until the page lines up.
Do this page by page. You can also just say what *you* see: *"the hero is too tight and the button is
the wrong green — fix those."*

## Step 4 — Review and publish

Everything the agent builds is **editable** in the [page builder](/page-builder) and starts as a
**draft**, with every change saved as a revision (and undoable). Review the pages, make any final
tweaks yourself, then publish — and add the things only WordPress gives you: posts, forms,
WooCommerce, SEO.

## FAQ

**Is the result pixel-perfect?** It gets much closer than an automatic conversion alone, and you keep
refining until you're happy — but it's an iterative process, not a guaranteed pixel clone. The
advantage is the result is editable WordPress, so there's no ceiling on how far you polish it.

**Is it free?** Unyson+, the Site Converter and the AI Assistant MCP server are free. Your AI tool is
whatever you already use (for Claude, your own subscription or API key — see
[Set up AI for Unyson+](/guides/set-up-ai-for-unysonplus)).

**Do I have to use Claude?** No — any MCP-capable tool works (Cursor, VS Code, Windsurf, and others).
Claude is simply the one most of these guides show.

**Can I just run the converter myself?** Yes — every per-tool guide covers the manual
convert-from-URL flow, and you refine in the builder by hand. The AI agent just automates the
"make it match" part.

## See also

- Per-tool conversion guides: [Webflow](/guides/convert-webflow-to-wordpress) · [Wix](/guides/convert-wix-to-wordpress) · [Squarespace](/guides/convert-squarespace-to-wordpress) · [Framer](/guides/convert-framer-to-wordpress) · [Lovable](/guides/convert-lovable-to-wordpress) · [Wegic](/guides/convert-wegic-to-wordpress) · [Google Stitch](/guides/convert-google-stitch-to-wordpress)
- [Connect an AI coding tool to your WordPress site](/guides/connect-ai-tools-to-wordpress) · [Set up AI for Unyson+](/guides/set-up-ai-for-unysonplus)
- [Site Converter](/extensions/site-converter) · [Capture service](/extensions/site-converter/capture-service)
