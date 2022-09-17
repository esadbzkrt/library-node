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
        const pastBookHistory = await BorrowHistory.find({user: getUser, isReturned: true});
        const presentBookHistory = await BorrowHistory.find({user: getUser, isReturned: false});

        const userResponse = {
            id: getUser.userId,
            name: getUser.name,
            books: {
                past: [...pastBookHistory],
                present: [...presentBookHistory],
            }
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
        const user = await User.findOne({userId: req.body.userId});
        const book = await Book.findOne({bookId: req.body.bookId});
        const {userScore} = req.body;
        const borrowHistory = await BorrowHistory.create({
            user: user,
            book: book,
            bookName: book.name,
            userScore: book.userScore.push(userScore),
            isReturned: false,
        });
        await book.updateOne({$push: {userScore: userScore}});
        await book.updateOne({$set: {isAvailable: false}});
        res.status(201).json(borrowHistory);
    } catch (err) {
        res.status(400).json(err.message);
    }


}

const returnBook = async (req, res) => {
    try {
        const user = await User.findOne({userId: req.body.userId});
        const book = await Book.findOne({bookId: req.body.bookId});
        const borrowHistory = await BorrowHistory.findOne({user: user, book: book, isReturned: false});
        await borrowHistory.updateOne({$set: {isReturned: true}});
        await book.updateOne({$set: {isAvailable: true}});
        res.status(201).json(borrowHistory);
    } catch (err) {
        res.status(400).json(err.message);
    }

}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    borrowBook,
    returnBook
}