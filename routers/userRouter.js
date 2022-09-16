const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers)

router.get('/:userId', userController.getUserById)

router.post('/', userController.createUser)

router.post('/:userId/borrow/:borrowId', userController.borrowBook)

router.post('/:userId/return/:returnId', userController.returnBook)


module.exports = router;