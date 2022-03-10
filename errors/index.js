const CustomError = require("./custom");
const BadRequestError = require("./badRequest");
const NotFoundError = require("./notFound");
const UnauthenticatedError = require("./unauthenticated");
const ForbiddenError = require("./forbidden");

module.exports = {
  CustomError,
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
  ForbiddenError,
};
