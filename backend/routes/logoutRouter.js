const express = require("express");
const { getLogout } = require("../helpers/routerHelpers");
const router = express.Router();

router.get("/", getLogout);

module.exports = router;
