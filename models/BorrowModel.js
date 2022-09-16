const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

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
BorrowSchema.plugin(AutoIncrement, {inc_field: 'borrowId'});
module.exports = mongoose.model('Borrow', BorrowSchema);