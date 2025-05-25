const jwt = require("jsonwebtoken");
const customError = require("../utils/customError");
const Users = require("../models/userModel");

const verifyAuth = async (req, res, next) => {
  let token;

  token = req.cookies.token;

  if (!token) {
    throw customError(401, "Authorization failed - no valid token");
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);

    const user = await Users.findById(decoded._id).select("-password");
    console.log(user);

    if (!user) {
      throw customError(401, "Unauthorized action");
    }

    res.user = user;
    next();
  } catch {
    throw customError(401, "Unauthorized action");
  }
};

module.exports = verifyAuth;
