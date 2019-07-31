const Joi = require('joi')

const updateTopicSchema = Joi.object({
    name: Joi.string().required()
})

module.exports = updateTopicSchema