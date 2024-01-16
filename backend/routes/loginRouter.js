const express = require("express");
const { postLogin } = require("../helpers/routerHelpers");
const router = express.Router();

router.post("/", postLogin);

module.exports = router;
