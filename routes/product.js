const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController/ProductController");

// All product
router.get("/product", productController.product);
router.post("/add/product", productController.addProduct);
router.delete("/delete/product", productController.deleteProduct);

// payment and placeorder

module.exports = router;
