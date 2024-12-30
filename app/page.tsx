import { getFeaturedBooks } from '@/lib/api';
import SearchBar from '@/components/SearchBar';
import BookCard from '@/components/BookCard';
import { Book } from '@/lib/types';
import { BookOpen, History,  GraduationCap } from 'lucide-react';

const genres = [
  { name: 'Fiction', query: 'subject:fiction', icon: BookOpen },
  { name: 'History', query: 'subject:history', icon: History },
  { name: 'Science', query: 'subject:science', icon: History },
  { name: 'Education', query: 'subject:education', icon: GraduationCap },
];

export default async function Home() {
  const featuredBooks = await getFeaturedBooks();

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover Your Next Great Read
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Search millions of books to find your perfect match
          </p>
          <SearchBar />
        </div>
      </section>

      {/* Genres Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Browse by Genre</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {genres.map((genre) => {
            const Icon = genre.icon;
            return (
              <a
                key={genre.name}
                href={`/search?q=${encodeURIComponent(genre.query)}`}
                className="p-6 rounded-lg bg-card hover:bg-accent transition-colors text-center group"
              >
                <Icon className="w-8 h-8 mx-auto mb-3 group-hover:text-primary" />
                <h3 className="font-semibold">{genre.name}</h3>
              </a>
            );
          })}
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Featured Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {featuredBooks.items?.map((book: Book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
    </main>
  );
}