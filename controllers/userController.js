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
        const userBooks = await BorrowHistory.find({userId: req.params.userId});
        const userResponse = {
            id: user.userId,
            name: user.name,
            books: {
                past: userBooks.filter(book => book.returnDate !== null).map(book => {
                    return {
                        name: book.name,
                        userScore: book.userScore
                    }
                }),
                present: userBooks.filter(book => book.returnDate === null).map(book => {
                        return {
                            name: book.name,
                        }
                    }
                )
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
    const user = await User.findOne({userId: req.params.userId});
    const book = await Book.findOne({bookId: req.params.bookId});
    if (user.hasBook === false) {
        if (book.isAvailable === true) {
            try {
                const borrowHistory = new BorrowHistory({
                    userId: user.userId,
                    bookId: book.bookId,
                });
                await borrowHistory.save();
                book.isAvailable = false;
                await book.save();
                user.hasBook = true;
                await user.save();
                res.status(201).json(borrowHistory);
            } catch (err) {
                res.status(400).json(err.message);
            }
        } else {
            res.status(400).json({message: 'Book has been borrowed, please try another book'});
        }

    } else {
        res.status(400).json({message: 'User has a book, return it first'});
    }


}

const returnBook = async (req, res) => {
    const user = await User.findOne({userId: req.params.userId});
    const book = await Book.findOne({bookId: req.params.bookId});
    const {userScore} = req.body;
    if (user.hasBook === true) {
        if (book.isAvailable === false) {
            try {
                const borrowHistory = new BorrowHistory({
                    userId: user.userId,
                    bookId: book.bookId,
                });
                await borrowHistory.save();
                book.userScore.push(userScore);
                book.isAvailable = true;
                await book.save();
                user.hasBook = false;
                await user.save();
                res.status(201).json(book);
            } catch (err) {
                res.status(400).json(err.message);
            }
        } else {
            res.status(400).json({message: 'Book has been returned, please try another book'});
        }

    } else {
        res.status(400).json({message: 'User has no book, borrow one first'});
    }

}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    borrowBook,
    returnBook
}