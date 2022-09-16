const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReturnSchema = new Schema({
    userId: {
        type: Number,
        required: true,
        trim: true,
    },
    bookId: {
        type: Number,
        required: true,
        trim: true,
    },
    score: {
        type: Number,
        required: true,
        trim: true,
        min: 0,
        max: 10
    },
    returnDate: {
        type: Date,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('Return', ReturnSchema);