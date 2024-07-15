const { throwError } = require("../services/throwError");

const unknownEndpoint = (req, res, next) => {
  try {
    throwError(404, "unknown endpoint");
  } catch (error) {
    next(error);
  }
};

const castError = (err, req, res, next) => {
  try {
    if (err.name === "CastError") {
      throwError(400, "malformatted id");
    }
    next(err);
  } catch (err) {
    next(err);
  }
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  if (statusCode >= 500) console.error(err.stack);
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ error: message });
};

module.exports = {
  unknownEndpoint,
  castError,
  errorHandler,
};
