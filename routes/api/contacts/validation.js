const Joi = require("joi");

const schemaCreateContact = Joi.object({
  name: Joi.string().min(3).max(40).required(),
  lastName: Joi.string().min(3).max(40).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .optional(),
  phone: Joi.string().required(),
  work: Joi.array().items(Joi.string()),
  pets: Joi.array().items(Joi.string()),
  hobbies: Joi.array().items(Joi.string()),
  birthday: Joi.date(),
  favorite: Joi.boolean(),
  socialNetworks: Joi.object({
    instagram: Joi.string(),
    linkedin: Joi.string(),
    facebook: Joi.string(),
  }),
  specificInformation: Joi.string().min(1).max(500),
  gender: Joi.string(),
  owner: Joi.object(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(40).optional(),
  lastName: Joi.string().min(3).max(40).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .optional(),
  phone: Joi.string().optional(),
  work: Joi.array().items(Joi.string()),
  pets: Joi.array().items(Joi.string()),
  hobbies: Joi.array().items(Joi.string()),
  birthday: Joi.date(),
  favorite: Joi.boolean(),
  socialNetworks: Joi.object({
    instagram: Joi.string(),
    linkedin: Joi.string(),
    facebook: Joi.string(),
  }),
  specificInformation: Joi.string().min(1).max(500),
  gender: Joi.string(),
  owner: Joi.object(),
}).min(1);

const schemaUpdateStatusContact = Joi.object({
  favorite: Joi.boolean().required,
}).or("favorite");

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    next({
      status: 400,
      message: err.message,
    });
  }
};

module.exports = {
  validationCreateContact: (req, res, next) => {
    return validate(schemaCreateContact, req.body, next);
  },
  validationUpdateContact: (req, res, next) => {
    return validate(schemaUpdateContact, req.body, next);
  },
  validationUpdateStatusContact: (req, res, next) => {
    return validate(schemaUpdateStatusContact, req.body, next);
  },
};
