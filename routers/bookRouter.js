const express = require('express');
const router = express.Router();

const bookController = require('../controllers/bookController');

router.get('/', bookController.getAllBooks)

router.get('/:bookId', bookController.getBookById)

router.post('/', bookController.createBook)

module.exports = router;
