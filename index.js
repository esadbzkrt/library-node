const express = require('express');
const app = express();
const mongoose = require('mongoose');
const api = require('./routers/router');
require('dotenv').config()

const PORT = process.env.PORT;
const MONGO= process.env.MONGO;

//middleware

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/', api);

app.listen(PORT, async () => {
    try {
        await mongoose.connect(MONGO, { useNewUrlParser: true });
        console.log(`Connected to MongoDB `);
    }catch (e) {
        console.log(e);
    }

    console.log(`Listening Port: ${PORT}`)
});


