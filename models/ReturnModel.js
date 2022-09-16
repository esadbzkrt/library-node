const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
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
ReturnSchema.plugin(AutoIncrement, {inc_field: 'returnId'});
module.exports = mongoose.model('Return', ReturnSchema);