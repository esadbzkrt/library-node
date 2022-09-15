const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    score: {
        type: Number,
        required: true,
        trim: true,
        default: -1
    }
});

module.exports = mongoose.model('Book', BookSchema);

