import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBook, getBooks } from '@/lib/wordpress';

type Props = { params: Promise<{ slug: string }> };

// Build every book page ahead of time; new books are built on first visit.
export async function generateStaticParams() {
  const books = await getBooks();
  return books.map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const book = await getBook((await params).slug);
  if (!book) return {};
  const cover = book.acf.cover_image || null;
  return {
    title: book.title.rendered,
    description: book.acf.subtitle,
    openGraph: cover ? { images: [{ url: cover.url, width: cover.width, height: cover.height, alt: cover.alt }] } : undefined,
  };
}

export default async function BookPage({ params }: Props) {
  const book = await getBook((await params).slug);
  if (!book) notFound();

  const f = book.acf;
  const cover = f.cover_image || null;

  return (
    <article>
      {cover && <img src={cover.url} alt={cover.alt} width={240} style={{ height: 'auto' }} />}
      <h1 dangerouslySetInnerHTML={{ __html: book.title.rendered }} />
      {f.subtitle && <p><em>{f.subtitle}</em></p>}
      <p>
        {f.book_author}
        {f.pages ? ` · ${Number(f.pages)} pages` : ''}
      </p>
      {/* The post body, written in the WordPress editor. */}
      <div dangerouslySetInnerHTML={{ __html: book.content.rendered }} />
      {f.buy_url && <p><a href={f.buy_url}>Buy this book</a></p>}
    </article>
  );
}
