const womenDealsModel = require("../../models/womenDeals");

async function womenDeals(req, res) {
  try {
    const deals = await womenDealsModel.find();
    res.send(deals);
  } catch (err) {
    res.send("server connection failed");
  }
}
module.exports = womenDeals;
