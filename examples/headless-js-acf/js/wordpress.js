// Every request to WordPress goes through this file, so the pages never build a
// REST URL by hand.
import { WP_URL } from './config.js';

// Ask only for what the pages use: smaller responses, faster pages.
// acf_format=standard makes ACF return each field in its "Return Format": the
// cover image as an object with its URL, size and alt text instead of a bare ID.
const BOOK_QUERY = '_fields=id,slug,title,excerpt,content,genre,acf&acf_format=standard';

async function wp(path) {
  const res = await fetch(`${WP_URL}/wp-json${path}`);
  if (!res.ok) {
    throw new Error(`WordPress returned ${res.status} for ${path}`);
  }
  return res.json();
}

export function getBooks() {
  return wp(`/wp/v2/book?${BOOK_QUERY}&per_page=100`);
}

export async function getBook(slug) {
  const books = await wp(`/wp/v2/book?slug=${encodeURIComponent(slug)}&${BOOK_QUERY}`);
  return books[0] ?? null;
}

export function getGenres() {
  return wp('/wp/v2/genre?_fields=id,name,slug&per_page=100');
}

// WordPress returns titles as HTML ("Tom &amp; Jerry"); turn that into plain text.
export function plainText(html) {
  return new DOMParser().parseFromString(html, 'text/html').body.textContent;
}
