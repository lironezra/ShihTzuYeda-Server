const Joi = require('joi');

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema, { abortEarly: false });
      if (result.error) {
        return res.status(400).json(result.error.details);
      }

      if (!req.value) {
        req.value = {};
      }
      req.value['body'] = result.value;
      next();
    };
  },

  schemas: {
    authSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required()
    }),
    registerSchema: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required()
    }),
    dryFoodSchema: Joi.object()
      .keys({
        imagePath: Joi.string().required(),
        productInfo: Joi.string().required(),
        company: Joi.string().required(),
        protein: Joi.number().required(),
        lifeStage: Joi.number().required()
      })
      .unknown(true),
    regularFoodScema: Joi.object()
      .keys({
        imagePath: Joi.string().required(),
        name: Joi.string().required(),
        classification: Joi.number().required()
      })
      .unknown(true)
  }
};
