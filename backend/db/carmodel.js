const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  fuel: { type: String, required: true },
  body: { type: String, required: true },
  model: { type: String, required: true },
  price: {type: Number, required: true },
  year: {type: Number, required: true },
  kmStand: {type: Number, required: true },
  poster: {type: String, required: true },
  owner: {type: String}
});


module.exports = {
  carModel: mongoose.model("car", carSchema),
} 


