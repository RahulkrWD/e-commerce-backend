const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register
const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, uniqueId, answer } = req.body;
    // validations
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "email is required" });
    }
    if (!password) {
      return res.send({ message: "password is required" });
    }
    if (!phone) {
      return res.send({ message: "phone is required" });
    }
    if (!answer) {
      return res.send({ message: "answer is required" });
    }

    // exisiting user
    const exisitinguser = await userModel.findOne({ email });
    if (exisitinguser) {
      return res.send({
        success: false,
        message: "user already exists",
      });
    }
    // hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    // register user
    await userModel.create({
      name,
      email,
      password: hashedPassword,
      phone,
      uniqueId,
      answer,
    });
    res.send({
      success: true,
      message: "Create user successfully",
    });
  } catch (err) {
    res.send({ success: false, message: "Error in registeration", err });
  }
};

module.exports = registerController;
