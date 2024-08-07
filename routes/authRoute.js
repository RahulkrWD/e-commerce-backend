const express = require("express");
const router = express.Router();
const forgetPassword = require("../controllers/authController/forgetPassword");
const auth = require("../controllers/authController/auth");
const google = require("../controllers/authController/google");
const profile = require("../controllers/authController/profile");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/register", auth.registerController);
router.post("/verify-user", auth.verifyOtp);
router.post("/login", auth.loginController);
router.post("/forget-password", forgetPassword.forgetPassword);
router.post("/reset-password", forgetPassword.resetpassword);
router.post("/google-login", google.googleLoginController);
router.post("/google-register", google.googleRegisterController);
router.get("/profile", profile.getProfile);

// profile photo update
router.put("/upload/photo/:id", upload.single("file"), profile.uploadPhoto);
// get profile photo
router.get("/get-photo/:id", profile.getPhoto);
module.exports = router;
