const express = require("express");
const router = express.Router();
const registerController = require("../controllers/authController/authRegister");
const loginController = require("../controllers/authController/authLogin");
const authenticateToken = require("../controllers/authController/authMiddleware");
const forgetPassword = require("../controllers/authController/forgetPassword");
const googleLoginController = require("../controllers/authController/googleLoginController");
const googleRegisterController = require("../controllers/authController/googleRegisterController");

router.post("/register", registerController.registerController);
router.post("/verify-user", registerController.verifyOtp);
router.post("/login", loginController);
router.post("/forget-password", forgetPassword.forgetPassword);
router.post("/reset-password", forgetPassword.resetpassword);
router.post("/google-login", googleLoginController);
router.post("/google-register", googleRegisterController);

router.get("/private", authenticateToken, (req, res) => {
  res.json({ message: "This is a private route", user: req.user });
});
module.exports = router;
