const Book = require('../models/bookModel');

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({books});
    } catch (err) {
        res.status(500).json({err});
    }
}

const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        res.status(200).json({book});
    } catch (err) {
        res.status(500).json({err});
    }
}

const createBook = async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json({book});
    } catch (err) {
        res.status(500).json({err});
    }
}

module.exports = {
    getAllBooks,
    getBookById,
    createBook
}