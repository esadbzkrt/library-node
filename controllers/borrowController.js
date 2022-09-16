const Borrow = require('../models/borrowHistoryModel');
const PresentBorrow = require('../models/PresentBorrowModel');

const getAllBorrowHistory = async (req, res) => {
    try {
        const borrowHistory = await Borrow.find();
        res.status(200).json(borrowHistory);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getBorrowHistoryByUserId = async (req, res) => {
    try {
        const borrowHistory = await Borrow.find({ userId: req.params.userId });
        res.status(200).json(borrowHistory);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getAllPresentBorrow = async (req, res) => {
    try {
        const presentBorrow = await Borrow.find();
        res.status(200).json(presentBorrow);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getPresentBorrowByUserId = async (req, res) => {
    try {
        const presentBorrow = await Borrow.find({ userId: req.params.userId });
        res.status(200).json(presentBorrow);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports = {
    getAllBorrowHistory,
    getBorrowHistoryByUserId,
    getAllPresentBorrow,
    getPresentBorrowByUserId
}