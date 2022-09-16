const express = require('express');
const router = express.Router();

const borrowController = require('../controllers/borrowController');

router.get('/', borrowController.getAllBorrowHistory)

router.get('/:userId', borrowController.getBorrowHistoryByUserId)

router.get('/present', borrowController.getAllPresentBorrow)

router.get('/present/:userId', borrowController.getPresentBorrowByUserId)

