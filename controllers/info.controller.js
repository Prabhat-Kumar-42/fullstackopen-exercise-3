const { PERSON } = require("../models/phoneBook.model");
const { getFormattedDate } = require("../services/formattedDate");

const handleInfo = async (req, res, next) => {
  try {
    const formattedDate = getFormattedDate();
    const phoneBookSize = await PERSON.countDocuments();
    const data = `<p>Phonebook has info for ${phoneBookSize} people</p>
                <p>${formattedDate}</p>`;
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleInfo,
};
