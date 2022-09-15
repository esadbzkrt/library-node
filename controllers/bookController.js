const Book = require('../models/bookModel');

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({message: 'getAllBooks', books});
    }
    catch (err) {
        res.status(400).json({message: 'getAllBooks', err});
    }
}

const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        res.status(200).json({message: 'getBookById', book});
    }
    catch (err) {
        res.status(400).json({message: 'getBookById', err});
    }
}

const createBook = async (req, res) => {
    try {
        const newBook = await Book.create(req.body);
        res.status(201).json({message: 'createBook', newBook});
    }
    catch (err) {
        res.status(400).json({message: 'createBook', err});
    }
}


module.exports = {
    getAllBooks,
    getBookById,
    createBook
}