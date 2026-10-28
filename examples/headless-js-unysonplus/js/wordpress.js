// Every request to WordPress goes through this file, so the pages never build a
// REST URL by hand.
import { WP_URL } from './config.js';

// Ask only for what the pages use: smaller responses, faster pages.
const BOOK_FIELDS = 'id,slug,title,excerpt,content,genre,unysonplus_fields';

async function wp(path) {
  const res = await fetch(`${WP_URL}/wp-json${path}`);
  if (!res.ok) {
    throw new Error(`WordPress returned ${res.status} for ${path}`);
  }
  return res.json();
}

export function getBooks() {
  return wp(`/wp/v2/book?_fields=${BOOK_FIELDS}&per_page=100`);
}

export async function getBook(slug) {
  const books = await wp(`/wp/v2/book?slug=${encodeURIComponent(slug)}&_fields=${BOOK_FIELDS}`);
  return books[0] ?? null;
}

export function getGenres() {
  return wp('/wp/v2/genre?_fields=id,name,slug&per_page=100');
}

// Image URLs come back as "//host/path"; give them the WordPress site's own scheme.
export function absoluteUrl(url) {
  if (!url) return '';
  return url.startsWith('//') ? `${new URL(WP_URL).protocol}${url}` : url;
}

// WordPress returns titles as HTML ("Tom &amp; Jerry"); turn that into plain text.
export function plainText(html) {
  return new DOMParser().parseFromString(html, 'text/html').body.textContent;
}
