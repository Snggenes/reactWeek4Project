const express = require("express");
const router = express.Router();
const { getCarByFuel } = require("../helpers/routerHelpers");

router.get("/:fuel", getCarByFuel);

module.exports = router;
