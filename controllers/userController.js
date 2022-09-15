const User = require('../models/userModel');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({users});
    } catch (err) {
        res.status(500).json({err});
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({user});
    } catch (err) {
        res.status(500).json({err});
    }
}

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({user});
    } catch (err) {
        res.status(500).json({err});
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser
}