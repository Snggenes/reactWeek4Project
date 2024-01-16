const express = require("express");
const router = express.Router();
const {getMyFavourites} = require('../helpers/routerHelpers.js')

router.get("/:userId", getMyFavourites);

module.exports = router;
