const footwearModel = require("../../models/footwears");

// find footwears
async function footWear(req, res) {
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
    const find = await footwearModel.find(query).sort(sortQuery);
    res.send(find);
  } catch (err) {
    console.log(err);
  }
}

// add footwears
async function addFootwear(req, res) {
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
    const exising = await footwearModel.findOne({ productId });
    if (exising) {
      return res.send({ success: false, message: "Already existing" });
    }
    const expectedCategoryId = [202];
    if (!expectedCategoryId.includes(categoryId)) {
      return res.send({
        success: false,
        message: "CategoryId does not match",
      });
    }
    const create = await footwearModel.create({
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
    res.send({ success: false, message: "server error", err });
  }
}

// delete footwears
async function deleteFootwear(req, res) {
  const { productId } = req.body;

  const exising = await footwearModel.findOne({ productId });
  if (!exising) {
    return res.send({ success: false, message: "product not existing" });
  }
  try {
    const deleteFootwear = await footwearModel.deleteOne({ productId });
    res.send({
      success: true,
      message: "product delete success",
      deleteFootwear,
    });
  } catch (err) {
    console.log(err);
    res.send({ success: false, message: "server error", err });
  }
}
module.exports = { footWear, addFootwear, deleteFootwear };
