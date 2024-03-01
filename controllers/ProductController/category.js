const categoryModel = require("../../models/category");

// read
async function category(req, res) {
  try {
    const allCategory = await categoryModel.find();
    res.send(allCategory);
  } catch (err) {
    console.log("server error");
  }
}

// add
async function addCategory(req, res) {
  const { categoryId, categoryName, image } = req.body;
  if (!categoryId || !categoryName || !image) {
    return res.send({ success: false, message: "All field are required" });
  }
  const exising = await categoryModel.findOne({ categoryId });
  if (exising) {
    return res.send({
      success: false,
      message: "Already have existing categoryId",
    });
  }
  try {
    const create = await categoryModel.create({
      categoryId,
      categoryName,
      image,
    });
    res.send(create);
  } catch (err) {
    console.log("server error", err);
  }
}

// delete
async function deleteCategory(req, res) {
  const { categoryId } = req.body;
  const exising = await categoryModel.findOne({ categoryId });
  if (!exising) {
    return res.send({ success: false, message: "not existing" });
  }
  try {
    const deleteCategory = await categoryModel.deleteOne({ categoryId });
    res.send(deleteCategory);
  } catch (err) {
    res.send({ success: false, message: "delete failed" });
  }
}
module.exports = { category, addCategory, deleteCategory };
