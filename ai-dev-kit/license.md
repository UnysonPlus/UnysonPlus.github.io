---
title: License
sidebar_label: License
sidebar_position: 8
slug: /license
description: The AI Dev Kit and the Capture Service are free for non-commercial use and source-available (CC BY-NC-SA 4.0 for the docs, PolyForm Noncommercial 1.0.0 for the code). The UnysonPlus plugin and theme stay GPL. What you may and may not do, in plain words.
---

# License

**The kit is free for non-commercial use and source-available.** You can read every line, run it,
change it, and use it to build sites. What you cannot do is sell it, bundle it into a paid product, or
offer it as a service — for that you need a commercial license.

Two licenses cover the kit, one per kind of content:

| What | License | In short |
|---|---|---|
| The kit's **documentation, skills, playbooks** (`docs/`, `AGENTS.md`, `PLAYBOOK.md`, `README.md`) | [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) | Share and adapt with credit, non-commercially, under the same terms. |
| The kit's **code** (`tools/`, scripts) and the **Capture Service** | [PolyForm Noncommercial 1.0.0](https://polyformproject.org/licenses/noncommercial/1.0.0/) | Use, modify and share for any non-commercial purpose. |

The full texts ship in the repositories as `LICENSE`, `LICENSE-CC-BY-NC-SA-4.0.txt` and
`LICENSE-PolyForm-Noncommercial-1.0.0.txt`. Source files carry an `SPDX-License-Identifier` line.

## What you may do

- Clone the kit, run it, read and modify every file.
- Use it to build WordPress sites — for yourself, for your company, **or for clients**.
- **Use the sites you build with it commercially.** The license restricts the kit and the service
  themselves, not their output. A site converted or built with the kit is yours.
- Share your changes, under the same licenses, with the notices intact.
- Use it for learning, teaching, research, evaluation, and personal projects.

## What you may not do without a commercial license

- Sell the kit or the Capture Service, or charge for access to them.
- Bundle them (or a substantial part of them) into a paid product, theme, plugin, or SaaS.
- Offer the Capture Service or the kit's tooling as a hosted service to others.
- Remove or alter the license notices.

A commercial license is available for those cases — email **jonmlas@gmail.com**.

## What stays open source

The **UnysonPlus plugin**, its extensions (including the **Site Converter**), and the **UnysonPlus
theme** are **GPL-2.0-or-later**, in their own repositories. Nothing on this page changes that: the
WordPress side of the project is, and stays, free software.

## Why this split

The plugin and theme run inside WordPress, so they are GPL like WordPress itself. The kit and the
Capture Service are separate developer tooling that runs outside WordPress; they are the result of a
long series of real-site training sessions, and the non-commercial licenses keep that work readable
and usable by everyone while reserving resale to the author. The reasoning is recorded in the
[Design Decisions](/decisions/ai-dev-kit-licensing) log.

:::note Earlier versions
Versions of the kit published before this change were released under GPL-2.0-or-later, and those
already-released versions remain available under that license. The licenses above apply from the
first version that ships these `LICENSE` files.
:::
