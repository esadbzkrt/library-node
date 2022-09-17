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
    const user = await User.findOne({userId: req.params.userId}).populate('presentBook', '-_id, name');
    const borrowHistory = await BorrowHistory.find({user: user._id}).populate('book', '-_id, name');

    try {
        const userResponse = {
            id: user.userId,
            name: user.name,
            books: {
                past: borrowHistory.filter(borrowHistory => borrowHistory.isReturned === true).map(borrowHistory => {
                        return {
                            name: borrowHistory.book.name,
                            userScore: borrowHistory.userScore,
                        }
                    }
                ),
            },
            present: user.presentBook ? user.presentBook : [],
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
        if (!user.presentBook) {
            if (book.isAvailable === true) {
                const borrowHistory = new BorrowHistory({
                    user: user._id,
                    book: book._id,
                });
                await borrowHistory.save();
                user.presentBook = book;
                await user.save();
                book.isAvailable = false;
                await book.save();
                res.status(201).json({ message: 'Book borrowed successfully by user' , borrowHistory});
            } else {
                res.status(400).json('Book is not available, please try another book');
            }
        } else {
            res.status(400).json('User has a book, return it first');
        }
    } catch (err) {
        res.status(400).json(err.message);
    }
}

const returnBook = async (req, res) => {
    try {
        const user = await User.findOne({userId: req.params.userId});
        const book = await Book.findOne({bookId: req.params.bookId});

        if (user.presentBook) {
            if (book.isAvailable === false) {
                const {userScore} = req.body;
                const borrowHistory = await BorrowHistory.findOne({user: user._id, book: book._id});
                if(borrowHistory){
                    borrowHistory.isReturned = true;
                    borrowHistory.userScore = userScore;
                    await borrowHistory.save();
                    user.presentBook = null;
                    await user.save();
                    book.isAvailable = true;
                    book.userScore.push(userScore);
                    await book.save();
                    res.status(201).json('Book returned successfully');
                }else{
                    res.status(400).json('This book is not borrowed by this user');
                }
            } else {
                res.status(400).json('Book is not borrowed by this user');
            }
        } else {
            res.status(400).json('User does not have a book, borrow a book first');
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