const quicksearchModel = require("../../models/quicksearch");

async function quicksearch(req, res) {
  let query = {};
  let id = +req.params.id;
  if (id) {
    query = { id: id };
  }
  try {
    const findAll = await quicksearchModel.find(query);
    res.send(findAll);
  } catch (err) {
    res.send("server not connected");
  }
}
module.exports = quicksearch;
