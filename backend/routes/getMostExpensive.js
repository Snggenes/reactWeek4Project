const express = require("express");
const router = express.Router();
const { getMostExpensive } = require("../helpers/routerHelpers");

router.get("/", getMostExpensive);

module.exports = router;
