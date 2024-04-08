const ProductModel = require("../../models/Product");

async function getProduct(req, res) {
  let query = {};
  let id = +req.params.id;
  let product = +req.query.product;
  let type = req.query.type;
  let hcost = +req.query.hcost;
  let lcost = +req.query.lcost;
  let sort = req.query.sort;

  // category filter
  if (id) {
    query = { categoryId: id };
  }

  // display each product to buy using productId
  if (product) {
    query = { categoryId: id, productId: product };
  }

  // display each type of product to show
  if (type) {
    query = { categoryId: id, type: type };
  }

  // range filter lcost to hcost
  if (lcost && hcost) {
    query = { categoryId: id, cost: { $gt: lcost, $lt: hcost } };
  }

  // range filter lcost to hcost with each type of product
  if (type && lcost && hcost) {
    query = { categoryId: id, type: type, cost: { $gt: lcost, $lt: hcost } };
  }

  // sort filter
  const sortOption = {
    asc: { cost: 1 },
    desc: { cost: -1 },
  };
  const sortQuery = sortOption[sort] || {};
  try {
    const getItem = await ProductModel.find(query).sort(sortQuery);
    res.send(getItem);
  } catch (err) {
    console.log("server error", err);
  }
}

module.exports = getProduct;
