const express = require("express");
const { postRegister } = require("../helpers/routerHelpers");
const router = express.Router();

router.post("/", postRegister);

module.exports = router;
