const User = require('../models/userModel');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({message: 'getAllUsers', users});
    } catch (err) {
        res.status(400).json({message: 'getAllUsers', err});
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await User.findOne({userId: req.params.userId});
        res.status(200).json({message: 'getUserById', user});
    } catch (err) {
        res.status(400).json({message: 'getUserById', err});
    }
}

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({message: 'createUser', user});
    } catch (err) {
        res.status(400).json({message: 'createUser', err});
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser
}