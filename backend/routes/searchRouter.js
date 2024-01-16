const express = require("express");
const router = express.Router();
const { getSearchResults } = require("../helpers/routerHelpers.js");

router.get("/:term", getSearchResults);

module.exports = router;
