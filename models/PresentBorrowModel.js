const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const PresentBorrowSchema= new Schema({
    userId: {
        type: Number,
        required: true,
    },
    bookId: {
        type: Number,
        required: true,
    }
});

PresentBorrowSchema.plugin(AutoIncrement, {inc_field: 'returnId'});
module.exports = mongoose.model('PresentBorrow', PresentBorrowSchema);

