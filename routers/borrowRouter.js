const express = require('express');
const router = express.Router();

const borrowController = require('../controllers/borrowController');

router.get('/borrows', borrowController.getAllBorrowsHistory)

router.get('/borrows/:userId', borrowController.getBorrowHistoryByUserId)

router.get('/present', borrowController.getAllPresentBorrows)

router.get('/present/:userId', borrowController.getPresentBorrowByUserId)


module.exports = router;