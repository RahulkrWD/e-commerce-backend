const mongoose = require("mongoose");
const dealsSchema = new mongoose.Schema({});
module.exports = mongoose.model("deals", dealsSchema);
