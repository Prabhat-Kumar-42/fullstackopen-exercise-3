const { throwError } = require("../services/throwError");

const unknownEndpoint = (req, res, next) => {
  try {
    throwError(404, "unknown endpoint");
  } catch (err) {
    next(err);
  }
};

const mongoError = (err, req, res, next) => {
  if (err.name === "CastError") {
    throwError(400, "malformatted id");
  }
  if (err.name === "ValidationError") {
    throwError(400, err.message);
  }
  if (err.name === "MongoServerError" && err.code === 11000) {
    throwError(400, "name must be unique");
  }
  next(err);
};

const errorHandler = (err, req, res, next) => {
  try {
    const statusCode = err.status || 500;
    if (statusCode >= 500) console.error(err.stack);
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({ error: message });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  unknownEndpoint,
  mongoError,
  errorHandler,
};
