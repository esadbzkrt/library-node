const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    presentBook: {
        type: Schema.Types.ObjectId, ref: 'Book',
    },
    borrowHistory: {
        type: Schema.Types.ObjectId, ref: 'BorrowHistory',
    }

});

UserSchema.plugin(AutoIncrement, {inc_field: 'userId'});
module.exports = mongoose.model('User', UserSchema);