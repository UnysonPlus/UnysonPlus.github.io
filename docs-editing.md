# Editing the Unyson+ manual (no Markdown knowledge required)

The manual lives as Markdown files in [`docs/`](./docs). You never have to hand-write
Markdown — there are **three** visual ways to edit, and they all read/write the *same*
files, kept in sync through git.

| Way | Where | Internet? | Login? | Best for |
|---|---|---|---|---|
| **Decap CMS (online)** | `https://unysonplus.github.io/admin/` | yes | GitHub | Editing from anywhere; publishes itself |
| **Decap CMS (local)** | `http://localhost:3000/admin/` | no | none | Offline editing on this PC |
| **Obsidian (desktop)** | the `docs/` folder | no | none | Offline writing in a desktop app |

When you click **Publish** in Decap (online), it commits to the `main` branch and GitHub
Actions automatically rebuilds and deploys the live site — no manual deploy step.

---

## 1. Decap CMS — offline / local (works today, no setup)

1. Install dependencies once: `npm install`
2. In one terminal: `npm run cms`  (starts the local editor backend on port 8081)
3. In another terminal: `npm start`  (starts Docusaurus on port 3000)
4. Open **http://localhost:3000/admin/** — the `docs/` tree appears. Edit visually, click
   **Publish**. Your changes are written straight to the `.md` files on disk.
5. Commit and push when you're ready (`git add -A && git commit && git push`).

## 2. Decap CMS — online from anywhere (one-time OAuth setup)

GitHub Pages is static and can't keep a secret, so a tiny OAuth proxy is needed. Assets are
in [`oauth-worker/`](./oauth-worker).

1. **Create a GitHub OAuth App** — GitHub → *Settings → Developer settings → OAuth Apps →
   New OAuth App*:
   - **Homepage URL:** `https://unysonplus.github.io`
   - **Authorization callback URL:** `https://<your-worker>.workers.dev/callback`
   - Save, then copy the **Client ID** and generate a **Client Secret**.
2. **Deploy the proxy** (free Cloudflare account):
   ```bash
   cd oauth-worker
   npx wrangler deploy
   npx wrangler secret put OAUTH_CLIENT_ID       # paste the client id
   npx wrangler secret put OAUTH_CLIENT_SECRET   # paste the client secret
   ```
   Note the deployed URL, e.g. `https://unysonplus-cms-oauth.<you>.workers.dev`.
3. **Point Decap at it** — in [`static/admin/config.yml`](./static/admin/config.yml),
   uncomment and fill the two lines under `backend:`:
   ```yaml
   base_url: https://unysonplus-cms-oauth.<you>.workers.dev
   auth_endpoint: /auth
   ```
4. Commit + push. Visit **https://unysonplus.github.io/admin/**, click *Login with GitHub*,
   and edit online.

## 3. Obsidian — offline desktop app

1. Install [Obsidian](https://obsidian.md) (free).
2. *Open folder as vault* → select `…\unysonplus-site\docs`.
3. Edit in **Live Preview** mode (visual). Save, then commit/push via git as usual.
4. **Don't rename files** inside Obsidian — filenames are the page URLs (slugs).

---

## Good to know

- **Admonitions / raw HTML:** the colored note boxes use Docusaurus syntax
  (`:::note … :::`). Decap's rich-text editor can garble these — for a page that uses them,
  click the **Markdown** (raw) toggle on the *Body* field and edit the text directly. Plain
  prose, headings, tables, lists, links and code blocks are safe in rich-text mode.
- **Category labels/order** come from `_category_.json` files in each folder — those are not
  edited in the CMS (Docusaurus owns them).
- **Page order** within a category is the *Sidebar position* field.
