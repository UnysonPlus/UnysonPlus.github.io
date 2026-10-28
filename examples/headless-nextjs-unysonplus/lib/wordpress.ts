// Every request to WordPress goes through this file, so the rest of the app never
// builds a REST URL by hand.

const WP_URL = process.env.WP_URL;

if (!WP_URL) {
  throw new Error('Set WP_URL in .env.local, e.g. WP_URL=https://your-site.com');
}

// An Unyson+ Image field: the attachment ID and a protocol-relative URL.
export type WpImage = { attachment_id: number | ''; url: string };

export type Book = {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  genre: number[];
  // Filled by the "Book Details" field group (Custom Fields → Show in REST API).
  unysonplus_fields: {
    subtitle?: string;
    book_author?: string;
    pages?: number;
    cover_image?: WpImage;
    buy_url?: string;
  };
};

export type Genre = { id: number; name: string; slug: string };

// Ask only for what the pages use: smaller responses, faster builds.
// "type" is included because older Custom Fields versions need it to fill unysonplus_fields.
const BOOK_FIELDS = 'id,slug,type,title,excerpt,content,genre,unysonplus_fields';

async function wp<T>(path: string): Promise<T> {
  const res = await fetch(`${WP_URL}/wp-json${path}`, {
    // Re-fetch at most every 5 minutes (incremental static regeneration).
    next: { revalidate: 300 },
  });
  if (!res.ok) {
    throw new Error(`WordPress returned ${res.status} for ${path}`);
  }
  return res.json() as Promise<T>;
}

export function getBooks() {
  return wp<Book[]>(`/wp/v2/book?_fields=${BOOK_FIELDS}&per_page=100`);
}

export async function getBook(slug: string) {
  const books = await wp<Book[]>(
    `/wp/v2/book?slug=${encodeURIComponent(slug)}&_fields=${BOOK_FIELDS}`
  );
  return books[0] ?? null;
}

export function getGenres() {
  return wp<Genre[]>('/wp/v2/genre?_fields=id,name,slug&per_page=100');
}

// Image URLs come back as "//host/path"; give them the WordPress site's own scheme.
export function absoluteUrl(url?: string) {
  if (!url) return undefined;
  return url.startsWith('//') ? `${new URL(WP_URL!).protocol}${url}` : url;
}
