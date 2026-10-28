import { absoluteUrl, getBooks, getGenres, plainText } from './wordpress.js';

const list = document.getElementById('books');
const status = document.getElementById('status');
const card = document.getElementById('book-card');

try {
  // Both requests run at the same time.
  const [books, genres] = await Promise.all([getBooks(), getGenres()]);
  const genreName = new Map(genres.map((g) => [g.id, g.name]));

  for (const book of books) {
    const f = book.unysonplus_fields;
    const item = card.content.cloneNode(true);

    item.querySelector('.book-link').href = `book.html?slug=${encodeURIComponent(book.slug)}`;
    item.querySelector('.book-title').textContent = plainText(book.title.rendered);
    item.querySelector('.book-subtitle').textContent = f.subtitle ?? '';
    item.querySelector('.book-meta').textContent = [
      f.book_author,
      f.pages ? `${f.pages} pages` : '',
      book.genre.map((id) => genreName.get(id)).join(', '),
    ].filter(Boolean).join(' · ');

    const cover = item.querySelector('.book-cover');
    if (f.cover_image?.url) cover.src = absoluteUrl(f.cover_image.url);
    else cover.remove();

    list.append(item);
  }
  status.remove();
} catch (error) {
  status.textContent = `Could not load the books: ${error.message}`;
}
