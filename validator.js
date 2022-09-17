const Joi = require('joi');

const createUserSchema = Joi.object({
    userId: Joi.string().required(),
    name: Joi.string().required(),
});



module.exports = {createUserSchema};