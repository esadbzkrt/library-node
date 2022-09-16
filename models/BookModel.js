const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const BookSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    userScore: {
        type: Array,
        required: true,
        trim: true,
        default: -1
    }
});

BookSchema.plugin(AutoIncrement, {inc_field: 'bookId'});
module.exports = mongoose.model('Book', BookSchema);

