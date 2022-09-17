const BorrowHistory = require('../models/borrowHistoryModel');

const getAllBorrowsHistory = async (req, res) => {
    try {
        const borrowHistory = await BorrowHistory.find();
        res.status(200).json(borrowHistory);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getBorrowHistoryByUserId = async (req, res) => {
    try {
        const borrowHistoryByUserId = await BorrowHistory.find({ userId: req.params.userId });
        res.status(200).json(borrowHistoryByUserId);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getAllPresentBorrows = async (req, res) => {
    try {
        const presentBorrows = await BorrowHistory.find();
        res.status(200).json(presentBorrows);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getPresentBorrowByUserId = async (req, res) => {
    try {
        const presentBorrowByUserId = await BorrowHistory.find({ userId: req.params.userId });
        res.status(200).json(presentBorrowByUserId);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports = {
    getAllBorrowsHistory,
    getBorrowHistoryByUserId,
    getAllPresentBorrows,
    getPresentBorrowByUserId
}