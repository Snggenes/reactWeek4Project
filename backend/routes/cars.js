const express = require("express");
const router = express.Router();
const {
  getCars,
  postCars,
  getCarsModel,
  deleteCarById
} = require("../helpers/routerHelpers.js");

router.get("/", getCars);

router.get("/:model", getCarsModel);

router.post("/", postCars);

router.delete("/:id", deleteCarById);

module.exports = router;
