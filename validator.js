const Joi = require('joi');

const createUserSchema = Joi.object({
    userId: Joi.string().required(),
    name: Joi.string().required(),
});

const returnBookSchema = Joi.object({
    userScore: Joi.number().min(0).max(10).required(),
});




module.exports = {createUserSchema,returnBookSchema};