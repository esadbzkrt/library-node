const Book = require('../models/bookModel');
const validator = require('../validator');

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        const booksResponse = books.map(book => {
            return {
                id: book.bookId,
                name: book.name,
            }
        });
        res.status(200).json(booksResponse);
    } catch (err) {
        res.status(400).json({message: 'getAllBooks', err});
    }
}

const getBookById = async (req, res) => {
    try {
        const getBook = await Book.findOne({bookId: req.params.bookId});
        const averageScore = getBook.userScore.reduce((a, b) => a + b, 0) / getBook.userScore.length;
        const bookResponse = {
            id: getBook.bookId,
            name: getBook.name,
            userScore: getBook.userScore.length > 0 ? averageScore.toFixed(2) : -1,
        }
        res.status(200).json(bookResponse);
    } catch (err) {
        res.status(400).json('Book could not be found');
    }
}

const createBook = async (req, res) => {
    const {error, value} = validator.createBookSchema.validate(req.body);

    if (error) {
        res.status(400).json('Please enter a valid book name , name should be a string and should not be empty');
    } else {
        try {
            const book = await Book.create(req.body);
            res.status(201).json({message: 'Book created successfully', book});
        } catch (err) {
            res.status(400).json('User could not be created');
        }
    }
}


module.exports = {
    getAllBooks,
    getBookById,
    createBook
}