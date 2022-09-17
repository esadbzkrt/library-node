const express = require('express');
const router = express.Router();

const bookRouter = require('./bookRouter');
const userRouter = require('./userRouter');
const borrowRouter = require('./borrowRouter');

router.use('/books', bookRouter);
router.use('/users', userRouter);
router.use('/', borrowRouter);

module.exports = router;
