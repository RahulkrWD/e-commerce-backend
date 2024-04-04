const userModel = require("../../models/user");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

// register
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

const registerController = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.send({ message: "email is required" });
    }
    // exisiting user
    const exisitinguser = await userModel.findOne({ email });
    if (exisitinguser) {
      return res.send({
        success: false,
        message: "user already exists",
      });
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
    res.send({
      success: true,
      message: "send OTP",
    });
  } catch (err) {
    res.send({ success: false, message: "Error in registeration", err });
  }
};
// otp verification
async function verifyOtp(req, res) {
  try {
    const { name, password, email, otp, uniqueId } = req.body;
    if (!name || !email || !password || !otp) {
      return res.send({ success: false, message: "All fields are required" });
    }
    if (otpStorage[email] && otpStorage[email] == otp) {
      delete otpStorage[email];
      const hashedPassword = await bcrypt.hash(password, 10);
      await userModel.create({
        name,
        email,
        password: hashedPassword,
        uniqueId,
        otp,
      });
      res.send({ success: true, message: "register successfully" });
    } else {
      res.send({ success: false, message: "Invalid OTP" });
    }
  } catch (err) {
    res.send({ success: false, message: "something went wrong" });
  }
}

// login
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send({ message: "invalid email or password" });
    }

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

// middleware
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized person" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

module.exports = {
  registerController,
  verifyOtp,
  loginController,
  authenticateToken,
};
