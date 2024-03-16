const express = require("express");
const category = require("../controllers/ProductController/category");
const router = express.Router();
const productController = require("../controllers/ProductController/ProductController");

// category
router.get("/category", category.category);
router.post("/add/category", category.addCategory);
router.delete("/delete/category", category.deleteCategory);

// All product
router.get("/product", productController.product);
router.post("/add/product", productController.addProduct);
router.delete("/delete/product", productController.deleteProduct);

module.exports = router;
