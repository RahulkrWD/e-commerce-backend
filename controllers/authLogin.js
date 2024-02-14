const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validate
    if (!email || !password) {
      return res.send({ message: "invalid email or password" });
    }
    // find user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.send({
        success: false,
        message: "Invalid email or password",
      });
    }
    // compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.send({
        success: false,
        message: "Invalid email or password",
      });
    }
    // generate JWT token for authentication
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.send({
      user: user,
      success: true,
      message: "login successfully",
      token,
    });
  } catch (err) {
    res.send({
      success: false,
      message: "error in login",
    });
  }
};
module.exports = loginController;
