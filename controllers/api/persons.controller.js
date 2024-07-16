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
    const error = new PERSON(newPerson).validateSync();
    if (error) throw error;
    const createdPersons = await PERSON.create(newPerson);
    return res.status(201).json(createdPersons);
  } catch (error) {
    next(error);
  }
};

const handleUpdateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id || !req.body) {
      throwError(404, "Not Found");
    }
    const newNumber = req.body.number;
    if (!newNumber) {
      throwError(400, "number is Required");
    }
    const requestedPerson = await PERSON.findByIdAndUpdate(
      id,
      { number: newNumber },
      { new: true, runValidators: true },
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
      return res.status(204).end();
    }
    return res.status(200).json(requestedPerson);
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
