const mobileModel = require("../../models/mobile");
async function mobile(req, res) {
  let query = {};
  let id = +req.params.id;
  if (id) {
    query = { CategoryId: id };
  }
  const mobile = await mobileModel.find(query);
  res.send(mobile);
}
module.exports = mobile;
