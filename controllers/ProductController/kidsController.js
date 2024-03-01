const kidsModel = require("../../models/kids");

// find kids and filter it
async function kids(req, res) {
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
    const find = await kidsModel.find(query).sort(sortQuery);
    res.send(find);
  } catch (err) {
    res.send({ success: false, message: "server error" });
  }
}

// add kids
async function addKids(req, res) {
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
    const exising = await kidsModel.findOne({ productId });
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
    const create = await kidsModel.create({
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

// delete kids
async function deleteKids(req, res) {
  const { productId } = req.body;

  const exising = await kidsModel.findOne({ productId });
  if (!exising) {
    return res.send({ success: false, message: "product not existing" });
  }
  try {
    const deleteKids = await kidsModel.deleteOne({ productId });
    res.send({ success: true, message: "product delete success", deleteKids });
  } catch (err) {
    console.log(err);
    res.send({ success: false, message: "server error", err });
  }
}
module.exports = { kids, addKids, deleteKids };
