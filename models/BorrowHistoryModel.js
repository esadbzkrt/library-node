const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const BorrowHistorySchema = new Schema({
    userId: {
        type: Number,
        required: true,
    },
    bookId: {
        type: Number,
        required: true,
    }
});

BorrowHistorySchema.plugin(AutoIncrement, {inc_field: 'borrowId'});
module.exports = mongoose.model('BorrowHistory', BorrowHistorySchema);
