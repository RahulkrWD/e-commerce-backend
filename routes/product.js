const express = require("express");
const category = require("../controllers/ProductController/category");
const router = express.Router();
const quicksearch = require("../controllers/ProductController/quickSearch");
const menDeals = require("../controllers/ProductController/mensDeals");
const womenDeals = require("../controllers/ProductController/womenDeals");

router.get("/category", category);

router.get("/quicksearch", quicksearch);
router.get("/quicksearch/:id", quicksearch);

router.get("/mens/deals", menDeals);
router.get("/womens/deals", womenDeals);
module.exports = router;
