const userModel = require("../../models/user");

async function getProfile(req, res) {
  try {
    let query = {};
    let id = req.query.id;
    if (id) {
      query = { uniqueId: id };
    }
    const profile = await userModel.find(query);
    res.send(profile);
  } catch (err) {
    console.log("sever error, please try again", err);
  }
}

module.exports = getProfile;
