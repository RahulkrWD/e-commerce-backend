const jwt = require("jsonwebtoken");
const userModel = require("../../models/user");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rahulkmrgaya21@gmail.com",
    pass: "auiy push dvmg qtco",
  },
});

async function googleLoginController(req, res) {
  const { email } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    res.send({ success: false, message: "User not found" });
  } else {
    const mailOptions = {
      from: "rahulkmrgaya21@gmail.com",
      to: email,
      subject: "Login Successful",
      text: "Thank you for Login!",
    };
    await transporter.sendMail(mailOptions);
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.send({ success: true, message: "Login successfull", token, user });
  }
}

module.exports = googleLoginController;
