const express = require("express");
const router = express.Router();
const registerController = require("../controllers/authController/authRegister");
const loginController = require("../controllers/authController/authLogin");
const authenticateToken = require("../controllers/authController/authMiddleware");
const forgetPassword = require("../controllers/authController/forgetPassword");
const googleLoginController = require("../controllers/authController/googleLoginController");
const googleRegisterController = require("../controllers/authController/googleRegisterController");
// Register - method POST
router.post("/register", registerController);

// Login - method POST
router.post("/login", loginController);

// forget password || POST
router.post("/forget-password", forgetPassword);

// Login with google account
router.post("/google-login", googleLoginController);

router.post("/google-register", googleRegisterController);

// private route -method GET
router.get("/private", authenticateToken, (req, res) => {
  res.json({ message: "This is a private route", user: req.user });
});
module.exports = router;
