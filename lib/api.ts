const API_KEY = 'AIzaSyCSKMGWvnzW2Ib5a8OrXtKC02EVbjQeywE';
const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

export async function searchBooks(query: string, startIndex: number = 0) {
  const response = await fetch(
    `${BASE_URL}?q=${encodeURIComponent(query)}&startIndex=${startIndex}&maxResults=20&key=${API_KEY}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }
  
  return response.json();
}

export async function getBookById(id: string) {

  const response = await fetch(`${BASE_URL}/${id}`);
  console.log('response', response);
  
  if (!response.ok) {
    throw new Error('Failed to fetch book');
  }
  
  return response.json();
}

export async function getFeaturedBooks() {
  // Get a mix of popular books from different genres
  const response = await fetch(
    `${BASE_URL}?q=subject:fiction&orderBy=relevance&maxResults=6&key=${API_KEY}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch featured books');
  }
  
  return response.json();
}