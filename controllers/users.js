const User = require("../models/User");
const cryptojs = require("crypto-js");
const { StatusCodes } = require("http-status-codes");
const { ForbiddenError } = require("../errors");
require("express-async-errors");

const updateUser = async (req, res) => {
  if (req.user.id !== req.params.id && !req.user.isAdmin)
    throw new ForbiddenError("You are not allowed to update this account");
  if (req.body.password) {
    req.body.password = cryptojs.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString();
  }
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updatedUser)
    throw new NotFoundError(`No user found with id ${req.params.id}`);
  res
    .status(StatusCodes.OK)
    .json({ message: "Successfully updated", user: updatedUser });
};

const deleteUser = async (req, res) => {
  if (req.user.id !== req.params.id && !req.user.isAdmin)
    throw new ForbiddenError("You are not allowed to delete this account");
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  if (!deletedUser)
    throw new NotFoundError(`No user found with id ${req.params.id}`);
  res
    .status(StatusCodes.OK)
    .json({ message: "Successfully deleted", user: deletedUser });
};

const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  const {
    password: {},
    ...info
  } = user._doc;
  res
    .status(StatusCodes.OK)
    .json({ message: "Successfully requested", user: info });
};

const getAllUsers = async (req, res) => {
  if (!req.user.isAdmin)
    throw new ForbiddenError("Permission denied. You are not an admin");
  const { newUsers } = req.query;
  let result = User.find();
  if (newUsers) {
    result = result.limit(5);
  }
  const users = await result.sort({ createdAt: -1 });
  res
    .status(StatusCodes.OK)
    .json({ message: "Successfully requested", nUsers: users.length, users });
};

const getUsersStats = async (req, res) => {
  if (!req.user.isAdmin)
    throw new ForbiddenError("Permission denied. You are not an admin");
  const today = new Date();
  const lastYear = today.setFullYear();
  const data = await User.aggregate([
    {
      $project: {
        month: { $month: "$createdAt" },
      },
    },
    {
      $group: {
        _id: "$month",
        total: { $sum: 1 },
      },
    },
  ]);
  res.status(StatusCodes.OK).json({ message: "Successfully requested", data });
};

module.exports = {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  getUsersStats,
};
