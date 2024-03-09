const shampooModel = require("../../models/shampoo");

// find shampoo
async function shampoo(req, res) {
  let query = {};
  let id = +req.query.id;
  let lcost = +req.query.lcost;
  let hcost = +req.query.hcost;
  let sort = req.query.sort;

  if (id) {
    query = { productId: id };
  }

  if (lcost && hcost) {
    query = { cost: { $gt: lcost, $lt: hcost } };
  }
  // sort
  const sortOption = {
    asc: { cost: 1 },
    desc: { cost: -1 },
  };

  const sortQuery = sortOption[sort] || {};
  try {
    const find = await shampooModel.find(query).sort(sortQuery);
    res.send(find);
  } catch (err) {
    res.send({ success: false, message: "server error" });
  }
}

// add shampoo
async function addShampoo(req, res) {
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
    const exising = await shampooModel.findOne({ productId });
    if (exising) {
      return res.send({ success: false, message: "Already existing" });
    }
    const expectedCategoryId = [505];
    if (!expectedCategoryId.includes(categoryId)) {
      return res.send({
        success: false,
        message: "CategoryId does not match",
      });
    }
    const create = await shampooModel.create({
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

// delete shampoo
async function deleteShampoo(req, res) {
  const { productId } = req.body;

  const exising = await shampooModel.findOne({ productId });
  if (!exising) {
    return res.send({ success: false, message: "product not existing" });
  }
  try {
    const deleteShampoo = await shampooModel.deleteOne({ productId });
    res.send({
      success: true,
      message: "product delete success",
      deleteShampoo,
    });
  } catch (err) {
    console.log(err);
    res.send({ success: false, message: "server error", err });
  }
}
module.exports = { shampoo, addShampoo, deleteShampoo };
