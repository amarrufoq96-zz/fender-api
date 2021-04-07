const Joi = require('@hapi/joi');
const validation = {};

validation.validateParameters = async (parameters) => {
    const schema = Joi.object().keys({
        id: Joi.number()
            .max(255)
            .required(),
        idCharacter: Joi.number()
            .max(255)
            .required(),
    });
    return schema.validateAsync(parameters);
};

module.exports = validation;
