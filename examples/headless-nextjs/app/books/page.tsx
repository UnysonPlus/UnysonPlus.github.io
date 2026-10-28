import Link from 'next/link';
import { absoluteUrl, getBooks, getGenres } from '@/lib/wordpress';

export const metadata = { title: 'All books' };

export default async function BooksPage() {
  // Both requests run at the same time.
  const [books, genres] = await Promise.all([getBooks(), getGenres()]);
  const genreName = new Map(genres.map((g) => [g.id, g.name]));

  return (
    <main>
      <h1>Books</h1>
      <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 24 }}>
        {books.map((book) => {
          const f = book.unysonplus_fields;
          const cover = absoluteUrl(f.cover_image?.url);
          return (
            <li key={book.id} style={{ display: 'flex', gap: 16 }}>
              {cover && <img src={cover} alt="" width={120} style={{ height: 'auto' }} />}
              <div>
                <h2 style={{ margin: 0 }}>
                  <Link href={`/books/${book.slug}`}
                    dangerouslySetInnerHTML={{ __html: book.title.rendered }} />
                </h2>
                {f.subtitle && <p style={{ margin: '4px 0' }}>{f.subtitle}</p>}
                <p style={{ margin: 0, color: '#555' }}>
                  {f.book_author}
                  {f.pages ? ` · ${f.pages} pages` : ''}
                  {book.genre.length > 0 && ` · ${book.genre.map((id) => genreName.get(id)).join(', ')}`}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
