const BorrowHistory = require('../models/borrowHistoryModel');


const getAllBorrowHistory = async (req, res) => {
    try {
        const borrowHistory = await BorrowHistory.find();
        res.status(200).json(borrowHistory);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getBorrowHistoryByUserId = async (req, res) => {
    try {
        const borrowHistory = await BorrowHistory.find({ userId: req.params.userId });
        res.status(200).json(borrowHistory);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getAllPresentBorrow = async (req, res) => {
    try {
        const presentBorrow = await BorrowHistory.find();
        res.status(200).json(presentBorrow);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getPresentBorrowByUserId = async (req, res) => {
    try {
        const presentBorrow = await BorrowHistory.find({ userId: req.params.userId });
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