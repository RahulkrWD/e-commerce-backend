const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({});
module.exports = mongoose.model("categorys", categorySchema);
