const ProductModel = require("../../models/Product");

async function product(req, res) {
  try {
    const findAll = await ProductModel.find();
    res.send(findAll);
  } catch (err) {
    console.log(err);
    res.send({ success: false, message: "server error" });
  }
}
// add product
async function addProduct(req, res) {
  try {
    const {
      categoryId,
      productId,
      cost,
      image,
      rating,
      productName,
      type,
      offer,
      description,
      details,
      gallery,
    } = req.body;

    if (
      !categoryId ||
      !productId ||
      !cost ||
      !image ||
      !rating ||
      !productName ||
      !type ||
      !offer ||
      !description ||
      !details ||
      !gallery
    ) {
      return res.send({ success: false, message: "all  fields are required" });
    }

    const exising = await ProductModel.findOne({ productId });
    if (exising) {
      return res.send({
        success: false,
        message: "product id is Already exisiting",
      });
    }
    const create = await ProductModel.create({
      categoryId,
      productId,
      cost,
      image,
      rating,
      productName,
      type,
      offer,
      description,
      details,
      gallery,
    });
    res.send({ success: true, message: "product added", create });
  } catch (err) {
    res.send({ success: false, message: "server error" });
    console.log(err);
  }
}

// delete product
async function deleteProduct(req, res) {
  const { productId } = req.body;
  const exising = await ProductModel.findOne({ productId });
  if (!exising) {
    return res.send({ success: false, message: "product not existing" });
  }
  try {
    const deleteProduct = await ProductModel.deleteOne({ productId });
    res.send({
      success: true,
      message: "product delete success",
      deleteProduct,
    });
  } catch (err) {
    res.send({ success: false, message: "server error", err });
  }
}
module.exports = { product, addProduct, deleteProduct };
