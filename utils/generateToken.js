const jwt = require("jsonwebtoken");

const generateToken = ({ res, userId }) => {
  const token = jwt.sign({ _id: userId }, process.env.SECRET, {
    expiresIn: "30d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "Strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

module.exports = generateToken;
