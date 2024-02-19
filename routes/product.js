const express = require("express");
const category = require("../controllers/ProductController/category");
const router = express.Router();
const quicksearch = require("../controllers/ProductController/quickSearch");

router.get("/category", category);

router.get("/quicksearch", quicksearch);
router.get("/quicksearch/:id", quicksearch);
module.exports = router;
