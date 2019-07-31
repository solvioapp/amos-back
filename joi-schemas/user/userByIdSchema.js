const Joi = require('joi');


const userByIdSchema = Joi.object({
    userId: Joi.string().required()
})

module.exports  = userByIdSchema;