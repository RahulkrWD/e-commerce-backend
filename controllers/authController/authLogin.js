const userModel = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rahulkmrgaya21@gmail.com",
    pass: "auiy push dvmg qtco",
  },
});

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

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.send({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const mailOptions = {
      from: "rahulkmrgaya21@gmail.com",
      to: email,
      subject: "Login Successful",
      text: "Thank you for Login!",
    };
    await transporter.sendMail(mailOptions);

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
