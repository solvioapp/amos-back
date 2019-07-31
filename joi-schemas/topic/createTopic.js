const Joi = require('joi')

const createTopicSchema = Joi.object({
    name: Joi.string().required()
})

module.exports = createTopicSchema