const userModel = require("../../models/user");
const bcrypt = require("bcrypt");

const forgetPassword = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is required" });
    }
    if (!newPassword) {
      return res.send({ message: "new Password is required" });
    }

    // check
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.send({ success: false, message: "Wrong email or Answer" });
    }
    const hashed = await bcrypt.hash(newPassword, 10);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.send({ success: true, message: "password Reset successfully" });
  } catch (err) {
    res.send({ success: false, message: "Something went wrong", err });
  }
};

module.exports = forgetPassword;
