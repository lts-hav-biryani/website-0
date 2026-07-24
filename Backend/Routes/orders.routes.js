const express = require("express");
const { razorpayCreateOrderController, verifyPaymentController, webhookController } = require("../Controller/admin/order.controller");
const routes = express.Router();
routes.post("/razorpayCreateOrder", razorpayCreateOrderController)
routes.post("/verifyPayment", verifyPaymentController);
routes.post("/webhook-verification", webhookController)
module.exports = routes;