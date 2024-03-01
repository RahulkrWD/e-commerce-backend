const dealsModel = require("../../models/deals");

async function Deals(req, res) {
  try {
    const findAll = await dealsModel.find();
    res.send(findAll);
  } catch (err) {
    res.send("server not connected");
  }
}
module.exports = Deals;
