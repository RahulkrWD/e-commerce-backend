const menDealsModel = require("../../models/mensDeals");

async function menDeals(req, res) {
  try {
    const deals = await menDealsModel.find();
    res.send(deals);
  } catch (err) {
    res.send("server connection");
  }
}
module.exports = menDeals;
