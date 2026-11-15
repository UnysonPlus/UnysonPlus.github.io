---
title: "An AI chatbot for your WordPress site that answers from your own content"
sidebar_label: "AI assistant"
sidebar_position: 4.5
description: "The Unyson+ Chat AI channel answers visitors from your published pages, your own facts and Markdown knowledge files, and your business details. How to connect an AI, add knowledge, and test answers before visitors see them."
keywords: [wordpress ai chatbot, ai chatbot from website content, wordpress chatbot knowledge base, ai customer support wordpress, chatbot markdown knowledge, wordpress ai assistant visitors]
---

# AI assistant

With the [AI Assistant](../ai-assistant/index.md) extension active, the Chat button gains an **Ask our
assistant** channel: a small window where an AI answers visitors' questions about your business, day
and night, and hands them to a person when it can't help. Everything is set up in
**Chat → Settings → AI assistant**.

<img src="/img/extensions/chat/ai-try.png" alt="The Try it box: the question How much is the Sea View Suite, and is breakfast included? and the answer, with the list of pages, knowledge sections and business details the assistant was given" width="800" />

## What it needs: a connected AI

The assistant needs an AI model to write its answers. The box at the top of the tab says whether one is
connected:

<img src="/img/extensions/chat/ai-status-off.png" alt="Status: Not ready: no AI is connected, so the assistant cannot answer. Add an AI provider (for example an API key) in Settings → Connectors." width="830" />

| Status | Means |
| --- | --- |
| **Ready to answer visitors** (green) | An AI provider is set up in WordPress's **Settings → Connectors** (WordPress 7). This is what a live website needs. |
| **Ready on this computer only** (yellow) | The site runs on your own computer and uses the [AI Dev Kit](/ai-dev-kit) there, through your Claude subscription. Good for building and testing; see below. |
| **Not ready** (red) | No AI is connected. The **Ask our assistant** channel stays hidden from visitors even with its switch on, so they never see a channel that can't answer. |

The box also says whether visitors can see the channel now, how many answers were used today against
the daily limit, and what knowledge the assistant has.

<img src="/img/extensions/chat/ai-status-local.png" alt="Status: Ready on this computer only. Connected: Claude, your Claude subscription, through the AI Dev Kit on this computer. The channel is switched off below. Today: 0 of 100 answers used. Knowledge: your published pages, 6 sections of facts and files, and your business details." width="830" />

### On a live website: an AI provider in Settings → Connectors

