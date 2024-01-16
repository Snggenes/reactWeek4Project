const express = require("express");
const router = express.Router();
const {getMyCars} = require('../helpers/routerHelpers.js')

router.get("/:userId", getMyCars);

module.exports = router;
