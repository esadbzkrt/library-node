const express = require('express');
const router = express.Router();

const bookRouter = require('./bookRouter');
const userRouter = require('./userRouter');

router.use('/books', bookRouter);
router.use('/users', userRouter);

module.exports = router;
