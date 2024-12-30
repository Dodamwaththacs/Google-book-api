import { searchBooks } from '@/lib/api';
import BookCard from '@/components/BookCard';
import SearchBar from '@/components/SearchBar';
import { Book } from '@/lib/types';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string; page?: string };
}) {
  const query = searchParams.q;
  const page = parseInt(searchParams.page || '1');
  const startIndex = (page - 1) * 20;

  const results = query ? await searchBooks(query, startIndex) : null;

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <SearchBar />
      </div>

      {results?.items ? (
        <>
          <h1 className="text-2xl font-bold mb-6">
            Search Results for "{query}"
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.items.map((book: Book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-600">
            No results found
          </h2>
        </div>
      )}
    </main>
  );
}