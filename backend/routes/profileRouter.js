const express = require("express");
const router = express.Router();
const {
  getProfile,
  userCarAdd,
  getUserWithCarId,
  getUser,
} = require("../helpers/routerHelpers");

router.get("/", getProfile);
router.get("/:id", getUser);
router.post("/:userId/:carId", userCarAdd);
router.get("/user/:carId", getUserWithCarId);

module.exports = router;
