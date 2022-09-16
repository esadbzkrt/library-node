const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BorrowSchema = new Schema({
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
    borrowDate: {
        type: Date,
        required: true,
        trim: true,
    }

});

module.exports = mongoose.model('Borrow', BorrowSchema);