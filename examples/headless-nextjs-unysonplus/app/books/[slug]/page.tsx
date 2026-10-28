import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { absoluteUrl, getBook, getBooks } from '@/lib/wordpress';

type Props = { params: Promise<{ slug: string }> };

// Build every book page ahead of time; new books are built on first visit.
export async function generateStaticParams() {
  const books = await getBooks();
  return books.map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const book = await getBook((await params).slug);
  if (!book) return {};
  const cover = absoluteUrl(book.unysonplus_fields.cover_image?.url);
  return {
    title: book.title.rendered,
    description: book.unysonplus_fields.subtitle,
    openGraph: cover ? { images: [cover] } : undefined,
  };
}

export default async function BookPage({ params }: Props) {
  const book = await getBook((await params).slug);
  if (!book) notFound();

  const f = book.unysonplus_fields;
  const cover = absoluteUrl(f.cover_image?.url);

  return (
    <article>
      {cover && <img src={cover} alt="" width={240} style={{ height: 'auto' }} />}
      <h1 dangerouslySetInnerHTML={{ __html: book.title.rendered }} />
      {f.subtitle && <p><em>{f.subtitle}</em></p>}
      <p>
        {f.book_author}
        {f.pages ? ` · ${f.pages} pages` : ''}
      </p>
      {/* The post body, written in the WordPress editor. */}
      <div dangerouslySetInnerHTML={{ __html: book.content.rendered }} />
      {f.buy_url && <p><a href={f.buy_url}>Buy this book</a></p>}
    </article>
  );
}
