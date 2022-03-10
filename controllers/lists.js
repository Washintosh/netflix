const List = require("../models/List");
const { StatusCodes } = require("http-status-codes");
const { ForbiddenError, NotFoundError } = require("../errors");
require("express-async-errors");

const createList = async (req, res) => {
  if (!req.user.isAdmin)
    throw new ForbiddenError("You are not allowed to create a list");

  const createdList = await List.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ message: "List successfully created", list: createdList });
};

const deleteList = async (req, res) => {
  if (!req.user.isAdmin)
    throw new ForbiddenError("You are not allowed to delete a list");
  const deletedList = await List.findByIdAndDelete(req.params.id);
  if (!deletedList) throw new NotFoundError("List was not found");

  res
    .status(StatusCodes.OK)
    .json({ message: "List successfully deleted", list: deletedList });
};

const getList = async (req, res) => {
  const { type, genre } = req.query;
  let list;
  if (type) {
    if (genre) {
      list = await List.aggregate([
        { $sample: { size: 10 } },
        { $match: { type, genre } },
      ]);
    } else {
      list = await List.aggregate([
        { $sample: { size: 10 } },
        { $match: { type } },
      ]);
    }
  } else {
    list = await List.aggregate([{ $sample: { size: 10 } }]);
  }
  res.status(StatusCodes.OK).json({ message: "Successfully requested", list });
};

module.exports = {
  createList,
  deleteList,
  getList,
};
