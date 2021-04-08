const Joi = require('@hapi/joi');
const validation = {};

validation.validateParameters = async (parameters) => {
    const schema = Joi.object().keys({
        id: Joi.number()
            .max(50)
            .required(),
        username: Joi.string()
            .trim()
            .min(3)
            .max(255),
        password: Joi.string()
            .trim()
            .max(255)
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        name: Joi.string()
            .max(255),
        active: Joi.number()
            .max(1),
    });
    return schema.validateAsync(parameters);
};

module.exports = validation;
