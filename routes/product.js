const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController/ProductController");
const placeorder = require("../controllers/ProductController/placeOrder");
const getProduct = require("../controllers/ProductController/getProduct");

// get product

router.get("/product/:id", getProduct);
router.get("/allproduct", productController.product);
router.post("/add/product", productController.addProduct);
router.delete("/delete/product", productController.deleteProduct);
router.post("/placeOrder", placeorder.placeOrder);
router.post("/payment/success", placeorder.payment);

// order
router.get("/order", placeorder.order);

module.exports = router;
