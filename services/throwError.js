const throwError = (errorStatusCode, message) => {
  const error = Error(message);
  error.status = errorStatusCode;
  throw error;
};

module.exports = {
  throwError,
};
