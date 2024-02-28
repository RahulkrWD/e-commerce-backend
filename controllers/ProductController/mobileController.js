const mobileModel = require("../../models/mobile");

async function mobile(req, res) {
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

    // Range filter lcost to hcost
    if (lcost && hcost) {
      query = { Cost: { $gt: lcost, $lt: hcost } };
    }

    // sort filter
    const sortOptions = {
      asc: { Cost: 1 },
      desc: { Cost: -1 },
    };

    const sortQuery = sortOptions[sort] || {};

    const mobile = await mobileModel.find(query).sort(sortQuery);
    res.send(mobile);
  } catch (error) {
    res.send({ message: "something problem Please try again" });
  }
}

module.exports = mobile;
