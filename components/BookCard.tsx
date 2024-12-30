import Image from 'next/image';
import Link from 'next/link';
import { Book } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const { volumeInfo } = book;
  const coverUrl = volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x196?text=No+Cover';
  console.log("this is book", book)

  return (
    <Link href={`/books/${book.id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow">
        <CardContent className="p-4">
          <div className="aspect-[2/3] relative mb-4">
            <Image
              src={coverUrl}
              alt={volumeInfo.title}
              fill
              className="object-cover rounded-md"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <h3 className="font-semibold line-clamp-2">{volumeInfo.title}</h3>
          {volumeInfo.authors && (
            <p className="text-sm text-gray-600 mt-1">
              {volumeInfo.authors.join(', ')}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}