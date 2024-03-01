const express = require("express");
const category = require("../controllers/ProductController/category");
const router = express.Router();
const deals = require("../controllers/ProductController/deals.js");
const capsController = require("../controllers/ProductController/othersController.js");
const foootWearController = require("../controllers/ProductController/footwearController.js");

// category
router.get("/category", category.category);
router.post("/add/category", category.addCategory);
router.delete("/delete/category", category.deleteCategory);

// others / caps , belts, sunglasses
router.get("/others", capsController.caps);
router.post("/add/others", capsController.addCaps);
router.delete("/delete/others", capsController.deleteCaps);

// footwears
router.get("/footwears", foootWearController.footWear);
router.get("/add/footwears", foootWearController.addFootwear);
router.get("/delete/footwears", foootWearController.deleteFootwear);

// deal's of the day
router.get("/deals", deals);

module.exports = router;
