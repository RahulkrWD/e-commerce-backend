const express = require("express");
const Razorpay = require("razorpay");
const dotenv = require("dotenv");
const orderModel = require("../../models/placeOrder");
dotenv.config();

const razorpay = new Razorpay({
  key_id: "rzp_test_drjHwcTz7rLPPq",
  key_secret: "gJrKh7SahfQdwYfg8uQIcFvV",
});

async function placeOrder(req, res) {
  try {
    const {
      name,
      email,
      phone,
      pincode,
      city,
      state,
      address,
      uniqueId,
      categoryId,
      cost,
      image,
      productId,
      productName,
      quantity,
      type,
      totalPrice,
    } = req.body;

    const options = {
      amount: totalPrice * 100,
      currency: "INR",
      receipt: "order_rcptid_11",
    };

    const order = await razorpay.orders.create(options);
    const newOrder = await orderModel.create({
      orderId: order.id,
      amount: totalPrice,
      status: "pending",
      name,
      email,
      phone,
      pincode,
      city,
      state,
      address,
      uniqueId,
      categoryId,
      cost,
      image,
      productId,
      productName,
      quantity,
      type,
    });
    res.send({
      success: true,
      message: "order Placed",
      orderId: order.id,
      newOrder,
    });
  } catch (err) {
    res.send({ success: false, message: "Order not Placed", err });
  }
}

async function payment(req, res) {
  try {
    const { order_id, payment_id } = req.body;
    const order = await orderModel.findOneAndUpdate(
      { orderId: order_id },
      { $set: { status: "success", payment: payment_id } },
      { new: true }
    );
    res.send(order);
  } catch (err) {
    console.log("Error updateing payment status:", err);
  }
}

module.exports = { placeOrder, payment };
