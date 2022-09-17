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
    const getBook = await Book.findOne({bookId: req.params.bookId});
    try {
        const bookResponse = {
            id: getBook.bookId,
            name: getBook.name,
            userScore: getBook.userScore.length>0 ? getBook.score : -1,
        }
        res.status(200).json(bookResponse);
    } catch (err) {
        res.status(400).json(err.message);
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