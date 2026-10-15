---
slug: animation-studio-no-server
title: "Should the Animation Studio get accounts and cloud saving on the website's hosting?"
authors: [jon]
tags: [architecture, animation, storage-model]
date: 2026-10-15
description: No. The Animation Studio stays on GitHub Pages with no server of its own. Sharing works through links that carry the whole scene, cross-device saving (if wanted) goes to the person's own Google Drive, and real accounts, if ever needed, run on a free cloud tier, never on the website's cPanel hosting.
---

**The question:** The roadmap's last item was accounts and cloud saving, the one part of the Animation Studio that
needs a server. The only server available is a basic cPanel plan that also runs the website, with no budget to
upgrade. Should accounts go there, and what would happen if many people saved projects?

<!-- truncate -->

## Context

The Studio is static files on GitHub Pages. Scene files are small: the 38-second demo is 26 KB, 4 KB compressed. What
makes projects heavy is uploads: photos at 0.2 to 3 MB and 3D models up to 4 MB, today packed into the scene file.

The hosting was already half used: 135,000 of 250,000 files, 4.5 of 10 GB of disk. Hitting the file limit would break
the website itself (no new uploads, failed updates), and basic shared hosting also throttles CPU and simultaneous
requests, so a busy Studio could slow or suspend unysonplus.com.

## Options considered

- **Accounts on cPanel (PHP + MySQL).** Gives a project library, short links and embeds that update in place, but every
  saved project and upload lands in the site's file and disk budget, and the Studio's traffic shares the site's CPU.
  With uploads, about a thousand active users would need 10 to 30 GB.
- **Share links that carry the scene.** The compressed scene goes in the link after `#`, which never reaches a server.
  Costs nothing to run and needs no account; long when uploads are inside, and a new link is needed after edits.
- **Save to the person's own Google Drive.** Projects on any computer, stored in the user's quota, signed in with
  Google; no database or storage on our side.
- **A free cloud tier for real accounts** (for example Cloudflare's Workers, D1 and R2). Generous free limits and no
  bandwidth fees, and completely separate from the website hosting.

## Decision

- The Studio has **no server of its own**. It stays on GitHub Pages; embeds and exports are unchanged.
- **Share links** (scene inside the link) ship now. Custom code clips are removed from shared scenes when opened.
- **Save to Google Drive** is the next step if people ask for projects on any computer.
- **Accounts** happen only if there is real demand, on a free cloud tier, with uploads on object storage and embeds
  still served from GitHub Pages. **Never on the website's cPanel hosting.**

## Why

The benefits of accounts arrive once people use the Studio regularly; the costs (a server to run, security, privacy
duties, storage) arrive on day one. While the Studio is in alpha, links that carry the scene cover sharing at no cost,
and keeping the Studio off the cPanel plan protects the website, which matters more than the Studio, from storage and
traffic it was never sized for.
