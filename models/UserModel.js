const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    books: {
        past: [
            {
                type:mongoose.Schema.Types.ObjectId, ref:'Borrow'
            }
        ],
        present: [
            {
                type:mongoose.Schema.Types.ObjectId, ref:'Return'
            }
        ]
    }
});

UserSchema.plugin(AutoIncrement, {inc_field: 'userId'});
module.exports = mongoose.model('User', UserSchema);