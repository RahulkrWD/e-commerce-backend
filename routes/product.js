const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController/ProductController");
const placeorder = require("../controllers/ProductController/placeOrder");

// All product
router.get("/product", productController.product);
router.post("/add/product", productController.addProduct);
router.delete("/delete/product", productController.deleteProduct);

// payment and placeorder
router.post("/placeOrder", placeorder.placeOrder);
router.post("/payment/success", placeorder.payment);

router.get("/order", placeorder.order);

module.exports = router;
