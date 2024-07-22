const express = require("express");
const Razorpay = require("razorpay");
const dotenv = require("dotenv");
const orderModel = require("../../models/placeOrder");
dotenv.config();

const razorpay = new Razorpay({
  key_id: `${process.env.RAZORPAY_KEY_ID}`,
  key_secret: `${process.env.RAZORPAY_KEY_SECRET}`,
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
      userID,
      totalPrice,
      products,
      price,
    } = req.body;

    const options = {
      amount: totalPrice * 100,
      currency: "INR",
      receipt: "order_rcptid_11",
    };

    const order = await razorpay.orders.create(options);
    const newOrder = await orderModel.create({
      orderId: order.id,
      totalPrice,
      status: "Success",
      name,
      email,
      phone,
      pincode,
      city,
      state,
      address,
      userID,
      products,
      price,
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

// order
async function order(req, res) {
  let query = {};
  let id = req.query.id;
  if (id) {
    query = { userID: id };
  }

  try {
    const order = await orderModel.find(query);
    res.send({ success: true, order });
  } catch (err) {
    console.log("server error", err);
  }
}

module.exports = { placeOrder, payment, order };
