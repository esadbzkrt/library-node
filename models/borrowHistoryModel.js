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
    userScore: {
        type: Schema.Types.ObjectId, ref: 'Book.userScore',
        required: false,
        default: null
    }
});

module.exports = mongoose.model('BorrowHistory', BorrowHistorySchema);