export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail: string;
      smallThumbnail: string;
    };
    publishedDate?: string;
    publisher?: string;
    categories?: string[];
    pageCount?: number;
    previewLink?: string;
    averageRating?: number;
  };
}

export interface SearchResponse {
  items: Book[];
  totalItems: number;
}

export type Genre = {
  name: string;
  query: string;
  icon: string;
};