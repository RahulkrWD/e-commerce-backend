const categoryModel = require("../../models/category");

async function category(req, res) {
  try {
    const allCategory = await categoryModel.find();
    res.send(allCategory);
  } catch (err) {
    res.send("Server error");
  }
}
module.exports = category;
