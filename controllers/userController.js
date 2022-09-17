const User = require('../models/userModel');
const Book = require('../models/bookModel');
const BorrowHistory = require('../models/borrowHistoryModel');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        const usersResponse = users.map(user => {
                return {
                    id: user.userId,
                    name: user.name,
                }
            }
        );
        res.status(200).json(usersResponse);
    } catch (err) {
        res.status(400).json({message: 'getAllUsers', err});
    }
}

const getUserById = async (req, res) => {
    const getUser = await User.findOne({userId: req.params.userId});

    try {
        const userResponse = {
            id: getUser.userId,
            name: getUser.name,
            presentBook: getUser.presentBook,
        }
        res.status(200).json(userResponse);
    } catch (err) {
        res.status(400).json(err.message);
    }

}

const createUser = async (req, res) => {
    try {
        const user = new User({
            userId: req.body.userId,
            name: req.body.name,
        });
        await user.save();
        res.status(201).json({message: 'createUser', user});
    } catch (err) {
        res.status(400).json({message: 'createUser', err});
    }

}

const borrowBook = async (req, res) => {
    try {
        const user = await User.findOne({userId: req.params.userId});
        const book = await Book.findOne({bookId: req.params.bookId});
        const borrowHistory = new BorrowHistory({
            user: user._id,
            book: book._id,
        });
        await borrowHistory.save();
        user.presentBook = book;
        await user.save();
        book.isAvailable = false;
        await book.save();
        res.status(201).json(borrowHistory);

    } catch (err) {
        res.status(400).json(err.message);
    }


}

const returnBook = async (req, res) => {

}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    borrowBook,
    returnBook
}