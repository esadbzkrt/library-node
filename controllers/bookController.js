const Book = require('../models/bookModel');

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
        const book = await Book.findOne({bookId: req.params.bookId});
        const bookResponse = {
            id: book.bookId,
            name: book.name,
            score: book.score,
        }

        res.status(200).json(bookResponse);
    } catch (err) {
        res.status(400).json({message: 'getBookById', err});
    }
}

const createBook = async (req, res) => {
    try {
        const newBook = await Book.create(req.body);
        res.status(201).json({message: 'createBook', newBook});
    } catch (err) {
        res.status(400).json({message: 'createBook', err});
    }
}


module.exports = {
    getAllBooks,
    getBookById,
    createBook
}