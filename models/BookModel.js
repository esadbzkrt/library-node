import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BookSchema = new Schema({
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
    score: {
        type: Number,
        required: true,
        trim: true,
        default: -1
    }
});

export default mongoose.model('Book', BookSchema);

