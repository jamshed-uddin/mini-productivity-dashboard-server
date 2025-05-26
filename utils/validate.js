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
    status: joi.string().required().messages({
      "any.required": "Status is required",
      "string.empty": "Status is required",
    }),
    user: joi.string().required().messages({
      "any.required": "Task creator id is required",
      "string.empty": "Task creator id is required",
    }),
  });
  return schema.validate(goalInfo);
};

const validateTaskInfo = (taskInfo) => {
  const schema = joi.object({
    title: joi.string().required().messages({
      "any.required": "Title is required",
      "string.empty": "Title is required",
    }),

    status: joi.string().required().messages({
      "any.required": "Status is required",
      "string.empty": "Status is required",
    }),
    priority: joi.string().required().messages({
      "any.required": "Priority is required",
      "string.empty": "Priority is required",
    }),
    user: joi.string().required().messages({
      "any.required": "Goal creator id is required",
      "string.empty": "Goal creator id is required",
    }),
  });

  return schema.validate(taskInfo);
};

module.exports = {
  validateUserInfo,
  validateUserCredentials,
  validateGoalInfo,
  validateTaskInfo,
};
