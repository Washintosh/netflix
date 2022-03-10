const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong, try again later",
  };

  if (err.name === "ValidationError") {
    customError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(". ");
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  //Duplicated value error
  if (err.code && err.code === 11000) {
    customError.message = `${
      err.keyValue[Object.keys(err.keyValue)[0]]
    } is already being used as ${Object.keys(
      err.keyValue
    )}, please choose another.`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.name === "CastError") {
    customError.message = `No item with id: ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }
  return res
    .status(customError.statusCode)
    .json({ message: customError.message });
};

module.exports = errorHandlerMiddleware;
