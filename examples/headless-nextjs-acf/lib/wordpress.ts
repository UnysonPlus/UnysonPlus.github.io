// Every request to WordPress goes through this file, so the rest of the app never
// builds a REST URL by hand.

const WP_URL = process.env.WP_URL;

if (!WP_URL) {
  throw new Error('Set WP_URL in .env.local, e.g. WP_URL=https://your-site.com');
}

// An ACF Image field with Return Format "Image Array", as sent with acf_format=standard.
export type AcfImage = {
  id: number;
  url: string;
  alt: string;
  width: number;
  height: number;
  sizes: Record<string, string | number>;
};

export type Book = {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  genre: number[];
  // Filled by the "Book Details" ACF field group (Show in REST API on).
  acf: {
    subtitle?: string;
    book_author?: string;
    // ACF sends numbers as strings when acf_format=standard: convert with Number().
    pages?: string | number;
    cover_image?: AcfImage | false;
    buy_url?: string;
  };
};

export type Genre = { id: number; name: string; slug: string };

// Ask only for what the pages use. acf_format=standard makes ACF return each field
// in its Return Format: the cover as an object with its URL, size and alt text.
const BOOK_QUERY = '_fields=id,slug,title,excerpt,content,genre,acf&acf_format=standard';

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
  return wp<Book[]>(`/wp/v2/book?${BOOK_QUERY}&per_page=100`);
}

export async function getBook(slug: string) {
  const books = await wp<Book[]>(`/wp/v2/book?slug=${encodeURIComponent(slug)}&${BOOK_QUERY}`);
  return books[0] ?? null;
}

export function getGenres() {
  return wp<Genre[]>('/wp/v2/genre?_fields=id,name,slug&per_page=100');
}
