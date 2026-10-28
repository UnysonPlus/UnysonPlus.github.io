import Link from 'next/link';
import { getBooks, getGenres } from '@/lib/wordpress';

export const metadata = { title: 'All books' };

export default async function BooksPage() {
  // Both requests run at the same time.
  const [books, genres] = await Promise.all([getBooks(), getGenres()]);
  const genreName = new Map(genres.map((g) => [g.id, g.name]));

  return (
    <main>
      <h1>Books</h1>
      <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 32, gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
        {books.map((book) => {
          const f = book.acf;
          const cover = f.cover_image || null;
          return (
            <li key={book.id}>
              <Link href={`/books/${book.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                {cover && <img src={cover.url} alt="" width={cover.width} height={cover.height} style={{ width: '100%', height: 'auto', borderRadius: 6 }} />}
                <h2 style={{ margin: '12px 0 4px', fontSize: 20 }} dangerouslySetInnerHTML={{ __html: book.title.rendered }} />
              </Link>
              {f.subtitle && <p style={{ margin: 0 }}>{f.subtitle}</p>}
              <p style={{ margin: '4px 0 0', color: '#666', fontSize: 14 }}>
                {f.book_author}
                {f.pages ? ` · ${Number(f.pages)} pages` : ''}
                {book.genre.length > 0 && ` · ${book.genre.map((id) => genreName.get(id)).join(', ')}`}
              </p>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
