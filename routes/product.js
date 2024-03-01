const express = require("express");
const category = require("../controllers/ProductController/category");
const router = express.Router();
const deals = require("../controllers/ProductController/deals.js");
const capsController = require("../controllers/ProductController/othersController.js");
const foootWearController = require("../controllers/ProductController/footwearController.js");
const braceletController = require("../controllers/ProductController/braceletController.js");
const kitchenController = require("../controllers/ProductController/kitchenController.js");
const shampooController = require("../controllers/ProductController/shampooController.js");
const walletsController = require("../controllers/ProductController/walletsController.js");
const highlighterController = require("../controllers/ProductController/highlighterController.js");
const kidsController = require("../controllers/ProductController/kidsController.js");
const bagsController = require("../controllers/ProductController/bagsController.js");
const bags = require("../models/bags.js");

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

// bracelet
router.get("/bracelet", braceletController.bracelet);
router.post("/add/bracelet", braceletController.addBracelet);
router.delete("/delete/bracelet", braceletController.deleteBracelet);

// kitchen
router.get("/kitchen", kitchenController.kitchen);
router.post("/add/kitchen", kitchenController.addKitchen);
router.delete("/delete/kitchen", kitchenController.deleteKitchen);

// shampoo
router.get("/shampoo", shampooController.shampoo);
router.post("/add/shampoo", shampooController.addShampoo);
router.delete("/delete/shampoo", shampooController.deleteShampoo);

// wallets
router.get("/wallets", walletsController.wallets);
router.post("/add/wallets", walletsController.addWallets);
router.delete("/delete/wallets", walletsController.deleteWallets);

// highlighter
router.get("/highlighter", highlighterController.highlighter);
router.post("/add/highlighter", highlighterController.addHighlighter);
router.delete("/delete/highlighter", highlighterController.deleteHighlighter);

// kids
router.get("/kids", kidsController.kids);
router.post("/add/kids", kidsController.addKids);
router.delete("/delete/kids", kidsController.deleteKids);

// bags
router.get("/bags", bagsController.bags);
router.post("/add/bags", bagsController.addBags);
router.delete("/delete/bags", bagsController.deleteBags);

// deal's of the day
router.get("/deals", deals);

module.exports = router;
