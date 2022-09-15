const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
require('dotenv').config()

const PORT = process.env.PORT;
const MONGO= process.env.MONGO;




app.get('/', (req, res) => res.send('Hello World!'));

app.listen(PORT, async () => {
    try {
        await mongoose.connect(MONGO, { useNewUrlParser: true });
        console.log(`Connected to MongoDB `);
    }catch (e) {
        console.log(e);
    }

    console.log(`Listening Port: ${PORT}`)
});


