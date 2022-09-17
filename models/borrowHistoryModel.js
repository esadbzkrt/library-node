const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BorrowHistorySchema = new Schema({
    userId: {
        type: Number,
        required: true
    },
    bookId: {
        type: Number,
        required: true
    },
    borrowDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    returnDate: {
        type: Date,
        required: true,
        default: null
    },
    userScore: {
        type: Schema.Types.ObjectId, ref: 'Book.userScore',
        required: true,
        default: null
    }
});

module.exports = mongoose.model('BorrowHistory', BorrowHistorySchema);