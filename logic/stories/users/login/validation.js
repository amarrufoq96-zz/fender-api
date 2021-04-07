const Joi = require('@hapi/joi');
const validation = {};

validation.validateParameters = async (parameters) => {
    const schema = Joi.object().keys({
        email: Joi.string()
            .trim()
            .min(3)
            .max(255)
            .required(),
        password: Joi.string()
            .trim()
            .max(255)
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required(),
    });
    return schema.validateAsync(parameters);
};

module.exports = validation;
