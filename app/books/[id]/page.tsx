import { getBookById } from '@/lib/api';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ExternalLink, Star } from 'lucide-react';




export default async function BookPage({ params }: { params: { id: string } }) {
  try {
    const book = await getBookById(params.id);
        if (!book) {
            throw new Error('Book not found');
        }
        
        const { volumeInfo } = book;

        return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-[300px_1fr] gap-8">
        <div>
          <div className="aspect-[2/3] relative rounded-lg overflow-hidden shadow-lg">
            <Image
              src={volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/300x450?text=No+Cover'}
              alt={volumeInfo.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 300px"
            />
          </div>
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-4">{volumeInfo.title}</h1>
          {volumeInfo.authors && (
            <p className="text-xl text-muted-foreground mb-6">
              by {volumeInfo.authors.join(', ')}
            </p>
          )}

          {volumeInfo.averageRating && (
            <div className="flex items-center gap-2 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < volumeInfo.averageRating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          )}

          <div className="prose max-w-none mb-8">
            <p>{volumeInfo.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {volumeInfo.publisher && (
              <div>
                <h3 className="font-semibold">Publisher</h3>
                <p>{volumeInfo.publisher}</p>
              </div>
            )}
            {volumeInfo.publishedDate && (
              <div>
                <h3 className="font-semibold">Published Date</h3>
                <p>{volumeInfo.publishedDate}</p>
              </div>
            )}
            {volumeInfo.pageCount && (
              <div>
                <h3 className="font-semibold">Pages</h3>
                <p>{volumeInfo.pageCount}</p>
              </div>
            )}
            {volumeInfo.categories && (
              <div>
                <h3 className="font-semibold">Categories</h3>
                <p>{volumeInfo.categories.join(', ')}</p>
              </div>
            )}
          </div>

          {volumeInfo.previewLink && (
            <Button asChild>
              <a
                href={volumeInfo.previewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                Preview Book <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </main>
  );

} catch (error) {
  return (
      <main className="container mx-auto px-4 py-8">
          <div className="text-center">
              <h1 className="text-2xl font-bold">Error loading book</h1>
              <p>Sorry, we couldn't load this book's details.</p>
          </div>
      </main>
  );
}
}