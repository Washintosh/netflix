const CustomError = require("./custom");
const { StatusCodes } = require("http-status-codes");

class ForbiddenError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

module.exports = ForbiddenError;
