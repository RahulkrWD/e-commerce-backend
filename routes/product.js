const express = require("express");
const category = require("../controllers/ProductController/category");
const router = express.Router();

router.get("/category", category);
module.exports = router;
