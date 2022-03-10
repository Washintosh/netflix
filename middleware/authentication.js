const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.token;
  // const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    throw new UnauthenticatedError("Authentication invalid");
  const accessToken = authHeader.split(" ")[1];
  try {
    req.user = jwt.verify(accessToken, process.env.SECRET_KEY);
    next();
  } catch (err) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

module.exports = authMiddleware;
