const shoesModel = require("../../models/shoes");
async function shoes(req, res) {
  try {
    let query = {};
    let id = +req.params.id;
    let lcost = +req.query.lcost;
    let hcost = +req.query.hcost;
    let sort = req.query.sort;

    // show all if product
    if (id) {
      query = { CategoryId: id };
    }
    // range filter lcost to hcost
    if (lcost && hcost) {
      query = { Cost: { $gt: lcost, $lt: hcost } };
    }
    // sort filter
    const sortOptions = {
      asc: { Cost: 1 },
      desc: { Cost: -1 },
    };
    const sortQuery = sortOptions[sort] || {};

    const shoes = await shoesModel.find(query).sort(sortQuery);
    res.send(shoes);
  } catch (err) {
    res.send({ success: false, message: "Server Error Please Try Again" });
  }
}
module.exports = shoes;
