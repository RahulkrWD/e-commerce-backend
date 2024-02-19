const jwt = require("jsonwebtoken");
const userModel = require("../../models/user");

async function googleLoginController(req, res) {
  const { email } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    res.send({ success: false, message: "User not found" });
  } else {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.send({ success: true, message: "Login successfull", token, user });
  }
}

module.exports = googleLoginController;
