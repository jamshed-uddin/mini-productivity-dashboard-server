const Users = require("../models/userModel");
const customError = require("../utils/customError");
const generateToken = require("../utils/generateToken");
const {
  validateUserInfo,
  validateUserCredentials,
} = require("../utils/validate");

// @desc login user
// POST /api/users/login
// @access Public

const loginUser = async (req, res, next) => {
  try {
    console.log("endpoint hitting");
    console.log(req.body);

    const { error, value: userCredentials } = validateUserCredentials(req.body);
    if (error) {
      throw customError(401, error.message);
    }

    const user = await Users.findOne({ email: userCredentials.email });

    if (user && (await user.matchPassword(userCredentials.password))) {
      const userWithoutPassword = user?.toObject();
      delete userWithoutPassword.password;

      generateToken({ res, userId: userWithoutPassword._id });
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
    const { error, value: userInfo } = validateUserInfo(req.body);

    if (error) {
      throw customError(400, error.message);
    }

    const existingUser = await Users.findOne({
      email: userInfo.email,
    });

    if (existingUser) {
      throw customError(400, "An account with this email already exists");
    }

    const newUser = await Users.create(userInfo);

    console.log(newUser);
    const userWithoutPassword = newUser?.toObject();
    delete userWithoutPassword.password;

    const response = { message: "User registered", data: userWithoutPassword };
    generateToken({ res, userId: userWithoutPassword._id });

    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

//@desc logout user
// POST /api/users/logout
// @access
const logoutUser = async (req, res, next) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { loginUser, registerUser, logoutUser };
