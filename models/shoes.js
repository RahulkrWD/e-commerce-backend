const mongoose = require("mongoose");
const shoesSchema = new mongoose.Schema({});
module.exports = mongoose.model("shoes", shoesSchema);
