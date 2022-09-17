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
    try {
        const user = await User.findOne({userId: req.params.userId});
        const bookHistory = await BorrowHistory.find({user: user});
        const pastBorrows = bookHistory.filter(borrow => borrow.isReturned === true);
        const presentBorrows = bookHistory.filter(borrow => borrow.isReturned === false);

        const userResponse = {
            id: user.userId,
            name: user.name,
            books: {
                past:[...pastBorrows],
                present: [...presentBorrows]
            }
        }
        res.status(200).json(bookHistory);
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
    const getUser = await User.findOne({userId: req.params.userId});
    const getBook = await Book.findOne({bookId: req.params.bookId})
    try {
        if (getUser.hasBook === false) {
            if (getBook.isAvailable === true) {
                const borrowHistory = new BorrowHistory({
                    user: getUser,
                    book: getBook,
                });
                await borrowHistory.save().then(() => {
                        getBook.isAvailable = false;
                        getBook.save();
                        getUser.hasBook = true;
                        getUser.save();
                        res.status(201).json(getBook);
                    }
                );
            } else {
                res.status(400).json({message: 'Book is not available, please try another book'});
            }
        } else {
            res.status(400).json({message: 'User has a book, return it first'});
        }
    } catch (err) {
        res.status(400).json(err.message);
    }
}

const returnBook = async (req, res) => {
    const getUser = await User.findOne({userId: req.params.userId});
    const getBook = await Book.findOne({bookId: req.params.bookId});
    const userScore = req.body.userScore;
    try {
        if (getUser.hasBook === true) {
            const borrowHistory = await BorrowHistory.findOne({user: getUser, book: getBook});
            borrowHistory.isReturned = true;
            await borrowHistory.save().then(() => {
                    getBook.isAvailable = true;
                    getBook.userScore.push(userScore);
                    getBook.save();
                    getUser.hasBook = false;
                    getUser.save();
                    res.status(201).json(getBook);
                }
            );
        } else {
            res.status(400).json({message: 'User does not have a book, borrow a book first'});
        }
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