const Users = require("../models/userModel");
const customError = require("../utils/customError");

// @desc login user
// POST /api/users/login
// @access Public

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw customError(400, "Email is required");
    } else if (!password) {
      throw customError(400, "Password is required");
    }

    const user = await Users.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const userWithoutPassword = user?.toObject();
      delete userWithoutPassword.password;

      res.status(200).send({
        message: "Login succesful",
        data: userWithoutPassword,
      });
    } else {
      throw customError(400, "Invalid credentials");
    }
  } catch (error) {
    next(error);
  }
};

//@desc register user
// POST /api/users/register
// @access Public
const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw customError(400, "Email is required");
    } else if (!password) {
      throw customError(400, "Password is required");
    } else if (password.length < 6) {
      throw customError(400, "Password length must be 6 or higher");
    }

    const existingUser = await Users.findOne({
      email,
    });

    if (existingUser?.email === email) {
      throw customError(400, "An account with this email already exists");
    }

    const newUser = await Users.create({ email, password });
    const userWithoutPassword = newUser?.toObject();
    delete userWithoutPassword.password;

    const response = userWithoutPassword;

    res.status(200).send({ message: "User registered", data: response });
  } catch (error) {
    next(error);
  }
};

module.exports = { loginUser, registerUser };
