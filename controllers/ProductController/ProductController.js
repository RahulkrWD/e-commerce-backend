const ProductModel = require("../../models/Product");

// find product and filter
async function product(req, res) {
  let query = {};
  const { category, id, lcost, hcost, type, sort } = req.query;
  // filter category

  if (category && id) {
    query = { categoryId: category, productId: id };
  } else if (category) {
    query = { categoryId: category };
  }

  if (category && type) {
    query = { categoryId: category, type: type };
  }
  // lcost to hcost
  if (category && lcost && hcost) {
    query = { categoryId: category, cost: { $gt: lcost, $lt: hcost } };
  } else if (lcost && hcost) {
    query = { cost: { $gt: lcost, $lt: hcost } };
  }
  // sort
  const sortOption = {
    asc: { cost: 1 },
    desc: { cost: -1 },
  };
  const sortQuery = sortOption[sort] || {};
  try {
    const find = await ProductModel.find(query).sort(sortQuery);
    res.send(find);
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
