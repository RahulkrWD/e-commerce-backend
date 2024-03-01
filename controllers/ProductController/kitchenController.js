const kitchenModel = require("../../models/kitchen");

// find kitchen and filter it
async function kitchen(req, res) {
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
    const find = await kitchenModel.find(query).sort(sortQuery);
    res.send(find);
  } catch (err) {
    res.send({ success: false, message: "server error" });
  }
}

// add kitchen
async function addKitchen(req, res) {
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
    const exising = await kitchenModel.findOne({ productId });
    if (exising) {
      return res.send({ success: false, message: "Already existing" });
    }
    const expectedCategoryId = [909];
    if (!expectedCategoryId.includes(categoryId)) {
      return res.send({
        success: false,
        message: "CategoryId does not match",
      });
    }
    const create = await kitchenModel.create({
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

// delete kitchen
async function deleteKitchen(req, res) {
  const { productId } = req.body;

  const exising = await kitchenModel.findOne({ productId });
  if (!exising) {
    return res.send({ success: false, message: "product not existing" });
  }
  try {
    const deleteKitchen = await kitchenModel.deleteOne({ productId });
    res.send({
      success: true,
      message: "product delete success",
      kitchenModel,
    });
  } catch (err) {
    console.log(err);
    res.send({ success: false, message: "server error", err });
  }
}
module.exports = { kitchen, addKitchen, deleteKitchen };
