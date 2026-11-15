---
title: "Export and import WordPress chat conversations (CSV and JSON)"
sidebar_label: "Import / Export"
sidebar_position: 6
description: "Download Unyson+ Chat conversations as a CSV for a spreadsheet, or everything (conversations and settings) as JSON to move the chat to another site, and import either back."
keywords: [export chat conversations wordpress, chat transcript csv, live chat backup wordpress, move chat to another site]
---

# Import / Export

**Chat → Import / Export** (administrators only) saves your conversations and settings to a file, and
reads them back.

<img src="/img/extensions/chat/import-export.png" alt="The Import / Export tab: download conversations as CSV or everything as JSON, and import a CSV or JSON file, optionally replacing the settings" width="800" />

## Export

Two buttons, two files. Both are downloaded straight away, named with today's date
(`chat-2026-11-15.csv`, `chat-2026-11-15.json`).

| File | Contains | Use it to… |
| --- | --- | --- |
| **Download conversations (CSV)** | Every message of every conversation, one per row. | Read or search the conversations in Excel, Google Sheets or Numbers; keep a record. |
| **Download everything (JSON)** | Every setting and every conversation with its messages. | Move the whole chat to another site, or keep a full backup. |

Times in both files are in **UTC** (not your site's time zone).

### The CSV columns

| Column | Contains |
| --- | --- |
| `conversation` | The conversation number ("12" for Visitor 12). Rows with the same number belong together. |
| `visitor` | "Visitor 12". |
| `name`, `email` | What the visitor left, if anything. |
| `ip` | The visitor's full IP address (empty if IP addresses are not kept). |
| `page_url`, `page_title` | The page they last wrote from. |
| `browser` | The browser's full identification string. |
| `status` | `open` or `closed`. |
| `started` | When the conversation began. |
| `sender` | `visitor`, `agent` (your team) or `system` (a team-only note). |
| `author` | For your team's messages, the username of who sent it. |
| `message` | The text. |
| `sent` | When it was sent. |

The file starts with a UTF-8 marker so spreadsheet apps show accented letters and emoji correctly. A
message that starts with `=`, `+`, `-` or `@` is saved with a leading `'`, so a spreadsheet doesn't run
it as a formula; importing the file removes the `'` again.

### The JSON file

```json
{
  "format": "unysonplus-chat",
  "version": 1,
  "exported": "2026-11-15T06:22:20+00:00",
  "times": "UTC",
  "settings": {
    "chat_enable": true,
    "chat_live_enable": true
  },
  "conversations": [
    {
      "conversation": 1,
      "name": "Jane",
      "email": "jane@example.com",
      "ip": "203.0.113.24",
      "page_url": "https://example.com/rooms/",
      "page_title": "Rooms and rates",
      "browser": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) …",
      "status": "open",
      "started": "2026-11-15 06:19:32",
      "messages": [
        { "sender": "visitor", "author": "", "body": "Is breakfast included?", "sent": "2026-11-15 06:19:32" },
        { "sender": "agent", "author": "sam", "body": "Yes, every morning from 7 to 10.", "sent": "2026-11-15 06:20:26" }
      ]
    }
  ]
}
```

`settings` holds every setting from the four Settings tabs (shortened here).

:::caution[Both files contain personal data]
Visitors' emails, names, IP addresses and messages are in both files. Store them where only the right
people can open them, and delete copies you no longer need.
:::

## Import

1. **Choose File:** a `.csv` or `.json` file exported from a Unyson+ Chat (from this site or another).
2. Tick **Also replace the settings with the ones in the file** if you want the settings too (JSON only).
3. **Import.** A message says how many conversations were added and how many were skipped.

What happens:

- **Each conversation is added with a new number** on this site (the numbers continue from your own
  conversations). Everything else is kept exactly: names, emails, IP addresses, pages, browser,
  status, the start time, and every message with its sender and time.
- **Conversations already here are skipped**: one with the same start time, IP address, email and first
  message. So importing the same file twice adds nothing.
- **Your team's messages are matched to users by username.** If the username exists on this site, the
  message is signed with that user's name; otherwise it is kept as a team message without a name.
- **Settings** (JSON only, when ticked) replace the matching settings on this site. Settings the file
  doesn't have are left alone, and unknown ones are ignored.
- Visitors from the other site can't continue an imported conversation from their browser (it belonged
  to the other site); if they write again, a new conversation starts.

## Move the chat to another site

1. On the old site: **Chat → Import / Export → Download everything (JSON)**.
2. On the new site: activate **Chat** in **Unyson+ → Extensions**.
3. **Chat → Import / Export**, choose the file, tick **Also replace the settings**, **Import**.
4. Check **Chat → Settings**: numbers, usernames and the email address under *Send them to* may need
   changing if the new site is for a different business.
