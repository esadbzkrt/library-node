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
    score: {
        type: Number,
        required: true,
        trim: true,
        default: -1
    }
});
BookSchema.plugin(AutoIncrement, {inc_field: 'id'});

module.exports = mongoose.model('Book', BookSchema);

