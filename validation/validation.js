// Validation
const Joi = require('@hapi/joi');

// Register validation
const registerValidation = data => {
  const validationSchema =Joi.object().keys( {
    firstname: Joi
              .string()
              .required(),
    lastname: Joi 
              .string()
              .required(),
    emailid: Joi
               .string()
               .required()
               .email(),
    password: Joi
              .string()
               .min(8)
              .required(),
  });

  return validationSchema.validate(data);
};

// Login Validation
const loginValidation = data => {
  const validationSchema = Joi.object().keys( {
    _id:Joi ,
    emailid: Joi
      .string()
      .required()
      .email(),
    password: Joi
      .string()
      .min(8)
      .required()
  });
  return validationSchema.validate(data);
};
const profileValidation = data => {
    const validationSchema = Joi.object().keys( {
      id:Joi ,
      address:Joi,
      phoneno:Joi
        .number(),
     fathername: Joi
        .string(),
      heighestqual:Joi
        .string()
    });
    return validationSchema.validate(data);
  };

module.exports={
  registerValidation : registerValidation,
   loginValidation : loginValidation,
   profileValidation : profileValidation
}
