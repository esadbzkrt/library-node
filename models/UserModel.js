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
});

UserSchema.plugin(AutoIncrement, {inc_field: 'id'});
module.exports = mongoose.model('User', UserSchema);