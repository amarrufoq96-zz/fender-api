const Joi = require('@hapi/joi');
const validation = {};

validation.validateParameters = async (parameters) => {
    const schema = Joi.object().keys({
        username: Joi.string()
            .trim()
            .min(3)
            .max(255)
            .required(),
        password: Joi.string()
            .trim()
            .max(255)
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required(),
        name: Joi.string()
            .max(255)
            .required(),
    });
    return schema.validateAsync(parameters);
};

module.exports = validation;
