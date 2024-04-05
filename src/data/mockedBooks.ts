import bookDetail from '../types/bookDetail';

export const booksData: bookDetail[] = [
    {
        _id: '424asr',
        booksName: "1984",
        isbn: 9780451524935,
        author: "George Owell",
        genre: ['Science Fiction', 'action'],
        rating: 4.2,
        image: require('../../assets/books_logo.png'),
        description: "This is some random description",
    },
    {
        _id: '6543asr',
        booksName: "The lone survivor",
        isbn: 97804679324935,
        author: "Johnny Depp",
        genre: ['Science Fiction', 'action'],
        rating: 4.9,
        image: require('../../assets/books_logo.png'),
        description: "Captain jack sparrow will indeed survive this challenge",
    },
];
