const mongoose = require("mongoose");
const highlighterSchema = new mongoose.Schema({
  categoryId: { type: Number, required: true },
  productId: { type: Number, required: true },
  cost: { type: Number, required: true },
  image: { type: String, required: true },
  rating: { type: Number, required: true },
  productName: { type: String, required: true },
  type: { type: String, required: true },
  offer: { type: String, required: true },
  description: { type: String, required: true },
  details: { type: String, required: true },
  gallery: { type: [String], required: true },
});

module.exports = mongoose.model("highlighters", highlighterSchema);
