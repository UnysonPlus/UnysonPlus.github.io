#!/usr/bin/env node
/**
 * indexnow.mjs — notify IndexNow-participating search engines (Bing, Yandex, Seznam,
 * Naver…) that pages changed. NOT Google — Google doesn't participate in IndexNow.
 *
 * Prerequisite: the key file must be live at KEY_LOCATION on the deployed site
 * (static/<key>.txt → published to the site root). Submissions before the key file
 * is live come back 403 (key not verified).
 *
 * Usage:
 *   node scripts/indexnow.mjs <url> [<url> ...]     # submit specific URLs (the new pages)
 *   node scripts/indexnow.mjs --all                 # submit every URL in build/sitemap.xml
 *   node scripts/indexnow.mjs --path /docs/foo …    # submit by path (host is prepended)
 *
 * Each URL must be an absolute https URL on HOST (or a /path with --path).
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HOST = 'unysonplus.github.io';
const ORIGIN = 'https://' + HOST;
const KEY = 'dd9dfa5bafd81d26d1d76b8951944b46';
const KEY_LOCATION = `${ORIGIN}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow'; // shared endpoint (fans out to participants)

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const args = process.argv.slice(2);

function fromSitemap() {
  const xml = readFileSync(join(ROOT, 'build', 'sitemap.xml'), 'utf8');
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

let urls = [];
if (args.includes('--all')) {
  urls = fromSitemap();
} else if (args.includes('--path')) {
  urls = args.filter((a) => a.startsWith('/')).map((p) => ORIGIN + p);
} else {
  urls = args.filter((a) => a.startsWith('http'));
}

// Only URLs on our host are accepted by IndexNow.
urls = [...new Set(urls)].filter((u) => {
  try { return new URL(u).host === HOST; } catch { return false; }
});

if (!urls.length) {
  console.error('No valid URLs. Pass full https URLs on ' + HOST + ', or --path /docs/… , or --all.');
  process.exit(1);
}
if (urls.length > 10000) urls = urls.slice(0, 10000); // IndexNow per-request cap

const body = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: urls };

console.log(`Submitting ${urls.length} URL(s) to IndexNow (${ENDPOINT})…`);
const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
});
const text = await res.text().catch(() => '');
console.log(`HTTP ${res.status} ${res.statusText}` + (text ? ` — ${text.slice(0, 200)}` : ''));

// 200 / 202 = accepted. 403 = key file not found/verified. 422 = URLs don't match host/key.
if (res.status === 200 || res.status === 202) {
  console.log('OK — accepted. (Bing/Yandex/etc. will crawl; Google is not part of IndexNow.)');
} else if (res.status === 403) {
  console.log('403 — the key file is not live yet at ' + KEY_LOCATION + ' (wait for the deploy).');
  process.exit(1);
} else {
  process.exit(1);
}