A website on a web host needs an AI provider of its own: an API key from an AI company, added in
**Settings → Connectors**. Each visitor question is one request to that provider, paid per use. With a
small, fast model, an answer typically costs around a cent or less (it depends on the model and how
much of your content goes with each question; check your provider's current prices). The
**daily limit** (100 by default) caps the cost: past it, the window offers your other channels until
the next day. Fill in your provider's prices on the tab to see a monthly estimate.

### On your own computer: the AI Dev Kit

When the site runs on your computer (a local test site) and the AI Dev Kit is set up there, the
assistant can answer through your Claude subscription, at no extra cost. Use it to write your facts,
upload knowledge files and check answers with **Try it** before you go live.

It works **only while the site runs on that computer**: a website on a web host can't start a program
on your PC. Leaving your computer on doesn't change that, and using a personal subscription to answer
the public automatically is the kind of use AI companies' paid APIs are for. So for the live site, add
an AI provider in Settings → Connectors.

## Where the answers come from

For every question, the site itself picks what the assistant may use, and the assistant is told to
answer **only** from that:

1. **Your published pages.** The site searches your published pages, posts and other public content
   (products, for example) for the question's keywords and takes the best 4. Unpublished,
   password-protected and [left-out](#settings) pages are never read.
2. **Your facts and knowledge files** (below). The sections that best match the question go along; while
   all your knowledge is short (about 3,000 characters), all of it goes with every question.
3. **Your business details:** the site name and tagline, the address, opening hours and price range from
   **SEO → Structured data → Local business**, and the contact channels switched on in Chat (WhatsApp,
   phone, email, Messenger, Telegram). So "where are you?" and "when are you open?" get answered even
   though those details usually sit in the footer, which the page search doesn't read.

When the answer isn't there, the assistant says it isn't sure and offers your other channels; it's told
never to invent prices, dates, policies, availability or contact details. It answers in a few sentences
and links the pages it used.

The visitor's assistant can't do anything except answer: it has no tools, can't search the web, and
can't change anything on your site.

## Adding knowledge

Pages aren't always enough: refund rules, delivery areas, what's included, answers to frequent
questions often aren't written anywhere a visitor would look. Add them on the AI assistant tab.

<img src="/img/extensions/chat/ai-knowledge.png" alt="Facts for the assistant: a box with Breakfast, Parking and Pets sections in Markdown; Knowledge files: rooms-and-prices.md with its size, date and a Remove box, and a Choose Files button" width="1658" />

### Facts for the assistant

A text box for short facts. Write it in **Markdown**, and start each topic with a heading line, so the
assistant can find the right one:

```markdown
## Delivery
We deliver within 20 km of the shop. Delivery is free on orders over $50, otherwise $5.

## Returns
Unused items can be returned within 30 days with the receipt. Sale items can't be returned.

## Gift cards
Gift cards are sold in the shop only, from $20, and are valid for a year.
```

### Knowledge files

For longer material (a price list, an FAQ, a menu, your policies), upload **Markdown (`.md`,
`.markdown`) or text (`.txt`) files**: **Choose Files**, then **Save Changes**.

- Up to **20 files**, **200 KB each**, **1 MB** in all.
- They're stored **as text in your database**, not as files on the server, so nobody can open them by
  address. Plain text only: formatting other than headings is ignored, and HTML is removed.
- A file with the **same name replaces** the old one, so to update your price list, upload the new
  `prices.md`.
- To remove a file, tick its **Remove** box and **Save Changes**.

Headings work the same as in the facts box: each `##` section is something the assistant can look up
on its own. A long section is read in pieces of about 1,500 characters.

:::caution[Everything you add may be told to any visitor]
The assistant can repeat anything in your facts, files and pages to whoever asks. Don't add private
information: staff phone numbers, supplier prices, internal notes.
:::

### Use your business details

On by default. Turn it off if the site's address or contact details shouldn't be given out by the
assistant. The details themselves are edited where they live: the address and opening hours in
**SEO → Structured data**, the contact channels in **Chat → Settings → Channels**.

### Writing knowledge that works

- **One topic per heading, named the way visitors ask.** "## Parking" is found for "Can I park
  there?"; "## Arrival logistics" isn't.
- **Use the words visitors use.** The lookup matches words, not meaning: if people ask about "price",
  "cost" and "how much", mention them, e.g. "## Prices (how much it costs)".
- **Give the facts, not marketing.** "Open Monday to Friday 9:00-17:00, Saturday 10:00-14:00" answers
  better than "We're always here for you".
- **Test with Try it**, and add whatever the assistant couldn't answer.

## Try it

At the bottom of the tab, **Try it** asks the assistant a question the way a visitor would, and shows:

- **the answer** it would give;
- **what the assistant was given**: the pages (with links), the knowledge sections and whether the
  business details went along;
- a note when it would **hand the visitor over** to your other channels.

Try it uses your **saved** settings (save first after changing facts or files), works while the
channel is still switched off, and doesn't count toward the daily limit. With the AI Dev Kit on a local
site, an answer takes 10 to 30 seconds; through an AI provider, a few seconds.

If an answer is wrong or missing, look at the list: if the right page or section isn't there, add or
reword a fact (see the tips above); if it is there but the answer is still off, use **AI assistant notes**
to steer it.

## Settings

| Setting | What it does | Default |
| --- | --- | --- |
| **Status** | Whether the assistant can answer, through what, and today's use. | |
| **AI assistant (Beta)** | Shows the **Ask our assistant** channel (first in the list). | Off |
| **AI assistant label** | The channel name and the window title. | Ask our assistant |
| **AI assistant greeting** | The first message in the window. | A short hello |
| **AI assistant notes** | Tone and emphasis ("friendly and brief; mention free delivery over $50"). It still answers only from your content. | Empty |
| **Facts for the assistant** | Your own facts, in Markdown. | Empty |
| **Knowledge files** | Uploaded `.md` / `.txt` files. | None |
| **Use your business details** | Name, address, hours, price range and contact channels. | On |
| **Try it** | A test question. | |
| **AI assistant: pages to leave out** | Page IDs or slugs, comma-separated, the assistant must never read. | Empty |
| **AI assistant daily limit** | Most visitor questions answered per day, site-wide. 0 = no limit. | 100 |
| **AI assistant: team hours** | When a person can take over (`Mon-Fri 09:00-17:00`, one range per line). Outside them the assistant says when you're back. | Empty |
| **AI assistant: keep a conversation log** | Questions and answers kept for 30 days, on **Unyson+ → AI Assistant → Usage**. | Off |
| **Price per million input / output tokens** | Your provider's prices, for the monthly cost estimate. | Empty |

## Limits

- A visitor's question can be up to **500 characters**; each visitor can ask **10 questions in 5 minutes**.
- With each question the assistant gets up to 4 pages (about 5,000 characters each) and up to 5
  knowledge sections (about 6,000 characters in all).
- The lookup matches **words**, not meaning. Good headings and the words visitors use make up most of
  the difference (see [Writing knowledge that works](#writing-knowledge-that-works)).
- Answers are short and plain: no tables or headings, and they can be wrong. The window says so.

## Import / Export

Your facts are a setting and your knowledge files go along in the Chat **Download everything (JSON)**
file. Importing it with **Also replace the settings** brings both back, replacing the knowledge files on
the receiving site. See [Import / Export](./import-export.md).
