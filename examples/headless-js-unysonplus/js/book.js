import { absoluteUrl, getBook, plainText } from './wordpress.js';

const status = document.getElementById('status');
const slug = new URLSearchParams(location.search).get('slug');

try {
  const book = slug ? await getBook(slug) : null;
  if (!book) throw new Error('No book with that address.');

  const f = book.unysonplus_fields;
  const title = plainText(book.title.rendered);

  document.title = title;
  document.getElementById('title').textContent = title;
  document.getElementById('subtitle').textContent = f.subtitle ?? '';
  document.getElementById('meta').textContent = [f.book_author, f.pages ? `${f.pages} pages` : '']
    .filter(Boolean).join(' · ');

  // The post body, written in the WordPress editor. It is HTML from your own site.
  document.getElementById('content').innerHTML = book.content.rendered;

  const cover = document.getElementById('cover');
  if (f.cover_image?.url) cover.src = absoluteUrl(f.cover_image.url);
  else cover.remove();

  if (f.buy_url) {
    const buy = document.getElementById('buy');
    buy.href = f.buy_url;
    buy.hidden = false;
  }

  document.getElementById('book').hidden = false;
  status.remove();
} catch (error) {
  status.textContent = error.message;
}
