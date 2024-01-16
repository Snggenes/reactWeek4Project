const express = require("express");
const router = express.Router();
const { getCarByBody } = require("../helpers/routerHelpers");

router.get("/:body", getCarByBody);

module.exports = router;
