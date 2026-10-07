const AppError = require("../utils/AppError");

const notFound = (req, res, next) => {
  next(
    new AppError(
      `Route ${req.originalUrl} not found`,
      404,
      "ROUTE_NOT_FOUND"
    )
  );
};

module.exports = notFound;