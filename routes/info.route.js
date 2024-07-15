const express = require("express");
const { handleInfo } = require("../controllers/info.controller");
const router = express.Router();

router.route("/").get(handleInfo);

module.exports = router;
