const userModel = require("../../models/user");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rahulkmrgaya21@gmail.com",
    pass: "auiy push dvmg qtco",
  },
});

function generateOTP() {
  return Math.floor(Math.random() * 90000) + 1000000;
}
const otpStorage = {};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.send({ success: false, message: "User not found" });
    }
    const otp = generateOTP();
    otpStorage[email] = otp;
    const mailOptions = {
      from: "rahulkmrgaya21@gmail.com",
      to: email,
      subject: "Verify Your Email",
      text: `Your OTP is: ${otp}`,
    };
    await transporter.sendMail(mailOptions);
    res.send({ success: true, mailOptions });
  } catch (err) {
    res.send({ success: false, message: "Something went wrong", err });
  }
};
// reset password
async function resetpassword(req, res) {
  try {
    const { email, newPassword, otp } = req.body;
    if (!email || !newPassword || !otp) {
      return res.send({
        success: false,
        message: "Email, OTP, and password are required",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.send({ success: false, message: "User not found" });
    }
    if (otpStorage[email] && otpStorage[email] == otp) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await userModel.findOneAndUpdate({ email }, { password: hashedPassword });
      delete otpStorage[email];
      res.send({ success: true, message: "password reset successfull" });
    } else {
      res.send({ success: false, message: "Invalid OTP" });
    }
  } catch (err) {
    res.send({ success: false, message: "something went wrong", err });
  }
}

module.exports = { forgetPassword, resetpassword };
