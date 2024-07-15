const express = require("express");
const {
  handleGetAllUser,
  handleCreateUser,
  handleDeleteUser,
  handleUpdateUser,
  handleGetUser,
} = require("../../controllers/api/persons.controller");
const router = express.Router();

router.route("/persons").get(handleGetAllUser).post(handleCreateUser);

router
  .route("/persons/:id")
  .get(handleGetUser)
  .put(handleUpdateUser)
  .delete(handleDeleteUser);

module.exports = router;
