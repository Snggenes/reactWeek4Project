const express = require("express");
const router = express.Router();
const { addFavourite } = require("../helpers/routerHelpers.js");

router.post("/:userId/:carId", addFavourite);

module.exports = router;
