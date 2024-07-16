const numberValidator = (number) => {
  const validNumber = /^(?:\d{2}-\d{6,}|(?:\d{3}-\d{5,}))$/;
  return validNumber.test(number);
};

module.exports = {
  numberValidator,
};
