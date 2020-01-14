import Joi from '@hapi/joi';

export const schema = Joi.object({
    age: Joi
        .number()
        .integer()
        .min(4)
        .max(130)
        .required(),

    login: Joi
        .string()
        .pattern(new RegExp(/^[a-z0-9_.]+$/i))
        .required(),

    password: Joi
        .string()
        .pattern(new RegExp(/\d/))
        .pattern(new RegExp(/[a-z]/i))
        .min(6)
        .max(20)
        .required()
});
