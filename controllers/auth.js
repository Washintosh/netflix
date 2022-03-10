const User = require("../models/User");
require("express-async-errors");

const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const newUser = await User.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ message: "User created successfully", newUser });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email) throw new BadRequestError("Please provide an email");
  if (!password) throw new BadRequestError("Please provide a password");
  const user = await User.findOne({ email });
  if (!user) throw new UnauthenticatedError("No user found with this email");
  const isPasswordCorrect = user.comparePassword(password);
  if (!isPasswordCorrect)
    throw new UnauthenticatedError("Wrong password or email");
  const {
    password: {},
    ...info
  } = user._doc;
  const accessToken = user.createJWT();
  res.status(StatusCodes.OK).json({
    message: "Logged in successfully",
    user: { ...info, accessToken },
  });
};

module.exports = { register, login };
