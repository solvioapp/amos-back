const Joi = require('joi');


const createUserSchema = Joi.object({
    username: Joi.string().alphanum().trim().min(3).max(30).required(),
    firstName: Joi.string().trim().min(2).max(35).required(),
    lastName: Joi.string().trim().min(2).max(35).required(),
    email: Joi.string().trim().min(9).max(75).email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().trim().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/).required()
})

module.exports  = createUserSchema;