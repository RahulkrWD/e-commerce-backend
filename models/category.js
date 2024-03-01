const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  categoryId: { type: Number, require: true },
  categoryName: { type: String, require: true },
  image: { type: String, require: true },
});
module.exports = mongoose.model("categorys", categorySchema);
