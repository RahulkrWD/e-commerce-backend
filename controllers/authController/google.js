const jwt = require("jsonwebtoken");
const userModel = require("../../models/user");

// google register
async function googleRegisterController(req, res) {
  try {
    const { name, email, uniqueId } = req.body;
    const exisitingUser = await userModel.findOne({ email });
    if (exisitingUser) {
      return res.send({ success: false, message: "Already have an acccount" });
    }
    const signup = await userModel.create({
      name,
      email,
      uniqueId,
    });
    res.send({ success: true, message: "Register success", user: signup });
  } catch (err) {
    res.send({ success: false, message: "Server error", error: err.message });
  }
}

// google login
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

module.exports = { googleLoginController, googleRegisterController };
