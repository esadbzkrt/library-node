const Joi = require('joi');

const createUserSchema = Joi.object({
    name: Joi.string().required(),
});

const returnBookSchema = Joi.object({
    userScore: Joi.number().min(0).max(10).required(),
});

const createBookSchema = Joi.object({
    name: Joi.string().required(),
});




module.exports = {createUserSchema,returnBookSchema,createBookSchema};