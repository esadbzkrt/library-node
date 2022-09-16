const User = require('../models/userModel');
const Book = require('../models/bookModel');

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
        const userResponse = {
            id: user.userId,
            name: user.name,
            books: {
                past: user.books.past.map(book => {
                        return {
                            name: book.name,
                            userScore: book.userScore,
                        }
                    }
                ),
                present: user.books.present.map(book => {
                        return {
                            name: book.name,
                        }
                    }
                )
            }
        }
        res.status(200).json(userResponse);
    } catch (err) {
        res.status(400).json({message: 'getUserById', err});
    }
}

const createUser = async (req, res) => {
    try {
        const user = new User({
            userId: req.body.userId,
            name: req.body.name,
            books: {
                present: [],
                past: []
            }
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
        user.books.present.push(book);
        await user.save();
        res.status(201).json({message: 'borrowBook', user});
    } catch (err) {
        res.status(400).json({message: 'borrowBook', err});
    }
}

const returnBook = async (req, res) => {
    try {
        const user = await User.findOne({userId: req.params.userId});
        const book = await Book.findOne({bookId: req.params.bookId});
        user.books.present.pull(book);
        user.books.past.push(book);
        await user.save();
        res.status(201).json({message: 'returnBook', user});
    } catch (err) {
        res.status(400).json({message: 'returnBook', err});
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    borrowBook,
    returnBook
}