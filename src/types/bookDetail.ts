export default interface BookDetail {
  _id: string;
  booksName: string;
  isbn: number;
  author: string;
  genre: string[];
  rating: number;
  image?: any;
  description: string;
}
