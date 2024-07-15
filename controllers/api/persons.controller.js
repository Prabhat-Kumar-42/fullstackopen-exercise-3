const { PERSON } = require("../../models/phoneBook.model");
const { throwError } = require("../../services/throwError");

const handleGetAllUser = async (req, res, next) => {
  try {
    const users = await PERSON.find({});
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const handleGetUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const requestedPerson = await PERSON.findById(id);
    if (!requestedPerson) {
      throwError(404, "Not Found");
    }
    return res.status(200).json(requestedPerson);
  } catch (error) {
    next(error);
  }
};

const handleCreateUser = async (req, res, next) => {
  try {
    const newPerson = req.body;
    if (!newPerson || !newPerson.name || !newPerson.number) {
      throwError(400, "name and number are required field");
    }
    const personExists = await PERSON.findOne({ name: newPerson.name });

    if (personExists) {
      throwError(400, "Name must be unique");
    }

    const name = newPerson.name;
    const number = newPerson.number;
    const newPersonData = await PERSON.create({
      name,
      number,
    });
    return res.status(201).json(newPersonData);
  } catch (error) {
    next(error);
  }
};

const handleUpdateUser = async (req, res, next) => {
  try {
    if (!req.body) {
      throwError(404, "Not Found");
    }
    const id = req.params.id;
    const newNumber = req.body.number;
    if (!id || !newNumber) {
      throwError(404, "Not Found");
    }
    const requestedPerson = await PERSON.findByIdAndUpdate(
      id,
      { number: newNumber },
      { new: true },
    );
    if (!requestedPerson) {
      throwError(404, "Not Found");
    }
    return res.status(201).json(requestedPerson);
  } catch (error) {
    next(error);
  }
};

const handleDeleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const requestedPerson = await PERSON.findByIdAndDelete(id);
    if (!requestedPerson) {
      throwError(404, "Not Found");
    }
    return res.json(requestedPerson);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleGetAllUser,
  handleCreateUser,
  handleGetUser,
  handleDeleteUser,
  handleUpdateUser,
};
