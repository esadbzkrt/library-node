const BorrowHistory = require('../models/borrowHistoryModel');
const User = require('../models/userModel');

const getAllBorrowsHistory = async (req, res) => {
    try {
        const allBorrowsHistory = await BorrowHistory.find();
        res.status(200).json(allBorrowsHistory);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

const getBorrowHistoryByUserId = async (req, res) => {
    const getUser = await User.findOne({userId: req.params.userId});
    try {
        const borrowHistoryByUserId = await BorrowHistory.find({user: getUser});
        res.status(200).json(borrowHistoryByUserId);
    } catch (err) {
        res.status(404).json(err.message);
    }
}

const getAllPresentBorrows = async (req, res) => {
    try {
        const allPresentBorrows = await BorrowHistory.find({isReturned: false});
        res.status(200).json(allPresentBorrows);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

const getPresentBorrowByUserId = async (req, res) => {
    const getUser = await User.findOne({userId: req.params.userId});
    try {
        const presentBorrowByUserId = await BorrowHistory.find({user: getUser, isReturned: false});
        res.status(200).json(presentBorrowByUserId);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

module.exports = {
    getAllBorrowsHistory,
    getBorrowHistoryByUserId,
    getAllPresentBorrows,
    getPresentBorrowByUserId
}