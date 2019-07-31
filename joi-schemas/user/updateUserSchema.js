const Joi = require('joi');


const updateUserSchema = Joi.object({
    username: Joi.string().alphanum().trim().min(3).max(30),
    firstName: Joi.string().trim().min(2).max(35),
    lastName: Joi.string().trim().min(2).max(35),
    email: Joi.string().trim().min(9).max(75).email({ minDomainAtoms: 2 }),
    profileImageUrl: Joi.string().trim().uri()
})

module.exports  = updateUserSchema;