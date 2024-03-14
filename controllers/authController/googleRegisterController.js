const userMode = require("../../models/user");

async function googleRegisterController(req, res) {
  try {
    const { name, email, uniqueId } = req.body;
    const exisitingUser = await userMode.findOne({ email });
    if (exisitingUser) {
      return res.send({ success: false, message: "Already have an acccount" });
    }
    const signup = await userMode.create({
      name,
      email,
      uniqueId,
    });
    res.send({ success: true, message: "Register success", user: signup });
  } catch (err) {
    res.send({ success: false, message: "Server error", error: err.message });
  }
}
module.exports = googleRegisterController;
