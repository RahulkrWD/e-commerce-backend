const express = require("express");
const router = express.Router();
const registerController = require("../controllers/authRegister");
const loginController = require("../controllers/authLogin");
const authenticateToken = require("../controllers/authMiddleware");
const forgetPassword = require("../controllers/forgetPassword");
// Register - method POST
router.post("/register", registerController);

// Login - method POST
router.post("/login", loginController);

// forget password || POST
router.post("/forget-password", forgetPassword);

// private route -method GET
router.get("/private", authenticateToken, (req, res) => {
  res.json({ message: "This is a private route", user: req.user });
});
module.exports = router;
