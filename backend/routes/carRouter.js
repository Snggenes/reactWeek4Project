const express = require("express");
const router = express.Router();
const { getCar } = require("../helpers/routerHelpers");

router.get("/:id", getCar);

module.exports = router;
