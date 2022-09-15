import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: {
        type: Number,
        required: true,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
});


export default mongoose.model('User', UserSchema);