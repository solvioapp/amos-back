const Joi = require('joi');


const loginSchema = Joi.object({
    email: Joi.string().min(9).max(75).email({ minDomainAtoms: 2 }),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/).required()
})

module.exports  = loginSchema;