const braceletModel = require("../../models/bracelet");

// find bracelet and  filter it
async function bracelet(req, res) {
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
    const find = await braceletModel.find(query).sort(sortQuery);
    res.send(find);
  } catch (err) {
    res.send({ success: false, message: "server error" });
  }
}

// add bracelet
async function addBracelet(req, res) {
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
    const exising = await braceletModel.findOne({ productId });
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
    const create = await braceletModel.create({
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

// delete bracelet
async function deleteBracelet(req, res) {
  const { productId } = req.body;

  const exising = await braceletModel.findOne({ productId });
  if (!exising) {
    return res.send({ success: false, message: "product not existing" });
  }
  try {
    await braceletModel.deleteOne({ productId });
    res.send({ success: true, message: "product delete success" });
  } catch (err) {
    console.log(err);
    res.send({ success: false, message: "server error", err });
  }
}
module.exports = { bracelet, addBracelet, deleteBracelet };
