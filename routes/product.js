const express = require("express");
const category = require("../controllers/ProductController/category");
const router = express.Router();
const quicksearch = require("../controllers/ProductController/quickSearch");
const menDeals = require("../controllers/ProductController/mensDeals");
const womenDeals = require("../controllers/ProductController/womenDeals");
const mobileController = require("../controllers/ProductController/mobileController.js");
const shoesController = require("../controllers/ProductController/shoesController.js");

router.get("/category", category);

router.get("/quicksearch", quicksearch);
router.get("/quicksearch/:id", quicksearch);

router.get("/mens/deals", menDeals);
router.get("/womens/deals", womenDeals);
router.get("/mobile/:id", mobileController);
router.get("/shoes/:id", shoesController);
module.exports = router;
