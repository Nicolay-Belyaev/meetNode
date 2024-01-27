const joi = require('joi');

const schema = joi.object({
    firstName: joi.string()
        .min(3)
        .max(200)
        .required(),
    familyName: joi.string()
        .min(1)
        .max(200)
        .required(),
    age: joi.number()
        .integer()
        .min(0)
        .max(150)
        .required(),
})

function userValidator(user, res) {
    const result = schema.validate(user);
    if (result.error) {
        return res.status(400).send({error: result.error.details});
    }
}

module.exports = { userValidator };
