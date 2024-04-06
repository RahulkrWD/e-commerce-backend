const mongoose = require("mongoose");

const priceSchema = new mongoose.Schema({
  delivery: { type: Number, require: true },
  discount: { type: Number, require: true },
  price: { type: Number, require: true },
  finalPrice: { type: Number, require: true },
});

const productSchema = new mongoose.Schema({
  categoryId: { type: Number, require: true },
  cost: { type: Number, require: true },
  description: { type: String, require: true },
  details: { type: String, require: true },
  image: { type: String, require: true },
  productId: { type: Number, require: true },
  productName: { type: String, require: true },
  quantity: { type: Number, require: true },
  totalPrice: { type: Number, require: true },
  type: { type: String, require: true },
});
const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, require: true },
    name: { type: String, require: true },
    email: { type: String, require: true },
    phone: { type: Number, require: true },
    pincode: { type: Number, require: true },
    city: { type: String, require: true },
    state: { type: String, require: true },
    address: { type: String, require: true },
    uniqueId: { type: Number, require: true },
    status: { type: String, require: true },
    totalPrice: { type: Number, require: true },
    price: [priceSchema],
    products: [productSchema],
  },
  { timestamps: true }
);
module.exports = mongoose.model("placeorders", orderSchema);
