const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BorrowHistorySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, ref: 'User',
    },
    book: {
        type: Schema.Types.ObjectId, ref: 'Book',
    },
    isReturned: {
        type: Boolean,
        required: true,
        default: false
    },
    userScore: {
        type: Number,
        required: false,
        default: null
    }

});

module.exports = mongoose.model('BorrowHistory', BorrowHistorySchema);