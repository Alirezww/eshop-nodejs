const Joi = require("@hapi/joi");

const authSchema = Joi.object({
    email : Joi.string().required().trim().lowercase().email(),
    password : Joi.string().min(6).max(16).trim().required()
});

module.exports = {
    authSchema
}