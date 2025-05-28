const joi = require("joi");

const validateUserInfo = (userInfo) => {
  const schema = joi.object({
    name: joi.string().required().messages({
      "any.required": "Name is required",
      "string.empty": "Name is required",
    }),
    email: joi.string().email().required().messages({
      "string.email": "Please provide a valid email address",
      "any.required": "Email is required",
      "string.empty": "Email is required",
    }),

    password: joi.string().min(6).required().messages({
      "any.required": "Password is required",
      "string.length": "Password length must be 6 digit",
      "string.empty": "Password is required",
    }),
  });
  return schema.validate(userInfo);
};
const validateUserCredentials = (credentials) => {
  const schema = joi.object({
    email: joi.string().email().required().messages({
      "string.email": "Please provide a valid email address",
      "any.required": "Email is required",
      "string.empty": "Email is required",
    }),

    password: joi.string().min(6).required().messages({
      "any.required": "Password is required",
      "string.length": "Password length must be 6 digit",
      "string.empty": "Password is required",
    }),
  });
  return schema.validate(credentials);
};

const validateGoalInfo = (goalInfo) => {
  const schema = joi.object({
    title: joi.string().required().messages({
      "any.required": "Title is required",
      "string.empty": "Title is required",
    }),
    description: joi.string().allow("").optional(),
    status: joi.string().allow("").optional(),
    user: joi.string().allow("").optional(),
  });
  return schema.validate(goalInfo);
};

const validateTaskInfo = (taskInfo) => {
  const schema = joi.object({
    title: joi.string().required().messages({
      "any.required": "Title is required",
      "string.empty": "Title is required",
    }),

    description: joi.string().allow("").optional(),

    status: joi.string().allow("").optional(),
    priority: joi.string().required().messages({
      "any.required": "Priority is required",
      "string.empty": "Priority is required",
    }),
    goal: joi.string().allow("").optional(),
    date: joi.string().allow("").optional(),
  });

  return schema.validate(taskInfo);
};

module.exports = {
  validateUserInfo,
  validateUserCredentials,
  validateGoalInfo,
  validateTaskInfo,
};
