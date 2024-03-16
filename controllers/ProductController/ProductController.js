const ProductModel = require("../../models/Product");

// find product and filter
async function product(req, res) {
  let query = {};
  let category = +req.query.category;
  let id = +req.query.id;
  let lcost = +req.query.lcost;
  let hcost = +req.query.hcost;
  let sort = req.query.sort;
  // filter category
  if (category) {
    query = { categoryId: category };
  }

  // filter each oroduct category
  if (category && id) {
    query = { categoryId: category, productId: id };
  }

  // lcost to hcost
  if (category && lcost && hcost) {
    query = { categoryId: category, cost: { $gt: lcost, $lt: hcost } };
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

    const exising = await walletModel.findOne({ productId });
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
    res.send(create);
  } catch (err) {
    res.send({ success: false, message: "server error" });
  }
}

// delete product
async function deleteProduct(req, res) {
  const { productId } = req.body;
  const exising = await walletModel.findOne({ productId });
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
